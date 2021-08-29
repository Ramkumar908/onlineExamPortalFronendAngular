import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  catId;
  quizzes;
  isLoggedIn = false;
  user = null;
  events:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    //console.log("getting is logged in "+this.isLoggedIn);
    
     if(this.isLoggedIn)
     {
     //  console.log("calling from if ");
    this._route.params.subscribe((params) => {
      this.catId = 0;
      //console.log("catId we get is"+this.catId);
      if (this.catId == 0) {
        //console.log('Load all the quiz');

        this._quiz.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            //console.log("no of Question "+this.quizzes.numberOfQuestions);
          },
          (error) => {
            console.log(error);
            alert('error in loading all quizzes');
          }
        );
      } else {

        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            alert('error in loading quiz data');
          }
        );
      }
    });
  
  }
  else{
    Swal.fire("please login to acess previous test");
   this.router.navigateByUrl("/login");


  }
}


}
