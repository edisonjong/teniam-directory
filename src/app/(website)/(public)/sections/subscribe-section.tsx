"use client"
import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Mail, SendHorizonal } from "lucide-react"

export default function SubscribeSection() {
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setSubscribeStatus("Please enter your email")
      setTimeout(() => setSubscribeStatus(""), 2000)
      return
    }

    // Here you would typically send the email to your API
    console.log("Subscribing email:", email)
    setSubscribeStatus("Thanks for subscribing!")
    setEmail("")

    // Clear the message after 2 seconds
    setTimeout(() => {
      setSubscribeStatus("")
    }, 2000)
  }

  return (
    <section className="py-16 md:py-32">
      {/* Full-width dashed line */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="border-t border-dashed"></div>
      </div>

      <div className="mx-auto max-w-5xl px-6 mt-16">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">Subscribe to Updates</h2>
          <p className="mt-4 text-muted-foreground">Stay informed about new features and product updates.</p>

          <form onSubmit={handleSubscribe} className="mx-auto mt-10 max-w-sm lg:mt-12">
            <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
              <Mail className="text-muted-foreground pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

              <input
                placeholder="Your email address"
                className="h-14 w-full bg-transparent pl-12 focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="md:pr-1.5 lg:pr-0">
                <Button type="submit" aria-label="submit" className="rounded-(--radius)">
                  <span className="hidden md:inline-block">Get Started</span>
                  <SendHorizonal className="relative mx-auto size-5 md:hidden" strokeWidth={2} />
                </Button>
              </div>
            </div>

            {subscribeStatus && (
              <div className="mt-2 text-center text-sm">
                <span className={subscribeStatus.includes("Thanks") ? "text-green-500" : "text-red-500"}>
                  {subscribeStatus}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
