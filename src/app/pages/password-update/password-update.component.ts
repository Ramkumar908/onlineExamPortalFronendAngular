import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
    
  loginData = {
    password: '',
    confirmpassword: '',
  };


  constructor(

    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  formSubmit()
  {

    let data={
      email:localStorage.getItem("email"),
      password:this.loginData.password

    }
    console.log("password after update "+this.loginData.password);
    console.log("calling from update Password function");
    if(this.loginData.password==this.loginData.confirmpassword)
    {
      console.log("password match"+this.loginData.password);
      this.userService.updateUserPass(data).subscribe((response:any)=>{
        Swal.fire("password Update Successfully");
        this.router.navigateByUrl("/login");

        console.log("calling from update pass api and getting response"+response)
      })
    }
    else{
      Swal.fire("password not match");
      return;
    }
  }

}
