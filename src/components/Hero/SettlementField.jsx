import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../contexts/ThemeContext";

function useReducedMotion() {
  const [matches, setMatch] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return matches;
}

export default function SettlementField() {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  const [{ positions, types, phases }] = useState(() => {
    const coreCount = 10000;

    const pathCount = 8;
    const pointsPerPath = 250;
    const totalCount = coreCount + pathCount * pointsPerPath;

    const posArray = new Float32Array(totalCount * 3);
    const typeArray = new Float32Array(totalCount);
    const phaseArray = new Float32Array(totalCount);

    for (let i = 0; i < coreCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / coreCount);
      const theta = Math.sqrt(coreCount * Math.PI) * phi;
      const r = 2.0;

      posArray[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      posArray[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      posArray[i * 3 + 2] = r * Math.cos(phi);
      typeArray[i] = 0.0;
      phaseArray[i] = Math.random();
    }

    let offset = coreCount * 3;
    let attrOffset = coreCount;
    for (let p = 0; p < pathCount; p++) {
      const angle = (p / pathCount) * Math.PI * 2;
      const start = new THREE.Vector3(
        Math.cos(angle) * 6,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * 6,
      );
      const mid = new THREE.Vector3(
        Math.cos(angle) * 3,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * 3,
      );
      const end = new THREE.Vector3(
        Math.cos(angle) * 1.5,
        Math.random() - 0.5,
        Math.sin(angle) * 1.5,
      );
      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      const pathPoints = curve.getPoints(pointsPerPath - 1);

      for (let i = 0; i < pointsPerPath; i++) {
        posArray[offset++] = pathPoints[i].x;
        posArray[offset++] = pathPoints[i].y;
        posArray[offset++] = pathPoints[i].z;
        typeArray[attrOffset] = 1.0;
        phaseArray[attrOffset] = i / pointsPerPath;
        attrOffset++;
      }
    }

    return {
      positions: posArray,
      types: typeArray,
      phases: phaseArray,
    };
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color(theme === 'beige' ? "#C89B6D" : "#F2F0EA") },
      uColorActive: { value: new THREE.Color(theme === 'beige' ? "#43352A" : "#0055ff") },
      uAlphaMultiplier: { value: theme === 'beige' ? 5.0 : 1.0 },
      uReducedMotion: { value: prefersReducedMotion ? 1.0 : 0.0 },
    }),
    [prefersReducedMotion, theme],
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.blending = theme === 'beige' ? THREE.NormalBlending : THREE.AdditiveBlending;
      materialRef.current.uniforms.uAlphaMultiplier.value = theme === 'beige' ? 5.0 : 1.0;
      materialRef.current.needsUpdate = true;
    }
  }, [theme]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    pointsRef.current.rotation.y -= delta * 0.02;

    if (!prefersReducedMotion) {
      const targetX = (state.pointer.y * Math.PI) / 12;
      const targetY = (state.pointer.x * Math.PI) / 12;
      pointsRef.current.rotation.x = THREE.MathUtils.damp(
        pointsRef.current.rotation.x,
        targetX,
        2,
        delta,
      );
      pointsRef.current.rotation.y = THREE.MathUtils.damp(
        pointsRef.current.rotation.y,
        targetY,
        2,
        delta,
      );
    }

    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aType" args={[types, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uReducedMotion;
          uniform float uAlphaMultiplier;
          attribute float aType;
          attribute float aPhase;
          
          varying float vType;
          varying float vPhase;
          varying float vPulse;

          // Simple noise
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          
          float snoise(vec3 v) {
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 = v - i + dot(i, C.xxx) ;

            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );

            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;

            i = mod289(i);
            vec4 p = permute( permute( permute(
                       i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                     + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                     + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

            float n_ = 0.142857142857;
            vec3  ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );

            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );

            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);

            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                          dot(p2,x2), dot(p3,x3) ) );
          }

          void main() {
            vType = aType;
            vPhase = aPhase;
            
            vec3 pos = position;
            
            // Subtle breathing on the core (Type 0.0)
            if (aType == 0.0 && uReducedMotion == 0.0) {
              float n = snoise(pos * 0.8 + uTime * 0.2);
              vec3 dir = normalize(pos);
              pos += dir * n * 0.2;
            }

            // Calculate pulse state for color fading (Type 1.0)
            vPulse = 0.0;
            if (aType == 1.0) {
              // Create traveling pulses along the curve, less frequent
              float progress = fract(uTime * 0.15 - aPhase);
              // Shorter pulse
              vPulse = smoothstep(0.95, 0.975, progress) * smoothstep(1.0, 0.975, progress);
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Base point size
            float pSize = aType == 0.0 ? 1.5 : 1.2;
            if (vPulse > 0.1) pSize *= 1.4; // Enlarge active pulses slightly
            
            gl_PointSize = pSize * (10.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColorCore;
          uniform vec3 uColorActive;
          uniform float uAlphaMultiplier;
          
          varying float vType;
          varying float vPulse;

          void main() {
            // Soft circle shape
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            
            vec3 color = uColorCore;
            float alpha = 0.05; // Reduced Base core opacity

            if (vType == 1.0) {
              alpha = 0.02; // Reduced Faint rail opacity
              if (vPulse > 0.01) {
                color = mix(uColorCore, uColorActive, vPulse);
                alpha = mix(0.02, 0.2, vPulse); // Reduced pulse opacity
              }
            } else {
              alpha = smoothstep(0.5, 0.2, dist) * 0.15; // Reduced membrane visibility
            }

            gl_FragColor = vec4(color, alpha * uAlphaMultiplier);
          }
        `}
      />
    </points>
  );
}
