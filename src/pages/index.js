
import { useEffect } from "react";
import LoginModal from "../Components/LoginModal";
import Link from "next/link";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../../atoms/modal";
import SignupModal from "../Components/SignupModal";
export default function Home() {
  const setModal = useSetRecoilState(modalState);
  const currentModal = useRecoilValue(modalState);
  
  return (
<>
    <nav className='bg-gray-100'>
      <div className='max-w-5xl mx-auto px-4'>
        <div className='flex justify-between'>
        <div className="flex space-x-4">
        <Link href='#' className='flex items-center py-5 px-2 text-gray-700'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
        <span className='font-bold'>Gold Exchange</span>
        </Link>
        <div>
        </div>
        <div className='hidden md:flex space-x-1'>
          <Link href={"#"} className=' py-5 px-2 text-gray-700 hover:text-gray-500'>Features</Link>
          <Link href={"#"} className=' py-5 px-2 text-gray-700 hover:text-gray-500'>Pricing</Link>
        </div>
        </div> 
        <div className='hidden md:flex items-center space-x-1'>
        <Link href={"#"} className='py-5 px-3 hover:underline hover:text-blue-800'>Login</Link>
        {/* <Link href={"#"} >Sign Up</Link> */}
        <button
        onClick={(e)=>setModal(prev =>({reset:false, login:false, signup:true}))}
        className='btn btn-sm btn-active border-none rounded bg-green-400 hover:bg-green-300 text-green-900 hover:text-green-800'>Sign Up</button>

        </div>
        {/* mobile button goes here */}
        <div className='md:hidden flex items-center'>
           <button className="btn">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

           </button>
        </div>
        </div>
      </div>
      <div className='hidden'>
        <Link href={"#"} className='block py-2 px-4 text-sm hover:bg-gray-200'>Features</Link>
        <Link href={"#"} className='block py-2 px-4 text-sm hover:bg-gray-200'>Pricing</Link>
      </div>
    </nav>
    <main>
    {currentModal.signup && <SignupModal open={currentModal.signup} onOpenChange={setModal}/>}
    {currentModal.login && <LoginModal open={currentModal.login} onOpenChange={setModal}/>}
    </main>
    </>
  )
}

