import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ShopingCartComponent from '../components/shopingCartComponent';
import DashboardComponent from '../components/dashboardComponent';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// const theme = createMuiTheme({
//     overrides: {
//         MuiAppBar: {
//             positionFixed: {
//                 position: "unset"
//             }
//         }
//     }
// })
class ShopingCartPage extends Component {
    render() {
        return (
                <div className="shoping-page">

                    <div><DashboardComponent searchBar={this.searchBar} listView={this.listView} transition={this.menuSelect} /></div>

                    <div className="shopping-page-div"><ShopingCartComponent /></div>
                </div>
        )
    }
}
export default withRouter(ShopingCartPage);