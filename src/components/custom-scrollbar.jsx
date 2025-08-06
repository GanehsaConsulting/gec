"use client"

import { useState, useEffect, useRef } from 'react'

export function CustomScrollbar() {
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ y: 0, scrollTop: 0 })
  const [hasMounted, setHasMounted] = useState(false)
  
  const trackRef = useRef(null)
  const thumbRef = useRef(null)
  const hideTimerRef = useRef(null)

  // Calculate scrollbar dimensions
  const getScrollbarDimensions = () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return { trackHeight: 0, thumbHeight: 0, maxThumbPosition: 0 }
    }
    const viewportHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const trackHeight = viewportHeight - 32 // minus padding
    const thumbHeight = Math.max(20, (viewportHeight / documentHeight) * trackHeight)
    const maxThumbPosition = trackHeight - thumbHeight

    return { trackHeight, thumbHeight, maxThumbPosition }
  }

  // Update scroll state
  const updateScrollState = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0
    setScrollPercentage(Math.min(100, Math.max(0, scrolled)))
  }

  // Show scrollbar with timer
  const showScrollbar = () => {
    setIsScrolling(true)
    clearTimeout(hideTimerRef.current)
    
    if (!isHovering && !isDragging) {
      hideTimerRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 1500)
    }
  }

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      updateScrollState()
      showScrollbar()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial calculation
    updateScrollState()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(hideTimerRef.current)
    }
  }, [isHovering, isDragging])

  // Handle mouse events for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return

      e.preventDefault()
      
      const { trackHeight, thumbHeight, maxThumbPosition } = getScrollbarDimensions()
      const deltaY = e.clientY - dragStart.y
      const newThumbPosition = Math.min(maxThumbPosition, Math.max(0, (dragStart.scrollTop * (trackHeight - thumbHeight) / 100) + deltaY))
      
      const newScrollPercentage = (newThumbPosition / maxThumbPosition) * 100
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const newScrollTop = (newScrollPercentage / 100) * documentHeight
      
      window.scrollTo({ top: newScrollTop, behavior: 'instant' })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.userSelect = ''
      document.body.style.pointerEvents = ''
    }

    if (isDragging) {
      document.body.style.userSelect = 'none'
      document.body.style.pointerEvents = 'none'
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

  // Handle track click
  const handleTrackClick = (e) => {
    if (isDragging || !trackRef.current) return
    
    const rect = trackRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top - 16 // minus top padding
    const { trackHeight, thumbHeight } = getScrollbarDimensions()
    
    const targetPercentage = Math.min(100, Math.max(0, (clickY / (trackHeight - thumbHeight)) * 100))
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const targetScrollTop = (targetPercentage / 100) * documentHeight
    
    window.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
  }

  // Handle thumb mouse down
  const handleThumbMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsDragging(true)
    setDragStart({
      y: e.clientY,
      scrollTop: scrollPercentage
    })
  }

  // Handle hover events
  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsScrolling(true)
    clearTimeout(hideTimerRef.current)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!isDragging) {
      hideTimerRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 300)
    }
  }
  // Only render after mount to avoid hydration mismatch
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  // Don't render if document height is same as viewport (client-side only)
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      return null
    }
  }

  const { thumbHeight, maxThumbPosition } = getScrollbarDimensions()
  const thumbPosition = (scrollPercentage / 100) * maxThumbPosition

  return (
    <div 
      className={`md:flex hidden fixed right-1 top-0 h-full z-50 transition-all duration-300 ${
        isScrolling ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
      } ${
        isHovering || isDragging ? 'w-4' : 'w-2'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Track */}
      <div 
        ref={trackRef}
        className={`relative h-full cursor-pointer transition-all duration-200 ${
          isHovering || isDragging ? 'w-3' : 'w-2'
        }`}
        onClick={handleTrackClick}
      >
        {/* Track Background */}
        <div 
          className={`absolute top-4 bottom-4 rounded-full transition-all duration-200 ${
            isHovering || isDragging 
              ? 'bg-black/10 dark:bg-white/10 w-full' 
              : 'bg-transparent w-full'
          }`} 
        />
        
        {/* Thumb */}
        <div 
          ref={thumbRef}
          className={`absolute top-4 rounded-full transition-all duration-200 cursor-grab select-none ${
            isDragging 
              ? 'cursor-grabbing bg-black/50 dark:bg-white/50 scale-110' 
              : isHovering 
                ? 'bg-black/40 dark:bg-white/40 hover:bg-black/50 dark:hover:bg-white/50' 
                : 'bg-black/30 dark:bg-white/30'
          } ${
            isHovering || isDragging ? 'w-3 backdrop-blur-sm' : 'w-2 backdrop-blur-lg'
          }`}
          style={{
            height: `${thumbHeight}px`,
            transform: `translateY(${thumbPosition}px)`
          }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </div>
  )
} 