let currentQuestion = 0;
let totalQuestions = parseInt(questions.length);
let acertos = 0;


showQuestion();



function showQuestion(){
    progress = Math.floor((100/totalQuestions)*(currentQuestion))
    document.querySelector('.progress .progress--bar').style.width = `${progress}%`
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.questionArea .question').innerHTML = q.question;
        document.querySelector('.questionArea .options').innerHTML = '';
        for(let i in q.options){
            document.querySelector('.questionArea .options').innerHTML += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        });
    }else{
       finishQuiz();
    }
    
}

function optionClickEvent(e){
    console.log(e.target.getAttribute('data-op'));
    if(parseInt(e.target.getAttribute('data-op')) === questions[currentQuestion].answer){
        acertos++;
    }
    console.log(acertos);
    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
    let correctRate = (100/totalQuestions)*acertos;

    if(correctRate >= 80){
        document.querySelector('.scoreArea .scoreText1').innerHTML = `Parabéns!`;  
    }else if((correctRate < 80) && (correctRate > 50)){
        document.querySelector('.scoreArea .scoreText1').innerHTML = `Parabéns, mas pode melhorar!`;
    }else{
        document.querySelector('.scoreArea .scoreText1').innerHTML = `Ta ruim em!`;
    }
    document.querySelector('.scoreArea .scorePct').innerHTML = `(${correctRate}%)`;
    document.querySelector('.scoreArea .scoreText2').innerHTML = `Você respondeu ${totalQuestions} e acertou ${acertos}`;

    document.querySelector('.scoreArea button').addEventListener('click', startAgain);
}

function startAgain(){
    console.log("reiniciando");
    currentQuestion = 0;
    acertos = 0;
    correctRate = '';
    showQuestion();
}