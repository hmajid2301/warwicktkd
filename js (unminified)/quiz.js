//***********************************************
// quiz.js
// Takes the grade of the user
// then asks questions randomly from that grade
// or below, 10 questions are asked
// and keeps track of correct answers
// shown at the end.
//
// Once finished can reset the quiz
//**********************************************

$(document).ready(function() {

  //*******************************************
  // gradeNumber - white belt is 1 
  // black tag = 10 etc, gets questions based on 
  // grade
  //
  // questioNo - Keeps track of number of 
  // questions only 10 questions per 'round'
  //
  // correctAnswer - Keeps track number of 
  // correct answers, shows the user at the
  // end
  //
  // correct - current correct answer in the 
  // form Choice[nu,]
  //
  // clicked - checks if choice has already 
  // clicked i.e. doesn't allow double clicks
  //
  // start - checks if user has clicked the 
  // start button to begin the quiz
  //*******************************************
  var gradeNumber;
  var questionNo = 1;
  var correctAnswers = 0;
  var correct;
  var clicked = false;
  var start = false;

  //on click on a radio button on intro screen
  $(".radio-inline").click(function() {
    $("#quiz-container .radio-inline").removeClass("active")
    $(this).addClass("active");
  });

  //on click of start button, get selected radio button
  //get the value to get gradeNumber then get next question
  $(".start").click(function() {
    var selected = $("input[type='radio']:checked");
    gradeNumber = selected.val();

    getNextQuestion(gradeNumber);
    $(".intro").fadeOut(800).empty();
    start = true;
  });
  
  //When an option has been clicked
  //select choice and compare with correct
  //answer. Then show correct answer.
  //
  //If less than 10 questions have been 
  //asked get next question
  //
  //else
  //get end screen with correct answers
  //and reset button
  $("body").on('click','label' , function() {

      //if the option has been clicked return
      if(clicked || !start) {
        return;
      }
      //else user has clickec set to true
      else {
        clicked = true;
      }

      var choice = $(this).find('.choice').attr("id");
      if(choice == correct) {
        correctAnswers++;
      }

      next();

      //if less than 10, get next question
      if(questionNo < 10) {
        questionNo++;
        setTimeout(function() {getNextQuestion(gradeNumber)}, 1000);

        return false;
      }
      //else get end screen
      else {
        setTimeout(function() {getEnd()}, 1000);
        return false;
      }

  });

  //When reset button is clicked reset all variable
  //data, and get next question 
  $("body").on('click','.reset' , function() {
    correctAnswers = 0;
    questionNo = 1;
    $('.end').empty();
    getNextQuestion(gradeNumber);
  });



  //********************************************
  // @summary: Uses ajax to get a new question
  // to display. On Success deletes previous 
  // question and adds new one to html
  //
  // @param: gradeNumber - what grade question
  // should be retrieved 1 for white belt
  // 2 for yellow tag etc
  //********************************************
  function getNextQuestion(gradeNumber) {
    $.ajax ({
      type: "POST", 
      url: "getQuestions.php",
      dataType: 'json', 
      data: {
        "gradeNumber" : gradeNumber
      },
      success: function(quiz) {
        $(".question").empty();
        var html = getQuestion(quiz);
        $(".question").append(html);

        checkStringLength();
        clicked = false;
      }
    });
  }

  //********************************************
  // @summary: Using the data from ajax, 
  // generates the question in the correct
  // format with the 4 choices and the title
  // 
  // @param: array - Holds all the data from database
  // for that question such as each choice
  // correct answer etc.
  //
  // @return: Returns html, for the question in 
  // the form of title -> 4 choices.
  //********************************************
  function getQuestion(array) {


    var html = "<h3 class=''>" + array.question  + "</h3>";
    html += "<div class='container'> <div class='row'>";
    html += '<div class="question-no"> <div class="question-title">Questions</div> '
         + questionNo +'/10</div>';

    var numbers = [1,2,3,4];


      //for each choice (4 choices)
      for(i = 1; i < 5; i++) {
        
        //randomElement = is a random index from array
        //random = pick a random element from numbers index
        var randomElement = Math.floor(Math.random()*numbers.length);
        var random = numbers[randomElement];
        //splice array to get rid of element choosen so not choosen twice
        numbers.splice($.inArray(random, numbers),1);
        var choice = "ERROR";

        switch(random) {
          case 1:
            choice = array.choice1;
            break;

          case 2:
            choice = array.choice2
            break;

          case 3:
            choice = array.choice3;
            break;

          case 4:
            choice = array.choice4;
            break;
        }

        html += '<div class="option col-md-6">';
        html += '<div class="number">'+ i +'</div>';
        html += '<div class="radio">' + 
          '<label>' + '<input type="radio" name="Choices" class="choice" id="Choice'+random+'" value="option"'+ random +'>' + 
          choice + 
          '</label>' + 
          '</div>' +
          '</div>';

    }

    html += '</div>'; // end of container
        '</div>'; // end of row

    correct = array.correct;
    console.log(correct);
    return html;
  }

  //********************************************
  // @summary: checks the length of each label,
  // the inside text that is, if greater than 20
  // change the size of font and padding to make
  // it fit.
  //********************************************
  function checkStringLength() {
    $("label").each(function() {
      var choice = $(this).text();
      
      //if length of text greater than 20 characters
      if( choice.length > 20) {
        //change css to make it smaller
        $(this).css({
          "font-size" : "16px",
          "padding-top" : "27px",
          "padding-right" : "15px"
        });
      }
    });
  }

  //********************************************
  // @summary: Appends html for the final
  // section of the quiz at the end which 
  // shows number of correct answers and
  // reset button to start again
  //********************************************
  function getEnd() {
    $(".question").empty();
    var html = '<div class="container end">' + 
                '<div class="row">' + 
                  '<div class="question-no">' + 
                    '<div class="question-title">Correct Answers</div>' + 
                    correctAnswers +  '/10' +
                  '</div>' + 
                  '<button class="reset btn btn-danger">Reset</button>' +
              '</div>' + 
             '</div>';
    $('.question').append(html);
  }

  
  //********************************************
  // @summary: Ads correct answer and 
  // wrong answer icon then.
  //********************************************
  function next() {
    //if no correct icon has been added yet add one if not don't -> i.e. stops multiple icons from appearing when next button is pressed
    if(!$(".question").find(".correct").length) {  
      //for all radios
      $(".question input[type='radio']").each(function() {
        var current = $(this).attr("id");
        //if current radio is correct answer
        if(current == correct) {
          $(this).parent().append("<i class='correct fa fa-check'></i>").fadeIn(500);
          $(this).parent().addClass("correct-answer");
        }
        else {
          $(this).parent().append("<i class='wrong fa fa-remove'></i>").fadeIn(500);
          $(this).parent().addClass("wrong-answer");
        }
      });
    }
  }

});
