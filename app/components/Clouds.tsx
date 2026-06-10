"use client";

/**
 * Fixed full-page atmosphere: one continuous warm sky behind every section,
 * so backgrounds never break between sections. Hero-strength glows and
 * drifting clouds, viewport-fixed so the whole page shares one canvas.
 */
export function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden>
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 46% at 50% -8%, rgba(255,212,168,0.7), transparent 65%)," +
            "radial-gradient(42% 36% at -6% 22%, rgba(255,189,214,0.4), transparent 65%)," +
            "radial-gradient(44% 38% at 106% 30%, rgba(213,196,255,0.38), transparent 65%)," +
            "radial-gradient(60% 50% at 50% 112%, rgba(255,184,92,0.42), transparent 70%)," +
            "linear-gradient(180deg, #fff9f0 0%, #fff3e2 50%, #fff8ec 100%)",
        }}
      />
      {/* Living clouds */}
      <div className="cloud cloud-peach animate-drift-a w-[56vw] h-[36vw] -top-[14vw] -left-[10vw]" />
      <div className="cloud cloud-rose animate-drift-b w-[44vw] h-[30vw] top-[2%] -right-[12vw] opacity-70" />
      <div className="cloud cloud-lilac animate-drift-c w-[40vw] h-[28vw] top-[38%] -left-[16vw] opacity-60" />
      <div className="cloud cloud-rose animate-drift-c w-[34vw] h-[24vw] top-[55%] -right-[10vw] opacity-50" />
      <div className="cloud cloud-peach animate-drift-b w-[48vw] h-[30vw] -bottom-[12vw] left-[22%] opacity-75" />
      <div className="cloud cloud-lilac animate-drift-a w-[28vw] h-[20vw] bottom-[8%] -left-[8vw] opacity-45" />
    </div>
  );
}

/**
 * Drifting dream-clouds: huge blurred radial blobs in rose / lilac / peach
 * that slowly morph behind content. Pure CSS animation, GPU-only transforms.
 */
export default function Clouds({ variant = "hero" }: { variant?: "hero" | "soft" }) {
  if (variant === "soft") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="cloud cloud-rose animate-drift-b w-[44vw] h-[30vw] top-[8%] -left-[12vw] opacity-60" />
        <div className="cloud cloud-lilac animate-drift-c w-[38vw] h-[26vw] top-[30%] -right-[10vw] opacity-55" />
        <div className="cloud cloud-peach animate-drift-a w-[50vw] h-[32vw] -bottom-[12vw] left-[18%] opacity-70" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="cloud cloud-peach animate-drift-a w-[58vw] h-[36vw] -top-[14vw] -left-[10vw]" />
      <div className="cloud cloud-rose animate-drift-b w-[46vw] h-[30vw] top-[4%] -right-[14vw] opacity-75" />
      <div className="cloud cloud-lilac animate-drift-c w-[40vw] h-[28vw] top-[36%] -left-[16vw] opacity-65" />
      <div className="cloud cloud-rose animate-drift-c w-[34vw] h-[24vw] bottom-[6%] -right-[8vw] opacity-50" />
      <div className="cloud cloud-peach animate-drift-b w-[44vw] h-[28vw] -bottom-[10vw] left-[24%] opacity-80" />
    </div>
  );
}
