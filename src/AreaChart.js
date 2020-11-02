import React,{useEffect,setState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Legend,ReferenceLine} from 'recharts';
import Title from './Title';




export default class AreaChart  extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
  }
componentDidMount()
{
   if(this.props.data)
   {

    if(typeof(this.props.promedio1)!=undefined && typeof (this.props.promedio2)!=undefined)
    {

      if(this.props.promedio2)
      {

        const array_left1 =[];
        const array_right1 =[];
        const array_left2 =[];
        const array_right2 =[];
        const data = this.props.data;
        const promedio1 = this.props.promedio1;
        const promedio2 = this.props.promedio2;
        var data_array1 = data.map(a => a.data1);
        var data_array2 = data.map(a => a.data2);
        data_array1.forEach(function(value){
          if(value>promedio1)
          {
            array_right1.push(value);
          }else
          {
            array_left1.push(value);
          }
        });
        data_array2.forEach(function(value){
          if(value>promedio2)
          {
            array_right2.push(value);
          }else
          {
            array_left2.push(value);
          }
        });

        array_left1.sort(function(a,b){return a - b;});  
        array_right1.sort(function(a,b){return b - a;}); 
        const array_s1 = array_left1.concat([ promedio1],array_right1);
        //console.log(array_s1)

        array_left2.sort(function(a,b){return a - b;});  
        array_right2.sort(function(a,b){return b - a;}); 
        const array_s2 = array_left2.concat([promedio2],array_right2);
        //console.log(array_s2)

        const dataset_out = [];
        for (var i = 0; i <= data_array1.length -1; i++) {
           
            dataset_out.push({'data1':array_s1[i],'data2':array_s2[i]});
        }
        this.setState({data:dataset_out});
        this.setState({promedio1:parseFloat(promedio1).toFixed(2)});
        this.setState({promedio2:parseFloat(promedio2).toFixed(2)});
        console.log(dataset_out);

        const index1 = dataset_out.findIndex(value => value.data1 == parseFloat(promedio1).toFixed(2));
        const index2 = dataset_out.findIndex(value => value.data2 == parseFloat(promedio2).toFixed(2));
        this.setState({index1:index1});
        this.setState({index2:index2});

        console.log("indices "+index1+" "+index2);
      }
    }
   }
        

}


  render ()
   {
   
    return (

      <div>
     <Title>{this.props.city1} / {this.props.city2} Distribucion de datos respecto al promedio {this.state.promedio1} / {this.state.promedio2}</Title>
     <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <LineChart
          data={this.state.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis  stroke="#8884d8 " domain={['auto', 'auto']}/>
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
          <ReferenceLine x={this.state.index1} stroke="#82ca9d" label="media" />
          <ReferenceLine x={this.state.index2} stroke="#291229" label="media" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey='data1' name={this.props.city1} stroke="#82ca9d" dot={true} activeDot={{ c: 4 }}/>
          <Line type="monotone" dataKey='data2' name={this.props.city2} stroke="#291229 " dot={true} activeDot={{ c: 4 }}/>
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  )};
}