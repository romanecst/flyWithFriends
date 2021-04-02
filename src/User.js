import './App.css';
import React, {useState, useEffect} from 'react';
import Dates from './Dates';
import { ButtonGroup, Button, TextField} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

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
    top: 22,
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
  

function User(props) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [dateCount, setDateCount] = useState(1);
    const [dateFrom, setDateFrom] = useState([]);
    const [dateTo, setDateTo] = useState([]);
    const [value, setValue] = useState(100);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

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
        props.sendLocationParent({name: name, location: location, budget:value},props.index);
      }
  }, [name,location, value]);

  
  let dateList = [];
  for(let i =0; i<dateCount; i++){
    dateList.push(<Dates index={i} sendDateFromParent={sendDateFrom} sendDateToParent={sendDateTo}/>);
  };
  
  return(
    <div style={{display:'flex',flexDirection:'row',alignItems:'flex-start', flexWrap:'wrap'}}>
      <div style={{display:'flex',flexDirection:'column', marginRight:25}}>
        <h5>User {props.index+1}:</h5> 
        <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}>
          <TextField
            style={{minWidth:115, marginRight:15}}
            id="standard-name-input"
            label="Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <TextField
            style={{minWidth:100}}
            id="standard-input"
            label="Location"
            value={location}
            onChange={(e)=>{setLocation(e.target.value)}}
          />
        </div>
      </div>
        <div style={{display:'flex',flexDirection:'column', marginRight:20}}>
          <h5>Availabilities:</h5>
          <div >
          <div style={{display:'flex',flexDirection:'column'}}>
            {dateList}
          </div>
        <ButtonGroup style={{ height:40}} color="primary" aria-label="outlined primary button group">
          <Button onClick={()=>setDateCount(dateCount+1)}>+</Button>
          <Button onClick={()=>setDateCount(dateCount-1)}>-</Button>
        </ButtonGroup>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',}}>
        <h5>Budget:</h5>
        <div style={{display:'flex',flexDirection:'column', margin:'auto'}}>
          <p style={{marginTop:'-3px', color: 'rgb(45, 45, 45)',}}>Max budget: {value}€</p>
          <IOSSlider 
            style={{width:250}}
            valueLabelDisplay="off"
            step={5}
            min={0}
            max={500}
            value={value} 
            onChange={handleChange} aria-labelledby="continuous-slider" />
          </div> 
      </div>
    </div>
  );
}
export default User;