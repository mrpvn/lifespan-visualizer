'use client'

import { useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Globe, Lightbulb, Share2, PlusCircle, Trash2, Brain, Clock, BarChart } from 'lucide-react'
import { ModeToggle } from '@/components/shared/ModeToggle'

export default function LifeSpanVisualizer() {
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')
  const [lifeExpectancy, setLifeExpectancy] = useState(0)
  const [milestones, setMilestones] = useState([
    { age: 22, description: 'Graduate college' },
    { age: 25, description: 'Start dream job' },
    { age: 30, description: 'Buy first home' },
  ])
  const [newMilestone, setNewMilestone] = useState({ age: '', description: '' })
  const [journalEntry, setJournalEntry] = useState('')

  const calculateLifeExpectancy = () => {
    // This is a placeholder calculation. In a real app, this would be based on actual data.
    const baseExpectancy = 80
    const countryFactor = country === 'USA' ? 1 : (country === 'Japan' ? 1.05 : 0.95)
    setLifeExpectancy(baseExpectancy * countryFactor)
  }

  const addMilestone = () => {
    if (newMilestone.age && newMilestone.description) {
      setMilestones([...milestones, newMilestone])
      setNewMilestone({ age: '', description: '' })
    }
  }

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index))
  }

  const livedYears = age ? parseInt(age) : 0
  const remainingYears = lifeExpectancy - livedYears

  useEffect(() => {
    calculateLifeExpectancy();
  }, [age, country])

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
            </div>
          </div>

          {lifeExpectancy > 0 && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <Card>
                  <CardHeader>
                    <CardTitle>Lived</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{livedYears} years</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Remaining</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{remainingYears.toFixed(1)} years</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs>
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
                      <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500"
                          style={{ width: `${(livedYears / lifeExpectancy) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 flex justify-between">
                        <span>Birth</span>
                        <span>Childhood</span>
                        <span>Adolescence</span>
                        <span>Adulthood</span>
                        <span>Life Expectancy</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value='pie'>
                
                </TabsContent>
              </Tabs>


              <Tabs defaultValue="milestones">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
                <TabsContent value="milestones">
                  <Card>
                    <CardHeader>
                      <CardTitle>Life Milestones</CardTitle>
                      <CardDescription>Add important events and future goals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[200px] mb-4">
                        <ul className="space-y-2">
                          {milestones.map((milestone, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span>{milestone.description}</span>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 mr-2">Age {milestone.age}</span>
                                <Button variant="ghost" size="sm" onClick={() => removeMilestone(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                      <div className="flex space-x-2">
                        <Input
                          type="number"
                          placeholder="Age"
                          value={newMilestone.age}
                          onChange={(e) => setNewMilestone({ ...newMilestone, age: e.target.value })}
                        />
                        <Input
                          placeholder="Milestone description"
                          value={newMilestone.description}
                          onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                        />
                        <Button onClick={addMilestone}>
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="health">
                  <Card>
                    <CardHeader>
                      <CardTitle>Health Tracking</CardTitle>
                      <CardDescription>Sync with your fitness apps</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full">
                          <Heart className="mr-2 h-4 w-4" /> Connect Fitness App
                        </Button>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Potential Life Extension</p>
                          <Progress value={15} className="h-2" />
                          <p className="text-xs text-gray-500">
                            Maintaining a healthy lifestyle could add up to 5 years to your life expectancy.
                          </p>
                        </div>
                        <Button className="w-full">
                          <BarChart className="mr-2 h-4 w-4" /> View Detailed Health Stats
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="mindfulness">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mindfulness</CardTitle>
                      <CardDescription>Journal, reflect, and manage your time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="journal">Daily Journal</Label>
                          <Textarea
                            id="journal"
                            placeholder="Write your thoughts here..."
                            value={journalEntry}
                            onChange={(e) => setJournalEntry(e.target.value)}
                          />
                        </div>
                        <blockquote className="italic text-sm text-center">
                          "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well."
                        </blockquote>
                        <p className="text-xs text-gray-500 text-center">- Ralph Waldo Emerson</p>
                        <div className="flex space-x-2">
                          <Button className="flex-1">
                            <Brain className="mr-2 h-4 w-4" /> Daily Challenge
                          </Button>
                          <Button className="flex-1">
                            <Clock className="mr-2 h-4 w-4" /> Time Management Tips
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="global">
                  <Card>
                    <CardHeader>
                      <CardTitle>Global Comparison</CardTitle>
                      <CardDescription>See how you compare to global averages</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Global average life expectancy:</span>
                          <span className="font-bold">72.6 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Your country's average:</span>
                          <span className="font-bold">{lifeExpectancy.toFixed(1)} years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Your life expectancy:</span>
                          <span className="font-bold">{lifeExpectancy.toFixed(1)} years</span>
                        </div>
                        <Progress value={(lifeExpectancy / 100) * 100} className="h-2" />
                        <Button className="w-full">
                          <Globe className="mr-2 h-4 w-4" /> Explore Global Statistics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="community">
                  <Card>
                    <CardHeader>
                      <CardTitle>Community</CardTitle>
                      <CardDescription>Share your journey and connect with others</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full">
                          <Share2 className="mr-2 h-4 w-4" /> Share Your Progress
                        </Button>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">Latest Community Posts</h4>
                          <ul className="space-y-2 text-sm">
                            <li>"Just reached my goal of running a marathon at 50&quot;"</li>
                            <li>"Learning a new language has kept my mind sharp."</li>
                            <li>"Meditation has changed my life. Try it for 10 minutes a day!"</li>
                          </ul>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Lightbulb className="mr-2 h-4 w-4" /> Share a Tip
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}