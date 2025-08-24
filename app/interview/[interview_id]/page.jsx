"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function Interview() {
    const {interview_id} = useParams();
    
    const [interviewData,setInterviewData]=useState();
    const [userName,setUserName] = useState();
    const [loading,setLoading] = useState(false);
    const [userEmail,setUserEmail] = useState();
    const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext)
    const router=useRouter();
    useEffect(()=>{
       interview_id&&GetInterviewDetail();
    },[interview_id])

    const GetInterviewDetail=async()=>{
        setLoading(true);
        try{

      
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select("jobPosition,jobDescription,duration,type")
        .eq('interview_id',interview_id)

        setInterviewData(Interviews[0]);
        setLoading(false);
        if(Interviews?.length==0)
        {
            toast('Incorrect Interview Link');
            return;
        }
        
        }catch(e)
        {
            setLoading(false);
            toast('Incorrect Interview Link');
        }
    }

    const onJoinInterview=async()=>{
        setLoading(true);
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select("*")
        .eq("interview_id",interview_id);

        console.log(Interviews[0]);
        setInterviewInfo({
            userName:userName,
            email:userEmail,
            interviewData:Interviews[0]
        })
            router.push('/interview/'+interview_id+'/start');
        setLoading(false);
    }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7'>
       <div className='flex flex-col items-center justify-center border rounded-lg bg-white
       p-7 lg:px-32 xl:px-52 mb-20'>
        <Image src={'/logo.png'} alt='logo' width={70} height={70}
                className='w-[70px]'/>
                <h2 className='mt-3'>AI-Powered Interview platform</h2>

            <Image src={'/interview.avif'} alt='interview'
            width={300}
            height={300}
            className='w-[280px] my-6'
            />
            <h2 className='font-bold text-xl '>{interviewData?.jobPosition}</h2>
            <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4'/>{interviewData?.duration}</h2>
        <div className='w-full'>
            <h2>Enter Your Full name</h2>
            <Input placeholder='e.g John Smith' onChange={(event)=>setUserName(event.target.value)} />
        </div>
        <div className='w-full'>
            <h2>Enter Your Email</h2>
            <Input placeholder='e.g John@gmail.com' onChange={(event)=>setUserEmail(event.target.value)} />
        </div>
        <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-5'>
            <Info className='text-primary' />
            <div>
            <h2 className='font-bold'>Before You Begin</h2>
            <ul>
                <li className='text-sm text-primary'>- Test your Camera</li>
                <li className='text-sm text-primary'>- Ensure you have good Internet Connection</li>
                <li className='text-sm text-primary'>- Find a Quiet Place</li>
            </ul>
            </div>
        </div>
        <Button className='mt-5 w-full font-bold' 
        disabled={loading||!userName}
        onClick={()=>onJoinInterview()}
        >
            <Video/> {loading&&<Loader2Icon/>}Join Interview </Button>
       </div>
    </div>
  )
}

export default Interview