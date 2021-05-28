import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  appitems = [
    {
      label: 'Home',
      link: '/home',
      icon: 'home'
    },
    {
      label: 'Mapa',
      link: '/mapa',
      icon: 'map',
    },
  ];


  config = {
    paddingAtStart: true,
    listBackgroundColor: 'white',
    fontColor: 'black',
    backgroundColor: 'white',
    selectedListFontColor: '#2776DF',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
