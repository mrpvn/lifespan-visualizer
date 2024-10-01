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
    // Get the future date by adding the remaining years to the current date
    const endDate = new Date()
    if(remainingYears) {
      endDate.setFullYear(endDate.getFullYear() + remainingYears)
    }

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
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        })
      }
    }

    // Run the calculation immediately and every second
    calculateRemainingTime()
    const timer = setInterval(calculateRemainingTime, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(timer)
  }, [remainingYears])

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Your Life Countdown</CardTitle>
        <CardDescription>Based on your life expectancy of {remainingYears} years</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {Object.entries(remainingTime).map(([unit, value]) => (
            <div key={unit} className="bg-secondary rounded-lg p-4">
              <div className="text-3xl font-bold text-primary">{value}</div>
              <div className="text-sm text-muted-foreground capitalize">{unit}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
