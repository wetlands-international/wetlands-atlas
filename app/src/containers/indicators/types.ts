export interface IndicatorChartData {
  id: string;
  key: string;
  type: "restoration" | "protection";
  unit: string;
  color: string;
  group: "wetlands" | "non-wetlands";
  label: string;
  value: number | number[];
  format: string;
}
