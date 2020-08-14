import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  errorMsg:String;
  loginSuccess: boolean;

  constructor(private router:Router, private loginService:LoginService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required,Validators.maxLength(20)])
    })
  }

  onSubmit(){
    if(this.loginForm.invalid) return; 
    
    let f = this.loginService.checkLogin(this.loginForm.getRawValue());
    if(f) {
      this.errorMsg = '';
      this.loginSuccess = true;
      this.router.navigate(['/dashboard']);}
    else {
      this.loginSuccess = false;          
      this.errorMsg = "User name or password is wrong."
    }    
  }
}
