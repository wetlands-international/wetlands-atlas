import fs from "node:fs";

import openapiTS, { astToString } from "openapi-typescript";

const ast = await openapiTS(new URL("http://localhost:3000/api/openapi.json", import.meta.url));
const contents = astToString(ast);

// (optional) write to file
fs.writeFileSync("./src/payload-api.ts", contents);
