import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!session) {
    router.push("/auth/");
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;