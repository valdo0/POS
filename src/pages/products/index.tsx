"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateProduct from "@/components/create-product";
import ProductList from "@/components/product-list";
import AuthLayout from "@/components/authLayouth";
import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("products")}</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t("addProduct")}
        </Button>
      </div>

      <div className="mt-6">
        {/* Pasar refresh como prop */}
        <ProductList key={refresh} />
      </div>

      {/* Añadir onSuccess para actualizar refresh */}
      <CreateProduct 
        open={open} 
        onClose={() => setOpen(false)} 
        onSuccess={() => {
          setRefresh(prev => prev + 1);
          setOpen(false);
        }}
      />
    </>
  );
}
ProductsPage.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
);
