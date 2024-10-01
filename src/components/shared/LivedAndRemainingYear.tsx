import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const LivedAndRemainingYear = ({lifeExpectancy, remainingYears}:{lifeExpectancy: number | undefined, remainingYears: number | undefined}) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <Card>
        <CardHeader>
          <CardTitle>Expected Life</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{lifeExpectancy ? `${lifeExpectancy} years` : "_ _"}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Remaining</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{remainingYears ? `${remainingYears.toFixed(1)} years` : "_ _"}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LivedAndRemainingYear