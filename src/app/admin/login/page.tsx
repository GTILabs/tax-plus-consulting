import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/modules/admin/session";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Masuk" };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await getCurrentAdmin()) redirect("/admin");
  const { next } = await searchParams;
  return (
    <div className="adm-login">
      <div className="adm-card">
        <Image src="/images/logo.png" alt="TaxPlus Consulting" width={150} height={48} />
        <h1>Masuk ke admin</h1>
        <p className="adm-muted" style={{ marginBottom: 22 }}>
          Kelola konten situs TaxPlus Consulting.
        </p>
        <LoginForm next={typeof next === "string" ? next : "/admin"} />
      </div>
    </div>
  );
}
