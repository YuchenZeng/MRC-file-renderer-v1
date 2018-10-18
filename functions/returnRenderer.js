function returnRenderer(){
    let renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
     renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    return renderer;
 }
export{
    returnRenderer
}
