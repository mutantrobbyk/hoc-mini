import React, {Component} from 'react'

export default function withToggle(WrappedComponent) {
    return class extends Component {
        constructor() {
            super()
            this.state = {
                toggle: false
            }
        }
        handleChange = e => {
            this.setState({
                toggle: !this.state.toggle
            })
        }
        render() {
            let toggle = {
                value: this.state.toggle,
                handleChange: this.handleChange
            }
            return(
                <WrappedComponent toggle={toggle} {...this.props}/>
            )
        }
    }
    
}