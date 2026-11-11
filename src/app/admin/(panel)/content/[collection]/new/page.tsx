import { notFound } from "next/navigation";
import { EntryEditor } from "@/components/admin/cms/Editors";
import { PageHead } from "@/components/admin/PageHead";
import { requireAdmin } from "@/modules/admin/session";
import { collections, isCollectionKey, type CollectionDef } from "@/modules/cms/collections";
import { emptyData } from "@/modules/cms/fields";
import { withLiveOptions } from "@/modules/cms/options";

export const metadata = { title: "Tambah" };

export default async function NewEntryPage({ params }: PageProps<"/admin/content/[collection]/new">) {
  await requireAdmin();
  const { collection } = await params;
  if (!isCollectionKey(collection)) notFound();
  const def: CollectionDef = collections[collection];
  const fields = await withLiveOptions(def.fields);
  return (
    <>
      <PageHead title={`Tambah ${def.singular}`} crumbs={[{ href: `/admin/content/${collection}`, label: def.label }]} />
      <EntryEditor
        collection={collection}
        singular={def.singular}
        fields={fields}
        drafts={!!def.drafts}
        canDelete={false}
        initial={{ id: null, data: emptyData(def.fields), status: def.drafts ? "draft" : "published" }}
      />
    </>
  );
}
