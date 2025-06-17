import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Gauge,
  Type,
  Power,
  PowerOff,
} from "lucide-react";
import { Separator } from "../ui/separator";



interface BaseProps {
  name: string;
  key: string;
  timestamp: string;
}

interface TextProps extends BaseProps {
  type: "text";
  value: string;
  unit?: string;
}

interface GaugeProps extends BaseProps {
  type: "gauge";
  value: number;
  unit?: string;
  min: number;
  max: number;
}

interface OnOffProps extends BaseProps {
  type: "on/off";
  isActive: boolean;
}

type InfoWidgetProps = TextProps | GaugeProps | OnOffProps;

const InfoWidget: React.FC<InfoWidgetProps> = (props) => {
  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp || "N/A";
    }
  };

  const getTypeIcon = () => {
    switch (props.type) {
      case "gauge":
        return <Gauge className="h-4 w-4" />;
      case "on/off":
        return props.isActive ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  const getColorClasses = () => {
    switch (props.type) {
      case "gauge":
        const percentage = ((props.value - props.min) / (props.max - props.min)) * 100;
        if (percentage >= 80) {
          return {
            accent: "text-red-600",
            gaugeColor: "#dc2626",
            bgAccent: "bg-red-50 dark:bg-red-950/20",
          };
        } else if (percentage >= 60) {
          return {
            accent: "text-amber-600",
            gaugeColor: "#d97706",
            bgAccent: "bg-amber-50 dark:bg-amber-950/20",
          };
        } else {
          return {
            accent: "text-green-600",
            gaugeColor: "#16a34a",
            bgAccent: "bg-green-50 dark:bg-green-950/20",
          };
        }
      case "on/off":
        return props.isActive ? {
          accent: "text-green-600",
          bgAccent: "bg-green-50 dark:bg-green-950/20",
        } : {
          accent: "text-muted-foreground",
          bgAccent: "bg-gray-50 dark:bg-gray-950/20",
        };
      default:
        return {
          accent: "text-blue-600",
          bgAccent: "bg-blue-50 dark:bg-blue-950/20",
        };
    }
  };

  const colors = getColorClasses();

  // Circular gauge SVG component
  const CircularGauge = ({ value, min, max, size = 120 }: { value: number; min: number; max: number; size?: number }) => {
    const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.gaugeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${colors.accent}`}>
            {value}
          </span>
          <span className="text-xs text-muted-foreground">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (props.type) {
      case "gauge":
        return (
          <div className="flex flex-col items-center space-y-3">
            <CircularGauge value={props.value} min={props.min} max={props.max} />
            <div className="text-center">
              <div className="text-xs text-muted-foreground">
                Range: {props.min} - {props.max} {props.unit}
              </div>
            </div>
          </div>
        );
      
      case "on/off":
        return (
          <div className="flex flex-col items-center space-y-3">
            <div className={`p-3 rounded-full ${props.isActive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-muted'} transition-colors duration-300`}>
              {props.isActive ? (
                <Power className={`h-6 w-6 ${colors.accent}`} />
              ) : (
                <PowerOff className={`h-6 w-6 ${colors.accent}`} />
              )}
            </div>
            <div className={`text-lg font-semibold ${colors.accent}`}>
              {props.isActive ? "ON" : "OFF"}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center">
            <div className={`text-2xl font-bold ${colors.accent}`}>
              {props.value}
              {props.unit && <span className="text-sm font-normal ml-1 text-muted-foreground">{props.unit}</span>}
            </div>
          </div>
        );
    }
  };

  return (
    <Card className={`w-full min-h-64 rounded-lg transition-all duration-200 hover:shadow-md border ${colors.bgAccent} p-0 gap-0`}>
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {props.name}
          </CardTitle>
          <div className={`p-1.5 rounded-md bg-popover shadow-sm ${colors.accent}`}>
            {getTypeIcon()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-4 h-full flex items-center justify-center">
        {renderContent()}
      </CardContent>
      
      <Separator />
      
      <CardFooter className="p-2">
        <div className="text-xs text-muted-foreground flex items-center justify-between w-full">
          <span>Updated</span>
          <span className="font-mono">
            {formatTimestamp(props.timestamp)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};


export default InfoWidget;