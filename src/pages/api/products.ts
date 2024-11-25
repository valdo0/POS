import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar autenticación
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  switch (req.method) {
    case 'GET':
      return await getProducts(req, res);
    case 'POST': 
      return await createProduct(req, res);
    case 'PUT':
      return await updateProduct(req, res);
    case 'DELETE':
      return await deleteProduct(req, res);
    default:
      return res.status(405).json({ error: 'Método no permitido' });
  }
}

// Obtener productos
async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ error: 'Error al obtener los productos' });
  }
}

// Crear producto
async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, price } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });
    return res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res.status(500).json({ error: 'Error al crear el producto' });
  }
}

// Actualizar producto
async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, description, price } = req.body;
    
    // Primero verificamos si el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
      },
    });
    return res.status(200).json({ product: updatedProduct });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

// Eliminar producto
async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    // Primero verificamos si el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    return res.status(200).json({ 
      message: 'Producto eliminado', 
      product: deletedProduct 
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}
