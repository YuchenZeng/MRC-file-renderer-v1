function onWindowResize(camera,controls,renderer,window) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

}
export  {
  onWindowResize
}