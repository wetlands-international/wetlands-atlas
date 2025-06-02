const runningProductionMode = process.env.NODE_ENV === "production";
export const DevOnlyAccessControl = {
  create: () => !runningProductionMode,
  read: () => !runningProductionMode,
  readVersions: () => !runningProductionMode,
  update: () => !runningProductionMode,
  delete: () => !runningProductionMode,
};
