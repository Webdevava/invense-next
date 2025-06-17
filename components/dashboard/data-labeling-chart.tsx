'use client'
import React, { useState, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DataLabelingChart = () => {
  // Generate sample data for the past 3 months
  type DayData = { count: number; level: number };
  const generateSampleData = () => {
    const data: { [date: string]: DayData } = {};
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 4, today.getDate());
    
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      // Generate random activity (0-4 levels)
      const activity = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
      data[dateStr] = {
        count: activity * 20 + Math.floor(Math.random() * 15), // Convert to actual numbers
        level: activity
      };
    }
    return data;
  };

  const [data] = useState(generateSampleData);

  // Get color based on activity level
  const getColor = (level: number) => {
    const colors = [
      'bg-muted', // 0 - no activity
      'bg-primary/20', // 1 - low activity
      'bg-primary/40', // 2 - medium-low activity
      'bg-primary/60', // 3 - medium-high activity
      'bg-primary' // 4 - high activity
    ];
    return colors[level] || colors[0];
  };

  // Generate weeks for the chart
  const weeks = useMemo(() => {
    const result = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 4, today.getDate());
    
    // Start from the Sunday of the week containing startDate
    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());
    
    const currentDate = new Date(firstSunday);
    
    while (currentDate <= today) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayData = data[dateStr] || { count: 0, level: 0 };
        
        week.push({
          date: new Date(currentDate),
          dateStr,
          ...dayData,
          isToday: dateStr === today.toISOString().split('T')[0],
          isFuture: currentDate > today
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      result.push(week);
    }
    
    return result;
  }, [data]);

  // Get month labels
  type MonthLabel = { month: string; weekIndex: number };
  const monthLabels = useMemo<MonthLabel[]>(() => {
    const labels: MonthLabel[] = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let currentMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay && firstDay.date.getMonth() !== currentMonth) {
        currentMonth = firstDay.date.getMonth();
        if (weekIndex < weeks.length - 2) { // Don't show label for last few weeks
          labels.push({
            month: months[currentMonth],
            weekIndex
          });
        }
      }
    });
    
    return labels;
  }, [weeks]);

  const formatTooltipDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const totalLabeled = Object.values(data).reduce((sum, day) => sum + day.count, 0);
  const activeDays = Object.values(data).filter(day => day.count > 0).length;

  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-4">
        <CardTitle>Data Labeling Activity</CardTitle>
        <CardDescription className="flex gap-6 text-sm text-muted-foreground">
          Past 4 months data coverage
        </CardDescription>
      </CardHeader>
      <Separator/>
      
      <CardContent className="relative p-4 overflow-x-auto h-full mx-auto my-auto">
           {/* Month labels */}
        <div className="flex mb-2">
          {monthLabels.map((label, index) => (
            <div
              key={index}
              className="text-xs text-muted-foreground"
              style={{ 
                marginLeft: index === 0 ? `${label.weekIndex * 26}px` : `${(label.weekIndex - monthLabels[index-1]?.weekIndex || 0) * 26}px`
              }}
            >
              {label.month}
            </div>
          ))}
        </div>

        {/* Day labels */}
        <div className="flex">
          <div className="flex flex-col gap-1 mr-3 text-xs text-muted-foreground">
            <div className="h-6"></div>
            <div>Mon</div>
            <div className="h-6"></div>
            <div>Wed</div>
            <div className="h-6"></div>
            <div>Fri</div>
            <div className="h-6"></div>
          </div>

          {/* Chart grid */}
          <TooltipProvider>
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <Tooltip key={dayIndex}>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-6 h-6 rounded-sm border border-border cursor-pointer transition-all hover:ring-1 hover:ring-primary ${
                            day.isFuture ? 'bg-muted opacity-30' : getColor(day.level)
                          } ${day.isToday ? 'ring-1 ring-primary' : ''}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <div className="font-medium">
                            {day.count > 0 
                              ? `${day.count} labels` 
                              : 'No labels'
                            } on {formatTooltipDate(day.date)}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
      <Separator/>
      <CardFooter className='p-4 gap-4'>
         <span className='text-muted-foreground text-sm'>{totalLabeled.toLocaleString()} labels completed</span>
          <span className='text-muted-foreground text-sm' >{activeDays} active days</span>
      </CardFooter>
    </Card>
  );
};

export default DataLabelingChart;