import Image from "next/image";
import { inviteeFor } from "@/modules/admin/tokens";
import { ActivateForm } from "./ActivateForm";

export const metadata = { title: "Aktifkan akun" };

export default async function ActivatePage({ searchParams }: PageProps<"/admin/activate">) {
  const { token } = await searchParams;
  const invitee = typeof token === "string" && token ? await inviteeFor(token) : null;
  return (
    <div className="adm-login">
      <div className="adm-card">
        <Image src="/images/logo.png" alt="TaxPlus Consulting" width={150} height={48} />
        <h1>Aktifkan akun</h1>
        {invitee && typeof token === "string" ? (
          <>
            <p className="adm-muted" style={{ marginBottom: 22 }}>
              Halo {invitee.name.split(" ")[0]}, buat kata sandi untuk <b>{invitee.email}</b>.
            </p>
            <ActivateForm token={token} />
          </>
        ) : (
          <p className="adm-msg err" style={{ marginTop: 12 }}>
            Tautan aktivasi tidak valid, sudah kedaluwarsa (berlaku 8 jam), atau sudah dipakai. Minta super admin mengirim ulang undangan.
          </p>
        )}
      </div>
    </div>
  );
}
