var renderer = new Renderer(document.getElementById('webgl-canvas'))
renderer.setClearColor(191, 191, 191)
var gl = renderer.getContext()

var objects = []

Mesh.load(gl, '/assets/sphere.obj', '/assets/diffuse.png')
  .then(function (mesh) {
    objects.push(mesh)
  })

ShaderProgram.load(gl, '/shaders/basic.vert', '/shaders/basic.frag')
  .then(function (shader) {
    renderer.setShader(shader)
  })

var camera = new Camera()
camera.setOrthographic(16, 10, 10)
var light = new Light()

loop()

function loop() {
  renderer.render(camera, light, objects)
  camera.position = camera.position.rotateY(Math.PI / 180)
  requestAnimationFrame(loop)
}
