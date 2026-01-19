'use client'
import { cn } from '@/lib/utils'

export type ProgressiveBlurProps = {
    className?: string
    direction?: 'left' | 'right' | 'top' | 'bottom'
    blurIntensity?: number
}

export function ProgressiveBlur({
    className,
    direction = 'left',
    blurIntensity = 1
}: ProgressiveBlurProps) {
    const gradientMap = {
        left: 'bg-gradient-to-r from-background via-background/80 to-transparent',
        right: 'bg-gradient-to-l from-background via-background/80 to-transparent',
        top: 'bg-gradient-to-b from-background via-background/80 to-transparent',
        bottom: 'bg-gradient-to-t from-background via-background/80 to-transparent',
    }

    return (
        <div
            className={cn(
                gradientMap[direction],
                className
            )}
            style={{
                backdropFilter: `blur(${blurIntensity}px)`,
            }}
        />
    )
}
