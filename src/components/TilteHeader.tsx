import { twMerge } from "tailwind-merge"


const TilteHeader = ({
    title ,
    description,
    className,
    icon
} : {title : string , icon?:React.ReactNode , description ?: string , className?:string}) => {
  return (
    <div className="space-y-2 w-full text-black font-bricolage dark:text-neutral-200">
        <h1 className={twMerge("flex items-start  text-2xl font-medium font-dm", className , !!icon && 'gap-1')}>
        <span>{icon}</span>
        <span>{title}</span>
        </h1>
        <p className="font-dm text-sm text-gray-600 max-w-sm leading-5 ">{description}</p>
    </div>
  )

}

export default TilteHeader
