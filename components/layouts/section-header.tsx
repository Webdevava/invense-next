import React from "react";
import { Separator } from "../ui/separator";

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  actions?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  badge,
  actions,
}) => {
  return (
    <section className="w-full">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-1">
            <h1 className="text-xl sm:text-2xl font-medium truncate">
              {title
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </h1>

            {badge && (
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  badge.variant === "secondary"
                    ? "bg-secondary text-secondary-foreground"
                    : badge.variant === "destructive"
                    ? "bg-destructive text-destructive-foreground"
                    : badge.variant === "outline"
                    ? "border border-input bg-background text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {badge.text}
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap flex-shrink-0">
            {actions}
          </div>
        )}
      </header>

      <Separator className="mt-2" />
    </section>
  );
};

export default SectionHeader;
