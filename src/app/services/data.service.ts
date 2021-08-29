import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  private logindata= new BehaviorSubject<string>("");
  public username =this.logindata.asObservable();

  logindetails(username:string){
    console.log(username);
    this.logindata.next(username);
  }
}
