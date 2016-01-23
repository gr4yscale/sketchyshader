var domReady = require('domready');
var dat = require('dat-gui');

var glslify = require('glslify');

domReady(function(){

  var params = {
    speed: 1000,
    opacity : 0.25,
  };

  var OrbitViewer = require('three-orbit-viewer')(THREE);

  var app = OrbitViewer({
    clearColor: 'rgb(0,0,0)',
    clearAlpha: 1.0,
    fov: 65,
    contextAttributes: {
      antialias: true,
      alpha: false
    }
  });

  var datgui = new dat.GUI();

  var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
  light.position.set(10, 20, -20);
  app.scene.add(light);


  // shader
  var shaderMaterial = new THREE.ShaderMaterial({
      uniforms : {
        iGlobalTime: { type: 'f', value: 0 }
      },
      defines: {
        USE_MAP: ''
      },
      vertexShader : glslify(__dirname + '/shaders/sketch.vert'),
      fragmentShader : glslify(__dirname + '/shaders/sketch.frag'),
      side: THREE.DoubleSide
  });

  // meshs
  var meshs = [];
  var nummeshs = 2;

  for ( i = 1; i < nummeshs; i ++ ) {
    var width = 24 - ((24 / nummeshs) * i);

    var geometry = new THREE.PlaneGeometry( 1, 1);
    // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    // var geometry = new THREE.IcosahedronGeometry( 1, 4);
    var mesh = new THREE.Mesh( geometry, shaderMaterial );

    // mesh.position.y = 0.2 * i;

    app.scene.add(mesh);
    meshs.push(mesh);
  }

  light.position.set( 0, params.lightYPosition, 0);


  // render loop

  var tickCounter = 0;
  app.on('tick', function(time) {
    tickCounter += (time / params.speed);
    shaderMaterial.uniforms.iGlobalTime.value = tickCounter;

  });


  // params GUI

  datgui.add(params, "speed", 10, 2000);
  datgui.add(params, 'opacity', 0.1, 1);


});
