import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { validUser, blankUser, inValidUser } from 'mocks/user';

export class mockLoginService{
  checkLogin(user){
    return (user.userName == validUser.userName && user.password == validUser.password);
  }
}
let router = {
  navigate: jasmine.createSpy('navigate')
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule,
        RouterTestingModule.withRoutes([])],
      providers: [{ provide: LoginService, useClass: mockLoginService }, {provide: Router, useValue: router}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.errorMsg).toBeUndefined();
  });
  
  it('form value should update on entering input', (() => {
    component.loginForm.setValue(validUser);
    expect(component.loginForm.value).toEqual(validUser);
  }));

  it('should validate form on entering correct value', () =>{
    component.loginForm.setValue(validUser);
    expect(component.loginForm.valid).toBeTruthy();
  })

  it('should invalidate form on entering blank', () =>{
    component.loginForm.setValue(blankUser);
    expect(component.loginForm.valid).toBeFalsy();
  }) 

  it('login button should be disabled when form is invalid', () =>{
    component.loginForm.setValue(blankUser);
    expect(component.loginForm.valid).toBeFalsy();
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  })

  it('should navigate to dashboard on entering valid user', ()=>{
    component.loginForm.setValue(validUser);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.loginSuccess).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  })

  it('should show error on entering invalid user', ()=>{
    component.loginForm.setValue(inValidUser);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.loginSuccess).toBeFalsy();
    expect(component.errorMsg).toEqual('User name or password is wrong.');
  })
});
