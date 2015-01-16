(function (){

  window.QuizPresenter = {}

  QuizPresenter.displayIntro = function(){
    var data = $('#question')
    data.empty()
    var textbox = $('<input>')
    textbox.attr('type', 'text')
    var my_button = $('<button>')
    my_button.text("Submit")

    data.append("Enter Your Name: ")
    data.append($('<br>'))
    data.append(textbox)
    data.append(my_button)
  }

  QuizPresenter.displayQuestion =function(q){
    var data = $('#question');
    data.empty()
    var my_title = $('<h4>').text(q.title)
      var my_question = $('<p>').text(q.text)
      var my_choices = $('<form>')
      q.choices.forEach(function(c){
        var this_choice = $('<input>')
        this_choice.attr('type', 'radio')
        this_choice.attr('value', c)
        this_choice.attr('checked', false)
        my_choices.append(this_choice)
        my_choices.append(c)
        my_choices.append($('<br>'))
      })
      var my_button = $('<button>')
      my_button.text("Submit")
      my_button.prop('disabled', true)
  
  
    data.append(my_title)
    data.append(my_question)
    data.append(my_choices)
    data.append(my_button)
  }

  QuizPresenter.displayScore = function(name, points, my_high, leader, n){
    var data = $('#question');
    data.empty()
    var leader_score = $('<h4>')
    leader_score.text("The top score is " + leader[1] + ", set by "+ leader[0]+".")
    var avg_score = $('<h3>')
    avg_score.text("The average score is " + leader[2] +".")
    var my_score = $('<h3>')
    my_score.text("You scored " + points + " out of " + n + " possible points.")
    var my_high_score = $('<h4>')
    my_high_score.text("Your highest score is " + my_high + ".")
    var my_button = $('<button>')
    my_button.text("Replay?")
    
    data.append(leader_score)
    data.append(avg_score)
    data.append(my_score)
    data.append(my_high_score)
    data.append(my_button)
  }


})()