import { ActionForm } from "@/components/admin/ActionForm";
import { PageHead } from "@/components/admin/PageHead";
import { changePassword } from "@/modules/admin/actions";
import { MIN_PASSWORD_LENGTH } from "@/modules/admin/password";
import { requireAdmin } from "@/modules/admin/session";

export const metadata = { title: "Akun saya" };

export default async function AccountPage() {
  const admin = await requireAdmin();
  return (
    <>
      <PageHead title="Akun saya" sub={`${admin.name} · ${admin.email}`} />
      <div className="adm-card" style={{ maxWidth: 560 }}>
        <h2>Ganti kata sandi</h2>
        <ActionForm action={changePassword} submitLabel="Simpan kata sandi">
          <div className="adm-field">
            <label htmlFor="current">Kata sandi saat ini</label>
            <input id="current" name="current" type="password" autoComplete="current-password" required />
          </div>
          <div className="adm-field">
            <label htmlFor="password">Kata sandi baru</label>
            <input id="password" name="password" type="password" minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" required />
            <span className="hint">Minimal {MIN_PASSWORD_LENGTH} karakter.</span>
          </div>
          <div className="adm-field">
            <label htmlFor="confirm">Ulangi kata sandi baru</label>
            <input id="confirm" name="confirm" type="password" autoComplete="new-password" required />
          </div>
        </ActionForm>
      </div>
    </>
  );
}
