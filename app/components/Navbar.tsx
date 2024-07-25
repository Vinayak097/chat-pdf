import React from 'react'
import { FilePlus2,  } from 'lucide-react'
import { SignedIn,  UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
function Navbar() {
  return (
    <div className='flex justify-between bg-white  shadow-sm p-5'>
        <Link href="/dashboard " className="text-2xl">
        chat to <span className='text-amber-500'>PDF</span>
        </Link>
        <SignedIn>
            <div className='flex items-center space-x-2'>
                <Button asChild variant="link" className='hidden md:flex'>
                    <Link href="/dashboard/upgrade">Pricing</Link> 
                </Button>

                <Button asChild variant="outline">
                    <Link href={"/dashboard"}>
                    My Documents</Link>
                </Button>

                <Button asChild variant={'outline'}>
                    <Link href={"/dashboard/upload"}>
                    <FilePlus2 className={`text-amber-500`}>  </FilePlus2>
                    </Link>
                </Button>
                <UserButton></UserButton>
                
            </div>
        </SignedIn>
        
        
    </div>
  )
}

export default Navbar   