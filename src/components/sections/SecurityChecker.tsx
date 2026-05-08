"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ScoreRing from "@/components/ui/ScoreRing";
import {
  type AnswerValue,
  type QuestionId,
  type Answers,
  TOTAL_QUESTIONS,
  calculateScore,
  FINDING_TEXT,
  FINDINGS,
} from "@/lib/checker";
import { formatScore } from "@/lib/utils";

// ── Answer button ──────────────────────────────────────────────────────────────
function AnswerBtn({
  value,
  title,
  hint,
  icon,
  selected,
  onSelect,
}: {
  value: AnswerValue;
  title: string;
  hint: string;
  icon: string;
  selected: boolean;
  onSelect: (v: AnswerValue) => void;
}) {
  const isGood = value === "yes";
  const isBad = value === "no";

  return (
    <button
      onClick={() => onSelect(value)}
      className={[
        "flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-200 w-full",
        selected && isGood
          ? "bg-accent/12 border-accent/50 ring-1 ring-accent/30"
          : selected && !isGood
          ? "bg-red/10 border-red/40 ring-1 ring-red/20"
          : "bg-card border-border hover:bg-card-hover hover:border-border-strong",
      ].join(" ")}
      type="button"
    >
      <div
        className={[
          "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-base",
          isGood ? "bg-green/10" : isBad ? "bg-red/10" : "bg-amber/10",
        ].join(" ")}
      >
        {icon}
      </div>
      <div>
        <div className="text-[0.9375rem] font-semibold text-white leading-snug mb-0.5">
          {title}
        </div>
        <div className="text-[0.75rem] text-text-2 leading-relaxed">{hint}</div>
      </div>
    </button>
  );
}

// ── Finding item ───────────────────────────────────────────────────────────────
function FindingItem({
  severity,
  title,
  desc,
}: {
  severity: "critical" | "warning" | "ok";
  title: string;
  desc: string;
}) {
  const cfg = {
    critical: { bg: "bg-red/6", border: "border-red/20", icon: "✗", iconBg: "bg-red/15", iconColor: "text-red" },
    warning:  { bg: "bg-amber/6", border: "border-amber/20", icon: "⚠", iconBg: "bg-amber/15", iconColor: "text-amber" },
    ok:       { bg: "bg-green/5", border: "border-green/15", icon: "✓", iconBg: "bg-green/10", iconColor: "text-green" },
  }[severity];

  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${cfg.bg} ${cfg.border} mb-2.5`}>
      <div className={`w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0 ${cfg.iconBg} ${cfg.iconColor}`}>
        {cfg.icon}
      </div>
      <div>
        <div className="text-[0.875rem] font-semibold text-white mb-0.5">{title}</div>
        <div className="text-[0.8125rem] text-text-2 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function SecurityChecker() {
  const t = useTranslations("checker");
  const locale = useLocale() as "en" | "de";
  const [step, setStep] = useState<QuestionId | "results">(1);
  const [answers, setAnswers] = useState<Answers>({});

  const questions = t.raw("questions") as Array<{
    text: string;
    sub: string;
    answers: Record<AnswerValue, { title: string; hint: string }>;
  }>;

  const ICONS: Record<AnswerValue, string> = { yes: "✓", partial: "⚠", no: "✗", unknown: "?" };

  const selectAnswer = useCallback((q: QuestionId, val: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [q]: val }));
  }, []);

  const next = (q: QuestionId) => {
    if (q < TOTAL_QUESTIONS) setStep((q + 1) as QuestionId);
    else setStep("results");
  };

  const back = (q: QuestionId) => {
    if (q > 1) setStep((q - 1) as QuestionId);
  };

  const restart = () => {
    setAnswers({});
    setStep(1);
  };

  const score = step === "results" ? calculateScore(answers) : 0;
  const { color, label: postureKey } = step === "results" ? formatScore(score) : { color: "", label: "strong" as const };

  const progress = step === "results" ? 100 : ((step - 1) / TOTAL_QUESTIONS) * 100;

  // Build findings for results view
  const findings = step === "results"
    ? (Object.entries(answers) as [string, AnswerValue][]).flatMap(([qStr, ans]) => {
        const q = Number(qStr) as QuestionId;
        const finding = FINDINGS[q]?.[ans];
        if (!finding) return [];
        const textKey = `finding.${["", "mfa", "ca", "la", "es", "sl"][q]}.${ans}`;
        const textData = FINDING_TEXT[textKey];
        if (!textData) return [];
        return [{ severity: finding.severity, ...textData[locale] }];
      })
    : [];

  const postureLabels = { strong: t("results.postures.strong"), attention: t("results.postures.attention"), critical: t("results.postures.critical") };
  const headlines = { strong: t("results.headlines.strong"), attention: t("results.headlines.attention"), critical: t("results.headlines.critical") };
  const descs = { strong: t("results.descs.strong"), attention: t("results.descs.attention"), critical: t("results.descs.critical") };

  const postureColors = {
    strong:    "bg-green/12 text-green border border-green/25",
    attention: "bg-amber/12 text-amber border border-amber/25",
    critical:  "bg-red/12 text-red border border-red/25",
  };

  return (
    <section id="security-checker" className="relative z-10 py-28 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="section-label mb-4 justify-center">{t("sectionLabel")}</div>
          <h2 className="display-md text-white mb-4">{t("h2")}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2 max-w-[520px] mx-auto">
            {t("sub")}
          </p>
        </div>

        {/* Checker card */}
        <div className="max-w-[720px] mx-auto bg-bg-1 border border-border-strong rounded-4xl overflow-hidden shadow-card">
          {/* Header */}
          <div className="px-7 pt-7 pb-5 border-b border-border bg-accent/[0.04]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-display font-extrabold text-[1.25rem] tracking-[-0.03em] text-white">
                {t("title")}
              </span>
              <span className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-accent-2 bg-accent-2/10 border border-accent-2/20 px-2.5 py-1 rounded-full">
                {t("badge")}
              </span>
            </div>
            <p className="text-[0.875rem] text-text-2">{t("desc")}</p>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-border relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-accent-2 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Body */}
          <div className="px-7 py-7">
            <AnimatePresence mode="wait">
              {/* ── Question steps ── */}
              {step !== "results" && (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-text-3 mb-2">
                    {t("question", { current: step, total: TOTAL_QUESTIONS })}
                  </div>
                  <h3 className="font-display font-bold text-[1.125rem] tracking-[-0.02em] text-white leading-snug mb-2">
                    {questions[step - 1].text}
                  </h3>
                  <p className="text-[0.875rem] text-text-2 leading-relaxed mb-6">
                    {questions[step - 1].sub}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["yes", "partial", "no", "unknown"] as AnswerValue[]).map((val) => (
                      <AnswerBtn
                        key={val}
                        value={val}
                        title={questions[step - 1].answers[val].title}
                        hint={questions[step - 1].answers[val].hint}
                        icon={ICONS[val]}
                        selected={answers[step] === val}
                        onSelect={(v) => selectAnswer(step, v)}
                      />
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-7 pt-5 border-t border-border">
                    {step > 1 ? (
                      <button
                        onClick={() => back(step)}
                        className="px-4 py-2.5 border border-border text-text-2 hover:text-white hover:border-border-strong text-[0.875rem] font-semibold rounded-[6px] transition-all"
                      >
                        ← {t("back")}
                      </button>
                    ) : (
                      <div />
                    )}
                    <button
                      onClick={() => next(step)}
                      disabled={!answers[step]}
                      className="bg-accent hover:bg-accent-hover disabled:opacity-30 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-[6px] text-[0.875rem] font-bold transition-all flex items-center gap-2 hover:shadow-glow-sm"
                    >
                      {step === TOTAL_QUESTIONS ? t("viewResults") : t("next")}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Results ── */}
              {step === "results" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Score area */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-card border border-border rounded-2xl mb-6">
                    <ScoreRing score={score} size={120} animate label={t("results.scoreLabel")} />
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75rem] font-bold mb-2 ${postureColors[postureKey]}`}>
                        {postureLabels[postureKey]}
                      </span>
                      <h3 className="font-display font-extrabold text-[1.375rem] tracking-[-0.03em] text-white mb-2 leading-snug">
                        {headlines[postureKey]}
                      </h3>
                      <p className="text-[0.9375rem] text-text-2 leading-relaxed">
                        {descs[postureKey]}
                      </p>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="mb-6">
                    <h4 className="text-[0.875rem] font-bold uppercase tracking-[0.06em] text-text-2 mb-3">
                      {t("results.findingsTitle")}
                    </h4>
                    {findings.map((f, i) => (
                      <FindingItem key={i} severity={f.severity} title={f.title} desc={f.desc} />
                    ))}
                  </div>

                  {/* CTA block */}
                  <div className="bg-gradient-to-br from-accent/12 to-accent-2/6 border border-accent/25 rounded-2xl p-5 text-center mb-4">
                    <h4 className="font-display font-extrabold text-[1.0625rem] tracking-[-0.02em] text-white mb-2">
                      {t("results.ctaTitle")}
                    </h4>
                    <p className="text-[0.875rem] text-text-2 leading-relaxed mb-5 max-w-md mx-auto">
                      {t("results.ctaDesc")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <a
                        href="#contact"
                        onClick={() =>
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="btn-primary text-[0.9rem] py-3 px-5"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        {t("results.downloadReport")}
                      </a>
                      <a
                        href="#contact"
                        className="btn-outline text-[0.9rem] py-3 px-4"
                        onClick={() =>
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        {t("results.bookCall")}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Restart */}
                  <button
                    onClick={restart}
                    className="w-full border border-border text-text-3 hover:text-text-2 hover:border-border-strong text-[0.8125rem] font-semibold py-2.5 rounded-[6px] transition-all"
                  >
                    ↺ {t("results.restart")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
