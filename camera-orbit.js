pc.script.create('camera-orbit', function (context) {
    // Creates a new Camera instance
    var Camera = function (entity) {
        this.entity = entity;

        this.distance = 20;
        this.height = 2;
        this.orbitAngle = 90;
    };
    var shouldRotate = false;

    Camera.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            var ball = context.root.findByName('Sphere');
            ball.script.ball.on('ball ready', function() {
                console.log('start rotating');
                shouldRotate = true;
            });
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            /*
            if (context.keyboard.isPressed(pc.input.KEY_LEFT)) {
                this.orbitAngle++;
            }
            if (context.keyboard.isPressed(pc.input.KEY_RIGHT)) {
                this.orbitAngle--;
            }
            */

            if(shouldRotate) {
                this.orbitAngle += 2;
                if(this.orbitAngle >= 270) {
                    shouldRotate = false;
                    this.fire('orbit ready');
                }
            }

            var cameraEntity = this.entity;
            var sphereEntity = context.root.findByName('sinep');

            cameraEntity.setPosition(sphereEntity.getPosition());

            cameraEntity.setEulerAngles(0, this.orbitAngle, 0);

            cameraEntity.translateLocal(0, this.height, this.distance);

            cameraEntity.lookAt(sphereEntity.getPosition());
        }
    };

    return Camera;
});
