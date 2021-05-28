import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public apiUrl = environment.apiUrl;

  private iss = {
    login: this.apiUrl + 'login',
    refresh: this.apiUrl + 'refresh'
  };

  constructor() { };

  setToken(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  remove() {
    localStorage.clear();
  }

  isValid() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);

      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
  }

  payload(token) {
    const payload = token.split('.')[1];

    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    if (this.isValid() && this.getUser()) {
      return true;
    }

    return false;
  }

}
