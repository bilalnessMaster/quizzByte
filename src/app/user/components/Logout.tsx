'use client'
// import { handleLogout } from "@/app/auth/lib/action";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { cn } from "@/lib/utils";
import Image from "next/image";
import male from '@/assests/gender/male.png'
import female from '@/assests/gender/female.png'
import LinksItem from "./LinkItems";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
const Logout = ({user,isOpen} : {user : User | undefined, isOpen : boolean}) => {
    const nameGender = male.src.split('/').pop()?.split('.')[0]
    const gender = user?.gender === nameGender ? male : female


    return (
    <Popover >
     <PopoverTrigger className="flex justify-between items-center w-full">
     <div className="flex items-center text-xs  font-dm gap-3">
        <div className="w-7 rounded-full bg-gray-200/45 h-full  overflow-hidden ">
          <Image
            src={gender}
            className="h-7 object-cover w-7"
            width={238} height={318}
            alt={`${user?.gender}`}
          />
        </div>
        <div className={cn("leading-[1rem] font-semibold text-sm whitespace-nowrap opacity-0 capitalize  transition-opacity duration-200" ,{'opacity-100':isOpen })}>
          <h2 className="space-x-1">
            <span>{user?.firstName}</span>
            <span>{user?.lastName}</span>

          </h2>
        </div>
      </div>
      <div>

      {true && (
        <ChevronsUpDown size={15} />
      )}
      </div>
     </PopoverTrigger>
    <PopoverContent className="p-0 m-2 w-[14rem]" side={isOpen ? 'top' : "left"} >
        <div className="grid w-full">
        <div className="border-b h-10 px-2 flex items-center ">
        <div className="flex items-center text-xs  font-dm gap-3">
        <div className="w-7 rounded-full bg-gris h-full  overflow-hidden ">
          <Image
            src={gender}
            className="h-7 object-cover w-7"
            width={238} height={318}
            alt={`${user?.gender}`}
          />
        </div>
        <div className={cn("leading-[1rem] font-medium whitespace-nowrap opacity-0 transition-opacity duration-200" ,{'opacity-100':isOpen})}>
          <h2>
            @{user?.firstName}
            {user?.lastName}
          </h2>
          <h2 className="text-black/35 dark:text-neutral-300/55">
            {user?.email}
          </h2>
        </div>
      </div>
        </div>
        <div className="border-b h-10 px-2 flex items-center hover:bg-[#F0F0F0]/45">
        <LinksItem href="/user/settings" name="settings" icon={<Settings size={15}  />} className="gap-2 text-xs font-semibold" />
        </div>


    <button className="flex gap-2 h-10 px-3 items-center text-xs font-semibold text-blue-950" onClick={()=>signOut()}>
    <LogOut size={15} className="text-neutral-700" />
    <span>Log out</span>
    </button>


        </div>

    </PopoverContent>
    </Popover>
  )
}

export default Logout
