import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='flex h-screen'>
        <Sidebar/>
        <section className='flex h-full flex-1 flex-col'>
            <MobileNav/>
            <Navbar/>
            <div className='main-content'>
                {children}
            </div>
        </section>
    </main>
  )
}

export default layout