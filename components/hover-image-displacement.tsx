'use client';

import { useRef, useEffect } from 'react';

const VS = `
  attribute vec2 a_position;
  attribute vec2 a_uv;
  varying vec2 vUv;
  void main(){
    vUv = a_uv;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FS = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D u_tex0, u_tex1, u_disp;
  uniform float u_progress, u_intensity;
  uniform vec2 u_scale0, u_scale1;
  uniform vec3 u_bg2;

  vec2 coverUv(vec2 uv, vec2 s){ return (uv - 0.5) * s + 0.5; }

  void main(){
    float p = clamp(u_progress, 0.0, 1.0);
    float d = texture2D(u_disp, vUv).r;
    vec2  disp = vec2(d * 2.0 - 1.0) * 0.35;

    vec2 uv0 = coverUv(vUv + disp * u_intensity * p,            u_scale0);
    vec2 uv1 = coverUv(vUv - disp * u_intensity * (1.0 - p),    u_scale1);

    vec4 a = texture2D(u_tex0, uv0);
    vec4 b = texture2D(u_tex1, uv1);

    // Composite image 2 over the background color in case it has transparency (like a PNG logo)
    b.rgb = mix(u_bg2, b.rgb, b.a);
    b.a = 1.0;

    gl_FragColor = mix(a, b, smoothstep(0.0, 1.0, p));
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error: " + gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;
  
  const program = gl.createProgram();
  if (!program) return null;
  
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error: " + gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function createTexture(gl: WebGLRenderingContext, image: HTMLImageElement) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return tex;
}

function setCanvasSize(canvas: HTMLCanvasElement, w: number, h: number) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.max(2, Math.floor(w * dpr));
  canvas.height = Math.max(2, Math.floor(h * dpr));
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

function coverScale(cw: number, ch: number, iw: number, ih: number) {
  const rc = cw / ch;
  const ri = iw / ih;
  return rc > ri ? [1, ri / rc] : [rc / ri, 1];
}

function containScale(cw: number, ch: number, iw: number, ih: number) {
  const rc = cw / ch;
  const ri = iw / ih;
  return rc > ri ? [rc / ri, 1] : [1, ri / rc];
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface HoverImageDisplacementProps {
  image1: string;
  image2: string;
  displacementImage?: string;
  intensity?: number;
  image2Mode?: 'cover' | 'contain';
  image2Background?: [number, number, number]; // RGB array from 0 to 1
  className?: string;
}

export default function HoverImageDisplacement({
  image1,
  image2,
  displacementImage = '/effect-image.jpg',
  intensity = 0.5,
  image2Mode = 'cover',
  image2Background = [0.95, 0.95, 0.95], // Default to off-white/light gray
  className = ''
}: HoverImageDisplacementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const wrap = containerRef.current;
    if (!wrap) return;

    let destroyed = false;
    let rafId: number | null = null;
    let resizeHandler: (() => void) | null = null;
    
    // Create canvas dynamically
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 z-10 w-full h-full pointer-events-none";
    
    // We only append it when WebGL initializes properly to avoid white blocks
    const initWebGL = async () => {
      const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
      if (!gl) return;
      
      const program = createProgram(gl, VS, FS);
      if (!program) return;
      
      gl.useProgram(program);
      
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1, 0, 0,
           1, -1, 1, 0,
          -1,  1, 0, 1,
          -1,  1, 0, 1,
           1, -1, 1, 0,
           1,  1, 1, 1
        ]),
        gl.STATIC_DRAW
      );
      
      const aPos = gl.getAttribLocation(program, "a_position");
      const aUv = gl.getAttribLocation(program, "a_uv");
      gl.enableVertexAttribArray(aPos);
      gl.enableVertexAttribArray(aUv);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
      gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);
      
      const u0 = gl.getUniformLocation(program, "u_tex0");
      const u1 = gl.getUniformLocation(program, "u_tex1");
      const ud = gl.getUniformLocation(program, "u_disp");
      const up = gl.getUniformLocation(program, "u_progress");
      const ui = gl.getUniformLocation(program, "u_intensity");
      const us0 = gl.getUniformLocation(program, "u_scale0");
      const us1 = gl.getUniformLocation(program, "u_scale1");
      const ubg2 = gl.getUniformLocation(program, "u_bg2");
      
      try {
        const [im0, im1, imd] = await Promise.all([
          loadImage(image1),
          loadImage(image2),
          loadImage(displacementImage)
        ]);
        
        if (destroyed) return;
        
        wrap.appendChild(canvas); // Safely append once images are loaded
        
        const t0 = createTexture(gl, im0);
        const t1 = createTexture(gl, im1);
        const td = createTexture(gl, imd);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, t0);
        gl.uniform1i(u0, 0);
        
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, t1);
        gl.uniform1i(u1, 1);
        
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, td);
        gl.uniform1i(ud, 2);
        
        gl.uniform1f(ui, intensity);
        gl.uniform3f(ubg2, image2Background[0], image2Background[1], image2Background[2]);
        
        const resize = () => {
          if (destroyed) return;
          const r = wrap.getBoundingClientRect();
          setCanvasSize(canvas, Math.max(1, r.width), Math.max(1, r.height));
          gl.viewport(0, 0, canvas.width, canvas.height);
          
          const s0 = coverScale(canvas.width, canvas.height, im0.width, im0.height);
          let s1 = image2Mode === 'contain' 
            ? containScale(canvas.width, canvas.height, im1.width, im1.height)
            : coverScale(canvas.width, canvas.height, im1.width, im1.height);
          
          if (image2Mode === 'contain') {
             // Shrink it further so it sits nicely in the center (adds padding)
             s1[0] *= 1.4;
             s1[1] *= 1.4;
          }
          
          gl.useProgram(program);
          gl.uniform2f(us0, s0[0], s0[1]);
          gl.uniform2f(us1, s1[0], s1[1]);
          
          // Force a draw on resize to avoid flicker
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        };
        
        resizeHandler = resize;
        resize();
        window.addEventListener("resize", resizeHandler);
        
        let target = 0;
        let start = performance.now();
        const DUR = 600; // Tweaked from 420 for smoother liquid feel
        
        const draw = (now: number) => {
          if (destroyed) return;
          const t = Math.min(1, Math.max(0, (now - start) / DUR));
          const e = easeOutCubic(t);
          
          const progress = target === 1 ? e : 1 - e;
          
          gl.useProgram(program);
          gl.uniform1f(up, progress);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
          
          // Only request animation frame if we haven't reached the target
          if (t < 1) {
             rafId = requestAnimationFrame(draw);
          }
        };
        
        const triggerAnim = (newTarget: number) => {
           target = newTarget;
           start = performance.now();
           if (rafId) cancelAnimationFrame(rafId);
           rafId = requestAnimationFrame(draw);
        };
        
        // Initial render
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
        const onEnter = () => triggerAnim(1);
        const onLeave = () => triggerAnim(0);
        
        wrap.addEventListener("mouseenter", onEnter);
        wrap.addEventListener("mouseleave", onLeave);
        wrap.addEventListener("touchstart", onEnter, { passive: true });
        wrap.addEventListener("touchend", onLeave, { passive: true });
        
      } catch (err) {
        console.error("Error initializing WebGL displacement map", err);
      }
    };
    
    initWebGL();
    
    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [image1, image2, displacementImage, intensity]);
  
  return (
    <div ref={containerRef} className={`relative overflow-hidden cursor-pointer ${className}`}>
      {/* Invisible fallback img purely to give the container intrinsic sizing/aspect ratio */}
      <img src={image1} className="w-full h-full object-cover opacity-0 pointer-events-none" alt="" />
    </div>
  );
}
