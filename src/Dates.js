import React, {useState, useEffect} from 'react';
import { TextField } from '@material-ui/core';


function Dates(props) {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    useEffect(()=>{
        props.sendDateFromParent(dateFrom,props.index);
    },[dateFrom])

    useEffect(()=>{
        props.sendDateToParent(dateTo,props.index);
    },[dateTo])

    return(
    <div>
    <TextField
        id="date"
        style={{marginRight:15, marginBottom:15}}
        label="From"
        type="date"
        value={dateFrom} 
        onChange={(e)=>{setDateFrom(e.target.value)}} 
        InputLabelProps={{
        shrink: true,
        }}
    />
    <TextField
        id="date2"
        style={{marginRight:15}}
        label="To"
        type="date"
        value={dateTo} 
        onChange={(e)=>{setDateTo(e.target.value)}} 
        InputLabelProps={{
        shrink: true,
        }}
    />
    </div>

    );
}
export default Dates;