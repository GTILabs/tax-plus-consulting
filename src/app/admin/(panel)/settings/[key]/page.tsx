import { notFound } from "next/navigation";
import { SettingsEditor } from "@/components/admin/cms/Editors";
import { PageHead } from "@/components/admin/PageHead";
import { requireAdmin } from "@/modules/admin/session";
import { isSettingsKey, settings, type SettingsDef } from "@/modules/cms/collections";
import { emptyData } from "@/modules/cms/fields";
import { readSettingsRaw } from "@/modules/cms/repo";

export async function generateMetadata({ params }: PageProps<"/admin/settings/[key]">) {
  const { key } = await params;
  return { title: isSettingsKey(key) ? settings[key].label : "Pengaturan" };
}

export default async function SettingsPage({ params }: PageProps<"/admin/settings/[key]">) {
  await requireAdmin();
  const { key } = await params;
  if (!isSettingsKey(key)) notFound();
  const def: SettingsDef = settings[key];
  const row = await readSettingsRaw(key);
  const data = { ...emptyData(def.fields), ...((row?.data as Record<string, unknown>) ?? {}) };
  return (
    <>
      <PageHead title={def.label} sub={def.description} />
      <SettingsEditor key={row?.updatedAt.toISOString() ?? "new"} settingsKey={key} fields={def.fields} initial={data} />
    </>
  );
}
