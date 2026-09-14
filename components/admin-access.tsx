"use client"

import { useState, useTransition } from "react"
import { setAdminBlocked } from "@/app/actions/content"

type Admin = { id: string; name: string; blocked: boolean }

export function AdminAccess({ initialAdmins, currentAdminId }: { initialAdmins: Admin[]; currentAdminId: string }) {
  const [admins, setAdmins] = useState(initialAdmins)
  const [pending, startTransition] = useTransition()
  const toggle = (admin: Admin) => {
    if (!window.confirm(`${admin.blocked ? "Unblock" : "Block"} ${admin.name}'s admin access?`)) return
    startTransition(async () => {
      await setAdminBlocked(admin.id, !admin.blocked)
      setAdmins((items) => items.map((item) => item.id === admin.id ? { ...item, blocked: !item.blocked } : item))
    })
  }
  return <section className="admin-access" aria-labelledby="admin-access-title"><div className="admin-access-heading"><div><span className="eyebrow">ACCESS CONTROL</span><h2 id="admin-access-title">Administrators</h2></div><p>Block one account without affecting anyone else.</p></div><div className="admin-access-list">{admins.map((admin) => <div className="admin-access-row" key={admin.id}><div><strong>{admin.name}</strong><span className={admin.blocked ? "blocked" : "active"}>{admin.blocked ? "Access blocked" : "Active"}</span></div>{admin.id === currentAdminId ? <span className="admin-you">You</span> : <button className={admin.blocked ? "admin-unblock" : "admin-block"} disabled={pending} onClick={() => toggle(admin)}>{admin.blocked ? "Unblock" : "Block"}</button>}</div>)}</div></section>
}
