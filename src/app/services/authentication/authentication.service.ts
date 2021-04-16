import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthenticationModels } from '../../models/authentication.models';
import { LocalStorage } from '../../enums/localstorage.enums';
import { UtilEnums } from '../../enums/util.enums';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  autehnticationSubject: Subject<AuthenticationModels.Session> = new ReplaySubject();
  
  constructor() { 
  }

  registerUser(user: User): Observable<User> {
    const users = this.getUsers();
    const validationError = this.validateUserToRegister(users, user);
    if(validationError) {
      return validationError;
    }
    return of(this.saveUserInPersistence(users, user));
  }

  login(email: string, password: string): Observable<User> {
    const user = this.getUserByEmailAndPassword(email, password);
    if(!user) {
      return throwError('Error al autenticar al usuario');
    }
    this.setSession(user);
    return of(user);
  }

  private getUserByEmailAndPassword(email: string, password: string): User {
    const users = this.getUsers();
    return users.find(users => users.email == email && users.password == password);
  }

  private setSession(user: User | AuthenticationModels.Session) {
    const session: AuthenticationModels.Session = {
      ...user,
      start: new Date().getTime()
    }
    this.startExpirationLimit();
    localStorage.setItem(LocalStorage.SESSION, JSON.stringify(user));
  }

  private startExpirationLimit() {
    const timeToExpire = UtilEnums.MillisecondTime.minute * 4;
    timer(timeToExpire).subscribe(time => {
      console.log("expira")
    });
  }

  private signOut() {
    this.clearSession();
    this.autehnticationSubject.next(null);
  }

  private clearSession() {
    localStorage.removeItem(LocalStorage.SESSION);
  }

  

  private saveUserInPersistence(users: User[], user: User): User {
    users.push(user);
    localStorage.setItem(LocalStorage.USERS, JSON.stringify(users));
    return user;
  }

  private validateUserToRegister(users: User[], user: User): Observable<any> {
    if(this.userExists(users, user)) {
      return throwError("El usuario ya existe")
    }
  }

  private userExists(users: User[], user: User) {
    return users.find(_user => _user.email == user.email);
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem("users")) || [];
  }
}
