import { useEffect, useRef } from 'react'
import './SpaceScene.css'

function SpaceScene({ theme }) {
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

      {/* Satellite (steady near moon) */}
      <div className="space-scene__satellite">
        <div className="space-scene__satellite-body">
          <div className="space-scene__satellite-panel space-scene__satellite-panel--left" />
          <div className="space-scene__satellite-core" />
          <div className="space-scene__satellite-panel space-scene__satellite-panel--right" />
          <div className="space-scene__satellite-dish" />
        </div>
      </div>

      {/* Astronaut (steady, hammering satellite) */}
      <div className="space-scene__astronaut">
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
          <div className="space-scene__tether" />
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
