"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react'
import { getProviders, signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

import { signInUser } from '../api/user/route';
import { getListUser } from '../api/user/route';

import { useSelector, useDispatch } from "react-redux";
import { setUser } from '@/features/user/userSlice';
import Cookies from 'js-cookie';

import GoogleSvg from '../../../public/icons/GoogleSvg';
import FacebookSvg from '../../../public/icons/FacebookSvg';

const Login = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    // Auth simple
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userInfos = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
        const response = await getProviders();
          setProviders(response);
        };
        setUpProviders();
    }, []);
    
    const handleSignIn = async (providerId) => {
        setLoading(true);
        await signIn(providerId, { callbackUrl: 'http://localhost:3000' });
        setLoading(false);
    };

    const handleLoginUser = async (e) => {
        e.preventDefault();
        try {
            await signInUser(email, password).then(
              (response) => {
                setLoading(true);
                //Use cookies forpersistent storage
                Cookies.set('id', response.user.id);
                Cookies.set('email', response.user.email);
                Cookies.set('firstName', response.user.first_name);
                Cookies.set('accessToken', response.access_token);
                Cookies.set('refreshToken', response.refresh_token);
                const userCallback = {
                  id: response.user.id,
                  email: response.user.email,
                  firstName: response.user.first_name,
                  accessToken: response.access_token,
                  refreshToken: response.refresh_token,
                }
                dispatch(setUser(userCallback));
                console.log(userInfos)
                setLoading(false);
                router.push('/')
              },
              (error) => {
                console.log(error);
              }
            );
        } catch (error) {
            console.log(error);
        }
    }

    if (session) router.push('/')

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="max-w-md w-full px-6 py-8">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Rejoignez la Communauté MibuSusu</h2>
                <p className="mt-2 text-sm text-gray-600">
                  En vous inscrivant avec votre compte Google ou Facebook
                </p>
              
                {/* <form className="mt-8 space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse Email
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/*
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Se rappeler de moi
                    </label>
                    </div>
                    <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Mot de passe oublié?
                    </a>
                    </div> 
                </div>


                <div>
                    <button
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 primary-red"
                        onClick={handleLoginUser}
                    >
                        Connecter
                    </button>     
                </div>
                </form> */}
      
                {/* Providers */}
                {providers && Object.values(providers).map((provider) => (
                  <div className="mt-4 flex justify-center" key={provider.id}>
                    <button
                      className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700"
                      onClick={() => handleSignIn(provider.id)}
                      type="button"
                    >
                      {provider.name === 'Google' ? <GoogleSvg /> : <FacebookSvg />} 
                      Connexion {provider.name}
                    </button>
                  </div>
                ))}

          </div>
        </div>
      );
      
}

export default Login