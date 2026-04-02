import { gsap } from "gsap";

export const animateRails = () => {
  gsap.utils.toArray<HTMLElement>(".section-rail__line").forEach((line) => {
    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line.closest(".atlas-section"),
          start: "top 80%",
        },
      }
    );
  });
};
