import { CheckCircle, Users, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: CheckCircle,
    title: "Task management",
    description:
      "Create boards, organize tasks into lists, and track progress with a simple drag-and-drop interface.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Shared workspaces for your team. Everyone stays aligned on what needs to get done.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "Fast syncing and a responsive interface that works across all your devices.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="flex h-screen items-center justify-center px-4 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-amber-600">
            Project management
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Focus on what matters
          </h1>
          <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-amber-500" />
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
            Collaborate, manage projects, and reach your productivity goals with
            FlowFrame.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button variant="amber" size="lg" className="h-12 px-8 text-base">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-foreground sm:text-3xl">
            Everything you need to stay organized
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Simple, powerful features designed to keep your workflow moving.
          </p>

          <div className="mt-20 grid gap-16 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                  <feature.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm font-medium text-foreground">
            FlowFrame
          </span>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FlowFrame. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
