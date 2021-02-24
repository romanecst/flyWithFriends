import './App.css';
import React, {useState, useEffect} from 'react';
import Dates from './Dates';
import { ButtonGroup, Button, TextField} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function User(props) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [dateCount, setDateCount] = useState(1);
    const [dateFrom, setDateFrom] = useState([]);
    const [dateTo, setDateTo] = useState([]);


    const sendDateFrom = (date,i) => {
      if(date !== ''){
        let newDate = [...dateFrom]
        newDate[i] = date;
        setDateFrom(newDate);
      }
    }
  
  const sendDateTo = (date,i) => {
    if(date !== ''){
        let newDate = [...dateTo]
        newDate[i] = date;
        setDateTo(newDate);
    }
  }

    useEffect(() => {
        if(dateFrom.length == dateTo.length && dateTo.length !== 0 && name !== ''){
            let disp = [];
            for(let a =0; a<dateFrom.length; a++){
            disp.push([dateFrom[a],dateTo[a]]);
            }
            props.sendUserParent({name: name, disponibilities: disp},props.index);
        }
    }, [name,dateTo,dateFrom]);

    useEffect(() => {
      if(location !== '' && name !== ''){
        props.sendLocationParent({name: name, location: location},props.index);
      }
  }, [name,location]);

  
  let dateList = [];
  for(let i =0; i<dateCount; i++){
    dateList.push(<Dates index={i} sendDateFromParent={sendDateFrom} sendDateToParent={sendDateTo}/>);
  };
  
  return(
    <div style={{display:'flex',flexDirection:'row',alignItems:'flex-start'}}>
      <div style={{display:'flex',flexDirection:'column'}}>
        <h5>User {props.index+1}:</h5> 
        <div style={{display:'flex',flexDirection:'row'}}>
          <TextField
            id="standard-name-input"
            label="Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <TextField
            id="standard-input"
            style={{marginLeft:15}}
            label="Location"
            value={location}
            onChange={(e)=>{setLocation(e.target.value)}}
          />
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column'}}>
        <h5>Availabilities:</h5>
        <div style={{display:'flex',flexDirection:'column'}}>
          {dateList}
        </div>
      </div>
      <ButtonGroup style={{marginTop:70}} color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>setDateCount(dateCount+1)}>+</Button>
        <Button onClick={()=>setDateCount(dateCount-1)}>-</Button>
      </ButtonGroup>
    </div>
  );
}
export default User;