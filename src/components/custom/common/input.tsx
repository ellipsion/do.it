import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded border-none bg-gray-100/60 px-3 py-0 text-xs text-gray-700 font-normal disabled:font-medium ring-offset-background disabled:ring-transparent  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 placeholder:text-xs focus-visible:outline-none focus-visible:ring-none focus-visible:ring-offset-0 disabled:cursor-text disabled:bg-gray-100/40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
