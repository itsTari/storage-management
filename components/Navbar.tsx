import React from 'react'
import { Button } from './ui/button'
import Search from './Search'
import FileUploader from './FileUploader'
import { logoutUser } from '@/lib/actions/user.actions'

const Navbar = () => {
  // const handleLogout = async ()=>{
  //   await logoutUser()
  // }
  return (
    <header className='header'>
      <Search/>
      <div className='header-wrapper'>
            <FileUploader/>
            <form action={async() => {
              'use server'
              await logoutUser()
            }}>
                < Button type='submit' className='sign-out-button'>
                  <img src='/assets/icons/logout.svg' alt='logo' width={24} height={24} className='w-6'/>
                </Button>
            </form>
      </div>

    </header>
  )
}

export default Navbar