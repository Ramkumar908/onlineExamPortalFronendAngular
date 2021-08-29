import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  loginData = {
    email: '',
    
  };


  constructor(private userService:UserService,private snack:MatSnackBar,private quizService:QuizService,private router:Router) { }

  ngOnInit(): void {

    
  }

  formSubmit()
  {
    //sendOtpForgetPassUser
    console.log("calling from subitForm");
    console.log("after submit form data userMail is"+this.loginData.email);
    if (
      this.loginData.email.trim() == '' ||
      this.loginData.email == null
    ) {
      this.snack.open('email is required !! ', '', {
        duration: 3000,
      });
      return;
    }
     let token=localStorage.getItem("token");
         localStorage.setItem("email",this.loginData.email);
         localStorage.setItem("otpSendType","forgotUser");
       this.userService.sendOtpForgetPassUser(this.loginData.email).subscribe((response:any)=>{
         if(response.statusCode==200)
         {
                Swal.fire(response.statusMessage);
                this.router.navigateByUrl("/User_otp");
    

         }
         

         
     //  this.router.navigateByUrl("/User_otp");

     // console.log("response we get at string is"+response);
    })
    
  }

}
