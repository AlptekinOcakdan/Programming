import React from "react";
import {Container} from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import {Route, Routes} from "react-router-dom";
import CartDetail from "../cart/cartDetail";

function App() {
    return (
        <Container>
            <Navi/>
            <Routes>
                {/*after react-router-dom component changed to element, switch changed to Routes,{Dashboard} changed to {<Dashboard/>} */}
                <Route path="/" exact element={<Dashboard/>}/>
                <Route path="/product" exact element={<Dashboard/>}/>
                <Route path="/cart" exact element={<CartDetail/>}/>
            </Routes>
        </Container>
    );
}

export default App;
