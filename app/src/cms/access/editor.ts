import { Access } from "payload";

import { PublicAccessControl } from "@/cms/access/public";

const isLoggedIn: Access = ({ req }) => !!req.user;

export const EditorAccessControl = {
  ...PublicAccessControl,
  create: isLoggedIn,
  update: isLoggedIn,
  delete: isLoggedIn,
};
