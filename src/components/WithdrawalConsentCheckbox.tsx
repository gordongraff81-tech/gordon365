"use client";

type Locale = "de" | "en";

const WITHDRAWAL_TEXT: Record<Locale, string> = {
  de:
    "Ich verlange ausdrücklich, dass mit der Bereitstellung der digitalen Inhalte sofort begonnen wird, " +
    "und bestätige, dass ich dadurch mein gesetzliches Widerrufsrecht verliere, sobald der Download bereitgestellt wurde " +
    "(§356 Abs. 5 BGB).",
  en:
    "I expressly request that the provision of the digital content begin immediately, and I confirm that I " +
    "thereby lose my statutory right of withdrawal once the download has been provided.",
};

interface WithdrawalConsentProps {
  locale: Locale;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Place this directly above the "Proceed to payment" button on the checkout page.
 * The button should stay disabled until `checked` is true.
 *
 * When creating the Stripe Checkout Session, attach the consent as metadata so the
 * Stripe session itself becomes the audit record (no separate database needed,
 * consistent with the Phase 1 architecture):
 *
 *   metadata: {
 *     withdrawalWaiverAccepted: "true",
 *     withdrawalWaiverTimestamp: new Date().toISOString(),
 *     withdrawalWaiverTextVersion: "1.0",
 *   }
 */
export function WithdrawalConsent({ locale, checked, onCheckedChange }: WithdrawalConsentProps) {
  return (
    <label className="flex items-start gap-3 text-sm text-muted-foreground select-none">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        aria-required="true"
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-primary"
      />
      <span>{WITHDRAWAL_TEXT[locale]}</span>
    </label>
  );
}
