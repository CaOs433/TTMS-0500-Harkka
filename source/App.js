import React, { Component } from 'react';
import svgJSONData from './json2.json';
import stationJSONData from './stations.json';
import lastData from './last-data.json';
import './App.css';
import { getStationName, getStationCircleData, getActivityLimit, getHighestValues } from './main.js';
import Map from './Map.js';
import DataContainer from './DataContainer.js';

const emptyHighValuesArr = [{
  "OUJ": { "time": "", "value": 0 },
  "MEK": { "time": "", "value": 0 }, 
  "RAN": { "time": "", "value": 0 }, 
  "PEL": { "time": "", "value": 0 }, 
  "MUO": { "time": "", "value": 0 }, 
  "KIL": { "time": "", "value": 0 }, 
  "KEV": { "time": "", "value": 0 }, 
  "IVA": { "time": "", "value": 0 }, 
  "SOD": { "time": "", "value": 0 }, 
  "HAN": { "time": "", "value": 0 }, 
  "NUR": { "time": "", "value": 0 }
}];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { theJSONData: lastData, loaded: false, loading: false, loadedSuccesfully: true, currentStationID: "HAN", currentStationName: "Hankasalmi", activityHigh: 0.35, highestValues: emptyHighValuesArr };
    this.updateJSONData = this.updateJSONData.bind(this);
    this.onStationClick = this.onStationClick.bind(this);
    this.setHighestValues = this.setHighestValues.bind(this);
    this.getLiveData = this.getLiveData.bind(this);
  }

  getLiveData = async () => {
    try {
      const url = 'https://ssl-saario.xyz/repo/lastData.json';
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok == true) {
        this.setState({ theJSONData: data, loaded: true, loading: false });
      } else { 
        this.setState({ loaded: true, loading: false }); 
        throw new Error(`Error while requesting ${url}`);
      }
    } catch (e) { console.log(e); }
  }

  updateJSONData = async (theDate) => {
    //console.log(`theDate: ${theDate}`);
    if (theDate == 'Live') {
      this.getLiveData();
    } else {
      try {
        const url = 'https://ssl-saario.xyz/repo/dayData.php';
        const bodyJSON = { "date": theDate };
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyJSON) // body data type must match "Content-Type" header
        });
        const data = await response.json();
        if (response.ok == true) {
          //console.log(`data: ${JSON.stringify(data)}`);
          this.setState({ theJSONData: JSON.parse(data.data), loaded: true, loading: false });
        } else {
          this.setState({ loaded: true, loading: false });
          throw new Error(`Error while requesting ${url}`);
        }
      } catch (e) { console.log(e); }
    }
  }

  onStationClick = (id) => {
    this.setState({ loaded: false, loading: true, currentStationID: id, currentStationName: getStationName(id), activityHigh: getActivityLimit(id) });
    //this.getStationData(id);
    //console.log(`this.state.activityHigh: ${this.state.activityHigh}`);
  }

  setHighestValues = (data) => {
    this.setState({ highestValues: data });
  }

  render() {
    
    return (
      <div className="main-container">
        <Map
          svgData={svgJSONData}
          stationData={stationJSONData}
          onStationClick={this.onStationClick}
          currentStationCircleData={getStationCircleData(this.state.currentStationID)}
          highestValues={this.state.highestValues}
        />
        <DataContainer
          stationID={this.state.currentStationID}
          stationName={this.state.currentStationName}
          lastData={this.state.theJSONData}
          activityHigh={this.state.activityHigh}
          setHighestValues={this.setHighestValues}
          updateJSONData={this.updateJSONData}
        />
      </div>
    );
  }
}

export default App;
