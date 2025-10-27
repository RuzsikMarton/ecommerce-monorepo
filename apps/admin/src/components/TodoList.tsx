"use client";

import React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const TodoList = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <h1 className="text-lg font-medium mb-4">Todo List</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="default" className="w-full">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {/*List*/}
      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {/*List items*/}
          <Card className="p-4 bg-background">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
          {/*List items*/}
          <Card className="p-4">
            <div className="flex gap-4 items-center">
              <Checkbox id="item1" />
              <Label htmlFor="item1" className="text-sm text-muted-foreground">
                Finish the quarterly report
              </Label>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
