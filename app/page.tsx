'use client'

import Link from 'next/link'
import { AnimatedBackground } from '@/components/animated-background'
import { apps } from '@/config/apps'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <main className="flex-1 container mx-auto px-4 flex items-center justify-center">
        <div className="w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              en<span className="text-blue-600">ai</span>blr
            </h1>
            <p className="text-muted-foreground">Choose an AI tool to get started</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {apps.map((app) => {
              const Icon = app.icon
              return (
                <Link
                  key={app.slug}
                  href={`/${app.slug}`}
                  className="group relative flex flex-col items-center p-6 bg-card hover:bg-accent rounded-xl border transition-colors"
                >
                  <div className="mb-4 p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-semibold">{app.name}</h2>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}