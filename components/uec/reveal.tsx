"use client"

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react"

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  id?: string
  "aria-label"?: string
}

/* Fades + lifts content in once when it scrolls into view. Respects
   prefers-reduced-motion by revealing immediately. */
export function Reveal({ children, as, className, delay = 0, id, ...rest }: RevealProps) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${visible ? " is-visible" : ""}${className ? " " + className : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
