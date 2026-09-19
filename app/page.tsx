import { getPublicAnnouncements, getPublicTournaments } from "@/app/actions/uec-management"
import { UecApp } from "@/components/uec/uec-app"

export const dynamic = "force-dynamic"

export default async function Page() {
  const [tournaments, announcements] = await Promise.all([
    getPublicTournaments(),
    getPublicAnnouncements(),
  ])
  return <UecApp tournaments={tournaments} announcements={announcements} />
}
