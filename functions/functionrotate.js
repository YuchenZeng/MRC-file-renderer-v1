function rotateAroundWorldAxis(object, axis, radians) {
    var rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    object.applyMatrix(rotWorldMatrix);

}
export  {
    rotateAroundWorldAxis
}