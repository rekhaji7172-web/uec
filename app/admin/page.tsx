import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { listContent } from "@/app/actions/content"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")
  const content = await listContent()
  return <AdminDashboard initialContent={content} userName={session.user.name} />
}
