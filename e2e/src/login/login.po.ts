import { browser, by, element } from 'protractor';
export class LoginPage {
    navigateTo(){
        return browser.get('/login');
    }
    getUserTextbox() {
        return element(by.id('username'));
       }
    getPasswordTextbox() {
       return element(by.id('password'));
      }
    getForm(){
        return element(by.tagName('form'));
    }
    getButton(){
        return element(by.id('login'));
    }
    getErrorBox(){
        return element(by.id('error'));
    }
    getPageTitleText() {
        return element(by.css('app-root p')).getText();
    }
}