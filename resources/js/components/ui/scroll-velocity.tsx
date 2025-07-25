import * as React from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[] | string
  velocity: number
  movable?: boolean
  clamp?: boolean
}

const ScrollVelocity = React.forwardRef<HTMLDivElement, ScrollVelocityProps>(
  (
    { children, velocity = 5, movable = true, clamp = false, className, ...props },
    ref
  ) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 100,
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 10000], [0, 5], {
      clamp,
    })

    const x = useTransform(baseX, (v) => `${wrap(0, -100, v)}%`)

    const directionFactor = React.useRef<number>(1)
    const scrollThreshold = React.useRef<number>(5)
    const [isHovered, setIsHovered] = React.useState(false)

    useAnimationFrame((t, delta) => {
      if (!isHovered) {
        if (movable) {
          move(delta)
        } else {
          if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
            move(delta)
          }
        }
      }
    })

function move(delta: number) {
  // Bikin movement jauh lebih lambat, bisa kamu tweak `0.2` untuk super slow
  const adjustedVelocity = velocity * 0.2
  const factor = velocityFactor.get()

  directionFactor.current = 1

  const moveBy =
    directionFactor.current *
    adjustedVelocity *
    (1 + factor) * // tetap dinamis mengikuti scroll, tapi lambat
    (delta / 1000)

  baseX.set(baseX.get() + moveBy)
}


    return (
      <div
        ref={ref}
        className={cn(
          "relative flex overflow-hidden py-2",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <motion.div
          className="flex flex-nowrap gap-6"
          style={{ x }}
          initial={{ x: 0 }} // Start with content visible
        >
          {typeof children === "string" ? (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx}>{children}</div>
              ))}
            </>
          ) : (
            <>
             {children}
             {children}
             {children}
            </>
          )}
        </motion.div>
      </div>
    )
  }
)

ScrollVelocity.displayName = "ScrollVelocity"

export { ScrollVelocity, type ScrollVelocityProps }
