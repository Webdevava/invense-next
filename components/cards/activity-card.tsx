import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";



export const ActivityCard = () => {
  return (
    <Card className="p-0 gap-0 w-full overflow-hidden rounded-md">
      <CardHeader className="p-4 ">
        <CardTitle className="flex flex-row items-center text-sm font-normal gap-1.5">
          
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
       
      </CardContent>
    </Card>
  );
};
