import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config"; // Importa la configuración de i18n

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n, // Agrega soporte para internacionalización
};

export default nextConfig;
