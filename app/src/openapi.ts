// TODO: We don't need to use the OPenAPI-typescript as soon as this PR is merged, all the media types will generate bad types
// Once we have the Payloadsdk we can
// https://github.com/payloadcms/payload/pull/9463

import fs from "node:fs";

import openapiTS, { astToString } from "openapi-typescript";

const ast = await openapiTS(new URL("http://localhost:3000/api/openapi.json", import.meta.url));
const contents = astToString(ast);

// (optional) write to file
fs.writeFileSync("./src/payload-api.ts", contents);
