import { LoginPage } from './login.po';
import { validUser, blankUser, inValidUser} from '../../../mocks/user';

describe('Login tests', () => {
    let page: LoginPage;
    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();        
    });

    it('Login form should be valid', () => {
        page.getUserTextbox().sendKeys(validUser.userName);
        page.getPasswordTextbox().sendKeys(validUser.password);
        let form = page.getForm().getAttribute('class');
        expect(form).toContain('ng-valid');
    });

    it('Login form should be invalid', () => {
        page.getUserTextbox().sendKeys(blankUser.userName);
        page.getPasswordTextbox().sendKeys(blankUser.password);
        let form = page.getForm().getAttribute('class');
        expect(form).toContain('ng-invalid');
        expect(page.getButton().getAttribute('disabled')).toBeTruthy();
    });

    it('error should show on entering invalid user', () => {
        page.getUserTextbox().sendKeys(inValidUser.userName);
        page.getPasswordTextbox().sendKeys(inValidUser.password);
        let button = page.getButton();
        button.click();        
        expect(page.getErrorBox().isDisplayed).toBeTruthy();
        expect(page.getErrorBox().getText()).toEqual('User name or password is wrong.');
    });

    it('error should be blank on entering valid user', () => {
        page.getUserTextbox().sendKeys(validUser.userName);
        page.getPasswordTextbox().sendKeys(validUser.password);
        let button = page.getButton();
        button.click();
        expect(page.getCurrentUrl()).toEqual('/dashboard');
    });

});