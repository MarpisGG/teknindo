  import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  company?: string
  testimonial: string
  rating?: number
  image?: string
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  ({ name, company, testimonial, rating = 5, image, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-primary/10 bg-background p-6 transition-all transform hover:scale-105 hover:shadow-lg  md:p-8",
          className
        )}
        {...props}
      >
        <div className="absolute right-6 top-6 text-6xl font-serif text-muted-foreground/20">
          "
        </div>

        <div className="flex flex-col gap-4 justify-between h-full">
          {rating > 0 && (
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
          key={index}
          size={16}
          className={cn(
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          )}
            />
          ))}
        </div>
          )}

          <p className="text-pretty text-base text-muted-foreground">
        {testimonial}
          </p>

          <div className="flex items-center gap-4 justify-start">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground">{name}</h3>
          </div>
        </div>
          </div>
        </div>
      </div>
    )
  }
)
Testimonial.displayName = "Testimonial"

export { Testimonial }