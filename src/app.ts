/// <reference path="references.ts" />

enum Mode { GPU, CPU }

let togglePause = function(el: HTMLInputElement) : void {
  el.value = isRunning ? "Start" : "Pause";
  isRunning = !isRunning;
  if (isRunning) { renderLoop() };
}

let renderer = function(gpuKernel: any, scene: Scene.Scene) : () => void {

  let camera = scene.camera;
  let lights = scene.lights;
  let entities = scene.entities.map(function(f) { return f.toVector(); });

  let fps = {
    startTime: 0,
    frameNumber: 0,
    getFPS: function() {
      this.frameNumber++;
      var d = new Date().getTime()
      var currentTime = (d - this.startTime) / 1000
      var result = Math.floor(this.frameNumber / currentTime);
      if (currentTime > 1) {
        this.startTime = new Date().getTime();
        this.frameNumber = 0;
      }
      return result;
    }
  };

  let updateFPS = function(fps: any) : void {
    var f = document.querySelector("#fps");
    f.innerHTML = fps.toString();
  }

  let nextTick = function() : void {
    if (!isRunning) { return; } // Pause render loop if not running

    updateFPS(fps.getFPS());

    gpuKernel(camera, lights, entities);
    let cv = document.getElementsByTagName("canvas")[0];
    let bdy = cv.parentNode;
    let newCanvas = gpuKernel.getCanvas();
    bdy.replaceChild(newCanvas, cv);

    entities[0][1] = (entities[0][1] + 2) % 900;
    entities[1][2] = (entities[1][2] + 2) % 700;
    setTimeout(renderLoop,1);            // Uncomment this line, and comment the next line
    // requestAnimationFrame(nextTick);     // to see how fast this could run...
  }

  return nextTick;
}

let createKernel = function(mode: Mode, scene: Scene.Scene) : any {

  interface KernelOptions {
    dimensions?: number[],
    debug?: boolean,
    graphical?: boolean,
    safeTextureReadHack?: boolean,
    mode?: string,
    constants?: {}
  }

  let stringOfMode = function(mode: Mode) : string {
    switch(mode) {
      case Mode.CPU: return "cpu";
      case Mode.GPU: return "gpu";
    }
  }

  const opt: KernelOptions = {
    mode: stringOfMode(mode),
    dimensions: [600, 600],
    debug: true,
    graphical: true,
    safeTextureReadHack: false,
    constants: {
      ENTITY_COUNT: scene.entities.length,
      EMPTY: Entity.Type.EMPTY,
      SPHERE: Entity.Type.SPHERE,
      CUBOID: Entity.Type.CUBOID,
      CYLINDER: Entity.Type.CYLINDER,
      CONE: Entity.Type.CONE,
      TRIANGLE: Entity.Type.TRIANGLE
    }
  };

  let kernel = gpu.createKernel(function(camera: number[], lights: number[], entities: number[][]) {
    this.color(0.95, 0.95, 0.95);                     
    for (var i = 0; i < this.constants.ENTITY_COUNT; i++) {   
      if (entities[i][0] == this.constants.SPHERE) { 
        if (dist(this.thread.x, this.thread.y, entities[i][1], entities[i][2]) < entities[i][7]) {
          this.color(entities[i][8],entities[i][9] + i, entities[i][10]);
        }
      } 
    }
  }, opt);

  return kernel;
}

// entity declarations

// scene.js
let addFunctions = function(gpu: any, functions: any[]) {
  functions.forEach(function(f) {
    gpu.addFunction(f);
  })
}

let gpu = new GPU();
addFunctions(gpu, vectorFunctions);
addFunctions(gpu, utilityFunctions);

// Global states
let isRunning = true;
let mode = Mode.GPU;

var canvas = document.getElementById('canvas');
let scene = Scene.scene;
let gpuKernel = createKernel(Mode.GPU, scene);

let renderLoop = renderer(gpuKernel, scene);
window.onload = renderLoop;
