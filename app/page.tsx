import { db } from "@/lib/db"
import { siteContent } from "@/lib/db/schema"
import { asc, eq } from "drizzle-orm"
import { UecApp } from "@/components/uec/uec-app"

export const dynamic = "force-dynamic"

export default async function Page() {
  const publishedContent = await db.select({ id: siteContent.id, kind: siteContent.kind, slug: siteContent.slug, title: siteContent.title, description: siteContent.body }).from(siteContent).where(eq(siteContent.published, true)).orderBy(asc(siteContent.position))
  return <UecApp publishedContent={publishedContent.map((item) => ({ ...item, description: item.description?.description ?? "" }))} />
}
