"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Chrome, Loader2, Check, X } from "lucide-react";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
}

type PasswordStrength = "weak" | "fair" | "good" | "strong";

interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const getPasswordCriteria = (pwd: string): PasswordCriteria => {
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  };

  const getPasswordStrength = (pwd: string): PasswordStrength => {
    const criteria = getPasswordCriteria(pwd);
    const score = Object.values(criteria).filter(Boolean).length;
    
    if (score <= 2) return "weak";
    if (score === 3) return "fair";
    if (score === 4) return "good";
    return "strong";
  };

  const passwordCriteria = getPasswordCriteria(password);
  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = (strength: PasswordStrength): string => {
    switch (strength) {
      case "weak": return "bg-red-500";
      case "fair": return "bg-yellow-500";
      case "good": return "bg-blue-500";
      case "strong": return "bg-green-500";
    }
  };

  const getStrengthLabel = (strength: PasswordStrength): string => {
    switch (strength) {
      case "weak": return "Weak";
      case "fair": return "Fair";
      case "good": return "Good";
      case "strong": return "Strong";
    }
  };

  const getStrengthWidth = (strength: PasswordStrength): string => {
    switch (strength) {
      case "weak": return "25%";
      case "fair": return "50%";
      case "good": return "75%";
      case "strong": return "100%";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    // Reset errors
    setErrors({});
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    router.push("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-600 to-blue-500 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">K</span>
          </div>
          <h1 className="text-2xl font-semibold text-white">Create an account</h1>
          <p className="text-slate-400 mt-2">Start your 14-day free trial</p>
        </div>

        <Card className="bg-[#1a1a1a] border-slate-800">
          <CardContent className="pt-8 pb-8" onKeyDown={handleKeyDown}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">First name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: undefined }));
                    }}
                    className={`bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500 ${errors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">Last name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: undefined }));
                    }}
                    className={`bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500 ${errors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Work email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={`bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    className={`bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500 focus:ring-slate-500 pr-10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStrengthColor(passwordStrength)} transition-all duration-300`}
                          style={{ width: getStrengthWidth(passwordStrength) }}
                        />
                      </div>
                      <span className={`text-xs ${
                        passwordStrength === "weak" ? "text-red-400" :
                        passwordStrength === "fair" ? "text-yellow-400" :
                        passwordStrength === "good" ? "text-blue-400" :
                        "text-green-400"
                      }`}>
                        {getStrengthLabel(passwordStrength)}
                      </span>
                    </div>
                    
                    {/* Password Criteria */}
                    <div className="grid grid-cols-2 gap-1">
                      <div className={`text-xs flex items-center gap-1 ${
                        passwordCriteria.length ? "text-green-400" : "text-slate-500"
                      }`}>
                        {passwordCriteria.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        8+ characters
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        passwordCriteria.uppercase ? "text-green-400" : "text-slate-500"
                      }`}>
                        {passwordCriteria.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        Uppercase
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        passwordCriteria.lowercase ? "text-green-400" : "text-slate-500"
                      }`}>
                        {passwordCriteria.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        Lowercase
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        passwordCriteria.number ? "text-green-400" : "text-slate-500"
                      }`}>
                        {passwordCriteria.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        Number
                      </div>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => {
                    setAgreeTerms(checked as boolean);
                    if (errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
                  }}
                  className={`mt-1 border-slate-600 data-[state=checked]:bg-slate-600 data-[state=checked]:border-slate-600 ${errors.terms ? "border-red-500" : ""}`} 
                />
                <Label htmlFor="terms" className="text-sm text-slate-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-slate-400 hover:text-slate-300">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-slate-400 hover:text-slate-300">Privacy Policy</Link>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-red-400 text-xs -mt-2">{errors.terms}</p>
              )}

              <Button 
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#1a1a1a] px-4 text-slate-500">or sign up with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="bg-[#0f0f0f] border-slate-700 text-white hover:bg-slate-800 py-6">
                  <Chrome className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="bg-[#0f0f0f] border-slate-700 text-white hover:bg-slate-800 py-6">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 2.827-1.432.721-3.571.592-4.392.452.119-.865.463-1.415.846-1.741-1.162-.132-2.386-.581-2.387-2.647 0-1.488 1.011-2.787 2.635-3.868-.264-.615-.626-1.353-.627-2.396 0-1.093.393-1.988 1.038-2.688l.04-.025c.665-.39 1.372-.593 2.109-.593 1.055 0 2.007.34 2.792.879.775-.298 1.707-.536 2.645-.536 1.98 0 3.346.768 3.926 1.883.593.977.926 2.256.926 3.684 0 1.037-.352 2.686-.652 3.299.568.195 1.092.605 1.092 1.75v2.923c0 .321.196.696.794.577 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Button>
                <Button variant="outline" className="bg-[#0f0f0f] border-slate-700 text-white hover:bg-slate-800 py-6">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.756-.027-3.02-1.906-3.02-1.875 0-2.175 1.44-2.175 2.929v5.66H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-400 hover:text-slate-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
