import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip, ScrollToPlugin);
  // Exposé pour le debug (DevTools / scripts de diagnostic).
  (window as unknown as Record<string, unknown>).gsap = gsap;
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Flip };
