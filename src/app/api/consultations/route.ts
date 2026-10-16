import { z } from "zod";
import { consultationSchema } from "@/modules/consultations/schema";
import { createWhatsappHandoff, saveConsultationRequest } from "@/modules/consultations/service";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  const whatsappUrl = createWhatsappHandoff(parsed.data);
  try {
    const id = await saveConsultationRequest(parsed.data);
    return Response.json({ data: { id, saved: true, whatsappUrl } }, { status: 201 });
  } catch (error) {
    // The WhatsApp hand-off still reaches the office, so don't block the visitor.
    console.error("Failed to save consultation request", error);
    return Response.json({ data: { saved: false, whatsappUrl } });
  }
}
