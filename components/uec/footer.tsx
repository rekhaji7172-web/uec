import Image from "next/image"

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Image
            src="/uec-logo.png"
            alt="UEC logo"
            width={90}
            height={46}
            style={{ height: 26, width: "auto" }}
          />
          <span className="footer-brand-text">Unstable SMP Community</span>
        </div>
      </div>
    </footer>
  )
}
