import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/admin/PageHead";
import { requireAdmin } from "@/modules/admin/session";
import { moveEntry } from "@/modules/cms/actions";
import { displayValue, fieldOf, imageOf } from "@/modules/cms/admin-view";
import { collections, isCollectionKey, type CollectionDef } from "@/modules/cms/collections";
import { listEntries } from "@/modules/cms/repo";

const updatedFmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeZone: "Asia/Jakarta" });

export async function generateMetadata({ params }: PageProps<"/admin/content/[collection]">) {
  const { collection } = await params;
  return { title: isCollectionKey(collection) ? collections[collection].label : "Konten" };
}

export default async function CollectionPage({ params, searchParams }: PageProps<"/admin/content/[collection]">) {
  await requireAdmin();
  const { collection } = await params;
  if (!isCollectionKey(collection)) notFound();
  const def: CollectionDef = collections[collection];
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim().toLowerCase() : "";
  const all = await listEntries(collection);
  const rows = query ? all.filter((r) => JSON.stringify(r.data).toLowerCase().includes(query)) : all;
  const manual = def.order === "manual" && !query;
  const columns = def.columns ?? [];

  return (
    <>
      <PageHead title={def.label} sub={def.description}>
        <Link className="adm-btn gold" href={`/admin/content/${collection}/new`}>
          + Tambah {def.singular}
        </Link>
      </PageHead>
      {all.length > 8 && (
        <form className="adm-search">
          <input type="search" name="q" defaultValue={query} placeholder={`Cari ${def.label.toLowerCase()}…`} aria-label={`Cari ${def.label}`} />
          <button className="adm-btn ghost">Cari</button>
          {query && (
            <Link className="adm-btn ghost" href={`/admin/content/${collection}`}>
              Reset
            </Link>
          )}
        </form>
      )}
      {rows.length === 0 ? (
        <div className="adm-card adm-empty">{query ? "Tidak ada yang cocok." : `Belum ada ${def.singular}.`}</div>
      ) : (
        <div className="adm-scroll">
          <table className="adm-table">
            <thead>
              <tr>
                {def.imageField && <th aria-label="Gambar" />}
                <th>{fieldOf(def, def.titleField)?.label ?? "Judul"}</th>
                {columns.map((c) => (
                  <th key={c}>{fieldOf(def, c)?.label}</th>
                ))}
                {def.drafts && <th>Status</th>}
                <th>Diubah</th>
                {manual && <th aria-label="Urutan" />}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const data = row.data as Record<string, unknown>;
                const image = imageOf(def, data);
                return (
                  <tr key={row.id}>
                    {def.imageField && (
                      <td>
                        {/* eslint-disable-next-line @next/next/no-img-element -- small admin thumbnail */}
                        {image ? <img src={image.src} alt="" loading="lazy" /> : <span className="adm-noimg" />}
                      </td>
                    )}
                    <td className="t-main">
                      <Link href={`/admin/content/${collection}/${row.id}`}>{displayValue(undefined, data[def.titleField]) || "(tanpa judul)"}</Link>
                    </td>
                    {columns.map((c) => (
                      <td key={c} className="adm-muted">
                        {displayValue(fieldOf(def, c), data[c])}
                      </td>
                    ))}
                    {def.drafts && (
                      <td>
                        <span className={row.status === "published" ? "adm-pill on" : "adm-pill warn"}>{row.status === "published" ? "Tayang" : "Draf"}</span>
                      </td>
                    )}
                    <td className="adm-muted">{updatedFmt.format(row.updatedAt)}</td>
                    {manual && (
                      <td className="t-act">
                        <form action={moveEntry.bind(null, collection, row.id, -1)} style={{ display: "inline" }}>
                          <button className="adm-btn ghost icon sm" disabled={i === 0} aria-label="Naikkan">
                            ↑
                          </button>
                        </form>{" "}
                        <form action={moveEntry.bind(null, collection, row.id, 1)} style={{ display: "inline" }}>
                          <button className="adm-btn ghost icon sm" disabled={i === rows.length - 1} aria-label="Turunkan">
                            ↓
                          </button>
                        </form>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
