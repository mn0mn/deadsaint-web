import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

/**
 * ZarinPal redirects the customer here after payment.
 *
 * TODO: Set ZARINPAL_CALLBACK_URL to the public URL of this route, for example:
 * https://your-domain.com/store/zarinpal/callback
 *
 * The callback intentionally does not trust the gateway's query string as proof
 * of payment. The Medusa payment session must be verified server-to-server.
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
    res.status(400).json({
      error: "Missing payment session_id",
    })
    return
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const paymentModuleService = req.scope.resolve(Modules.PAYMENT)

  const { data: sessions } = await query.graph({
    entity: "payment_session",
    fields: ["id", "amount", "currency_code", "data", "payment_collection_id"],
    filters: { id: sessionId },
  })

  const session = sessions?.[0]

  if (!session) {
    res.status(404).json({ error: "Payment session not found" })
    return
  }

  try {
    await paymentModuleService.authorizePayment(sessionId, {
      authority,
      ...(session.data || {}),
    })

    res.redirect(`/checkout/payment?status=success&session_id=${encodeURIComponent(sessionId)}`)
  } catch (error) {
    console.error("ZarinPal payment verification failed", error)
    res.redirect(`/checkout/payment?status=failed&session_id=${encodeURIComponent(sessionId)}`)
  }
}
