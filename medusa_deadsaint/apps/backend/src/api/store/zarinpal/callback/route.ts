import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

/**
 * ZarinPal redirects the customer here after payment.
 * The callback delegates payment-session authorization to Medusa's payment
 * module so the provider's authorizePayment implementation remains the single
 * source of truth for gateway verification.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const authority = String(req.query.Authority || "")
  const status = String(req.query.Status || "")
  const sessionId = String(req.query.session_id || "")

  if (!authority || status !== "OK") {
    res.redirect("/checkout/payment?status=cancelled")
    return
  }

  if (!sessionId) {
    res.status(400).json({ error: "Missing payment session_id" })
    return
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const paymentModuleService = req.scope.resolve(Modules.PAYMENT)

  const { data: sessions } = await query.graph({
    entity: "payment_session",
    fields: ["id", "data", "payment_collection_id"],
    filters: { id: sessionId },
  })

  const session = sessions?.[0]

  if (!session) {
    res.status(404).json({ error: "Payment session not found" })
    return
  }

  try {
    await paymentModuleService.authorizePaymentSession(sessionId, {
      authority,
      ...(session.data || {}),
    })

    res.redirect(`/checkout/payment?status=success&session_id=${encodeURIComponent(sessionId)}`)
  } catch (error) {
    console.error("ZarinPal payment verification failed", error)
    res.redirect(`/checkout/payment?status=failed&session_id=${encodeURIComponent(sessionId)}`)
  }
}
