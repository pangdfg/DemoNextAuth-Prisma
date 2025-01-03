'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        console.error(result.error)
      } else {
        router.push('/profile')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-700 bg-gray-900 px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-white">Sign In</h3>
          <p className="text-sm text-gray-400">
            Use your email and password to sign in
          </p>
        </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-400">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-400">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          Sign In
        </button>
        <p className="text-center text-sm text-gray-400 mb-4">{"or"}</p>
        <button
          type="button"
          onClick={() => signIn('google')}
          className=" mb-4 w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            width="20"
            height="20"
            className='fill-current bg-white rounded-full p-1'
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-400">
            {"Don't have an account? "}
            <Link href="/singup" className="font-semibold text-gray-200">
              Sign up
            </Link>
            {' for free.'}
          </p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300 w-full"
        >
          Back to Homepage
        </button>
      </form>
      </div>
    </div>
  )
}