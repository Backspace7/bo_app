import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Legend} from 'recharts';
import Title from './Title';




export default class Chart  extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
  }

  render ()
   {
   
    return (

      <div>
     <Title>{this.props.city1} / {this.props.city2}</Title>
     <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <LineChart
          data={this.props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke="#8884d8 " />
          <YAxis stroke="#8884d8 "  type="number" domain={['auto', 'auto']} allowDecimals={true} tickInterval ={0.5} >
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill:"#8884d8" }}
            >
              T° (temperatura)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey='data1' name={this.props.city1} stroke="#82ca9d" dot={true} activeDot={{ c: 4 }}/>
          <Line type="monotone" dataKey='data2' name={this.props.city2} stroke="#291229 " dot={true} activeDot={{ c: 4 }}/>
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  )};
}