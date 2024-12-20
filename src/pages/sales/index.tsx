"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/components/authLayouth";

export default function StoresPage() {

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Stores</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Name</CardTitle>
            <CardDescription>Address: 123 Main St</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Phone:</p>
                <p className="font-medium">+1 234 567 890</p>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </>
  );
}

StoresPage.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
);