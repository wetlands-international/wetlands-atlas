import { Sort, Where } from "payload";

import { Locale } from "next-intl";

export interface paths {
  "/api/media": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Media */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
          sort?:
            | "alt"
            | "-alt"
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt"
            | "url"
            | "-url"
            | "thumbnailURL"
            | "-thumbnailURL"
            | "filename"
            | "-filename"
            | "mimeType"
            | "-mimeType"
            | "filesize"
            | "-filesize"
            | "width"
            | "-width"
            | "height"
            | "-height"
            | "focalX"
            | "-focalX"
            | "focalY"
            | "-focalY";
          where?: Where;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["MediaListResponse"];
      };
    };
    put?: never;
    /** Create a new Media */
    post: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/categories": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Categories */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
          sort?: Sort;
          where?: Where;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CategoryListResponse"];
      };
    };
    put?: never;
    /** Create a new Category */
    post: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/categories/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: Locale;
        "fallback-locale"?: Locale;
      };
      header?: never;
      path: {
        /** @description ID of the Category */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Category by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Category */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CategoryResponse"];
        404: components["responses"]["CategoryNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Category */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Category */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CategoryResponse"];
        404: components["responses"]["CategoryNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Category */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Category */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["CategoryResponse"];
        404: components["responses"]["CategoryNotFoundResponse"];
      };
    };
    trace?: never;
  };
  "/api/indicators": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Indicators */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
          sort?: Sort;
          where?: Where;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorListResponse"];
      };
    };
    put?: never;
    /** Create a new Indicator */
    post: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/indicators/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: Locale;
        "fallback-locale"?: Locale;
      };
      header?: never;
      path: {
        /** @description ID of the Indicator */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Indicator by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Indicator */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorResponse"];
        404: components["responses"]["IndicatorNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Indicator */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Indicator */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorResponse"];
        404: components["responses"]["IndicatorNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Indicator */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Indicator */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorResponse"];
        404: components["responses"]["IndicatorNotFoundResponse"];
      };
    };
    trace?: never;
  };
  "/api/layers": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Layers */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
          sort?: Sort;
          where?: Where;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LayerListResponse"];
      };
    };
    put?: never;
    /** Create a new Layer */
    post: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/layers/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: Locale;
        "fallback-locale"?: Locale;
      };
      header?: never;
      path: {
        /** @description ID of the Layer */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Layer by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Layer */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LayerResponse"];
        404: components["responses"]["LayerNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Layer */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Layer */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LayerResponse"];
        404: components["responses"]["LayerNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Layer */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Layer */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LayerResponse"];
        404: components["responses"]["LayerNotFoundResponse"];
      };
    };
    trace?: never;
  };
  "/api/indicator-data": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Indicator Data */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
          sort?: "id" | "-id" | "updatedAt" | "-updatedAt" | "createdAt" | "-createdAt";
          where?: Where;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorDatumListResponse"];
      };
    };
    put?: never;
    /** Create a new Indicator Datum */
    post: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/indicator-data/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: Locale;
        "fallback-locale"?: Locale;
      };
      header?: never;
      path: {
        /** @description ID of the Indicator Datum */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Indicator Datum by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Indicator Datum */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorDatumResponse"];
        404: components["responses"]["IndicatorDatumNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Indicator Datum */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Indicator Datum */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorDatumResponse"];
        404: components["responses"]["IndicatorDatumNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Indicator Datum */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Indicator Datum */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["IndicatorDatumResponse"];
        404: components["responses"]["IndicatorDatumNotFoundResponse"];
      };
    };
    trace?: never;
  };
  "/api/locations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Locations */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
          sort?:
            | "id"
            | "-id"
            | "name"
            | "-name"
            | "code"
            | "-code"
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt";
          where?: Where;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LocationListResponse"];
      };
    };
    put?: never;
    /** Create a new Location */
    post: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/locations/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: Locale;
        "fallback-locale"?: Locale;
      };
      header?: never;
      path: {
        /** @description ID of the Location */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Location by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Location */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LocationResponse"];
        404: components["responses"]["LocationNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Location */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Location */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LocationResponse"];
        404: components["responses"]["LocationNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Location */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Location */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["LocationResponse"];
        404: components["responses"]["LocationNotFoundResponse"];
      };
    };
    trace?: never;
  };
  "/api/landscapes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of landscapes */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
          sort?: Sort;
          where?: Where;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["StoryListResponse"];
      };
    };
    put?: never;
    /** Create a new Story */
    post: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/landscapes/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: Locale;
        "fallback-locale"?: Locale;
      };
      header?: never;
      path: {
        /** @description ID of the Story */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Story by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Story */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["StoryResponse"];
        404: components["responses"]["StoryNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Story */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Story */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["StoryResponse"];
        404: components["responses"]["StoryNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Story */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: Locale;
          "fallback-locale"?: Locale;
        };
        header?: never;
        path: {
          /** @description ID of the Story */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["StoryResponse"];
        404: components["responses"]["StoryNotFoundResponse"];
      };
    };
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** @example Europe/Prague */
    supportedTimezones: string;
    /** User */
    User: {
      id: string;
      updatedAt: string;
      createdAt: string;
      email: string;
      resetPasswordToken?: string | null;
      resetPasswordExpiration?: string | null;
      salt?: string | null;
      hash?: string | null;
      loginAttempts?: number | null;
      lockUntil?: string | null;
      password?: string | null;
    };
    /** Media */
    Media: {
      id: number;
      alt: string;
      updatedAt: string;
      createdAt: string;
      url?: string | null;
      thumbnailURL?: string | null;
      filename?: string | null;
      mimeType?: string | null;
      filesize?: number | null;
      width?: number | null;
      height?: number | null;
      focalX?: number | null;
      focalY?: number | null;
    };
    /** Category */
    Category: {
      /** @description This field is automatically generated from the 'name' field. It is usually used to create a URL-friendly version of the name. */
      id: string;
      name: string;
      description?: string | null;
      cover?: (number | null) | components["schemas"]["Media"];
      indicators?: {
        docs?: (string | components["schemas"]["Indicator"])[];
        hasNextPage?: boolean;
        totalDocs?: number;
      };
      landscapes?: {
        docs?: (string | components["schemas"]["Story"])[];
        hasNextPage?: boolean;
        totalDocs?: number;
      };
      /** @description Define the default indicators for this category. These will be activated by default when a user selects this category. */
      defaultIndicators?: (string | components["schemas"]["Indicator"])[] | null;
      updatedAt: string;
      createdAt: string;
    };
    /** Indicator */
    Indicator: {
      /** @description This field is automatically generated from the 'name' field. It is usually used to create a URL-friendly version of the name. */
      id: string;
      name: string;
      /** @description Formatted data values can be injected using a special syntax. If the widget type is Percentage bar, then you can use "{value}". If it is Range bar, then you can use "{min}", "{max}" and "{average}". If it is Pie, you can use "{value[0]}", "{value[1]}", and so on. */
      description?: {
        root: {
          type: string;
          children: ({
            type: string;
            version: number;
          } & {
            [key: string]: unknown;
          })[];
          direction: ("ltr" | "rtl") | null;
          /** @enum {string} */
          format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
          indent: number;
          version: number;
        };
      } | null;
      category: string | components["schemas"]["Category"];
      layers?: {
        docs?: (string | components["schemas"]["Layer"])[];
        hasNextPage?: boolean;
        totalDocs?: number;
      };
      updatedAt: string;
      createdAt: string;
    };
    /** Layer */
    Layer: {
      /** @description This field is automatically generated from the 'name' field. It is usually used to create a URL-friendly version of the name. */
      id: string;
      name: string;
      config: Record<string, never>;
      params_config: {
        key: string;
        default: string | number | boolean;
      }[];
      legend_config: {
        /** @enum {string} */
        type: "basic" | "choropleth" | "gradient";
        items: {
          color: string;
          label: string;
          value?: string | number;
        }[];
      };
      indicator?: (string | null) | components["schemas"]["Indicator"];
      /** @enum {string} */
      type: "INDICATOR" | "CONTEXTUAL";
      updatedAt: string;
      createdAt: string;
    };
    /** Indicator Datum */
    IndicatorDatum: {
      id: string;
      indicator: string | components["schemas"]["Indicator"];
      location: string | components["schemas"]["Location"];
      data: Record<string, never> | unknown[] | string | number | boolean | null;
      labels: Record<string, string>;
      updatedAt: string;
      createdAt: string;
    };
    /** Location */
    Location: {
      /** @description This field is automatically generated from 'type' and 'code' fields. It is usually used to create a URL-friendly version of the name. */
      id: string;
      name: string;
      /** @description A unique identifying code for the location. Could be an ISO code or any other unique identifier, depending on the type of location. */
      code: string;
      geometry: Record<string, never> | unknown[] | string | number | boolean | null;
      bbox: [number, number, number, number];
      /** @enum {string} */
      type: "ADMIN_REGION" | "HYDRO_BASIN";
      updatedAt: string;
      createdAt: string;
    };
    /** Story */
    Story: {
      /** @description This field is automatically generated from the 'name' field. It is usually used to create a URL-friendly version of the name. */
      id: string;
      name: string;
      description: string;
      cover?: (number | null) | components["schemas"]["Media"];
      category: string | components["schemas"]["Category"];
      location: [number, number];
      /** @description Uncheck to hide this story from the public view. */
      published?: boolean | null;
      steps?:
        | {
            /** @enum {string} */
            type: "map" | "chart";
            sidebar: {
              root: {
                type: string;
                children: ({
                  type: string;
                  version: number;
                } & {
                  [key: string]: unknown;
                })[];
                direction: ("ltr" | "rtl") | null;
                /** @enum {string} */
                format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
                indent: number;
                version: number;
              };
            };
            map?: {
              bbox: unknown[];
              layers?: string[];
            };
            chart?: Record<string, never> | unknown[] | string | number | boolean | null;
            id?: string | null;
          }[]
        | null;
      updatedAt: string;
      createdAt: string;
    };
  };
  responses: {
    /** @description User object */
    UserResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["User"];
      };
    };
    /** @description User object */
    NewUserResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["User"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description User not found */
    UserNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Users */
    UserListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["User"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
    /** @description Media object */
    MediaResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Media"];
      };
    };
    /** @description Media object */
    NewMediaResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["Media"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Media not found */
    MediaNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Media */
    MediaListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["Media"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
    /** @description Category object */
    CategoryResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Category"];
      };
    };
    /** @description Category object */
    NewCategoryResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["Category"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Category not found */
    CategoryNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Categories */
    CategoryListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["Category"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
    /** @description Indicator object */
    IndicatorResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Indicator"];
      };
    };
    /** @description Indicator object */
    NewIndicatorResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["Indicator"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Indicator not found */
    IndicatorNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Indicators */
    IndicatorListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["Indicator"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
    /** @description Layer object */
    LayerResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Layer"];
      };
    };
    /** @description Layer object */
    NewLayerResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["Layer"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Layer not found */
    LayerNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Layers */
    LayerListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["Layer"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
    /** @description Indicator Datum object */
    IndicatorDatumResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["IndicatorDatum"];
      };
    };
    /** @description Indicator Datum object */
    NewIndicatorDatumResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["IndicatorDatum"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Indicator Datum not found */
    IndicatorDatumNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Indicator Data */
    IndicatorDatumListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["IndicatorDatum"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
    /** @description Location object */
    LocationResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Location"];
      };
    };
    /** @description Location object */
    NewLocationResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["Location"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Location not found */
    LocationNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Locations */
    LocationListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["Location"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
    /** @description Story object */
    StoryResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["Story"];
      };
    };
    /** @description Story object */
    NewStoryResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["Story"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Story not found */
    StoryNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of landscapes */
    StoryListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["Story"][];
          totalDocs: number;
          limit: number;
          totalPages: number;
          page: number;
          pagingCounter: number;
          hasPrevPage: boolean;
          hasNextPage: boolean;
          prevPage: number | null;
          nextPage: number | null;
        };
      };
    };
  };
  parameters: never;
  requestBodies: {
    /** @description User */
    UserRequestBody: {
      content: {
        "application/json": {
          email: string;
          resetPasswordToken?: string | null;
          resetPasswordExpiration?: string | null;
          salt?: string | null;
          hash?: string | null;
          loginAttempts?: number | null;
          lockUntil?: string | null;
          password?: string | null;
        };
      };
    };
    /** @description Media */
    MediaRequestBody: {
      content: {
        "application/json": {
          alt: string;
          url?: string | null;
          thumbnailURL?: string | null;
          filename?: string | null;
          mimeType?: string | null;
          filesize?: number | null;
          width?: number | null;
          height?: number | null;
          focalX?: number | null;
          focalY?: number | null;
        };
      };
    };
    /** @description Category */
    CategoryRequestBody: {
      content: {
        "application/json": {
          name: string;
          description?: string | null;
          cover?: (number | null) | components["schemas"]["Media"];
          indicators?: {
            docs?: (string | components["schemas"]["Indicator"])[];
            hasNextPage?: boolean;
            totalDocs?: number;
          };
          landscapes?: {
            docs?: (string | components["schemas"]["Story"])[];
            hasNextPage?: boolean;
            totalDocs?: number;
          };
          /** @description ID of the indicators */
          defaultIndicators?: string;
        };
      };
    };
    /** @description Indicator */
    IndicatorRequestBody: {
      content: {
        "application/json": {
          name: string;
          /** @description Formatted data values can be injected using a special syntax. If the widget type is Percentage bar, then you can use "{value}". If it is Range bar, then you can use "{min}", "{max}" and "{average}". If it is Pie, you can use "{value[0]}", "{value[1]}", and so on. */
          description?: {
            root: {
              type: string;
              children: ({
                type: string;
                version: number;
              } & {
                [key: string]: unknown;
              })[];
              direction: ("ltr" | "rtl") | null;
              /** @enum {string} */
              format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
              indent: number;
              version: number;
            };
          } | null;
          /** @description ID of the categories */
          category: string;
          layers?: {
            docs?: (string | components["schemas"]["Layer"])[];
            hasNextPage?: boolean;
            totalDocs?: number;
          };
        };
      };
    };
    /** @description Layer */
    LayerRequestBody: {
      content: {
        "application/json": {
          name: string;
          config: Record<string, never>;
          params_config: {
            key: string;
            default: string | number | boolean;
          }[];
          legend_config: {
            /** @enum {string} */
            type: "basic" | "choropleth" | "gradient";
            items: {
              color: string;
              value?: string | number;
            }[];
          };
          /** @description ID of the indicators */
          indicator?: string;
          /** @enum {string} */
          type: "INDICATOR" | "CONTEXTUAL";
        };
      };
    };
    /** @description Indicator Datum */
    IndicatorDatumRequestBody: {
      content: {
        "application/json": {
          /** @description ID of the indicators */
          indicator: string;
          /** @description ID of the locations */
          location: string;
          data: Record<string, never> | unknown[] | string | number | boolean | null;
        };
      };
    };
    /** @description Location */
    LocationRequestBody: {
      content: {
        "application/json": {
          name: string;
          /** @description A unique identifying code for the location. Could be an ISO code or any other unique identifier, depending on the type of location. */
          code: string;
          geometry: Record<string, never> | unknown[] | string | number | boolean | null;
          bbox: {
            /** @description An array of four numbers representing two sets of coordinates (SW and NE). */
            bbox: number[];
          };
          /** @enum {string} */
          type: "ADMIN_REGION" | "HYDRO_BASIN";
        };
      };
    };
    /** @description Story */
    StoryRequestBody: {
      content: {
        "application/json": {
          name: string;
          description: string;
          cover?: (number | null) | components["schemas"]["Media"];
          /** @description ID of the categories */
          category: string;
          location: [number, number];
          /** @description Uncheck to hide this story from the public view. */
          published?: boolean | null;
          steps?:
            | {
                /** @enum {string} */
                type: "map" | "chart";
                sidebar: {
                  root: {
                    type: string;
                    children: ({
                      type: string;
                      version: number;
                    } & {
                      [key: string]: unknown;
                    })[];
                    direction: ("ltr" | "rtl") | null;
                    /** @enum {string} */
                    format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
                    indent: number;
                    version: number;
                  };
                };
                map?: {
                  bbox: unknown[];
                  layers?: string[];
                };
                chart?: Record<string, never> | unknown[] | string | number | boolean | null;
                id?: string | null;
              }[]
            | null;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
