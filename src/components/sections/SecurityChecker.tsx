"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScoreRing from "@/components/ui/ScoreRing";
import {
  calculateScore,
  FINDING_TEXT,
  type AnswerValue,
  type Answers,
  type QuestionId,
  TOTAL_QUESTIONS,
  FINDINGS,
} from "@/lib/checker";

// ── Severity-Icon ─────────────────────────────────────────────────────────────
function SeverityIcon({ severity }: { severity: "critical" | "warning" | "ok" }) {
  if (severity === "critical") {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-red/10 border border-red/25">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
    );
  }
  if (severity === "warning") {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-amber/10 border border-amber/25">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF9500" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-green/10 border border-green/25">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#28CD41" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  );
}

// ── Answer Option Button ───────────────────────────────────────────────────────
function AnswerOption({
  value,
  title,
  hint,
  selected,
  onSelect,
}: {
  value: AnswerValue;
  title: string;
  hint: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const accentMap: Record<AnswerValue, string> = {
    yes:     "border-green/40 bg-green/[0.04]",
    partial: "border-amber/40 bg-amber/[0.04]",
    no:      "border-red/40 bg-red/[0.04]",
    unknown: "border-border-strong bg-bg-1",
  };
  const dotMap: Record<AnswerValue, string> = {
    yes:     "bg-green",
    partial: "bg-amber",
    no:      "bg-red",
    unknown: "bg-text-3",
  };

  return (
    <button
      onClick={onSelect}
      className={[
        "w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200",
        "flex items-start gap-3",
        selected
          ? accentMap[value] + " ring-1 ring-inset ring-current"
          : "border-border bg-white hover:border-border-strong hover:bg-bg-1",
      ].join(" ")}
    >
      <div className={[
        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
        selected ? "border-current " + dotMap[value] : "border-border-strong",
      ].join(" ")}>
        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      <div>
        <div className="text-[0.875rem] font-semibold text-text-1 leading-snug">{title}</div>
        <div className="text-[0.75rem] text-text-3 mt-0.5 leading-snug">{hint}</div>
      </div>
    </button>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-1 bg-bg-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <span className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 whitespace-nowrap flex-shrink-0">
        {current} / {total}
      </span>
    </div>
  );
}

// ── Results Screen ─────────────────────────────────────────────────────────────
function ResultsScreen({
  score,
  answers,
  locale,
  onRestart,
  tc,
}: {
  score: number;
  answers: Answers;
  locale: string;
  onRestart: () => void;
  tc: ReturnType<typeof useTranslations>;
}) {
  const lang = locale === "de" ? "de" : "en";

  const posture = score >= 80 ? "strong" : score >= 50 ? "attention" : "critical";
  const postureColors = {
    strong:    "text-green border-green/25 bg-green/[0.04]",
    attention: "text-amber border-amber/25 bg-amber/[0.04]",
    critical:  "text-red border-red/25 bg-red/[0.04]",
  };

  // Collect findings
  const findings = (Object.keys(answers) as unknown as QuestionId[]).flatMap((qId) => {
    const answer = answers[Number(qId) as QuestionId];
    if (!answer) return [];
    const finding = FINDINGS[Number(qId) as QuestionId]?.[answer];
    if (!finding) return [];
    const key = finding.titleKey.replace(/\.(title|desc)$/, "");
    const text = FINDING_TEXT[key]?.[lang];
    if (!text) return [];
    return [{ severity: finding.severity, title: text.title, desc: text.desc }];
  });

  const criticalCount = findings.filter((f) => f.severity === "critical").length;
  const warningCount  = findings.filter((f) => f.severity === "warning").length;
  const okCount       = findings.filter((f) => f.severity === "ok").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Score Header */}
      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
        <ScoreRing score={score} size={100} strokeWidth={7} label={tc("results.scoreLabel")} />
        <div>
          <div className={[
            "inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border mb-2",
            postureColors[posture],
          ].join(" ")}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {tc(`results.postures.${posture}`)}
          </div>
          <h3 className="font-display font-bold text-[1.0625rem] text-text-1 leading-snug mb-1">
            {tc(`results.headlines.${posture}`)}
          </h3>
          <p className="text-[0.8125rem] text-text-2 leading-relaxed max-w-[320px]">
            {tc(`results.descs.${posture}`)}
          </p>
        </div>
      </div>

      {/* Finding Summary Pills */}
      <div className="flex items-center gap-2 mb-5">
        {criticalCount > 0 && (
          <span className="text-[0.6875rem] font-bold px-2.5 py-1 rounded-full bg-red/10 border border-red/20 text-red">
            {criticalCount} Kritisch
          </span>
        )}
        {warningCount > 0 && (
          <span className="text-[0.6875rem] font-bold px-2.5 py-1 rounded-full bg-amber/10 border border-amber/20 text-amber">
            {warningCount} Warnung
          </span>
        )}
        {okCount > 0 && (
          <span className="text-[0.6875rem] font-bold px-2.5 py-1 rounded-full bg-green/10 border border-green/20 text-green">
            {okCount} OK
          </span>
        )}
      </div>

      {/* Findings List */}
      <h4 className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-3">
        {tc("results.findingsTitle")}
      </h4>
      <div className="space-y-3 mb-6">
        {/* Sort: critical first, then warning, then ok */}
        {[...findings]
          .sort((a, b) => {
            const order = { critical: 0, warning: 1, ok: 2 };
            return order[a.severity] - order[b.severity];
          })
          .map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-bg-1 border border-border">
              <SeverityIcon severity={f.severity} />
              <div>
                <div className="text-[0.875rem] font-semibold text-text-1 mb-0.5 leading-snug">{f.title}</div>
                <div className="text-[0.8125rem] text-text-2 leading-relaxed">{f.desc}</div>
              </div>
            </div>
          ))}
      </div>

      {/* CTA Block */}
      <div className="rounded-2xl bg-accent/[0.04] border border-accent/20 p-5 mb-4">
        <div className="font-display font-bold text-[1rem] text-text-1 mb-1.5">
          {tc("results.ctaTitle")}
        </div>
        <p className="text-[0.8125rem] text-text-2 leading-relaxed mb-4">
          {tc("results.ctaDesc")}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <a
            href="#contact"
            className="btn-primary text-[0.875rem] py-2.5 px-5"
          >
            {tc("results.bookCall")}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <button
            onClick={onRestart}
            className="btn-outline text-[0.875rem] py-2.5 px-5"
          >
            {tc("results.restart")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SecurityChecker() {
  const tc     = useTranslations("checker");
  const locale = useLocale();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [currentQ, setCurrentQ] = useState<number>(1);
  const [answers,  setAnswers]  = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [direction,   setDirection]   = useState<1 | -1>(1);

  const questions = tc.raw("questions") as Array<{
    text: string;
    sub: string;
    answers: Record<AnswerValue, { title: string; hint: string }>;
  }>;

  const question    = questions[currentQ - 1];
  const currentAns  = answers[currentQ as QuestionId];
  const isLast      = currentQ === TOTAL_QUESTIONS;
  const canProceed  = !!currentAns;

  function selectAnswer(value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [currentQ]: value }));
  }

  function goNext() {
    if (!canProceed) return;
    if (isLast) {
      setShowResults(true);
      return;
    }
    setDirection(1);
    setCurrentQ((q) => q + 1);
  }

  function goBack() {
    if (currentQ === 1) return;
    setDirection(-1);
    setCurrentQ((q) => q - 1);
  }

  function restart() {
    setAnswers({});
    setCurrentQ(1);
    setShowResults(false);
    setDirection(1);
  }

  const score = calculateScore(answers);

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0,       opacity: 1 },
    exit:   (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };

  return (
    <section
      id="security-checker"
      ref={ref}
      className="relative z-10 bg-bg-1 py-24 px-6"
      aria-label={tc("h2")}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-[640px] mb-14"
        >
          <div className="section-label mb-4">{tc("sectionLabel")}</div>
          <h2 className="display-md text-text-1 mb-4">{tc("h2")}</h2>
          <p className="text-[1.0625rem] leading-relaxed text-text-2">{tc("sub")}</p>
        </motion.div>

        {/* Card Layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="grid lg:grid-cols-[1fr_500px] gap-10 items-start"
        >
          {/* Left — Info Panel */}
          <div className="hidden lg:block">
            {/* Tool Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/[0.06] border border-accent/20 rounded-full px-4 py-2 mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[0.8125rem] font-bold text-accent">{tc("title")}</span>
              <span className="text-[0.75rem] font-semibold text-accent-2 bg-accent/10 px-2 py-0.5 rounded-full">
                {tc("badge")}
              </span>
            </div>

            <p className="text-[0.875rem] text-text-3 mb-8">{tc("desc")}</p>

            {/* Question Progress Steps */}
            <div className="space-y-2.5">
              {questions.map((q, i) => {
                const qNum     = (i + 1) as QuestionId;
                const answered = !!answers[qNum];
                const active   = currentQ === qNum && !showResults;
                return (
                  <div
                    key={i}
                    className={[
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200",
                      active   ? "bg-accent/[0.06] border border-accent/20" : "",
                      answered ? "opacity-100" : "opacity-50",
                    ].join(" ")}
                  >
                    <div className={[
                      "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[0.6875rem] font-bold transition-all",
                      answered
                        ? "bg-green/15 border border-green/30 text-green"
                        : active
                          ? "bg-accent text-white"
                          : "bg-bg-2 border border-border text-text-3",
                    ].join(" ")}>
                      {answered ? (
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : qNum}
                    </div>
                    <span className={[
                      "text-[0.8125rem] leading-snug line-clamp-1",
                      active ? "font-semibold text-text-1" : "text-text-2",
                    ].join(" ")}>
                      {q.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Interactive Card */}
          <div className="bg-white border border-border-strong rounded-3xl shadow-card overflow-hidden">
            <div className="p-6 sm:p-7">
              {showResults ? (
                <ResultsScreen
                  score={score}
                  answers={answers}
                  locale={locale}
                  onRestart={restart}
                  tc={tc}
                />
              ) : (
                <>
                  <ProgressBar current={currentQ} total={TOTAL_QUESTIONS} />

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentQ}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {/* Question */}
                      <div className="mb-5">
                        <div className="text-[0.6875rem] font-bold tracking-[0.08em] uppercase text-text-3 mb-2">
                          {tc("question", { current: currentQ, total: TOTAL_QUESTIONS })}
                        </div>
                        <h3 className="font-display font-bold text-[1.0625rem] text-text-1 leading-snug mb-2">
                          {question.text}
                        </h3>
                        <p className="text-[0.8125rem] text-text-2 leading-relaxed">
                          {question.sub}
                        </p>
                      </div>

                      {/* Answer Options */}
                      <div className="space-y-2.5 mb-6">
                        {(["yes", "partial", "no", "unknown"] as AnswerValue[]).map((val) => (
                          <AnswerOption
                            key={val}
                            value={val}
                            title={question.answers[val].title}
                            hint={question.answers[val].hint}
                            selected={currentAns === val}
                            onSelect={() => selectAnswer(val)}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center gap-2.5">
                    {currentQ > 1 && (
                      <button
                        onClick={goBack}
                        className="btn-outline text-[0.875rem] py-2.5 px-4"
                      >
                        ← {tc("back")}
                      </button>
                    )}
                    <button
                      onClick={goNext}
                      disabled={!canProceed}
                      className={[
                        "flex-1 flex items-center justify-center gap-2",
                        "py-3.5 rounded-[8px] font-bold text-[0.9375rem] font-body tracking-[-0.01em]",
                        "transition-all duration-200",
                        canProceed
                          ? "bg-accent hover:bg-accent-hover text-white hover:shadow-glow-sm"
                          : "bg-bg-2 text-text-3 cursor-not-allowed",
                      ].join(" ")}
                    >
                      {isLast ? tc("viewResults") : tc("next")}
                      {canProceed && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
