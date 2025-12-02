import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-[oklch(0.15_0.02_250)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="border-white/10 bg-white/5 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-2xl text-white">Something Went Wrong</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {params?.error ? (
              <p className="text-sm text-white/70 text-center bg-red-500/10 p-3 rounded-md border border-red-500/20">
                Error: {params.error}
              </p>
            ) : (
              <p className="text-sm text-white/70 text-center">An unspecified error occurred. Please try again.</p>
            )}
            <Button
              asChild
              className="w-full bg-[oklch(0.70_0.15_85)] hover:bg-[oklch(0.65_0.15_85)] text-[oklch(0.15_0.02_250)] font-semibold"
            >
              <Link href="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
