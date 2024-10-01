interface Country {
  countryName?: string;
  value?: number;
  averageLife?: number
}

interface CountryAndAgeSelectorProp {
  setLifeExpectancy: React.Dispatch<React.SetStateAction>;
  age?: number;
  setAge: React.Dispatch<React.SetStateAction>
}