import { ActionForm } from "@/components/admin/ActionForm";
import { PageHead } from "@/components/admin/PageHead";
import { PasswordInput } from "@/components/admin/PasswordInput";
import { changePassword, updateProfile } from "@/modules/admin/actions";
import { MIN_PASSWORD_LENGTH } from "@/modules/admin/password";
import { roleLabel } from "@/modules/admin/roles";
import { requireAdmin } from "@/modules/admin/session";

export const metadata = { title: "Akun saya" };

export default async function AccountPage() {
  const admin = await requireAdmin();
  return (
    <>
      <PageHead title="Akun saya" sub={`${admin.email} · ${roleLabel(admin.role)}`} />
      <div className="adm-card" style={{ maxWidth: 560 }}>
        <h2>Profil</h2>
        <ActionForm action={updateProfile} submitLabel="Simpan profil">
          <div className="adm-field">
            <label htmlFor="name">Nama</label>
            <input id="name" name="name" type="text" defaultValue={admin.name} required />
          </div>
          <div className="adm-field">
            <label htmlFor="phone">No HP</label>
            <input id="phone" name="phone" type="tel" inputMode="tel" defaultValue={admin.phone ?? ""} placeholder="0812-3456-7890" />
          </div>
        </ActionForm>
      </div>
      <div className="adm-card" style={{ maxWidth: 560 }}>
        <h2>Ganti kata sandi</h2>
        <ActionForm action={changePassword} submitLabel="Simpan kata sandi">
          <div className="adm-field">
            <label htmlFor="current">Kata sandi saat ini</label>
            <PasswordInput id="current" name="current" autoComplete="current-password" required />
          </div>
          <div className="adm-field">
            <label htmlFor="password">Kata sandi baru</label>
            <PasswordInput id="password" name="password" minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" required />
            <span className="hint">Minimal {MIN_PASSWORD_LENGTH} karakter.</span>
          </div>
          <div className="adm-field">
            <label htmlFor="confirm">Ulangi kata sandi baru</label>
            <PasswordInput id="confirm" name="confirm" autoComplete="new-password" required />
          </div>
        </ActionForm>
      </div>
    </>
  );
}
