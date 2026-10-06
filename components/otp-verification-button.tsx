"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Mail, MessageCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  type OtpChannel,
  sendVerificationOtp,
  verifyVerificationOtp,
} from "@/lib/api";

type OtpVerificationButtonProps = {
  channel: OtpChannel;
  target: string;
  verified: boolean;
  onVerified: (verificationToken: string) => void;
  onAvailabilityChange?: (available: boolean, message?: string) => void;
  className?: string;
  label?: string;
  verifiedVariant?: "outline" | "secondary";
};

const isValidTarget = (channel: OtpChannel, target: string) => {
  if (channel === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target);
  return /^\+\d{8,15}$/.test(target);
};

const maskTarget = (channel: OtpChannel, target: string) => {
  if (channel === "email") {
    const [name = "", domain = ""] = target.split("@");
    return `${name.slice(0, 2)}${name.length > 2 ? "***" : ""}@${domain}`;
  }
  return `${target.slice(0, 3)}••••••${target.slice(-3)}`;
};

export function OtpVerificationButton({
  channel,
  target,
  verified,
  onVerified,
  onAvailabilityChange,
  className,
  label = "Verify",
  verifiedVariant = "outline",
}: OtpVerificationButtonProps) {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [otpTarget, setOtpTarget] = useState("");

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timerId = window.setInterval(
      () => setResendTimer((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => window.clearInterval(timerId);
  }, [resendTimer]);

  const sendOtp = async () => {
    setError("");
    if (!isValidTarget(channel, target)) {
      setError(
        channel === "email"
          ? "Please enter a valid email address first."
          : "Please enter a valid WhatsApp number with country code first.",
      );
      return;
    }

    try {
      setIsSending(true);
      const result = await sendVerificationOtp(channel, target);
      onAvailabilityChange?.(true);
      setOtpTarget(target);
      setOtpSent(true);
      setOtp("");
      setResendTimer(result.resendAfter || 30);
    } catch (caughtError) {
      const requestError = caughtError as Error & { code?: string };
      const message = requestError instanceof Error ? requestError.message : "Unable to send OTP.";
      if (requestError?.code === "MEMBER_EXISTS") {
        onAvailabilityChange?.(false, message);
        setOtpSent(false);
        setOpen(false);
      } else {
        setError(message);
      }
    } finally {
      setIsSending(false);
    }
  };

  const startVerification = () => {
    if (!target || !target.trim()) {
      alert(
        channel === "email"
          ? "Please enter your email address first."
          : "Please enter your WhatsApp number first.",
      );
      return;
    }

    if (!isValidTarget(channel, target)) {
      alert(
        channel === "email"
          ? "Please enter a valid email address before requesting an OTP."
          : "Please enter a valid WhatsApp number with country code before requesting an OTP.",
      );
      return;
    }

    if (otpTarget !== target) {
      setOtp("");
      setOtpSent(false);
      setError("");
      setResendTimer(0);
    }
    setOpen(true);
    if (otpTarget !== target || !otpSent) {
      void sendOtp();
    }
  };

  const verifyOtp = async () => {
    setError("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    if (otpTarget !== target) {
      setError("This value changed. Please request a new OTP.");
      return;
    }

    try {
      setIsVerifying(true);
      const result = await verifyVerificationOtp(channel, target, otp);
      onVerified(result.verificationToken as string);
      setOpen(false);
    } catch (caughtError) {
      const requestError = caughtError as Error & { code?: string };
      const message = requestError instanceof Error ? requestError.message : "OTP verification failed.";
      if (requestError?.code === "MEMBER_EXISTS") {
        onAvailabilityChange?.(false, message);
        setOtpSent(false);
        setOpen(false);
      } else {
        setError(message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const hasTarget = Boolean(target && target.trim());

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant={verified ? verifiedVariant : "outline"}
        onClick={startVerification}
        disabled={verified || !hasTarget}
        title={
          verified
            ? "Already verified"
            : !hasTarget
            ? channel === "email"
              ? "Please enter an email address first"
              : "Please enter a WhatsApp number first"
            : "Click to verify with OTP"
        }
        className={className}
      >
        {verified ? (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Check className="size-3.5" /> Verified
          </span>
        ) : (
          label
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              {channel === "email" ? <Mail className="size-5" /> : <MessageCircle className="size-5" />}
            </div>
            <DialogTitle>
              Verify your {channel === "email" ? "email" : "WhatsApp number"}
            </DialogTitle>
            <DialogDescription>
              {otpSent
                ? `Enter the 6-digit code sent to ${maskTarget(channel, target)}. It expires in 5 minutes.`
                : `We are sending a verification code to ${maskTarget(channel, target)}.`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <input
              aria-label="6-digit OTP"
              autoComplete="one-time-code"
              autoFocus
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void verifyOtp();
                }
              }}
              disabled={!otpSent || isSending}
              className="w-full rounded-md border border-input bg-background px-3 py-3 text-center font-mono text-lg tracking-[0.35em] shadow-xs outline-none transition-colors placeholder:text-sm placeholder:tracking-normal focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            />
            {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
          </div>

          <DialogFooter className="items-center sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isSending || resendTimer > 0}
              onClick={() => void sendOtp()}
            >
              {isSending ? (
                <><Loader2 className="size-4 animate-spin" /> Sending...</>
              ) : resendTimer > 0 ? (
                `Resend in ${resendTimer}s`
              ) : (
                "Resend OTP"
              )}
            </Button>
            <Button
              type="button"
              disabled={!otpSent || otp.length !== 6 || isVerifying}
              onClick={() => void verifyOtp()}
            >
              {isVerifying ? (
                <><Loader2 className="size-4 animate-spin" /> Verifying...</>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
