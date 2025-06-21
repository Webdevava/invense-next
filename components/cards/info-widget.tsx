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

  const getTypeIcon = () => {
    const iconClass = "h-7 w-7 text-white";
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
        if (percentage >= 80) return "from-red-400 to-red-600";
        if (percentage >= 60) return "from-amber-400 to-amber-600";
        return "from-green-400 to-green-600";
      case "on/off":
        return props.isActive
          ? "from-green-400 to-green-600"
          : "from-gray-400 to-gray-600";
      default:
        return "from-blue-400 to-blue-600";
    }
  };

  const getValueColor = () => {
    switch (props.type) {
      case "gauge":
        const percentage =
          ((props.value - props.min) / (props.max - props.min)) * 100;
        if (percentage >= 80) return "text-red-600";
        if (percentage >= 60) return "text-amber-600";
        return "text-green-600";
      case "on/off":
        return props.isActive ? "text-green-600" : "text-muted-foreground";
      default:
        return "text-blue-600";
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

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full max-w-72 h-16 bg-card hover:bg-muted shadow-sm outline outline-offset-1 outline-border rounded-lg flex items-center justify-start p-2 border">
            {/* Icon container */}
            <div
              className={`w-12 h-12 aspect-square rounded-lg bg-gradient-to-br ${getIconBackground()} flex items-center justify-center`}
            >
              {getTypeIcon()}
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
        <TooltipContent className="py-3 w-52  ">
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
};

export default InfoWidget;