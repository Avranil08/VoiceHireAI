"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
      const {user} = useUser();
  
      useEffect(()=>{
        user&&GetInterviewList();
      },[user])
  
      const GetInterviewList=async()=>{
        const result = await supabase
        .from('Interviews')
        .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
        .eq('userEmail',user?.email)
        .order('id',{ascending:false})
        ;
  
        console.log(result);
        setInterviewList(result?.data);
      }
  
   
    return (
      <div className='my-5'>
          <h2 className='font-bold text-2xl'> All Previously created interviews</h2>
          {interviewList?.length==0 && 
          <div className='p-5 flex flex-col gap-3 items-center p-5 mt-5'>
              <Video className='h-10 w-10 text-primary'/>
              <h2>You don't have any interview created!</h2>
              <Button>+ Create New Interview</Button>
          </div>}
          {interviewList&&
          <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
            {interviewList.map((interview,index)=>(
              <InterviewCard interview={interview} key={index} />
            ))}
          </div>
          }
      </div>
    )
  }
  
 


export default AllInterview