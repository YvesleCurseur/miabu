import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";

import axios from 'axios';

import { getListUser } from '../../user/route';
import { REGISTER } from '../..';

const { User } = getListUser();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      User?.some(user => user.email === session.user.email);
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        const emailToCheck = user?.email;
        // check if user already exists
        const userExists = await User?.some(user => user.email === emailToCheck);
        // if not, create a new object user and save it to the database
        if (!userExists) {
          // Create a new user object with the required data
          const newUser = {
            email: user?.email,
            username: user?.name,
            password: null,
            is_social_network: true,
            profile_picture: user?.image || null,
          };
          // Make a POST request to the backend endpoint
          await axios.post(REGISTER, newUser)
            .then((response) => {
              // Handle the response if needed
              console.log(response.data);
            })
            .catch((error) => {
              // Handle any errors that occur during the request
              console.error('The error', error);
            });
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
})

export { handler as GET, handler as POST }