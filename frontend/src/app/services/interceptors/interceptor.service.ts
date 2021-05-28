import { environment } from 'src/environments/environment';
import { SwalService } from './../swal/swal.service';
import { AuthService } from './../auth/auth.service';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private Token: TokenService, private router: Router, private Auth: AuthService, private swal: SwalService, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.Token.getToken();

    const request = this.getHeaders(req, token);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.message === "Token has expired") {
          return this.refreshToken(request, next);
        }

        if (error.error.message === "Token has expired and can no longer be refreshed") {
          this.swal.alerta('La sesión ha expirado', 'warning');
          this.Token.remove();
          this.Auth.changeAuthStatus(false);
          this.router.navigate(['login']);
        }

        return throwError(error);

      })
    );
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.http.post(environment.apiUrl + 'refresh', {}).pipe(switchMap((data: any) => {
        this.Token.setToken(data.access_token, data.user);
        this.isRefreshing = false;
        this.refreshTokenSubject.next(data.access_token);
        return next.handle(this.getHeaders(request, data.access_token));
      }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.getHeaders(request, jwt));
        }));
    }
  }

  private getHeaders(request: HttpRequest<any>, token: string) {

    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    if (request.method === 'POST' && request.body.toString() === "[object FormData]") {
      headers = headers.delete('Content-Type', 'application/json; charset=utf-8');
    }

    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    return request = request.clone({
      headers
    });
  }

}
