import React from 'react';
import { Bar } from '@nivo/bar'
import { ScatterPlot } from '@nivo/scatterplot'
import range from 'lodash/range'
import random from 'lodash/random'
import './App.css';


const divergingData = range(9).map(i => {
  let gain = random(0, 350)
  let loss = 500 - gain
  const highGain = random(Math.round(gain * 0.4))
  const highLoss = random(Math.round(loss * 0.4))
  gain = gain - highGain
  loss = loss - highLoss

  return {
      'online': gain,
      'offline': -loss,
      date: new Date().setMonth(i)
  }
});

const ScatterPlotData = [
    {
        id: 'A',
        data: [
            { x: 1, y: 7 },
            { x: 2, y: 5 },
            { x: 3, y: 11 },
            { x: 4, y: 9 },
            { x: 5, y: 12 },
            { x: 6, y: 16 },
            { x: 7, y: 10 },
            { x: 8, y: 10 },
            { x: 9, y: 14 },
            { x: 10, y: 14 },
            { x: 11, y: 15 },
            { x: 12, y: 11 },
            { x: 13, y: 10 },
            { x: 14, y: 12 },
            { x: 15, y: 9 },
            { x: 16, y: 7 },
        ],
    },
]

const commonProps = {
  width: 500,
  height: 500,
  margin: { top: 60, left: 20, right: 20, bottom: 60 },
  indexBy: 'date',
  minValue: -500,
  maxValue: 500,
  enableGridX: false,
  enableGridY: false,
  axisLeft: null,
  axisRight:null,
  axisBottom: null

}
function App() {

    const CustomBarComponent = ({ x, y, height, color }) => (
        <rect  className="graphic" x={x} y={y} height={height} width={10} fill={color} stroke={color} rx="5" />    
    )

    const CustomNode = ({
        node,
        x,
        y,
        size,
        color,
        blendMode,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    }) => {
        let fill = 'rgba(34, 38, 41, 0.7)'; 

        if(node.data.y < 10) fill = '#FF715B';
        else if(node.data.y === 10) fill = '#7ED321';

        return(
            <svg className="graphic">
                <line x1={x} y1={y} x2={x} y2={500} stroke="rgba(34, 38, 41, 0.7)" strokeWidth="3" stroke-dasharray="20" />
                <g transform={`translate(${x},${y})`}>
                    <rect
                       
                        x={size * -0.5}
                        y={size * -0.5}
                        rx="50"
                        width={size}
                        height={size}
                        fill={fill}
                        style={{ mixBlendMode: blendMode }}
                        onMouseEnter={onMouseEnter}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                    />
                </g>
                
            </svg>
    )}

    const LineLayer = ({ nodes }) => {
        return  (
            <line x1="0" y1={190} x2="500" y2={190} stroke="#7ED321" stroke-dasharray="5"/>
        )
    }
    
  return (
      <div className="container">
        <div className="bar-diverging-chart">
            <h1>Bar Diverging</h1>
            <Bar
                {...commonProps}
                data={divergingData}
                keys={['online', 'offline']}
                colors={['#FFF', '#000']}
                enableLabel={false}
                barComponent={CustomBarComponent}
                innerPadding={8}
                
            />
        </div>
        <div className="scatter-plot-chart">
            <h1>ScatterPlot</h1>
            <ScatterPlot
                {...commonProps}
                yScale={{
                    type: "linear",
                    max: 20
                }}
                nodeSize={14}
                animate
                data={ScatterPlotData}
                renderNode={CustomNode}
                layers={["nodes", LineLayer]}
            />
        </div>
    </div>
  )
}

export default App;
