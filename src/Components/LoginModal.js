import * as Dialog from "@radix-ui/react-dialog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRef, useState } from "react";
import { modalState } from "../../atoms/modal";
import SignupModal from "./SignupModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import Link from "next/link";
function LoginModal({ open, onOpenChange }) {
  const setModal = useSetRecoilState(modalState);
  const currentModal = useRecoilValue(modalState);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const resetList = useResetRecoilState(todoListState);
  const user = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (info) => {
    try {
      setIsLoading(true);
      supabase.auth
        .signInWithPassword({
          email: info.email,
          password: info.password,
        })
        .then(({ data, error }) => {
          if (error?.message === "Email not confirmed") {
            supabase.auth
              .signInWithOtp({
                email: info.email,
              })
              .then(() => {
                router.push(`/confirm?email=${info.email}`);
                toast.success("Email confirmation link sent to your email");
                setIsLoading(false);
              });
          } else if (error?.message === "Invalid login credentials") {
            toast.error("Invalid email or password");
            setIsLoading(false);
          } else if (data.session !== null) {
            toast.success("logged in");
            setModal((prev) => ({ reset: false, signup: false, login: false }));
            reset({
              email: "",
              password: "",
            });
            setIsLoading(false);
          }
        });
    } catch (error) {
      toast.error("something went wrong!");
    }
  };
  const toggleToSignUp = () => {
    setModal({ reset: false, signup: true, login: false });
  };
  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {/* <Dialog.Trigger asChild>
      <button className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
        Edit profile
      </button>
    </Dialog.Trigger> */}
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-bold">
              Login
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[5px] mb-2 text-[15px] leading-normal">
              Access your account!
            </Dialog.Description>
            <fieldset className="mb-[5px]">
              <div className="mb-1">
              <label
                className="text-violet11 w-[90px] text-right text-[15px] mb-1 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              </div>
              <input
                name="email"
                type="email"
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
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="email"
                placeholder="Enter Email address"
              />
              <small className="text-rose-500">{errors?.email?.message}</small>
            </fieldset>
            <fieldset className="mb-[5px]">
              <div className="flex justify-between mb-1">
                <label
                  className="text-violet11 text-right text-[15px] font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-green-700 cursor-pointer">forgot password?</Link>
              </div>
              <input
                name="password"
                type="password"
                {...register("password", {
                  required: "Password is a required field!",
                  minLength: {
                    value: 8,
                    message: "Password should be atleast 8 characters long",
                  },
                })}
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                placeholder="Enter Password"
              />
              <small className="text-rose-500">
                {errors?.password?.message}
              </small>
            </fieldset>
            <div className="mt-[25px] flex justify-center">
              <Dialog.Close asChild>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className=" inline-flex h-[35px] items-center justify-center outline-none
            rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none
            bg-green-400 text-green-900 hover:bg-green-500 hover:text-green-950 hover:transition w-full"
                >
                  {isLoading && <Spinner />}
                  Login
                </button>
              </Dialog.Close>
            </div>
            <div className="flex flex-end items-center space-x-3 mt-2">
              <div className="text-sm">New user?</div>
              <button
                onClick={toggleToSignUp}
                className="underline text-sm text-green-700 hover:text-green-950"
              >
                Sign up
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className=" text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default LoginModal;
