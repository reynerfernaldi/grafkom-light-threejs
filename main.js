import * as THREE from 'three';
import { GUI } from 'dat.gui';
import SceneInit from './SceneInit';

const test = new SceneInit('myThreeJsCanvas');
test.initialize();
test.animate();

// initialize gui
const gui = new GUI();

// add group
const mainGroup = new THREE.Group();
mainGroup.position.y = 0.5;
test.scene.add(mainGroup);


// set up ground
const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.receiveShadow = true;
groundMesh.position.y = -2;
mainGroup.add(groundMesh);


// set up red box mesh
const bg1 = new THREE.BoxGeometry(1, 1, 1);
const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const boxMesh1 = new THREE.Mesh(bg1, bm1);
boxMesh1.castShadow = true;
boxMesh1.position.x = -2;
mainGroup.add(boxMesh1);

// set up green box mesh
const bg2 = new THREE.BoxGeometry(1, 1, 1);
const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const boxMesh2 = new THREE.Mesh(bg2, bm2);
boxMesh2.castShadow = true;
boxMesh2.position.x = 0;
mainGroup.add(boxMesh2);

// set up blue box mesh
const bg3 = new THREE.BoxGeometry(1, 1, 1);
const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const boxMesh3 = new THREE.Mesh(bg3, bm3);
boxMesh3.castShadow = true;
boxMesh3.position.x = 2;
mainGroup.add(boxMesh3);

const al = new THREE.AmbientLight(0xffffff, 0.5);

// set up ambient light gui
const alFolder = gui.addFolder('ambient light');
const alSettings = { color: al.color.getHex() };
alFolder.add(al, 'visible');
alFolder.add(al, 'intensity', 0, 1, 0.1);
alFolder
	.addColor(alSettings, 'color')
	.onChange((value) => al.color.set(value));
alFolder.open();


// setup directional light + helper
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
// dl.position.set(0, 2, 2);
dl.position.set(0, 2, 0);
dl.castShadow = true;
const dlHelper = new THREE.DirectionalLightHelper(dl, 3);


// set up directional light gui
const dlSettings = {
	visible: true,
	color: dl.color.getHex(),
	};
	const dlFolder = gui.addFolder('directional light');
	dlFolder.add(dlSettings, 'visible').onChange((value) => {
	dl.visible = value;
	dlHelper.visible = value;
	});
	dlFolder.add(dl, 'intensity', 0, 1, 0.25);
	dlFolder.add(dl.position, 'y', -1, 4, 0.5);
	dlFolder.add(dl.position, 'x', -1, 4, 0.5);
	dlFolder.add(dl.position, 'z', -1, 4, 0.5);
	dlFolder.add(dl, 'castShadow');
	dlFolder
	.addColor(dlSettings, 'color')
	.onChange((value) => dl.color.set(value));
	dlFolder.open();


//Hemisphere light
const hl = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
// const hlHelper = new THREE.HemisphereLightHelper( light, 5 );


//GUI hemisphere
const hlSettings = {
	visible: true,
	color: hl.color.getHex(),
  };

  const hlFolder = gui.addFolder('hemisphere light');
  hlFolder.add(hlSettings, 'visible').onChange((value) => {
	hl.visible = value;
	// hlHelper.visible = value;
});

hlFolder
.addColor(hlSettings, 'color')
.onChange((value) => hl.color.set(value));
hlFolder
.addColor(hlSettings, 'color')
.onChange((value) => hl.groundColor.set(value));
hlFolder.add(hl, 'intensity', -2, 4, 0.5);
hlFolder.add(hl.position, 'x', -2, 4, 0.5);
hlFolder.add(hl.position, 'y', -2, 4, 0.5);
hlFolder.add(hl.position, 'z', -2, 4, 0.5);
hlFolder.open();


// set up spot light + helper
// Spotlight(color, intensity, distance, angle, penumbra, decay)
const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0, 1);
sl.position.set(0, 3, 0);
sl.castShadow = true;
const slHelper = new THREE.SpotLightHelper(sl);

// set up spot light gui
const slSettings = {
	visible: true,
	};
	const slFolder = gui.addFolder('spot light');
	slFolder.add(slSettings, 'visible').onChange((value) => {
	sl.visible = value;
	slHelper.visible = value;
	});
	slFolder.add(sl, 'intensity', 0, 4, 0.5);
	slFolder.add(sl, 'distance', 0, 10);
	slFolder.add(sl, 'angle', Math.PI / 16, Math.PI / 2, Math.PI / 16);
	slFolder.add(sl, 'penumbra', 0, 1, 0.5);
	slFolder.add(sl, 'decay', 0, 4, 0.5);
	slFolder.add(sl, 'castShadow');
	slFolder.open();


//point_light
const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
pl.position.set(2, 2, 2);
const plHelper = new THREE.PointLightHelper(pl, 0.5);


// set up point light gui
const plSettings = {
	visible: true,
	color: pl.color.getHex(),
	};
	const plFolder = gui.addFolder('point light');
	plFolder.add(plSettings, 'visible').onChange((value) => {
	pl.visible = value;
	plHelper.visible = value;
	});
	plFolder.add(pl, 'intensity', 0, 2, 0.25);
	plFolder.add(pl.position, 'x', -2, 4, 0.5);
	plFolder.add(pl.position, 'y', -2, 4, 0.5);
	plFolder.add(pl.position, 'z', -2, 4, 0.5);
	plFolder.add(pl, 'distance', 0, 10, 0.5);
	plFolder.add(pl, 'decay', 0, 4, 0.5);
	plFolder.add(pl, 'castShadow');
	plFolder
	.addColor(plSettings, 'color')
	.onChange((value) => pl.color.set(value));
	plFolder.open();


	//rectarealight

// const rl = new THREE.RectAreaLight(0xffffff, 1, 10, 10)
// rl.position.set( 5, 5, 0 );
// rl.lookAt( 0, 0, 0 );

// // const rlHelper = new RectAreaLightHelper( rl );
// // rl.add( rlHelper );

// 	const rlSettings = {
// 		visible: true,
// 		color: rectArea.color.getHex(),
// 	  };

// 	const rlFolder = gui.addFolder('rect area light');
// 	rlFolder.add(rlSettings, 'visible').onChange((value) => {
// 		rl.visible = value;
// 		// rectAreaHelper.visible = value;
// 	});

// 	rlFolder.add(rl, 'intensity', 0, 2, 0.25);
// 	rlFolder.add(rl.position, 'x', -2, 4, 0.5);
// 	rlFolder.add(rl.position, 'y', -2, 4, 0.5);
// 	rlFolder.add(rl.position, 'z', -2, 4, 0.5);
// 	rlFolder.add(rl, 'castShadow');
// 	rlFolder
// 	.addColor(rlSettings, 'color')
// 	.onChange((value) => rectArea.color.set(value));
// 	rlFolder.open();


// mainGroup.add(al);

// mainGroup.add(dl);
// mainGroup.add(dlHelper);

mainGroup.add(sl, slHelper);

// mainGroup.add( hl );

// mainGroup.add(pl, plHelper);

// mainGroup.add(rl);
