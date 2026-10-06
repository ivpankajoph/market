"use client";

import { useState } from "react";
import { CreditCard, Headphones, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type MarketForm,
  type MarketPaymentDetails,
  requestMarketPaymentHelp,
  verifyMarketPayment,
} from "@/lib/api";

type RazorpayResult = {
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayConstructor = new (options: Record<string, unknown>) => {
  open: () => void;
  on: (event: string, callback: (response: { error?: { description?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

async function loadRazorpay() {
  if (window.Razorpay) return;
  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-razorpay-checkout]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load payment checkout.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.razorpayCheckout = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load payment checkout."));
    document.body.appendChild(script);
  });
}

export function MarketVerificationPayment({
  form,
  payment,
  onPaid,
}: {
  form: MarketForm;
  payment: MarketPaymentDetails;
  onPaid: () => void;
}) {
  const [isPaying, setIsPaying] = useState(false);
  const [isRequestingHelp, setIsRequestingHelp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const openPayment = async () => {
    setError("");
    setMessage("");
    setIsPaying(true);
    try {
      await loadRazorpay();
      if (!window.Razorpay) throw new Error("Payment checkout is unavailable.");
      const checkout = new window.Razorpay({
        key: payment.checkoutKey,
        order_id: payment.orderId,
        amount: payment.amount,
        currency: payment.currency,
        name: "Chinaindiasourcing",
        description: "One-time partner verification fee",
        prefill: { name: payment.name, email: payment.email, contact: payment.contact },
        theme: { color: "#111827" },
        modal: { ondismiss: () => setIsPaying(false) },
        handler: async (result: RazorpayResult) => {
          try {
            await verifyMarketPayment(
              form,
              payment,
              result.razorpay_payment_id,
              result.razorpay_signature,
            );
            onPaid();
          } catch (paymentError) {
            setError(paymentError instanceof Error ? paymentError.message : "Payment verification failed.");
          } finally {
            setIsPaying(false);
          }
        },
      });
      checkout.on("payment.failed", (response) => {
        setError(response.error?.description || "Payment failed. Please try again.");
        setIsPaying(false);
      });
      checkout.open();
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : "Unable to start payment.");
      setIsPaying(false);
    }
  };

  const requestHelp = async () => {
    setError("");
    setMessage("");
    setIsRequestingHelp(true);
    try {
      const result = await requestMarketPaymentHelp(form, payment);
      setMessage(result.message || "Thanks for your concern, we will be back to you very shortly.");
    } catch (helpError) {
      setError(helpError instanceof Error ? helpError.message : "Unable to request payment help.");
    } finally {
      setIsRequestingHelp(false);
    }
  };

  return (
    <Card className="mx-auto max-w-xl border-border/60 bg-card/95 shadow-lg backdrop-blur-sm">
      <CardHeader className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="size-6" />
        </span>
        <CardTitle className="mt-3 text-2xl">Complete your verification</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your form has been saved. Pay the one-time verification fee to submit it for review.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border bg-muted/30 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount due</p>
          <p className="mt-1 text-3xl font-bold">US${payment.feeUsd}</p>
          <p className="mt-1 text-xs text-muted-foreground">One-time verification fee · No recurring charge</p>
        </div>
        <Button type="button" size="lg" className="w-full gap-2" onClick={openPayment} disabled={isPaying}>
          {isPaying ? <Loader2 className="size-4 animate-spin" /> : <CreditCard className="size-4" />}
          {isPaying ? "Opening secure checkout..." : `Pay US$${payment.feeUsd} securely`}
        </Button>
        <div className="text-center">
          <button
            type="button"
            onClick={requestHelp}
            disabled={isRequestingHelp}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline disabled:opacity-60"
          >
            {isRequestingHelp ? <Loader2 className="size-3.5 animate-spin" /> : <Headphones className="size-3.5" />}
            Need help with payment?
          </button>
          <p className="mx-auto mt-1 max-w-sm text-[11px] leading-relaxed text-muted-foreground">
            Requesting help sends your registration details to our payment support team so they can assist you.
          </p>
        </div>
        {message && <p role="status" className="rounded-md bg-emerald-50 p-3 text-center text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{message}</p>}
        {error && <p role="alert" className="rounded-md bg-rose-50 p-3 text-center text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">{error}</p>}
      </CardContent>
    </Card>
  );
}
