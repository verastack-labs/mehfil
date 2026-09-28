"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * A notice you can grab and swing.
 *
 * The board's premise is paper held at a single point, so the notices behave
 * like it: drag one and it rotates about its pin, let go and it settles on a
 * damped spring rather than snapping back. This is the page's signature
 * interaction and the reason the form was chosen, so it is built rather than
 * imitated with a CSS transition.
 *
 * It degrades in three directions. Without JavaScript the notice renders at
 * its resting tilt and reads normally. Under `prefers-reduced-motion` the
 * spring is skipped and the notice returns to rest immediately. On coarse
 * pointers it does not engage at all, because hijacking touch drags on a phone
 * costs scrolling and buys nothing.
 */

const SPRING = 0.055; // pull back toward rest
const DAMPING = 0.86; // velocity retained per frame
const MAX_ANGLE = 14; // degrees either side of rest

export function SwingNotice({
  children,
  className = "",
  tilt = 0,
  style,
  pinLeft = false,
  as: Tag = "article",
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  style?: CSSProperties;
  pinLeft?: boolean;
  as?: "article" | "div";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(max-width: 640px)").matches;
    if (coarse) return;

    let angle = tilt;
    let velocity = 0;
    let dragging = false;
    let pointerId: number | null = null;
    let grabAngle = 0;
    let raf: number | null = null;

    const pivot = () => {
      const r = el.getBoundingClientRect();
      return {
        x: pinLeft ? r.left + 32 : r.left + r.width / 2,
        y: r.top - 10,
      };
    };

    /* The angle of the pointer about the pin, in CSS degrees.
       The leading minus sign is load-bearing. Screen coordinates put y
       downwards, so a positive CSS rotation is clockwise, and clockwise about
       a pin above the notice carries the bottom of it to the LEFT: think of a
       clock hand at 6 moving toward 7. Dragging right therefore needs a
       negative angle, and without the negation every notice swings away from
       the cursor instead of following it. */
    const angleTo = (ev: PointerEvent) => {
      const p = pivot();
      return -Math.atan2(ev.clientX - p.x, ev.clientY - p.y) * (180 / Math.PI);
    };

    const apply = () => {
      el.style.rotate = `${angle.toFixed(2)}deg`;
    };

    const settle = () => {
      velocity += (tilt - angle) * SPRING;
      velocity *= DAMPING;
      angle += velocity;
      apply();
      if (Math.abs(velocity) > 0.01 || Math.abs(angle - tilt) > 0.01) {
        raf = requestAnimationFrame(settle);
      } else {
        angle = tilt;
        el.style.rotate = "";
        raf = null;
      }
    };

    const onDown = (ev: PointerEvent) => {
      // Real controls inside a notice keep their own behaviour.
      if ((ev.target as HTMLElement).closest("button, a, input")) return;
      dragging = true;
      pointerId = ev.pointerId;
      grabAngle = angleTo(ev) - angle;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      el.classList.add("is-dragging");
      // Can throw if the pointer was released between the browser dispatching
      // this event and us handling it. The drag still works without capture;
      // it just stops tracking once the pointer leaves the element.
      try {
        el.setPointerCapture(pointerId);
      } catch {
        /* not fatal */
      }
    };

    const onMove = (ev: PointerEvent) => {
      if (!dragging || ev.pointerId !== pointerId) return;
      const next = angleTo(ev) - grabAngle;
      const previous = angle;
      angle = Math.max(tilt - MAX_ANGLE, Math.min(tilt + MAX_ANGLE, next));
      velocity = angle - previous;
      apply();
    };

    const onUp = (ev: PointerEvent) => {
      if (!dragging || ev.pointerId !== pointerId) return;
      dragging = false;
      el.classList.remove("is-dragging");
      try {
        if (pointerId !== null && el.hasPointerCapture(pointerId)) {
          el.releasePointerCapture(pointerId);
        }
      } catch {
        /* the pointer is already gone, which is the outcome we wanted */
      }
      pointerId = null;
      if (reduceMotion) {
        angle = tilt;
        el.style.rotate = "";
        return;
      }
      raf = requestAnimationFrame(settle);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [tilt, pinLeft]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement & HTMLDivElement>}
      className={`notice swing ${pinLeft ? "notice-pin-left" : ""} ${className}`}
      style={{ ["--tilt" as string]: `${tilt}deg`, ...style }}
    >
      {children}
    </Tag>
  );
}
