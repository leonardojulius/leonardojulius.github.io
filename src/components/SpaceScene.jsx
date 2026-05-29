import { useEffect, useRef, useState } from 'react'
import './SpaceScene.css'

function SpaceScene({ theme }) {
  const satelliteRef = useRef(null)
  const astronautRef = useRef(null)
  const animationRef = useRef(null)
  const posRef = useRef({
    satellite: { x: 0, y: 0, angle: 0 },
    astronaut: { x: 0, y: 0, vx: 0, vy: 0 },
  })

  useEffect(() => {
    // Moon center position (relative to the scene)
    const moonCenterX = window.innerWidth - 160
    const moonCenterY = 130
    const orbitRadius = 160

    let time = 0

    // Satellite has its own velocity - tumbling out of control
    const sat = {
      x: moonCenterX + orbitRadius,
      y: moonCenterY,
      vx: -0.3,
      vy: 0.8,
      spin: 0,
      spinRate: 2,
    }

    // Random jolts to simulate malfunctions
    let joltTimer = 0
    let joltInterval = 120 + Math.random() * 200

    const animate = () => {
      time += 1
      joltTimer += 1

      // Gravity pull toward moon (weak, keeps it in the area)
      const gx = moonCenterX - sat.x
      const gy = moonCenterY - sat.y
      const gDist = Math.sqrt(gx * gx + gy * gy)
      const gravity = 0.008
      sat.vx += (gx / gDist) * gravity
      sat.vy += (gy / gDist) * gravity

      // Random malfunction jolts - sudden bursts in random directions
      if (joltTimer > joltInterval) {
        joltTimer = 0
        joltInterval = 80 + Math.random() * 250
        const joltAngle = Math.random() * Math.PI * 2
        const joltForce = 0.4 + Math.random() * 0.8
        sat.vx += Math.cos(joltAngle) * joltForce
        sat.vy += Math.sin(joltAngle) * joltForce
        // Spin changes erratically on malfunction
        sat.spinRate += (Math.random() - 0.5) * 4
      }

      // Light damping (space - very little friction)
      sat.vx *= 0.998
      sat.vy *= 0.998
      sat.spinRate *= 0.999

      // Limit max speed so it doesn't fly off screen
      const satSpeed = Math.sqrt(sat.vx * sat.vx + sat.vy * sat.vy)
      if (satSpeed > 2.5) {
        sat.vx = (sat.vx / satSpeed) * 2.5
        sat.vy = (sat.vy / satSpeed) * 2.5
      }

      // Keep satellite from going too far from moon
      if (gDist > orbitRadius * 2) {
        sat.vx += (gx / gDist) * 0.05
        sat.vy += (gy / gDist) * 0.05
      }

      sat.x += sat.vx
      sat.y += sat.vy
      sat.spin += sat.spinRate

      posRef.current.satellite.x = sat.x
      posRef.current.satellite.y = sat.y

      // Astronaut chases satellite with thruster physics
      const astro = posRef.current.astronaut
      const dx = sat.x - astro.x
      const dy = sat.y - astro.y - 40
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Thruster force - stronger when far, weaker when close
      const thrustPower = 0.05
      if (dist > 15) {
        astro.vx += (dx / dist) * thrustPower
        astro.vy += (dy / dist) * thrustPower
      }

      // Damping
      astro.vx *= 0.97
      astro.vy *= 0.97

      // Limit max speed
      const speed = Math.sqrt(astro.vx * astro.vx + astro.vy * astro.vy)
      if (speed > 2.5) {
        astro.vx = (astro.vx / speed) * 2.5
        astro.vy = (astro.vy / speed) * 2.5
      }

      astro.x += astro.vx
      astro.y += astro.vy

      // Calculate rotation based on velocity direction
      const rotation = Math.atan2(astro.vy, astro.vx) * (180 / Math.PI)

      // Apply positions
      if (satelliteRef.current) {
        satelliteRef.current.style.transform = `translate(${sat.x}px, ${sat.y}px) rotate(${sat.spin}deg)`
      }

      if (astronautRef.current) {
        astronautRef.current.style.transform = `translate(${astro.x}px, ${astro.y}px) rotate(${rotation * 0.3}deg)`
        const thrusterEl = astronautRef.current.querySelector('.space-scene__thruster')
        if (thrusterEl) {
          thrusterEl.style.opacity = dist > 30 ? '1' : '0.3'
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize astronaut position
    posRef.current.astronaut.x = moonCenterX + orbitRadius + 50
    posRef.current.astronaut.y = moonCenterY + 30

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className={`space-scene ${theme === 'light' ? 'space-scene--day' : 'space-scene--night'}`}>
      {/* Stars (night only) */}
      <div className="space-scene__stars">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="space-scene__star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${Math.random() * 2.5 + 1}px`,
              height: `${Math.random() * 2.5 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Sun (day mode) */}
      <div className="space-scene__sun">
        <div className="space-scene__sun-body" />
        <div className="space-scene__sun-rays" />
      </div>

      {/* Moon */}
      <div className="space-scene__moon">
        <div className="space-scene__moon-body">
          <div className="space-scene__crater space-scene__crater--1" />
          <div className="space-scene__crater space-scene__crater--2" />
          <div className="space-scene__crater space-scene__crater--3" />
          <div className="space-scene__crater space-scene__crater--4" />
        </div>
      </div>

      {/* Satellite (JS positioned) */}
      <div ref={satelliteRef} className="space-scene__satellite">
        <div className="space-scene__satellite-body">
          <div className="space-scene__satellite-panel space-scene__satellite-panel--left" />
          <div className="space-scene__satellite-core" />
          <div className="space-scene__satellite-panel space-scene__satellite-panel--right" />
          <div className="space-scene__satellite-dish" />
        </div>
      </div>

      {/* Astronaut (JS positioned, chasing satellite) */}
      <div ref={astronautRef} className="space-scene__astronaut">
        <div className="space-scene__astronaut-body">
          <div className="space-scene__helmet">
            <div className="space-scene__visor" />
          </div>
          <div className="space-scene__suit" />
          <div className="space-scene__arm space-scene__arm--left" />
          <div className="space-scene__arm space-scene__arm--right" />
          <div className="space-scene__leg space-scene__leg--left" />
          <div className="space-scene__leg space-scene__leg--right" />
          <div className="space-scene__backpack" />
          {/* Thruster flames */}
          <div className="space-scene__thruster">
            <div className="space-scene__thruster-flame space-scene__thruster-flame--1" />
            <div className="space-scene__thruster-flame space-scene__thruster-flame--2" />
          </div>
        </div>
      </div>

      {/* Rocket (day mode - approaching moon) */}
      <div className="space-scene__rocket">
        <div className="space-scene__rocket-body">
          <div className="space-scene__rocket-nose" />
          <div className="space-scene__rocket-window" />
          <div className="space-scene__rocket-fin space-scene__rocket-fin--left" />
          <div className="space-scene__rocket-fin space-scene__rocket-fin--right" />
          <div className="space-scene__rocket-flame">
            <div className="space-scene__flame space-scene__flame--1" />
            <div className="space-scene__flame space-scene__flame--2" />
            <div className="space-scene__flame space-scene__flame--3" />
          </div>
        </div>
      </div>

      {/* Transition overlay */}
      <div className="space-scene__transition" />
    </div>
  )
}

export default SpaceScene
