'use client'
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAnimationControls } from "framer-motion";
import { motion } from "framer-motion";
import LinksItem from "./LinkItems";
import Logout from "./Logout";
import { links } from "@/constants/links";
import { Search } from "lucide-react";
import Image from "next/image";
import dark from '@/assests/logo/dark.png'
import light from '@/assests/logo/light.png'
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react"

  const container = {
    close: {
      width: "3.2rem",
      transition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
    open: {
      width: "14rem",
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 15,
      },
    },
  };

  const SideNav = () => {

      const {data : session}  = useSession({ required: true })




    const [isOpen, setIsOpen] = useState(false);
    const containerController = useAnimationControls();
    const [search , setSearch]= useState('')


    useEffect(() => {
      if (isOpen) {
        containerController.start("open");
      } else {
        containerController.start("close");
      }
    }, [isOpen ,containerController]);

    const filteredLinks = search ? links.filter((item) => new RegExp(search, "igm").test(item.name)) : links;


    return (
      <motion.aside
        variants={container}
        initial="close"
        animate={containerController}
        style={{

        }}
        className="px-3 py-4 bg-yellow-50/10 rounded-none h-screen w-80 md:flex flex-col justify-between overflow-hidden z-20 "
      >
        <div className="space-y-14 ">
          <div className="flex items-center justify-between relative">
          <div className={cn('opacity-0 transition-opacity duration-150 delay-150',{'opacity-100' : isOpen})}>
            <Image src={light} width={48} height={38}  className="dark:hidden flex " alt="" />
            <Image src={dark} className="h-14 hidden  dark:block" alt="" />

          </div>

            <span
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center bg-gray-200/45 absolute -right-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={twMerge(
                  "transition-all rotate-180  duration-300",
                  isOpen && "rotate-0"
                )}
              >
                <path
                  d="M8.75 16.25L2.5 10M2.5 10L8.75 3.75M2.5 10L17.5 10"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <div className={twMerge("space-y-8")}>
            <div className="">
              <label
                htmlFor="Search"
                className={cn(
                  "relative opacity-0 transition-all  ",
                {"opacity-100"  :isOpen}
                )}
              >
                <input
                  type="text"
                  name="Search"
                  id="Search"
                  disabled={!isOpen}
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  className="transition-all  duration-300 text-xs outline-none w-full bg-slate-200/45 h-8 font-light font-dm rounded-sm pl-9 "
                  placeholder="Setting .."
                />
                <span className="absolute  left-2 inset-y-0">
                  <Search className="w-4 text-black/45 dark:text-neutral-200" />
                </span>
              </label>
            </div>
            <div className="px-1 flex flex-col gap-2">
              {filteredLinks.map(({ name, href, icon }, index) => (
               <LinksItem key={index} name={name} href={href} icon={icon} isOpen={isOpen} />
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Logout user={session?.user} isOpen={isOpen}/>
        </div>
      </motion.aside>
    );
}

export default SideNav
