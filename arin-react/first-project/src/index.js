import React from "react";
import ReactDOM from "react-dom";
import Card from "./components/Card";

/*
function App() {
    return <h1>Benim Adım Alptekin</h1>
}
*/

function App() {
    return(
        <div>
            <div className="card-group">
                <Card cardTitle="Beşiktaş"/>
                <Card cardTitle="Fenerbahçe"/>
                <Card cardTitle="Galatasaray"/>
            </div>
        </div>
    );
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);