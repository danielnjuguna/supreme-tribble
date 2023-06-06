import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Spinner from '../../Components/Spinner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ForgotPassword = () => {
const router = useRouter();
const supabase = useSupabaseClient();

const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting},
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) =>{
    try {
      supabase.auth.resetPasswordForEmail(
          data.email, {
            redirectTo: 'https://danielnjuguna-supreme-tribble-xv5q649vw7r2v6qj.github.dev/forgot-password/reset',
          })
        .then(({ data, error }) => {
          console.log(data)
          console.log(error)
          // if (error?.message === "Email not confirmed") {
          //   supabase.auth
          //     .signInWithOtp({
          //       email: info.email,
          //     })
          //     .then(() => {
          //       router.push(`/confirm?email=${info.email}`);
          //       toast.success("Email confirmation link sent to your email");
          //       setIsLoading(false);
          //     });
          // } else if (error?.message === "Invalid login credentials") {
          //   toast.error("Invalid email or password");
          //   setIsLoading(false);
          // } else if (data.session !== null) {
          //   toast.success("logged in");
          //   setModal((prev) => ({ reset: false, signup: false, login: false }));
          //   reset({
          //     email: "",
          //     password: "",
          //   });
          //   setIsLoading(false);
          // }
        });
    } catch (error) {
      console.log(error)
      toast.error("something went wrong!");
    }
    
// let { data, error } = await supabase.auth.resetPasswordForEmail(email)

  }
  return (
    <>
    <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
    <div className="mt-7 bg-white  rounded-xl shadow-lg border-2 border-green-300">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <button type="button" onClick={() => router.back()} className="text-green-600 decoration-2 hover:underline font-medium pl-2">
              Login here
            </button>
          </p>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)} >
            <div classNameName="grid gap-y-4">
              <div className='mb-4'>
                <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2">Email address</label>
                <div className="relative">
                  <input type="email" id="email" name="email" placeholder="Enter Email address" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-blue-500 shadow-sm" 
                //   required aria-describedby="email-error" 
                  {...register("email", {
                    required: "Email is a required field!",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 ||
                        "The email should have at most 50 characters",
                      matchPattern: (v) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "Email address must be a valid address",
                    },
                  })}
                  />
                </div>
                <small className="text-rose-500">
                {errors?.email?.message}
              </small>             
               </div>
              <button type="submit" className="py-2 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-green-900 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 w-full">
              {isSubmitting && <Spinner />}
                Reset password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  </>
  )
}

export default ForgotPassword