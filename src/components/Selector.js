import React, { useEffect,useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { useDispatch } from "react-redux";
import * as actions from '../store/actions';
import {createClient, Provider, useQuery} from "urql";

function getStyles(name, metricNames, theme) {
  return {
    fontWeight:
      metricNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 400,
    minHeight:230
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2,
    backgroundColor: "white"
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const MenuProps = {
  PaperProps: {
    style: {
      width: 300
    }
  }
};

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const query_metric = `
    query {
        getMetrics
    }`;

const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}
`;

const getMetricNames = state => {
  const { metricNames } = state.metricNames;
  return {
    metricNames
  };
};

const getHeartBeat = state => {
  const { heartBeat } = state.heartBeat;
  return {
    heartBeat
  };
};


const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


const Selector = (props) =>{
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
 
  
  //
  // use state
  //
  const [state, setState] = useState({
    switch: true,
    value: []
  });
  
  const [metricNames, setMetricName] = useState([]);
  const [metrics, setMetricNames]    = useState([]);

  // query
  let query = query_metric;
  let [result] = useQuery({
    query,
    variables: {}
  });
  const { data, error } = result;

  // handlers
  function handleChange(event) {
    setMetricName(event.target.value);
  }

  //use effect

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    setMetricNames(data.getMetrics);
  }, [dispatch, data, error]);

  useEffect(() => {
    dispatch({ type: actions.DATA_NAME_ADDED, metricNames })
  }, [dispatch, metricNames]);


  return(
    <div>
    <FormControl className={classes.formControl}>
      <InputLabel htmlor="metric-select">Choose Metric</InputLabel>
        <Select
          multiple
          value={metricNames}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {metrics.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, metrics, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );


}


export default () => {
  return (
    <Provider value={client}>
      <Selector/>
    </Provider>
  );
};