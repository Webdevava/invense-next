"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LoginForm } from "@/components/forms/login-form";
import Logo from "@/public/logo";

export default function LoginPage() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth >= 1024) {
        gsap.fromTo(
          leftRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 2, ease: "power4.out", delay: 1 }
        );
        gsap.fromTo(
          rightRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 2, ease: "power4.out", delay: 0.4 }
        );
      } else {
        gsap.fromTo(
          leftRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 2, ease: "power4.out", delay: 0.2 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="grid min-h-svh lg:grid-cols-2 p-2 overflow-hidden">
      {/* Left Side */}
      <div
        ref={leftRef}
        className="flex flex-col gap-4 p-6 md:p-10 lg:rounded-l-3xl lg:rounded-r-none rounded-lg"
      >
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-secondary p-1 border text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Logo width={50} height={50} />
            </div>
            <span className="text-xl font-semibold tracking-wide">EL-EXE</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        ref={rightRef}
        className="relative hidden lg:flex rounded-r-3xl"
      >
        <div
          className="rounded-3xl flex w-full border overflow-hidden outline-2 outline-border outline-offset-1 shadow-xl items-end p-2 relative"
          style={{
            backgroundImage: `
              url('/images/energy.jpeg')
            `,
            backgroundBlendMode: "overlay",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `url('https://www.transparenttextures.com/patterns/clean-textile.png')`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
            }}
          />
          <div
            className="relative bg-card/80 h-64 w-full rounded-2xl bg-clip-padding
            backdrop-filter backdrop-blur bg-opacity-10
            backdrop-saturate-100 backdrop-contrast-100
            flex flex-col justify-between p-6 overflow-hidden shadow-lg z-10"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="bg-accent size-12 p-2 rounded-lg border shadow-inner">
                <Logo />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">EL-EXE</h2>
                <p className="text-sm text-muted-foreground">
                  Industrial IoT Monitoring Dashboard
                </p>
              </div>
            </div>

            {/* Main Description */}
            <div className="flex-1 flex flex-col justify-center text-left">
              <p className="text-base font-medium leading-relaxed mt-2">
                Real-time telemetry, alerts, and insights from{" "}
                <span className="text-primary font-semibold">
                  factory floors, devices
                </span>{" "}
                & smart infrastructure — powered by AI and automation.
              </p>
            </div>

            {/* Footer Quote */}
            <div className="text-xs italic text-muted-foreground mt-4">
              “Precision, performance, and predictive insights — all in one
              place.”
            </div>

            {/* Accent Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/40 rounded-full blur-3xl opacity-30 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
}
