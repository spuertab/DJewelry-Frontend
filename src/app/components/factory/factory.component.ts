import { Component, OnInit, Inject, Renderer, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three-full';

@Component({
    selector: 'app-factory',
    templateUrl: './factory.component.html',
    styleUrls: ['./factory.component.scss'] 
})
export class FactoryComponent implements OnInit, OnDestroy {

    @ViewChild('container') elementRef: ElementRef;
    private container : HTMLElement;

    constructor( private element : ElementRef ) {
        console.log(THREE);
    }

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
        navbar.classList.remove('navbar-transparent');
 
        this.container = this.elementRef.nativeElement;
        this.init();
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    } 
    
    init() {
        var scene, camera, renderer, controls;
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 7, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set(-5, 12, 10);
        camera.lookAt( scene.position );

        renderer = new THREE.WebGLRenderer({
        alpha: true,
            antialias: true
        });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth - 500, 500 );

        this.container.appendChild( renderer.domElement );

        /////////////////////////////////////////
        // Trackball Controller
        /////////////////////////////////////////
        controls = new THREE.TrackballControls( camera );
        controls.rotateSpeed = 5.0;
        controls.zoomSpeed = 3.2;
        controls.panSpeed = 0.8;
        controls.noZoom = true;
        controls.noPan = true;
        controls.staticMoving = false;
        controls.dynamicDampingFactor = 0.2;

        /////////////////////////////////////////
        // Lighting
        /////////////////////////////////////////
        var iphone_color  = '#FAFAFA',
            ambientLight  = new THREE.AmbientLight( '#DDDDDD' ),
            hemiLight     = new THREE.HemisphereLight( iphone_color, iphone_color, 0 ),
            light         = new THREE.PointLight( iphone_color, 1, 100 );

        hemiLight.position.set( 0, 50, 0 );
        light.position.set( 0, 20, 10 );

        scene.add( ambientLight );
        scene.add( hemiLight );
        scene.add( light );

        /////////////////////////////////////////
        // Render Loop
        /////////////////////////////////////////
        function renderPhone() {
            renderer.render( scene, camera );
        }

        // Render the scene when the controls have changed.
        // If you don’t have other animations or changes in your scene,
        // you won’t be draining system resources every frame to render a scene.
        controls.addEventListener( 'change', renderPhone );

        // Avoid constantly rendering the scene by only 
        // updating the controls every requestAnimationFrame
        function animationLoop() {
        requestAnimationFrame(animationLoop);
        controls.update();
        }

        animationLoop();

        /////////////////////////////////////////
        // Window Resizing
        /////////////////////////////////////////

        window.addEventListener( 'resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
            controls.handleResize();
            renderPhone();
        }, false );

        /////////////////////////////////////////
        // Object Loader
        /////////////////////////////////////////
        var dae, loader = new THREE.ColladaLoader();

        function loadCollada( collada ) {
        dae = collada.scene;
        dae.position.set(0.4, 0, 0.8);
        scene.add(dae);
        renderPhone();
        }

        loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/392/iphone6.dae', loadCollada);
    }
}