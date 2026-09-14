"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { MenuIcon, CloseIcon } from "./icons"

const LINKS = [
  { id: "home", label: "Home" },
  { id: "seasons", label: "Seasons" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "editors", label: "Editors" },
  { id: "awards", label: "Awards" },
  { id: "upcoming", label: "Upcoming" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#home" className="brand" onClick={go("home")} aria-label="UEC home">
          <Image
            src="/uec-logo.png"
            alt="UEC logo"
            width={120}
            height={62}
            priority
            style={{ height: 42, width: "auto", objectFit: "contain", mixBlendMode: "screen" }}
          />
        </a>

        <nav className={`nav-links${open ? " mobile-open" : ""}`} aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link${active === l.id ? " active" : ""}`}
              onClick={go(l.id)}
              aria-current={active === l.id ? "page" : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a className="admin-nav-link" href="/admin/sign-in">Admin login</a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
    </header>
  )
}
