import { createClient } from '@/lib/supabase/server'
import React from 'react'

const TopNavBar = async () => {
  const supabase = await createClient();
  const {data, error} = await supabase.auth.getClaims();
  if (error) {
    return (
      <nav className='flex sticky top-0 w-full h-16 justify-end items-center px-4 py-2 bg-sky-300'>
        <div className='flex items-center gap-2 text-rose-500'>
            <div>
                Something Went Wrong!
            </div>
            <div className='h-8 w-8 rounded-full bg-red-200 text-center flex items-center justify-center'>
              E
            </div>
        </div>
    </nav>
    )
  }
  const user_data = data?.claims.user_metadata
  const color = `color-mix(in srgb, #111111 80%, ${user_data?.profile_color})`
  return (
    <nav className='flex sticky top-0 w-full h-16 justify-end items-center px-4 py-2 bg-sky-300'>
        <div className='flex items-center gap-2'>
            <div className='text-white'>
                {user_data?.first_name}
            </div>
            <div className='h-8 w-8 rounded-full text-center flex items-center justify-center' style={{background: user_data?.profile_color, color:  color}}>
              {user_data?.first_name.charAt(0)}
            </div>
        </div>
    </nav>
  )
}

export default TopNavBar