import React from 'react'
import { Alert } from 'reactstrap'
import styles from "./alert.module.css";
const Alertb = (props) => {    
    return (
        <Alert id={styles.alert} color="warning">
        {props.alert}
      </Alert>     
    )
  }

export default Alertb;
