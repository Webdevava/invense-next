import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  stat_text: string;
  stat_value: string | number;
  icon: LucideIcon;
};

export const StatCard = ({
  title,
  stat_text,
  stat_value,
  icon: Icon,
}: StatCardProps) => {
  return (
    <Card className="w-full rounded-lg gap-0 p-0">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-accent size-8 rounded-lg flex items-center justify-center"><Icon className="h-5 w-5 text-primary" /></div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <Separator/>
      <CardContent className="flex flex-row justify-between items-center p-4">
        <p className="text-sm">{stat_text}</p>
        <code className="text-2xl font-bold text-primary">{stat_value}</code>
      </CardContent>
    </Card>
  );
};