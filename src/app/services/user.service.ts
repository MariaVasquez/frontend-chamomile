import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { User,UserLogin } from "../models/user/UserModel";
import { Observable } from "rxjs";

const apiUrl = `${environment.apiUrl}`;

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

  login(userLogin: UserLogin): Observable<UserLogin> {
    const url = `${apiUrl}${environment.suffixEndpointWsRestLogin}`;
    return this.http.post<any>(url, userLogin, httpOptions);
  }

  getUser(token: string, username:string): Observable<User> {
    const url = `${apiUrl}${environment.suffixEndpointWsRestGetUsername}?username=${username}`;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, httpOptions);
  }
}
