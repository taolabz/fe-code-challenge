export interface ICountry {
  region?: string;
  name?: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  flags?: {
    png: string;
    svg: string;
  };
  population?: number;
  capital?: string[];
  subregion?: string;
  tld?: string[];
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  cca3?: string;
}
