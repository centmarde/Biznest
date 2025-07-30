import React from "react";
import DefaultLayout from "@/layout/default";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const LotForLeaseForm: React.FC = () => {
  const theme = useTheme();

  return (
    <DefaultLayout>
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: theme.colors.background }}
      >
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>List Your Lot for Lease</CardTitle>
            <CardDescription>
              Fill out the form below to list your property.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="lot-title">Lot Title</Label>
                <Input id="lot-title" placeholder="e.g. Commercial Lot in Downtown" />
              </div>
              <div>
                <Label htmlFor="lot-description">Description</Label>
                <Textarea id="lot-description" placeholder="Describe your lot, its features, and nearby landmarks." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lot-size">Lot Size (sqm)</Label>
                  <Input id="lot-size" type="number" placeholder="e.g. 500" />
                </div>
                <div>
                  <Label htmlFor="monthly-rent">Monthly Rent (PHP)</Label>
                  <Input id="monthly-rent" type="number" placeholder="e.g. 25000" />
                </div>
              </div>
              <Button className="mt-4 w-full">Submit Listing</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default LotForLeaseForm;
