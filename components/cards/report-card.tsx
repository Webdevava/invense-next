import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ReportCardProps = {
  title: string;
  desc: string;
  imageUrl: string;
  href: string;
};

export const ReportCard = ({
  title,
  imageUrl,
  href,
  desc,
}: ReportCardProps) => {
  return (
    <Card className="w-full max-w-lg overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md p-0 gap-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
        <Image
          src={imageUrl}
          alt="Icon"
          height={200}
          width={600}
          className="rounded-md object-cover h-64"
        />
      </CardHeader>

      <Separator />

      <CardContent className="p-2 group">
        <CardTitle className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300 ease-in-out">
          {title}
        </CardTitle>
       <CardDescription className="line-clamp-2">
  {desc}
</CardDescription>
   
      </CardContent>
      {/* <Separator/> */}
      <CardFooter className="flex justify-end p-2">
          <Link href={href} passHref>
          <Button variant="outline" size="sm" className="w-fit border dark:bg-popover dark:hover:bg-background text-primary/75 hover:text-primary hover:border-primary">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
