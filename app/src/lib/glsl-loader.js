"use strict";

import { readFile } from "fs";
import { dirname, resolve, join } from "path";

function parse(loader, source, context, cb) {
  var imports = [];
  var importPattern = /#include "([.\/\w_-]+)"/gi;
  var match = importPattern.exec(source);

  while (match != null) {
    imports.push({
      key: match[1],
      target: match[0],
      content: "",
    });
    match = importPattern.exec(source);
  }

  processImports(loader, source, context, imports, cb);
}

function processImports(loader, source, context, imports, cb) {
  if (imports.length === 0) {
    return cb(null, source);
  }

  var imp = imports.pop();

  // Check if the import is from node_modules
  if (imp.key.startsWith("node_modules/")) {
    const modulePath = imp.key.replace("node_modules/", "");
    const resolvedPath = join(process.cwd(), "node_modules", modulePath);

    readFile(resolvedPath, "utf-8", function (err, src) {
      if (err) {
        return cb(err);
      }

      parse(loader, src, dirname(resolvedPath), function (err, bld) {
        if (err) {
          return cb(err);
        }

        source = source.replace(imp.target, bld || ""); // Replace with an empty string if `bld` is undefined
        processImports(loader, source, context, imports, cb);
      });
    });
    return;
  }

  const resolvedPath = resolve(context, imp.key);

  readFile(resolvedPath, "utf-8", function (err, src) {
    if (err) {
      return cb(err);
    }

    parse(loader, src, dirname(resolvedPath), function (err, bld) {
      if (err) {
        return cb(err);
      }

      source = source.replace(imp.target, bld || ""); // Replace with an empty string if `bld` is undefined
      processImports(loader, source, context, imports, cb);
    });
  });
}

export default function glslLoader(source) {
  this.cacheable();
  var cb = this.async();
  parse(this, source, this.context, function (err, bld) {
    if (err) {
      return cb(err);
    }

    cb(null, "export default " + JSON.stringify(bld));
  });
}
