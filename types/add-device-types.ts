// types.ts
export interface Project {
  id: string;
  name: string;
}

export interface Parameter {
  id: string;
  name: string;
  key: string;
  value: string;
  deviceType: "gauge" | "text" | "on/off";
  minValue?: number;
  maxValue?: number;
  unit?: string;
}

export interface Device {
  id: string;
  projectId: string;
  name: string;
  deviceId: string;
  imei: string;
  simId: string;
  modbusId: string;
  lat: number;
  lon: number;
  parameters: Parameter[];
}