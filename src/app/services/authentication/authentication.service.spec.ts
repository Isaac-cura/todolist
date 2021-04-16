import { TestBed } from '@angular/core/testing';
import { User } from '../../models/user.model';
import { LocalStorage } from '../../enums/localstorage.enums';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
    localStorage.clear();
    user  =  {
      username: 'test username',
      email: 'demon.mystery@gmail.com',
      password: 'aA12345#'
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('register user', () => {
    service.registerUser(user);
    expect(JSON.parse(localStorage.getItem('users'))?.find(_user => user.email == _user.email)).toBeDefined();
  });

  it('user just be registered one time', () => {
    service.registerUser(user);
    service.registerUser(user);
    expect(JSON.parse(localStorage.getItem('users'))?.filter(_user => user.email == _user.email).length).toBe(1);
  });

  it('authenticate existing user', () => {
    service.registerUser(user);
    service.login(user.email, user.password ).subscribe(user => {
      expect(user).toBeDefined()
    });
  });

  it('autentication fail for not existing user', () => {
    service.registerUser(user);
    service.login(user.email, user.password + "532523").subscribe(user => {
      expect(user).toBeUndefined()
    }); 
  })

  it('verify that session is settet after authenticate', () => {
    service.registerUser(user);
    service.login(user.email, user.password ).subscribe(user => {
      const session: User = JSON.parse(localStorage.getItem(LocalStorage.SESSION));
      expect(session.email).toBe(user.email);
    });
  });

});
