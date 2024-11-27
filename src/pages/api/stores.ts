import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar autenticación
  //const session = await getServerSession(req, res, authOptions);
  //if (!session) {
   // return res.status(401).json({ error: 'No autorizado' });
 // }

  switch (req.method) {
    case 'GET':
      return await getStores(req, res);
    case 'POST':
      return await createStore(req, res);
    case 'PUT':
      return await updateStore(req, res);
    case 'DELETE':
      return await deleteStore(req, res);
    default:
      return res.status(405).json({ error: 'Método no permitido' });
  }
}

// Obtener tiendas
async function getStores(req: NextApiRequest, res: NextApiResponse) {
  try {
    const stores = await prisma.store.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.status(200).json({ stores });
  } catch (error) {
    console.error("Error al obtener las tiendas:", error);
    return res.status(500).json({ error: 'Error al obtener las tiendas' });
  }
}

// Crear tienda
async function createStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, address, phone } = req.body;
    const newStore = await prisma.store.create({
      data: {
        name,
        address,
        phone,
      },
    });
    return res.status(201).json({ store: newStore });
  } catch (error) {
    console.error("Error al crear la tienda:", error);
    return res.status(500).json({ error: 'Error al crear la tienda' });
  }
}

// Actualizar tienda
async function updateStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, address, phone } = req.body;
    const updatedStore = await prisma.store.update({
      where: { id },
      data: {
        name,
        address,
        phone,
      },
    });
    return res.status(200).json({ store: updatedStore });
  } catch (error) {
    console.error("Error al actualizar la tienda:", error);
    return res.status(500).json({ error: 'Error al actualizar la tienda' });
  }
}

// Eliminar tienda
async function deleteStore(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    await prisma.store.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Tienda eliminada exitosamente' });
  } catch (error) {
    console.error("Error al eliminar la tienda:", error);
    return res.status(500).json({ error: 'Error al eliminar la tienda' });
  }
}
