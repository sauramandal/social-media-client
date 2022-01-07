import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
const Register = ({data}) => {
    
    const [state, setState] = useState({}) 
    
    return (
        <Fragment>
            Content
        </Fragment>
    )
}
Register.propTypes = {
    data: PropTypes.array.isRequired
}
Register.defaultProps = {
    data: []
}
export default Register