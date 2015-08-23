pc.script.create("balls", function (app) {
    var ScriptObject = function (entity) {
        this.entity = entity;
    };

    var first = true;
    ScriptObject.prototype = {
        initialize: function () {
        },

        update: function (dt) {
            if (this.entity.getPosition().z < 2.0) {
                this.entity.rigidbody.applyForce(0, 0, dt * 400);
            } else if (first){
                console.log('applied');
                this.entity.rigidbody.applyImpulse(0, 0, -10);
                first = false;
            }
        }
    };

    return ScriptObject;
});
