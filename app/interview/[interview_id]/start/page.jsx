


"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState, useRef } from 'react'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';


function StartInterview() {
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
  const [activeUser, setActiveUser] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [conversation, setConversation] = useState();
  const {interview_id} = useParams();
  const router = useRouter();

  
  // Use useRef to maintain the same Vapi instance and latest conversation data
  const vapiRef = useRef(null);
  const conversationRef = useRef(null);

  // Initialize Vapi instance once
  useEffect(() => {
    if (!vapiRef.current && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
      
      // Set up event listeners once
      setupEventListeners();
    }
    
    // Cleanup on unmount
    return () => {
      if (vapiRef.current && isCallActive) {
        vapiRef.current.stop();
      }
    };
  }, []);

  // Setup event listeners
  const setupEventListeners = () => {
    if (!vapiRef.current) return;

    vapiRef.current.on("call-start", () => {
      console.log("Call has started");
      setIsCallActive(true);
      toast('Call Connected...');
    });

    vapiRef.current.on("speech-start", () => {
      console.log("Assistant speech has started");
      setActiveUser(false);
    });

    vapiRef.current.on("speech-end", () => {
      console.log("Assistant speech has ended");
      setActiveUser(true);
    });

    vapiRef.current.on("call-end", () => {
      console.log("Call has ended");
      setIsCallActive(false);
      setActiveUser(false);
      toast('Interview Ended');
      
      // Use the latest conversation data from ref
      if (conversationRef.current) {
        GenerateFeedBack(conversationRef.current);
      } else {
        console.warn("No conversation data available for feedback generation");
      }
    });

    vapiRef.current.on("message", (message) => {
      console.log("Message received:", message);
      if (message?.conversation) {
        // Update both state and ref
        setConversation(message.conversation);
        conversationRef.current = message.conversation;
      }
    });

    // error handling
    vapiRef.current.on("error", (error) => {
      console.error("Vapi error:", error);
      setIsCallActive(false);
      setActiveUser(false);
      toast.error('Call error occurred');
    });
  };

  const GenerateFeedBack = async (conversationData) => {
    if (!conversationData) {
      console.error("No conversation data provided for feedback generation");
      return;
    }

    console.log(" Starting feedback generation...");
    
    try {
      const result = await axios.post('/api/ai-feedback', {
        conversation: conversationData,
        interviewInfo: {
          jobPosition: interviewInfo?.interviewData?.jobPosition,
          userName: interviewInfo?.userName,
          questions: interviewInfo?.interviewData?.questionList
        }
      });

      console.log(" Feedback generated successfully:");
      console.log(" Feedback Data:", result?.data);
      
      

      const { data, error } = await supabase
  .from('interview-feedback')
  .insert([
    { userName: interviewInfo?.userName, 
      userEmail: interviewInfo?.email,
      interview_id:interview_id ,
      feedback:result?.data,
      recommendation:false
    },
  ])
  .select()
   console.log(data);
   router.replace('/interview/'+interview_id+"/completed");

      
    } catch (error) {
      console.error(" Error generating feedback:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (interviewInfo && interviewInfo.interviewData?.questionList && vapiRef.current) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    if (!vapiRef.current) {
      console.error("Vapi instance not initialized");
      toast.error("Voice service not available");
      return;
    }

    // Reset conversation data
    setConversation(null);
    conversationRef.current = null;

    const questions = interviewInfo.interviewData.questionList.map(item => item?.question);

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: 
            `You are an AI voice assistant conducting interviews.
            Your job is to ask candidates provided interview questions, assess their responses.
            
            Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example: "Hey there welcome to your ${interviewInfo?.interviewData?.jobPosition} interview, Let's get started with a few questions!"
            
            Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. 
            
            Below are the questions. Ask them one by one: 
            ${JSON.stringify(questions)}

            If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example: "Need a hint? Think about how React tracks component updates!" 
            
            Provide brief, encouraging feedback after each answer. Example: "Nice! That's a solid answer." or "Hmm, not quite! Want to try again?"
            
            Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
            
            After 5-7 questions, wrap up the interview smoothly by summarizing their performance. 
            Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"
            
            End on a positive note: "Thanks for chatting! Hope to see you crushing projects soon!"
            
            Key Guidelines:
            - Be friendly, engaging, and witty 
            - Keep responses short and natural, like a real conversation 
            - Adapt based on the candidate's confidence level
            - Ensure the interview remains focused on ${interviewInfo?.interviewData?.jobPosition || 'the technical role'}`
          },
        ],
      },
    };

    try {
      vapiRef.current.start(assistantOptions);
    } catch (error) {
      console.error("Failed to start call:", error);
      toast.error("Failed to start interview");
    }
  };

  const stopInterview = () => {
    if (!vapiRef.current) {
      console.error("Vapi instance not available");
      return;
    }

    try {
      console.log("Stopping interview...");
      vapiRef.current.stop();
      setIsCallActive(false);
      setActiveUser(false);
    } catch (error) {
      console.error("Failed to stop call:", error);
      toast.error("Failed to end interview");
    }
  };

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Session 
        
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-secondary h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center '>
          <div className='relative'>
            {!activeUser && isCallActive && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
            <Image src={'/ai.avif'} alt='ai'
              width={100}
              height={100}
              className='w-[60px] h-[60px] rounded-full object-cover' 
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        
        <div className='bg-secondary h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center '>
          <div className='relative'>
            {activeUser && isCallActive && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
            <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>
              {interviewInfo?.userName?.[0] || 'U'}
            </h2>
          </div>
          <h2>{interviewInfo?.userName || 'User'}</h2>
        </div>
      </div>
      
      <div className='flex items-center gap-5 justify-center mt-7'>
        <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer'/>
        <AlertConfirmation stopInterview={() => stopInterview()}>
          <Phone className={`h-12 w-12 p-3 ${isCallActive ? 'bg-red-500' : 'bg-gray-500'} text-white rounded-full cursor-pointer`}/>      
        </AlertConfirmation>
      </div>
      
      <h2 className='text-sm text-gray-400 text-center mt-5'>
        {isCallActive ? 'Interview is in Progress...' : 'Interview Ready to Start'}
      </h2>
      
      
    </div>
  )
}

export default StartInterview;
