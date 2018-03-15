const canvas = document.getElementById('c');

/**
 * @type {WebGLRenderingContext}
 */
const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
  // an attribute will receive data from a buffer
  attribute vec4 a_position;
 
  // all shaders have a main function
  void main() {
 
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;
  }
`

const FRAGMENT_SHADER = `
  // default precision
  precision highp float;
 
  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
  }

`
/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} type 
 * @param {string} source 
 */
function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
        return shader
    }
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader 
 */
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
        return program
    }
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)

const program = createProgram(gl, vertexShader, fragmentShader)

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
const positionBuffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

const position = [
    0, 0,
    0, 0.5,
    0.7, 0,
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)

// map -1 +1 clip space to 0 <-> width and 0 <-> height
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

// clear the canvas
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.useProgram(program)

gl.enableVertexAttribArray(positionAttributeLocation)

// specify how to pull data out
// do we need this ? 
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

const size = 2
const type = gl.FLOAT
const normalize = false
const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0 // start at the beginning of the buffer

// it binds current ARRAY_BUFFER (positionBuffer) to the attribute (a_position). ARRAY_BUFFER will be free
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)

// execute the program
const primitiveType = gl.TRIANGLES
const count = 3
gl.drawArrays(primitiveType, offset, count)
