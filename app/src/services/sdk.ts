import { PayloadSDK } from "@payloadcms/sdk";

import type { Config } from "@/payload-types";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return `http://localhost:${process.env.PORT || 3000}`;
};

export const sdk = new PayloadSDK<Config>({
  baseURL: `${getBaseUrl()}/api`,
  fetch: async (url, init) => {
    const response = await fetch(url, init);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fetch error: ${response.status} - ${errorText}`);
    }

    return response;
  },
});
