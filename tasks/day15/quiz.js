const quizData = [
    {q:"HTML stands for?",options:["Hyper Text Markup Language","High Text Machine Language","None","Hyperlinks Text"],answer:0},
    {q:"CSS is used for?",options:["Structure","Styling","Logic","Server"],answer:1},
    {q:"JS stands for?",options:["Java Style","JavaScript","Just Script","None"],answer:1},
    {q:"Paragraph tag?",options:["p","div","h1","span"],answer:0},
    {q:"CSS text color property?",options:["font","color","background","style"],answer:1},
    {q:"ID symbol in CSS?",options:[".","#","*","@"],answer:1},
    {q:"Console method?",options:["print()","console.log()","echo()","write()"],answer:1},
    {q:"HTML link tag?",options:["a","url","link","href"],answer:0},
    {q:"CSS extension?",options:[".html",".js",".css",".xml"],answer:2},
    {q:"JS extension?",options:[".java",".js",".css",".xml"],answer:1}
];

let currentQuestion=0;
let score=0;
let answers=[];
let time=12*60;
let timer;

function startQuiz(){
    let name=document.getElementById("studentName").value;
    let roll=document.getElementById("rollNo").value;
    if(name===""||roll===""){
        alert("Enter Name & Roll No");
        return;
    }
    document.getElementById("studentForm").classList.add("hidden");
    document.getElementById("quizSection").classList.remove("hidden");
    loadQuestion();
    startTimer();
}

function loadQuestion(){
    let data=quizData[currentQuestion];
    document.getElementById("questionTitle").innerText=`Question ${currentQuestion+1} of 10`;
    document.getElementById("questionText").innerText=data.q;

    let optionsHTML="";
    data.options.forEach((opt,i)=>{
        optionsHTML+=`<label><input type="radio" name="option" value="${i}"> ${opt}</label>`;
    });
    document.getElementById("options").innerHTML=optionsHTML;

    document.getElementById("progressBar").style.width=((currentQuestion)/quizData.length)*100+"%";

    if(currentQuestion===quizData.length-1){
        document.getElementById("nextBtn").innerText="Submit Quiz";
    }
}

function nextQuestion(){
    let selected=document.querySelector('input[name="option"]:checked');
    answers[currentQuestion]=selected?parseInt(selected.value):-1;
    currentQuestion++;
    if(currentQuestion<quizData.length){
        loadQuestion();
    }else{
        submitQuiz();
    }
}

function startTimer(){
    timer=setInterval(()=>{
        let minutes=Math.floor(time/60);
        let seconds=time%60;
        document.getElementById("time").innerText=`${minutes}:${seconds<10?"0":""}${seconds}`;
        if(time<=0)
        {clearInterval(timer);submitQuiz();}
        time--;
    },1000);
}

function submitQuiz(){
    clearInterval(timer);
    quizData.forEach((data,i)=>{
        if(answers[i]===data.answer){score++;}
    });
    let accuracy=(score/quizData.length)*100;

    document.getElementById("quizSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    document.getElementById("Name").innerText=document.getElementById("studentName").value;
    document.getElementById("Roll").innerText=document.getElementById("rollNo").value;
    document.getElementById("Marks").innerText=score;
    document.getElementById("Accuracy").innerText=accuracy.toFixed(0);
}