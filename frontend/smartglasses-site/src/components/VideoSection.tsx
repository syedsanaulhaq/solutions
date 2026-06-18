import { PlayCircle } from 'lucide-react';
import { demoVideo } from '@/lib/site';

/**
 * Demo video section. Renders a YouTube embed or an MP4 if configured in
 * `demoVideo` (src/lib/site.ts), otherwise an attractive placeholder.
 */
export function VideoSection() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{demoVideo.heading}</h2>
          <p className="mt-2 text-muted-foreground">{demoVideo.subheading}</p>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          {demoVideo.youtubeId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${demoVideo.youtubeId}`}
              title={demoVideo.heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : demoVideo.mp4Url ? (
            <video
              className="h-full w-full object-cover"
              src={demoVideo.mp4Url}
              poster={demoVideo.poster || undefined}
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-background text-center">
              <PlayCircle className="h-16 w-16 text-primary" />
              <p className="mt-4 px-6 text-sm font-medium text-muted-foreground">
                Demo video coming soon — add a YouTube ID or MP4 in <code>src/lib/site.ts</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
