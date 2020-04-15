export const idArray = ["OUJ", "MEK", "RAN", "PEL", "MUO", "KIL", "KEV", "IVA", "SOD", "HAN", "NUR"/*, "TAR"*/];
export const timeframeOptionsArr = ["1h", "3h", "6h", "12h", "24h"];

export const getStationName = (id = "") => {
    switch (id) {
        case "OUJ": return "Oulujärvi";
        case "MEK": return "Mekrijärvi";
        case "RAN": return "Ranua";
        case "PEL": return "Pello";
        case "MUO": return "Muonio";
        case "KIL": return "Kilpisjärvi";
        case "KEV": return "Kevo";
        case "IVA": return "Ivalo";
        case "SOD": return "Sodankylä";
        case "HAN": return "Hankasalmi";
        case "NUR": return "Nurmijärvi";
        case "TAR": return "Tartto";
    
        default: console.log('Unknown station id'); return null;
    }
}

export const getStationCircleData = (id = "") => {
    switch (id) {
        case "OUJ": return { "circle": { "name": "Oulujärvi", "cx": "73.15", "cy": "105.81" } };
        case "MEK": return { "circle": { "name": "Mekrijärvi", "cx": "109.55", "cy": "141.52" } };
        case "RAN": return { "circle": { "name": "Ranua", "cx": "65.79", "cy": "81.95" } };
        case "PEL": return { "circle": { "name": "Pello", "cx": "50.08", "cy": "62.82" } };
        case "MUO": return { "circle": { "name": "Muonio", "cx": "46.95", "cy": "38.68" } };
        case "KIL": return { "circle": { "name": "Kilpisjärvi", "cx": "28.62", "cy": "18.56" } };
        case "KEV": return { "circle": { "name": "Kevo", "cx": "72.66", "cy": "5.37" } };
        case "IVA": return { "circle": { "name": "Ivalo", "cx": "77.58", "cy": "30.18" } };
        case "SOD": return { "circle": { "name": "Sodankylä", "cx": "72.44", "cy": "51.65" } };
        case "HAN": return { "circle": { "name": "Hankasalmi", "cx": "67.97", "cy": "150.91" } };
        case "NUR": return { "circle": { "name": "Nurmijärvi", "cx": "51.48", "cy": "187.93" } };
        /*case "TAR": return { "circle": { "name": "Tartto", "cx": "", "cy": "" } };*/
    
        default: console.log('Unknown station id'); return null;
    }
}

export const isID = (id = "") => {
    //console.log(`id: ${id}`);
    idArray.forEach((val) => { 
        if (id == val) { /* console.log(`val: ${val}`); */ return true; } 
    });
    return false;
}

export const parseLastDataJSON = (id = "", data) => {
    if (isID(id)) { console.log('return null'); return null; }
    const rtnData = data[id].dataSeries.map((val) => { 
        return { "time": val[0], "value": val[1] } 
    });
    //console.log(`rtnData: ${rtnData}`);
    return rtnData;
}

const getTimeframeCount = (timeframe = "") => {
    switch (timeframe) {
        case "1h": return 6;
        case "3h": return 18;
        case "6h": return 36;
        case "12h": return 72;
        case "24h": return 144;
    
        default: return null;
    }
}

const getChartPageCount = (timeCount) => { return 144/timeCount;
    
    switch (timeCount) {
        case 6: return 24;
        case 18: return 8;
        case 36: return 4;
        case 72: return 2;
        case 144: return 1;
    
        default: return null;
    }
}

const isLastPage = (currentChartPage, timeCount) => {
    return (getChartPageCount(timeCount) == currentChartPage);
}

const isSmallerInd = (currentChartPage, timeCount, i) => {
    return i < ((currentChartPage==1) ? timeCount: timeCount*(currentChartPage/*+1*/));
}

const isBiggerInd = (currentChartPage, timeCount, i) => {
    return i >= ((currentChartPage==1) ? 0: timeCount*(currentChartPage-1));
}

export const parseJSONForChart = (id = "", data, timeframe, currentChartPage) => {
    const timeCount = getTimeframeCount(timeframe);
    if (isID(id) && timeCount == null) { console.log('return null'); return null; }

    //console.log(`isBiggerInd:\ntimeCount*(currentChartPage-1): ${timeCount*(currentChartPage-1)}`);
    //console.log(`isSmallerInd:\ntimeCount*(currentChartPage): ${timeCount*(currentChartPage/*+1*/)}`);
    //console.log(`from: ${((currentChartPage==1) ? 0: timeCount*(currentChartPage-1))} to ${((currentChartPage==1) ? timeCount: timeCount*(currentChartPage+1))}`);

    let rtnData = [], highestVal = 0, dataToParse = [];
    dataToParse = data;
    //console.log(`id: ${id}\ndataToParse: ${JSON.stringify(dataToParse)}`);
    try {
        dataToParse[id].dataSeries.map((val, i) => {
            if (isBiggerInd(currentChartPage, timeCount, i) == true && isSmallerInd(currentChartPage, timeCount, i) == true) {
                const unix_timestamp = val[0], value = val[1];
                const date = new Date(unix_timestamp);
                const h = date.getUTCHours(), m = date.getUTCMinutes();
                const formattedTime = (m == 0) ? `${(h < 10) ? '0'+h: h}:00`: `${(h < 10) ? '0'+h: h}:${m}`;
                //console.log(`time: ${formattedTime}`);
                //console.log(`Date: ${date.toLocaleString('fi-FI', { timeZone: 'UTC' })}`);
                rtnData.push( { "time": formattedTime, "value": value /*== null ? 0: value*/ } );
                if (value > highestVal) { highestVal = value; }
            }
        });
    } catch (e) { console.log(e); }

    //rtnData.push( { "highestVal": highestVal } );

    /*rtnData.map((val, i) => {
        console.log(`time(${i}): \t${val.time}`);
    });*/
    //console.log(`highestVal:\t${rtnData[rtnData.length-1].highestVal}`);

    return rtnData;
}

export const getActivityLimit = (id = "") => {
    switch (id) {
        case "OUJ": return 0.41;
        case "MEK": return 0.36;
        case "RAN": return 0.42;
        case "PEL": return 0.5;
        case "MUO": return 0.51;
        case "KIL": return 0.58;
        case "KEV": return 0.58;
        case "IVA": return 0.52;
        case "SOD": return 0.5;
        case "HAN": return 0.35;
        case "NUR": return 0.3;
        case "TAR": return null;
    
        default: console.log('Unknown station id'); return null;
    }
}

export const getHighestValues = (data) => {
    let rtnData = [];
    idArray.forEach((id, i) => {
        let highestVal = 0, time = "";
        data[id].dataSeries.map((val, j) => {
            const unix_timestamp = val[0], value = val[1];
            if (value > highestVal) { 
                const date = new Date(unix_timestamp);
                const h = date.getHours(), m = date.getMinutes();
                time = (m == 0) ? `${(h < 10) ? '0' + h : h}:00` : `${(h < 10) ? '0' + h : h}:${m}`;
                highestVal = value; 
            }
        });
        switch (id) {
            case "OUJ": rtnData.push( { "OUJ": { "time": time, "value": highestVal } } ); break;
            case "MEK": rtnData.push( { "MEK": { "time": time, "value": highestVal } } ); break;
            case "RAN": rtnData.push( { "RAN": { "time": time, "value": highestVal } } ); break;
            case "PEL": rtnData.push( { "PEL": { "time": time, "value": highestVal } } ); break;
            case "MUO": rtnData.push( { "MUO": { "time": time, "value": highestVal } } ); break;
            case "KIL": rtnData.push( { "KIL": { "time": time, "value": highestVal } } ); break;
            case "KEV": rtnData.push( { "KEV": { "time": time, "value": highestVal } } ); break;
            case "IVA": rtnData.push( { "IVA": { "time": time, "value": highestVal } } ); break;
            case "SOD": rtnData.push( { "SOD": { "time": time, "value": highestVal } } ); break;
            case "HAN": rtnData.push( { "HAN": { "time": time, "value": highestVal } } ); break;
            case "NUR": rtnData.push( { "NUR": { "time": time, "value": highestVal } } ); break;
            case "TAR": rtnData.push( { "TAR": { "time": time, "value": highestVal } } ); break;
        
            default: console.log('Unknown station id'); break;
        }
    });

    //console.log(`rtnData (getHighestValues):\n${JSON.stringify(rtnData)}`);

    return rtnData.map(val => {
        //console.log(`val (getHighestValues):\n${JSON.stringify(val)}`);
        return val;
    });

    //console.log(`rtnData (getHighestValues):\n${rtnData}`);
    //return rtnData;
}

export const parseDayListData = (data) => {
    let rtnArr = ['Valitse päivä', 'Live'];
    data.map((val, i) => {
        rtnArr.push(val.date/*.replace(/\ .*-poista-/,'')*/);
        //console.log(`${i}:\t${val}`);
    }); return rtnArr;
}