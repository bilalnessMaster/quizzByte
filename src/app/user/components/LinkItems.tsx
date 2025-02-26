'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const LinksItem = ({name , href , icon , className } : {className ?: string,name : string , href : string , icon : React.ReactNode , isOpen ?: boolean}) => {
    const pathname = usePathname()

    return (
    <Link href={href} className={cn('text-blue-950 flex items-center gap-3 transition-colors duration-200 min-w-[1.8rem] px-1 py-2 rounded whitespace-nowrap font-dm dark:text-neutral-300 text-sm font-medium',className , {
        'bg-[#F0F0F0]/45' : pathname == href
    })}>
        <span className={cn(' text-neutral-700 transition-colors duration-300 dark:text-neutral-300  delay-200 ')}>
            {icon}
        </span>
        <span className={cn('capitalize    transition-opacity duration-300 ')}>{name}</span>
    </Link>
  )
}

export default LinksItem
