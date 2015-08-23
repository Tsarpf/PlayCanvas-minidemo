pc.script.attribute("litMat", "asset", [], {type: "material"});

pc.script.create("ball", function (app) {
    var ScriptObject = function (entity) {
        this.entity = entity;
    };

    var first = true;
    ScriptObject.prototype = {
        initialize: function () {
            var camera = app.root.findByName('Camera');
            var lightComponent = this.entity.light;
            lightComponent.enabled = false;
            var that = this;
            var sinep = app.root.findByName('sinep');
            var instance = sinep.model.model.meshInstances[0];
            console.log(sinep.model.model.meshInstances[0]);
            camera.script['camera-orbit'].on('orbit ready', function() {
                setTimeout(function() {
                    console.log(that.entity.model.model.graph.findByName('Text'));
                    lightUp(app, that, instance, lightComponent);
                }, 250);
            });
        },

        update: function (dt) {
            if (this.entity.getPosition().z < 2.0) {
                this.entity.rigidbody.applyForce(0, 0, dt * 400);
            } else if (first){
                console.log('applied');
                this.entity.rigidbody.applyImpulse(0, 0, -10);
                first = false;
                //app.systems.script.broadcast('camera-orbit', 'startRotate');
                this.fire('ball ready');
            }
        }
    };

    return ScriptObject;
});

function lightUp(context, that, instance, lightComponent) {
    console.log('ses');
    console.log(context.assets);
    var litMat = context.assets.get(that.litMat).resource;
    //getAssetByResourceId
    var originalMat = instance.material;
   setTimeout(function() {
        instance.material = litMat;
    }, 0);
    setTimeout(function() {
        instance.material = originalMat;
    }, 50);
    setTimeout(function() {
        instance.material = litMat;
    }, 1250);
    setTimeout(function() {
        instance.material = originalMat;
    }, 1330);
    setTimeout(function() {
        instance.material = litMat;
    }, 1490);
    setTimeout(function() {
        instance.material = originalMat;
    }, 1580);
    setTimeout(function() {
        instance.material = litMat;
    }, 1620);
    setTimeout(function() {
        instance.material = originalMat;
    }, 1950);
    setTimeout(function() {
        instance.material = litMat;
    }, 2050);
    setTimeout(function() {
        lightComponent.enabled = true;
    }, 2550);
}
