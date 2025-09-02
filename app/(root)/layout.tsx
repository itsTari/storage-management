import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import React from 'react'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

const layout = async ({children}:{children:React.ReactNode}) => {
  const currentUser = await getCurrentUser()
  if(!currentUser) return redirect('/sign-in')

  return (
    <main className='flex h-screen'>
        <Sidebar {...currentUser}/>
        <section className='flex h-full flex-1 flex-col'>
            <MobileNav {...currentUser}/>
            <Navbar/>
            <div className='main-content'>
                {children}
            </div>
        </section>
    </main>
  )
}

export default layout