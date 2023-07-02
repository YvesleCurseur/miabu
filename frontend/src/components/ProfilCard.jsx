import React from 'react'

const ProfilCard = () => {
  return (
    <aside class="hidden xl:block xl:pl-8">
        <h2 class="sr-only">Details</h2>
        <div class="space-y-5">
            <div class="flex items-center space-x-2">
    
            <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
            </svg>
            <span class="text-green-700 text-sm font-medium">Open Issue</span>
            </div>
            <div class="flex items-center space-x-2">

            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-900 text-sm font-medium">4 comments</span>
            </div>
            <div class="flex items-center space-x-2">

            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-900 text-sm font-medium">Created on <time datetime="2020-12-02">Dec 2, 2020</time></span>
            </div>
        </div>
        <div class="mt-6 border-t border-gray-200 py-6 space-y-8">
            <div>
            <h2 class="text-sm font-medium text-gray-500">Assignees</h2>
            <ul role="list" class="mt-3 space-y-3">
                <li class="flex justify-start">
                <a href="#" class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                    <img class="h-5 w-5 rounded-full" src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" />
                    </div>
                    <div class="text-sm font-medium text-gray-900">Eduardo Benz</div>
                </a>
                </li>
            </ul>
            </div>
        </div>
    </aside>
  )
}

export default ProfilCard