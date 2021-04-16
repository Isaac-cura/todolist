import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { LocalStorage } from '../../enums/localstorage.enums';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  constructor() { }

  registerUser(user: User): Observable<User> {
    const users = this.getUsers();
    const validationError = this.validateUserToRegister(users, user);
    if(validationError) {
      return validationError;
    }
    return of(this.saveUserInPersistence(users, user));
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
