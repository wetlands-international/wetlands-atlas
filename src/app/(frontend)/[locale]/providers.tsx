"use client";

import { MapProvider } from "react-map-gl/mapbox";

import { PropsWithChildren } from "react";

export const ClientProviders = ({ children }: PropsWithChildren) => {
  return <MapProvider>{children}</MapProvider>;
};
