import { SwalService } from './../../services/swal/swal.service';
import { AuthService } from './../../services/auth/auth.service';
import { TokenService } from './../../services/token/token.service';
import { ApiService } from '../../services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  public error: any = null;

  constructor(private _fb: FormBuilder, private _api: ApiService, private _token: TokenService, private _router: Router, private _auth: AuthService, private _swal: SwalService) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.form = this._fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }


  login() {
    this._api.post('login', this.form.value).subscribe(
      (data) => {
        this._token.setToken(data.access_token, data.user);
        this._auth.changeAuthStatus(true);
        this._swal.alerta('Bienvenido', 'success', 5000);
        this._router.navigate(['home']);
      }, (error) => {
        if (error.error.errors) {
          this.error = error.error.errors;
        } else {
          this.error = error.error;
        }
      }
    );
  }

}
