import React, { Component } from 'react';
import './DataContainer.css';
import { parseJSONForChart, timeframeOptionsArr, parseDayListData } from './main.js'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

class CustomizedDot extends Component {
    render() {
        const { cx, cy, stroke, payload, value, activityHigh } = this.props;

        if (value > activityHigh) {
            return (
                <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="scale(1)">
                        <g id="shutterstock_1524195260" transform="translate(-739.000000, -509.000000)">
                            <g id="symbol" transform="translate(739.073273, 509.750000)">
                                <polyline id="Fill-203" fill="#F2F6FA" points="222.019727 467.639 221.296727 482.022 204.138727 559.46 357.376727 639.9 357.376727 538.69 222.019727 467.639"></polyline>
                                <polyline id="Fill-204" fill="#F2F6FA" points="403.606727 663.45 360.546727 636.34 293.526727 691.51 293.526727 796.32 403.986727 709.55 403.606727 663.45"></polyline>
                                <polyline id="Fill-205" fill="#F2F6FA" points="548.916727 292.875 229.677727 396.601 229.677727 498.44 548.916727 394.708 548.916727 292.875"></polyline>
                                <polyline id="Fill-206" fill="#F2F6FA" points="38.1347266 161.418 548.916727 342.315 548.916727 224.766 38.1347266 43.871 38.1347266 161.418"></polyline>
                                <polyline id="Fill-207" fill="#C8E882" points="229.677727 498.44 548.916727 394.708 548.916727 337.568 229.677727 441.293 229.677727 498.44"></polyline>
                                <polyline id="Fill-208" fill="#C8E882" points="38.1347266 161.418 548.916727 342.315 548.916727 287.548 38.1347266 106.653 38.1347266 161.418"></polyline>
                                <polyline id="Fill-209" fill="#C8E882" points="204.138727 559.46 357.376727 639.9 357.376727 580.84 215.860727 506.56 204.138727 559.46"></polyline>
                                <polyline id="Fill-210" fill="#C8E882" points="396.926727 659.24 293.526727 740.45 293.526727 796.32 403.986727 709.55 403.606727 663.45 396.926727 659.24"></polyline>
                                <path d="M560.216727,359.785 L560.216727,194.909 C560.216727,188.311 554.866727,182.961 548.266727,182.961 C541.676727,182.961 536.326727,188.311 536.326727,194.909 L536.326727,326.07 C534.116727,324.88 531.786727,323.844 529.346727,322.981 L496.366727,311.3 L496.366727,170.5 C496.366727,163.901 491.016727,158.553 484.426727,158.553 C477.826727,158.553 472.476727,163.901 472.476727,170.5 L472.476727,302.836 L432.526727,288.686 L432.526727,148.155 C432.526727,141.557 427.176727,136.208 420.576727,136.208 C413.976727,136.208 408.626727,141.557 408.626727,148.155 L408.626727,280.226 L368.676727,266.075 L368.676727,124.745 C368.676727,118.146 363.326727,112.797 356.726727,112.797 C350.126727,112.797 344.776727,118.146 344.776727,124.745 L344.776727,257.613 L304.826727,243.463 L304.826727,102.13 C304.826727,95.533 299.476727,90.183 292.876727,90.183 C286.276727,90.183 280.926727,95.533 280.926727,102.13 L280.926727,234.999 L240.978727,220.849 L240.978727,79.784 C240.978727,73.186 235.628727,67.837 229.030727,67.837 C222.432727,67.837 217.082727,73.186 217.082727,79.784 L217.082727,212.387 L177.131727,198.236 L177.131727,56.64 C177.131727,50.042 171.781727,44.693 165.184727,44.693 C158.585727,44.693 153.237727,50.042 153.237727,56.64 L153.237727,189.774 L113.282727,175.624 L113.282727,34.293 C113.282727,27.696 107.934727,22.346 101.335727,22.346 C94.7387266,22.346 89.3887266,27.696 89.3887266,34.293 L89.3887266,167.162 L49.4367266,153.012 L49.4367266,11.947 C49.4367266,5.349 44.0877266,0 37.4897266,0 C30.8917266,0 25.5417266,5.349 25.5417266,11.947 L25.5417266,144.55 L15.9397266,141.149 C9.72072655,138.946 2.89172655,142.204 0.688726552,148.422 C-1.51427345,154.643 1.74272655,161.471 7.96172655,163.674 L521.366727,345.506 C533.076727,349.652 537.096727,359.832 536.956727,367.975 C536.816727,376.118 532.446727,386.152 520.606727,389.893 L496.366727,397.547 L496.366727,380.665 C496.366727,374.066 491.016727,368.717 484.416727,368.717 C477.826727,368.717 472.476727,374.066 472.476727,380.665 L472.476727,405.093 L432.516727,417.709 L432.516727,358.917 C432.516727,352.319 427.176727,346.97 420.576727,346.97 C413.976727,346.97 408.626727,352.319 408.626727,358.917 L408.626727,425.255 L368.676727,437.872 L368.676727,335.972 C368.676727,329.374 363.326727,324.024 356.726727,324.024 C350.126727,324.024 344.776727,329.374 344.776727,335.972 L344.776727,445.417 L304.826727,458.034 L304.826727,312.827 C304.826727,306.229 299.476727,300.88 292.876727,300.88 C286.276727,300.88 280.926727,306.229 280.926727,312.827 L280.926727,465.58 L240.976727,478.196 L240.976727,290.747 C240.976727,284.149 235.626727,278.8 229.029727,278.8 C222.430727,278.8 217.081727,284.149 217.081727,290.747 L217.081727,486.304 C201.213727,493.94 190.724727,508.99 189.137727,527.07 C187.327727,547.69 197.604727,566.44 215.953727,576.02 L379.156727,661.16 C386.896727,665.21 391.986727,672.49 393.106727,681.16 C394.216727,689.82 391.156727,698.16 384.686727,704.04 L368.666727,718.61 L368.666727,695.12 C368.666727,688.52 363.326727,683.17 356.726727,683.17 C350.126727,683.17 344.776727,688.52 344.776727,695.12 L344.776727,740.33 L304.826727,776.65 L304.826727,663.99 C304.826727,657.39 299.476727,652.04 292.876727,652.04 C286.276727,652.04 280.926727,657.39 280.926727,663.99 L280.926727,803.66 C280.926727,803.75 280.936727,803.84 280.946727,803.93 C280.946727,804.15 280.956727,804.38 280.976727,804.6 C280.986727,804.71 280.996727,804.82 281.006727,804.93 C281.266727,807.36 282.266727,809.74 284.036727,811.69 C286.396727,814.28 289.626727,815.6 292.876727,815.6 C295.746727,815.6 298.626727,814.57 300.916727,812.49 L400.766727,721.72 C412.906727,710.68 418.896727,694.37 416.796727,678.1 C414.696727,661.82 404.756727,647.57 390.206727,639.98 L368.666727,628.74 L368.666727,515.81 C368.666727,509.21 363.316727,503.86 356.716727,503.86 C350.126727,503.86 344.776727,509.21 344.776727,515.81 L344.776727,616.27 L304.816727,595.43 L304.816727,536.02 C304.816727,529.43 299.466727,524.08 292.876727,524.08 C286.276727,524.08 280.926727,529.43 280.926727,536.02 L280.926727,582.96 L227.002727,554.83 C215.496727,548.82 212.193727,537.63 212.935727,529.15 C213.679727,520.67 218.881727,510.23 231.255727,506.32 L527.796727,412.675 C547.516727,406.448 560.486727,389.063 560.846727,368.384 C560.906727,365.45 560.666727,362.583 560.216727,359.785" id="Fill-211" fill="#070606"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            );
        } else if (value == null) {
            return (
                <svg width={20} height={20} viewBox="0 0 1024 1024">
                    <circle r={10} fill="black" />
                </svg>
            );
        }; return ( <svg></svg> );
    }
}

class DataContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { activeStation: "HAN", timeframe: "24h", sliderVal: 1, currentChartPage: 1, chartPageCount: 1, showStepperBut: false, dayList: ["2020-04-13"], currentDay: "2020-04-13" };
        this.changeDay = this.changeDay.bind(this);
        this.changeTimeframe = this.changeTimeframe.bind(this);
        this.plusButtonClick = this.plusButtonClick.bind(this);
        this.minusButtonClick = this.minusButtonClick.bind(this);
    }

    getDayList = async () => {
        /*const dataArr = [{"date":"2020-04-13 13:36:18"},{"date":"2020-04-13 21:00:02"}];
        this.setState({ dayList: parseDayListData(dataArr) });*/
        try {
            const url = 'https://ssl-saario.xyz/repo/dayList.php';
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok == true) {
                this.setState({ dayList: parseDayListData(data) });
            } else {
                throw new Error(`Error while requesting ${url}`);
            }
        } catch (e) { console.log(e); }
    }

    changeDay(e) { 
        const val = e.target.value;
        this.setState({ currentDay: val });
        this.props.updateJSONData(val);
    }

    click = (id) => {
        this.props.onStationClick(id);
        this.setState({ activeStation: id});
    }

    changeTimeframe(e) { 
        const val = e.target.value;
        let chartPageCount = 0;
        switch (val) { 
            case "1h": chartPageCount = 24; break;
            case "3h": chartPageCount = 8; break;
            case "6h": chartPageCount = 4; break;
            case "12h": chartPageCount = 2; break;
            case "24h": chartPageCount = 1; break;
        
            default: break;
        }
        this.setState({ timeframe: val, currentChartPage: 1, chartPageCount: chartPageCount, showStepperBut: (chartPageCount == 1) ? false: true }); 
    }

    plusButtonClick() {
        this.setState({ currentChartPage: (this.state.currentChartPage==this.state.chartPageCount) ? this.state.currentChartPage: this.state.currentChartPage+1 });
        //this.render();
    }

    minusButtonClick() {
        this.setState({ currentChartPage: (this.state.currentChartPage==1) ? 1: this.state.currentChartPage-1 });
        //this.render();
    }

    render() {
        const chartData = parseJSONForChart(this.props.stationID, this.props.lastData, this.state.timeframe, this.state.currentChartPage);
        
        return (
            <div className="data-container">
                <h1>Revontulet</h1>
                <h3>Asema: {this.props.stationName} ({this.props.stationID})</h3>
                <hr/>
                <div className="timeframe-selector">
                    {/* Dropdown list for timeframe */}
                    <label htmlFor="timeframe"><strong>Valitse aikaikkuna: </strong></label>
                    <select id="timeframe" onChange={this.changeTimeframe} name="timeframe" value={this.state.timeframe}>
                        {
                            timeframeOptionsArr.map((val, i) => {
                                return <option key={i} value={val}>{val}</option>
                            })
                        }
                    </select>
                    {/* Dropdown list for day list */}
                    <button onClick={this.getDayList} style={{float: "right"}}>Päivitä lista</button>
                    <select id="dayList" onChange={this.changeDay} name="dayList" value={this.state.currentDay} style={{float: "right"}}>
                        {
                            this.state.dayList.map((val, i) => {
                                return <option key={i} value={val}>{val}</option>
                            })
                        }
                    </select>
                    <label htmlFor="dayList" style={{float: "right"}}><strong>Valitse päivä: </strong></label>
                </div>
                <div className="chart-div" id="chartDiv">
                    <LineChart width={800} height={320} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                        <XAxis name="Klo" dataKey="time" >
                            <Label value={`${this.state.currentChartPage} / ${this.state.chartPageCount}`} offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis>
                            <Label value="nT/s" offset={-20} position="insideLeft" />
                        </YAxis>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Line name="Aktiivisuus (nT/s)" type="monotone" dataKey="value" stroke="#ffca9d" dot={<CustomizedDot activityHigh={this.props.activityHigh} />} />
                    </LineChart>
                    <br/>
                    <div>
                        <center style={ !this.state.showStepperBut ? {visibility: "hidden"}: {} }>
                            <button className="button-left" onClick={this.minusButtonClick} style={{width: "40px"}}><span> -1h</span></button>
                            <label> Aikaväli </label>
                            <button className="button-right" onClick={this.plusButtonClick} style={{width: "40px"}}><span>+1h </span></button>
                        </center>
                        <span>Data: <a href="http://ilmatieteenlaitos.fi" rel="noopener noreferrer" target="_blank">ilmatieteenlaitos.fi</a></span>
                    </div>
                </div>
                <hr/>
                <div>
                    <h3>Aseman tiedot:</h3>
                    <p>
                        <strong>Sijainti:</strong> {this.props.stationName}
                    </p>
                    <p>
                        <strong>Aktiivisuuden alaraja:</strong> n. <span style={{color: "crimson"}}>{this.props.activityHigh}</span> nT/s
                    </p>
                    <p>
                        <strong>Korkein mittaus:</strong> {} nT/s
                    </p>
                </div>
                

            </div>
        );
    }
}

export default DataContainer;



