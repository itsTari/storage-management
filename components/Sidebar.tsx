'use client'
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  fullName:string,
  email:string,
  avatar:string
}

const Sidebar = ({fullName, email, avatar} : Props) => {
  const pathname =usePathname()

  return (
    <aside className='sidebar'>
      <Link href='/'>
          <img src='/assets/icons/logo-full-brand.svg' width={150} height={150} className='hidden h-auto lg:block'/>
          <img src='/assets/icons/logo-brand.svg' width={52} height={52} className='lg:hidden'/>
      </Link>
      <nav className='sidebar-nav'>
        <ul className='flex flex-1 flex-col gap-6'>
            {navItems.map((item)=>{
              const active = pathname === item.url
              return <Link href={item.url} key={item.name} className='lg:w-full' >
                <li className={cn('sidebar-nav-item', active && 'shad-active')}>
                  <img src={item.icon} alt={item.name} width={24} height={24} className={cn('nav-icon', active && 'nav-icon-active')}/>
                  <p className='hidden lg:block'>{item.name}</p>
                </li>
              </Link>
            }
            )}
        </ul>
      </nav>
      <img src='/assets/images/files-2.png' alt='logo' width={506} height={418} className='w-full'/>

      <div className='sidebar-user-info'>
          <img src={avatar} alt='avatar' width={44} height={44} className='sidebar-user-avatar'/>
          <div className='hidden lg:block'>
            <p className=' capitalize'>{fullName}</p>
            <p className='caption'>{email}</p>
          </div>
      </div>
    </aside>
  )
}

export default Sidebar