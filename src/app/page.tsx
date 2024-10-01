"use client"

import CountryAndAgeSelector from "@/components/shared/CountryAndAgeSelector";
import LifeChart from "@/components/shared/LifeChart";
import LivedAndRemainingYear from "@/components/shared/LivedAndRemainingYear";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const [age, setAge] = useState<number | undefined>(undefined)
  const [lifeExpectancy, setLifeExpectancy] = useState<number | undefined>(undefined)
  const [remainingYears, setRemainingYears] = useState<number | undefined>(undefined);

  useEffect(() => {
    if(lifeExpectancy && age) {
      setRemainingYears(lifeExpectancy - age)
    }
  }, [age, lifeExpectancy])

  return (
    <section className="min-h-screen p-4 md:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold">LifeSpan Visualizer</CardTitle>
            <CardDescription>Discover and make the most of your life journey</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle/>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CountryAndAgeSelector setAge={setAge} age={age} setLifeExpectancy={setLifeExpectancy}/>
          </div>
          <div className="mt-8 space-y-6">
            <LivedAndRemainingYear lifeExpectancy={lifeExpectancy} remainingYears={remainingYears}/>
            <LifeChart livedYears={age} remainingYears={remainingYears} lifeExpectancy={lifeExpectancy}/>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
