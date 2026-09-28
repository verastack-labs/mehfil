"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * A notice you can grab and swing.
 *
 * The board's premise is paper held at a single point, so the notices behave
 * like it: drag one and it rotates about its pin, let go and it settles on a
 * damped spring rather than snapping back.
 *
 * Three things here exist because the naive version stuttered:
 *
 * 1. **The pivot is frozen at grab time.** It used to be recomputed from
 *    `getBoundingClientRect()` on every move, but a rotating element has a
 *    changing bounding box, so the pivot moved, which changed the angle, which
 *    moved the pivot. A feedback loop, and it read as jitter.
 *
 * 2. **The vertical distance is floored.** The angle is measured from the pin
 *    downwards, so as the pointer rises toward the pin that distance tends to
 *    zero, the angle swings wildly and then flips sign as it crosses. Flooring
 *    it means dragging upward simply saturates at the clamp instead of
 *    snapping around.
 *
 * 3. **Pointer events set a target; a frame loop chases it.** `pointermove`
 *    fires more often than the screen refreshes, so writing the rotation
 *    directly from the event both wasted work and surfaced input noise. Moves
 *    now only record where the pointer is, and one rAF loop eases toward it and
 *    writes once per frame. The same loop carries on into the release spring,
 *    so there is no handover.
 *
 * It degrades in three directions. Without JavaScript the notice renders at its
 * resting tilt and reads normally. Under `prefers-reduced-motion` the release
 * spring is skipped. On coarse pointers it does not engage at all, because
 * hijacking touch drags on a phone costs scrolling and buys nothing.
 */

const SPRING = 0.055; // pull back toward rest, on release
const DAMPING = 0.86; // velocity retained per frame, on release
const CHASE = 0.3; // how fast the notice eases toward the pointer while held
const MAX_ANGLE = 14; // degrees either side of rest
const MIN_DY = 60; // never measure the angle from closer than this to the pin

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

  /* Both the breakpoint and the motion preference were read once at mount, so
     resizing across 640px or toggling the OS setting left the drag armed or
     disarmed until a reload. This re-runs the effect when either changes. */
  const [armed, setArmed] = useState(0);
  useEffect(() => {
    const queries = [
      window.matchMedia("(max-width: 640px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const bump = () => setArmed((n) => n + 1);
    queries.forEach((q) => q.addEventListener("change", bump));
    return () => queries.forEach((q) => q.removeEventListener("change", bump));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (window.matchMedia("(max-width: 640px)").matches) return;

    let angle = tilt;
    let target = tilt;
    let velocity = 0;
    let dragging = false;
    let pointerId: number | null = null;
    let grabOffset = 0;
    let raf: number | null = null;

    // Frozen at grab time, in client coordinates. See note 1 above.
    let pivotX = 0;
    let pivotY = 0;

    const apply = () => {
      el.style.rotate = `${angle.toFixed(2)}deg`;
    };

    /** Angle of the pointer about the frozen pin, in CSS degrees.
     *
     * The leading minus sign is load-bearing. Screen coordinates put y
     * downwards, so a positive CSS rotation is clockwise, and clockwise about a
     * pin above the notice carries its bottom to the LEFT: a clock hand at 6
     * moving toward 7. Dragging right therefore needs a negative angle. */
    const angleFrom = (ev: PointerEvent) => {
      const dx = ev.clientX - pivotX;
      const dy = Math.max(MIN_DY, ev.clientY - pivotY);
      return -Math.atan2(dx, dy) * (180 / Math.PI);
    };

    const frame = () => {
      if (dragging) {
        const previous = angle;
        angle += (target - angle) * CHASE;
        velocity = angle - previous;
        apply();
        raf = requestAnimationFrame(frame);
        return;
      }

      velocity += (tilt - angle) * SPRING;
      velocity *= DAMPING;
      angle += velocity;
      apply();

      if (Math.abs(velocity) > 0.01 || Math.abs(angle - tilt) > 0.01) {
        raf = requestAnimationFrame(frame);
      } else {
        angle = tilt;
        el.style.rotate = "";
        raf = null;
      }
    };

    const startLoop = () => {
      if (raf === null) raf = requestAnimationFrame(frame);
    };

    const onDown = (ev: PointerEvent) => {
      // Real controls inside a notice keep their own behaviour.
      if ((ev.target as HTMLElement).closest("button, a, input")) return;

      const r = el.getBoundingClientRect();
      pivotX = pinLeft ? r.left + 32 : r.left + r.width / 2;
      pivotY = r.top - 10;

      dragging = true;
      pointerId = ev.pointerId;
      grabOffset = angleFrom(ev) - angle;
      target = angle;

      el.classList.add("is-dragging");
      // Can throw if the pointer was released between the browser dispatching
      // this event and us handling it. The drag still works without capture; it
      // just stops tracking once the pointer leaves the element.
      try {
        el.setPointerCapture(pointerId);
      } catch {
        /* not fatal */
      }
      startLoop();
    };

    const onMove = (ev: PointerEvent) => {
      if (!dragging || ev.pointerId !== pointerId) return;
      // Record only. The frame loop owns the rotation. See note 3 above.
      const next = angleFrom(ev) - grabOffset;
      target = Math.max(tilt - MAX_ANGLE, Math.min(tilt + MAX_ANGLE, next));
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
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
        angle = tilt;
        el.style.rotate = "";
        return;
      }
      // The loop is already running; it falls through to the spring branch.
      startLoop();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [tilt, pinLeft, armed]);

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
