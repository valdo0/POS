// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    res.status(200).json({ name: "John Doe" });
  } else if (req.method === 'POST') {
    try {
      const { name } = req.body;
      // Aquí iría la lógica para crear un nuevo recurso
      res.status(201).json({ name, message: 'Recurso creado exitosamente' });
    } catch (error) {
      console.error("Error al crear el recurso:", error);
      res.status(500).json({ name: '', error: `Error al crear el recurso: ${error}` });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name } = req.body;
      // Aquí iría la lógica para actualizar un recurso
      res.status(200).json({ name, message: 'Recurso actualizado exitosamente' });
    } catch (error) {
      console.error("Error al actualizar el recurso:", error);
      res.status(500).json({ name: '', error: `Error al actualizar el recurso: ${error}` });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Aquí iría la lógica para eliminar un recurso
      res.status(200).json({ name: '', message: 'Recurso eliminado exitosamente' });
    } catch (error) {
      console.error("Error al eliminar el recurso:", error);
      res.status(500).json({ name: '', error: `Error al eliminar el recurso: ${error}` });
    }
  } else {
    res.status(405).json({ name: '', error: 'Método no permitido' });
  }
}
