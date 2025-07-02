import fs from "fs";

import slugify from "slugify";

const COUNTRIES_JSON_FILE_PATH = `../app-initial-data/raw/countries_sahel_db.geojson`;
const COUNTRIES_SQL_FILE_PATH = `../app-initial-data/countries_sahel.sql`;

const transformShagelCountries = () => {
  let sqlContent = "";
  const rawData = fs.readFileSync(COUNTRIES_JSON_FILE_PATH, "utf8");
  const data = JSON.parse(rawData);

  for (const row of data.features) {
    const { code, type, bbox } = row.properties;

    const id = slugify(`${type}-${code}`, {
      lower: true,
      strict: true,
      replacement: "-",
      trim: true,
    });

    const sqlInsert = `INSERT INTO locations 
        (id, code, type, bbox, geometry, geometry_4326)
      VALUES 
        ('${id}', '${code}', '${type}', '${JSON.stringify(bbox.bbox)}', '${JSON.stringify(row.geometry)}', ST_GeomFromGeoJSON('${JSON.stringify(row.geometry)}'))
      ON CONFLICT (id) DO UPDATE SET
        code        = EXCLUDED.code,
        geometry    = EXCLUDED.geometry,
        geometry_4326 = EXCLUDED.geometry_4326,
        bbox        = EXCLUDED.bbox,
        type        = EXCLUDED.type,
        updated_at  = EXCLUDED.updated_at;\n`;
    sqlContent += sqlInsert;
  }

  sqlContent = sqlContent.slice(0, -1);
  fs.writeFileSync(COUNTRIES_SQL_FILE_PATH, sqlContent, "utf8");
};

const main = async () => {
  try {
    await transformShagelCountries();
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

void main();
