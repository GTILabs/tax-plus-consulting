import Image from "next/image";
import Link from "next/link";
import { ResetForm } from "./ResetForm";

export const metadata = { title: "Atur ulang kata sandi" };

export default async function ResetPage({ searchParams }: PageProps<"/admin/reset">) {
  const { token } = await searchParams;
  return (
    <div className="adm-login">
      <div className="adm-card">
        <Image src="/images/logo.png" alt="TaxPlus Consulting" width={150} height={48} />
        <h1>Atur ulang kata sandi</h1>
        {typeof token === "string" && token ? (
          <>
            <p className="adm-muted" style={{ marginBottom: 22 }}>
              Buat kata sandi baru. Setelah disimpan, semua perangkat lain akan dikeluarkan.
            </p>
            <ResetForm token={token} />
          </>
        ) : (
          <p className="adm-msg err" style={{ marginTop: 12 }}>
            Tautan tidak lengkap. Buka tautan dari email, atau minta tautan baru.
          </p>
        )}
        <p className="adm-login-alt">
          <Link href="/admin/forgot">Minta tautan baru</Link>
        </p>
      </div>
    </div>
  );
}
