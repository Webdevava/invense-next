"use client";
import React, { useState } from "react";
import Motor from "@/public/images/Motor";
import Transformer from "@/public/images/Transformer";
import Water from "@/public/images/Water";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

// Define metrics for each equipment type
const equipmentMetrics = {
  motor: {
    critical: [
      { label: "Max Velocity", value: "120 m/s", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
      { label: "Max Frequency", value: "60 Hz", position: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2" },
      { label: "Run Hours", value: "1420 h", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
      { label: "Current", value: "15 A", position: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" },
    ],
    other: [
      { label: "X Axis Acceleration", value: "2.1 g" },
      { label: "Y Axis Acceleration", value: "1.8 g" },
      { label: "Z Axis Acceleration", value: "2.4 g" },
    ],
  },
  transformer: {
    critical: [
      { label: "Voltage", value: "11 kV", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
      { label: "Temperature", value: "85 °C", position: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2" },
      { label: "Load", value: "75%", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
      { label: "Oil Level", value: "90%", position: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" },
    ],
    other: [
      { label: "Power Factor", value: "0.95" },
      { label: "Insulation Resistance", value: "500 MΩ" },
      { label: "Harmonic Distortion", value: "3.2%" },
    ],
  },
  water: {
    critical: [
      { label: "Flow Rate", value: "50 L/s", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
      { label: "Pressure", value: "3.5 bar", position: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2" },
      { label: "Run Hours", value: "980 h", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
      { label: "Temperature", value: "45 °C", position: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" },
    ],
    other: [
      { label: "Vibration", value: "0.8 mm/s" },
      { label: "Power Consumption", value: "5.2 kW" },
      { label: "Efficiency", value: "88%" },
    ],
  },
};

type EquipmentType = "motor" | "transformer" | "water";

interface EquipmentCardProps {
  type: EquipmentType;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ type }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Select component based on type
  const EquipmentComponent = type === "motor" ? Motor : type === "transformer" ? Transformer : Water;
  const metrics = equipmentMetrics[type];
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Card
      className="p-0 gap-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-4">
        <CardTitle>{title} (Critical Parameters)</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 py-6 h-full">
        <div className="relative aspect-square max-h-64 mx-auto flex items-center justify-center">
          <EquipmentComponent
            color={isHovered ? "var(--primary)" : "var(--foreground)"}
            className="scale-150"
          />
          {metrics.critical.map((metric, index) => (
            <div
              key={index}
              className={`absolute ${metric.position} bg-muted text-xs rounded-md px-2 py-1 shadow-sm border text-center min-w-[90px]`}
            >
              <div className="font-semibold">{metric.label}</div>
              <div className="text-muted-foreground">{metric.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Other Parameters</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {metrics.other.map((metric, index) => (
              <div
                key={index}
                className="bg-muted p-2 rounded-md text-xs border shadow-sm"
              >
                <div className="font-semibold">{metric.label}</div>
                <div className="text-muted-foreground">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EquipmentCard;