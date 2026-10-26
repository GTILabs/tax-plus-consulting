import Image from "next/image";
import Link from "next/link";
import { ForgotForm } from "./ForgotForm";

export const metadata = { title: "Lupa kata sandi" };

export default function ForgotPage() {
  return (
    <div className="adm-login">
      <div className="adm-card">
        <Image src="/images/logo.png" alt="TaxPlus Consulting" width={150} height={48} />
        <h1>Lupa kata sandi</h1>
        <p className="adm-muted" style={{ marginBottom: 22 }}>
          Masukkan email akun admin Anda. Kami kirim tautan untuk mengatur ulang kata sandi.
        </p>
        <ForgotForm />
        <p className="adm-login-alt">
          <Link href="/admin/login">← Kembali ke halaman masuk</Link>
        </p>
      </div>
    </div>
  );
}
