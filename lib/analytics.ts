import { createHash } from "node:crypto"

export function hashVisitor(visitorId: string) {
  return createHash("sha256").update(visitorId).digest("hex")
}
