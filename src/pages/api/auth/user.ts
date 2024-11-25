/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case 'POST':
      return await createUser(req, res);
    case 'PUT':
      return await updateUser(req, res);
    case 'DELETE':
      return await deleteUser(req, res);
    default:
      return res.status(405).json({ error: 'Método no permitido' });
  }
}

// Crear usuario
async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, password, role, branchId } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        branchId
      },
    });
    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

// Actualizar usuario
async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, name, email, password, role, branchId } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        role,
        branchId
      },
    });
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}

// Eliminar usuario
async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    await prisma.user.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}
