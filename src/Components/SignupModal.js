import * as Dialog from '@radix-ui/react-dialog';
import { useSetRecoilState } from 'recoil';
import { useForm } from "react-hook-form";

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { modalState } from '../../atoms/modal';
import { auth } from '../../config/firebase';



function SignupModal({open, onOpenChange}) {
    const setModal = useSetRecoilState(modalState);
    const router = useRouter()
    const { register, handleSubmit,watch, formState: { errors, isSubmitting } } = useForm({defaultValues: {
        email: '',
        password:'',
        confirmPassword:''
      }});
      const password = useRef({});
      password.current = watch("password", "");

      const [createUserWithEmailAndPassword, user, loading, fbError] =
    useCreateUserWithEmailAndPassword(auth)
      const onSubmit = async(info) => {
        try {      
        // Check passwords match
        if (info.password !== info.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      // Check password format
      createUserWithEmailAndPassword(info.email, info.password)

      if(fbError !== undefined && fbError?.code === "auth/email-already-in-use") throw new Error("Email already exists")
      } catch (error) {
        toast.error(error?.message)
      }
    };



  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-bold">
          Sign Up
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[5px] font-semibold mb-3 text-[15px] leading-normal">
        Create an account
        </Dialog.Description>

        <fieldset className="mb-[5px]">
          <label className="text-violet11 w-[90px] text-right text-[15px] font-semibold" htmlFor="email">
            Email
          </label>
          <input
          name='email'
          type='email'
          autoComplete="off"
          {...register("email", { required: "Email is a required field",
          validate: {
            maxLength: (v) =>
              v.length <= 50 || "The email should have at most 50 characters",
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
            },
             })}
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="email"
            placeholder='Enter Email address'
          />
          <small className='text-rose-500'>{errors?.email?.message}</small>
        </fieldset>
        <fieldset className="mb-[5px]">
          <label className="text-violet11 w-[90px] text-right text-[15px] font-semibold" htmlFor="password">
            Password
          </label>
          <input
          name='password'
          type='password'
           {...register("password", {
            required: "Password is a required field",
            validate: {
              minLength: (v) =>
                v.length > 7 || "Password should be minimum eight characters",
              matchPattern: (v) =>
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v) ||
                "Password should have at least one uppercase letter, one lowercase letter, one number and one special character",
              }
          })}
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            placeholder='Enter Password'
            />
            <small className='text-rose-500'>{errors?.password?.message}</small>
        </fieldset>
        <fieldset className="mb-[5px]">
          <label className="text-violet11 w-[90px] text-right text-[15px] font-semibold" htmlFor="password">
            Confirm Password
          </label>
          <input
          name='confirmPassword'
          type='password'
           {...register("confirmPassword", {
            required: "Password confirmation is required!",
            minLength: {
              value: 8,
              message: 'Password should be atleast 8 characters long' // JS only: <p>error message</p> TS only support string
            },
            validate: value => value === password.current || "The passwords do not match"
          })}
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            placeholder='Confirm Password'
            />
            <small className='text-rose-500'>{errors?.confirmPassword?.message}</small>
        </fieldset>
        <div className="mt-[25px] flex justify-center">
          <Dialog.Close asChild>
            <button onClick={handleSubmit(onSubmit)} className=" inline-flex h-[35px] items-center justify-center outline-none
            rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none
            bg-green-400 text-green-900 hover:bg-green-500 hover:text-green-950 hover:transition w-full">
              {loading && <Spinner/>}
              Create account
            </button>
          </Dialog.Close>
        </div>
        <div className='flex flex-end items-center space-x-3 mt-2'>
            <div className='text-sm'>Already have an account?</div>
            <button onClick={()=>setModal(prev => ({reset:false, signup:false, login:true}))} className='underline text-sm text-green-700 hover:text-green-950'>Login</button>
            
        </div>
        <Dialog.Close asChild>
          <button
            className=" text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>

          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}

export default SignupModal