"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(QUERY).matches;

/**
 * The server, and the client through hydration, have no media query to read,
 * so both report "reduce". Guessing the other way meant a real reduced-motion
 * user hydrated motion-allowed markup and got a burst of movement before the
 * first client snapshot arrived. Motion is opt-in, never opt-out.
 */
const getServerSnapshot = () => true;

/**
 * Reads `prefers-reduced-motion` straight from matchMedia.
 *
 * Framer's own `useReducedMotion` did not reliably reflect the media query
 * here, and several sections change layout (not just animation) when motion is
 * reduced, so this needs to be correct rather than best effort.
 *
 * The preference resolves during render rather than inside an effect. A hook
 * that resolved in `useEffect` handed every consumer a false "motion is fine"
 * on the first client render, which ran before the layout effects that rewind
 * state ahead of an animation, and the counters never recovered.
 *
 * `false` therefore means something specific: matchMedia has run on this
 * client and explicitly reported no-preference. Callers can treat a `false`
 * here as permission to start animating, and anything else as "stay still".
 */
export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
