

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="p-4 border-b border-black">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <Link
        href="/"
        className="text-2xl font-semibold text-black cursor-pointer"
      >
        YourTimer.io
      </Link>
      <div className="flex flex-row gap-3">
        <Button
          variant="ghost"
          className=" text-white hover:text-white bg-black hover:bg-black/80 cursor-pointer"
        >
          <Link href="/sign-in"> Sign In </Link>
        </Button>
        <Button className="bg-orange-600 hover:bg-orange-500 text-white cursor-pointer">
          <Link href="/sign-up"> Sign Up </Link>
        </Button>
      </div>
    </div>
  </nav>
  )
}

export default Navbar