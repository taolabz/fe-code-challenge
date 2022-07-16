import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
} from "@mui/material";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import StyledSelect from "../../components/Styled/Select";
import CountryCard from "../../components/CountryCard";
import { Link } from "react-router-dom";
import { useCountryList } from "../../hooks/useCountryList";

function Country() {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const { loading, list, error } = useCountryList();

  const filteredList = useMemo(() => {
    const lc_country = country.toLowerCase();
    return list
      .filter((el) => (region === "" ? true : el.region === region))
      .filter((el) =>
        country === ""
          ? true
          : (el.name?.common || "").toLowerCase().indexOf(lc_country) > -1 ||
            (el.name?.official || "").toLowerCase().indexOf(lc_country) > -1
      )
      .sort((a, b) => {
        return a.name?.common?.localeCompare(b.name?.common || "") || -1;
      });
  }, [list, country, region]);

  return (
    <Box
      sx={{
        m: "0 auto",
        p: { xs: "0 20px", md: "0 60px" },
        maxWidth: "1440px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          p: { xs: "30px 0", md: "40px 0" },
        }}
      >
        <Paper
          component="form"
          elevation={0}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: 1, md: 400 },
            height: "52px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ p: "10px", color: "text.secondary" }}>
            <FontAwesomeIcon
              style={{ fontSize: "14px" }}
              icon={faMagnifyingGlass}
            />
          </Box>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for a country..."
            inputProps={{ "aria-label": "search for a country" }}
            onChange={(e) => setCountry(e.target.value as string)}
          />
        </Paper>
        <Paper
          component="form"
          elevation={0}
          sx={{
            width: "200px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            mt: { xs: "30px", md: "0" },
            height: "52px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel
              id="region-select-label"
              shrink={false}
              sx={{
                "&.MuiInputLabel-root": {
                  color: "text.secondary",
                },
              }}
            >
              {region === "" ? "Filter by Region" : ""}
            </InputLabel>
            <StyledSelect
              labelId="region-select-label"
              value={region}
              inputProps={{ "aria-label": "filter by region" }}
              onChange={(e) => setRegion(e.target.value as string)}
            >
              <MenuItem value="">All Regions</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="Americas">Americas</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
            </StyledSelect>
          </FormControl>
        </Paper>
      </Box>
      <Box pb="40px">
        {loading && <LinearProgress />}
        {error && <Box>{error}</Box>}
        <Grid container spacing={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
          {filteredList.map((el) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`${el.cca3}`}>
                <Link
                  to={`/${el.cca3?.toLowerCase()}`}
                  style={{ textDecoration: "none" }}
                >
                  <CountryCard
                    flag={el.flags?.svg}
                    name={el.name?.common}
                    population={el.population}
                    capital={el.capital}
                    region={el.region}
                  ></CountryCard>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
export default Country;
