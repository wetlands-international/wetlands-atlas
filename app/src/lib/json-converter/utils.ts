import qs from "query-string";

import { env } from "@/env";

/**
 * *`setQueryParams`*
 * Set opacity
 * @param {String} url
 * @param {Object} queryParams
 * @returns {String} url
 */
type SetQueryParamsProps = {
  url: string;
  query: Record<string, unknown>;
  options: qs.StringifyOptions;
};
export const setQueryParams = ({ query = {}, options }: SetQueryParamsProps) => {
  const url = env.NEXT_PUBLIC_TILER_URL;

  const Q = Object.keys(query).reduce((acc, key) => {
    // Check if the value is an object and JSON stringify it
    if (typeof query[key] === "object") {
      return {
        ...acc,
        [key]: JSON.stringify(query[key]),
      };
    }

    return {
      ...acc,
      [key]: query[key],
    };
  }, {});

  const u = qs.stringify(Q, {
    arrayFormat: "bracket-separator",
    arrayFormatSeparator: ",",
    skipNull: true,
    skipEmptyString: true,
    ...options,
  });

  if (url.includes("?")) {
    return `${url}&${u}`;
  }

  return `${url}?${u}`;
};

/**
 * *`setOpacity`*
 * Set opacity
 * @param {Number} o
 * @param {Number} base
 * @returns {Number} opacity
 */
type SetOpacityProps = { o: number; base: number };
export const setOpacity = ({ o = 1, base = 1 }: SetOpacityProps) => {
  return o * base;
};

/**
 * *`setVisibility`*
 * Set visibility
 * @param {Boolean} v
 * @param {String} type
 * @returns {String | Boolean} visibility
 */
type SetVisibilityProps = { v: boolean; type: "mapbox" | "deck" };
export const setVisibility = ({ v = true, type = "mapbox" }: SetVisibilityProps) => {
  if (type === "mapbox") {
    return v ? "visible" : "none";
  }

  return v;
};

const SETTERS = {
  setQueryParams,
  setOpacity,
  setVisibility,
} as const;

export default SETTERS;
