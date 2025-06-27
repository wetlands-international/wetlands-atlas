import { BasePayload } from "payload";

export const seed = async (payload: BasePayload) => {
  // Categories
  const categories = await payload.find({
    collection: "categories",
    limit: 2,
    depth: 0,
  });

  if (categories.totalDocs === 0) {
    await payload.create({
      collection: "categories",
      data: {
        name: "Climate mitigation potential",
        description:
          "Wetlands are areas where water covers the soil, either permanently or seasonally.",
      },
      locale: "en",
    });
    await payload.create({
      collection: "categories",
      data: {
        name: "Climate adaptation",
        description:
          "Water quality refers to the chemical, physical, and biological characteristics of water.",
      },
      locale: "en",
    });
    await payload.create({
      collection: "categories",
      data: {
        name: "Nature dependent people",
        description:
          "Wetlands are areas where water covers the soil, either permanently or seasonally.",
      },
      locale: "en",
    });
  }

  // Indicators
  const indicators = await payload.find({
    collection: "indicators",
    limit: 2,
    depth: 0,
  });

  if (indicators.totalDocs === 0) {
    await payload.create({
      collection: "indicators",
      data: {
        name: "Wetland extent",
        description: null,
        category: "climate-mitigation-potential",
      },
      locale: "en",
    });
    await payload.create({
      collection: "indicators",
      data: {
        name: "Wetland hydrology",
        description: null,
        category: "climate-mitigation-potential",
      },
      locale: "en",
    });
  }

  // Stories
  const stories = await payload.find({
    collection: "stories",
    limit: 2,
    depth: 0,
  });

  if (stories.totalDocs === 0) {
    await payload.create({
      collection: "stories",
      data: {
        name: "Wetland restoration in the Amazon",
        description: "A story about wetland restoration in the Amazon.",
        category: "climate-mitigation-potential",
        location: [-63.582, -3.465],
        published: true,
        steps: [
          {
            type: "map",

            map: {
              bbox: [-68.58, -17.03, -48.36, 2.93],
            },
            chart: null,

            sidebar: {
              root: {
                type: "root",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    tag: "h2",
                    type: "heading",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "This is the main title",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                  },

                  {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "tsx",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 3,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " is designed to simplify your TypeScript experience.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " It enhances Node.js with TypeScript support in both CommonJS and ESM modes, allowing you to switch between them seamlessly. It also supports tsconfig.json paths and includes a Watch mode to make development even easier.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    textStyle: "",
                    textFormat: 3,
                  },
                ],
                direction: "ltr",
              },
            },
          },

          {
            type: "map",

            map: {
              bbox: [-52.85, -2.87, -47.92, 2.06],
            },
            chart: null,

            sidebar: {
              root: {
                type: "root",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    tag: "h3",
                    type: "heading",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "Section 2",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                  },

                  {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "tsx",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 3,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " is designed to simplify your TypeScript experience.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " It enhances Node.js with TypeScript support in both CommonJS and ESM modes, allowing you to switch between them seamlessly. It also supports tsconfig.json paths and includes a Watch mode to make development even easier.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    textStyle: "",
                    textFormat: 3,
                  },
                ],
                direction: "ltr",
              },
            },
          },
        ],
      },
      locale: "en",
    });
    await payload.create({
      collection: "stories",
      data: {
        name: "Wetland conservation in Africa",
        description: "A story about wetland conservation in Africa.",
        category: "climate-adaptation",
        location: [31.2357, -1.2921],
        published: true,
        steps: [
          {
            type: "map",

            map: {
              bbox: [-68.58, -17.03, -48.36, 2.93],
            },
            chart: null,

            sidebar: {
              root: {
                type: "root",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    tag: "h2",
                    type: "heading",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "This is the main title",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                  },

                  {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "tsx",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 3,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " is designed to simplify your TypeScript experience.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " It enhances Node.js with TypeScript support in both CommonJS and ESM modes, allowing you to switch between them seamlessly. It also supports tsconfig.json paths and includes a Watch mode to make development even easier.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    textStyle: "",
                    textFormat: 3,
                  },
                ],
                direction: "ltr",
              },
            },
          },

          {
            type: "map",

            map: {
              bbox: [-52.85, -2.87, -47.92, 2.06],
            },
            chart: null,

            sidebar: {
              root: {
                type: "root",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    tag: "h3",
                    type: "heading",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "Section 2",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                  },

                  {
                    type: "paragraph",
                    format: "",
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: "normal",
                        text: "tsx",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 3,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " is designed to simplify your TypeScript experience.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: "normal",
                        text: " It enhances Node.js with TypeScript support in both CommonJS and ESM modes, allowing you to switch between them seamlessly. It also supports tsconfig.json paths and includes a Watch mode to make development even easier.",
                        type: "text",
                        style: "",
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    textStyle: "",
                    textFormat: 3,
                  },
                ],
                direction: "ltr",
              },
            },
          },
        ],
      },
      locale: "en",
    });
  }
};
