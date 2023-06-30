
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

import createAnswer from "@/app/api/answer/route";

const Answer = ({ evaluationId, userId, answerData }) => {

    const { data: session } = useSession();
    const [content, setContent] = useState("");

    console.log("evaluationId", evaluationId);
    console.log("userId", userId);
    console.log("answerData", answerData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentInfos = {
            evaluations: evaluationId,
            author: userId,
            content: content
        }

        await createAnswer(commentInfos);
    }
    
    return (
        <section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
            <div>
                <div class="divide-y divide-gray-200">
                    <div class="pb-4">
                        <h2 id="activity-title" class="text-lg font-medium text-gray-900">Commentaires</h2>
                    </div>
                    <div class="pt-6">
                    <div class="flow-root">
                        {answerData?.length === 0 ? (
                        <p>Aucun commentaire.</p>
                        ) : (
                        <ul role="list" class="-mb-8">
                        {answerData?.map((answer, index) => (
                        <li key={index}>
                            <div className="relative pb-8">
                            <div className="relative flex items-start space-x-3">
                                <div className="relative">
                                <img className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" src={answer.author.profile_picture} alt={answer.author.username}/>
                                <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                <div>
                                    <div className="text-sm">
                                    <a href="#" className="font-medium text-gray-900">{answer.author.username}</a>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Commented 2h ago</p>
                                </div>
                                <div className="mt-2 text-sm text-gray-700">
                                    <p>{answer.content}</p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </li>
                        ))}
                        </ul>
                    )}
                    </div>
                    {session ? (
                        <div class="mt-6">
                        <div class="flex space-x-3">
                        <div class="flex-shrink-0">
                            <div class="relative">
                            <img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" src={session?.user.image} alt={session?.user.username} />
                            <span class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            </div>
                        </div>
                        <div class="min-w-0 flex-1">
                            <form action="#">
                            <div>
                                <label for="comment" class="sr-only">Commenter</label>
                                <textarea id="comment" name="comment" rows="3" class="shadow-sm block w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm border border-gray-300 rounded-md" placeholder="Laisser un commentaire" onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>
                            <div class="mt-6 flex items-center justify-end space-x-4">
                                {/* <button type="button" class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                                <svg class="-ml-1 mr-2 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <span>Close issue</span>
                                </button> */}
                                <button type="submit" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" onClick={handleSubmit}>Commenter</button>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>

                    ) : (

                        <div className="mt-6">
                            <p>Connectez vous pour laisser des commentaires</p>
                        </div>

                    )}
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default Answer