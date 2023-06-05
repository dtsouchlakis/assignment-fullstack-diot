import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Emission } from "../models/emission";
const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});
const emission: Emission[] = [
  {
    region: "Seoul",
    emission: 250,
    latitude: 37.5326,
    longitude: 127.024612,
  },
  {
    region: "Busan",
    emission: 304,
    latitude: 35.166668,
    longitude: 129.066666,
  },
  {
    region: "Gwangju",
    emission: 163,
    latitude: 35.166668,
    longitude: 126.916664,
  },
];

export default function Maps(): JSX.Element {
  const [topEmissionsData, setTopEmissionsData] = useState<Emission[]>([]);

  useEffect(() => {
    if (emission && emission.length > 0) {
      const sortedEmissions = [...emission].sort(
        (a, b) => b.emission - a.emission
      );
      setTopEmissionsData(sortedEmissions.slice(0, 5));
    }
  }, [emission]);
  const topEmissions = topEmissionsData.map((item, index) => (
    <li key={index}>
      {item.region}: {item.emission} tCO2eq
    </li>
  ));
  return (
    <Grid container spacing={2} className="h-full">
      <Grid item xs={12} sm={12} md={12} className="h-full">
        {topEmissionsData.length > 0 ? (
          <>
            <Paper className="p-6 rounded-b-none">
              <h3 className="font-bold mb-4">Emissions by Geography</h3>
              <span>Top {emission.length} emissions:</span>
              <ol className="list-decimal pl-6">{topEmissions}</ol>
            </Paper>
            <Paper className="rounded-t-lg h-[71%] mt-[-8px]" elevation={3}>
              <Map emission={topEmissionsData} />
            </Paper>
          </>
        ) : (
          <>
            <Paper className="p-6 rounded-b-none" elevation={3}>
              <p>No emission data available</p>
            </Paper>
            <Paper className="rounded-t-lg h-[71%] mt-[-8px]" elevation={3}>
              <Map emission={[]} />
            </Paper>
          </>
        )}
      </Grid>
    </Grid>
  );
}
