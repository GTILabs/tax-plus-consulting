import { z } from "zod";
import { consultationSchema } from "@/modules/consultations/schema";
import { createConsultationHandoff } from "@/modules/consultations/service";

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

  return Response.json({ data: createConsultationHandoff(parsed.data) });
}
