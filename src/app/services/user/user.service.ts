import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DTOUser, UserDatasource } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserDatasource[]> {
    return this.http.get<DTOUser[]>(environment.userEndpoint).pipe(map(users => {
      return users.sort((a, b) => a.name.localeCompare(b.name)).map(user => {
        return this.turnsDTOIntoDatasourceUser(user);
      });
    }));
  }

  private turnsDTOIntoDatasourceUser(user: DTOUser): UserDatasource {
    return {
      id: user.id,
      name: user.name + " " +user.lastName,
      "teléfono": user.phone,
      email: user.email,
      estado: user.status
    }
  }
}
