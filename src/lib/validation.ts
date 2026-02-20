/**
 * Reusable form validation utilities
 * Provides common validation rules and error handling
 */

export type ValidationRule<T = string> = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  email?: boolean | string;
  phone?: boolean | string;
  numeric?: boolean | string;
  custom?: (value: T) => string | undefined;
};

export type ValidationRules<T extends Record<string, unknown>> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

export type FormErrors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>>;

export interface ValidationResult<T extends Record<string, unknown>> {
  isValid: boolean;
  errors: FormErrors<T>;
}

/**
 * Validates a single value against rules
 */
export function validateField<T>(
  value: T,
  rules: ValidationRule<T>
): string | undefined {
  // Required check
  if (rules.required) {
    if (value === undefined || value === null || value === "") {
      return typeof rules.required === "string" ? rules.required : "This field is required";
    }
  }

  // Skip further validation if empty and not required
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const stringValue = String(value);

  // Min length check
  if (rules.minLength) {
    const min = typeof rules.minLength === "number" ? rules.minLength : rules.minLength.value;
    const message = typeof rules.minLength === "string" ? rules.minLength : (rules.minLength as any).message;
    if (stringValue.length < min) {
      return message || `Must be at least ${min} characters`;
    }
  }

  // Max length check
  if (rules.maxLength) {
    const max = typeof rules.maxLength === "number" ? rules.maxLength : rules.maxLength.value;
    const maxMessage = typeof rules.maxLength === "string" ? rules.maxLength : (rules.maxLength as any).message;
    if (stringValue.length > max) {
      return maxMessage || `Must be no more than ${max} characters`;
    }
  }

  // Email validation
  if (rules.email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(stringValue)) {
      return typeof rules.email === "string" ? rules.email : "Please enter a valid email address";
    }
  }

  // Phone validation
  if (rules.phone) {
    const phonePattern = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phonePattern.test(stringValue)) {
      return typeof rules.phone === "string" ? rules.phone : "Please enter a valid phone number";
    }
  }

  // Numeric validation
  if (rules.numeric) {
    if (!/^\d+$/.test(stringValue)) {
      return typeof rules.numeric === "string" ? rules.numeric : "Please enter a valid number";
    }
  }

  // Pattern validation
  if (rules.pattern) {
    const pattern = rules.pattern instanceof RegExp ? rules.pattern : rules.pattern.value;
    const message = rules.pattern instanceof RegExp ? "Invalid format" : rules.pattern.message;
    if (!pattern.test(stringValue)) {
      return message;
    }
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return undefined;
}

/**
 * Validates an entire form against a set of rules
 */
export function validateForm<T extends Record<string, unknown>>(
  values: T,
  rules: ValidationRules<T>
): ValidationResult<T> {
  const errors: FormErrors<T> = {};

  (Object.keys(rules) as Array<keyof T>).forEach((field) => {
    const value = values[field];
    const fieldRules = rules[field];
    
    if (fieldRules) {
      const error = validateField(value, fieldRules as any);
      if (error) {
        (errors as any)[field] = error;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Common validation rule presets
 */
export const validationPresets = {
  email: {
    required: "Email is required",
    email: "Please enter a valid email address",
  } as ValidationRule<string>,

  phone: {
    required: "Phone number is required",
    phone: "Please enter a valid phone number",
  } as ValidationRule<string>,

  password: {
    required: "Password is required",
    minLength: { value: 8, message: "Password must be at least 8 characters" },
  } as ValidationRule<string>,

  name: {
    required: "Name is required",
    minLength: { value: 2, message: "Name must be at least 2 characters" },
    maxLength: { value: 50, message: "Name must be no more than 50 characters" },
  } as ValidationRule<string>,

  required: {
    required: "This field is required",
  } as ValidationRule<string>,
};

/**
 * Password strength checker
 */
export interface PasswordStrengthResult {
  score: number;
  level: "weak" | "fair" | "good" | "strong";
  criteria: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const criteria = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  let level: PasswordStrengthResult["level"];
  if (score <= 2) level = "weak";
  else if (score === 3) level = "fair";
  else if (score === 4) level = "good";
  else level = "strong";

  return { score, level, criteria };
}
