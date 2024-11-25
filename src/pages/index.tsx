import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/authLayouth";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/auth");
    return null;
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Stores</CardTitle>
            <Store className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Total active stores
            </p>
            <Button asChild className="w-full mt-4">
              <Link href="/stores">Manage Stores</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
Home.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
);