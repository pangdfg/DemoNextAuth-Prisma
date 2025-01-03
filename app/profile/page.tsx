'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function Profile() {
  const { data: session, status } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }
  
  if (status === 'authenticated' && session.user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h1 className="text-2xl font-bold text-white">Welcome, {session.user.name}!</h1>
            <p className="text-sm text-indigo-200 mt-1">Here is your profile information:</p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="text-lg font-semibold text-gray-800">{session.user.id}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800">{session.user.email}</p>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold text-gray-800">{session.user.role}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}