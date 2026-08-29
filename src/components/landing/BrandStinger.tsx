"use client";

import {useRef} from "react";
import Image from "next/image";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {sitePath} from "@/lib/site-path";

gsap.registerPlugin(useGSAP);

export function BrandStinger({replayToken = 0}: {replayToken?: number}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const left = root.current.querySelector<HTMLElement>(".entry-stinger__door--left");
    const right = root.current.querySelector<HTMLElement>(".entry-stinger__door--right");
    const seam = root.current.querySelector<HTMLElement>(".entry-stinger__seam");
    if (!left || !right || !seam) return;

    gsap.set(root.current, {autoAlpha: 1});
    gsap.set([left, right], {xPercent: 0});
    gsap.set(seam, {scaleY: 0.08});

    const timeline = gsap.timeline({defaults: {ease: "power4.inOut"}})
      .to(seam, {scaleY: 1, duration: 0.55, ease: "power3.out"})
      .to(left, {xPercent: 0.8, duration: 0.28, ease: "power2.inOut"}, 0.22)
      .to(right, {xPercent: -0.8, duration: 0.28, ease: "power2.inOut"}, 0.22)
      .to(seam, {scaleY: 0.08, duration: 0.35, ease: "power3.in"}, 0.62)
      .to(left, {xPercent: -101, duration: 1.45}, 0.72)
      .to(right, {xPercent: 101, duration: 1.45}, 0.72)
      .set(root.current, {autoAlpha: 0});
    return () => timeline.kill();
  }, {scope: root, dependencies: [replayToken], revertOnUpdate: true});

  return (
    <div className="entry-stinger" ref={root} aria-hidden="true">
      <div className="entry-stinger__door entry-stinger__door--left">
        <span className="entry-stinger__mark"><Image src={sitePath("/media/ryo-wordmark-gold.png")} width={1774} height={887} alt="" priority /></span>
      </div>
      <div className="entry-stinger__door entry-stinger__door--right">
        <span className="entry-stinger__mark"><Image src={sitePath("/media/ryo-wordmark-gold.png")} width={1774} height={887} alt="" priority /></span>
      </div>
      <span className="entry-stinger__seam" />
    </div>
  );
}
