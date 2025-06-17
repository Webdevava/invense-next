'use client'

import Logo from '@/public/logo'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Loading = () => {
  const logoRef = useRef(null)
  const sparkleRef = useRef(null)

  useEffect(() => {
    // Logo animation: subtle scale and glow
    gsap.to(logoRef.current, {
      scale: 1.05,
      boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      duration: 1.3,
    })

    // Sparkle animation: soft pulse effect
    gsap.to(sparkleRef.current, {
      scale: 1.15,
      opacity: 0,
      ease: 'power1.out',
      repeat: -1,
      duration: 1.8,
      delay: 0.4,
    })
  }, [])

  return (
    <>
      <style>{`
        .loading-wrapper {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-container {
          position: relative;
          z-index: 2;
          padding: 4px;
          background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
          border-radius: 10px;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
          transition: background 0.3s ease;
        }

        .dark .logo-container {
          background: linear-gradient(135deg, #1e293b 0%, #2d3748 100%);
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
        }

        .sparkle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 64px;
          height: 64px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          z-index: 1;
          opacity: 0.15;
        }
      `}</style>

      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="loading-wrapper">
          <div className="sparkle" ref={sparkleRef}></div>
          <div className="logo-container size-10 " ref={logoRef}>
            <Logo />
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading