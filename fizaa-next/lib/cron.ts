// Tiny zero-dependency scheduler: runs the leads report every day at 01:00
// server local time. Started once from instrumentation.ts on server boot.
import { sendLeadsReport } from "./mailer";

function msUntilNext(hour = 1, minute = 0): number {
  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}

let started = false;

export function startLeadsCron() {
  if (started) return;
  started = true;
  const schedule = () => {
    const delay = msUntilNext(1, 0);
    const timer = setTimeout(async () => {
      try {
        await sendLeadsReport();
      } catch (err) {
        console.error("  [leads] Nightly report failed:", (err as Error).message);
      }
      schedule();
    }, delay);
    if (timer.unref) timer.unref();
    console.log(`  Nightly leads email scheduled in ~${(delay / 3600000).toFixed(1)}h (01:00 daily).`);
  };
  schedule();
}
