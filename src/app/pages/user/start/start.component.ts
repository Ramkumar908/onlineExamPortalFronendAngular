import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid;
  questions;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  noOfQuestion;
  username;
  public number = 0;
  public search: any;
  arrayOfItems = [1,2];
  showSubmitButtonStatus:boolean=false;
  previousButtonShowStatus:boolean=false;

  isSubmit = false;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private userService:UserService,
    private dataService:DataService

  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
   
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        if(this.number==0)
        {
          this.previousButtonShowStatus=false;

        }
        // console.log(JSON.stringify(data));
        // JSON.stringify(data);
        // console.log(data.quesId);
        this.timer = this.questions.length * 1 * 60;
        // console.log(this.questions[0]);
      
        //   console.log (this.questions[0]);

          this.questions.forEach(function (value) {
            console.log(value.quiz.numberOfQuestions);
          }); 
          let currentQuestion = this.questions[this.number];
          console.log(currentQuestion)
          this.search = currentQuestion; 
        let details=this.questions[0];
        console.log(details.quesId)
        this.startTimer();
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {


    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = data.Student_Sheet.marksGot;
        this.correctAnswers = data.Student_Sheet.correctAnswers;
        this.attempted = data.Student_Sheet.attempted;
        this.isSubmit = true;
        // this.marks.attempted=data.attempted;
        // this.marks.correctAnswers=data.correctAnswers;
        // this.marks.marksGot=data.marksGot;
        this.dataService.username.subscribe(res=>{
          console.log(res);
           this.username=res;
           console.log(this.username);
        })
       let details:any={
        "attempted":this.attempted,
        "correctAnswers":this.correctAnswers,
        "marksGot":this.marksGot

       }
       this.username=localStorage.getItem("username");
       let emaildata={
               "marksGot":this.marksGot,
               "correctAnswers":this.correctAnswers,
              "attempted":this.attempted
            }
       this._quiz.sendQuizDetailByEmail(this.username,emaildata).subscribe(res=>{
         console.log("Mail send");
       });
      },
      (error) => {
        console.log(error);
      }
    );
    
    
  }

  next(index) {
    let count = Object.keys(this.questions).length;
    this.number++;
    if(this.number<=1)
    {
      this.previousButtonShowStatus=false;

    }
     if (this.number == count) {
      this.showSubmitButtonStatus=true
       alert('you reached it on last Question'); 
       this.number --;
       return;
     }
    let nextQuestion = this.questions[this.number];
    this.search = nextQuestion;
    this.previousButtonShowStatus=true;

  }
  previous(index) {
    this.showSubmitButtonStatus=false

    this.number --;
    if (this.number < 0) {
      this.number = 0;
      this.previousButtonShowStatus=false;

        ;
    }

    
    let previousQuestion = this.questions[this.number];
    this.search = previousQuestion;
  }
}
