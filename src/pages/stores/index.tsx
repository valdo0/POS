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
import { useState, useEffect } from "react";
import CreateStore from "@/components/create-store";
import AuthLayout from "@/components/authLayouth";
import { useTranslations} from "next-intl";

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export default function StoresPage() {
  const [open, setOpen] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [refresh, setRefresh] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/api/stores');
        const data = await response.json();
        if (data.stores) {
          setStores(data.stores);
        }
      } catch (error) {
        console.error('Error al cargar las tiendas:', error);
      }
    };

    fetchStores();
  }, [refresh]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("storeName")}</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />{t("addStore")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardHeader>
              <CardTitle>{store.name}</CardTitle>
              <CardDescription>Address: {store.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{t("phone")}</p>
                  <p className="font-medium">{store.phone}</p>
                </div>
                <Button variant="outline">{t("detail")}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateStore         
      open={open} 
        onClose={() => setOpen(false)} 
        onSuccess={() => {
          setRefresh(prev => prev + 1);
          setOpen(false);
        }} />
    </>
  );
}

StoresPage.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
);