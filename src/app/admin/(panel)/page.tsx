import { PageHead } from "@/components/admin/PageHead";
import { requireAdmin } from "@/modules/admin/session";

export const metadata = { title: "Dasbor" };

export default async function DashboardPage() {
  const admin = await requireAdmin();
  return (
    <>
      <PageHead title={`Halo, ${admin.name.split(" ")[0]}`} sub="Kelola konten situs TaxPlus Consulting dari sini." />
    </>
  );
}
