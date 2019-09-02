import React from 'react'
import withToggle from '../hocs/withToggle'

function AccordianMenu(props) {
    let {toggle} = props
    return(
        <div>
        <div id='title' style={styles.menuTitle} onClick={toggle.handleChange}>
            {props.title}
        </div>
        {toggle.value && (
            <div id='body' style={styles.menuBody}>
                {props.children}
            </div>
        )}
        </div>
    )
}

let styles = {
    menuTitle: {
      border: '1px solid black',
      padding: 20
    },
    menuBody: {
      border: '1px solid black',
      borderTop: 'none',
      backgroundColor: '#F0F0F0',
      padding: 20
    }
  }
  
  export default withToggle(AccordianMenu)

