import React from "react";
import { Gauge, Type, Power, PowerOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BaseProps {
  name: string;
  key: string;
  timestamp: string;
  isBig?: boolean;
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
  const isBig = props.isBig ?? false;

  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );

      if (diffInMinutes < 1) return "just now";
      if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} hr ago`;

      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } catch {
      return "N/A";
    }
  };

  const getTypeIcon = (size: "small" | "large" | "watermark") => {
    const iconClass =
      size === "small"
        ? "h-7 w-7 text-white"
        : size === "large"
        ? "h-12 w-12 text-white"
        : "h-24 w-24 text-muted-foreground/10";
    switch (props.type) {
      case "gauge":
        return <Gauge className={iconClass} />;
      case "on/off":
        return props.isActive ? (
          <Power className={iconClass} />
        ) : (
          <PowerOff className={iconClass} />
        );
      default:
        return <Type className={iconClass} />;
    }
  };

  const getIconBackground = () => {
    switch (props.type) {
      case "gauge":
        const percentage =
          ((props.value - props.min) / (props.max - props.min)) * 100;
        if (percentage >= 80) return "from-red-500 to-red-700"; // Alert
        if (percentage >= 60) return "from-yellow-500 to-yellow-700"; // Warn
        return "from-green-500 to-green-700"; // Normal
      case "on/off":
        return props.isActive
          ? "from-green-500 to-green-700" // Normal
          : "from-red-500 to-red-700"; // Alert
      default:
        return "from-green-500 to-green-700"; // Normal for text
    }
  };

  const getValueColor = () => {
    switch (props.type) {
      case "gauge":
        const percentage =
          ((props.value - props.min) / (props.max - props.min)) * 100;
        if (percentage >= 80) return "text-red-600"; // Alert
        if (percentage >= 60) return "text-yellow-600"; // Warn
        return "text-green-600"; // Normal
      case "on/off":
        return props.isActive ? "text-green-600" : "text-red-600"; // Normal or Alert
      default:
        return "text-green-600"; // Normal for text
    }
  };

  const getDisplayValue = () => {
    switch (props.type) {
      case "gauge":
        return `${props.value}${props.unit ? ` ${props.unit}` : ""}`;
      case "on/off":
        return props.isActive ? "ON" : "OFF";
      default:
        return `${props.value}${props.unit ? ` ${props.unit}` : ""}`;
    }
  };

  const renderHalfGauge = () => {
    if (props.type !== "gauge") return null;
    const percentage = ((props.value - props.min) / (props.max - props.min)) * 100;
    return (
      <div className="relative w-48 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 50">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="8"
          />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={percentage >= 80 ? "#DC2626" : percentage >= 60 ? "#D97706" : "#16A34A"}
            strokeWidth="8"
            strokeDasharray={`${(percentage * 251.2) / 100}, 251.2`}
            strokeLinecap="round"
          />
        </svg>
        <p className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xl font-semibold ${getValueColor()}`}>
          {getDisplayValue()}
        </p>
      </div>
    );
  };

  const renderBigCard = () => (
    <div className="w-full max-w-md h-48 bg-card hover:bg-muted shadow-lg outline outline-offset-2 outline-border rounded-xl flex flex-col items-start justify-between p-6 border relative overflow-hidden">
      {/* Watermark Icon */}
      <div className="absolute -bottom-8 -right-8">
        {props.type === "gauge" ? renderHalfGauge() : getTypeIcon("watermark")}
      </div>

      {/* Header */}
      <div>
        <h3 className="text-xl font-bold">{props.name}</h3>
        <p className="text-sm text-muted-foreground">{formatTimestamp(props.timestamp)}</p>
      </div>

      {/* Content */}
      <p className={`text-4xl font-bold ${getValueColor()}`}>
        {getDisplayValue()}
      </p>

      {/* Footer */}
      <div className="text-xs text-muted-foreground">
        Panel ID: {props.key || "E5002"}
      </div>
    </div>
  );

  const renderSmallCard = () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full max-w-72 h-16 bg-card hover:bg-muted shadow-sm outline outline-offset-1 outline-border rounded-lg flex items-center justify-start p-2 border">
            {/* Icon container */}
            <div
              className={`w-12 h-12 aspect-square rounded-lg bg-gradient-to-br ${getIconBackground()} flex items-center justify-center`}
            >
              {getTypeIcon("small")}
            </div>

            {/* Text content */}
            <div className="flex-1 ml-2 font-sans">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold truncate">{props.name}</h3>
              </div>
              <p
                className={`text-lg font-semibold truncate ${getValueColor()}`}
              >
                {getDisplayValue()}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="py-3 w-52">
          <ul className="grid gap-3 text-xs">
            <li className="grid gap-0.5">
              <span className="text-muted-foreground">Last Activity</span>
              <span className="font-medium">{formatTimestamp(props.timestamp)}</span>
            </li>
            <li className="grid gap-0.5">
              <span className="text-muted-foreground">Panel Type</span>
              <span className="font-medium">{props.type}</span>
            </li>
            <li className="grid gap-0.5">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{props.name}</span>
            </li>
            <li className="grid gap-0.5">
              <span className="text-muted-foreground">Panel ID</span>
              <span className="font-medium">{props.key || "E5002"}</span>
            </li>
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return isBig ? renderBigCard() : renderSmallCard();
};

export default InfoWidget;