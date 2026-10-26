import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ActionForm } from "@/components/admin/ActionForm";
import { PageHead } from "@/components/admin/PageHead";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { deleteAdminUser, resendInvite, updateAdminUser } from "@/modules/admin/actions";
import { can, canDeleteUser, roleLabel, ROLES } from "@/modules/admin/roles";
import { requireAdmin } from "@/modules/admin/session";

export const metadata = { title: "Edit pengguna" };

const UUID = /^[0-9a-f-]{36}$/i;
const dateFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });

export default async function EditUserPage({ params }: PageProps<"/admin/users/[id]">) {
  const admin = await requireAdmin("users.view");
  const manage = can(admin.role, "users");
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const [user] = await getDb().select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  if (!user) notFound();
  const self = user.id === admin.id;
  const deletable = canDeleteUser(admin, user);
  return (
    <>
      <PageHead title={user.name} sub={user.email} crumbs={[{ href: "/admin/users", label: "Pengguna" }]} />
      <div className="adm-detail">
        <div className="adm-card">
          {manage ? (
            <ActionForm action={updateAdminUser} submitLabel="Simpan">
              <input type="hidden" name="id" value={user.id} />
              <div className="adm-row">
                <div className="adm-field">
                  <label htmlFor="name">Nama</label>
                  <input id="name" name="name" type="text" defaultValue={user.name} required />
                </div>
                <div className="adm-field">
                  <label htmlFor="phone">No HP</label>
                  <input id="phone" name="phone" type="tel" inputMode="tel" defaultValue={user.phone ?? ""} placeholder="0812-3456-7890" />
                </div>
              </div>
              <fieldset className="adm-roles">
                <legend>Role</legend>
                {ROLES.map((r) => (
                  <label key={r.value} className="adm-role">
                    <input type="radio" name="role" value={r.value} defaultChecked={user.role === r.value} disabled={self && r.value !== "super_admin"} />
                    <span>
                      <b>{r.label}</b>
                      <small>{r.description}</small>
                    </span>
                  </label>
                ))}
              </fieldset>
              {self && <p className="hint adm-muted">Role akun sendiri tidak bisa diturunkan.</p>}
            </ActionForm>
          ) : (
            <dl className="adm-dl">
              <div>
                <dt>Nama</dt>
                <dd>{user.name}</dd>
              </div>
              <div>
                <dt>No HP</dt>
                <dd>{user.phone ?? "—"}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{roleLabel(user.role)}</dd>
              </div>
            </dl>
          )}
        </div>
        <div className="adm-card">
          <h2>Akun</h2>
          <dl className="adm-dl" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <dt>Status</dt>
              <dd>{user.activatedAt ? `Aktif sejak ${dateFmt.format(user.activatedAt)}` : "Belum aktivasi"}</dd>
            </div>
            <div>
              <dt>Terakhir masuk</dt>
              <dd>{user.lastLoginAt ? dateFmt.format(user.lastLoginAt) : "Belum pernah"}</dd>
            </div>
          </dl>
          {manage && !user.activatedAt && (
            <form action={resendInvite.bind(null, user.id)} style={{ marginTop: 16 }}>
              <button className="adm-btn gold" style={{ width: "100%" }}>
                Kirim ulang undangan
              </button>
              <p className="hint adm-muted" style={{ marginTop: 6, fontSize: 13 }}>
                Tautan baru berlaku 8 jam; tautan lama tidak berlaku lagi.
              </p>
            </form>
          )}
          {deletable && (
            <>
              <hr className="adm-hr" />
              <form action={deleteAdminUser}>
                <input type="hidden" name="id" value={user.id} />
                <button className="adm-btn danger sm">Hapus pengguna</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
