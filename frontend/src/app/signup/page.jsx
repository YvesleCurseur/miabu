"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { signUpUser } from '../api/user/route';

import InputField from '@/components/InputField';



const SignupPage = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is_social_network, setIsSocialNetwork] = useState(false);
  const [userSubmission, setUserSubmission] = useState({});
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    setUserSubmission({
      first_name,
      last_name,
      email,
      password,
      username,
      is_social_network
    });
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Reset errors
    // setErrors({});

    // // Perform validation
    // const validationErrors = {};

    // if (!first_name) {
    //   validationErrors.first_name = 'First name is required';
    // }

    // if (!last_name) {
    //   validationErrors.last_name = 'Last name is required';
    // }

    // if (!username) {
    //   validationErrors.username = 'Username is required';
    // }

    // if (!email) {
    //   validationErrors.email = 'Email is required';
    // }

    // if (!password) {
    //   validationErrors.password = 'Password is required';
    // }

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    // Handle form submission
    try {
      await signUpUser(userSubmission).then(
        (response) => {
          // check for token and user already exists with 200
          console.log(response)
          router.push('/login')
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Rejoignez la Communauté MibuSusu</h2>
        <p className="mt-2 text-sm text-gray-600">Obtenez plus de fonctionnalités et de privilèges en vous inscrivant</p>
        </div>
        <div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              type="text"
              label="First Name"
              value={first_name}
              error={errors.first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              name="lastName"
              type="text"
              label="Last Name"
              value={last_name}
              error={errors.last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

            <InputField
              name="username"
              type="username"
              label="Username"
              value={username}
              error={errors.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              name="email"
              type="email"
              label="Email address"
              value={email}
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              name="password"
              type="password"
              label="Password"
              value={password}
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
            />

          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
