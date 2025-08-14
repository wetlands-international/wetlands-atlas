export const chartCategoriesMap = {
  "Reforestation Avg": {
    isProtection: false,
    isRestoration: true,
    isWetland: false,
  },
  "Forest Management Avg": {
    isProtection: true,
    isRestoration: false,
    isWetland: false,
  },
  "Reduce Deforestation Avg": {
    isProtection: true,
    isRestoration: false,
    isWetland: false,
  },
  "Grassland And Savanna Fire Mgmt": {
    isProtection: true,
    isRestoration: false,
    isWetland: false,
  },
  "Mangrove Restoration": {
    isProtection: false,
    isRestoration: true,
    isWetland: true,
  },
  "Peatland Restoration": {
    isProtection: false,
    isRestoration: true,
    isWetland: true,
  },
  "Reduce Mangrove Conversion": {
    isProtection: true,
    isRestoration: false,
    isWetland: true,
  },
  "Reduce Peatland Degradation": {
    isProtection: true,
    isRestoration: false,
    isWetland: true,
  },
} as const;
