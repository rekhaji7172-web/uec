import { exec } from "node:child_process"
import { promisify } from "node:util"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const execAsync = promisify(exec)
const projectRoot = "/vercel/share/v0-project"

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await request.json().catch(() => null) as { command?: string } | null
  const command = body?.command?.trim()
  if (!command) return NextResponse.json({ error: "Enter a command first." }, { status: 400 })
  if (command.length > 2000) return NextResponse.json({ error: "Command is too long." }, { status: 400 })
  try {
    const result = await execAsync(command, { cwd: projectRoot, timeout: 120000, maxBuffer: 1024 * 1024 * 4, env: process.env })
    return NextResponse.json({ output: [result.stdout, result.stderr].filter(Boolean).join("\n") || "Command completed with no output." })
  } catch (error) {
    const failure = error as { stdout?: string; stderr?: string; message?: string }
    return NextResponse.json({ output: [failure.stdout, failure.stderr, failure.message].filter(Boolean).join("\n") || "Command failed." }, { status: 200 })
  }
}
