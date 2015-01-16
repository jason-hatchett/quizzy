(function (){

  window.Quiz = {}

  Quiz.vm = {
    questions: m.prop([]),
    current_answer: m.prop(null),
    question_index: m.prop(0),
    points: m.prop(0),
    name: m.prop(),
    selected: m.prop([]),
    leader: m.prop(),
    average_score: m.prop(),
    display: m.prop("intro")
  }

  Quiz.find_variable = function (var_name) {
    var items = Quiz.vm
    return items[var_name]
  }

  Quiz.controller = function(){
    var ctrl = {}

    var vm = Quiz.vm

    ctrl.addQuestion = function(ti, te, ch, an){
      vm.questions().push({title: ti, text: te, choices: ch, answer: an});
    }

    ctrl.initialize = function(){

      vm.points(0)
      vm.question_index(0)
      vm.display("intro")
    
    }
    
    ctrl.loadQuestion = function(){

      var q = vm.questions()[vm.question_index()]
      vm.selected(q.choices.
        map(function(x){
          return x = false
        })
      )
      vm.display("question")
    
    }
    
    ctrl.changeScore = function(){
      var name = vm.name()
      var points = vm.points()

      if (localStorage.getItem(name) < points || localStorage.getItem(name) == null){
        localStorage.setItem(name, points)
      }

      ctrl.leaderAndAverages()
    }
    
    ctrl.handleAnswer = function(){
      var len = vm.questions().length
      var current_answer = vm.current_answer()
      var n = vm.question_index()
      if (vm.questions()[n].answer == current_answer){
       vm.points(vm.points()+1)
      }
      if (n < len - 1){
        vm.question_index(n+1)
        vm.current_answer(null)
        ctrl.loadQuestion()
      }
      else{
        ctrl.changeScore()
      }
    }
    
    ctrl.leaderAndAverages = function(){
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
      vm.leader(max_name)
      vm.average_score(Math.floor((sum/count) + 0.5))
      vm.display("score")
    }

    return ctrl
  }

  Quiz.view = function(ctrl){
    var vm = Quiz.vm
    return [
      displayIntro(),
      displayQuestion(),
      displayScore()
    ]

    function displayIntro(){
      if (vm.display() == "intro"){
        return m('.intro', [
          m('label', "Enter Your Name"),
          m('input[type=text]',{
            onchange: m.withAttr('value', vm.name)
          }),
          m('button', {onclick: ctrl.loadQuestion}, "Submit")
        ])
      }
    }

    function displayQuestion(){
      if (vm.display() == "question"){
        var q = vm.questions()[vm.question_index()]
        return m('.question', [
          m('h4', q.title),
          m('p', q.text),
          m('form', q.choices.
            map(function(c, idx){
              return [
                m('input[type=radio]', {
                  name: 'question_' + vm.question_index(),
                  checked: vm.selected()[idx],
                  onchange: vm.current_answer.bind(null, idx)
                }),
                m('label',c)
              ]
            })
          ),
          m('button', {
            disabled: vm.current_answer() === null, 
            onclick: ctrl.handleAnswer
          },"Submit")
        ])
      }
    }

    function displayScore(){
      if (vm.display() == "score"){
        return m('.score', [
          m('h4', "Top Score: " + vm.leader() + " with " + localStorage.getItem(vm.leader())),
          m('h3', "Avg Score: " + vm.average_score()),
          m('h3', "Your Score " + vm.points()),
          m('h4', "Your Top Score: " + localStorage.getItem(vm.name())),
          m('button', {onclick: ctrl.initialize}, "Replay")
        ])
      }
    }


  }

})()