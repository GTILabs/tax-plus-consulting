"use server";

import { eq } from "drizzle-orm";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { consultationRequests, consultationStatus } from "@/lib/db/schema";
import { requireAdmin } from "@/modules/admin/session";

type Status = (typeof consultationStatus.enumValues)[number];

export async function setConsultationStatus(id: string, status: Status) {
  await requireAdmin("consultations");
  if (!consultationStatus.enumValues.includes(status)) return;
  await getDb().update(consultationRequests).set({ status }).where(eq(consultationRequests.id, id));
  refresh();
}

/** Permanent removal, e.g. when a visitor asks for their data to be deleted (privacy policy). */
export async function deleteConsultation(id: string) {
  await requireAdmin("consultations");
  await getDb().delete(consultationRequests).where(eq(consultationRequests.id, id));
  redirect("/admin/consultations");
}
