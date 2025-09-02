'use client'
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";

interface Props{
  avatar:string,
  fullName:string,
  email:string,
  ownerId:string,
  accountId:string
}
const MobileNav = ({avatar, fullName, email, ownerId, accountId} : Props) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className="mobile-header">
      <img src="/assets/icons/logo-full-brand.svg" width={120} height={52} className="h-auto"/>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <img src="/assets/icons/menu.svg" alt="search" width={30} height={30}/>
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
            <SheetTitle >
              <div className="header-user">
                  <img src={avatar} alt='avatar' width={44} height={44} className="header-user-avatar"/>
                  <div className="">
                    <p className="subtitle-2 capitalize">{fullName}</p>
                    <p className="caption">{email}</p>
                  </div>
              </div>
              <Separator className="mb-4 bg-light-200/20"/>
            </SheetTitle>
            <nav className="mobile-nav">
                <ul className="mobile-nav-list">
                  {navItems.map((item)=>(
                    <Link href={item.url} key={item.name}>
                      <li className={cn('mobile-nav-item', pathname === item.url && 'shad-active')}>
                          <img src={item.icon} alt={item.name} width={24} height={24} className={cn('nav-icon', pathname === item.url && 'nav-icon-active')}/>
                          <p>{item.name}</p>
                      </li>
                    </Link>
                  ))}
                </ul>
            </nav>
            <Separator className="my-5 bg-light-200/20"/>
            <div className="flex flex-col justify-between gap-5 pb-5">
                  <FileUploader/>
            </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
