var firebaseConfig = {
    apiKey: "AIzaSyBHkmF0N6DiXl1P4B04FQC5rYKhYdZELGE",
    authDomain: "atuh-class.firebaseapp.com",
    databaseURL: "https://atuh-class-default-rtdb.firebaseio.com",
    projectId: "atuh-class",
    storageBucket: "atuh-class.appspot.com",
    messagingSenderId: "266488143082",
    appId: "1:266488143082:web:78b39632a38a42f0fbcb93"
  };
  
  // Initialize Firebase
  var frb = firebase.initializeApp(firebaseConfig);


var questions = [
{
    question:"HTML stands for",
    option1:"Hyper Text markup language",
    option2:"Hyper Link markup language",
    option3:"Hyper Text makeup language",
    correctAns:"Hyper Text markup language"
},
{
    question:"CSS stands for",
    option1:"Cascading Style sheet",
    option2:"Cascading Styling sheet",
    option3:"Cascading super sheet",
    correctAns:"Cascading Style sheet"
},{
    question:"In how many ways can CSS be written in?",
    option1:"1",
    option2:"2",
    option3:"3",
    correctAns:"3"
},{
    question:"Which tag gives your the largest heading in html",
    option1:"<h6>",
    option2:"<h2>",
    option3:"<h1>",
    correctAns:"<h1>"
},{
    question:"how many data types in js?",
    option1:"6",
    option2:"7",
    option3:"8",
    correctAns:"8"
}
,{
    question:"how many days in febuary",
    option1:"30",
    option2:"28",
    option3:"29",
    correctAns:"28"
}]


var para = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var button = document.getElementById("btn");
var timer = document.getElementById("timer")
var index = 0;
var score = 0;
var min = 1;
var sec = 59;



setInterval(function(){
    timer.innerHTML = `${min}:${sec}`;
    sec--
    if(sec<0){
        min--;
        sec = 59    
    }
    if(min<0){
        min= 1;
        sec = 59;
        nextQuestion()
    }
},1000)


function nextQuestion(){

    var getOptions = document.getElementsByName("options");

    for(var i = 0;i<getOptions.length;i++)
    {
        if(getOptions[i].checked){
            var selectedValue = getOptions[i].value;
            // console.log(selectedValue)

            var selectedQues = questions[index - 1]["question"];
            // console.log(selectedQues) get Question
            var selectedAns = questions[index-1][`option${selectedValue}`]
            // console.log(selectedAns) Get Answer
            var correctAns = questions[index - 1]["correctAns"]
            // console.log(correctAns) Get Correct Answer
            if(selectedAns == correctAns){
                score++
                
            }
        
        var obj={
            Question:selectedQues,
            Answer:selectedAns,
            Correct:correctAns
        }
        var key = firebase.database().ref("Question").push().key

        firebase.database().ref("Question").child(key).set(key)

    }


        getOptions[i].checked = false
    }

    button.disabled = true

    if(index >questions.length - 1){

        Swal.fire(
            'Good job!',
        `Your percentage is ${((score / questions.length)*100).toFixed(2)}`,
            'success'
          )
          
    }
    

    
    else{
        
        para.innerHTML = questions[index].question;
        opt1.innerText = questions[index].option1;
        opt2.innerText = questions[index].option2;
        opt3.innerText = questions[index].option3;
        index++



        
    }
}
function reset(){
    min = 2;
    sec = "00";
   timer.innerHTML = `${min}:${sec}`;

}




function clicked()
{
    button.disabled = false
}

// if (score < 60 ){
//     Swal.fire(
//         'Oops!',
//     `Your percentage is ${((score / questions.length)*100).toFixed(2)}`,
//         'error'
//       )
// }