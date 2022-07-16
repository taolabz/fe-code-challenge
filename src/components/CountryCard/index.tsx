import { Card, CardContent, CardMedia } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import TextLabel from "../TextLabel";

interface ICountryCardProps {
  name?: string;
  flag?: string;
  population?: number;
  region?: string;
  capital?: string[];
}

function CountryCard(props: ICountryCardProps) {
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.15)",
        position: "relative",
        transition: "transform ease-in-out 0.2s",
        "&:hover": {
          transform: "scale(1.08)",
        },
      }}
    >
      <Box
        sx={{
          pt: "56.25%",
          height: 0,
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          alt={props.name}
          image={props.flag}
          onLoad={() => setHasImageLoaded(true)}
          sx={{
            position: "absolute",
            top: 0,
            height: 1,
          }}
        ></CardMedia>
      </Box>
      <Box
        sx={{
          position: "absolute",
          pt: "56.25%",
          height: 0,
          top: 0,
          left: 0,
          backgroundColor: "#aab4be",
          width: 1,
          transition: "opacity ease-in-out 0.2s",
          opacity: hasImageLoaded ? 0 : 1,
        }}
      ></Box>
      <CardContent sx={{ fontSize: 12, fontWeight: 600 }}>
        <Box fontWeight={800} fontSize={16} pb="6px">
          {props.name}
        </Box>
        <TextLabel
          label="Population"
          text={props.population?.toLocaleString("en", {
            maximumFractionDigits: 0,
          })}
        ></TextLabel>
        <TextLabel label="Region" text={props.region}></TextLabel>
        <TextLabel label="Capital" text={props.capital?.join(", ")}></TextLabel>
      </CardContent>
    </Card>
  );
}

export default CountryCard;
