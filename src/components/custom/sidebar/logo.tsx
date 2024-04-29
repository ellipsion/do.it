import { cn } from "@/lib/utils";
import { FC } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo: FC<LogoProps> = ({ size }) => {
  const variant = {
    sm: "text-2xl font-semibold",
    md: "text-3xl font-semibold",
    lg: "text-5xl font-semibold",
    xl: "text-7xl font-semibold",
  };
  return (
    <div className="">
      <h1
        className={cn(
          "text-xl font-semibold select-none",
          size && variant[size]
        )}
      >
        do.it
      </h1>
    </div>
  );
};

export default Logo;
