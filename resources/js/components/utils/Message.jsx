import { Info } from "lucide-react"

const Message = ({ message }) => {
    return (
        <div className="flex justify-center items-center w-full py-12">
        <div className="relative bg-neutral-100 dark:bg-neutral-800 text-primary dark:text-neutral-100 px-7 py-5 rounded-3xl text-lg font-medium">
         <div className="flex gap-2 justify-center items-center">  <Info className="text-gray-400"/> <p className="text-gray-700">  {message} </p> </div>
          <span className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-r-[12px] border-r-neutral-100 dark:border-r-neutral-800"></span>
        </div>
      </div>
    )
  }
  
  export default Message
  