"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

import { useSelector, useDispatch } from "react-redux";
import { clearUser } from '@/features/user/userSlice';
import Cookies from 'js-cookie';

const Navbar = () => {

    const router = useRouter();
    // For the authentication 
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    // For the authentication User
    const dispatch = useDispatch();
    const userInfos = useSelector((state) => state.user);
    const [userSessionID, setUserSessionID] = useState(0);

    useEffect(() => {
        if (userInfos?.id !== 0) {
            setUserSessionID(userInfos.id)
        }
    }, [])

    const handleSignOut = async () => {
        setLoading(true)
        const data = await signOut({redirect: false, callbackUrl: "/"})
        data.url
        router.push(data.url)
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading(true)
        Cookies.remove('id');
        Cookies.remove('email');
        Cookies.remove('firstName');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        dispatch(clearUser());
        setLoading(false)
    }

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

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                    Posez une question
                </Link>
                <button type="button" onClick={() => handleSignOut()} className="outline_btn">
                    Déconnexion
                </button>
                <Link href="/profile">
                    {session?.user.image?.includes('platform-lookaside') ? (
                    <p className="font-bold text-white black_btn">{session?.user.name.substr(0, 2).toUpperCase()}</p>
                    ) : (
                    <Image src={session?.user.image} width={30} height={30} className="rounded-full" alt="profile" />
                    )}
                </Link>
                </div>
            ) : userSessionID ? (
                <div className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="black_btn">
                    Posez une question
                </Link>
                <button type="button" onClick={() => handleLogout()} className="outline_btn">
                    Déconnexion
                </button>
                <Link href="/profile">
                    <div>
                        <p className="font-bold text-white black_btn">{userInfos?.firstName.substr(0, 2).toUpperCase()}</p>
                    </div>
                </Link>
                </div>
            ) : (
                <>
                    <Link href="/login">
                    <button type="button">Connexion</button>
                    </Link>
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