import { parseAsArrayOf, parseAsFloat } from "nuqs";

export const bboxParser = parseAsArrayOf(parseAsFloat, ",").withDefault([
  -109.52, -15.27, 87.93, 73.4,
]);
