import {
  AbstractPaymentProvider,
  MedusaError,
  PaymentActions,
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
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
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
      merchant_id: "TODO_ZARINPAL_MERCHANT_ID",
      callback_url: "TODO_ZARINPAL_CALLBACK_URL",
      base_url: "https://api.zarinpal.com",
      start_pay_url: "https://www.zarinpal.com/pg/StartPay",
      ...options,
    }
  }

  static validateOptions(options: Record<string, unknown>): void | never {
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

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    this.assertConfigured()

    const amount = new BigNumber(input.amount).numeric
    const currencyCode = input.currency_code.toLowerCase()

    const callback = new URL(this.callbackUrl)
    const sessionId = input.data?.session_id
    if (sessionId !== undefined && sessionId !== null) {
      callback.searchParams.set("session_id", String(sessionId))
    }

    const result = await this.post("/pg/v4/payment/request.json", {
      merchant_id: this.merchantId,
      amount,
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

    return {
      id: data.authority,
      data: {
        authority: data.authority,
        amount,
        currency_code: currencyCode,
        payment_url: `${this.startPayUrl}/${data.authority}`,
        status: "pending",
        code: data.code,
        message: data.message,
        session_id: sessionId === undefined || sessionId === null ? undefined : String(sessionId),
      } satisfies ZarinPalData,
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    this.assertConfigured()

    const data = (input.data ?? {}) as ZarinPalData
    const authority = data.authority
    const amount = data.amount

    if (!authority) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "ZarinPal authority is missing from the payment session."
      )
    }

    if (typeof amount !== "number") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "ZarinPal payment amount is missing from the payment session."
      )
    }

    const result = await this.post("/pg/v4/payment/verify.json", {
      merchant_id: this.merchantId,
      authority,
      amount,
    })

    const responseData = result.data
    const success = responseData?.code === 100 || responseData?.code === 101

    if (!success) {
      throw new MedusaError(
        MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
        `ZarinPal payment verification failed (${responseData?.code ?? "unknown"}): ${responseData?.message || "Payment was not verified."}`
      )
    }

    return {
      status: "authorized",
      data: {
        ...data,
        status: "authorized",
        code: responseData.code,
        message: responseData.message,
        ref_id: responseData.ref_id,
        card_pan: responseData.card_pan,
        fee: responseData.fee,
        fee_type: responseData.fee_type,
      },
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return {
      data: {
        ...((input.data ?? {}) as ZarinPalData),
        status: "captured",
      },
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      `ZarinPal refunds are TODO until the gateway account is activated. Requested amount: ${input.amount}`
    )
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return {
      data: {
        ...((input.data ?? {}) as ZarinPalData),
        status: "canceled",
      },
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return { data: input.data }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    const data = (input.data ?? {}) as ZarinPalData
    const result = await this.initiatePayment({
      amount: input.amount,
      currency_code: input.currency_code,
      data,
    })
    return result
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    const data = (input.data ?? {}) as ZarinPalData
    const status = data.status || "pending"

    const statusMap: Record<string, PaymentSessionStatus> = {
      pending: "pending",
      authorized: "authorized",
      captured: "captured",
      canceled: "canceled",
      requires_more: "requires_more",
      error: "error",
    }

    return {
      status: statusMap[status] || "pending",
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"],
  ): Promise<WebhookActionResult> {
    const data = payload.data as Record<string, unknown>
    const sessionId = typeof data.session_id === "string" ? data.session_id : ""
    const amount = typeof data.amount === "number" ? data.amount : 0

    if (!sessionId) {
      return {
        action: PaymentActions.NOT_SUPPORTED,
        data: { session_id: "", amount: new BigNumber(amount) },
      }
    }

    const status = typeof data.status === "string" ? data.status : ""
    if (status === "authorized") {
      return {
        action: PaymentActions.AUTHORIZED,
        data: { session_id: sessionId, amount: new BigNumber(amount) },
      }
    }

    if (status === "captured" || status === "success") {
      return {
        action: PaymentActions.SUCCESSFUL,
        data: { session_id: sessionId, amount: new BigNumber(amount) },
      }
    }

    return {
      action: PaymentActions.NOT_SUPPORTED,
      data: { session_id: sessionId, amount: new BigNumber(amount) },
    }
  }
}

export default ZarinPalPaymentProviderService
