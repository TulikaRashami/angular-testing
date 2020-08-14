import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData:any[];
  constructor(private httpClient: HttpClient) { 
    this.getUserData();
  }
  getUserData(){
    this.httpClient.get('./assets/data.json').subscribe((data:[]) =>{
      this.userData = data;
    })
  }

  checkLogin(user){
    let isUser:boolean = false;
      for(let i=0; i<this.userData.length; i++){
        if(this.userData[i].userName == user.userName){
          if(this.userData[i].password == user.password){
            isUser = true;
            break;
          }
        }
      }   
   
    return isUser;
  }
}
