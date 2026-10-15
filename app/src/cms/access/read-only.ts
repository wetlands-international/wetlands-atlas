import { PublicAccessControl } from "@/cms/access/public";

// The seed writes through drizzle and bypasses access control, so it can still update these collections
export const ReadOnlyAccessControl = {
  ...PublicAccessControl,
  create: () => false,
  update: () => false,
  delete: () => false,
};

export const READ_ONLY_COLLECTION_DESCRIPTION =
  "Managed from the repository (app-initial-data) and updated by the seed. Read-only in the CMS.";
