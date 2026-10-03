"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { cn } from "@/lib/utils";

const COUNTRY_DATA_URL = "https://assets.aceternity.com/globe.json";

export type GlobePosition = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig?: GlobeConfig;
  data: GlobePosition[];
  className?: string;
}

export function World({ globeConfig = {}, data, className }: WorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const config = {
      pointSize: 1,
      globeColor: "#0a0a0a",
      showAtmosphere: true,
      atmosphereColor: "#a1a1aa",
      atmosphereAltitude: 0.08,
      emissive: "#0a0a0a",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      polygonColor: "rgba(250,250,250,0.72)",
      ambientLight: "#ffffff",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#ffffff",
      arcTime: 1400,
      arcLength: 0.78,
      rings: 1,
      maxRings: 3,
      initialPosition: { lat: 20, lng: 78 },
      autoRotate: true,
      autoRotateSpeed: 0.65,
      ...globeConfig,
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 180, 1800);
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "block h-full w-full";
    container.appendChild(renderer.domElement);

    const world = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true });
    const material = world.globeMaterial() as THREE.MeshPhongMaterial;
    material.color = new THREE.Color(config.globeColor);
    material.emissive = new THREE.Color(config.emissive);
    material.emissiveIntensity = config.emissiveIntensity;
    material.shininess = config.shininess;
    world
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude);
    world.rotation.x = THREE.MathUtils.degToRad(config.initialPosition.lat * 0.15);
    world.rotation.y = THREE.MathUtils.degToRad(-config.initialPosition.lng);
    scene.add(world);

    const points = data.flatMap((arc) => [
      {
        size: config.pointSize,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      },
      {
        size: config.pointSize,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      },
    ]);
    const uniquePoints = points.filter(
      (point, index, all) =>
        all.findIndex(
          (candidate) =>
            candidate.lat === point.lat && candidate.lng === point.lng,
        ) === index,
    );

    world
      .arcsData(data)
      .arcStartLat((item) => (item as GlobePosition).startLat)
      .arcStartLng((item) => (item as GlobePosition).startLng)
      .arcEndLat((item) => (item as GlobePosition).endLat)
      .arcEndLng((item) => (item as GlobePosition).endLng)
      .arcColor((item) => (item as GlobePosition).color)
      .arcAltitude((item) => (item as GlobePosition).arcAlt)
      .arcStroke(0.3)
      .arcDashLength(config.arcLength)
      .arcDashInitialGap((item) => (item as GlobePosition).order)
      .arcDashGap(12)
      .arcDashAnimateTime(config.arcTime)
      .pointsData(uniquePoints)
      .pointColor((item) => (item as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(1.6)
      .ringsData(
        uniquePoints.map((point) => ({
          lat: point.lat,
          lng: point.lng,
          color: point.color,
        })),
      )
      .ringColor((item) => (item as { color: string }).color)
      .ringMaxRadius(config.maxRings)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod((config.arcTime * config.arcLength) / config.rings);

    const abortController = new AbortController();
    void fetch(COUNTRY_DATA_URL, { signal: abortController.signal })
      .then((response) => response.json())
      .then((countries: { features: object[] }) => {
        if (abortController.signal.aborted) return;
        world
          .hexPolygonsData(countries.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.7)
          .hexPolygonColor(() => config.polygonColor);
      })
      .catch(() => undefined);

    const ambientLight = new THREE.AmbientLight(config.ambientLight, 0.65);
    const leftLight = new THREE.DirectionalLight(
      config.directionalLeftLight,
      0.9,
    );
    leftLight.position.set(-400, 100, 400);
    const topLight = new THREE.DirectionalLight(
      config.directionalTopLight,
      0.8,
    );
    topLight.position.set(-200, 500, 200);
    const pointLight = new THREE.PointLight(config.pointLight, 1);
    pointLight.position.set(-200, 500, 200);
    scene.add(ambientLight, leftLight, topLight, pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 300;
    controls.maxDistance = 300;
    controls.autoRotate = config.autoRotate;
    controls.autoRotateSpeed = config.autoRotateSpeed;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

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

    let frame = 0;
    const render = () => {
      controls.update();
      world.setPointOfView(camera);
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      abortController.abort();
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.dispose();
      world._destructor();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [data, globeConfig]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[500px] w-full", className)}
      role="img"
      aria-label="An interactive globe showing global trade routes"
    />
  );
}
