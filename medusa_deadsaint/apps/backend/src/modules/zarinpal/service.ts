import {
  AbstractPaymentProvider,
  MedusaError,
} from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  PaymentSessionStatus,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
} from "@medusajs/framework/types"
import { BigNumber } from "@medusajs/framework/utils"

type Options = {
  merchant_id?: string
  callback_url?: string
  base_url?: string
  start_pay_url?: string
}

type ZarinPalData = {
  authority?: string
  amount?: number
  currency_code?: string
  payment_url?: string
  status?: string
  code?: number
  message?: string
  ref_id?: number
  card_pan?: string
  fee?: number
  fee_type?: string
  session_id?: string
}

type ZarinPalResponse = {
  data?: {
    code?: number
    message?: string
    authority?: string
    fee_type?: string
    fee?: number
    ref_id?: number
    card_pan?: string
  }
  errors?: {
    code?: number
    message?: string
    validations?: unknown[]
  }
}

class ZarinPalPaymentProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "zarinpal"

  protected options_: Options

  constructor(container: Record<string, unknown>, options: Options) {
    super(container, options)
    this.options_ = {
      // TODO: Replace these values with the real ZarinPal merchant/gateway values.
      merchant_id: "TODO_ZARINPAL_MERCHANT_ID",
      callback_url: "TODO_ZARINPAL_CALLBACK_URL",
      base_url: "https://api.zarinpal.com",
      start_pay_url: "https://www.zarinpal.com/pg/StartPay",
      ...options,
    }
  }

  static validateOptions(options: Record<string, unknown>): void | never {
    // The gateway is not available yet, so these are intentionally optional for now.
    // TODO: Make merchant_id and callback_url mandatory when the gateway is activated.
    void options
  }

  private get merchantId(): string {
    return this.options_.merchant_id || ""
  }

  private get callbackUrl(): string {
    return this.options_.callback_url || ""
  }

  private get baseUrl(): string {
    return (this.options_.base_url || "https://api.zarinpal.com").replace(/\/$/, "")
  }

  private get startPayUrl(): string {
    return (this.options_.start_pay_url || "https://www.zarinpal.com/pg/StartPay").replace(/\/$/, "")
  }

  private assertConfigured() {
    if (
      !this.merchantId ||
      this.merchantId.startsWith("TODO_") ||
      !this.callbackUrl ||
      this.callbackUrl.startsWith("TODO_")
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "ZarinPal is not configured yet. TODO: set ZARINPAL_MERCHANT_ID and ZARINPAL_CALLBACK_URL."
      )
    }
  }

  private async post(path: string, body: Record<string, unknown>) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "DeadSaint/Medusa-ZarinPal",
      },
      body: JSON.stringify(body),
    })

    const json = (await response.json()) as ZarinPalResponse

    if (!response.ok) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `ZarinPal API request failed with HTTP ${response.status}. ${json.errors?.message || ""}`
      )
    }

    if (json.errors?.code) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `ZarinPal API error ${json.errors.code}: ${json.errors.message || "Unknown error"}`
      )
    }

    return json
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    this.assertConfigured()

    const amount = new BigNumber(input.amount).numeric
    const currencyCode = input.currency_code.toLowerCase()

    // ZarinPal's current REST API expects the transaction amount in Rial.
    // Keep the conversion isolated here so the store's currency convention can
    // be changed without touching the rest of the provider.
    const amountInRial = amount

    const callback = new URL(this.callbackUrl)
    if (input.data?.session_id) {
      callback.searchParams.set("session_id", String(input.data.session_id))
    }

    const result = await this.post("/pg/v4/payment/request.json", {
      merchant_id: this.merchantId,
      amount: amountInRial,
      callback_url: callback.toString(),
      description: "DEADSAINT order payment",
      metadata: {},
    })

    const data = result.data

    if (!data?.authority || data.code !== 100) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `ZarinPal payment request failed: ${data?.message || "Unknown response"}`
      )
    }

    const paymentUrl = `${this.startPayUrl}/${data.authority}`

    return {
      id: data.authority,
      data: {
        authority: data.authority,
        amount: amountInRial,
        currency_code: currencyCode,
        payment_url: paymentUrl,
        status: "pending",
        code: data.code,
        message: data.message,
        session_id: input.data?.session_id,
      } satisfies ZarinPalData,
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    this.assertConfigured()

    const authority = input.data?.authority as string | undefined
    const amount = input.data?.amount as number | undefined

    if (!authority || typeof authority !== "string") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "ZarinPal authority is missing from the payment session."
      )
    }

    const amountInRial = amount ?? new BigNumber(input.amount).numeric

    const result = await this.post("/pg/v4/payment/verify.json", {
      merchant_id: this.merchantId,
      authority,
      amount: amountInRial,
    })

    const data = result.data
    const success = data?.code === 100 || data?.code === 101

    if (!success) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
        `ZarinPal payment verification failed (${data?.code ?? "unknown"}): ${data?.message || "Payment was not verified."}`
      )
    }

    return {
      status: "authorized",
      data: {
        ...(input.data as ZarinPalData),
        status: "authorized",
        code: data.code,
        message: data.message,
        ref_id: data.ref_id,
        card_pan: data.card_pan,
        fee: data.fee,
        fee_type: data.fee_type,
      },
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    // ZarinPal's standard flow verifies the payment after the customer returns
    // from the gateway. There is no separate capture call in this integration.
    return {
      data: {
        ...(input.data as ZarinPalData),
        status: "captured",
      },
    }
  }

  async refundPayment(
    input: RefundPaymentInput
  ): Promise<RefundPaymentOutput> {
    // TODO: Wire this to ZarinPal's refund/reconciliation API once the gateway
    // account is activated and the exact refund API available to this account is confirmed.
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      `ZarinPal refunds are TODO until the gateway account is activated. Requested amount: ${input.amount}`
    )
  }

  async cancelPayment(
    input: CancelPaymentInput
  ): Promise<CancelPaymentOutput> {
    // There is no separate cancellation request in the standard request/verify flow.
    return {
      data: {
        ...(input.data as ZarinPalData),
        status: "canceled",
      },
    }
  }

  async deletePayment(
    input: DeletePaymentInput
  ): Promise<DeletePaymentOutput> {
    return { data: input.data }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    return { data: input.data }
  }

  async updatePayment(
    input: UpdatePaymentInput
  ): Promise<UpdatePaymentOutput> {
    // An authority is tied to the requested amount, so create a fresh payment
    // request when Medusa changes the payment amount.
    return this.initiatePayment({
      ...input,
      data: input.data,
    })
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const status = input.data?.status as string | undefined

    const statusMap: Record<string, PaymentSessionStatus> = {
      pending: "pending",
      authorized: "authorized",
      captured: "captured",
      canceled: "canceled",
      requires_more: "requires_more",
      error: "error",
    }

    return {
      status: statusMap[status || "pending"] || "pending",
    }
  }
}

export default ZarinPalPaymentProviderService
