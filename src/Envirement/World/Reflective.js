import * as THREE from 'three'
import Experience from '../Experience.js'
import { Mesh } from 'three/src/objects/Mesh.js';

export class Reflector extends Mesh {

	constructor( geometry, options = {} ) {

		super( geometry );

		this.type = 'Reflector';

        var scope = this;

        options = options || {};

        var color = ( options.color !== undefined ) ? new THREE.Color( options.color ) : new THREE.Color( 0x7F7F7F );
        var textureWidth = options.textureWidth || 512;
        var textureHeight = options.textureHeight || 512;
        var clipBias = options.clipBias || 0;
        var shader = options.shader || Reflector.ReflectorShader;

        //

        var reflectorPlane = new THREE.Plane();
        var normal = new THREE.Vector3();
        var reflectorWorldPosition = new THREE.Vector3();
        var cameraWorldPosition = new THREE.Vector3();
        var rotationMatrix = new THREE.Matrix4();
        var lookAtPosition = new THREE.Vector3( 0, 0, - 1 );
        var clipPlane = new THREE.Vector4();

        var view = new THREE.Vector3();
        var target = new THREE.Vector3();
        var q = new THREE.Vector4();

        var textureMatrix = new THREE.Matrix4();
        var virtualCamera = new THREE.PerspectiveCamera();

        var parameters = {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            generateMipmaps : false,
            format: THREE.RGBAFormat,

            stencilBuffer: false
        };

        var renderTarget = new THREE.WebGLRenderTarget( textureWidth, textureHeight, parameters );

        if ( ! THREE.MathUtils.isPowerOfTwo( textureWidth ) || ! THREE.MathUtils.isPowerOfTwo( textureHeight ) ) {

            renderTarget.texture.generateMipmaps = false;

        }

        var material = new THREE.ShaderMaterial( {
            uniforms: THREE.UniformsUtils.merge( [
                {
                    opacity: {
                        value: 1
                    }
                },
                shader.uniforms
            ] ),
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            // precision: 'lowp'
        } );

        material.uniforms[ "tDiffuse" ].value = renderTarget.texture;
        material.uniforms[ "color" ].value = color;
        material.uniforms[ "textureMatrix" ].value = textureMatrix;

        this.material = material;

        this.onBeforeRender = function ( renderer, scene, camera ) {

            reflectorWorldPosition.setFromMatrixPosition( scope.matrixWorld );
            cameraWorldPosition.setFromMatrixPosition( camera.matrixWorld );

            rotationMatrix.extractRotation( scope.matrixWorld );

            normal.set( 0, 0, 1 );
            normal.applyMatrix4( rotationMatrix );

            view.subVectors( reflectorWorldPosition, cameraWorldPosition );

            // Avoid rendering when reflector is facing away

            if ( view.dot( normal ) > 0 ) return;

            view.reflect( normal ).negate();
            view.add( reflectorWorldPosition );

            rotationMatrix.extractRotation( camera.matrixWorld );

            lookAtPosition.set( 0, 0, - 1 );
            lookAtPosition.applyMatrix4( rotationMatrix );
            lookAtPosition.add( cameraWorldPosition );

            target.subVectors( reflectorWorldPosition, lookAtPosition );
            target.reflect( normal ).negate();
            target.add( reflectorWorldPosition );

            virtualCamera.position.copy( view );
            virtualCamera.up.set( 0, 1, 0 );
            virtualCamera.up.applyMatrix4( rotationMatrix );
            virtualCamera.up.reflect( normal );
            virtualCamera.lookAt( target );

            virtualCamera.far = camera.far; // Used in WebGLBackground

            virtualCamera.updateMatrixWorld();
            virtualCamera.projectionMatrix.copy( camera.projectionMatrix );

            // Update the texture matrix
            textureMatrix.set(
                0.5, 0.0, 0.0, 0.5,
                0.0, 0.5, 0.0, 0.5,
                0.0, 0.0, 0.5, 0.5,
                0.0, 0.0, 0.0, 1.0
            );
            textureMatrix.multiply( virtualCamera.projectionMatrix );
            textureMatrix.multiply( virtualCamera.matrixWorldInverse );
            textureMatrix.multiply( scope.matrixWorld );

            // Now update projection matrix with new clip plane, implementing code from: http://www.terathon.com/code/oblique.html
            // Paper explaining this technique: http://www.terathon.com/lengyel/Lengyel-Oblique.pdf
            reflectorPlane.setFromNormalAndCoplanarPoint( normal, reflectorWorldPosition );
            reflectorPlane.applyMatrix4( virtualCamera.matrixWorldInverse );

            clipPlane.set( reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant );

            var projectionMatrix = virtualCamera.projectionMatrix;

            q.x = ( Math.sign( clipPlane.x ) + projectionMatrix.elements[ 8 ] ) / projectionMatrix.elements[ 0 ];
            q.y = ( Math.sign( clipPlane.y ) + projectionMatrix.elements[ 9 ] ) / projectionMatrix.elements[ 5 ];
            q.z = - 1.0;
            q.w = ( 1.0 + projectionMatrix.elements[ 10 ] ) / projectionMatrix.elements[ 14 ];

            // Calculate the scaled plane vector
            clipPlane.multiplyScalar( 2.0 / clipPlane.dot( q ) );

            // Replacing the third row of the projection matrix
            projectionMatrix.elements[ 2 ] = clipPlane.x;
            projectionMatrix.elements[ 6 ] = clipPlane.y;
            projectionMatrix.elements[ 10 ] = clipPlane.z + 1.0 - clipBias;
            projectionMatrix.elements[ 14 ] = clipPlane.w;

            // Render

            renderTarget.texture.encoding = renderer.outputEncoding;

            scope.visible = false;

            var currentRenderTarget = renderer.getRenderTarget();

            var currentXrEnabled = renderer.xr.enabled;
            var currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;

            renderer.xr.enabled = false; // Avoid camera modification
            renderer.shadowMap.autoUpdate = false; // Avoid re-computing shadows

            renderer.setRenderTarget( renderTarget );

            renderer.state.buffers.depth.setMask( true ); // make sure the depth buffer is writable so it can be properly cleared, see #18897

            if ( renderer.autoClear === false ) renderer.clear();
            renderer.render( scene, virtualCamera );

            renderer.xr.enabled = currentXrEnabled;
            renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;

            renderer.setRenderTarget( currentRenderTarget );

            // Restore viewport

            var viewport = camera.viewport;

            if ( viewport !== undefined ) {

                renderer.state.viewport( viewport );

            }

            scope.visible = true;

        };

        this.getRenderTarget = function () {

            return renderTarget;

        };
    }

};

// Reflector.prototype = Object.create( THREE.Mesh.prototype );
Reflector.prototype.constructor = Reflector;

Reflector.ReflectorShader = {

	uniforms: {

		'color': {
			value: new THREE.Color(0x0000FF)
		},

		'tDiffuse': {
			value: null
		},

		'textureMatrix': {
			value: null
		}

	},

	vertexShader: [
		'uniform mat4 textureMatrix;',
		'varying vec4 vUv;',

		'void main() {',

		'	vUv = textureMatrix * vec4( position, 1.0 );',

		'	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

		'}'
	].join( '\n' ),

	fragmentShader: [
		'uniform vec3 color;',
		'uniform float opacity;',
		'uniform sampler2D tDiffuse;',
		'varying vec4 vUv;',

		'float blendOverlay( float base, float blend ) {',

		'	return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );',

		'}',

		'vec3 blendOverlay( vec3 base, vec3 blend ) {',

		'	return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );',

		'}',

		'void main() {',

		'	vec4 base = texture2DProj( tDiffuse, vUv );',
		'	gl_FragColor = vec4( blendOverlay( base.rgb, color ), opacity );',

		'}'
	].join( '\n' )
};

export default class Reflections
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.setInstance()
    }

    setInstance() {
        this.geometry = new THREE.CircleGeometry( 25, 5 );
        this.groundMirror = new Reflector( this.geometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth,
            textureHeight: window.innerHeight,
            color: 0x00FFFF
        } );
        this.groundMirror.position.y = 0;
        this.groundMirror.material.transparent = true;
        this.groundMirror.material.uniforms.opacity.value = 0.8;
        this.groundMirror.rotateX( - Math.PI / 2 );
        this.scene.add( this.groundMirror );

    }

    removeMirror()
    {
        this.scene.remove(this.groundMirror)
        this.mirror = false
    }

    addMirror()
    {
        this.scene.add(this.groundMirror)
        this.mirror = true
    }
    
}