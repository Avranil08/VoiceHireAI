"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState }  from 'react'

function Provider({children}) {

    const [user,setUser] = useState();
    useEffect(()=>{
        console.log("use effect running")
        CreateNewUser();
    },[])

    const CreateNewUser=async()=>{
        supabase.auth.getUser().then(async({data:{user}})=>{ 
            //Check if user exists
             const { data: Users, error } = await supabase .from('Users') .select("*") .eq('email',user?.email); console.log(Users) 
             //Create New user 
        if(Users?.length == 0) { 
            const {data,error} = await supabase.from("Users").insert([
                { name:user?.user_metadata?.name, 
                    email:user?.email, 
                    picture:user?.user_metadata?.picture }
                ])
             console.log(data); 
             setUser(data);
             return;
            } 
            setUser(Users[0]);
        })
        
    }
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    <UserDetailContext.Provider value={{user,setUser}}>
    <div>{children}</div>
    </UserDetailContext.Provider>
    </PayPalScriptProvider>
  )
}

export default Provider

export const useUser=()=>{
    const context = useContext(UserDetailContext);
    return context;
}





// "use client"
// import { supabase } from '@/services/supabaseClient'
// import React, { useEffect } from 'react'

// function Provider({ children }) {

//   useEffect(() => {
//     // This will now reliably log when the component mounts
//     console.log("Provider useEffect is running");
    
//     // Listen for authentication state changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
//         // Only run logic when a user signs in
//         if (event === 'SIGNED_IN' && session?.user) {
//             console.log("Auth state change: User is SIGNED_IN");
//             const user = session.user;

//             // Check if user already exists in your Users table
//             const { data: existingUsers, error: fetchError } = await supabase
//                 .from('Users')
//                 .select("*")
//                 .eq('email', user?.email);

//             if (fetchError) {
//                 console.error("Error fetching user:", fetchError);
//                 return;
//             }

//             // Create new user if they don't exist
//             if (!existingUsers || existingUsers.length === 0) {
//                 console.log("No existing user found. Creating new entry.");
//                 const { data, error: insertError } = await supabase.from("Users").insert([
//                     {
//                         auth_id: user.id, // Better to use the unique auth_id
//                         name: user?.user_metadata?.full_name || user?.user_metadata?.name,
//                         email: user?.email,
//                         picture: user?.user_metadata?.picture,
//                     }
//                 ]);

//                 if (insertError) {
//                     console.error("Error inserting new user:", insertError);
//                 } else {
//                     console.log("Successfully created new user:", data);
//                 }
//             } else {
//                 console.log("User already exists in the Users table.");
//             }
//         }
//     });

//     // Cleanup the subscription when the component unmounts
//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []); // The empty array ensures this runs once

//   return (
//     <div>{children}</div>
//   )
// }

// export default Provider;