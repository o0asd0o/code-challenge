import React from 'react';
import jsonData from './../resource/data.json';

// const renderBoxDetail = ({ }) =>
const userCount = jsonData.length + "";
const activeUsers = parseInt((jsonData.filter((user) => user.isActive === true).length / userCount) * 100) + "%";
const employedUsers = parseInt((jsonData.filter((user) => user.employed === true).length / userCount) * 100) + "%";
const newlyRegistered = parseInt((jsonData.filter((user) => user.newlyRegistered === true).length / userCount) * 100) + "%";

const dashBoardMapping = [
    { value: userCount, label: "All Users", bgColor: "#607D8B", iconClassName: "fa fa-users" },
    { value: activeUsers, label: "Active Users", bgColor: "#673AB7", iconClassName: "fa fa-address-card" },
    { value: employedUsers, label: "Employed Users", bgColor: "#795548", iconClassName: "fa fa-suitcase" },
    { value: newlyRegistered, label: "Newly Registered", bgColor: "#FF5722", iconClassName: "fa fa-user-plus" }
];

const renderItem = (item) => (<div key={item.label} className="dashboard-box" style={{ backgroundColor: item.bgColor }}>
    <div className="logo-container">
        <i className={item.iconClassName}></i>
    </div>
    <div>
        <h2>{item.value}</h2>
        <p>{item.label}</p>
    </div>
    <p>More Info <i className="fa fa-arrow-circle-right"></i></p>
</div>)

const Dashboard = () => {

    return (<div className="dashboard">
        {dashBoardMapping.map((item) => renderItem(item))}
    </div>)
}

export default Dashboard;
