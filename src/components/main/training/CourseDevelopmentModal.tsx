"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, PlayCircle, Sparkles } from "lucide-react";

interface CourseDevelopmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseDevelopmentModal({
  open,
  onOpenChange,
}: CourseDevelopmentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-border/50">
        <div className="relative">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />

          <div className="relative p-8 sm:p-10">
            {/* Icon section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative bg-primary/10 p-5 rounded-2xl border border-primary/20">
                  <PlayCircle
                    className="w-12 h-12 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>

            <DialogHeader className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-dashboard-primary" />
                <span className="text-sm font-medium text-dashboard-primary uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>

              <DialogTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                Video Course in underdevelopment
              </DialogTitle>

              <DialogDescription className="text-base text-muted-foreground leading-relaxed text-pretty max-w-md mx-auto">
                We&apos;re crafting an exceptional learning experience for you.
                Our comprehensive video course is currently under development
                and will be launching soon.
              </DialogDescription>
            </DialogHeader>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Expert Content</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    High-quality lessons
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50">
                <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Practical Skills</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Real-world projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
