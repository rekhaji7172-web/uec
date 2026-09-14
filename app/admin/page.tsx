import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { listContent } from "@/app/actions/content"
import { getAnalytics } from "@/app/actions/analytics"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminAnalytics } from "@/components/admin-analytics"

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")
  const [content, analytics] = await Promise.all([listContent(), getAnalytics()])
  return <><AdminAnalytics initial={analytics} /><AdminDashboard initialContent={content} userName={session.user.name} /></>
}
