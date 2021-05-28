import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient) {
  }

  get(url: string, urlParams?: any): Observable<any> {

    let params = urlParams ? '/' + urlParams : '';

    return this.http.get(environment.apiUrl + url + params);
  }

  post(url: string, body: Object): Observable<any> {
    return this.http.post(environment.apiUrl + url, JSON.stringify(body));
  }

  put(url: string, urlParams: HttpParams, body: Object): Observable<any> {
    return this.http.put(environment.apiUrl + url + '/' + urlParams, JSON.stringify(body));
  }

  delete(url: string, urlParams: HttpParams): Observable<any> {
    return this.http.delete(environment.apiUrl + url + '/' + urlParams);
  }
}

