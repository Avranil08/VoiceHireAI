"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import React from 'react'

function Login() {
  const signInWithGoogle=async()=>{
      const {error}=await supabase.auth.signInWithOAuth({
        provider:'google'
      })
      if(error)
      {
        console.error('Error:' ,error.message);
      }
    }
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col items-center border rounded-2xl p-8'>
            <Image src="/logo.png" alt="logo" width={60} height={60}
            className=''/>

            <div className='flex flex-col items-center '>
              <Image src={'/login.webp'} alt='login' width={400} height={200} 
              className='mt-2 border rounded-2xl'/>
              <h2 className='text-2xl font-bold text-center mt-5'>Welcome to VoiceHireAI</h2>
              <p className='text-gray-500 text-center'> Sign In with Google Authentication</p>
              <Button className='mt-7 w-full' onClick={signInWithGoogle}> Login with Google </Button>
            </div>
      </div>
        
        
    </div>
  )
}

export default Login