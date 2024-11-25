"use client";

import { cn } from "../../lib/utils";
import { Building2, Home, Package, Receipt, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname} from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useRouter as useNextRouter } from "next/router";
import { signOut } from "next-auth/react";

const routes = [
  {
    labelKey: "dashboard",
    icon: Home,
    href: "/",
    color: "text-sky-500",
  },
  {
    labelKey: "stores",
    icon: Building2,
    href: "/stores",
    color: "text-violet-500",
  },
  {
    labelKey: "products",
    icon: Package,
    href: "/products",
    color: "text-pink-700",
  },
  {
    labelKey: "sales",
    icon: Receipt,
    color: "text-orange-700",
    href: "/sales",
  },
  {
    labelKey: "users",
    icon: Users,
    href: "/users",
    color: "text-emerald-500",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const nextRouter = useNextRouter();
  const t = useTranslations();
  const locale = useLocale();

  const changeLanguage = (newLocale: string) => {
    nextRouter.push(pathname, pathname, { locale: newLocale });
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth' });
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              locale={locale}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                route.href === pathname
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              <route.icon className={cn("h-4 w-4 mr-2", route.color)} />
              {t(route.labelKey)}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => changeLanguage('es')}
            className={`px-3 py-1 text-sm rounded-md ${
              locale === 'es' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 text-sm rounded-md ${
              locale === 'en'
                ? 'bg-black text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            EN
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 ml-4"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </button>
        </div>
      </div>
    </nav>
  );
}
