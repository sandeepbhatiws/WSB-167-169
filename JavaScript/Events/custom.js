
function showHide(){
    document.getElementById('row').classList.toggle('d-none');
}

function imageChange(type){
    if(type == 1){
        document.getElementById('image1').src = '2.png';
        document.getElementById('image2').src = '1.png';
    } else {
        document.getElementById('image1').src = '1.png';
        document.getElementById('image2').src = '2.png';
    }
}

function mousemove(text){
    console.log(text.value);
}

function copyCut(text){
    console.log(text.value)
    document.getElementById('row').innerText = text.value;
}