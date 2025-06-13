export interface paths {
  "/api/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Users */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
          sort?:
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt"
            | "email"
            | "-email"
            | "resetPasswordToken"
            | "-resetPasswordToken"
            | "resetPasswordExpiration"
            | "-resetPasswordExpiration"
            | "salt"
            | "-salt"
            | "hash"
            | "-hash"
            | "loginAttempts"
            | "-loginAttempts"
            | "lockUntil"
            | "-lockUntil";
          where?: Record<string, never> &
            (
              | components["schemas"]["UserQueryOperations"]
              | components["schemas"]["UserQueryOperationsAnd"]
              | components["schemas"]["UserQueryOperationsOr"]
            );
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["UserListResponse"];
      };
    };
    put?: never;
    /** Create a new User */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["UserRequestBody"];
      responses: {
        201: components["responses"]["NewUserResponse"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/users/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: string;
        "fallback-locale"?: string;
      };
      header?: never;
      path: {
        /** @description ID of the User */
        id: string;
      };
      cookie?: never;
    };
    /** Find a User by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the User */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["UserResponse"];
        404: components["responses"]["UserNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a User */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the User */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["UserResponse"];
        404: components["responses"]["UserNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a User */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the User */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["UserResponse"];
        404: components["responses"]["UserNotFoundResponse"];
      };
    };
    trace?: never;
  };
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
          locale?: string;
          "fallback-locale"?: string;
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
          where?: Record<string, never> &
            (
              | components["schemas"]["MediaQueryOperations"]
              | components["schemas"]["MediaQueryOperationsAnd"]
              | components["schemas"]["MediaQueryOperationsOr"]
            );
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
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["MediaRequestBody"];
      responses: {
        201: components["responses"]["NewMediaResponse"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/media/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: string;
        "fallback-locale"?: string;
      };
      header?: never;
      path: {
        /** @description ID of the Media */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Media by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Media */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["MediaResponse"];
        404: components["responses"]["MediaNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Media */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Media */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["MediaResponse"];
        404: components["responses"]["MediaNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Media */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Media */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["MediaResponse"];
        404: components["responses"]["MediaNotFoundResponse"];
      };
    };
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
          locale?: string;
          "fallback-locale"?: string;
          sort?:
            | "id"
            | "-id"
            | "name"
            | "-name"
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt";
          where?: Record<string, never> &
            (
              | components["schemas"]["CategoryQueryOperations"]
              | components["schemas"]["CategoryQueryOperationsAnd"]
              | components["schemas"]["CategoryQueryOperationsOr"]
            );
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
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["CategoryRequestBody"];
      responses: {
        201: components["responses"]["NewCategoryResponse"];
      };
    };
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
        locale?: string;
        "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
          sort?:
            | "id"
            | "-id"
            | "name"
            | "-name"
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt";
          where?: Record<string, never> &
            (
              | components["schemas"]["IndicatorQueryOperations"]
              | components["schemas"]["IndicatorQueryOperationsAnd"]
              | components["schemas"]["IndicatorQueryOperationsOr"]
            );
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
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["IndicatorRequestBody"];
      responses: {
        201: components["responses"]["NewIndicatorResponse"];
      };
    };
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
        locale?: string;
        "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
          sort?:
            | "id"
            | "-id"
            | "name"
            | "-name"
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt";
          where?: Record<string, never> &
            (
              | components["schemas"]["LayerQueryOperations"]
              | components["schemas"]["LayerQueryOperationsAnd"]
              | components["schemas"]["LayerQueryOperationsOr"]
            );
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
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["LayerRequestBody"];
      responses: {
        201: components["responses"]["NewLayerResponse"];
      };
    };
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
        locale?: string;
        "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
          locale?: string;
          "fallback-locale"?: string;
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
  "/api/payload-locked-documents": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Payload Locked Documents */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
          sort?:
            | "globalSlug"
            | "-globalSlug"
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt";
          where?: Record<string, never> &
            (
              | components["schemas"]["PayloadLockedDocumentQueryOperations"]
              | components["schemas"]["PayloadLockedDocumentQueryOperationsAnd"]
              | components["schemas"]["PayloadLockedDocumentQueryOperationsOr"]
            );
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadLockedDocumentListResponse"];
      };
    };
    put?: never;
    /** Create a new Payload Locked Document */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["PayloadLockedDocumentRequestBody"];
      responses: {
        201: components["responses"]["NewPayloadLockedDocumentResponse"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/payload-locked-documents/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: string;
        "fallback-locale"?: string;
      };
      header?: never;
      path: {
        /** @description ID of the Payload Locked Document */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Payload Locked Document by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Locked Document */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadLockedDocumentResponse"];
        404: components["responses"]["PayloadLockedDocumentNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Payload Locked Document */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Locked Document */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadLockedDocumentResponse"];
        404: components["responses"]["PayloadLockedDocumentNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Payload Locked Document */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Locked Document */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadLockedDocumentResponse"];
        404: components["responses"]["PayloadLockedDocumentNotFoundResponse"];
      };
    };
    trace?: never;
  };
  "/api/payload-preferences": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Payload Preferences */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
          sort?: "key" | "-key" | "updatedAt" | "-updatedAt" | "createdAt" | "-createdAt";
          where?: Record<string, never> &
            (
              | components["schemas"]["PayloadPreferenceQueryOperations"]
              | components["schemas"]["PayloadPreferenceQueryOperationsAnd"]
              | components["schemas"]["PayloadPreferenceQueryOperationsOr"]
            );
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadPreferenceListResponse"];
      };
    };
    put?: never;
    /** Create a new Payload Preference */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["PayloadPreferenceRequestBody"];
      responses: {
        201: components["responses"]["NewPayloadPreferenceResponse"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/payload-preferences/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: string;
        "fallback-locale"?: string;
      };
      header?: never;
      path: {
        /** @description ID of the Payload Preference */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Payload Preference by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Preference */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadPreferenceResponse"];
        404: components["responses"]["PayloadPreferenceNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Payload Preference */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Preference */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadPreferenceResponse"];
        404: components["responses"]["PayloadPreferenceNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Payload Preference */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Preference */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadPreferenceResponse"];
        404: components["responses"]["PayloadPreferenceNotFoundResponse"];
      };
    };
    trace?: never;
  };
  "/api/payload-migrations": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Retrieve a list of Payload Migrations */
    get: {
      parameters: {
        query?: {
          page?: number;
          limit?: number;
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
          sort?:
            | "name"
            | "-name"
            | "batch"
            | "-batch"
            | "updatedAt"
            | "-updatedAt"
            | "createdAt"
            | "-createdAt";
          where?: Record<string, never> &
            (
              | components["schemas"]["PayloadMigrationQueryOperations"]
              | components["schemas"]["PayloadMigrationQueryOperationsAnd"]
              | components["schemas"]["PayloadMigrationQueryOperationsOr"]
            );
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadMigrationListResponse"];
      };
    };
    put?: never;
    /** Create a new Payload Migration */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: components["requestBodies"]["PayloadMigrationRequestBody"];
      responses: {
        201: components["responses"]["NewPayloadMigrationResponse"];
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/payload-migrations/{id}": {
    parameters: {
      query?: {
        depth?: number;
        locale?: string;
        "fallback-locale"?: string;
      };
      header?: never;
      path: {
        /** @description ID of the Payload Migration */
        id: string;
      };
      cookie?: never;
    };
    /** Find a Payload Migration by ID */
    get: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Migration */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadMigrationResponse"];
        404: components["responses"]["PayloadMigrationNotFoundResponse"];
      };
    };
    put?: never;
    post?: never;
    /** Delete a Payload Migration */
    delete: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Migration */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadMigrationResponse"];
        404: components["responses"]["PayloadMigrationNotFoundResponse"];
      };
    };
    options?: never;
    head?: never;
    /** Update a Payload Migration */
    patch: {
      parameters: {
        query?: {
          depth?: number;
          locale?: string;
          "fallback-locale"?: string;
        };
        header?: never;
        path: {
          /** @description ID of the Payload Migration */
          id: string;
        };
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: components["responses"]["PayloadMigrationResponse"];
        404: components["responses"]["PayloadMigrationNotFoundResponse"];
      };
    };
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
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
      id: string;
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
      /** @description This field is automatically generated from the name field. It is used to create a URL-friendly version of the name. */
      id: string;
      name: string;
      description?: string | null;
      updatedAt: string;
      createdAt: string;
    };
    /** Indicator */
    Indicator: {
      /** @description This field is automatically generated from the name field. It is used to create a URL-friendly version of the name. */
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
          direction: "ltr" | "rtl" | null;
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
      /** @description This field is automatically generated from the name field. It is used to create a URL-friendly version of the name. */
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
          value?: string | number;
        }[];
      };
      indicator?: (string | null) | components["schemas"]["Indicator"];
      updatedAt: string;
      createdAt: string;
    };
    /** Payload Locked Document */
    PayloadLockedDocument: {
      id: string;
      document?:
        | ({
            /** @enum {unknown} */
            relationTo: "users";
            value: string | components["schemas"]["User"];
          } | null)
        | ({
            /** @enum {unknown} */
            relationTo: "media";
            value: string | components["schemas"]["Media"];
          } | null)
        | ({
            /** @enum {unknown} */
            relationTo: "categories";
            value: string | components["schemas"]["Category"];
          } | null)
        | ({
            /** @enum {unknown} */
            relationTo: "indicators";
            value: string | components["schemas"]["Indicator"];
          } | null)
        | ({
            /** @enum {unknown} */
            relationTo: "layers";
            value: string | components["schemas"]["Layer"];
          } | null);
      globalSlug?: string | null;
      user: {
        /** @enum {unknown} */
        relationTo: "users";
        value: string | components["schemas"]["User"];
      };
      updatedAt: string;
      createdAt: string;
    };
    /** Payload Preference */
    PayloadPreference: {
      id: string;
      user: {
        /** @enum {unknown} */
        relationTo: "users";
        value: string | components["schemas"]["User"];
      };
      key?: string | null;
      value?: (Record<string, never> | unknown[] | string | number | boolean) | null;
      updatedAt: string;
      createdAt: string;
    };
    /** Payload Migration */
    PayloadMigration: {
      id: string;
      name?: string | null;
      batch?: number | null;
      updatedAt: string;
      createdAt: string;
    };
    /** User query operations */
    UserQueryOperations: {
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      email?: {
        /** Format: email */
        equals?: string;
        /** Format: email */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: email */
        contains?: string;
      };
      resetPasswordToken?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      resetPasswordExpiration?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      salt?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      hash?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      loginAttempts?: {
        equals?: number;
        not_equals?: number;
        in?: string;
        not_in?: string;
        greater_than?: number;
        greater_than_equal?: number;
        less_than?: number;
        less_than_equal?: number;
      };
      lockUntil?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
    };
    /** User query conjunction */
    UserQueryOperationsAnd: {
      and: (
        | components["schemas"]["UserQueryOperations"]
        | components["schemas"]["UserQueryOperationsAnd"]
        | components["schemas"]["UserQueryOperationsOr"]
      )[];
    };
    /** User query disjunction */
    UserQueryOperationsOr: {
      or: (
        | components["schemas"]["UserQueryOperations"]
        | components["schemas"]["UserQueryOperationsAnd"]
        | components["schemas"]["UserQueryOperationsOr"]
      )[];
    };
    /** Media query operations */
    MediaQueryOperations: {
      alt?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      url?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      thumbnailURL?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      filename?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      mimeType?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      filesize?: {
        equals?: number;
        not_equals?: number;
        in?: string;
        not_in?: string;
        greater_than?: number;
        greater_than_equal?: number;
        less_than?: number;
        less_than_equal?: number;
      };
      width?: {
        equals?: number;
        not_equals?: number;
        in?: string;
        not_in?: string;
        greater_than?: number;
        greater_than_equal?: number;
        less_than?: number;
        less_than_equal?: number;
      };
      height?: {
        equals?: number;
        not_equals?: number;
        in?: string;
        not_in?: string;
        greater_than?: number;
        greater_than_equal?: number;
        less_than?: number;
        less_than_equal?: number;
      };
      focalX?: {
        equals?: number;
        not_equals?: number;
        in?: string;
        not_in?: string;
        greater_than?: number;
        greater_than_equal?: number;
        less_than?: number;
        less_than_equal?: number;
      };
      focalY?: {
        equals?: number;
        not_equals?: number;
        in?: string;
        not_in?: string;
        greater_than?: number;
        greater_than_equal?: number;
        less_than?: number;
        less_than_equal?: number;
      };
    };
    /** Media query conjunction */
    MediaQueryOperationsAnd: {
      and: (
        | components["schemas"]["MediaQueryOperations"]
        | components["schemas"]["MediaQueryOperationsAnd"]
        | components["schemas"]["MediaQueryOperationsOr"]
      )[];
    };
    /** Media query disjunction */
    MediaQueryOperationsOr: {
      or: (
        | components["schemas"]["MediaQueryOperations"]
        | components["schemas"]["MediaQueryOperationsAnd"]
        | components["schemas"]["MediaQueryOperationsOr"]
      )[];
    };
    /** Category query operations */
    CategoryQueryOperations: {
      id?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      name?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
    };
    /** Category query conjunction */
    CategoryQueryOperationsAnd: {
      and: (
        | components["schemas"]["CategoryQueryOperations"]
        | components["schemas"]["CategoryQueryOperationsAnd"]
        | components["schemas"]["CategoryQueryOperationsOr"]
      )[];
    };
    /** Category query disjunction */
    CategoryQueryOperationsOr: {
      or: (
        | components["schemas"]["CategoryQueryOperations"]
        | components["schemas"]["CategoryQueryOperationsAnd"]
        | components["schemas"]["CategoryQueryOperationsOr"]
      )[];
    };
    /** Indicator query operations */
    IndicatorQueryOperations: {
      id?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      name?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
    };
    /** Indicator query conjunction */
    IndicatorQueryOperationsAnd: {
      and: (
        | components["schemas"]["IndicatorQueryOperations"]
        | components["schemas"]["IndicatorQueryOperationsAnd"]
        | components["schemas"]["IndicatorQueryOperationsOr"]
      )[];
    };
    /** Indicator query disjunction */
    IndicatorQueryOperationsOr: {
      or: (
        | components["schemas"]["IndicatorQueryOperations"]
        | components["schemas"]["IndicatorQueryOperationsAnd"]
        | components["schemas"]["IndicatorQueryOperationsOr"]
      )[];
    };
    /** Layer query operations */
    LayerQueryOperations: {
      id?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      name?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
    };
    /** Layer query conjunction */
    LayerQueryOperationsAnd: {
      and: (
        | components["schemas"]["LayerQueryOperations"]
        | components["schemas"]["LayerQueryOperationsAnd"]
        | components["schemas"]["LayerQueryOperationsOr"]
      )[];
    };
    /** Layer query disjunction */
    LayerQueryOperationsOr: {
      or: (
        | components["schemas"]["LayerQueryOperations"]
        | components["schemas"]["LayerQueryOperationsAnd"]
        | components["schemas"]["LayerQueryOperationsOr"]
      )[];
    };
    /** Payload Locked Document query operations */
    PayloadLockedDocumentQueryOperations: {
      globalSlug?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
    };
    /** Payload Locked Document query conjunction */
    PayloadLockedDocumentQueryOperationsAnd: {
      and: (
        | components["schemas"]["PayloadLockedDocumentQueryOperations"]
        | components["schemas"]["PayloadLockedDocumentQueryOperationsAnd"]
        | components["schemas"]["PayloadLockedDocumentQueryOperationsOr"]
      )[];
    };
    /** Payload Locked Document query disjunction */
    PayloadLockedDocumentQueryOperationsOr: {
      or: (
        | components["schemas"]["PayloadLockedDocumentQueryOperations"]
        | components["schemas"]["PayloadLockedDocumentQueryOperationsAnd"]
        | components["schemas"]["PayloadLockedDocumentQueryOperationsOr"]
      )[];
    };
    /** Payload Preference query operations */
    PayloadPreferenceQueryOperations: {
      key?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
    };
    /** Payload Preference query conjunction */
    PayloadPreferenceQueryOperationsAnd: {
      and: (
        | components["schemas"]["PayloadPreferenceQueryOperations"]
        | components["schemas"]["PayloadPreferenceQueryOperationsAnd"]
        | components["schemas"]["PayloadPreferenceQueryOperationsOr"]
      )[];
    };
    /** Payload Preference query disjunction */
    PayloadPreferenceQueryOperationsOr: {
      or: (
        | components["schemas"]["PayloadPreferenceQueryOperations"]
        | components["schemas"]["PayloadPreferenceQueryOperationsAnd"]
        | components["schemas"]["PayloadPreferenceQueryOperationsOr"]
      )[];
    };
    /** Payload Migration query operations */
    PayloadMigrationQueryOperations: {
      name?: {
        equals?: string;
        not_equals?: string;
        in?: string;
        not_in?: string;
        like?: string;
        contains?: string;
      };
      batch?: {
        equals?: number;
        not_equals?: number;
        in?: string;
        not_in?: string;
        greater_than?: number;
        greater_than_equal?: number;
        less_than?: number;
        less_than_equal?: number;
      };
      updatedAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
      createdAt?: {
        /** Format: date-time */
        equals?: string;
        /** Format: date-time */
        not_equals?: string;
        in?: string;
        not_in?: string;
        /** Format: date-time */
        greater_than?: string;
        /** Format: date-time */
        greater_than_equal?: string;
        /** Format: date-time */
        less_than?: string;
        /** Format: date-time */
        less_than_equal?: string;
      };
    };
    /** Payload Migration query conjunction */
    PayloadMigrationQueryOperationsAnd: {
      and: (
        | components["schemas"]["PayloadMigrationQueryOperations"]
        | components["schemas"]["PayloadMigrationQueryOperationsAnd"]
        | components["schemas"]["PayloadMigrationQueryOperationsOr"]
      )[];
    };
    /** Payload Migration query disjunction */
    PayloadMigrationQueryOperationsOr: {
      or: (
        | components["schemas"]["PayloadMigrationQueryOperations"]
        | components["schemas"]["PayloadMigrationQueryOperationsAnd"]
        | components["schemas"]["PayloadMigrationQueryOperationsOr"]
      )[];
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
    /** @description Payload Locked Document object */
    PayloadLockedDocumentResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["PayloadLockedDocument"];
      };
    };
    /** @description Payload Locked Document object */
    NewPayloadLockedDocumentResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["PayloadLockedDocument"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Payload Locked Document not found */
    PayloadLockedDocumentNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Payload Locked Documents */
    PayloadLockedDocumentListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["PayloadLockedDocument"][];
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
    /** @description Payload Preference object */
    PayloadPreferenceResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["PayloadPreference"];
      };
    };
    /** @description Payload Preference object */
    NewPayloadPreferenceResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["PayloadPreference"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Payload Preference not found */
    PayloadPreferenceNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Payload Preferences */
    PayloadPreferenceListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["PayloadPreference"][];
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
    /** @description Payload Migration object */
    PayloadMigrationResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": components["schemas"]["PayloadMigration"];
      };
    };
    /** @description Payload Migration object */
    NewPayloadMigrationResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          message: string;
          doc: components["schemas"]["PayloadMigration"] & {
            id: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
          };
        };
      };
    };
    /** @description Payload Migration not found */
    PayloadMigrationNotFoundResponse: {
      headers: {
        [name: string]: unknown;
      };
      content?: never;
    };
    /** @description List of Payload Migrations */
    PayloadMigrationListResponse: {
      headers: {
        [name: string]: unknown;
      };
      content: {
        "application/json": {
          docs: components["schemas"]["PayloadMigration"][];
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
              direction: "ltr" | "rtl" | null;
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
        };
      };
    };
    /** @description Payload Locked Document */
    PayloadLockedDocumentRequestBody: {
      content: {
        "application/json": {
          /** @description ID of the users/media/categories/indicators/layers */
          document?: string;
          globalSlug?: string | null;
          /** @description ID of the users */
          user: string;
        };
      };
    };
    /** @description Payload Preference */
    PayloadPreferenceRequestBody: {
      content: {
        "application/json": {
          /** @description ID of the users */
          user: string;
          key?: string | null;
          value?: (Record<string, never> | unknown[] | string | number | boolean) | null;
        };
      };
    };
    /** @description Payload Migration */
    PayloadMigrationRequestBody: {
      content: {
        "application/json": {
          name?: string | null;
          batch?: number | null;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
