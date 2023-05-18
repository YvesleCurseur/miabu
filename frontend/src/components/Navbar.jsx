"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react'

const Navbar = () => {

  const session = false;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/logo.png" 
                width={40} 
                height={40} 
                alt="Logo"
                className="object-contain" 
            />
            <p className="font-bold">MiabuSUSU</p>
        </Link>

        {/* Mobile Navigation */}
        <div className="sm:flex hidden">
            {session ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Prompt
                    </Link>
                    <button type="button" 
                      // onClick={signOut} 
                      className="outline_btn"> 
                        Sign Out
                    </button>
                    <Link href="/profile" className="black_btn">
                        <Image 
                            src="/assets/logo.png" 
                            width={30} 
                            height={30} 
                            className="rounded-full" 
                            alt="profile"
                        />
                    </Link>
                </div>
            ): (
                <>
                    <button
                        type="button"
                        // key={provider.name}
                        // onClick={() => signIn(provider.id)}
                        className="black_btn"
                    >
                        Sign In
                    </button>
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        {/* <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                        src={session?.user.image} 
                        width={30} 
                        height={30} 
                        className="rounded-full" 
                        alt="profile"
                        onClick={() => setToggleDropdown((prev) => !prev)}
                    />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                My profile
                            </Link>
                            <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                Create Prompt
                            </Link>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setToggleDropdown(false); 
                                    signOut;
                                }} 
                                className="mt-5 w-full black_btn"
                            > 
                                Sign Out
                            </button>

                        </div>
                    )}
                </div>
            ): (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div> */}
    </nav>
  )
}

export default Navbar