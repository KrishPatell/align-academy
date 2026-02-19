"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type InputMaskType = 
  | "phone" 
  | "date" 
  | "time" 
  | "datetime" 
  | "credit-card" 
  | "cpf" 
  | "cnpj"
  | "zip-code"
  | "currency"
  | "percentage"
  | "custom";

export interface InputMaskProps extends React.ComponentProps<typeof Input> {
  mask?: InputMaskType;
  maskPattern?: string;
  maskSeparator?: string;
  maskPlaceholder?: string;
  onMaskChange?: (value: string) => void;
}

/**
 * Masks for different input types
 */
const maskFunctions: Record<string, (value: string) => string> = {
  phone: (value: string) => {
    // US phone format: (XXX) XXX-XXXX
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  },
  
  date: (value: string) => {
    // Date format: MM/DD/YYYY
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  },
  
  time: (value: string) => {
    // Time format: HH:MM
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  },
  
  datetime: (value: string) => {
    // DateTime format: MM/DD/YYYY HH:MM
    const digits = value.replace(/\D/g, "").slice(0, 12);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    if (digits.length <= 10) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)} ${digits.slice(8)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)} ${digits.slice(8, 10)}:${digits.slice(10)}`;
  },
  
  "credit-card": (value: string) => {
    // Credit card format: XXXX XXXX XXXX XXXX
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : "";
  },
  
  cpf: (value: string) => {
    // Brazilian CPF: XXX.XXX.XXX-XX
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  },
  
  cnpj: (value: string) => {
    // Brazilian CNPJ: XX.XXX.XXX/XXXX-XX
    const digits = value.replace(/\D/g, "").slice(0, 14);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
  },
  
  "zip-code": (value: string) => {
    // US ZIP code: XXXXX or XXXXX-XXXX
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  },
  
  currency: (value: string) => {
    // Currency format: $X,XXX.XX
    const digits = value.replace(/[^\d.]/g, "");
    const parts = digits.split(".");
    const wholePart = parts[0] || "0";
    const formattedWhole = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts.length === 1) return `$${formattedWhole}`;
    if (parts.length === 2) return `$${formattedWhole}.${parts[1].slice(0, 2)}`;
    return `$${formattedWhole}`;
  },
  
  percentage: (value: string) => {
    // Percentage: XX%
    const digits = value.replace(/\D/g, "").slice(0, 3);
    if (digits.length === 0) return "";
    const num = parseInt(digits, 10);
    if (num > 100) return "100%";
    return `${digits}%`;
  },
};

/**
 * Apply custom pattern mask
 * Pattern: # = digit, A = letter, * = alphanumeric
 */
function applyCustomMask(value: string, pattern: string, placeholder: string = "_"): string {
  const chars = value.split("");
  let result = "";
  let valueIndex = 0;

  for (let i = 0; i < pattern.length && valueIndex < chars.length; i++) {
    const patternChar = pattern[i];
    const char = chars[valueIndex];

    if (patternChar === "#") {
      if (/\d/.test(char)) {
        result += char;
        valueIndex++;
      } else {
        valueIndex++;
        i--; // Retry this position
      }
    } else if (patternChar === "A") {
      if (/[a-zA-Z]/.test(char)) {
        result += char.toUpperCase();
        valueIndex++;
      } else {
        valueIndex++;
        i--;
      }
    } else if (patternChar === "*") {
      if (/[a-zA-Z0-9]/.test(char)) {
        result += char;
        valueIndex++;
      } else {
        valueIndex++;
        i--;
      }
    } else {
      result += patternChar;
    }
  }

  return result;
}

/**
 * Input component with built-in masking support
 */
const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ className, mask, maskPattern, maskPlaceholder, onMaskChange, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");
    const isControlled = value !== undefined;

    React.useEffect(() => {
      if (isControlled && typeof value === "string") {
        setDisplayValue(value);
      }
    }, [value, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Apply mask
      if (mask && maskFunctions[mask]) {
        newValue = maskFunctions[mask](newValue);
      } else if (maskPattern) {
        newValue = applyCustomMask(newValue, maskPattern, maskPlaceholder);
      }

      setDisplayValue(newValue);
      onMaskChange?.(newValue);

      // Create synthetic event to maintain compatibility
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue,
        },
      };
      onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <Input
        ref={ref}
        value={isControlled ? value : displayValue}
        onChange={handleChange}
        className={cn(className)}
        {...props}
      />
    );
  }
);

InputMask.displayName = "InputMask";

export { InputMask };
export { maskFunctions, applyCustomMask };
