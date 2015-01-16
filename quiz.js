(function (){

var questions = [];
var current_answer;
var points;
var name;


function addQuestion(ti, te, ch, an){
   questions.push({title: ti, text: te, choices: ch, answer: an});
}

function initialize(){
  QuizPresenter.displayIntro()

  $('button').on('click', function(){
    name = $('input').val()
    loadQuestion(0)
  })
  points = 0
  
}

function loadQuestion(n){
  var q = questions[n]

  QuizPresenter.displayQuestion(q)

  current_answer = null;
  
  $("input").on('click', function(){
    $("input").prop('checked', false)
    $(this).prop('checked', true)
    current_answer = $(this).val();
    $('button').prop('disabled', false)
  })

  $('button').on('click', function(){
    handleAnswer(q.answer, n)
  })

}

function showScore(){
  if (localStorage.getItem(name) < points || localStorage.getItem(name) == null){
    localStorage.setItem(name, points)
  }
  var my_high = localStorage.getItem(name)
  var leaderboard = leaderAndAverages()

  QuizPresenter.displayScore(name, points, my_high, leaderboard, questions.length)
  
  $('button').on('click', function(){
    initialize()
  })

}

function handleAnswer(a, n){
  if (a == current_answer){
    points++
  }
  if (n < questions.length - 1){
    loadQuestion(n+1)
  }
  else{
    showScore();
  }
}

function leaderAndAverages(){
  var max_name;
  var max = 0;
  var count = 0;
  var sum = 0;
  for (var a in localStorage) {
    count++;
    sum += parseInt(localStorage[a])
    if( localStorage[a] > max){
      max = localStorage[a];
      max_name = a;
    } 
  }

  return [max_name, max, Math.floor((sum/count) + 0.5];
}


addQuestion("Friends", "Who had Ross's baby?", ["Monica", "Phoebe", "Rachel"], "Rachel")
addQuestion("Headlines", "Where is Charlie Abdou?", ["London", "Paris", "Nice", "Amsterdam"], "Paris")
addQuestion("Pokemon", "Who beats Charmander?", ["Squirtle", "Bulbasaur"], "Squirtle")
addQuestion("Geography", "What is the best city in Texas?", ["San Antonio", "Austin", "Dallas", "Houston"], "Austin")
addQuestion("SSB", "Who is David's favorite?", ["Capt Falcon", "Samus", "Link"], "Capt Falcon")
addQuestion("SSB2", "Who is Gilbert's favorite?", ["Link", "Kirby", "Jigglypuff"], "Jigglypuff")
initialize()

})()

