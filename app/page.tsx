'use client'

import Link from 'next/link';


export default function Login() {
  return (
    
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <Link href="/singin" className="font-semibold text-gray-800">
              Sign In
            </Link>
      </div>
  )
}