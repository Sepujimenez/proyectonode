"use client"

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showPassword, onTogglePassword, ...props }, ref) => {
    const isPassword = type === "password";

    return (
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            isPassword && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && onTogglePassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
