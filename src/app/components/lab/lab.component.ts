import {Component, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LabService } from "./lab.service"
import * as THREE from 'three-full';

@Component({
    selector: 'app-lab',
    templateUrl: './lab.component.html',
    styleUrls: ['./lab.component.scss'],
    providers: [LabService],
})
export class LabComponent implements OnInit, OnDestroy {
    @ViewChild('canvasThree') canvasThree: ElementRef;
    @ViewChild('card') card: ElementRef;

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    scene = null;
    camera = null;
    mesh = null;
    controls = null;
    loading = true;
    objects = [];
    object_id = "";
    width = window.innerWidth;
    height = window.innerHeight - 6;

    constructor(private readonly route: ActivatedRoute,
                private readonly router: Router,
                public labService: LabService) {}

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
            navbar.classList.remove('navbar-transparent');
        this.width = this.width - this.card.nativeElement.offsetWidth;

        this.route.paramMap.subscribe(params => {
            this.labService.getObjects(params.get("lab")).subscribe((response: any) => {
                if (response.length > 0) {
                    this.objects = response;
                    this.initThree();
                }
                else {
                    this.router.navigate(['form']);
                }
            });
        });
    }

    initThree() {
        this.scene = new THREE.Scene();
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

        this.loadObjectScene(this.objects[0]);

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
        this.loading = true;
        this.object_id = object.objectdaeId;
        var dae;
        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load(object.url, (collada) => {
            var o = this.scene.getObjectByName('objectring');
            this.scene.remove( o );

            dae = collada.scene;
            var my_material = new THREE.MeshPhongMaterial() //or any other material
            //set map, shininess, etc. if needed
            dae.material = my_material
            dae.name = "objectring";
            dae.position.set(0,0,0);
            dae.updateMatrix();
            this.scene.add(dae);
            this.loading = false;
        });

        localStorage.setItem("object_img", object.finalImage);
    }

    ok() {
        this.router.navigate(['lab', this.object_id]);
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    }
} 
