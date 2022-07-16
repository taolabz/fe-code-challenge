import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Card, CardMedia, LinearProgress } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import TextLabel from "../../../components/TextLabel";
import { useCountryList } from "../../../hooks/useCountryList";

function CountryDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  const { loading, list, error } = useCountryList();

  const data = useMemo(() => {
    if (!id) return {};
    const cca3 = id.toLowerCase();
    return list.find((el) => el.cca3?.toLowerCase() === cca3) || {};
  }, [list, id]);

  const borderCountries: {
    cca3: string | undefined;
    name: string | undefined;
  }[] = useMemo(() => {
    if (!data.borders) return [];
    return data.borders.map((el) => {
      const res = list.find((country) => country.cca3 === el);
      return {
        cca3: res?.cca3,
        name: res?.name?.common,
      };
    });
  }, [data, list]);

  return (
    <Box
      sx={{
        m: "0 auto",
        p: { xs: "0 20px 60px", md: "0 60px 60px" },
        maxWidth: "1440px",
      }}
    >
      <Box
        sx={{
          p: { xs: "30px 0", md: "40px 0" },
        }}
      >
        <Button
          sx={{
            fontWeight: 600,
            textTransform: "none",
            bgcolor: "background.paper",
            color: "text.primary",
            pl: "18px",
            pr: "18px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.15)",
          }}
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "8px" }} />
          Back
        </Button>
      </Box>
      {loading && <LinearProgress />}
      {error && <Box>{error}</Box>}
      {data.cca3 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Card
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "start",
              backgroundColor: "transparent",
              mt: { xs: "0px", md: "20px" },
            }}
          >
            <CardMedia
              component="img"
              alt={data.name?.common}
              image={data.flags?.svg}
              onLoad={() => setHasImageLoaded(true)}
              sx={{
                opacity: hasImageLoaded ? 1 : 0,
                transition: "opacity ease-in-out 0.2s",
              }}
            ></CardMedia>
          </Card>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              p: { xs: "30px 6px", md: "30px 70px" },
              color: "text.primary",
            }}
          >
            <Box sx={{ fontSize: { xs: "22px", md: "24px" }, fontWeight: 800 }}>
              {data.name?.common}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  mr: "60px",
                }}
              >
                <TextLabel
                  label="Native Name"
                  text={Object.values(data.name?.nativeName || {})
                    .map((el) => el.common)
                    .join(", ")}
                ></TextLabel>
                <TextLabel
                  label="Population"
                  text={data.population?.toLocaleString("en", {
                    maximumFractionDigits: 0,
                  })}
                ></TextLabel>
                <TextLabel label="Region" text={data.region}></TextLabel>
                <TextLabel label="Sub Region" text={data.subregion}></TextLabel>
                <TextLabel
                  label="Capital"
                  text={data.capital?.join(", ")}
                ></TextLabel>
              </Box>
              <Box>
                <TextLabel
                  label="Top Level Domain"
                  text={data.tld?.join(", ")}
                ></TextLabel>
                <TextLabel
                  label="Currencies"
                  text={Object.values(data.currencies || {})
                    .map((el) => el.name)
                    .join(", ")}
                ></TextLabel>
                <TextLabel
                  label="Languages"
                  text={Object.values(data.languages || {}).join(", ")}
                ></TextLabel>
              </Box>
            </Box>
            {borderCountries.length > 0 && (
              <Box component="p">
                <Box
                  component="span"
                  fontWeight={600}
                  sx={{
                    mr: "12px",
                  }}
                >
                  Border Countries:{" "}
                </Box>
                {borderCountries.map((el) => (
                  <Link
                    to={`/${el.cca3?.toLowerCase()}`}
                    key={el.cca3}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      sx={{
                        fontWeight: 600,
                        textTransform: "none",
                        bgcolor: "background.paper",
                        color: "text.primary",
                        pl: "18px",
                        pr: "18px",
                        m: "6px 12px 6px 0",
                        height: "30px",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {el.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
export default CountryDetail;
