import React from 'react'
import withAuthentication from '../hocs/withAuthentication'

function SuperSecret(props) {
    return (
        <div style={{margin: 20, border: '1px solid green'}}>
            <h1>This is top secret!</h1>
            <p>only an authorized user can see this</p>
        </div>
    )
}
export default withAuthentication(SuperSecret)