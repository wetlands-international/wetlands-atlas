"use client";

import { PropsWithChildren } from "react";

import { MapProvider } from "react-map-gl/mapbox";

export const ClientProviders = ({ children }: PropsWithChildren) => {
  return <MapProvider>{children}</MapProvider>;
};
