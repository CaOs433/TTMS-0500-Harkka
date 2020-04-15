import React, { Component } from 'react';
import './Map.css';
import Station, { StationPulse } from './Station.js';

class Map extends Component {

    render() {
        const svg = this.props.svgData.svg, highestValues = this.props.highestValues;
        return (
            <div className="map-container">
                {/*<h2 translate="400, 0">Mittausasemat kartalla</h2>*/}
                {/*<svg height="10" width="400"></svg>*/}
                <svg height="60" width="400">
                    <rect x="60" y="0" rx="20" ry="20" width="250" height="38" style={{fill:"red"},{stroke:"black"},{strokeWidth:5},{opacity:0.5}} />
                    <text x="70" y="25" fill="red" fontSize="22px" fontWeight="bold">Mittausasemat kartalla</text>
                </svg>
                <svg xmlns={svg.xmlns} viewBox={svg.viewBox} version={svg.version} transform={"translate(0 0)"}>
                    {
                        svg.province.map((province, i) =>
                            <g
                                key={`g_${i}`}
                                className={province.class}>
                                <title>{province.name}</title>
                                {
                                    province.municipality.map((municipality, j) =>
                                        <path
                                            key={`path_${j}`}
                                            d={municipality.d}
                                            className={municipality.class}>
                                            <title>{municipality.name}</title>
                                        </path>
                                    )
                                }
                            </g>
                        )
                    }
                    <Station 
                        stations={this.props.stationData.stations} 
                        onStationClick={this.props.onStationClick}
                        highestValues={highestValues}
                    />
                    <StationPulse station={this.props.currentStationCircleData} />
                    
                </svg>
            </div>
        );
    }
}

export default Map;
