'use client'

import Link from 'next/link';
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignUn() {
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
    
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
          Create an account with your email and password
          </p>
        </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Sign Up
        </button>{' '}
        <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/singin" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
      </form>
      </div>
    </div>
  )
}