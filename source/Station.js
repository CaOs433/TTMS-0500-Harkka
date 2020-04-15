import React, { Component } from 'react';
import './Station.css';

class Station extends Component {

    constructor(props) {
        super(props);
        this.state = { activeStation: "HAN" };
        this.setClassName = this.setClassName.bind(this);
    }

    click = (id) => {
        this.props.onStationClick(id);
        this.setState({ activeStation: id});
    }

    // Kesken...
    setClassName = (station) => {
        const value = this.props.highestValues[station.id];//.value;
        //console.log(`value: ${value}`);
        if (value >= station.activity) {
            return station.id === this.state.activeStation ? "selected high-activity" : station.class + "high-activity";
        }; return station.id === this.state.activeStation ? "selected" : station.class;
    }

    render() {
        return (
            this.props.stations.map((station, i) =>
                <circle
                    cy={station.cy}
                    key={i}
                    r={2}
                    className={this.setClassName(station)}
                    cx={station.cx}
                    onClick={this.click.bind(this, station.id)}>

                    <title>{station.name}</title>
                </circle>
            )
        );
    }
}

export class StationPulse extends Component {

    render() {
        const station = this.props.station.circle;
        return (<circle className="pulse" transform-origin={`${station.cx} ${station.cy}`} cx={station.cx} cy={station.cy} r={2}></circle>);
    }
}

export default Station;
