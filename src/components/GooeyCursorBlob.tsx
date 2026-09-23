import React, { useEffect, useRef, useState } from 'react';

interface JellyNode {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  orbitDist: number;
  orbitSpeed: number;
  orbitAngle: number;
  bounceFreq: number;
  bounceAmp: number;
  phase: number;
  lerpFactor: number;
  color: string;
}

export const GooeyCursorBlob: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Target mouse position
  const mouseRef = useRef({ x: -400, y: -400 });
  const prevMouseRef = useRef({ x: -400, y: -400 });
  const velocityRef = useRef({ x: 0, y: 0, speed: 0 });

  // Jelly nodes that constantly bounce, swirl, and orbit around the cursor
  const nodesRef = useRef<JellyNode[]>([
    // Core Nucleus (Teal & Cyan)
    {
      x: -400,
      y: -400,
      radius: 135,
      baseRadius: 135,
      orbitDist: 28,
      orbitSpeed: 0.5,
      orbitAngle: 0,
      bounceFreq: 2.5,
      bounceAmp: 18,
      phase: 0,
      lerpFactor: 0.18,
      color: 'url(#jellyCoreGradient)',
    },
    // Major Orbiting Jelly Pod 1 (Cyan & Teal)
    {
      x: -400,
      y: -400,
      radius: 105,
      baseRadius: 105,
      orbitDist: 85,
      orbitSpeed: -2.6,
      orbitAngle: 1.2,
      bounceFreq: 4.1,
      bounceAmp: 24,
      phase: 1.2,
      lerpFactor: 0.14,
      color: 'url(#jellyTealCyanGradient)',
    },
    // Major Orbiting Jelly Pod 2 (Cyan & Electric Blue)
    {
      x: -400,
      y: -400,
      radius: 92,
      baseRadius: 92,
      orbitDist: 100,
      orbitSpeed: 1,
      orbitAngle: 2.5,
      bounceFreq: 3.7,
      bounceAmp: 22,
      phase: 2.5,
      lerpFactor: 0.11,
      color: 'url(#jellyCyanBlueGradient)',
    },
    // Bouncing Spring Droplet (Emerald & Teal)
    {
      x: -400,
      y: -400,
      radius: 78,
      baseRadius: 78,
      orbitDist: 115,
      orbitSpeed: -3.8,
      orbitAngle: 3.8,
      bounceFreq: 5.2,
      bounceAmp: 28,
      phase: 3.8,
      lerpFactor: 0.09,
      color: 'url(#jellyEmeraldTealGradient)',
    },
    // Fast Swirling Satellite (Electric Blue & Cyan)
    {
      x: -400,
      y: -400,
      radius: 64,
      baseRadius: 64,
      orbitDist: 130,
      orbitSpeed: 2,
      orbitAngle: 4.9,
      bounceFreq: 4.8,
      bounceAmp: 20,
      phase: 4.9,
      lerpFactor: 0.07,
      color: 'url(#jellyBlueCyanGradient)',
    },
    // Peripheral Bouncing Bloblet (Vibrant Teal-Green)
    {
      x: -400,
      y: -400,
      radius: 50,
      baseRadius: 50,
      orbitDist: 145,
      orbitSpeed: -5.1,
      orbitAngle: 5.8,
      bounceFreq: 6.0,
      bounceAmp: 22,
      phase: 5.8,
      lerpFactor: 0.05,
      color: 'url(#jellyTealCyanGradient)',
    },
  ]);

  // Master clock for continuous bouncing and harmonic motion
  const clockRef = useRef(0);

  // DOM node references for 60fps direct SVG updates
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const highlightCircleRef = useRef<SVGCircleElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    mouseRef.current = { x: initialX, y: initialY };
    prevMouseRef.current = { x: initialX, y: initialY };
    nodesRef.current.forEach((node) => {
      node.x = initialX;
      node.y = initialY;
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        if (!isVisible) setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;

    const render = () => {
      // 1. Advance continuous bouncing clock
      clockRef.current += 0.038;
      const t = clockRef.current;

      // 2. Mouse velocity for stretch and inertia
      const dx = mouseRef.current.x - prevMouseRef.current.x;
      const dy = mouseRef.current.y - prevMouseRef.current.y;
      prevMouseRef.current.x = mouseRef.current.x;
      prevMouseRef.current.y = mouseRef.current.y;

      const rawSpeed = Math.hypot(dx, dy);
      velocityRef.current.speed += (rawSpeed - velocityRef.current.speed) * 0.12;
      const speed = velocityRef.current.speed;

      const nodes = nodesRef.current;

      // 3. Update each node with continuous bouncing orbits & spring physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Harmonic bouncing distance (pulses in and out rhythmically)
        const bounceOffset = Math.sin(t * node.bounceFreq + node.phase) * node.bounceAmp;
        const currentOrbitDist = Math.max(15, node.orbitDist + bounceOffset);

        // Continuous angular progression
        const angle = t * node.orbitSpeed + node.orbitAngle;

        // Lissajous undulating wobble in X and Y (moving around cursor even when stationary)
        const wobbleX = Math.cos(angle) * currentOrbitDist + Math.sin(t * 1.7 + i) * 16;
        const wobbleY = Math.sin(angle) * currentOrbitDist + Math.cos(t * 2.1 + i) * 16;

        // Inertial velocity offset when moving
        const inertiaX = -dx * (0.8 / (i + 1));
        const inertiaY = -dy * (0.8 / (i + 1));

        // Target position centered around cursor with harmonic bouncing
        const targetX = mouseRef.current.x + wobbleX + inertiaX;
        const targetY = mouseRef.current.y + wobbleY + inertiaY;

        // Elastic spring interpolation
        node.x += (targetX - node.x) * node.lerpFactor;
        node.y += (targetY - node.y) * node.lerpFactor;

        // Jelly squash & stretch + breathing radius
        const stretchEffect = Math.min(35, speed * 0.3);
        const breathPulse = Math.sin(t * (node.bounceFreq * 0.8) + node.phase) * 12;
        const dynamicRadius = Math.max(
          20,
          node.baseRadius + (i === 0 ? stretchEffect * 0.5 : -stretchEffect * 0.25) + breathPulse
        );
        node.radius = dynamicRadius;

        // Direct DOM update
        const circleElem = circleRefs.current[i];
        if (circleElem) {
          circleElem.setAttribute('cx', node.x.toFixed(1));
          circleElem.setAttribute('cy', node.y.toFixed(1));
          circleElem.setAttribute('r', dynamicRadius.toFixed(1));
        }
      }

      // 4. Update glossy highlight glint on core nucleus
      if (highlightCircleRef.current && nodes[0]) {
        const core = nodes[0];
        const glintOffset = Math.sin(t * 2) * 5;
        const glintX = core.x - 30 + glintOffset;
        const glintY = core.y - 30 + glintOffset;
        highlightCircleRef.current.setAttribute('cx', glintX.toFixed(1));
        highlightCircleRef.current.setAttribute('cy', glintY.toFixed(1));
      }

      // 5. Update ambient glow aura positioning
      if (auraRef.current && nodes[0]) {
        const core = nodes[0];
        auraRef.current.style.transform = `translate3d(${core.x - 300}px, ${core.y - 300}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      id="gooey-jelly-cursor-container"
      className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Ambient soft glow aura in Teal / Cyan / Emerald */}
      <div
        ref={auraRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-teal-500/25 via-cyan-500/25 to-emerald-500/20 blur-3xl pointer-events-none will-change-transform"
      />

      {/* SVG Container with Gooey Gelatin Surface-Tension Filter */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none overflow-visible">
        <defs>
          {/* 1. Core Nucleus Gradient (Teal -> Cyan -> Emerald -> Blue) */}
          <linearGradient id="jellyCoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#06b6d4" stopOpacity="0.80" />
            <stop offset="80%" stopColor="#10b981" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.70" />
          </linearGradient>

          {/* 2. Teal & Cyan Gradient */}
          <linearGradient id="jellyTealCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.70" />
          </linearGradient>

          {/* 3. Cyan & Electric Blue Gradient */}
          <linearGradient id="jellyCyanBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.80" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.75" />
          </linearGradient>

          {/* 4. Emerald & Teal Gradient */}
          <linearGradient id="jellyEmeraldTealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.80" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.75" />
          </linearGradient>

          {/* 5. Electric Blue & Cyan Gradient */}
          <linearGradient id="jellyBlueCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.80" />
            <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.70" />
          </linearGradient>

          {/* Translucent jelly highlight glint */}
          <radialGradient id="jellyGlintGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#cffafe" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          {/* Liquid Jelly Gooey Metaballs Filter for Large Scale */}
          <filter id="gooey-jelly-filter" x="-100%" y="-100%" width="300%" height="300%">
            {/* 1. Gaussian blur to blend overlapping particles together */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="jellyBlur" />
            
            {/* 2. Color matrix clamp to sharpen blurred edges into a solid, cohesive fluid surface */}
            <feColorMatrix
              in="jellyBlur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 30 -11"
              result="jellySurface"
            />

            {/* 3. Blend with SourceGraphic for luminous core and fluid bridge */}
            <feBlend in="SourceGraphic" in2="jellySurface" mode="screen" />
          </filter>
        </defs>

        {/* Group with the Gooey Jelly Filter applied */}
        <g
          filter="url(#gooey-jelly-filter)"
          className="transition-opacity duration-300"
          style={{ mixBlendMode: 'screen' }}
        >
          {/* Continuously Bouncing & Orbiting Jelly Pods */}
          {nodesRef.current.map((node, index) => (
            <circle
              key={index}
              ref={(el) => {
                circleRefs.current[index] = el;
              }}
              cx={node.x}
              cy={node.y}
              r={node.radius}
              fill={node.color}
            />
          ))}

          {/* Glossy Liquid Specular Highlight on Core */}
          <circle
            ref={highlightCircleRef}
            cx={nodesRef.current[0].x - 30}
            cy={nodesRef.current[0].y - 30}
            r={30}
            fill="url(#jellyGlintGradient)"
            opacity={0.85}
          />
        </g>
      </svg>
    </div>
  );
};
