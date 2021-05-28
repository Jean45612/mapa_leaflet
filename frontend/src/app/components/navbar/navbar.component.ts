import { AuthService } from './../../services/auth/auth.service';
import { ApiService } from './../../services/api/api.service';
import { TokenService } from './../../services/token/token.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() public logged = null;

  constructor(private token: TokenService, private api: ApiService, private Auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  username() {
    return this.token.getUser().email;
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.api.post('logout', '').subscribe(
      (data) => {
        this.handleLogout();
      }, (error) => {
        this.handleLogout();
      }
    );
  }

  handleLogout() {
    this.token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['login']);
  }

}
