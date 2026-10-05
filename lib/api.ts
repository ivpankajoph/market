const apiBaseUrl = String(
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v1",
).replace(/\/+$/, "");

type MarketForm = "buyers" | "sellers";

export type OtpChannel = "email" | "whatsapp";

type ApiResult = {
  success?: boolean;
  message?: string;
  resendAfter?: number;
  verificationToken?: string;
};

async function readApiResult(response: Response) {
  const result = (await response.json().catch(() => null)) as ApiResult | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Something went wrong. Please try again.");
  }

  return result;
}

export function buildWhatsappNumber(
  countryCode: string,
  customCountryCode: string,
  localNumber: string,
) {
  const selectedCode = countryCode === "custom" ? customCountryCode : countryCode;
  const dialCode = selectedCode.replace(/-CA$/i, "").replace(/\D/g, "");
  const subscriberNumber = localNumber.replace(/\D/g, "").replace(/^0+/, "");

  if (!dialCode || !subscriberNumber) return "";
  return `+${dialCode}${subscriberNumber}`;
}

export async function sendVerificationOtp(channel: OtpChannel, target: string) {
  const path = channel === "email" ? "email" : "whatsapp";
  const body = channel === "email" ? { email: target } : { whatsappNumber: target };
  const response = await fetch(`${apiBaseUrl}/live-chat/${path}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return readApiResult(response);
}

export async function verifyVerificationOtp(
  channel: OtpChannel,
  target: string,
  otp: string,
) {
  const path = channel === "email" ? "email" : "whatsapp";
  const body =
    channel === "email"
      ? { email: target, otp, verificationContext: "market" }
      : { whatsappNumber: target, otp, verificationContext: "market" };
  const response = await fetch(`${apiBaseUrl}/live-chat/${path}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await readApiResult(response);

  if (!result.verificationToken) {
    throw new Error("Verification proof was not returned. Please request a new OTP.");
  }

  return result;
}

export async function submitMarketForm(
  form: MarketForm,
  payload: Record<string, unknown>,
) {
  const response = await fetch(`${apiBaseUrl}/market/${form}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return readApiResult(response);
}
