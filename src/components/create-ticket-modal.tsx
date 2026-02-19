"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ticket,
  Mail,
  User,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormErrors {
  subject?: string;
  description?: string;
  priority?: string;
  clientEmail?: string;
}

export function CreateTicketModal({ open, onOpenChange }: CreateTicketModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "medium",
    clientEmail: "",
    clientName: "",
    assignedAgent: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "Subject must be less than 100 characters";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    // Priority validation
    if (!formData.priority) {
      newErrors.priority = "Please select a priority";
    }

    // Client email validation
    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = "Client email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement;
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Ticket created successfully",
      description: `Ticket #${Math.floor(Math.random() * 9000) + 1000} has been created`,
      variant: "success",
    });

    // Reset form
    setFormData({
      subject: "",
      description: "",
      priority: "medium",
      clientEmail: "",
      clientName: "",
      assignedAgent: "",
    });
    setErrors({});
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({
      subject: "",
      description: "",
      priority: "medium",
      clientEmail: "",
      clientName: "",
      assignedAgent: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Ticket className="h-5 w-5 text-purple-600" />
            </div>
            Create New Ticket
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create a new support ticket.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="subject"
                placeholder="Brief description of the issue"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (errors.subject) {
                    setErrors({ ...errors, subject: undefined });
                  }
                }}
                aria-invalid={!!errors.subject}
                className={errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.subject && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.subject && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.subject}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Detailed description of the issue..."
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) {
                  setErrors({ ...errors, description: undefined });
                }
              }}
              aria-invalid={!!errors.description}
              className={errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.description}
              </p>
            )}
            <p className="text-xs text-slate-500 text-right">
              {formData.description.length} / 2000 characters
            </p>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">
              Priority <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => {
                setFormData({ ...formData, priority: value });
                if (errors.priority) {
                  setErrors({ ...errors, priority: undefined });
                }
              }}
            >
              <SelectTrigger 
                id="priority" 
                className={errors.priority ? "border-red-500 focus-visible:ring-red-500" : ""}
                aria-invalid={!!errors.priority}
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Low
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Medium
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    High
                  </div>
                </SelectItem>
                <SelectItem value="urgent">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-700 animate-pulse" />
                    Urgent
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.priority}
              </p>
            )}
          </div>

          {/* Client Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="clientName"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">
                Client Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="client@example.com"
                  className={`pl-10 ${errors.clientEmail ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  value={formData.clientEmail}
                  onChange={(e) => {
                    setFormData({ ...formData, clientEmail: e.target.value });
                    if (errors.clientEmail) {
                      setErrors({ ...errors, clientEmail: undefined });
                    }
                  }}
                  aria-invalid={!!errors.clientEmail}
                />
                {errors.clientEmail && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                )}
              </div>
              {errors.clientEmail && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.clientEmail}
                </p>
              )}
            </div>
          </div>

          {/* Assigned Agent */}
          <div className="space-y-2">
            <Label htmlFor="assignedAgent">Assign To</Label>
            <Select
              value={formData.assignedAgent}
              onValueChange={(value) => setFormData({ ...formData, assignedAgent: value })}
            >
              <SelectTrigger id="assignedAgent">
                <SelectValue placeholder="Auto-assign or select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-assign</SelectItem>
                <SelectItem value="sarah">Sarah Mitchell</SelectItem>
                <SelectItem value="john">John Davidson</SelectItem>
                <SelectItem value="emily">Emily Roberts</SelectItem>
                <SelectItem value="mike">Mike Thompson</SelectItem>
                <SelectItem value="lisa">Lisa Anderson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Ticket className="h-4 w-4" />
                  Create Ticket
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
