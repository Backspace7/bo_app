import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import AreaChart from './AreaChart';
import Title from './Title';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//import Orders from './Orders';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '300vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
   paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fixedHeight: {
    height: 400,
  },
  fixedHeight2: {
    height: 300,
  },
  fixedHeight3: {
    height: 500,
    display: 'flex',
  },
  depositContext: {
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
function preventDefault(event) {
  event.preventDefault();
}


export default function Dashboard() {
  const [com_1, setCom_1] = React.useState('none');
  const [city_1, setCity_1] = React.useState('none');
  const [com_2, setCom_2] = React.useState('none');
  const [city_2, setCity_2] = React.useState('none');
  const [var_, setVar] = React.useState('');
  const [data, setData] = React.useState('');
  const [data_fetch1, setFecht1] = React.useState('');
  const [data_fetch2, setFecht2] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [Disabled, setDisabled] = React.useState(true);
  const [variance1, setVariance1] = React.useState('');
  const [variance2, setVariance2] = React.useState('');
  const [promedio1, setPromedio1] = React.useState('');
  const [promedio2, setPromedio2] = React.useState('');
  const [desviacion1, setDesviacion1] = React.useState('');
  const [desviacion2, setDesviacion2] = React.useState('');
  const [recm, setRecm] = React.useState('');
  const [wcv, setWCv] = React.useState('');
  const [lcv, setLCv] = React.useState('');
  const [winner, setWinner] = React.useState('');
  const [loser, setLoser] = React.useState('');
  
  
  const handleChange_com1 = (event) => {
    setCom_1(event.target.value);
    setCity_1(event.currentTarget.textContent);
    if(data=='')
    {
      setLoading(true);
      fetch("https://community-open-weather-map.p.rapidapi.com/forecast/daily?q="+event.currentTarget.textContent+"%2Ccl&cnt=15&units=metric&lang=es",{
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "719ddd96a7msh878b0a6f4d57e9cp12f7d6jsn9dc1cd19b3e6"
        }
        })
        .then(response => response.json())
        .then((data) => {
          if(var_==1)
          {

            var result = data.list.map((values,index) => ({
             data1: values.temp.morn, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
        
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==2){
            var result = data.list.map((values,index) => ({
             data1: values.temp.day, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
        
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==3){
            var result = data.list.map((values,index) => ({
             data1: values.temp.eve, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
        
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==4){
            var result = data.list.map((values,index) => ({
             data1: values.temp.night, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
        
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==5){
            var result = data.list.map((values,index) => ({
             data1: values.temp.min, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
        
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==6){
            var result = data.list.map((values,index) => ({
             data1: values.temp.max, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
        
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else{setLoading(false)}
        });
      }else
      {
        fetch("https://community-open-weather-map.p.rapidapi.com/forecast/daily?q="+event.currentTarget.textContent+"%2Ccl&cnt=15&units=metric&lang=es",{
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "719ddd96a7msh878b0a6f4d57e9cp12f7d6jsn9dc1cd19b3e6"
        }
        })
        .then(response => response.json())
        .then((datos) => {
          if(var_==1)
          {

            var result = data.map((object,index)=>{
              object.data1=datos.list[index].temp.morn;
              return object;
            })
            if(result)
            {
              setData(result);
              console.log(result);
              setLoading(false);
            }
          }else if(var_==2){
             var result = data.map((object,index)=>{
              object.data1=datos.list[index].temp.day;
              return object;
            })
            if(result)
            {
              setData(result);
              console.log(result);
              setLoading(false);
            }
          }else if(var_==3){
             var result = data.map((object,index)=>{
              object.data1=datos.list[index].temp.eve;
              return object;
            })
            if(result)
            {
              setData(result);
              console.log(result);
              setLoading(false);
            }
          }else if(var_==4){
             var result = data.map((object,index)=>{
              object.data1=datos.list[index].temp.night;
              return object;
            })
            if(result)
            {
              setData(result);
              console.log(result);
              setLoading(false);
            }
          }else if(var_==5){
             var result = data.map((object,index)=>{
              object.data1=datos.list[index].temp.min;
              return object;
            })
            if(result)
            {
              setData(result);
              console.log(result);
              setLoading(false);
            }
          }else if(var_==6){
             var result = data.map((object,index)=>{
              object.data1=datos.list[index].temp.max;
              return object;
            })
            if(result)
            {
              setData(result);
              console.log(result);
              setLoading(false);
            }
          }else{setLoading(false)}
          
        });
      }
 

  };
  const handleChange_com2 = (event) => {
    setCom_2(event.target.value);
    setCity_2(event.currentTarget.textContent);
    setLoading(true);
    if(data!='')
    {
      fetch("https://community-open-weather-map.p.rapidapi.com/forecast/daily?q="+event.currentTarget.textContent+"%2Ccl&cnt=15&units=metric&lang=es",{
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "719ddd96a7msh878b0a6f4d57e9cp12f7d6jsn9dc1cd19b3e6"
      }
      })
      .then(response => response.json())
      .then((datos) => {
        if(var_==1)
        {

          var result = data.map((object,index)=>{
            object.data2=datos.list[index].temp.morn;
            return object;
          })
          if(result)
          {
            setData(result);
            console.log(result);
            setLoading(false);
          }
        }else if(var_==2){
            var result = data.map((object,index)=>{
            object.data2=datos.list[index].temp.day;
            return object;
          })
          if(result)
          {
            setData(result);
            console.log(result);
            setLoading(false);
          }
        }else if(var_==3){
            var result = data.map((object,index)=>{
            object.data2=datos.list[index].temp.eve;
            return object;
          })
          if(result)
          {
            setData(result);
            console.log(result);
            setLoading(false);
          }
        }else if(var_==4){
            var result = data.map((object,index)=>{
            object.data2=datos.list[index].temp.night;
            return object;
          })
          if(result)
          {
            setData(result);
            console.log(result);
            setLoading(false);
          }
        }else if(var_==5){
            var result = data.map((object,index)=>{
            object.data2=datos.list[index].temp.min;
            return object;
          })
          if(result)
          {
            setData(result);
            console.log(result);
            setLoading(false);
          }
        }else if(var_==6){
            var result = data.map((object,index)=>{
            object.data2=datos.list[index].temp.max;
            return object;
          })
          if(result)
          {
            setData(result);
            console.log(result);
            setLoading(false);
          }
        }else{setLoading(false);}
        
      });

    }else
    {
      setLoading(true);
      fetch("https://community-open-weather-map.p.rapidapi.com/forecast/daily?q="+event.currentTarget.textContent+"%2Ccl&cnt=15&units=metric&lang=es",{
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "719ddd96a7msh878b0a6f4d57e9cp12f7d6jsn9dc1cd19b3e6"
        }
        })
        .then(response => response.json())
        .then((data) => {
          if(var_==1)
          {

            var result = data.list.map((values,index) => ({
             data2: values.temp.morn, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
           }))
            console.log(result)
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==2){
            var result = data.list.map((values,index) => ({
             data2: values.temp.day, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
            console.log(result)
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==3){
            var result = data.list.map((values,index) => ({
             data2: values.temp.eve, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
            console.log(result)
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==4){
            var result = data.list.map((values,index) => ({
             data2: values.temp.night, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
            console.log(result)
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==5){
            var result = data.list.map((values,index) => ({
             data2: values.temp.min, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
            console.log(result)
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else if(var_==6){
            var result = data.list.map((values,index) => ({
             data2: values.temp.max, time:new Date(values.dt * 1000).toISOString().substr(5, 5)
            }))
            console.log(result)
            if(result)
            {
              setData(result);
              setLoading(false);
            }
          }else{setLoading(false);}
        });
      console.log("Sí esta vacia")
    }
    console.log(event.currentTarget.textContent);
  };



  const handleChange2 = (event) => {

    if(event.target.value!='')
    {
      setDisabled(false);
      setVar(event.target.value);
    }
    else
    {
      setDisabled(true);
    }
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const fixedHeightPaper3 = clsx(classes.paper2, classes.fixedHeight3);


React.useEffect(function proccessData() { 
  
    if( city_1!='' && city_2!=''){
      if(data)
      {
        var data_array1 = data.map(a => a.data1);
        var data_array2 = data.map(a => a.data2);
        var array_time = data.map(a => a.time);
        const promedio1 =  data_array1.reduce((a, b) => a + parseInt(b), 0) / data_array1.length;
        const promedio2 =  data_array2.reduce((a, b) => a + parseInt(b), 0) / data_array2.length;
        console.log("array length " +data_array2.length);
        const diff2_1 =  data_array1.map(function(value){
                          var diff = (value - promedio1)*(value - promedio1);
                          return diff;
                        });
        const diff2_2 = data_array2.map(function(value){
                          var diff = (value - promedio2)*(value - promedio2);
                          return diff;
                        });
        const variance1 = diff2_1.reduce((a, b) => a + parseInt(b), 0) / diff2_1.length;
        const variance2 = diff2_2.reduce((a, b) => a + parseInt(b), 0) / diff2_2.length;

        const diff_array = [];
        for (var i = 0; i <= data_array1.length -1; i++) {
            const result = (data_array1[i]-data_array2[i])*(data_array1[i]-data_array2[i]);
            diff_array.push(result);
        }
        console.log(diff_array);
        const promedio_diff = diff_array.reduce((a, b) => a + parseInt(b), 0) / diff_array.length;
        const rcem = Math.sqrt(promedio_diff);
        console.log(rcem);
        setRecm(rcem.toFixed(2));

        console.log(promedio1 +"  "+promedio2)
        setPromedio2(promedio2.toFixed(2));
        setPromedio1(promedio1.toFixed(2));
        console.log(variance1 +"  "+variance2)
        setVariance2(variance2.toFixed(2));
        setVariance1(variance1.toFixed(2));
        const desviacion1 =Math.sqrt(variance1);
        const desviacion2 =Math.sqrt(variance2);
        const cv1 =desviacion1/promedio1 *100;
        const cv2 =desviacion2/promedio2 *100;

        if (cv1 < cv2)
        {
          const winner = city_1;
          const winnercv = cv1;
          const loser = city_2;
          const losercv = cv2;
          setWinner(city_1);
          setLoser(city_2);
          setWCv(cv1.toFixed(2));
          setLCv(cv2.toFixed(2));
        }else
        {
          const winner = city_2;
          const winnercv = cv2;
          const loser = city_1;
          const losercv = cv1;
          setWinner(city_2);
          setLoser(city_1);
          setWCv(cv2.toFixed(2));
          setLCv(cv1.toFixed(2));
        }

        console.log(desviacion1 +"  "+desviacion2)
        setDesviacion2(desviacion2.toFixed(2));
        setDesviacion1(desviacion1.toFixed(2));
      
      }
    }
    
  });
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar )}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Comparador de temperaturas pronosticadas para las comunas Santiago
          </Typography>
          
        </Toolbar>
      </AppBar>
     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <Chart comuna1={com_1} data={data} city1={city_1} city2={city_2}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
              <Paper className={fixedHeightPaper2}>
              <Title>¿Seleccione una variable que desea comparar?</Title>
                <Select id="demo-customized-select-native"
                  value={var_}
                  onChange={handleChange2}
                  input={<BootstrapInput />} required>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Mañana</MenuItem>
                  <MenuItem value={2}>Medio Día</MenuItem>
                  <MenuItem value={3}>Tarde</MenuItem>
                  <MenuItem value={4}>Noche</MenuItem>
                  <MenuItem value={5}>Minimas</MenuItem>
                  <MenuItem value={6}>Maximas</MenuItem>
                  
                </Select>
                <Title>¿Seleccione una comuna santiago?</Title>
                <Select id="demo-customized-select-native"
                  value={com_1}
                  onChange={handleChange_com1}
                  input={<BootstrapInput />} 
                  disabled={Disabled}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Puente Alto</MenuItem>
                  <MenuItem value={2}>San Bernardo</MenuItem>
                  <MenuItem value={3}>La Pintana</MenuItem>
                  <MenuItem value={4}>Recoleta</MenuItem>
                  <MenuItem value={5}>Estación Central</MenuItem>
                  <MenuItem value={6}>Lo Espejo</MenuItem>
                  <MenuItem value={7}>San Joaquín</MenuItem>
                  <MenuItem value={8}>La Cisterna</MenuItem>
                  <MenuItem value={9}>Lo Barnechea</MenuItem>
                  <MenuItem value={10}>Independencia</MenuItem>
                  <MenuItem value={11}>Maipú</MenuItem>
                  <MenuItem value={12}>Peñalolén</MenuItem>
                  <MenuItem value={13}>El Bosque</MenuItem>
                  <MenuItem value={14}>Renca</MenuItem>
                  <MenuItem value={15}>Quilicura</MenuItem>
                  <MenuItem value={16}>Macul</MenuItem>
                  <MenuItem value={17}>La Reina</MenuItem>
                  <MenuItem value={18}>Vitacura</MenuItem>
                  <MenuItem value={19}>Huechuraba</MenuItem>
                  <MenuItem value={20}>Buin</MenuItem>
                  <MenuItem value={21}>La Florida</MenuItem>
                  <MenuItem value={22}>Santiago</MenuItem>
                  <MenuItem value={23}> Ñuñoa</MenuItem>
                  <MenuItem value={24}>Conchalí</MenuItem>
                  <MenuItem value={25}>Providencia</MenuItem>
                  <MenuItem value={26}>Lo Prado</MenuItem>
                  <MenuItem value={27}>San Ramón</MenuItem>
                  <MenuItem value={28}>San Miguel</MenuItem>
                  <MenuItem value={29}>Cerrillos</MenuItem>
                  <MenuItem value={30}>Talagante</MenuItem>
                  <MenuItem value={31}>Las Condes</MenuItem>
                  <MenuItem value={32}>Pudahuel</MenuItem>
                  <MenuItem value={33}>Cerro Navia</MenuItem>
                  <MenuItem value={34}>La Granja</MenuItem>
                  <MenuItem value={35}>Pedro Aguirre Cerda</MenuItem>
                  <MenuItem value={36}>Quinta Normal</MenuItem>
                  <MenuItem value={37}>Melipilla</MenuItem>
                  <MenuItem value={38}>Colina</MenuItem>
                  <MenuItem value={39}>Peñaflor</MenuItem>
                  <MenuItem value={40}>Paine</MenuItem>
                </Select>
                <Title>¿Seleccione una segunda comuna santiago?</Title>
                 <Select id="demo-customized-select-native"
                  value={com_2}
                  onChange={handleChange_com2}
                  input={<BootstrapInput />}
                  disabled={Disabled} >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Puente Alto</MenuItem>
                  <MenuItem value={2}>San Bernardo</MenuItem>
                  <MenuItem value={3}>La Pintana</MenuItem>
                  <MenuItem value={4}>Recoleta</MenuItem>
                  <MenuItem value={5}>Estación Central</MenuItem>
                  <MenuItem value={6}>Lo Espejo</MenuItem>
                  <MenuItem value={7}>San Joaquín</MenuItem>
                  <MenuItem value={8}>La Cisterna</MenuItem>
                  <MenuItem value={9}>Lo Barnechea</MenuItem>
                  <MenuItem value={10}>Independencia</MenuItem>
                  <MenuItem value={11}>Maipú</MenuItem>
                  <MenuItem value={12}>Peñalolén</MenuItem>
                  <MenuItem value={13}>El Bosque</MenuItem>
                  <MenuItem value={14}>Renca</MenuItem>
                  <MenuItem value={15}>Quilicura</MenuItem>
                  <MenuItem value={16}>Macul</MenuItem>
                  <MenuItem value={17}>La Reina</MenuItem>
                  <MenuItem value={18}>Vitacura</MenuItem>
                  <MenuItem value={19}>Huechuraba</MenuItem>
                  <MenuItem value={20}>Buin</MenuItem>
                  <MenuItem value={21}>La Florida</MenuItem>
                  <MenuItem value={22}>Santiago</MenuItem>
                  <MenuItem value={23}> Ñuñoa</MenuItem>
                  <MenuItem value={24}>Conchalí</MenuItem>
                  <MenuItem value={25}>Providencia</MenuItem>
                  <MenuItem value={26}>Lo Prado</MenuItem>
                  <MenuItem value={27}>San Ramón</MenuItem>
                  <MenuItem value={28}>San Miguel</MenuItem>
                  <MenuItem value={29}>Cerrillos</MenuItem>
                  <MenuItem value={30}>Talagante</MenuItem>
                  <MenuItem value={31}>Las Condes</MenuItem>
                  <MenuItem value={32}>Pudahuel</MenuItem>
                  <MenuItem value={33}>Cerro Navia</MenuItem>
                  <MenuItem value={34}>La Granja</MenuItem>
                  <MenuItem value={35}>Pedro Aguirre Cerda</MenuItem>
                  <MenuItem value={36}>Quinta Normal</MenuItem>
                  <MenuItem value={37}>Melipilla</MenuItem>
                  <MenuItem value={38}>Colina</MenuItem>
                  <MenuItem value={39}>Peñaflor</MenuItem>
                  <MenuItem value={40}>Paine</MenuItem>
                </Select>
                
               
              </Paper>
            </Grid>
            
          </Grid>
         
        </Container>
        <Container maxWidth="xl">
         <Grid container spacing={2}>
            <Grid item sm={3}>
              <Paper className={classes.paper}>
              <Title>Promedio de temperaturas proximos dias</Title>
              <div  style={{display: 'inline-block'}}>
               <h4 style={{display: 'inline'}}>{city_1} : </h4><p  style={{display: 'inline'}}>{promedio1}</p>
              </div>
              <div  style={{display: 'inline-block'}}>
                <h4 style={{display: 'inline'}}>{city_2} : </h4><p  style={{display: 'inline'}}>{promedio2}</p>
              </div>
              </Paper>
            </Grid> 
            <Grid item sm={3}>
              <Paper className={classes.paper}>
                 <Title>Variacion de temperatura para cada comuna</Title>
                  <div  style={{display: 'inline-block'}}>
                   <h4 style={{display: 'inline'}}>{city_1} : </h4><p  style={{display: 'inline'}}>{variance1}</p>
                  </div>
                  <div  style={{display: 'inline-block'}}>
                    <h4 style={{display: 'inline'}}>{city_2} : </h4><p  style={{display: 'inline'}}>{variance2}</p>
                  </div>
              </Paper>
            </Grid>
            <Grid item sm={3}>
              <Paper className={classes.paper}>
                 <Title>Dispercion de temperatura para cada comuna</Title>
                  <div  style={{display: 'inline-block'}}>
                   <h4 style={{display: 'inline'}}>{city_1} : </h4><p  style={{display: 'inline'}}>{desviacion1}</p>
                  </div>
                  <div  style={{display: 'inline-block'}}>
                    <h4 style={{display: 'inline'}}>{city_2} : </h4><p  style={{display: 'inline'}}>{desviacion2}</p>
                  </div>
              </Paper>
            </Grid> 
            <Grid item sm={3}>
              <Paper className={classes.paper}>
                 <Title>Error y confiabilidad entre las dos comunas</Title>
                  <div  style={{display: 'inline-block'}}>
                   <h4 style={{display: 'inline'}}>Diferencia media entre las dos comunas : </h4><p  style={{display: 'inline'}}>{recm}</p>
                  </div>
                  <div  style={{display: 'inline-block'}}>
                    <h4 style={{display: 'inline'}}>La comuna con menor coeficiente de variacion en sus temperaturas es : </h4><p  style={{display: 'inline'}}>{winner} : {wcv} % vs {loser} : {lcv} %</p>
                  </div>
              </Paper>
            </Grid>
        </Grid>
          <Grid container spacing={5} justify="center">
            <Grid item xs={5}>
              <Paper className={classes.paper}>
                <AreaChart data={data} city1={city_1} city2={city_2} promedio1={promedio1} promedio2={promedio2}/>
              </Paper>
            </Grid>
        </Grid>
       
      </Container>

      </main>
    </div>
  );
}