interface CountryAndAgeSelectorProp {
  setLifeExpectancy: React.Dispatch<React.SetStateAction>;
  age?: number;
  setAge: React.Dispatch<React.SetStateAction>
}

type ChartDataType = {
  lifeYears: string;
  years: number | undefined;
  fill: string;
}