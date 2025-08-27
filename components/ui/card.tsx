// components/ui/card.tsx
import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-action" className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} {...props} />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("px-6", className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
  )
}

type CardMediaProps = React.PropsWithChildren<{
src?: string
  alt?: string
  priority?: boolean
  className?: string
  aspect?: string
  sizes?: string
}>;

function CardMedia({
  src,
  alt,
  priority,
  className,
  aspect = "aspect-video",
  sizes = "100vw",
  children
}: CardMediaProps) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        "relative overflow-hidden rounded-t-xl",
        "[mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]",
        "[-webkit-mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
        ,
        aspect,
        className
      )}
    >
      <Image
        src={src || "0"}
        alt={alt || "0"}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-center"
      />
      {/* Fade suave usando os tokens do tema (shadcn usa HSL vars) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[hsl(var(--card))] to-transparent" />
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardMedia
}
