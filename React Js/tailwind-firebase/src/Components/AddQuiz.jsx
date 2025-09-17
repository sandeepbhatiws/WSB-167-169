import React, { useState } from 'react'
import { getDatabase, ref, set } from "firebase/database";
import app from '../config/firebase';
import { toast } from 'react-toastify';

export default function AddQuiz() {

    const [isLoading, setIsLoading] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const db = getDatabase(app);

        const data = {
            question : e.target.question.value,
            option_1 : e.target.option_1.value,
            option_2 : e.target.option_2.value,
            option_3 : e.target.option_3.value,
            option_4 : e.target.option_4.value,
            correct_option : e.target.correct_option.value,
        }

        set(ref(db,'quizzes/'+Date.now()), data);

        e.target.reset();

        toast.success('Add quiz succussfully !')

        setIsLoading(false);
    }

    return (
        <>


            <nav class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                        <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Add Quiz</a>
                        </div>
                    </li>
                </ol>
            </nav>

            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add Quiz</h2>
                    <form onSubmit={formHandler} autoComplete='off'>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="question" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                                <input type="text" name="question" id="question" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your question" required="required" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="option_1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 1</label>
                                <input type="text" name="option_1" id="option_1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your Option 1" required="required" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="option_2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 2</label>
                                <input type="text" name="option_2" id="option_2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your Option 2" required="required" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="option_3" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 3</label>
                                <input type="text" name="option_3" id="option_3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your Option 3" required="required" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="option_4" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 4</label>
                                <input type="text" name="option_4" id="option_4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your Option 4" required="required" />
                            </div>
                            
                            <div class="sm:col-span-2">
                                <label for="correct_option" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correct Option</label>
                                <select id="correct_option" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select Correct Option</option>
                                    <option value="A">Option 1</option>
                                    <option value="B">Option 2</option>
                                    <option value="C">Option 3</option>
                                    <option value="D">Option 4</option>
                                </select>
                            </div>
                            
                        </div>

                        <div>
                        <button type="submit" class="mt-4 inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400" disabled={ isLoading == 1 ? 'disabled' : '' }>
                            
                            {
                                isLoading
                                ?
                                <>
                                <svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Processing…
                                </>
                                :
                                'Add Quiz'
                            }
                            
                            
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
