// // function addClass(){
// //     document.getElementById('answer1').classList.add('display');
// // }

// // function removeClass(){
// //     document.getElementById('answer2').classList.remove('display');
// // }

// // function toggleClass(){
// //     document.getElementById('answer3').classList.toggle('display');
// // }


// function toggleClass(i){
//     document.getElementById('answer'+i).classList.toggle('display');
// }



// // var output = document.getElementById('question1').parentNode
// // var output = document.getElementById('question1').parentElement

// // var output = document.querySelector('#question1').parentNode

// // var output = document.querySelector('.faq').childNodes
// // var output = document.querySelector('.faq').children

// // var output = document.querySelector('.faq').firstElementChild

// // var output = document.querySelector('.faq').lastElementChild

// // var output = document.getElementById('faqquestion1').nextElementSibling

// var output = document.getElementById('faqquestion1').previousElementSibling


// console.log(output);



// // for(var data of output){
// //     console.log(data);
// // }


// // output.forEach((value) => {
// //     console.log(value);
// // })


var faqquestion = document.querySelectorAll('.faqquestion');

faqquestion.forEach((element, index) => {
    element.addEventListener('click', (event) => {

        console.log(index);
        event.target.nextElementSibling.classList.toggle('display');
        
        if(event.target.children[0].innerText == '-'){
            event.target.children[0].innerText = '+';
        } else {
            event.target.children[0].innerText = '-';
        }

        faqquestion.forEach((e, i) => {
            if(index != i){
                e.lastElementChild.classList.add('display');
                e.firstElementChild.children[0].innerText = '+';
            }
            
        })
    })
})


