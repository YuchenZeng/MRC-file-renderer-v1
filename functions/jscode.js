import {containerFun} from "./functions/functionSetup.js";
import {rendererFun} from "./functions/functionSetup.js";
import {sceneFun} from "./functions/functionSetup.js";
import {axesFun} from "./functions/functionSetup.js";
import {cameraFun} from "./functions/functionSetup.js";
import {onWindowResize} from "./functions/functionResize.js";
import {rotateAroundWorldAxis} from "./functions/functionrotate.js";
import {returnControls} from "./functions/functionControls.js"
import {returnRenderer} from "./functions/returnRenderer.js"

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container,
				stats,
				camera,
				controls,
				scene,
				renderer,
				gui,
				container2,
				renderer2,
				camera2,
				axes2,
				scene2;

			init();
			animate();
			
			function init() {

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
				camera.position.z = 300;
			
				scene = new THREE.Scene();
			
				scene.add( camera );
			
				// light
			
				var dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( 200, 200, 1000 ).normalize();
			
				camera.add( dirLight );
				camera.add( dirLight.target );
				
				var manager = new THREE.LoadingManager();
				var loader = new THREE.MRCLoader(manager);
				
				console.log("Manager is ready");
				
				loader.load( "models/mrc/bin8Data/avebin8.mrc", function ( volume ) {
					var geometry,
						canvas,
						canvasMap,
						material,
						plane,
						sliceZ,
						sliceY,
						sliceX;
				
					//box helper to see the extend of the volume
					var geometry = new THREE.BoxGeometry( volume.xLength, volume.yLength, volume.zLength );
					var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
					var cube = new THREE.Mesh( geometry, material );
					cube.visible = false;
					var box = new THREE.BoxHelper( cube );
					scene.add( box );
					box.applyMatrix(volume.matrix);
					scene.add( cube );
				
					//z plane
				
					var indexZ = 0;
					sliceZ = volume.extractSlice('z',Math.floor(volume.RASDimensions[2]/4));
					scene.add( sliceZ.mesh );
				
					//y plane
					var indexY = 0;
					sliceY = volume.extractSlice('y',Math.floor(volume.RASDimensions[1]/2));
					scene.add( sliceY.mesh );
				
					//x plane
					var indexX = 0;
					sliceX = volume.extractSlice('x',Math.floor(volume.RASDimensions[0]/2));
					scene.add( sliceX.mesh );
				
					gui = new dat.GUI();

					gui.add( sliceX, "index", 0, volume.RASDimensions[0], 1 ).name( "indexX" ).onChange( function () {sliceX.repaint.call(sliceX);} );
					gui.add( sliceY, "index", 0, volume.RASDimensions[1], 1 ).name( "indexY" ).onChange( function () {sliceY.repaint.call(sliceY);} );
					gui.add( sliceZ, "index", 0, volume.RASDimensions[2], 1 ).name( "indexZ" ).onChange( function () {sliceZ.repaint.call(sliceZ);} );
				
					gui.add( volume, "lowerThreshold", volume.min, volume.max, 1).name( "Lower Threshold").onChange( function () {
						volume.repaintAllSlices();
					});
					gui.add( volume, "upperThreshold", volume.min, volume.max, 1).name( "Upper Threshold").onChange( function () {
						volume.repaintAllSlices();
					});
					gui.add( volume, "windowLow", volume.min, volume.max, 1).name( "Window Low").onChange( function () {
						volume.repaintAllSlices();
					});
					gui.add( volume, "windowHigh", volume.min, volume.max, 1).name( "Window High").onChange( function () {
						volume.repaintAllSlices();
					});
				
				} 
			);
				
				// renderer
			
				renderer=new returnRenderer();
			
				container = document.createElement( 'div' );
				document.body.appendChild( container );
				container.appendChild( renderer.domElement );
			
				controls= new returnControls(camera, renderer);
			
				stats = new Stats();
				container.appendChild( stats.dom );
		
			
				//setupInset(container2,document,renderer2,scene2,camera2,axes2,camera);
				container2= containerFun();
				camera2 = cameraFun(camera);
				scene2 = sceneFun(axes2);
				renderer2= rendererFun(container2);
				axes2 = axesFun();

				window.addEventListener( 'resize', onWindowResize(camera,controls,renderer,window), false );
			
			}
			
			function animate() {

				requestAnimationFrame( animate );
			
			   controls.update();
			
				//copy position of the camera into inset
				camera2.position.copy( camera.position );
				camera2.position.sub( controls.target );
				camera2.position.setLength( 300 );
				camera2.lookAt( scene2.position );
			
				renderer.render( scene, camera );
				renderer2.render( scene2, camera2);
			
			   stats.update();
			
			}