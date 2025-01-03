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