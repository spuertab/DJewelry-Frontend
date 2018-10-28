import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as THREE from 'three-full';

@Component({
    selector: 'app-lab',
    templateUrl: './lab.component.html',
    styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit, OnDestroy {
    @ViewChild('canvasThree') canvasThree: ElementRef;
    @ViewChild('card') card: ElementRef;

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    scene = null;
    camera = null;
    mesh = null;
    controls = null;
    width = window.innerWidth;
    height = window.innerHeight;

    constructor(private readonly route: ActivatedRoute,
                private readonly router: Router,) {}

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
            navbar.classList.remove('navbar-transparent');
        this.route.paramMap.subscribe(params => {
            console.log(params.get("lab")); 
            this.initThree();
        });
    }

    initThree() {
        this.width = this.width - this.card.nativeElement.offsetWidth;
        this.width = this.width;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x828282 );
        this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.width, this.height ); 
        
        this.camera = new THREE.PerspectiveCamera(2, this.width / this.height, .2, 2000);
        this.camera.position.x = 1;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // controls
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 100;
        this.controls.maxDistance = 500;
        this.controls.maxPolarAngle = Math.PI / 2;

        // lights
        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        this.scene.add( light );
        var light = new THREE.DirectionalLight( 0x002288 );
        light.position.set( - 1, - 1, - 1 );
        this.scene.add( light );
        var light = new THREE.AmbientLight( 0x222222 );
        this.scene.add( light );

        this.loadObjectScene('assets/ring/step1/DiseñoBase4.dae');

        this.renderer.setSize(this.width, this.height);
        this.canvasThree.nativeElement.appendChild(this.renderer.domElement);
        this.animate();
    }
    
    animate() {
        window.requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    loadObjectScene(object) {
        var sceneLoader = this.scene;
        var dae;
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load(object, function loadCollada( collada ) {
            var o = sceneLoader.getObjectByName('objectring');
            sceneLoader.remove( o );

            dae = collada.scene;
            var my_material = new THREE.MeshPhongMaterial() //or any other material
            //set map, shininess, etc. if needed
            dae.material = my_material
            dae.name = "objectring";
            dae.position.set(0,0,0);
            dae.updateMatrix();
            sceneLoader.add(dae);
        });
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    }
} 
