import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'

import styles from './modals.module.css'

const Modale = (props) => {
  const {    
    onChange = props.onC,    
  
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal)

  return (
    <div className={styles.modal}>
      <Button className="btn btn-light btn-block" onClick={toggle}>Enter Details</Button>
      <Modal className={styles.modals} isOpen={modal} toggle={toggle} >
        <ModalHeader >Details</ModalHeader>
        <ModalBody>
        
        <Input type="textarea" className={styles.txt}   name="descrip" rows="8" onChange={onChange} />
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-light btn-block" onClick={toggle}>Enter</Button>
         
        </ModalFooter>
      </Modal>
     
    </div>
  );
}

export default Modale;