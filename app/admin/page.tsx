import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { listAdmins, listContent } from "@/app/actions/content"
import { getAnalytics } from "@/app/actions/analytics"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminAnalytics } from "@/components/admin-analytics"
import { AdminAccess } from "@/components/admin-access"

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")
  const current = await db.select({ blocked: user.blocked }).from(user).where(eq(user.id, session.user.id)).limit(1)
  if (current[0]?.blocked) redirect("/admin/sign-in?blocked=1")
  const [content, analytics, admins] = await Promise.all([listContent(), getAnalytics(), listAdmins()])
  return <><AdminAnalytics initial={analytics} /><AdminAccess initialAdmins={admins} currentAdminId={session.user.id} /><AdminDashboard initialContent={content} userName={session.user.name} /></>
}
