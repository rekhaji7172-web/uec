import { getPublicTournaments } from "@/app/actions/uec-management"
import { CurrentTournamentBanner, getCurrentTournament } from "@/components/current-tournament-banner"
import { UecApp } from "@/components/uec/uec-app"

export const dynamic = "force-dynamic"

export default async function Page() {
  const tournaments = await getPublicTournaments()
  return <><UecApp /><CurrentTournamentBanner tournament={getCurrentTournament(tournaments)} /></>
}
