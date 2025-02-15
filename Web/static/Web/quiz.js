(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
        // show current slide questions 
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;

      // dont show prev button if on first slide
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }

        // dont show next button if on last slide  
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        //submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        //submitButton.style.display = 'none';
      }
    }
  
    // go to next Slide
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    // go to prev slide
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    function getQuestions(){
      fetch("/quiz_questions")
    .then(response => response.json())
    .then(questions => {
        myQuestions = questions;
        buildQuiz();
        previousButton = document.getElementById("previous");
       nextButton = document.getElementById("next");
       slides = document.querySelectorAll(".slide");
        // Show the first slide
    showSlide(currentSlide);
    
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
        // Print questions
        console.log(myQuestions);
    })
    .catch(e => console.log(e));
    }

    

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    // Pre-set Questions
    var myQuestions = [
      
    ];
  
    getQuestions();
    console.log(myQuestions)
    // Kick things off
   // buildQuiz();
  
    // Pagination
    var previousButton 
    var nextButton
    var slides
    var currentSlide = 0;
  
   
  

  })();
  