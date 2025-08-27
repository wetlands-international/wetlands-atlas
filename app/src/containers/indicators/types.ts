export interface IndicatorChartData {
  id: string;
  type: "protection" | "restoration";
  unit: string;
  color: string;
  group: "wetlands" | "non-wetlands";
  label: string;
  value: number;
  format: string;
}
