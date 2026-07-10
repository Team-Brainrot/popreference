import type { Metadata } from "next"
import { LoginView } from "@/components/login-view"

export const metadata: Metadata = {
  title: "Log In — PopRef",
  description: "Log in to your PopRef account to keep decoding the latest teen slang.",
}

export default function LoginPage() {
  return <LoginView />
}
