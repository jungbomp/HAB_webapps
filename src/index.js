import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

import "./index.css";
import App from "./App";
import PackingStatusView from "./packingStatusView";
import SalesBySKUView from "./salesBySkuView";
import Notfound from "./notfound";
import * as serviceWorker from "./serviceWorker";

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/packing_status_view" component={PackingStatusView} />
                <Route path="/sales_by_sku_view" component={SalesBySKUView} />
                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
