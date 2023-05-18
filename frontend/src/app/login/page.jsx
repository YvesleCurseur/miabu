

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="max-w-md w-full px-6 py-8">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Rejoignez la Communauté MibuSusu</h2>
            {/* <p className="mt-2 text-sm text-gray-600">
            Obtenez plus de fonctionnalités et de privilèges en vous inscrivant
            </p> */}

            <form className="mt-8 space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
                </label>
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                </label>
                </div>

                <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 primary-red"
                >
                    Login
                </button>
                
                {/* Google Sign In */}
                <div className="mt-4 flex justify-center">
                <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700">
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 3C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H11V13H8V10H11V8.10003C11 5.60003 12.4204 4 15 4C15.9894 4 16.6176 4.07504 17.1121 4.19496V7.10928H15.3658C14.292 7.10928 14 7.67334 14 8.40479V10H17.0127L16.6284 13H14V21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3H4Z"
                        />
                    </svg>
                    Sign in with Google
                    </button>
                </div>

                <div className="mt-4 flex justify-center">
                    <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700">
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.2 12.25H20.8C21.7 12.25 22.4 11.55 22.4 10.75C22.4 9.95 21.7 9.25 20.8 9.25H17.35V14.25H13.2C11.05 14.25 9.25 12.45 9.25 10.25C9.25 8.05 11.05 6.25 13.2 6.25C15.35 6.25 17.15 8.05 17.15 10.25C17.15 10.65 17.05 11.05 16.95 11.45L14.9 10.4C14.75 10.3 14.55 10.25 14.35 10.25H13.2V12.25ZM4 4.75V19.25H11.6V13.75H16.75V10.75H11.6V9.25H19.25V6.25H11.6V4.75H4Z"
                        />
                    </svg>
                    Sign in with Facebook
                    </button>
                </div>


                </div>
            </form>
        </div>
    </div>

  )
}

export default Login