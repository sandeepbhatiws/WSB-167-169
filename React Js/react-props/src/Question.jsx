import React from 'react'

export default function Question({ index, currentIndex, setCurrentIndex, data }) {

    // console.log(index)
    // console.log(currentIndex)


    const showAnswer = (i) => {
        if(currentIndex == i){
            setCurrentIndex('empty');
        } else {
            setCurrentIndex(i);
        }
    }


    return (
        <>
            <div class="faqquestion">
                <div class="question" onClick={ () => showAnswer(index) }>
                    {data.title}
                    <span> { index == currentIndex ? '-' : '+' }</span>
                </div>
                <div class={ index == currentIndex ? 'answer' : 'answer display' }>
                    {data.body}
                </div>
            </div>
        </>
    )
}
