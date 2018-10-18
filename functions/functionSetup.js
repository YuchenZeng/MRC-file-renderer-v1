 /*
 function setupInset (container2,document,renderer2,scene2,camera2,axes2,camera) {
    var insetWidth = 150; 
    var insetHeight = 150;
    container2 = document.getElementById('inset');
    container2.width = insetWidth;
    container2.height = insetHeight;

    // renderer
    renderer2 = new THREE.WebGLRenderer({alpha : true});
    renderer2.setClearColor( 0x000000, 0 );
    renderer2.setSize( insetWidth, insetHeight );
    container2.appendChild( renderer2.domElement );

    // scene
    scene2 = new THREE.Scene();

    // camera
    camera2 = new THREE.PerspectiveCamera( 50, insetWidth / insetHeight, 1, 1000 );
    camera2.up = camera.up; // important!

    // axes
    axes2 = new THREE.AxisHelper( 100 );
    scene2.add( axes2 );

}
export  {
    setupInset
}
*/
function containerFun(){
    var insetWidth = 150; 
    var insetHeight = 150;
    let container2 = document.getElementById('inset');
    container2.width = insetWidth;
    container2.height = insetHeight;
    return container2
}
export  {
    containerFun
}
function rendererFun(container2) {
    var insetWidth = 150; 
    var insetHeight = 150;
    let renderer2 = new THREE.WebGLRenderer({alpha : true});
    renderer2.setClearColor( 0x000000, 0 );
    renderer2.setSize( insetWidth, insetHeight );
    container2.appendChild( renderer2.domElement );
   return renderer2;
}
export  {
    rendererFun
}
function sceneFun(axes2) {
   let scene2 = new THREE.Scene();
   scene2.add( axes2 );
    return scene2;
}
export  {
    sceneFun
}
function axesFun() {
   let axes2 = new THREE.AxisHelper( 100 );
   
    return axes2;
}
export  {
    axesFun
}
function cameraFun (camera){
    var insetWidth = 150; 
    var insetHeight = 150;
   let camera2 = new THREE.PerspectiveCamera( 50, insetWidth / insetHeight, 1, 1000 );
    camera2.up = camera.up;
    return camera2
}
export  {
    cameraFun
}