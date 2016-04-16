var Entity;
(function (Entity_1) {
    (function (Type) {
        Type[Type["EMPTY"] = 0] = "EMPTY";
        Type[Type["SPHERE"] = 1] = "SPHERE";
        Type[Type["CUBOID"] = 2] = "CUBOID";
        Type[Type["CYLINDER"] = 3] = "CYLINDER";
        Type[Type["CONE"] = 4] = "CONE";
        Type[Type["TRIANGLE"] = 5] = "TRIANGLE";
        Type[Type["PLANE"] = 6] = "PLANE";
        Type[Type["LIGHTSPHERE"] = 7] = "LIGHTSPHERE";
    })(Entity_1.Type || (Entity_1.Type = {}));
    var Type = Entity_1.Type;
    var Entity = (function () {
        function Entity(opts) {
            this.entityType = opts.entityType;
            this.opacity = opts.opacity;
            this.ambientColor = opts.ambientColor;
            this.specularReflection = opts.specularReflection;
            this.lambertianReflection = opts.lambertianReflection;
            this.x = opts.x || 0;
            this.y = opts.y || 0;
            this.z = opts.z || 0;
            this.red = opts.red || 0;
            this.blue = opts.blue || 0;
            this.green = opts.green || 0;
            this.width = opts.width || 0;
            this.height = opts.height || 0;
            this.depth = opts.depth || 0;
            this.radius = opts.radius || 0;
            this.directionX = opts.directionX || 0;
            this.directionY = opts.directionY || 0;
            this.directionZ = opts.directionZ || 0;
            this.constant = opts.constant || 0;
        }
        Entity.prototype.toVector = function () {
            var array = [
                this.entityType,
                this.x,
                this.y,
                this.z,
                this.width,
                this.height,
                this.depth,
                this.radius,
                this.red,
                this.green,
                this.blue,
                this.lambertianReflection,
                this.opacity,
                this.specularReflection,
                this.ambientColor,
                this.directionX,
                this.directionY,
                this.directionZ,
                this.constant
            ];
            return array;
        };
        Entity.prototype.fromNumberArray = function (array) {
        };
        return Entity;
    }());
    Entity_1.Entity = Entity;
})(Entity || (Entity = {}));
var upVector = [0, 1, 0];
var intoVector = [0, 0, 1];
var rightVector = [1, 0, 0];
var zeroVector = [0, 0, 0];
function vecDotProduct(a, b) {
    return (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
}
;
function dotProduct(x1, x2, x3, y1, y2, y3) {
    return x1 * y1 + x2 * y2 + x3 * y3;
}
function vecCrossProduct(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}
;
function crossProductX(x1, x2, x3, y1, y2, y3) {
    return x2 * y3 - x3 * y2;
}
function crossProductY(x1, x2, x3, y1, y2, y3) {
    return x3 * y1 - x1 * y3;
}
function crossProductZ(x1, x2, x3, y1, y2, y3) {
    return x1 * y2 - x2 * y1;
}
function vecScale(a, sc) {
    return [a[0] * sc, a[1] * sc, a[2] * sc];
}
;
function scaleX(x1, x2, x3, scale) { return scale * x1; }
function scaleY(x1, x2, x3, scale) { return scale * x2; }
function scaleZ(x1, x2, x3, scale) { return scale * x3; }
function vecMagnitude(a) {
    return Math.sqrt(vecDotProduct(a, a));
}
;
function magnitude(x1, x2, x3) {
    return Math.sqrt(x1 * x1 + x2 * x2 + x3 * x3);
}
function vecNormalize(a) {
    var mag = vecMagnitude(a);
    return vecScale(a, 1 / mag);
}
function normalizeX(x1, x2, x3) {
    var mag = magnitude(x1, x2, x3);
    return scaleX(x1, x2, x3, 1 / mag);
}
function normalizeY(x1, x2, x3) {
    var mag = magnitude(x1, x2, x3);
    return scaleY(x1, x2, x3, 1 / mag);
}
function normalizeZ(x1, x2, x3) {
    var mag = magnitude(x1, x2, x3);
    return scaleZ(x1, x2, x3, 1 / mag);
}
function vecAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
function addX(x1, x2, x3, y1, y2, y3) { return x1 + y1; }
function addY(x1, x2, x3, y1, y2, y3) { return x2 + y2; }
function addZ(x1, x2, x3, y1, y2, y3) { return x3 + y3; }
function vecAdd3(a, b, c) {
    return [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]];
}
function add3X(x1, x2, x3, y1, y2, y3, z1, z2, z3) { return x1 + y1 + z1; }
function add3Y(x1, x2, x3, y1, y2, y3, z1, z2, z3) { return x2 + y2 + z2; }
function add3Z(x1, x2, x3, y1, y2, y3, z1, z2, z3) { return x3 + y3 + z3; }
function vecSubtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function subtractX(x1, x2, x3, y1, y2, y3) { return x1 - y1; }
function subtractY(x1, x2, x3, y1, y2, y3) { return x2 - y2; }
function subtractZ(x1, x2, x3, y1, y2, y3) { return x3 - y3; }
function sphereIntersection(spherePtX, spherePtY, spherePtZ, sphereRadius, rayPtX, rayPtY, rayPtZ, rayVecX, rayVecY, rayVecZ) {
    var eyeToCenterX = spherePtX - rayPtX;
    var eyeToCenterY = spherePtY - rayPtY;
    var eyeToCenterZ = spherePtZ - rayPtZ;
    var sideLength = dotProduct(eyeToCenterX, eyeToCenterY, eyeToCenterZ, rayVecX, rayVecY, rayVecZ);
    var cameraToCenterLength = dotProduct(eyeToCenterX, eyeToCenterY, eyeToCenterZ, eyeToCenterX, eyeToCenterY, eyeToCenterZ);
    var discriminant = (sphereRadius * sphereRadius) - cameraToCenterLength + (sideLength * sideLength);
    if (discriminant < 0) {
        return -1;
    }
    else {
        return sideLength - Math.sqrt(discriminant);
    }
}
function sphereNormalX(spherePtX, spherePtY, spherePtZ, surfacePtX, surfacePtY, surfacePtZ) {
    var x = surfacePtX - spherePtX, y = surfacePtY - spherePtY, z = surfacePtZ - spherePtZ;
    return x * (1 / magnitude(x, y, z));
}
function sphereNormalY(spherePtX, spherePtY, spherePtZ, surfacePtX, surfacePtY, surfacePtZ) {
    var x = surfacePtX - spherePtX, y = surfacePtY - spherePtY, z = surfacePtZ - spherePtZ;
    return y * (1 / magnitude(x, y, z));
}
function sphereNormalZ(spherePtX, spherePtY, spherePtZ, surfacePtX, surfacePtY, surfacePtZ) {
    var x = surfacePtX - spherePtX, y = surfacePtY - spherePtY, z = surfacePtZ - spherePtZ;
    return z * (1 / magnitude(x, y, z));
}
function reflectVecX(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ) {
    var scaleFactor = dotProduct(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ);
    var normalVecXScaled = normalVecX * scaleFactor * 2;
    return normalVecXScaled - incidentVecX;
}
function reflectVecY(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ) {
    var scaleFactor = dotProduct(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ);
    var normalVecYScaled = normalVecY * scaleFactor * 2;
    return normalVecYScaled - incidentVecY;
}
function reflectVecZ(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ) {
    var scaleFactor = dotProduct(incidentVecX, incidentVecY, incidentVecZ, normalVecX, normalVecY, normalVecZ);
    var normalVecZScaled = normalVecZ * scaleFactor * 2;
    return normalVecZScaled - incidentVecZ;
}
function planeIntersection(normalVecX, normalVecY, normalVecZ, distance, rayPtX, rayPtY, rayPtZ, rayVecX, rayVecY, rayVecZ) {
    var denom = dotProduct(rayVecX, rayVecY, rayVecZ, normalVecX, normalVecY, normalVecZ);
    if (denom !== 0) {
        var t = -(distance + (rayPtX * normalVecX + rayPtY * normalVecY + rayPtZ * normalVecZ)) / denom;
        if (t < 0) {
            return -1;
        }
        else {
            return t;
        }
    }
    else {
        return -1;
    }
}
(function unitTests() {
    function expect(desc, expr, val) {
        if (expr !== val) {
            throw ("FAIL: " + desc + " / Actual: " + expr + " / Expected: " + val);
        }
    }
    expect("addX", addX(1, 2, 3, 4, 5, 6), 5);
    expect("addY", addY(1, 2, 3, 4, 5, 6), 7);
    expect("addZ", addZ(1, 2, 3, 4, 5, 6), 9);
    expect("add3X", add3X(1, 2, 3, 4, 5, 6, 7, 8, 9), 12);
    expect("add3Y", add3Y(1, 2, 3, 4, 5, 6, 7, 8, 9), 15);
    expect("add3Z", add3Z(1, 2, 3, 4, 5, 6, 7, 8, 9), 18);
    expect("subtractX", subtractX(1, 2, 3, 4, 5, 6), -3);
    expect("subtractY", subtractY(1, 2, 3, 4, 5, 6), -3);
    expect("subtractZ", subtractZ(1, 2, 3, 4, 5, 6), -3);
    expect("magnitude", magnitude(2, 3, 4), Math.sqrt(4 + 9 + 16));
    expect("normalizeX", normalizeX(7, 24, 0), 7 / 25);
    expect("normalizeY", normalizeY(7, 24, 0), 24 / 25);
    expect("normalizeZ", normalizeZ(0, 24, 7), 7 / 25);
    expect("scaleX", scaleX(1, 2, 3, 3), 3);
    expect("scaleY", scaleY(1, 2, 3, 3), 6);
    expect("scaleZ", scaleZ(1, 2, 3, 3), 9);
    expect("crossProductX", crossProductX(2, 3, 4, 5, 6, 7), -3);
    expect("crossProductY", crossProductY(2, 3, 4, 5, 6, 7), 6);
    expect("crossProductZ", crossProductZ(2, 3, 4, 5, 6, 7), -3);
    expect("dotProduct", dotProduct(2, 3, 4, 5, 6, 7), 56);
})();
var vectorFunctions = [
    addX, addY, addZ,
    add3X, add3Y, add3Z,
    subtractX, subtractY, subtractZ,
    magnitude,
    normalizeX, normalizeY, normalizeZ,
    crossProductX, crossProductY, crossProductZ,
    scaleX, scaleY, scaleZ,
    dotProduct,
    sphereIntersection,
    sphereNormalX, sphereNormalY, sphereNormalZ,
    reflectVecX, reflectVecY, reflectVecZ,
    planeIntersection
];
function square(x) {
    return x * x;
}
function dist(x1, y1, x2, y2) {
    return Math.sqrt(square(x2 - x1) + square(y2 - y1));
}
var rand = function (min, max) {
    return Math.random() * (max - min) + min;
};
var utilityFunctions = [square, dist];
var Scene;
(function (Scene) {
    var camera = [
        0, 0, 25,
        0, 0, 24,
        45
    ];
    var light_opts = [
        {
            entityType: Entity.Type.LIGHTSPHERE,
            red: 1, green: 1, blue: 1,
            x: 0, y: 7, z: 0, radius: 0.1,
            specularReflection: 0.0, lambertianReflection: 1, ambientColor: 1, opacity: 1.0,
            directionX: 0, directionY: 0, directionZ: 0
        },
    ];
    var lights = light_opts.map(function (light) {
        return [light.x, light.y + 0.5, light.z, light.red, light.green, light.blue];
    });
    var sphere_opts = [
        {
            entityType: Entity.Type.SPHERE,
            red: 1.0, green: 0.7, blue: 0.7,
            x: -4, y: 3.5, z: -2, radius: 0.5,
            specularReflection: 0.1, lambertianReflection: 1, ambientColor: 0.1, opacity: 1.0,
            directionX: 0.05, directionY: 0.05, directionZ: -0.05
        },
        {
            entityType: Entity.Type.SPHERE,
            red: 1.0, green: 0.7, blue: 0.2,
            x: -4, y: 3.5, z: -2, radius: 0.7,
            specularReflection: 0.2, lambertianReflection: 0.7, ambientColor: 0.1, opacity: 1.0,
            directionX: 0.07, directionY: 0.02, directionZ: 0.11
        },
        {
            entityType: Entity.Type.SPHERE,
            red: 0.6, green: 0.7, blue: 0.3,
            x: -4, y: 3.5, z: -2, radius: 0.4,
            specularReflection: 0.2, lambertianReflection: 0.6, ambientColor: 0.1, opacity: 1.0,
            directionX: 0.02, directionY: -0.02, directionZ: -0.05
        },
        {
            entityType: Entity.Type.SPHERE,
            red: 0.4, green: 0.2, blue: 0.4,
            x: -4, y: 3.5, z: -2, radius: 0.9,
            specularReflection: 0.2, lambertianReflection: 0.8, ambientColor: 0.1, opacity: 1.0,
            directionX: 0.04, directionY: -0.06, directionZ: 0.11
        }
    ];
    var generateRandomSpheres = function (count) {
        var ary = [];
        var minDirection = -0.15, maxDirection = 0.15;
        for (var i = 0; i < count; i++) {
            ary.push({
                entityType: Entity.Type.SPHERE,
                red: rand(0.1, 0.9), green: rand(0.1, 0.9), blue: rand(0.1, 0.9),
                x: rand(-4, 4), y: rand(0, 7), z: rand(-7, 2), radius: rand(0.3, 4),
                specularReflection: rand(0.1, 0.2), lambertianReflection: rand(0.8, 1), ambientColor: rand(0, 0.3), opacity: rand(0, 1),
                directionX: rand(minDirection, maxDirection), directionY: rand(minDirection, maxDirection), directionZ: rand(minDirection, maxDirection)
            });
        }
        return ary;
    };
    var plane_opts = [{
            entityType: Entity.Type.PLANE,
            red: 1.0,
            green: 1.0,
            blue: 1.0,
            x: 0,
            y: 3,
            z: 0,
            specularReflection: 0,
            lambertianReflection: 1,
            ambientColor: 0.2,
            opacity: 1.0,
            directionX: 0,
            directionY: 0,
            directionZ: 0,
            constant: 28
        }];
    var sphereCount = parseInt(rand(0, 5));
    var opts = generateRandomSpheres(5)
        .concat(light_opts);
    var entities = opts.map(function (opt) {
        return new Entity.Entity(opt);
    }).map(function (ent) { return ent.toVector(); });
    var eyeVector = vecNormalize(vecSubtract([camera[3], camera[4], camera[5]], [camera[0], camera[1], camera[2]]));
    var vpRight = vecNormalize(vecCrossProduct(eyeVector, upVector));
    var vpUp = vecNormalize(vecCrossProduct(vpRight, eyeVector));
    var canvasHeight = 640;
    var canvasWidth = 640;
    var fieldOfViewRadians = Math.PI * (camera[6] / 2) / 180;
    var heightWidthRatio = canvasHeight / canvasWidth;
    var halfWidth = Math.tan(fieldOfViewRadians);
    var halfHeight = heightWidthRatio * halfWidth;
    var cameraWidth = halfWidth * 2;
    var cameraHeight = halfHeight * 2;
    var pixelWidth = cameraWidth / (canvasWidth - 1);
    var pixelHeight = cameraHeight / (canvasHeight - 1);
    Scene.scene = {
        camera: camera,
        lights: lights,
        entities: entities,
        eyeVector: eyeVector,
        vpRight: vpRight,
        vpUp: vpUp,
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
        fovRadians: fieldOfViewRadians,
        heightWidthRatio: heightWidthRatio,
        halfWidth: halfWidth,
        halfHeight: halfHeight,
        cameraWidth: cameraWidth,
        cameraHeight: cameraHeight,
        pixelWidth: pixelWidth,
        pixelHeight: pixelHeight
    };
})(Scene || (Scene = {}));
var Benchmark;
(function (Benchmark_1) {
    var Benchmark = (function () {
        function Benchmark() {
            this.mode = "";
            this.benchmarkDuration = 8000;
            this.resetBenchmark();
            this.resultHistory = [];
            this.framesToRender = 30;
        }
        Benchmark.prototype.resetBenchmark = function () {
            this.isBenchmarking = false;
            this.latestResults = {
                mode: this.mode,
                actualBenchmarkDuration: 0,
                totalFrameCount: 0,
                frameRenderDurations: []
            };
        };
        Benchmark.prototype.startBenchmark = function (mode, callback) {
            this.resetBenchmark();
            this.setMode(mode);
            this.setCallback(callback);
            this.isBenchmarking = true;
        };
        Benchmark.prototype.stopBenchmark = function () {
            this.isBenchmarking = false;
            this.latestResults.actualBenchmarkDuration =
                this.latestResults.frameRenderDurations.reduce(function (a, b) { return a + b; });
            this.computeMinMaxAvg();
            this.saveResults();
            this.callback();
        };
        Benchmark.prototype.setCallback = function (callback) {
            this.callback = callback;
        };
        Benchmark.prototype.getResults = function () {
            return this.latestResults;
        };
        Benchmark.prototype.saveResults = function () {
            this.resultHistory.push(this.latestResults);
            localStorage.setItem(this.mode, JSON.stringify(this.latestResults));
            localStorage.setItem("history", JSON.stringify(this.resultHistory));
        };
        Benchmark.prototype.displaySpeedup = function (elem) {
            var cpuResults = JSON.parse(localStorage.getItem('cpu'));
            var gpuResults = JSON.parse(localStorage.getItem('gpu'));
            var minSpeedup = cpuResults.minFrameRenderDuration / gpuResults.minFrameRenderDuration;
            var medianSpeedup = cpuResults.medianFrameRenderDuration / gpuResults.medianFrameRenderDuration;
            elem.innerHTML = "Speedups:\n      <ul>\n      <li>Min frame render speedup: " + minSpeedup + "</li>\n      <li>Median frame render speedup: " + medianSpeedup + "</li>\n      </ul>";
        };
        Benchmark.prototype.displayResults = function (elem) {
            elem.innerHTML = "\n      <ul>\n      <li> Mode: " + this.getResults().mode.toUpperCase() + " </li>\n      <li> Total frames rendered: " + this.getResults().totalFrameCount + " </li>\n      <li> Actual time spent (ms): " + this.getResults().actualBenchmarkDuration + " </li>\n      <li> Average FPS: " + this.getResults().averageFPS + " </li>\n      <li> Frame render time - max (ms): " + this.getResults().maxFrameRenderDuration + " </li>\n      <li> Frame render time - min (ms): " + this.getResults().minFrameRenderDuration + " </li>\n      <li> Frame render time - avg (ms): " + this.getResults().avgFrameRenderDuration + " </li>\n      <li> Frame render time - median (ms): " + this.getResults().medianFrameRenderDuration + " </li>\n      </ul>\n      " + elem.innerHTML + "\n      ";
        };
        Benchmark.prototype.setMode = function (mode) {
            this.mode = mode;
            this.latestResults.mode = mode;
        };
        Benchmark.prototype.addFrameGenDuration = function (duration) {
            if (!this.isBenchmarking) {
                return;
            }
            this.latestResults.frameRenderDurations.push(duration);
        };
        Benchmark.prototype.incrementTotalFrameCount = function () {
            if (!this.isBenchmarking) {
                return;
            }
            this.latestResults.totalFrameCount += 1;
            if (this.latestResults.totalFrameCount >= this.framesToRender) {
                this.stopBenchmark();
            }
        };
        Benchmark.prototype.computeMinMaxAvg = function () {
            this.latestResults.averageFPS = this.getAverageFPS();
            this.latestResults.minFrameRenderDuration = this.getMinFrameRenderDuration();
            this.latestResults.maxFrameRenderDuration = this.getMaxFrameRenderDuration();
            this.latestResults.avgFrameRenderDuration = this.getAvgFrameRenderDuration();
            this.latestResults.medianFrameRenderDuration = this.getMedianFrameRenderDuration();
        };
        Benchmark.prototype.getAverageFPS = function () {
            var durationSeconds = this.getResults().actualBenchmarkDuration / 1000;
            var frameCount = this.getResults().totalFrameCount;
            return frameCount / durationSeconds;
        };
        Benchmark.prototype.getMinFrameRenderDuration = function () {
            return Math.min.apply(Math, this.getResults().frameRenderDurations);
        };
        Benchmark.prototype.getMaxFrameRenderDuration = function () {
            return Math.max.apply(Math, this.getResults().frameRenderDurations);
        };
        Benchmark.prototype.getMedianFrameRenderDuration = function () {
            var count = this.getResults().frameRenderDurations.length;
            if (count % 2 == 0) {
                count -= 1;
            }
            var median = this.getResults().frameRenderDurations.sort()[Math.floor(count / 2)];
            return median;
        };
        Benchmark.prototype.getAvgFrameRenderDuration = function () {
            var sum = this.getResults().frameRenderDurations.reduce(function (a, b) { return a + b; });
            var avg = sum / this.getResults().frameRenderDurations.length;
            return avg;
        };
        return Benchmark;
    }());
    Benchmark_1.Benchmark = Benchmark;
})(Benchmark || (Benchmark = {}));
var Mode;
(function (Mode) {
    Mode[Mode["GPU"] = 0] = "GPU";
    Mode[Mode["CPU"] = 1] = "CPU";
})(Mode || (Mode = {}));
var mode = Mode.GPU;
var canvasNeedsUpdate = true;
var isRunning = true;
var stringOfMode = function (mode) {
    switch (mode) {
        case Mode.CPU: return "cpu";
        case Mode.GPU: return "gpu";
    }
};
var togglePause = function (el) {
    el.value = isRunning ? "Start" : "Pause";
    isRunning = !isRunning;
    if (isRunning) {
        renderLoop();
    }
    ;
};
var toggleMode = function () {
    canvasNeedsUpdate = true;
    mode = (mode == Mode.GPU) ? Mode.CPU : Mode.GPU;
    document.getElementById('mode').innerHTML = stringOfMode(mode).toUpperCase();
};
var updateFPS = function (fps) {
    var f = document.querySelector("#fps");
    f.innerHTML = fps.toString();
};
var bm = new Benchmark.Benchmark();
var benchmark = function (elem) {
    bm.getResults().sceneData = Scene.scene;
    elem.value = "Running..";
    elem.disabled = true;
    var resultsElem = document.getElementById("results");
    var speedupElem = document.getElementById("speedup");
    updateFPS("Benchmarking..");
    bm.startBenchmark(stringOfMode(mode), function () {
        bm.displayResults(resultsElem);
        toggleMode();
        bm.startBenchmark(stringOfMode(mode), function () {
            bm.displayResults(resultsElem);
            toggleMode();
            elem.value = "Benchmark";
            elem.disabled = false;
            bm.displaySpeedup(speedupElem);
        });
    });
};
var renderer = function (gpuKernel, cpuKernel, gpuCanvas, scene) {
    var Movement;
    (function (Movement) {
        Movement[Movement["Forward"] = 0] = "Forward";
        Movement[Movement["Backward"] = 1] = "Backward";
        Movement[Movement["LeftStrafe"] = 2] = "LeftStrafe";
        Movement[Movement["RightStrafe"] = 3] = "RightStrafe";
        Movement[Movement["LookUp"] = 4] = "LookUp";
        Movement[Movement["LookDown"] = 5] = "LookDown";
        Movement[Movement["LookLeft"] = 6] = "LookLeft";
        Movement[Movement["LookRight"] = 7] = "LookRight";
    })(Movement || (Movement = {}));
    var camera = scene.camera, lights = scene.lights, entities = scene.entities, eyeVector = scene.eyeVector, vpRight = scene.vpRight, vpUp = scene.vpUp, canvasHeight = scene.canvasHeight, canvasWidth = scene.canvasWidth, fovRadians = scene.fovRadians, heightWidthRatio = scene.heightWidthRatio, halfWidth = scene.halfWidth, halfHeight = scene.halfHeight, cameraWidth = scene.cameraWidth, cameraHeight = scene.cameraHeight, pixelWidth = scene.pixelWidth, pixelHeight = scene.pixelHeight;
    document.onkeydown = function (e) {
        var keyMap = {
            87: Movement.Forward,
            83: Movement.Backward,
            65: Movement.LeftStrafe,
            68: Movement.RightStrafe,
            38: Movement.LookUp,
            40: Movement.LookDown,
            37: Movement.LookLeft,
            39: Movement.LookRight
        };
        var forwardSpeed = 0.2;
        var backwardSpeed = 0.2;
        var strafeSpeed = 0.2;
        switch (keyMap[e.keyCode]) {
            case Movement.Forward:
                camera[2] -= forwardSpeed;
                break;
            case Movement.Backward:
                camera[2] += backwardSpeed;
                break;
            case Movement.LeftStrafe:
                camera[0] -= strafeSpeed;
                break;
            case Movement.RightStrafe:
                camera[0] += strafeSpeed;
                break;
            case Movement.LookLeft:
                break;
            default:
                break;
        }
    };
    var fps = {
        startTime: 0,
        frameNumber: 0,
        totalFrameCount: 0,
        getFPS: function () {
            this.totalFrameCount++;
            this.frameNumber++;
            var d = new Date().getTime();
            var currentTime = (d - this.startTime) / 1000;
            var result = Math.floor(this.frameNumber / currentTime);
            if (currentTime > 1) {
                this.startTime = new Date().getTime();
                this.frameNumber = 0;
            }
            return result;
        }
    };
    var nextTick = function () {
        if (!isRunning) {
            return;
        }
        if (!bm.isBenchmarking) {
            updateFPS(fps.getFPS().toString());
        }
        var startTime, endTime;
        if (mode == Mode.CPU) {
            if (bm.isBenchmarking) {
                startTime = performance.now();
            }
            cpuKernel(camera, lights, entities, eyeVector, vpRight, vpUp, canvasHeight, canvasWidth, fovRadians, heightWidthRatio, halfWidth, halfHeight, cameraWidth, cameraHeight, pixelWidth, pixelHeight);
            if (bm.isBenchmarking) {
                endTime = performance.now();
            }
            if (canvasNeedsUpdate) {
                canvasNeedsUpdate = false;
                var cv = document.getElementsByTagName("canvas")[0];
                var bdy = cv.parentNode;
                var newCanvas = cpuKernel.getCanvas();
                bdy.replaceChild(newCanvas, cv);
            }
        }
        else {
            if (bm.isBenchmarking) {
                startTime = performance.now();
            }
            gpuKernel(camera, lights, entities, eyeVector, vpRight, vpUp, canvasHeight, canvasWidth, fovRadians, heightWidthRatio, halfWidth, halfHeight, cameraWidth, cameraHeight, pixelWidth, pixelHeight);
            if (bm.isBenchmarking) {
                endTime = performance.now();
            }
            if (canvasNeedsUpdate) {
                canvasNeedsUpdate = false;
                var cv = document.getElementsByTagName("canvas")[0];
                var bdy = cv.parentNode;
                var newCanvas = gpuKernel.getCanvas();
                bdy.replaceChild(newCanvas, cv);
            }
        }
        entities.forEach(function (entity, idx) {
            entities[idx] = moveEntity(canvasWidth, canvasWidth, canvasWidth, entity);
        });
        if (bm.isBenchmarking) {
            var timeTaken = endTime - startTime;
            bm.addFrameGenDuration(timeTaken);
            bm.incrementTotalFrameCount();
            setTimeout(renderLoop, 300);
        }
        else {
            requestAnimationFrame(nextTick);
        }
    };
    var moveEntity = function (width, height, depth, entity) {
        var reflect = function (entity, normal) {
            var incidentVec = [entity[15], entity[16], entity[17]];
            var dp = vecDotProduct(incidentVec, normal);
            var tmp = vecSubtract(incidentVec, vecScale(normal, 2 * dp));
            return tmp;
        };
        entity[1] += entity[15];
        entity[2] += entity[16];
        entity[3] += entity[17];
        if (entity[1] < -7) {
            _a = reflect(entity, [1, 0, 0]), entity[15] = _a[0], entity[16] = _a[1], entity[17] = _a[2];
        }
        if (entity[1] > 7) {
            _b = reflect(entity, [-1, 0, 0]), entity[15] = _b[0], entity[16] = _b[1], entity[17] = _b[2];
        }
        if (entity[2] < -7) {
            _c = reflect(entity, [0, 1, 0]), entity[15] = _c[0], entity[16] = _c[1], entity[17] = _c[2];
        }
        if (entity[2] > 7) {
            _d = reflect(entity, [0, -1, 0]), entity[15] = _d[0], entity[16] = _d[1], entity[17] = _d[2];
        }
        if (entity[3] < -15) {
            _e = reflect(entity, [0, 0, 1]), entity[15] = _e[0], entity[16] = _e[1], entity[17] = _e[2];
        }
        if (entity[3] > 7) {
            _f = reflect(entity, [0, 0, -1]), entity[15] = _f[0], entity[16] = _f[1], entity[17] = _f[2];
        }
        return entity;
        var _a, _b, _c, _d, _e, _f;
    };
    return nextTick;
};
var createKernel = function (mode, scene) {
    var opt = {
        mode: stringOfMode(mode),
        dimensions: [scene.canvasWidth, scene.canvasHeight],
        debug: false,
        graphical: true,
        safeTextureReadHack: false,
        constants: {
            ENTITY_COUNT: scene.entities.length,
            LIGHT_COUNT: scene.lights.length,
            EMPTY: Entity.Type.EMPTY,
            SPHERE: Entity.Type.SPHERE,
            CUBOID: Entity.Type.CUBOID,
            CYLINDER: Entity.Type.CYLINDER,
            CONE: Entity.Type.CONE,
            TRIANGLE: Entity.Type.TRIANGLE,
            PLANE: Entity.Type.PLANE,
            LIGHTSPHERE: Entity.Type.LIGHTSPHERE
        }
    };
    return gpu.createKernel(function (camera, lights, entities, eyeVector, vpRight, vpUp, canvasHeight, canvasWidth, fovRadians, heightWidthRatio, halfWidth, halfHeight, cameraWidth, cameraHeight, pixelWidth, pixelHeight) {
        var x1 = addX(1, 2, 3, 4, 5, 6);
        var x2 = addY(1, 2, 3, 4, 5, 6);
        var x3 = addZ(1, 2, 3, 4, 5, 6);
        var x4 = subtractX(1, 2, 3, 4, 5, 6);
        var x5 = subtractY(1, 2, 3, 4, 5, 6);
        var x6 = subtractZ(1, 2, 3, 4, 5, 6);
        var x7 = normalizeX(1, 2, 3);
        var x8 = normalizeY(1, 2, 3);
        var x9 = normalizeZ(1, 2, 3);
        var x10 = dotProduct(1, 2, 3, 4, 5, 6);
        var x11 = crossProductX(1, 2, 3, 4, 5, 6);
        var x12 = crossProductY(1, 2, 3, 4, 5, 6);
        var x13 = crossProductZ(1, 2, 3, 4, 5, 6);
        var x14 = magnitude(1, 2, 3);
        var x15 = scaleX(1, 2, 3, 4);
        var x16 = scaleY(1, 2, 3, 4);
        var x17 = scaleZ(1, 2, 3, 4);
        var x18 = add3X(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var x19 = add3Y(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var x20 = add3Z(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var x21 = sphereIntersection(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        var x = this.thread.x;
        var y = this.thread.y;
        var xCompX = vpRight[0] * (x * pixelWidth - halfWidth);
        var xCompY = vpRight[1] * (x * pixelWidth - halfWidth);
        var xCompZ = vpRight[2] * (x * pixelWidth - halfWidth);
        var yCompX = vpUp[0] * (y * pixelHeight - halfHeight);
        var yCompY = vpUp[1] * (y * pixelHeight - halfHeight);
        var yCompZ = vpUp[2] * (y * pixelHeight - halfHeight);
        var rayPtX = camera[0];
        var rayPtY = camera[1];
        var rayPtZ = camera[2];
        var rayVecX = eyeVector[0] + xCompX + yCompX;
        var rayVecY = eyeVector[1] + xCompY + yCompY;
        var rayVecZ = eyeVector[2] + xCompZ + yCompZ;
        var normRayVecX = normalizeX(rayVecX, rayVecY, rayVecZ);
        var normRayVecY = normalizeY(rayVecX, rayVecY, rayVecZ);
        var normRayVecZ = normalizeZ(rayVecX, rayVecY, rayVecZ);
        var red = 0.10;
        var green = 0.10;
        var blue = 0.10;
        var nearestEntityIndex = -1;
        var maxEntityDistance = Math.pow(2, 32);
        var nearestEntityDistance = Math.pow(2, 32);
        for (var i = 0; i < this.constants.ENTITY_COUNT; i++) {
            var distance = -1;
            var entityType = entities[i][0];
            if (entityType == this.constants.SPHERE ||
                entityType == this.constants.LIGHTSPHERE) {
                distance = sphereIntersection(entities[i][1], entities[i][2], entities[i][3], entities[i][7], rayPtX, rayPtY, rayPtZ, normRayVecX, normRayVecY, normRayVecZ);
            }
            else if (entityType == this.constants.PLANE) {
                distance = planeIntersection(entities[i][1], entities[i][2], entities[i][3], entities[i][18], rayPtX, rayPtY, rayPtZ, normRayVecX, normRayVecY, normRayVecZ);
            }
            if (distance >= 0 && distance < nearestEntityDistance) {
                nearestEntityIndex = i;
                nearestEntityDistance = distance;
                red = entities[i][8];
                green = entities[i][9];
                blue = entities[i][10];
            }
        }
        this.color(red, green, blue);
        if (nearestEntityIndex >= 0) {
            var entityPtX = entities[nearestEntityIndex][1];
            var entityPtY = entities[nearestEntityIndex][2];
            var entityPtZ = entities[nearestEntityIndex][3];
            var entityRed = entities[nearestEntityIndex][8];
            var entityGreen = entities[nearestEntityIndex][9];
            var entityBlue = entities[nearestEntityIndex][10];
            var intersectPtX = rayPtX + normRayVecX * nearestEntityDistance;
            var intersectPtY = rayPtY + normRayVecY * nearestEntityDistance;
            var intersectPtZ = rayPtZ + normRayVecZ * nearestEntityDistance;
            var sphereNormPtX = sphereNormalX(entityPtX, entityPtY, entityPtZ, intersectPtX, intersectPtY, intersectPtZ);
            var sphereNormPtY = sphereNormalY(entityPtX, entityPtY, entityPtZ, intersectPtX, intersectPtY, intersectPtZ);
            var sphereNormPtZ = sphereNormalZ(entityPtX, entityPtY, entityPtZ, intersectPtX, intersectPtY, intersectPtZ);
            var lambertRed = 0, lambertGreen = 0, lambertBlue = 0;
            for (var i = 0; i < this.constants.LIGHT_COUNT; i++) {
                var lightPtX = lights[i][0];
                var lightPtY = lights[i][1];
                var lightPtZ = lights[i][2];
                var vecToLightX = sphereNormalX(intersectPtX, intersectPtY, intersectPtZ, lightPtX, lightPtY, lightPtZ);
                var vecToLightY = sphereNormalY(intersectPtX, intersectPtY, intersectPtZ, lightPtX, lightPtY, lightPtZ);
                var vecToLightZ = sphereNormalZ(intersectPtX, intersectPtY, intersectPtZ, lightPtX, lightPtY, lightPtZ);
                var shadowCast = -1;
                var lambertAmount = 0;
                var entityLambert = entities[nearestEntityIndex][11];
                for (var j = 0; j < this.constants.ENTITY_COUNT; j++) {
                    if (entities[j][0] == this.constants.SPHERE) {
                        var distance = sphereIntersection(entities[j][1], entities[j][2], entities[j][3], entities[j][7], intersectPtX, intersectPtY, intersectPtZ, vecToLightX, vecToLightY, vecToLightZ);
                        if (distance > -0.005) {
                            shadowCast = 1;
                        }
                    }
                }
                if (shadowCast < 0) {
                    var contribution = dotProduct(vecToLightX, vecToLightY, vecToLightZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                    if (contribution > 0) {
                        lambertAmount += contribution;
                    }
                }
                lambertAmount = Math.min(1, lambertAmount);
                lambertRed += entityRed * lambertAmount * entityLambert;
                lambertGreen += entityGreen * lambertAmount * entityLambert;
                lambertBlue += entityBlue * lambertAmount * entityLambert;
            }
            var specularRed = 0, specularBlue = 0, specularGreen = 0;
            var incidentRayVecX = rayVecX;
            var incidentRayVecY = rayVecY;
            var incidentRayVecZ = rayVecZ;
            var reflectedPtX = intersectPtX;
            var reflectedPtY = intersectPtY;
            var reflectedPtZ = intersectPtZ;
            var depthLimit = 1;
            var depth = 0;
            var entitySpecular = entities[nearestEntityIndex][13];
            while (depth < depthLimit) {
                var reflectedVecX = -reflectVecX(incidentRayVecX, incidentRayVecY, incidentRayVecZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                var reflectedVecY = -reflectVecY(incidentRayVecX, incidentRayVecY, incidentRayVecZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                var reflectedVecZ = -reflectVecZ(incidentRayVecX, incidentRayVecY, incidentRayVecZ, sphereNormPtX, sphereNormPtY, sphereNormPtZ);
                var nearestEntityIndexSpecular = -1;
                var maxEntityDistanceSpecular = Math.pow(2, 32);
                var nearestEntityDistanceSpecular = Math.pow(2, 32);
                for (var i = 0; i < this.constants.ENTITY_COUNT; i++) {
                    if (entities[i][0] == this.constants.SPHERE) {
                        var distance = sphereIntersection(entities[i][1], entities[i][2], entities[i][3], entities[i][7], reflectedPtX, reflectedPtY, reflectedPtZ, reflectedVecX, reflectedVecY, reflectedVecZ);
                        if (distance >= 0 && distance < nearestEntityDistance) {
                            nearestEntityIndexSpecular = i;
                            nearestEntityDistanceSpecular = distance;
                        }
                    }
                }
                if (nearestEntityIndexSpecular >= 0) {
                    entityPtX = entities[nearestEntityIndexSpecular][1];
                    entityPtY = entities[nearestEntityIndexSpecular][2];
                    entityPtZ = entities[nearestEntityIndexSpecular][3];
                    specularRed += entities[nearestEntityIndexSpecular][8] * entitySpecular;
                    specularGreen += entities[nearestEntityIndexSpecular][9] * entitySpecular;
                    specularBlue += entities[nearestEntityIndexSpecular][10] * entitySpecular;
                    reflectedPtX = reflectedPtX + normalizeX(reflectedVecX, reflectedVecY, reflectedVecZ) * nearestEntityDistance;
                    reflectedPtY = reflectedPtY + normalizeY(reflectedVecX, reflectedVecY, reflectedVecZ) * nearestEntityDistance;
                    reflectedPtZ = reflectedPtZ + normalizeZ(reflectedVecX, reflectedVecY, reflectedVecZ) * nearestEntityDistance;
                    sphereNormPtX = sphereNormalX(entityPtX, entityPtY, entityPtZ, reflectedPtX, reflectedPtY, reflectedPtZ);
                    sphereNormPtY = sphereNormalZ(entityPtX, entityPtY, entityPtZ, reflectedPtX, reflectedPtY, reflectedPtZ);
                    sphereNormPtY = sphereNormalZ(entityPtX, entityPtY, entityPtZ, reflectedPtX, reflectedPtY, reflectedPtZ);
                    incidentRayVecX = reflectedVecX;
                    incidentRayVecY = reflectedVecY;
                    incidentRayVecZ = reflectedVecZ;
                    depth += 1;
                }
                else {
                    depth = depthLimit;
                }
            }
            var ambient = entities[nearestEntityIndex][14];
            this.color(lambertRed + (lambertRed * specularRed) + entityRed * ambient, lambertGreen + (lambertGreen * specularGreen) + entityGreen * ambient, lambertBlue + (lambertBlue * specularBlue) + entityBlue * ambient);
        }
    }, opt);
};
var addFunctions = function (gpu, functions) { return functions.forEach(function (f) { return gpu.addFunction(f); }); };
var gpu = new GPU();
addFunctions(gpu, vectorFunctions);
addFunctions(gpu, utilityFunctions);
var scene = Scene.scene;
var gpuKernel = createKernel(Mode.GPU, scene);
var cpuKernel = createKernel(Mode.CPU, scene);
var canvas = gpuKernel.getCanvas();
document.getElementById('canvas').appendChild(canvas);
var renderLoop = renderer(gpuKernel, cpuKernel, canvas, scene);
window.onload = renderLoop;
//# sourceMappingURL=app.js.map