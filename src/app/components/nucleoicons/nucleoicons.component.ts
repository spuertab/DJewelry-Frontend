import { Component, OnInit, Inject, Renderer, ElementRef, OnDestroy } from '@angular/core';
import * as THREE from 'three-full';

@Component({
    selector: 'app-nucleoicons',
    templateUrl: './nucleoicons.component.html',
    styleUrls: ['./nucleoicons.component.scss']
})
export class NucleoiconsComponent implements OnInit, OnDestroy {
    constructor( private element : ElementRef) {}

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
        navbar.classList.remove('navbar-transparent');

        var container = document.getElementById("canvas-three");
        var scene, camera, renderer, controls;
        var WIDTH  = container.clientWidth;
        var HEIGHT = 600;
        var SPEED = 0.01;

        function init() {
            scene = new THREE.Scene();

            initMesh(); 
            initCamera();
            initLights();
            initRenderer();
        }

        function initCamera() {
            camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
            camera.position.set(0, 3.5, 5);
            controls = new THREE.OrbitControls( camera );
        }

        function initRenderer() {
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(WIDTH, HEIGHT);
            renderer.setClearColor (0xEAFCE6);
            container.appendChild(renderer.domElement)
        }

        function initLights() {
            var light = new THREE.PointLight(0xffffff, 1);
            light.position.set( -100, 200, 100 );
            scene.add( light );

            var lightEnviroment = new THREE.AmbientLight(0xffffff, 0.1);
            scene.add( lightEnviroment );
        }

        var mesh = null;
        function initMesh() {
            var loader = new THREE.JSONLoader();
            loader.load('assets/ring/step1/anilloBase.js', function(geometry, materials) {
                mesh = new THREE.Mesh(geometry, materials);
                mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.20;
                scene.add(mesh);
            });
        }

        function rotateMesh() {
            if (!mesh) {
                return;
            }

            mesh.rotation.x -= SPEED;
            mesh.rotation.y -= SPEED;
            mesh.rotation.z -= SPEED;
        }

        function render() {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

        window.addEventListener( 'resize', onWindowResize, false );

        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        init();
        render(); 
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    }
}
