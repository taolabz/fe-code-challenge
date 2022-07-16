import axios from "axios";
import { useEffect, useState } from "react";
import { ICountry } from "../models/countries";

function useCountryList() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ICountry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storagedCountries = localStorage.getItem("countries");
    if (storagedCountries) {
      try {
        setList(JSON.parse(storagedCountries));
        return;
      } catch {
        console.error("Failed to load local country list");
      }
    }
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (res.status === 200 && res.data instanceof Array) {
          setList(res.data);
          localStorage.setItem("countries", JSON.stringify(res.data));
        } else {
          setError("Unable to reach the server, try again");
        }
      })
      .catch((err) => {
        setError("Unable to reach the server, try again");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, list, error };
}

export { useCountryList };
