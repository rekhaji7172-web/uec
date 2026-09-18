"use client"

import { useEffect, useState } from "react"

const developerPhoto = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/64e057c3afcf9cc0ed5f729a9747c3ea%20%283%29-qnu79f1XnE3zsuV01EgES6FMXuZb3P.png"

export function DeveloperCreditCard() {
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!contactOpen) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setContactOpen(false) }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [contactOpen])

  const copyUsername = async () => {
    await navigator.clipboard?.writeText("YchessEditz")
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="developer-credit-section" aria-labelledby="developer-credit-title">
      <div className="developer-credit-card">
        <div className="developer-orbit developer-orbit-one" aria-hidden="true" />
        <div className="developer-orbit developer-orbit-two" aria-hidden="true" />
        <div className="developer-credit-copy">
          <span className="eyebrow">Built behind the scenes</span>
          <p className="developer-kicker">Website developer</p>
          <h2 id="developer-credit-title">Meet <span>Yuvraj</span></h2>
          <p className="developer-bio">Hello I am Yuvraj! I designed and built this UEC website to give every editor, season and story a place to shine.</p><p className="developer-credit-note">A creative system for the Unstable SMP editing community.</p>
          <div className="developer-tags" aria-label="Developer specialties"><span>Design</span><span>Frontend</span><span>UEC systems</span></div>
          <button type="button" className="developer-contact-button" onClick={() => setContactOpen(true)}>Contact me <span aria-hidden="true">↗</span></button>
        </div>
        <div className="developer-portrait-wrap">
          <div className="developer-portrait-glow" aria-hidden="true" />
          <img className="developer-portrait" src={developerPhoto} alt="Yuvraj, UEC website developer" />
          <span className="developer-badge">YCHESSEDITZ</span>
        </div>
      </div>
      {contactOpen && <div className="developer-contact-backdrop" role="presentation" onClick={() => setContactOpen(false)}><div className="developer-contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title" onClick={(event) => event.stopPropagation()}><button type="button" className="dialog-close" aria-label="Close contact dialog" onClick={() => setContactOpen(false)}>×</button><span className="eyebrow">Let&apos;s connect</span><h3 id="contact-dialog-title">Talk to Yuvraj</h3><p>My Discord username is <strong>YchessEditz</strong>. Send a friend request to talk.</p><div className="discord-handle"><span>DISCORD</span><strong>YchessEditz</strong></div><button type="button" className="developer-contact-button" onClick={() => void copyUsername()}>{copied ? "Username copied" : "Copy username"}</button></div></div>}
    </section>
  )
}

export { developerPhoto }
