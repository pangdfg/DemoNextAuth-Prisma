'use client'

import Link from 'next/link';
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignUp() { 
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response?.ok) {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })
        if (result?.error) {
          console.error(result.error)
          setError(result.error)
        } else {
          console.log('result', result)
          router.push('/profile')
        }
      } else {
        const data = await response.json();
        setError(data.err || "Registration failed");
      } 

    } catch (error) {
      console.log('error', error)
      setError("An unexpected error occurred")
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-700 bg-gray-900 px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-white">Sign Up</h3>
          <p className="text-sm text-gray-400">
          Create an account with your email and password
          </p>
        </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="text-gray-400">Name</label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded"
          />
        </div>
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
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-400">
            {'Already have an account? '}
            <Link href="/singin" className="font-semibold text-gray-200">
              Sign in
            </Link>
            {' instead.'}
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