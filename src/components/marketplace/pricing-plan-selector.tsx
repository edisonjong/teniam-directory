"use client";

import { useState } from "react";
import { Check, ExternalLink, ShieldCheck } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"; // Import Dialog components

export default function PricingPlanSelector() {
  const plans = [
    {
      value: "basic",
      name: "Basic",
      description: "Essential features for individuals",
      price: "Free",
      originalPrice: null,
    },
    {
      value: "pro",
      name: "Pro",
      description: "Advanced tools for growing teams",
      price: "$119",
      originalPrice: "$149",
    },
    {
      value: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: "$239",
      originalPrice: "$299",
    },
  ];

  const explorationFeatures = [
    "Magazine",
    "Functional Sidebar",
    "Posts Grid",
    "Co-Authors",
    "Ghost 5",
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0].value);
  const [showLicenseAgreement, setShowLicenseAgreement] = useState(false); // New state for modal

  const getButtonText = () => {
    const plan = plans.find((p) => p.value === selectedPlan);
    if (!plan) return "Purchase"; // Fallback

    if (plan.price === "Free") {
      return "Purchase for Free";
    } else {
      return `Purchase - ${plan.price}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-muted/50 p-4 ">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-8 p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight">Select Plan</h2>

          <RadioGroup
            defaultValue={selectedPlan}
            onValueChange={setSelectedPlan}
            className="grid gap-4"
          >
            {plans.map((plan) => (
              <div key={plan.value}>
                <RadioGroupItem
                  value={plan.value}
                  id={plan.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={plan.value}
                  className="group flex items-start justify-between rounded-xl border-2 border-input bg-background p-6 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary-foreground"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <span className="text-lg font-semibold">{plan.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {plan.description}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Features:</h2>
            <div className="flex flex-wrap gap-2">
              {explorationFeatures.map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full"
                >
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <Button variant="outline" className="w-full py-6 text-lg" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Live Demo
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button className="w-full py-6 text-lg">{getButtonText()}</Button>
          </div>

          <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              14-Day Money-Back Guarantee
            </div>
            <Button
              variant="link"
              className="h-auto p-0 text-blue-600 hover:text-blue-700 underline mt-1"
              onClick={() => setShowLicenseAgreement(true)}
            >
              License Agreement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* License Agreement Dialog */}
      <Dialog
        open={showLicenseAgreement}
        onOpenChange={setShowLicenseAgreement}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>License Agreement</DialogTitle>
            <DialogDescription>
              Please read the terms and conditions carefully before proceeding.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-muted-foreground space-y-4">
            <p>
              This License Agreement ("Agreement") is a legal agreement between
              you ("Licensee") and [Your Company Name] ("Licensor") for the use
              of the software product ("Software"). By accessing or using the
              Software, you agree to be bound by the terms and conditions of
              this Agreement.
            </p>
            <p>
              <strong>1. Grant of License:</strong> Licensor grants Licensee a
              non-exclusive, non-transferable, revocable license to use the
              Software for personal or internal business purposes, subject to
              the terms herein.
            </p>
            <p>
              <strong>2. Restrictions:</strong> Licensee shall not: (a) modify,
              adapt, translate, or create derivative works based on the
              Software; (b) reverse engineer, decompile, disassemble, or
              otherwise attempt to discover the source code of the Software; (c)
              rent, lease, sell, sublicense, assign, or transfer rights in the
              Software; (d) remove any proprietary notices or labels on the
              Software.
            </p>
            <p>
              <strong>3. Intellectual Property:</strong> All rights, title, and
              interest in and to the Software, including all intellectual
              property rights, are and shall remain with Licensor.
            </p>
            <p>
              <strong>4. Termination:</strong> This Agreement is effective until
              terminated. Licensor may terminate this Agreement immediately if
              Licensee breaches any of its terms. Upon termination, Licensee
              must cease all use of the Software.
            </p>
            <p>
              <strong>5. Disclaimer of Warranty:</strong> THE SOFTWARE IS
              PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NONINFRINGEMENT.
            </p>
            <p>
              <strong>6. Limitation of Liability:</strong> IN NO EVENT SHALL
              LICENSOR BE LIABLE FOR ANY DAMAGES (INCLUDING, WITHOUT LIMITATION,
              LOST PROFITS, BUSINESS INTERRUPTION, OR LOST INFORMATION) ARISING
              OUT OF LICENSEE'S USE OF OR INABILITY TO USE THE SOFTWARE.
            </p>
            <p>
              <strong>7. Governing Law:</strong> This Agreement shall be
              governed by the laws of [Your Country/State], without regard to
              its conflict of laws principles.
            </p>
            <p>
              By clicking "I Agree" or by using the Software, you acknowledge
              that you have read this Agreement, understand it, and agree to be
              bound by its terms and conditions.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
