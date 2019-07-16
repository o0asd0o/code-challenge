import React from 'react';
import { Line } from 'react-chartjs-2';
import jsonData from './../resource/data.json';
import Select from 'react-select';

const defaultDataSetProp = {
    fill: false,
    borderWidth: 2,
}
const graphOptions = {
    responsive: true,
    legend: {
         display: false
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem) {
                return tooltipItem.yLabel + " Users";
            }
        }
    }
}

const options = [
    { value: 'balance', label: 'Remaining Balance' },
    { value: 'age', label: 'Age' },
    { value: 'eyeColor', label: 'Eye Color' },
    { value: 'dateRegistered', label: 'Date Registered' },
    { value: 'friends', label: 'Friends' },
    { value: 'favoriteFruit', label: 'Favorite Fruit' },
    { value: 'civilStatus', label: 'Civil Status' },
];

const dataMapping = [
    { key: "balance", labels: ["$0-$500", "$501-$1000", "$1001-$1500", "$1501-$2000", "$2001-$2500", "$2501-$3000", "> $3000"], color: "#5d4037" },
    { key: "age", labels: ["20-23", "24-27", "28-31", "32-35", "36-40", "> 40"], color: "#e64a19" },
    { key: "eyeColor", labels: ["Brown", "Blue", "Green", "Black"], color: "#ffea00" },
    { key: "dateRegistered", labels: ["January-February", "March-April", "May-June", "July-August", "September-October", "November-December"], color: "#00c853" },
    { key: "friends", labels: ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30", "> 30"], color: "#263238" },
    { key: "favoriteFruit", labels: ["Apple", "Banana", "Strawberry"], color: "#2196f3" },
    { key: "civilStatus", labels: ["Single", "Married", "Widower", "Legally Separated", "Anulled"], color: "#7b1fa2" }
];

const isWithinInterval = (string, value) => {
    const split = string.split("-");
    if (split.length > 1) {
        const first = parseInt(split[0].replace(/\$/g, ""));
        const second = parseInt(split[1].replace(/\$/g, ""));
        const temp = value.replace(/[^0-9.-]+/g,"");
        return parseInt(temp) >= first && parseInt(temp) <= second;
    } else {
        const number = parseInt(string.replace(/[^0-9.-]+/g,""));
        const temp = value.replace(/[^0-9.-]+/g,"");
        return parseInt(temp) > number;
    }
}

const isWithinCondition = (string, value) => {
    const split = string.split("-");
    if (split.length > 1) {
        const first = split[0];
        const second = split[1];
        return ~value.indexOf(first) || ~value.indexOf(second);
    } else {
        return string === value;
    }
}

const getUserCountFromCondition = (condition, key, type) => {
    let counter = 0;
    jsonData.forEach((item) => {
        const valueToCompare = key !== "friends" ? item[key] : item[key].length;
        if (type === "number" && isWithinInterval(condition, String(valueToCompare))) {
            counter = counter + 1;
        } else if (type === "string" && isWithinCondition(condition, valueToCompare)) {
            counter = counter + 1;
        }
    })
    return counter;
}

const mappingOperations = {
    balance: () => {
        const values = Object.values(dataMapping[0].labels);
        return values.map((condition) => getUserCountFromCondition(condition, "balance", "number"));
    },
    age: () => {
        const values = Object.values(dataMapping[1].labels);
        return values.map((condition) => getUserCountFromCondition(condition, "age", "number"));
    },
    eyeColor: () => {
        const values = Object.values(dataMapping[2].labels);
        return values.map((condition) => getUserCountFromCondition(condition, "eyeColor", "string"))
    },
    dateRegistered: () => {
        const values = Object.values(dataMapping[3].labels);
        return values.map((condition) => getUserCountFromCondition(condition, "registered", "string"))
    },
    friends: () => {
        const values = Object.values(dataMapping[4].labels);
        return values.map((condition) => getUserCountFromCondition(condition, "friends", "number"));
    },
    favoriteFruit: () => {
        const values = Object.values(dataMapping[5].labels);
        return values.map((condition) => getUserCountFromCondition(condition, "favoriteFruit", "string"))
    },
    civilStatus: () => {
        const values = Object.values(dataMapping[6].labels);
        return values.map((condition) => getUserCountFromCondition(condition, "civilStatus", "string"))
    }
}

export default class Body extends React.Component{
    constructor() {
        super();
        this.state = {
            selectedOption: null,
            labels: [],
            datasets: []
        };
    }
    setChartData() {
        const { selectedOption } = this.state;
        if (selectedOption) {
            const specificItem = dataMapping.find((mapping) => mapping.key === selectedOption.value);
            const labels = specificItem.labels;
            const datasets = [{
                ...defaultDataSetProp,
                label: selectedOption.label,
                borderColor: specificItem.color,
                data: mappingOperations[selectedOption.value]()
            }];
            this.setState({ labels, datasets });
        }
    }
    componentDidMount() {
        this.onSelectChange(options[0]);
    }

    onSelectChange(selectedOption) {
        this.setState({ selectedOption }, () => this.setChartData());
    }

    render() {
        const { labels, datasets } = this.state;
        const data = { labels, datasets };
        return (<div className="body">
            <div className="input-container">
                <p>Please select field to see <b>users</b> statistics</p>
                <Select options={options} value={this.state.selectedOption} onChange={(selectedOption) => this.onSelectChange(selectedOption)}/>
            </div>
            <div className="chart-container">
                <p className="y-label">No. of Users</p>
                <Line  data={data} options={graphOptions}/>
                <p className="x-label">{this.state.selectedOption && this.state.selectedOption.label}</p>
            </div>
        </div>)
    }
};
