import React from 'react'

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
        <section className='bg-brand hidden w-1/2 items-center justify-center lg:flex xl:w-2/5'>
            <div className='flex max-h-[800px] max-w-[400px] flex-col justify-center space-y-12'>
                <img src='/assets/icons/logo-full.svg' alt='logo' width={224} height={82} className='h-auto'/>
                <div className='space-y-5 text-white'>
                    <h1 className='h1'>Manage Your Files The Best Way</h1>
                    <p className='body-1'> This is a place where you can store all your document</p>
                </div>
                <img src='/assets/images/files.png' alt='file' width={340} height={340} className='transition-all hover:rotate-2 hover:scale-105'/>
            </div>
        </section>
        <section className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
            <div className='mb-16 lg:hidden'>
                <img src='/assets/icons/logo-full-brand.svg' alt='logo' width={224} height={82} className='h-auto w-[200px] lg:w-[250px]'/>
            </div>
            {children}
        </section>
    </div>
  )
}

export default layout