import { gsap } from "gsap";
import { logInfo } from "../debug/logger";

const animateRoutePaths = () => {
  const paths = gsap.utils.toArray<SVGPathElement>("[data-route-path]");
  logInfo("motion:hero-route-paths", { count: paths.length });

  paths.forEach((path, index) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.15,
      ease: "power2.out",
      delay: 0.35 + index * 0.12,
    });
  });
};

const animateRouteNodes = () => {
  const nodes = gsap.utils.toArray<SVGCircleElement>("[data-route-node]");
  logInfo("motion:hero-route-nodes", { count: nodes.length });

  nodes.forEach((node, index) => {
    gsap.fromTo(
      node,
      { scale: 0.2, transformOrigin: "center center", opacity: 0.4 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.8)",
        delay: 0.78 + index * 0.08,
      }
    );

    gsap.to(node, {
      scale: 1.16,
      duration: 1.9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.25 + index * 0.14,
      transformOrigin: "center center",
    });
  });
};

const animateAtmosphere = () => {
  logInfo("motion:hero-atmosphere:start");

  gsap.fromTo(
    ".hero-map__sweep",
    { xPercent: -118, opacity: 0 },
    {
      xPercent: 118,
      opacity: 1,
      duration: 1.45,
      ease: "power2.out",
      delay: 0.55,
    }
  );

  gsap.to(".hero-map__halo--primary", {
    scale: 1.08,
    opacity: 0.75,
    duration: 2.8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  gsap.to(".hero-map__halo--secondary", {
    scale: 1.12,
    opacity: 0.45,
    duration: 3.3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 0.45,
  });
};

export const animateHero = () => {
  logInfo("motion:hero:start");

  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTimeline
    .from(".hero__visual", {
      opacity: 0,
      scale: 0.96,
      duration: 0.95,
    })
    .from(
      [".hero__copy .eyebrow", ".hero__title", ".hero__lede"],
      {
        y: 34,
        opacity: 0,
        duration: 0.72,
        stagger: 0.12,
      },
      0.12
    )
    .from(
      ".hero__links .link-pill",
      {
        y: 18,
        opacity: 0,
        duration: 0.46,
        stagger: 0.08,
      },
      0.56
    );

  animateAtmosphere();
  animateRoutePaths();
  animateRouteNodes();
  logInfo("motion:hero:timeline-ready");
};
