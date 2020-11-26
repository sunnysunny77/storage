import React from 'react'
import { Alert } from 'reactstrap'

const Alertb = (props) => {    
    return (
        <Alert color="warning">
        {props.alert}
      </Alert>     
    )
  }

export default Alertb;
