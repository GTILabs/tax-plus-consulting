import { notFound } from "next/navigation";
import { EntryEditor } from "@/components/admin/cms/Editors";
import { PageHead } from "@/components/admin/PageHead";
import { can } from "@/modules/admin/roles";
import { requireAdmin } from "@/modules/admin/session";
import { publicUrlFor } from "@/modules/cms/admin-links";
import { collections, isCollectionKey, type CollectionDef } from "@/modules/cms/collections";
import { emptyData } from "@/modules/cms/fields";
import { getEntry } from "@/modules/cms/repo";

const UUID = /^[0-9a-f-]{36}$/i;

export const metadata = { title: "Edit" };

export default async function EditEntryPage({ params, searchParams }: PageProps<"/admin/content/[collection]/[id]">) {
  const admin = await requireAdmin();
  const { collection, id } = await params;
  if (!isCollectionKey(collection) || !UUID.test(id)) notFound();
  const def: CollectionDef = collections[collection];
  const entry = await getEntry(collection, id);
  if (!entry) notFound();
  const data = { ...emptyData(def.fields), ...(entry.data as Record<string, unknown>) };
  const title = String(data[def.titleField] ?? "") || `Edit ${def.singular}`;
  const href = entry.status === "published" ? publicUrlFor(collection, entry.slug) : null;
  const { saved } = await searchParams;
  return (
    <>
      <PageHead title={title} crumbs={[{ href: `/admin/content/${collection}`, label: def.label }]}>
        {href && (
          <a className="adm-btn ghost" href={href} target="_blank" rel="noopener noreferrer">
            Lihat di situs ↗
          </a>
        )}
      </PageHead>
      {saved && <p className="adm-msg ok" style={{ marginBottom: 16 }}>Tersimpan.</p>}
      <EntryEditor
        key={entry.updatedAt.toISOString()}
        collection={collection}
        singular={def.singular}
        fields={def.fields}
        drafts={!!def.drafts}
        canDelete={can(admin.role, "content.delete")}
        initial={{ id: entry.id, data, status: entry.status }}
      />
    </>
  );
}
