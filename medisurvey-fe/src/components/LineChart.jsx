import React from 'react'
import {mockLineData as data} from "../data/mockData"
import { tokens } from '../theme'
import { useTheme } from '@emotion/react'
import { ResponsiveLine } from '@nivo/line';
export default function LineChart(isDashboard = false) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
  return (
    <ResponsiveLine
    theme={{
        "axis": {
            "domain": {
                "line": {
                    "stroke": colors.blueAccent[400],
                    "strokeWidth": 1
                }
            },
            "legend": {
                "text": {
                    "fontSize": 12,
                    "fill": colors.grey[400],
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            },
            "ticks": {
                "line": {
                    "stroke": colors.greenAccent[400],
                    "strokeWidth": 1
                },
                "text": {
                    "fontSize": 11,
                    "fill": colors.greenAccent[400],
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
        "grid": {
            "line": {
                "stroke": colors.greenAccent[400],
                "strokeWidth": 1
            }
        },
        "legends": {
            "title": {
                "text": {
                    "fontSize": 11,
                    "fill": "#333333",
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            },
            "text": {
                "fontSize": 11,
                "fill": colors.blueAccent[400],
                "outlineWidth": 0,
                "outlineColor": "transparent"
            },
            "ticks": {
                "line": {},
                "text": {
                    "fontSize": 10,
                    "fill": colors.greenAccent[400],
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
    }}
    data={data}
    colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    yFormat=" >-.2f"
    curve="catmullRom"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding:5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: 'middle'
    }}
    enableGridX={false}
    enableGridY={false}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: colors.blueAccent[400],
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
/>  )
}
