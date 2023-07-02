"use client";

import { getDetailEvaluation } from "@/app/api/assessment/route";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convert } from "html-to-text";

import { setShouldRefresh } from "@/features/refresh/refreshSlice";
import { downloadEvaluationWord } from "@/app/api/assessment/route";
import Answer from "@/components/Answer";
import Cookies from "js-cookie";

const Page = ({ params }) => {

  const [evaluationDetail, setEvaluationDetail] = useState([])
  const userId = Cookies.get("ID_MIABU")

  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);
  const dispatch = useDispatch()
  
  useEffect(() => {
    getDetailEvaluation(params.id).then((response) => {
      setEvaluationDetail(response)
    }) 
  })

  useEffect(() => {
    if (shouldRefresh) {
      getDetailEvaluation(params.id).then((response) => {
        setEvaluationDetail(response)
      }) 
      dispatch(setShouldRefresh(false));
    }
  }, [shouldRefresh, params.id, dispatch])
  
  const filenameWord = evaluationDetail?.title?.replace(/\s+/g, '_').toLowerCase() + '.docx';
  const evaluationFormatDate = new Date(evaluationDetail.create_at).toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false});
  
  const handleDownWordClick = () => {
    const evalutionTexte = convert(evaluationDetail.content);

    const wordData = {
      text: evalutionTexte,
      filename: filenameWord
    }
    downloadEvaluationWord(wordData);
  }
  
  return (
    <main class="flex-1">
      <div class="py-8 xl:py-10">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3">
          <div class="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
            <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{evaluationDetail.title}</h1>
                {/* <p class="mt-2 text-sm text-gray-500">
                  partagé par
                  <a href="#" class="font-medium text-gray-900">Hilary Mahy</a>
                  in
                  <a href="#" class="font-medium text-gray-900">Customer Portal</a>
                </p> */}
              </div>
              <div class="mt-4 flex space-x-3 md:mt-0">
                {/* <button type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  <svg class="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span>Edit</span>
                </button> */}
                <button type="button" className="inline-flex justify-center text-sm px-3 py-2 text-blue-500 bg-gray-200 hover:bg-gray-300" onClick={handleDownWordClick}>
                  {/* <svg class="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg> */}
                  <span>Téléchargez</span>
                </button>
              </div>
            </div>
            <aside class="mt-8 xl:hidden">
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
                  <span class="text-gray-900 text-sm font-medium">{evaluationDetail && evaluationDetail.answers ? evaluationDetail.answers.length : 0} Commentaires</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-900 text-sm font-medium">Partagé le {evaluationFormatDate}</span>
                </div>
              </div>
            </aside>
            <div class="py-3 xl:pt-6 xl:pb-0">
              <div class="prose max-w-none">
                <p className="whitespace-pre-line">
                  {convert(evaluationDetail.content)}
                </p>
              </div>
              <Answer
                answerData={evaluationDetail.answers}
                evaluationId={params.id}
                userId={userId}
              />
            </div>
          </div>
          <aside class="hidden xl:block xl:pl-8">
            <h2 class="sr-only">Details</h2>
            <div class="space-y-5">
              {/* <div class="flex items-center space-x-2">
                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
                <span class="text-green-700 text-sm font-medium">Open Issue</span>
              </div> */}
              <div class="flex items-center space-x-2">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-900 text-sm font-medium">{evaluationDetail && evaluationDetail.answers ? evaluationDetail.answers.length : 0} Commentaires</span>
              </div>
              <div class="flex items-center space-x-2">
    
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-900 text-sm font-medium">Partagé le {evaluationFormatDate}</span>
              </div>
            </div>
            <div class="mt-6 border-t border-gray-200 py-6 space-y-8">
              <div>
                <h2 class="text-sm font-medium text-gray-500">Auteur</h2>
                <ul role="list" class="mt-3 space-y-3">
                  <li class="flex justify-start">
                    <a href="#" class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <img class="h-5 w-5 rounded-full" src={evaluationDetail && evaluationDetail.author ? evaluationDetail.author.profile_picture : ""} alt={evaluationDetail && evaluationDetail.author ? evaluationDetail.author.username : ""} />
                      </div>
                      <div class="text-sm font-medium text-gray-900">{evaluationDetail && evaluationDetail.answers ? evaluationDetail.author.username : ""}</div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Page