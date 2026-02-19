"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Chrome, Linkedin } from "lucide-react";

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleSignup = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">K</span>
          </div>
          <h1 className="text-2xl font-semibold text-white">Create an account</h1>
          <p className="text-slate-400 mt-2">Start your 14-day free trial</p>
        </div>

        <Card className="bg-[#1a1a1a] border-slate-800">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">First name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John"
                    className="bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">Last name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe"
                    className="bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Work email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@company.com"
                  className="bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="bg-[#0f0f0f] border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500">Must be at least 8 characters</p>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <Checkbox id="terms" className="mt-1 border-slate-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600" />
                <Label htmlFor="terms" className="text-sm text-slate-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                </Label>
              </div>

              {/* Create Account Button */}
              <Button 
                onClick={handleSignup}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
              >
                Create account
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#1a1a1a] px-4 text-slate-500">or sign up with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="bg-[#0f0f0f] border-slate-700 text-white hover:bg-slate-800 py-6">
                  <Chrome className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="bg-[#0f0f0f] border-slate-700 text-white hover:bg-slate-800 py-6">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.756-.027-3.02-1.906-3.02-1.875 0-2.175 1.44-2.175 2.929v5.66H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
                <Button variant="outline" className="bg-[#0f0f0f] border-slate-700 text-white hover:bg-slate-800 py-6">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
