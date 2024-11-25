import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter as useNextRouter } from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations();
  const locale = useLocale();
  const router = useNextRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/" + locale);
    }
  }, [session, router, locale]);

  const changeLanguage = (newLocale: string) => {
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        alert("Las credenciales ingresadas son incorrectas. Por favor, verifica tu correo y contraseña.");
      } else {
        router.push("/" + locale);
      }
    } catch (error) {
      alert("Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.");
      console.error("Error de inicio de sesión:", error);
    }
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-black flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">{t('welcome')}</h1>
        <div className="ml-4 flex gap-2">
          <button
            onClick={() => changeLanguage('es')}
            className={`px-3 py-1 text-sm rounded-md border border-white hover:bg-white hover:text-black ${
              locale === 'es' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 text-sm rounded-md border border-white hover:bg-white hover:text-black ${
              locale === 'en' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">{t('login')}</h2>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
            <input
              type="email"
              id="email"
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
            <input
              type="password"
              id="password"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 text-white bg-black rounded-md hover:bg-black-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
}
