"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateStore from "@/components/create-store";
import AuthLayout from "@/components/authLayouth";
import { useTranslations} from "next-intl";
export default function StoresPage() {
  const [open, setOpen] = useState(false);
  const  t  = useTranslations();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("storeName")}</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />{t("addStore")}
        </Button>
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
                <p className="text-sm text-muted-foreground">{t("phone")}</p>
                <p className="font-medium">+1 234 567 890</p>
              </div>
              <Button variant="outline">{t("detail")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateStore open={open} onClose={() => setOpen(false)} />
    </>
  );
}

StoresPage.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
);