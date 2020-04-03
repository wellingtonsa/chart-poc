import React from 'react';
import { Bar } from '@nivo/bar'
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
})

const divergingCommonProps = {
  width: 500,
  height: 500,
  margin: { top: 60, bottom: 60 },
  data: divergingData,
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

    const CustomBarComponent = ({ color, ...props }) => (
        <rect {...props} width={10} fill={color} stroke={color} rx="5" />    
    )

  return (
      <div className="container">
        <div className="bar-diverging-chart">
            <h1>Bar Diverging</h1>
            <Bar
                {...divergingCommonProps}
                keys={['online', 'offline']}
                colors={['#FFF', '#000']}
                enableLabel={false}
                barComponent={CustomBarComponent}
                innerPadding={8}
            />
        </div>
    </div>
  );
}

export default App;
