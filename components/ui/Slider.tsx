"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    min: number
    max: number
    step?: number
    value: number[]
    onValueChange: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, min, max, step = 1, value, onValueChange, ...props }, ref) => {
        // Basic single handle slider implementation using native input range for simplicity
        // A true dual-handle range slider requires more complex DOM structure or libraries like Radix Slider
        // For now we assume single value or handle simplistic implementation

        // We will render only one slider for max price if 2 values are provided, or handle "price limit"
        const val = value[1] || value[0] || 0;

        return (
            <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={val}
                    onChange={(e) => onValueChange([value[0] || 0, Number(e.target.value)])}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent-red"
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
