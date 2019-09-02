import React from 'react'
import withToggle from '../hocs/withToggle'


function OnOffButton(props) {
    let {toggle} = props
    console.log(props)
    return(
        <button onClick={toggle.handleChange}>
            <h1>{toggle.value ? 'ON' : 'OFF'}</h1>
        </button>
    )
}
export default withToggle(OnOffButton)