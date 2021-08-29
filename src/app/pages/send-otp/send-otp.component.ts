import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css']
})
export class SendOtpComponent implements OnInit {

  loginData = {
    otp: '',
    
  };

  email:String;
  otpSendType:any;

  constructor(
    private router:Router,
    private questionService:QuestionService,
    private quizService:QuizService,
    private userService:UserService,
    private snack:MatSnackBar

  ) { }

  ngOnInit(): void {

   this.otpSendType=localStorage.getItem("otpSendType");
   this.email=localStorage.getItem("email");
   console.log("before form submit the otpSendType is"+this.otpSendType);

  }
  
   
  formSubmit()
  {
    let data={
      "otp":this.loginData.otp,
      "username":localStorage.getItem("username"),
      "email":localStorage.getItem("email")
    }

    if(this.otpSendType=='registerUser')
    {
      console.log("after form submit in register the otpSendType is"+this.otpSendType);

      this.userService.verifyUserOtp(data).subscribe((response:any)=>{

        if(response.statusCode==200)
        {
          Swal.fire(response.statusMessage); 
          this.router.navigateByUrl('/login');
  
  
        }
        else{
          Swal.fire(response.statusMessage); 
          this.router.navigateByUrl("/signup")
  
        }
  
      })
    }

      if(this.otpSendType=='forgotUser')
      {
        console.log("after form submit in forgotUser the otpSendType is"+this.otpSendType);

        this.userService.sendOtpForgetPassUser(this.email).subscribe((response:any)=>{


          if(response.statusCode==200)
          {
            Swal.fire(response.statusMessage); 
            this.router.navigateByUrl('/updatePass');
    
          }
          else{
            Swal.fire(response.statusMessage); 
            return;
           // this.router.navigateByUrl('/login');
          }
        })
      }

    
  
  


  }

}
