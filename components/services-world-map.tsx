"use client";

import { useEffect, useState } from "react";

type Position = [number, number];
type PolygonCoordinates = Position[][];
type MultiPolygonCoordinates = Position[][][];

type MapFeature = {
  properties: { admin: string; name: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: PolygonCoordinates | MultiPolygonCoordinates;
  };
};

type MapData = { features: MapFeature[] };

const highlightedCountries = [
  { name: "China", flagCode: "cn" },
  { name: "India", flagCode: "in" },
  { name: "Vietnam", flagCode: "vn" },
  { name: "Taiwan", flagCode: "tw" },
  { name: "South Korea", flagCode: "kr" },
  { name: "Mexico", flagCode: "mx" },
  { name: "Netherlands", flagCode: "nl" },
  { name: "United Arab Emirates", flagCode: "ae" },
  { name: "South Africa", flagCode: "za" },
  { name: "Turkey", flagCode: "tr" },
  { name: "Bangladesh", flagCode: "bd" },
  { name: "Malaysia", flagCode: "my" },
  { name: "Indonesia", flagCode: "id" },
  { name: "Spain", flagCode: "es" },
  { name: "Thailand", flagCode: "th" },
  { name: "Poland", flagCode: "pl" },
  { name: "Brazil", flagCode: "br" },
  { name: "Philippines", flagCode: "ph" },
];

const width = 900;
const height = 450;

function project([longitude, latitude]: Position) {
  return [((longitude + 180) / 360) * width, ((90 - latitude) / 180) * height];
}

function ringPath(ring: Position[]) {
  return ring
    .map((position, index) => {
      const [x, y] = project(position);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

function featurePath(feature: MapFeature) {
  if (feature.geometry.type === "Polygon") {
    return (feature.geometry.coordinates as PolygonCoordinates).map(ringPath).join(" ");
  }

  return (feature.geometry.coordinates as MultiPolygonCoordinates)
    .flatMap((polygon) => polygon.map(ringPath))
    .join(" ");
}

type ServicesWorldMapProps = {
  highlightedCountryCodes?: readonly string[];
  expandOnDesktop?: boolean;
};

export function ServicesWorldMap({
  highlightedCountryCodes,
  expandOnDesktop = true,
}: ServicesWorldMapProps = {}) {
  const [features, setFeatures] = useState<MapFeature[]>([]);
  const activeCountries = highlightedCountryCodes
    ? highlightedCountries.filter((country) => highlightedCountryCodes.includes(country.flagCode))
    : highlightedCountries;

  useEffect(() => {
    let active = true;
    fetch("/globe.json")
      .then((response) => response.json() as Promise<MapData>)
      .then((data) => {
        if (active) setFeatures(data.features);
      })
      .catch(() => {
        if (active) setFeatures([]);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={`relative w-full ${expandOnDesktop ? "lg:-ml-8 lg:w-[calc(100%+2rem)]" : ""}`}>
      <link rel="preload" href="/globe.json" as="fetch" crossOrigin="anonymous" />
      <svg viewBox={`0 25 ${width} 380`} role="img" aria-label={highlightedCountryCodes ? `World map highlighting ${activeCountries.map((country) => country.name).join(", ")}` : "World map highlighting the 18 sourcing countries with their national flags"} className="h-auto w-full overflow-visible">
        <defs>
          <filter id="active-country-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.22" />
          </filter>
          {activeCountries.map((country) => (
            <pattern key={country.flagCode} id={`flag-${country.flagCode}`} width="1" height="1" patternContentUnits="objectBoundingBox">
              <rect width="1" height="1" fill="#2563eb" />
              <image
                href={`https://flagcdn.com/w320/${country.flagCode}.png`}
                width="1"
                height="1"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          ))}
        </defs>
        <g>
          {features.map((feature, index) => {
            const highlightedCountry = activeCountries.find(
              (country) => country.name === feature.properties.admin,
            );
            const isHighlighted = Boolean(highlightedCountry);
            return (
              <path
                key={`${feature.properties.admin}-${index}`}
                d={featurePath(feature)}
                fill={highlightedCountry ? `url(#flag-${highlightedCountry.flagCode})` : "#cbd5e1"}
                fillOpacity={isHighlighted ? 1 : 0.7}
                stroke={isHighlighted ? "#ffffff" : "#f1f5f9"}
                strokeWidth={isHighlighted ? 1.25 : 0.65}
                filter={isHighlighted ? "url(#active-country-glow)" : undefined}
                className="transition-opacity hover:opacity-80"
              >
                <title>{feature.properties.admin}{isHighlighted ? " — sourcing available" : ""}</title>
              </path>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
