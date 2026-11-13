'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

export interface AuroraProps {
  /** 2 to 5 CSS colors. Any format the browser understands. */
  colorStops?: string[];
  /** How much the aurora edge waves up and down. */
  amplitude?: number;
  /** Softness of the lower edge, 0 to 1. */
  blend?: number;
  /** Animation speed multiplier. */
  speed?: number;
  /** How far the aurora reaches into the screen, 0 to 1. */
  height?: number;
  /** Intensity, 0 to 2. */
  brightness?: number;
  /** Overall opacity, 0 to 1. */
  opacity?: number;
  /** Star density, 0 (none) to 1 (lots). */
  stars?: number;
  /** Which edge the aurora hangs from. */
  direction?: 'top' | 'bottom';
  /** Aurora bends toward the pointer. */
  mouseInteraction?: boolean;
  /** Fade in on load. */
  intro?: boolean;
  paused?: boolean;
  /** Solid color behind the aurora. This is what you see where there is no glow. */
  background?: string;
  /** Use 'fixed' for a full-page site background, 'absolute' to fill a positioned parent. */
  position?: 'fixed' | 'absolute';
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
}

const MAX_STOPS = 5;
const INTRO_SECONDS = 2.2;

const VERTEX = `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec3  uColors[${MAX_STOPS}];
uniform int   uCount;
uniform float uAmp;
uniform float uBlend;
uniform float uHeight;
uniform float uBright;
uniform float uOpacity;
uniform float uFromBottom;
uniform vec2  uMouse;   // x in aspect units, y = strength 0..1
uniform float uReveal;
uniform float uStars;
out vec4 outColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

// 2D simplex noise (Ashima Arts / Ian McEwan)
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 ramp(float t) {
  float x = clamp(t, 0.0, 1.0) * float(uCount - 1);
  int i = int(min(floor(x), float(uCount - 2)));
  float f = smoothstep(0.0, 1.0, x - float(i));
  return mix(uColors[i], uColors[i + 1], f);
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// One layer of twinkling stars on a jittered grid
float starLayer(vec2 p, float scale, float chance, float t, float seed) {
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  float h = hash(id + seed);
  if (h > chance) return 0.0;                       // most cells stay empty
  vec2 off = vec2(hash(id + seed + 7.3), hash(id + seed + 3.1)) - 0.5;
  f -= off * 0.6;                                    // jitter so it is not a visible grid
  float size = 0.035 + 0.06 * hash(id + seed + 11.0);
  float twinkle = 0.55 + 0.45 * sin(t * (2.0 + 6.0 * hash(id + seed + 5.0)) + h * 60.0);
  return smoothstep(size, 0.0, length(f)) * twinkle;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float edge = mix(1.0 - uv.y, uv.y, uFromBottom);   // 0 at the anchored edge, 1 at the far edge
  float X = (uv.x - 0.5) * uRes.x / uRes.y;           // aspect-corrected horizontal position
  float t = uTime;

  // Slow wandering wave that defines the lower edge of the curtain
  float wave = snoise(vec2(X * 0.8 + t * 0.10, t * 0.15)) * 0.7
             + snoise(vec2(X * 1.7 - t * 0.12, t * 0.20 + 10.0)) * 0.3;

  float reach = uMouse.y * exp(-pow((X - uMouse.x) / 0.4, 2.0));

  float hem = uHeight + wave * 0.15 * uAmp + reach * 0.08;
  hem = mix(-0.2, hem, uReveal);

  float rise = hem - edge;                 // > 0 inside the aurora
  float soft = 0.05 + uBlend * 0.2;
  float body = pow(smoothstep(-soft, 0.3, rise), 1.6);

  // Vertical streaks give the curtain its folds
  float rays = 0.85 + 0.15 * snoise(vec2(X * 6.0 + t * 0.05, t * 0.2));

  vec3 color = ramp(uv.x + 0.06 * sin(t * 0.3) + max(rise, 0.0) * 0.1);

  float a = clamp(body * rays * uBright * uOpacity * uReveal, 0.0, 1.0);
  float dither = (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  // Stars: a small sharp layer and a few larger ones, dimmed where the aurora is bright
  vec2 sp = gl_FragCoord.xy / uRes.y;
  float s = starLayer(sp, 34.0, 0.10 * uStars, t * 2.0, 0.0)
          + starLayer(sp + 5.0, 17.0, 0.07 * uStars, t * 2.0, 40.0) * 1.3;
  float starA = clamp(s, 0.0, 1.0) * uOpacity * smoothstep(0.0, 0.7, uReveal) * (1.0 - a);
  vec3 starColor = vec3(0.88, 0.92, 1.0);

  // Premultiplied alpha: transparent where there is no glow or star
  outColor = vec4((color + dither) * a + starColor * starA, a + starA);
}`;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function createProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  const build = (type: number, src: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('[Aurora] shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vs = build(gl.VERTEX_SHADER, VERTEX);
  const fs = build(gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, 'aPos');
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('[Aurora] program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function Aurora({
  colorStops = ['#5227FF', '#7cff67', '#5227FF'],
  amplitude = 1,
  blend = 0.5,
  speed = 1,
  height = 0.45,
  brightness = 1,
  opacity = 1,
  stars = 0.5,
  direction = 'top',
  mouseInteraction = true,
  intro = true,
  paused = false,
  background = '#101316',
  position = 'fixed',
  zIndex = 0,
  className,
  style
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<() => void>(() => {});
  const [failed, setFailed] = useState(false);

  // Latest props, readable from inside the render loop without re-creating GL state
  const props = {
    colors: colorStops.filter(Boolean).slice(0, MAX_STOPS),
    amplitude: Math.max(0, amplitude),
    blend: clamp(blend, 0, 1),
    speed,
    height: clamp(height, 0, 1),
    brightness: clamp(brightness, 0, 2),
    opacity: clamp(opacity, 0, 1),
    stars: clamp(stars, 0, 1),
    fromBottom: direction === 'bottom' ? 1 : 0,
    mouseInteraction,
    intro,
    paused
  };
  const propsRef = useRef(props);
  propsRef.current = props;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false
    });
    if (!gl) {
      console.warn('[Aurora] WebGL2 is not available, showing CSS fallback.');
      setFailed(true);
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      setFailed(true);
      return;
    }

    const loc = (name: string) => gl.getUniformLocation(program, name);
    const U = {
      res: loc('uRes'),
      time: loc('uTime'),
      colors: loc('uColors'),
      count: loc('uCount'),
      amp: loc('uAmp'),
      blend: loc('uBlend'),
      height: loc('uHeight'),
      bright: loc('uBright'),
      opacity: loc('uOpacity'),
      fromBottom: loc('uFromBottom'),
      mouse: loc('uMouse'),
      reveal: loc('uReveal'),
      stars: loc('uStars')
    };

    // One big triangle that covers the screen
    const vao = gl.createVertexArray();
    const buffer = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Turn any CSS color string into [r, g, b] in 0..1
    const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const colorCache = new Map<string, number[]>();
    const toRgb = (css: string): number[] => {
      const hit = colorCache.get(css);
      if (hit) return hit;
      let rgb = [1, 1, 1];
      if (probe) {
        probe.clearRect(0, 0, 1, 1);
        probe.fillStyle = '#ffffff';
        probe.fillStyle = css;
        probe.fillRect(0, 0, 1, 1);
        const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
        rgb = [r / 255, g / 255, b / 255];
      }
      colorCache.set(css, rgb);
      return rgb;
    };
    const palette = new Float32Array(MAX_STOPS * 3);

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const view = { w: 1, h: 1 };
    const state = {
      clock: 0,
      reveal: propsRef.current.intro && !reduceMotion ? 0 : 1,
      mx: 0,
      strength: 0,
      inside: false,
      pointerX: 0
    };

    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = () => {
      const p = propsRef.current;
      const colors = p.colors.length >= 2 ? p.colors : p.colors.length === 1 ? [p.colors[0], p.colors[0]] : ['#5227FF', '#7cff67'];
      colors.forEach((c, i) => palette.set(toRgb(c), i * 3));

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, state.clock);
      gl.uniform3fv(U.colors, palette);
      gl.uniform1i(U.count, colors.length);
      gl.uniform1f(U.amp, p.amplitude);
      gl.uniform1f(U.blend, p.blend);
      gl.uniform1f(U.height, p.height);
      gl.uniform1f(U.bright, p.brightness);
      gl.uniform1f(U.opacity, p.opacity);
      gl.uniform1f(U.stars, p.stars);
      gl.uniform1f(U.fromBottom, p.fromBottom);
      gl.uniform2f(U.mouse, state.mx, state.strength);
      gl.uniform1f(U.reveal, 1 - Math.pow(1 - state.reveal, 3)); // ease-out
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;

      const p = propsRef.current;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;

      if (p.paused) {
        state.reveal = 1;
        draw();
        last = 0; // stop looping until something wakes us
        return;
      }

      if (!reduceMotion) state.clock += dt * p.speed * 0.5;

      const engaged = p.mouseInteraction && state.inside && !reduceMotion;
      state.mx += (state.pointerX - state.mx) * (1 - Math.exp(-dt / 0.6));
      state.strength += ((engaged ? 1 : 0) - state.strength) * (1 - Math.exp(-dt / (engaged ? 0.9 : 1.4)));

      if (!p.intro || reduceMotion) state.reveal = 1;
      else if (state.reveal < 1) state.reveal = Math.min(1, state.reveal + dt / INTRO_SECONDS);

      draw();
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      view.w = Math.max(1, container.clientWidth);
      view.h = Math.max(1, container.clientHeight);
      canvas.width = Math.max(1, Math.round(view.w * ratio));
      canvas.height = Math.max(1, Math.round(view.h * ratio));
      draw();
      wake();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      state.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      state.pointerX = (x - rect.width / 2) / Math.max(1, rect.height);
      if (!propsRef.current.paused) wake();
    };
    const onPointerLeave = () => {
      state.inside = false;
    };
    const onVisibility = () => {
      last = 0;
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(en => en.isIntersecting);
      if (visible) {
        last = 0;
        wake();
      }
    });
    intersection.observe(container);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    wakeRef.current = () => {
      if (!raf) draw();
      wake();
    };

    resize();

    return () => {
      cancelAnimationFrame(raf);
      wakeRef.current = () => {};
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      // Intentionally NOT calling WEBGL_lose_context: in React Strict Mode the effect
      // runs twice on the same canvas, and a lost context would stay dead (blank canvas).
    };
  }, []);

  // Re-draw / restart the loop when props change (e.g. paused toggled)
  useEffect(() => {
    wakeRef.current();
  });

  const fallbackGradient = `linear-gradient(180deg, ${propsRef.current.colors[0] ?? '#5227FF'}55 0%, transparent ${Math.round(
    propsRef.current.height * 100
  )}%)`;

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{
        position,
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex,
        background: failed ? `${fallbackGradient}, ${background}` : background,
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}