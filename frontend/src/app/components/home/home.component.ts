import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public form = {
    email: null,
    gender: null,
    phone: null,
    name: {
      first: null,
      last: null
    }
  }

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {

  }

  getData() {
    this._http.get('https://randomuser.me/api/').subscribe(data => {
      this.form = data['results'][0];
    }, error => {
      console.log('error', error)
    })
  }

}
