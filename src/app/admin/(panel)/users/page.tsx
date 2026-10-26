import { asc } from "drizzle-orm";
import { ActionForm } from "@/components/admin/ActionForm";
import { PageHead } from "@/components/admin/PageHead";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { createAdminUser, deleteAdminUser } from "@/modules/admin/actions";
import { MIN_PASSWORD_LENGTH } from "@/modules/admin/password";
import { requireAdmin } from "@/modules/admin/session";

export const metadata = { title: "Pengguna admin" };

const dateFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });

export default async function UsersPage() {
  const admin = await requireAdmin();
  const users = await getDb()
    .select({ id: adminUsers.id, name: adminUsers.name, email: adminUsers.email, lastLoginAt: adminUsers.lastLoginAt })
    .from(adminUsers)
    .orderBy(asc(adminUsers.createdAt));
  return (
    <>
      <PageHead title="Pengguna admin" sub="Semua pengguna di sini bisa mengubah seluruh konten situs." />
      <div className="adm-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Terakhir masuk</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="t-main">
                  <b>{u.name}</b> {u.id === admin.id && <span className="adm-pill new">Anda</span>}
                </td>
                <td>{u.email}</td>
                <td className="adm-muted">{u.lastLoginAt ? dateFmt.format(u.lastLoginAt) : "Belum pernah"}</td>
                <td className="t-act">
                  {u.id !== admin.id && (
                    <form action={deleteAdminUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button className="adm-btn danger sm">Hapus</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="adm-card" style={{ marginTop: 22 }}>
        <h2>Tambah pengguna</h2>
        <ActionForm action={createAdminUser} submitLabel="Tambah pengguna">
          <div className="adm-row">
            <div className="adm-field">
              <label htmlFor="name">Nama</label>
              <input id="name" name="name" type="text" required />
            </div>
            <div className="adm-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="adm-field">
              <label htmlFor="password">Kata sandi awal</label>
              <input id="password" name="password" type="password" minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" required />
              <span className="hint">Minimal {MIN_PASSWORD_LENGTH} karakter. Minta pengguna menggantinya setelah masuk.</span>
            </div>
          </div>
        </ActionForm>
      </div>
    </>
  );
}
