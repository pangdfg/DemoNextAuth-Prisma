'use client'

import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex h-screen w-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center flex-grow text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">NextAuth + Prisma</h1>
        <p className="text-xl mb-8">Secure authentication with Next.js and Prisma</p>
        <div className="flex space-x-4">
          <Link href="/singin" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Sign In
          </Link>
          <Link href="/singup" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}