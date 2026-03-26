import type {
  AbacatePayChargeRequest,
  AbacatePayChargeResponse,
} from "@/types";

const API_URL =
  process.env.ABACATEPAY_API_URL || "https://api.abacatepay.com";
const API_KEY = process.env.ABACATEPAY_API_KEY || "";

export async function createPixCharge(
  req: AbacatePayChargeRequest
): Promise<AbacatePayChargeResponse | null> {
  if (!API_KEY || API_KEY === "placeholder-api-key") {
    // Return a simulated response for development
    console.warn("⚠️  AbacatePay: using simulated PIX response (no API key)");
    return {
      id: `sim_${Date.now()}`,
      brCode: "00020126580014BR.GOV.BCB.PIX0136placeholder-pix-key-uuid5204000053039865802BR5912JuniorGas006009SAO PAULO62070503***6304ABCD",
      qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pix-simulado",
      status: "PENDING",
    };
  }

  try {
    const response = await fetch(`${API_URL}/v1/billing/single`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: req.amount,
        customer: req.customer,
        description: req.description,
        externalId: req.externalId,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AbacatePay error:", err);
      return null;
    }

    const data = await response.json();
    return data as AbacatePayChargeResponse;
  } catch (err) {
    console.error("AbacatePay fetch error:", err);
    return null;
  }
}
