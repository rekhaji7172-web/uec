import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { listEditors, listTournaments } from "@/app/actions/uec-management"
import { UecManagementWorkspace } from "@/components/uec-management-workspace"

export const dynamic = "force-dynamic"

export default async function ManagementPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")
  const [tournaments, editors] = await Promise.all([listTournaments(), listEditors()])
  return <main className="admin-management-page"><UecManagementWorkspace initialTournaments={tournaments} initialEditors={editors} /></main>
}
