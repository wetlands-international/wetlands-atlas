import API from "@/services/api";
import { Locale } from "next-intl";

export const DEFAULT_CATEGORIES_OPTIONS = (locale: Locale) =>
  API.queryOptions("get", "/api/categories", {
    params: {
      query: {
        locale,
        sort: "name",
      },
    },
  });
