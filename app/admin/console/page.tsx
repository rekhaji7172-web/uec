import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { listContent } from "@/app/actions/content"
import { getAnalytics } from "@/app/actions/analytics"
import { AdminConsole } from "@/components/admin-console"

export default async function AdminConsolePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")
  const [content, analytics] = await Promise.all([listContent(), getAnalytics()])
  return <AdminConsole initialContent={content} initialAnalytics={analytics} userName={session.user.name} />
}
