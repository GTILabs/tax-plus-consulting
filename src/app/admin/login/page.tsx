import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin, IDLE_MINUTES } from "@/modules/admin/session";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Masuk" };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await getCurrentAdmin()) redirect("/admin");
  const { next, keluar } = await searchParams;
  return (
    <div className="adm-login">
      <div className="adm-card">
        <Image src="/images/logo.png" alt="TaxPlus Consulting" width={150} height={48} />
        <h1>Masuk ke admin</h1>
        <p className="adm-muted" style={{ marginBottom: 22 }}>
          Kelola konten situs TaxPlus Consulting.
        </p>
        {keluar === "idle" && (
          <p className="adm-msg ok" role="status" style={{ marginBottom: 16 }}>
            Anda keluar otomatis karena tidak ada aktivitas selama {IDLE_MINUTES} menit. Silakan masuk lagi.
          </p>
        )}
        <LoginForm next={typeof next === "string" ? next : "/admin"} />
        <p className="adm-login-alt">
          <Link href="/admin/forgot">Lupa kata sandi?</Link>
        </p>
      </div>
    </div>
  );
}
