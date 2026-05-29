import { useEffect, useRef } from 'react'
import './MouseGlow.css'

function MouseGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="mouse-glow">
      <div ref={glowRef} className="mouse-glow__gradient" />
    </div>
  )
}

export default MouseGlow
