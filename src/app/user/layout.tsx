



import { Toaster } from "sonner"
import SideNav from "./components/SideNav"


const layout = async  ({children} : {children : React.ReactNode}) => {


    return (

    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div>

            <SideNav />
        </div>
        <div className="flex-grow md:overflow-y-auto">
            {children}
         <Toaster />
        </div>
    </div>

  )
}

export default layout
