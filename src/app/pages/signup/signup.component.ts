import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService,private quizService:QuizService, private snack: MatSnackBar,private router:Router) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('User is required !!');
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      // alert('User is required !!');
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

      localStorage.setItem("username",this.user.username);
      localStorage.setItem("email",this.user.email);
      let data={
        username:this.user.username,
        password:this.user.password,
        firstName:this.user.firstName,
        lastName:this.user.lastName,
        email:this.user.email,
        phone:this.user.phone,

      }
      localStorage.setItem("otpSendType","registerUser");
    
      this.userService.addUser(data).subscribe((response:any)=>{

        console.log("getting response is"+response);
        if(response.statusCode=='200')
        {
          Swal.fire(response.statusMessage); 
          this.router.navigateByUrl('/User_otp');

        }
        
      })
    
    //validate

    //addUser: userservice
    // this.userService.addUser(this.user).subscribe(
    //   (data: any) => {
    //     //success
    //     //alert('success');
    //     Swal.fire('Otp send To your Register mail !!');
    //     // this.router.navigateByUrl('/login');
    //     this.router.navigateByUrl('/User_otp');

        
    //   },
    //   (error) => {
    //     //error
    //     console.log(error);
    //     // alert('something went wrong');
    //     this.snack.open(error.error.text, '', {
    //       duration: 3000,
    //     });
    //   }
    // );


  }

  //this.user
}
