"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const t = useTranslations();

  // Consumir la API para obtener productos
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products"); // Aquí ponemos la URL de la API
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products); // Suponiendo que el campo 'products' tiene los datos
        } else {
          console.error("Error al obtener productos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    fetchProducts();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  // Función para eliminar un producto
  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch("/api/products", {
        method: "DELETE", // El método DELETE se usa para eliminar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }), // Enviamos el ID del producto a eliminar
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualizamos el estado de los productos
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        console.log("Producto eliminado");
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("description")}</TableHead>
            <TableHead>{t("price")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id)} // Llamamos a handleDelete con el ID del producto
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No products available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
