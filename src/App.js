import './App.css';
import React, {useState, useEffect} from 'react';
import User from './User';
import { Button, TextField, Divider } from '@material-ui/core';
import 'fontsource-roboto';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import logo from './image/logo.png'
import key from './key'
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 'fit-content',
    height: 'fit-content',
    marginLeft: 30,
    marginRight: 30,
    marginBottom:20,
  },
  title: {
    fontSize: 17,
    color:'black',
  },
  list: {
    lineHeight: '25px',
    fontSize: 15,
  },
  italics: {
    fontStyle: 'italic',
  },
  input: {
    marginLeft: 5,
    width: 20,
    marginTop: -6,
    marginBottom: 6,
  },
  incorrectInput: {
    marginLeft: 5,
    width: 90,
    marginTop: -6,
    marginBottom: 6,
  }, 
  length: {
    fontSize: 16,
    color: 'rgb(45, 45, 45)',
    marginBottom: 40,
  }
});



const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -10,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 2px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#000',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);
  

function App() {

const decomposeDate = (date) => {
    let year = parseInt(date.slice(0,4));
    let month = parseInt(date.slice(5,7));
    let day = parseInt(date.slice(8));
    return {year, month, day}
}

const compareDates = (date1, date2) => {
    let res = '';
    date1 = decomposeDate(date1);
    date2 = decomposeDate(date2);

    if(date1.year<date2.year){
        res = {comp:'date1 before date2',diff:'year'};
    }else if(date1.year>date2.year){
        res = {comp:'date1 after date2',diff:'year'};
    }else{
        if(date1.month<date2.month){
            res = {comp:'date1 before date2',diff:'month'};
        }else if(date1.month>date2.month){
            res = {comp:'date1 after date2',diff:'month'};
        }else{
            if(date1.day<date2.day){
                res = {comp:'date1 before date2',diff:'day'};
            }else{
                res = {comp:'date1 after date2',diff:'day'};
            }
        }
    }
    return res;
}

const findCommonDates = (date1, date2, date3, date4) => {
    let outcome = '';
    let res = compareDates(date1, date4);
    let res2 = compareDates(date3, date2);;
      
    //since date1 > date3 and date2 > date 4
    if(res.comp == 'date1 before date2' && res2.comp == 'date1 after date2'){
        let res3 = compareDates(date1, date2);
        let res4 = compareDates(date3, date4);
        if(res3.comp == 'date1 before date2'){
            if(res4.comp == 'date1 before date2'){
                outcome = [date2,date3];
            }else{
                outcome = [date2,date4];
            }
        }else{
            if(res4 == 'date1 before date2'){
                outcome = [date1,date3];
            }else{
                outcome = [date1,date4];
            }
        }
    }else{
        outcome = null;
    }
    return outcome;
}

let date = [{name:'Nate',disponibilities:[['2021-02-21','2021-02-28'],['2021-03-25','2021-04-05']]},{name:'Lori',disponibilities:[['2021-02-25','2021-03-05'],['2021-04-01','2021-04-08']]},{name:'Will', disponibilities:[['2021-02-23','2021-03-07'],['2021-04-04','2021-04-19']]},{name:'Tom', disponibilities:[['2021-04-02','2021-04-13'],['2021-02-26','2021-03-01']]},{name:'Louis', disponibilities:[['2021-02-23','2021-04-13']]}];

const allCommonDates = (array) => {
  let res = '';
  let output = [];

  for(let i = 0; i<array.length-1; i++){
    for(let j=0; j<array[i].disponibilities.length; j++){
      for(let x = i+1; x<array.length; x++){
        for(let k=0; k<array[x].disponibilities.length; k++){
          res = findCommonDates(array[i].disponibilities[j][0],array[x].disponibilities[k][0],array[i].disponibilities[j][1],array[x].disponibilities[k][1]);
          if(res){
            output.push({names: [array[i].name,array[x].name], disp: res});
          };
        }
      }
    } 
  };
  return output;
}

function arraysEqual(a, b) {
  let res = false;
  if (a.length == b.length){
    a = a.sort();
    b = b.sort();
    res = true;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]){
        res = false;
      }
    }
  }
  return res;
  
}

// const test = [{disp:["2021-02-25", "2021-02-28"], names:["Lori", "Nate", "Will"]},{disp:["2021-04-04", "2021-04-05"],names:["Lori", "Nate", "Will"]},{disp:["2021-04-02", "2021-04-05"],names:["Lori", "Nate", "Tom"]},{disp:["2021-04-04", "2021-04-05"], names:["Lori", "Nate", "Tom", "Will"]},{disp:["2021-04-04", "2021-04-05"],names:["Nate", "Tom", "Will"]},{disp:["2021-04-04", "2021-04-08"],names:["Lori", "Tom", "Will"]}];

const numberOfPeople = (dates,res) => {
  const len = dates.length;
  let outcome = true;
  for(let i = 0; i<res.length; i++){
    if(res[i].names.length != len){
      outcome = false;
    }
  }
  return outcome;
}

const commonDatesByName = (array) => {
  let dates = [...array];
  array = allCommonDates(array);
  let res = '';
  let names = [];
  let output = [];
  let finished = false;

  if(array.length<=1 || numberOfPeople(dates,array)){
    output = array;
  }else{
    while(!finished){
      output = [];
      for(let i = 0; i<array.length-1; i++){
        for(let x = i+1; x<array.length; x++){
          if(!arraysEqual(array[i].names,array[x].names)){
            res = findCommonDates(array[i].disp[0],array[x].disp[0],array[i].disp[1],array[x].disp[1]);
            if(res){
              names = [...array[i].names];
              for(let j=0; j<array[x].names.length; j++){
                if(!names.includes(array[x].names[j])){
                  names.push(array[x].names[j]) 
                }
              }
              if(output.length == 0){
                output.push({names: names, disp: res});
              }else{
                let inArray = false;
                for(let k=0; k<output.length; k++){
                  if(arraysEqual(output[k].names,names) && arraysEqual(output[k].disp,res)){
                    inArray = true;
                  }
                };
                if(!inArray){
                  output.push({names: names, disp: res});
                }
              }
            }
          }
        }
      }
      finished = numberOfPeople(dates,output);
      array = [...output];
    }
  }

  return output;
}

const countDays = (date1, date2, day1, day2) => {
  let res = false;
  let comp = compareDates(date1, date2);
  let date1Dec = decomposeDate(date1);
  let date2Dec = decomposeDate(date2);
  let diff = 0;
  let min = parseInt(day1);
  let max = parseInt(day2)
  if(comp.diff == 'year'){
    if(date2Dec.year == date1Dec.year+1){
      if(date1Dec.month == 12 && date2Dec.month == 1){
        diff = 31 - date1Dec.day + date2Dec.day;
      }else{
        diff = 32;
      }
    }else{
      diff = 32;
    }
  }else if(comp.diff == 'month'){
    if(date2Dec.month == date1Dec.month+1){
      if(date1Dec.month == 2){
        diff = 28 - date1Dec.day + date2Dec.day;
      }else if(date1Dec.month%2 ==0){
        diff = 30 - date1Dec.day + date2Dec.day;
      }else{
        diff = 31 - date1Dec.day + date2Dec.day;
      }
    }else{
      diff = 32;
    }
  }else if(comp.diff == 'day'){
    diff = date2Dec.day - date1Dec.day;
  }
  if(min<=diff && diff<=max){
    res = true;
  }
  return res;
}

const findCommonDestination = (array) => {
  let destinations = [];
  let commmonDestinations = [];
  for(let i=0; i<array.length; i++){
      for(let j=0; j<array[i].prices.length; j++){
          if(!destinations.includes(array[i].prices[j].name)){
              destinations.push(array[i].prices[j].name);
          }else{
              commmonDestinations.push(array[i].prices[j].name);
          }
      }
  }
  return commmonDestinations;
}

const commonDestinationsForAll = (array, commmonDestinations) => {
  let len = array.length-1;
  let index = 0;
  let destinations = []
  for(let i=0; i<commmonDestinations.length; i++){
      index = commmonDestinations.indexOf(commmonDestinations[i]);
      for(let j=1; j<len; j++){
          if(index != -1){
              index = commmonDestinations.indexOf(commmonDestinations[i],index+1);
          }
      }
      if(index != -1){
          if(!destinations.includes(commmonDestinations[i])){
              destinations.push(commmonDestinations[i]);
          }
      }
  }
  return destinations
}

const sortDestinations = (array) => {
  let common = commonDestinationsForAll(array,findCommonDestination(array));
  let commonPrices = []
  let inArray = false;
  let index = 0;
  for(let i=0; i<array.length; i++){
      for(let j=0; j<array[i].prices.length; j++){
          if(common.includes(array[i].prices[j].name)){
              inArray = false;
              for(let k=0; k<commonPrices.length; k++){
                  if(commonPrices[k].name == array[i].prices[j].name){
                      inArray = true;
                      index = k;
                  }
              }
              if(inArray){
                  commonPrices[index].price.push(array[i].prices[j].price)
              }else{
                  commonPrices.push({name:array[i].prices[j].name, price:[array[i].prices[j].price]});
              }
          }
      }
  };
  return commonPrices;
}

const meanPrice = (array) => {
  array = sortDestinations(array);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  for(let i=0; i<array.length; i++){
      array[i].price = array[i].price.reduce(reducer)/array[i].price.length;
  }
  return array.sort((a,b)=>{ return a.price - b.price;});
}


const [count, setCount] = useState(2);
const [resultDates, setResultDates] = useState(<div></div>);
const [resultFlights, setResultFlights] = useState(<div></div>);
const [flightInfo, setFlightInfo] = useState(<div></div>);
const [users, setUsers] = useState([]);
const [departures, setDepartures] = useState([]);
const [selectedValue, setSelectedValue] = useState(0);
const [selectedDestination, setSelectedDestination] = useState(0);
const [value, setValue] = useState([1, 31]);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const classes = useStyles();


const sendUser = (user,i) => {
  let newUser = [...users]
  newUser[i] = user;
  setUsers(newUser);
}

const sendLocation = (loc,i) => {
  let newDep = [...departures]
  newDep[i] = loc;
  setDepartures(newDep);
}

let userList = [];
for(let i=0; i<count; i++){
  userList.push(<User index={i} sendUserParent={sendUser} sendLocationParent={sendLocation}/>);
}

const Compute = () => {
  if(users.length !== 0){
    let output = commonDatesByName(users);
    console.log('out',output);
    let outputString = '';
    let outputDates = [];
    let availabilities = [];
    if(output.length !== 0){
      outputString = 'Common availabilities for ';
      for(let j=0; j<output[0].names.length; j++){
        outputString += `${output[0].names[j]} & `
      }
      outputString += 'are:'
      availabilities =[];
      for(var k=0; k<output.length; k++){
        if(countDays(output[k].disp[0],output[k].disp[1],value[0],value[1])){
          outputDates.push(output[k].disp);
          if(output[k].disp[0] == output[k].disp[1]){
            availabilities.push(
            <li style={{listStyleType: 'none'}}>
              <input
                type='radio'
                value={k}
                name='disp'
              />
              {output[k].disp[0]}
            </li>
            );
          }else{
            availabilities.push(
            <li style={{listStyleType: 'none'}}>
              <input
                style={{marginRight:10}}
                type='radio'
                value={k}
                name='disp'
              />
              From <span className={classes.italics}>{output[k].disp[0]}</span> to <span className={classes.italics}>{output[k].disp[1]}</span>
              </li>
              );
          }
        }else{
          outputString = 'No common availabilities.'
        }
      };
    }else{
      outputString = 'No common availabilities.'
    }

    let btn = <Button variant="outlined" color="primary" onClick={()=>CheapFlights(outputDates[selectedValue])}>Search Cheapest Destination at selected dates</Button>;
    if(  outputString == 'No common availabilities.'){
      btn = <div/>
    }

    setResultDates(  
    <Card className={classes.root} >
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {outputString}
        </Typography>
        <ul className={classes.list} onChange={(e)=> setSelectedValue(e.target.value)}>{availabilities}</ul>
      </CardContent>
      <CardActions>
        {btn}
      </CardActions>
    </Card>
    );
  }
}


const CheapFlights = async(dates) => {
  let countRequests = 0;
  let loc = [];
  let quotes = [];
  let pricesArray = [];
  let carriersArray = {};
  let inArray = false;
  let index = 0;
  let finalQuotes = [];
  for(let i=0; i<departures.length; i++){
    const rawResponse = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/FR/EUR/fr-FR/?query=${departures[i].location}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    });
    const response = await rawResponse.json();
    loc.push(response.Places[0].PlaceId);
    countRequests++;
  };
  for(let j=0; j<loc.length; j++){
    const rawResponseFlights = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/FR/EUR/fr-FR/${loc[j]}/anywhere/${dates[0]}/${dates[1]}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    });
    const responseFlights = await rawResponseFlights.json();
    console.log('res',responseFlights);
    countRequests++;
    quotes = responseFlights.Quotes.slice(0,15);
    pricesArray = [];
    for(let l=0; l<quotes.length; l++){
      for(let m=0; m<responseFlights.Places.length; m++){
        if(quotes[l].OutboundLeg.DestinationId == responseFlights.Places[m].PlaceId && (departures[j].budget >= quotes[l].MinPrice)){
          carriersArray = {Inbound:[],Outbound:[]};
          for(let b=0; b<responseFlights.Carriers.length; b++){
            for(let c=0; c<quotes[l].InboundLeg.CarrierIds.length; c++){
              if(quotes[l].InboundLeg.CarrierIds[c] == responseFlights.Carriers[b].CarrierId ){
                carriersArray.Inbound.push(responseFlights.Carriers[b].Name)
              }
            }
            for(let c=0; c<quotes[l].OutboundLeg.CarrierIds.length; c++){
              if(quotes[l].OutboundLeg.CarrierIds[c] == responseFlights.Carriers[b].CarrierId ){
                carriersArray.Outbound.push(responseFlights.Carriers[b].Name)
              }
            }
          }
          inArray = false;
          for(let n=0; n<pricesArray.length; n++){
            if(pricesArray[n].name == responseFlights.Places[m].CityName){
              inArray = true;
              index = n;
            }
          }
          if(inArray){
            if(quotes[l].MinPrice<pricesArray[index].price){
              pricesArray[index].price = quotes[l].MinPrice;
            }
          }else if(responseFlights.Places[m]){
            pricesArray.push({name: responseFlights.Places[m].CityName, price: quotes[l].MinPrice, carriers:carriersArray});
          }else{
            pricesArray.push({name: responseFlights.Places[m].Name, price: quotes[l].MinPrice, carriers:carriersArray});
          }
        }
      }
    }

    finalQuotes.push({name:departures[j].name, departure: departures[j].location, prices: pricesArray});
  }
  console.log(finalQuotes, countRequests);
  let output = meanPrice(finalQuotes);
  console.log('output price',output)
  let outputString = 'The cheapest common destinations at these dates on average per person are:';
  let outputFlights = [];
  for(let o=0; o<output.length; o++){
    outputFlights.push(
    <li style={{listStyleType: 'none'}}><input
      type='radio'
      value={o}
      name='disp'/>
      {output[o].name} for {output[o].price}€ </li>);   
  }

  const ShowInfo = ()=>{
    console.log('index', selectedDestination)
    let outputInfo = [];
    for(let p=0; p<finalQuotes.length; p++){
      for(let q=0; q<finalQuotes[p].prices.length; q++){
        if(output[selectedDestination].name == finalQuotes[p].prices[q].name){
            outputInfo.push(<li>For {finalQuotes[p].name}: {finalQuotes[p].prices[q].price}€ return with {finalQuotes[p].prices[q].carriers.Inbound[0]} for the outbound flight and {finalQuotes[p].prices[q].carriers.Outbound[0]} for the inbound flight</li>);
        }
      }
    }
    
    setFlightInfo(
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Flight to {output[selectedDestination].name}:
        </Typography>
        <ul className={classes.list}>{outputInfo}</ul>
      </CardContent>
    </Card>
    );
  }

  setResultFlights(
    <Card className={classes.root}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
      {outputString}
      </Typography>
      <ul className={classes.list} onChange={(e)=> { console.log('val',e.target.value); setSelectedDestination(e.target.value)}}>{outputFlights}</ul>
    </CardContent>
    <CardActions>
      <Button variant="outlined" color="primary" onClick={()=>ShowInfo()}>More information about this destination</Button>
    </CardActions>
  </Card>
  );

}

  return (
      <div style={{paddingBottom:50}}>
        <div id='background'>
        <img id='logo' src={logo}/>
          <div style={{paddingTop:50}}>
              <Button variant="contained" color="primary" style={{margin:15}} onClick={()=>setCount(count+1)}>Add User</Button>
              <Button variant="contained" color="secondary" onClick={()=>setCount(count-1)}>Del User</Button>
              <a href='#result'><Button variant="contained" style={{margin:15}} onClick={()=>Compute()}>Go</Button></a>
          </div>
          <div className="panel">
            <div  className={classes.length}>
              <h5>How long will your holiday be?</h5>
              <div style={{display:'flex', flexWrap:'wrap'}}>
                <div style={{marginRight:50,}}>
                <p>Minimum duration (in days): {value[0]}</p>
                <p>Maximum duration: {value[1]}</p>
                </div>
                <div style={{width:250, marginLeft:15, marginTop:30}}>
                <IOSSlider 
                value={value}
                min={1}
                max={31}
                onChange={handleChange}
                valueLabelDisplay="on"
                />
                </div>
              </div>

            </div>
            <Divider />
            <div>
              {userList}
            </div>
          </div>
        </div>
        <div id='result' style={{display: 'flex',flexDirection: 'row', marginTop: 30, justifyContent:'flex-start', flexWrap:'wrap'}}>
        {resultDates}
        {resultFlights}
        {flightInfo}
        </div>
      </div>
  );
}

export default App;
