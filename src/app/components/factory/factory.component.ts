import { Component, OnInit, Inject, Renderer, ElementRef, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-factory',
    templateUrl: './factory.component.html',
    styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit, OnDestroy {

    constructor( private element : ElementRef ) {}

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

      navbar.classList.remove('navbar-transparent');
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    }
} 
