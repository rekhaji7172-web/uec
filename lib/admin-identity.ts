export function adminEmail(name: string) {
  const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  return `${normalized || "admin"}@uec.local`
}

export function cleanAdminName(name: string) {
  return name.trim().replace(/\s+/g, " ").slice(0, 80)
}
