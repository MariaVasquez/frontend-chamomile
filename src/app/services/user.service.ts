import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { User } from "../models/user/UserModel";
import { Observable } from "rxjs";

const apiUrl = `${environment.endpointRestBaseWithPort}`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  saveUser(user: User): Observable<User> {
    const url = `${apiUrl}${environment.suffixEndpointWsRestRegisterUser}`;
    return this.http.post<any>(url, user, httpOptions);
  }
}
