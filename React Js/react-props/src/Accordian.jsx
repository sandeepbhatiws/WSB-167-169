import React, { useState } from 'react'
import Question from './Question'
import faqData from './faqData'

export default function Accordian() {

    const[questionAnswer, setQuestionAnswer] = useState(faqData);
    const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <section class="faq">

        {
            questionAnswer.map((v,i) => {
                return(
                    <Question key={i} index={i} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} data={v}/>
                )
            })
        }
            
        </section>
    </>
  )
}
