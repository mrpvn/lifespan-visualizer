import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { countries } from '@/constant'

const CountryAndAgeSelector: React.FC<CountryAndAgeSelectorProp> = ({age, setAge, setLifeExpectancy}) => {
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country</Label>
            <Select onValueChange={setLifeExpectancy}>
              <SelectTrigger className='mt-1' id="country">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {
                  countries?.map((country) => (
                    <SelectItem key={country.value} value={country.averageLife}>{country.countryName}</SelectItem>

                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" className='mt-1' type="number" min={1} placeholder="Enter your age" value={age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)} />
          </div>
        </div>
  )
}

export default CountryAndAgeSelector