import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
  const { email } = ctx.query;

  return {
    props: {
      email,
    },
  };
}
function confirmEmail({email}) {
  return (
    <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div class="max-w-xl px-5 text-center">
            <h2 class="mb-2 text-[42px] font-bold text-zinc-800">Confirm Your Email</h2>
            <p class="mb-2 text-lg text-zinc-500">We are glad, that you’re with us ? We’ve sent you a verification link to the email address <span class="font-medium text-green-500">{email}</span>.</p>
            <a href="https://mail.google.com/mail/u/0/" target="_blank" class="mt-3 inline-block w-96 rounded bg-green-600 px-5 py-3 font-medium text-white shadow-md shadow-green-500/20 hover:bg-green-500">Open Mail App →</a>
        </div>
</div>
  )
}

export default confirmEmail