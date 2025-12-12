import React from 'react'
import Image from 'next/image'

interface LogoProps {
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ showText = true, size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <Image
          src="/logo.png"
          alt="Drobe Logo"
          width={64}
          height={64}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Text */}
      {showText && (
        <span 
          className={`${textSizes[size]} lowercase font-bold text-gray-700 dark:text-gray-300`}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'lowercase',
          }}
        >
          drobe
        </span>
      )}
    </div>
  )
}
