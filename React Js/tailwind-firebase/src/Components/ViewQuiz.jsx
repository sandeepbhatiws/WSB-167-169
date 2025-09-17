import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../config/firebase';

export default function ViewQuiz() {

  const [quizData, setQuizData] = useState([]);


  useEffect(() => {
    const db = getDatabase(app);
    const getQuizs = ref(db, 'quizzes/');

    onValue(getQuizs, (quiz) => {

      var getData = quiz.val();

      var finalQuiz = [];
      for (var index in getData) {
        finalQuiz = [getData[index], ...finalQuiz];
      }

      setQuizData(finalQuiz);
    });
  }, [])


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
              <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">View Quiz</a>
            </div>
          </li>
        </ol>
      </nav>
      <nav class="bg-white dark:bg-gray-900 sticky max-w-screen-xl 0z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 mx-auto mt-10">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">View Quiz</h2>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  S.No
                </th>
                <th scope="col" class="px-6 py-3">
                  Question
                </th>
                <th scope="col" class="px-6 py-3">
                  Option 1
                </th>
                <th scope="col" class="px-6 py-3">
                  Option 2
                </th>
                <th scope="col" class="px-6 py-3">
                  Option 3
                </th>
                <th scope="col" class="px-6 py-3">
                  Option 4
                </th>
                <th scope="col" class="px-6 py-3">
                  Correct Answer
                </th>
              </tr>
            </thead>
            <tbody>
              {
                quizData.length > 0

                  ?
                  quizData.map((v, i) => {
                    return(
                      <FetchQuestion key={i} v={v} i={i} />
                    )
                  })
                  :
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" colSpan={7} class="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">No Record Found !!
                    </th>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </nav>

    </>
  )
}


function FetchQuestion({v, i}) {

  if(v.correct_option == 'A'){
    var correct_option = v.option_1;
  } else if(v.correct_option == 'B'){
    var correct_option = v.option_2;
  } else if(v.correct_option == 'C'){
    var correct_option = v.option_3;
  } else if(v.correct_option == 'D'){
    var correct_option = v.option_4;
  }

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {i + 1}
      </th>
      <td class="px-6 py-4">
        {v.question}
      </td>
      <td class="px-6 py-4">
        {v.option_1}
      </td>
      <td class="px-6 py-4">
        {v.option_2}
      </td>
      <td class="px-6 py-4">
        {v.option_3}
      </td>
      <td class="px-6 py-4">
        {v.option_4}
      </td>
      <td class="px-6 py-4">
        {correct_option}
      </td>
    </tr>
  )
}