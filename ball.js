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
            camera.script['camera-orbit'].on('orbit ready', function() {
                console.log('light up');
                lightComponent.enabled = true;
                //light up ball
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
