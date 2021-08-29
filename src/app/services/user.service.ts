import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }


  public sendOtpForgetPassUser(email)
  {
    
    //let headers=new Headers();
    //headers.append("Authorization",token);
   
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': token });
    //  let options = { headers: headers };

    // var header = {
    //   headers: new HttpHeaders.a('Authorization',  `Basic ${btoa(AuthService.getToken())}`)
    // }
    
    return this.http.post(`${baseUrl}/forgotPas/${email}`,{});
  }
  

  verifyUserOtp(data:any)
  {
    return this.http.post(`${baseUrl}/user/verifyOtp`,data)
  }

  updateUserPass(data:any)
  {
    return this.http.post(`${baseUrl}/user/update/password`,data);
  }

  uploadStudyMaterial(data:any)
  {
     return this.http.post(`${baseUrl}/user/pdfUpload`,data); 
  }

  studyMaterialdownload()
  {
    var url="http://localhost/PhpFile/index.php";
    window.open(url);
  }
}
