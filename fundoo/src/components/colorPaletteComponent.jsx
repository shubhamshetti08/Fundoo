import React, { Component } from 'react'
import { Tooltip, IconButton, Popper,Paper,ClickAwayListener } from '@material-ui/core'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
{ name: "Red", colorCode: "#ef9a9a" },
{ name: "Cyan", colorCode: "#80deea" },
{ name: "Blue", colorCode: "#2196f3" },
{ name: "Indigo", colorCode: "#9fa8da" },
{ name: "LightBlue", colorCode: "#90caf9" },
{ name: "Purple", colorCode: "#b39ddb" },
{ name: "Yellow", colorCode: "#c5e1a5" },
{ name: "Lime", colorCode: "#e6ee9c" },
{ name: "Pink", colorCode: "#f48fb1" },
{ name: "gray", colorCode: "#eeeeee" },
{ name: "Brown", colorCode: "#bcaaa4" },
]

export default class ColorPaletteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // open: false,
            // anchorEl:null
            anchorEl:false
        }
    }
    handleClickAway=()=>{
        this.setState({
            anchorEl:false
        })
    }
    // handleOpenPopper = () => {
    //     this.setState({
    //         open: !this.state.open
    //     })
    // }
    handleChangeColor = (e) => {
        try {
            this.props.paletteProps(e.target.value, this.props.notesId)
        } catch (err) {
            console.log("error in color palette", err);
        }
    }
    // handleToggle = () => {
    //     this.setState({
    //         open: !this.state.open
    //     })
    // }
    handleClick(event) {
        // const { currentTarget } = event;
        // this.setState({
        // anchorEl: this.state.anchorEl ? null : currentTarget,
        // });
        // };
        this.setState({
        anchorEl: this.state.anchorEl ? false : event.target
        });
        };
    render() {
        // const { anchorEl } = this.state
        // const open = Boolean(anchorEl)
        const colorChange = colorPalette.map((key) => {
            return (
                <div className="color-map">
                    <Tooltip title={key.name}>
                        <IconButton style={{ backgroundColor: key.colorCode, border: "silver 2px solid" }}
                            value={key.colorCode}
                            onClick={this.handleChangeColor}>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })
        return (
            // <div>
            //     <Tooltip title="Change Color">
            //         <ColorLensOutlinedIcon
            //             onClick={this.handleToggle}
            //         />
            //     </Tooltip>
            //     {this.state.open ?
            //         <div className="colorpalette-card">
            //             <Card className="color-styles">
            //                 {colorChange}    
            //             </Card>
            //         </div>
            //         : null}
            // </div>
            <div className="colorpalette-div">
            <Tooltip title="change color">
            {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
                <ColorLensOutlinedIcon onClick={(event) => this.handleClick(event)} cursor="pointer" />
            {/* </ClickAwayListener> */}
            </Tooltip>
            <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                style={{
                    zIndex: "9999"
                }}
            >
                <Paper className="color-styles">
                    {colorChange}
                </Paper>
            </Popper>
            </div>
        )
    }
}

