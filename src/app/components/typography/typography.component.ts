import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.scss']
})
export class TypographyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
        navbar.classList.remove('navbar-transparent');
    }

}
