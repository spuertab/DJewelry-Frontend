import { Component, OnInit, Inject, Renderer, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three-full';
import { FactoryService } from "./factory.service"

@Component({
    selector: 'app-factory',
    templateUrl: './factory.component.html',
    styleUrls: ['./factory.component.scss'],
    providers: [FactoryService],
})
export class FactoryComponent implements OnInit, OnDestroy {
    constructor( public factoryService: FactoryService ) {
    }

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
        navbar.classList.remove('navbar-transparent');
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    } 
}