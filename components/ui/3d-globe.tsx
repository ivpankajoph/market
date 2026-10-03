"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { cn } from "@/lib/utils";

const EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

export interface Globe3DConfig {
  radius?: number;
  textureUrl?: string;
  bumpMapUrl?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  atmosphereBlur?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  ambientIntensity?: number;
  pointLightIntensity?: number;
  backgroundColor?: string | null;
}

interface Globe3DProps {
  config?: Globe3DConfig;
  className?: string;
}

export function Globe3D({ config = {}, className }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const radius = config.radius ?? 2;
    const scene = new THREE.Scene();
    if (config.backgroundColor) {
      scene.background = new THREE.Color(config.backgroundColor);
    }

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, radius * 3.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: !config.backgroundColor,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "block h-full w-full";
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    const earthTexture = textureLoader.load(config.textureUrl ?? EARTH_TEXTURE);
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = 16;
    const bumpTexture = textureLoader.load(config.bumpMapUrl ?? BUMP_TEXTURE);
    bumpTexture.anisotropy = 8;

    const globeGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: (config.bumpScale ?? 1) * 0.05,
      roughness: 0.7,
      metalness: 0,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    let atmosphereGeometry: THREE.SphereGeometry | undefined;
    let atmosphereMaterial: THREE.ShaderMaterial | undefined;
    let atmosphere: THREE.Mesh | undefined;

    if (config.showAtmosphere ?? false) {
      atmosphereGeometry = new THREE.SphereGeometry(radius, 64, 32);
      atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
          atmosphereColor: {
            value: new THREE.Color(config.atmosphereColor ?? "#4da6ff"),
          },
          intensity: { value: config.atmosphereIntensity ?? 0.5 },
          fresnelPower: {
            value: Math.max(0.5, 5 - (config.atmosphereBlur ?? 2)),
          },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 atmosphereColor;
          uniform float intensity;
          uniform float fresnelPower;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float fresnel = pow(
              1.0 - abs(dot(vNormal, normalize(-vPosition))),
              fresnelPower
            );
            gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      });
      atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      atmosphere.scale.setScalar(1.12);
      scene.add(atmosphere);
    }

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      config.ambientIntensity ?? 0.6,
    );
    const keyLight = new THREE.DirectionalLight(
      0xffffff,
      config.pointLightIntensity ?? 1.5,
    );
    keyLight.position.set(radius * 5, radius * 2, radius * 5);
    const fillLight = new THREE.DirectionalLight(
      0x88ccff,
      (config.pointLightIntensity ?? 1.5) * 0.3,
    );
    fillLight.position.set(-radius * 3, radius, -radius * 2);
    scene.add(ambientLight, keyLight, fillLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = config.enablePan ?? false;
    controls.enableZoom = config.enableZoom ?? false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.4;
    controls.autoRotate = (config.autoRotateSpeed ?? 0.3) > 0;
    controls.autoRotateSpeed = config.autoRotateSpeed ?? 0.3;

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let animationFrame = 0;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      earthTexture.dispose();
      bumpTexture.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      atmosphereGeometry?.dispose();
      atmosphereMaterial?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [config]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[500px] w-full", className)}
      role="img"
      aria-label="A rotating view of Earth"
    />
  );
}
