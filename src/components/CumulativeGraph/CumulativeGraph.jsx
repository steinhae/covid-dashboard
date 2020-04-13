import React from "react";
import { ResponsiveLine } from "@nivo/line";

var tooltip = require('@nivo/tooltip');

const COLOR_CASES = '#4e73df '
const COLOR_RECOVERED = '#1cc88a'
const COLOR_DECEASED = '#f6c23e'

function extractCaseData(result) {
  let lineData = []
  let sumCases = []
  let sumRecovered = []
  let sumDeceased = []
  result.features.forEach(element => {
    var meldeDatum = new Date(element.attributes.Meldedatum)
      .toLocaleDateString("de-DE")
      .slice(0, -5)
    sumCases.push({
      x: meldeDatum,
      y: element.attributes.SummeFall
    });
    sumRecovered.push({
      x: meldeDatum,
      y: element.attributes.SummeGenesen
    });
    sumDeceased.push({
      x: meldeDatum,
      y: element.attributes.SummeTodesfall
    });
  })
  lineData = [
    {
      id: "Summe Fälle",
      data: sumCases
    },
    {
      id: "Summe Genesen",
      data: sumRecovered
    },
    {
      id: "Summe Verstorben",
      data: sumDeceased
    }
  ]
  return lineData
}

class CovidKumuliert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineData: [],
      initialized: false
    };
  }

  componentDidUpdate() {
    if (this.props.input.isFetching === false && this.state.initialized === false) {
      let caseData = extractCaseData(this.props.input.rkiResponse)
      this.setState({
        lineData: caseData,
        initialized: true
      }
      )
    }
  }

  render() {
    const { lineData } = this.state;
    return (
      <div>
        <div>
        </div>
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <ResponsiveLine
            colors={[COLOR_CASES, COLOR_RECOVERED, COLOR_DECEASED]}
            data={lineData}
            margin={{
              top: 10,
              right: 45,
              bottom: 75,
              left: 60
            }}
            pointSize={8}
            useMesh={true}

            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Anzahl',
              legendOffset: -52,
              legendPosition: 'middle'
            }}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              legend: 'Meldedatum',
              tickRotation: 90,
              legendOffset: 61,
              legendPosition: 'middle'
            }}
            tooltip={input => {
              let point = input.point
              return React.createElement(tooltip.BasicTooltip, {
                id: React.createElement(
                  "span",
                  null,
                  point.serieId + ": ",
                  React.createElement("strong", null, point.data.yFormatted)),
                enableChip: true,
                color: point.serieColor
              });
            }
            }
          />
        </div>
      </div>
    );
  }
}

export default CovidKumuliert;
