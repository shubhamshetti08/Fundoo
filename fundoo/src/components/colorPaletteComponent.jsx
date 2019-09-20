import React, { Component } from 'react'
import { Tooltip,IconButton, Card } from '@material-ui/core'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
{ name: "Red", colorCode: "#ef9a9a" },
{ name: "Cyan", colorCode: "#80deea" },
{ name: "Blue", colorCode: "#2196f3" },
{ name: "Indigo", colorCode: "#9fa8da" },
{ name: "LightBlue", colorCode: "#90caf9" },
{ name: "Purple", colorCode: "#b39ddb" },
{ name: "Yellow", colorCode: "#fff59d" },
{ name: "Lime", colorCode: "#e6ee9c" },
{ name: "Pink", colorCode: " #f48fb1" },
{ name: "gray", colorCode: "#eeeeee" },
{ name: "Brown", colorCode: "#bcaaa4" },
]

export default class ColorPaletteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
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
            console.log(err);
        }
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        const colorChange = colorPalette.map((key) => {
            return (
                <div className="color-map">
                    <Tooltip title={key.name}>
                        <IconButton style={{ backgroundColor: key.colorCode ,border:"silver 2px solid"}}
                            value={key.colorCode}
                            onClick={this.handleChangeColor}>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })
        return (
            <div>
                <Tooltip title="Change Color">
                    <ColorLensOutlinedIcon
                        onClick={this.handleToggle}
                    />
                </Tooltip>
                {this.state.open ?
                    <div className="colorpalette-card">
                        <Card className="color-styles">
                            {colorChange}    
                        </Card>
                    </div>
                    : null}
            </div>
        )
    }
}

