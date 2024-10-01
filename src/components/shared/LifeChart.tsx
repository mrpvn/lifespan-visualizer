"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const LifeChart = ({
  livedYears,
  remainingYears,
  lifeExpectancy
}: {
  livedYears: number | undefined;
  remainingYears: number | undefined;
  lifeExpectancy: number | undefined;
}) => {
  const [chartData, setChartData] = useState<ChartDataType[]>([])
  
  useEffect(() => {
    if (lifeExpectancy !== undefined && remainingYears !== undefined) {
      setChartData([
        { lifeYears: "livedYears", years: lifeExpectancy - remainingYears, fill: "hsl(var(--primary))"},
        { lifeYears: "remainingYears", years: remainingYears, fill: "hsl(var(--muted))"},
      ])
    }
  }, [livedYears, remainingYears])

  const timelinePercentage = livedYears && lifeExpectancy ? (livedYears / lifeExpectancy) * 100 : 0

  return (
    <Tabs defaultValue="line">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="line">Line</TabsTrigger>
        <TabsTrigger value="pie">Pie</TabsTrigger>
      </TabsList>
      <TabsContent value='line'>
        <Card>
          <CardHeader>
            <CardTitle>Life Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500"
                style={{ width: `${timelinePercentage}%` }}
                role="progressbar"
                aria-valuenow={timelinePercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground flex justify-between">
              {['Birth', 'Childhood', 'Adolescence', 'Adulthood', 'Life Expectancy'].map((label, index) => (
                <span key={index} className="text-center" style={{width: '20%'}}>{label}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='pie'>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Life Years Pie Chart</CardTitle>
            <CardDescription>Visualize your lived and remaining years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {chartData.length > 0 && (
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="years"
                      >
                        {chartData.map((data, index) => (
                          <Cell key={`cell-${index}`} fill={data.fill} />
                        ))}
                      </Pie>
                    )}
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl font-bold fill-primary"
                    >
                      {`${livedYears ?? '_ _'} / ${lifeExpectancy ?? '_ _'}`}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 rounded-full bg-primary" />
                  Lived Years: {livedYears ?? 'N/A'}
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 rounded-full bg-muted" />
                  Remaining Years: {remainingYears?.toFixed(1) ?? 'N/A'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default LifeChart