'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LifeCountdown({ remainingYears }: { remainingYears: number | undefined }) {
  const [remainingTime, setRemainingTime] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Only run the effect if `remainingYears` is defined
    if (remainingYears) {
      // Get the future date by adding the remaining years to the current date
      const endDate = new Date()
      endDate.setFullYear(endDate.getFullYear() + remainingYears)
  
      const calculateRemainingTime = () => {
        const now = new Date().getTime()
        const timeLeft = endDate.getTime() - now // Time difference in milliseconds
  
        if (timeLeft > 0) {
          const seconds = Math.floor(timeLeft / 1000)
          const minutes = Math.floor(seconds / 60)
          const hours = Math.floor(minutes / 60)
          const days = Math.floor(hours / 24)
          const weeks = Math.floor(days / 7)
          const months = Math.floor(days / 30.44) // Approximate months
  
          setRemainingTime({
            months: months,
            weeks: weeks,
            days: days,
            hours: hours % 24, // Keep remainder for hours, minutes, etc.
            minutes: minutes % 60,
            seconds: seconds % 60,
          })
        }
      }
  
      // Run the calculation immediately and every second
      calculateRemainingTime()
      const timer = setInterval(calculateRemainingTime, 1000)
  
      // Cleanup interval on component unmount
      return () => clearInterval(timer)
    }
  }, [remainingYears])
  

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">Your Life Countdown</CardTitle>
        <CardDescription className="text-gray-400">
        <CardDescription>Based on your life expectancy of {remainingYears} years</CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(remainingTime).map(([unit, value]) => (
            <div key={unit} className="bg-primary-foreground rounded-lg p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold break-all">
                {value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 capitalize">{unit}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
