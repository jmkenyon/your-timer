import { cn } from "@/lib/utils"

const TimeBlock = ({
    value,
    label,
    timeRemaining,
  }: {
    value: number
    label: string
    timeRemaining: number
  }) => {
    return (
      <div className="flex flex-col items-center min-w-[60px] sm:min-w-[100px]">
        <span
          className={cn(
            "font-mono font-bold tabular-nums tracking-tight",
            "text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[140px]",
            "transition-colors duration-300",
            timeRemaining === 0 && "text-red-600 animate-pulse",
            timeRemaining < 3600 && timeRemaining > 0 && "text-orange-600"
          )}
        >
          {value.toString().padStart(2, "0")}
        </span>
  
        <span className="mt-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-400">
          {label}
        </span>
      </div>
    )
  }

export default TimeBlock