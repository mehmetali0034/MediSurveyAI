import { ResponsiveChoropleth } from "@nivo/geo";
import React from "react";
import { geoFeatures } from "../data/mockGeoFeatures";
import { mockGeographyData as data} from "../data/mockData";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
export default function GeoChart({isDashboard =false}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveChoropleth
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      //colors="nivo"
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale ={isDashboard ? 140 :150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
    //   enablegraticule={true}
    //   graticulelinecolor="#dddddd"
      borderWidth={1.5}
      borderColor="#fff"
    //   defs={[
    //     {
    //       id: "dots",
    //       type: "patterndots",
    //       background: "inherit",
    //       color: "#38bcb2",
    //       size: 4,
    //       padding: 1,
    //       stagger: true,
    //     },
    //     {
    //       id: "lines",
    //       type: "patternlines",
    //       background: "inherit",
    //       color: "#eed312",
    //       rotation: -45,
    //       linewidth: 6,
    //       spacing: 10,
    //     },
    //     {
    //       id: "gradient",
    //       type: "lineargradient",
    //       colors: [
    //         {
    //           offset: 0,
    //           color: "#000",
    //         },
    //         {
    //           offset: 100,
    //           color: "inherit",
    //         },
    //       ],
    //     },
    //   ]}
    //   fill={[
    //     {
    //       match: {
    //         id: "can",
    //       },
    //       id: "dots",
    //     },
    //     {
    //       match: {
    //         id: "chn",
    //       },
    //       id: "lines",
    //     },
    //     {
    //       match: {
    //         id: "ata",
    //       },
    //       id: "gradient",
    //     },
    //   ]}
      legends={[
        !isDashboard ? 
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: "left-to-right",
          itemTextColor: colors.greenAccent[400],
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.blueAccent[400],
                itemOpacity: 1,
              },
            },
          ],
        }:undefined,
      ]}
    />
  );
}
