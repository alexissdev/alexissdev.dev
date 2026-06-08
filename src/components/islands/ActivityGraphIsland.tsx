"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ContributionData } from "@/lib/github";

const DAYS = ["Mon", "", "Wed", "", "Fri", "", ""];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getColor(count: number, max: number): string {
  if (count === 0) return "rgba(255,255,255,0.04)";
  const intensity = count / max;
  if (intensity < 0.25) return "rgba(109,40,217,0.35)";
  if (intensity < 0.5)  return "rgba(124,58,237,0.55)";
  if (intensity < 0.75) return "rgba(139,92,246,0.75)";
  return "rgba(167,139,250,0.95)";
}

function getMonthLabels(weeks: ContributionData["weeks"]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const d = new Date(week.days[0]?.date ?? "");
    const m = d.getMonth();
    if (m !== lastMonth) {
      labels.push({ label: MONTHS[m], col: i });
      lastMonth = m;
    }
  });
  return labels;
}

interface Props {
  data: ContributionData;
}

export default function ActivityGraphIsland({ data }: Props) {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const max = Math.max(...data.weeks.flatMap((w) => w.days.map((d) => d.count)), 1);
  const monthLabels = getMonthLabels(data.weeks);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/25 uppercase tracking-widest">Contributions this year</p>
        <span className="text-xs text-purple-400/60 font-mono">{data.total.toLocaleString()} total</span>
      </div>

      <div className="relative overflow-x-auto pb-1">
        {/* Month labels */}
        <div className="flex mb-1.5 pl-7" style={{ gap: "3px" }}>
          {data.weeks.map((_, i) => {
            const label = monthLabels.find((m) => m.col === i);
            return (
              <div key={i} className="w-[11px] shrink-0 text-[9px] text-white/20 select-none">
                {label?.label ?? ""}
              </div>
            );
          })}
        </div>

        <div className="flex gap-0" style={{ gap: "3px" }}>
          {/* Day labels */}
          <div className="flex flex-col mr-1.5" style={{ gap: "3px" }}>
            {DAYS.map((d, i) => (
              <div key={i} className="h-[11px] text-[9px] text-white/20 select-none leading-none flex items-center">
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          {data.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap: "3px" }}>
              {week.days.map((day, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: wi * 0.004 + di * 0.002 }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({ date: day.date, count: day.count, x: rect.left, y: rect.top });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  className="w-[11px] h-[11px] rounded-[2px] transition-transform hover:scale-125"
                  style={{ background: getColor(day.count, max) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 justify-end">
        <span className="text-[10px] text-white/20">Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <div key={v} className="w-[10px] h-[10px] rounded-[2px]"
            style={{ background: getColor(v === 0 ? 0 : v * max, max) }} />
        ))}
        <span className="text-[10px] text-white/20">More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 bg-secondary border border-white/10 rounded-lg text-xs text-white/70 shadow-xl"
          style={{ left: tooltip.x + 16, top: tooltip.y - 36 }}
        >
          <span className="text-white/40">{tooltip.date} — </span>
          <span className="font-medium">{tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}</span>
        </div>
      )}
    </motion.div>
  );
}
