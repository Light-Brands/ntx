import * as React from "react";
import { cn } from "../../lib/utils";

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string; activevalue?: string; onselect?: (val: string) => void }
>(({ className, value, activevalue, onselect, ...props }, ref) => {
    const isActive = value === activevalue;
    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onselect && onselect(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground",
          className
        )}
        {...props}
      />
    );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; activevalue?: string }
>(({ className, value, activevalue, ...props }, ref) => {
  if (value !== activevalue) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

// Simplified stateful wrapper for ease of use
const TabsRoot = ({ defaultValue, children, className }: { defaultValue: string, children: React.ReactNode, className?: string }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
    
    return (
        <div className={className}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                   const element = child as React.ReactElement<any>;
                   if (element.type === TabsList) {
                       return React.cloneElement(element, {
                           children: React.Children.map(element.props.children, trigger => {
                               if (React.isValidElement(trigger)) {
                                   return React.cloneElement(trigger as React.ReactElement<any>, {
                                       activevalue: activeTab,
                                       onselect: setActiveTab
                                   });
                               }
                               return trigger;
                           })
                       });
                   }
                   if (element.type === TabsContent) {
                       return React.cloneElement(element, {
                           activevalue: activeTab
                       });
                   }
                }
                return child;
            })}
        </div>
    );
};

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent };