import { parseAsArrayOf, parseAsFloat } from "nuqs";

export const bboxParser = parseAsArrayOf(parseAsFloat, ",");
