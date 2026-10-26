import { and, asc, eq, isNull, max } from "drizzle-orm";
import Link from "next/link";
import { ActionForm } from "@/components/admin/ActionForm";
import { PageHead } from "@/components/admin/PageHead";
import { getDb } from "@/lib/db";
import { adminPasswordResets, adminUsers } from "@/lib/db/schema";
import { inviteAdminUser } from "@/modules/admin/actions";
import { roleLabel, ROLES } from "@/modules/admin/roles";
import { requireAdmin } from "@/modules/admin/session";

export const metadata = { title: "Pengguna" };

const dateFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });

const ROLE_PILL = { super_admin: "adm-pill new", admin: "adm-pill on", user: "adm-pill" } as const;

export default async function UsersPage() {
  const admin = await requireAdmin("users");
  const db = getDb();
  const [users, invites] = await Promise.all([
    db
      .select({
        id: adminUsers.id,
        name: adminUsers.name,
        email: adminUsers.email,
        phone: adminUsers.phone,
        role: adminUsers.role,
        activatedAt: adminUsers.activatedAt,
        lastLoginAt: adminUsers.lastLoginAt,
      })
      .from(adminUsers)
      .orderBy(asc(adminUsers.createdAt)),
    db
      .select({ userId: adminPasswordResets.userId, expiresAt: max(adminPasswordResets.expiresAt) })
      .from(adminPasswordResets)
      .where(and(eq(adminPasswordResets.kind, "invite"), isNull(adminPasswordResets.usedAt)))
      .groupBy(adminPasswordResets.userId),
  ]);
  const inviteExpiry = new Map(invites.map((i) => [i.userId, i.expiresAt]));
  const now = new Date();

  return (
    <>
      <PageHead title="Pengguna" sub="Undang tim TaxPlus untuk mengelola situs dan atur role masing-masing." />
      <div className="adm-scroll">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>No HP</th>
              <th>Role</th>
              <th>Status</th>
              <th>Terakhir masuk</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const expires = inviteExpiry.get(u.id);
              const status = u.activatedAt
                ? { label: "Aktif", cls: "adm-pill on" }
                : expires && expires > now
                  ? { label: "Menunggu aktivasi", cls: "adm-pill warn", note: `Tautan berlaku s.d. ${dateFmt.format(expires)}` }
                  : { label: "Undangan kedaluwarsa", cls: "adm-pill err", note: "Kirim ulang dari halaman pengguna" };
              return (
                <tr key={u.id}>
                  <td className="t-main">
                    <Link href={`/admin/users/${u.id}`}>{u.name}</Link> {u.id === admin.id && <span className="adm-pill new">Anda</span>}
                    <div className="adm-muted">{u.email}</div>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{u.phone ?? <span className="adm-muted">—</span>}</td>
                  <td>
                    <span className={ROLE_PILL[u.role]}>{roleLabel(u.role)}</span>
                  </td>
                  <td>
                    <span className={status.cls} style={{ whiteSpace: "nowrap" }}>
                      {status.label}
                    </span>
                    {"note" in status && <div className="adm-muted adm-small">{status.note}</div>}
                  </td>
                  <td className="adm-muted" style={{ whiteSpace: "nowrap" }}>
                    {u.lastLoginAt ? dateFmt.format(u.lastLoginAt) : "Belum pernah"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="adm-card" style={{ marginTop: 22 }}>
        <h2>Undang pengguna</h2>
        <p className="adm-muted" style={{ marginBottom: 16 }}>
          Kami kirim email berisi tautan aktivasi yang berlaku 8 jam. Penerima membuat kata sandinya sendiri.
        </p>
        <ActionForm action={inviteAdminUser} submitLabel="Kirim undangan">
          <div className="adm-row">
            <div className="adm-field">
              <label htmlFor="name">Nama</label>
              <input id="name" name="name" type="text" autoComplete="off" required />
            </div>
            <div className="adm-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="off" required />
            </div>
            <div className="adm-field">
              <label htmlFor="phone">No HP</label>
              <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="0812-3456-7890" required />
            </div>
          </div>
          <fieldset className="adm-roles">
            <legend>Role</legend>
            {ROLES.map((r, i) => (
              <label key={r.value} className="adm-role">
                <input type="radio" name="role" value={r.value} defaultChecked={i === 0} />
                <span>
                  <b>{r.label}</b>
                  <small>{r.description}</small>
                </span>
              </label>
            ))}
          </fieldset>
        </ActionForm>
      </div>
    </>
  );
}
