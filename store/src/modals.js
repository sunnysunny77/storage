import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import styles from './modals.module.css'

const Modale = (props) => {
  const {    
    onChange = props.onC,    
    placeholder = props.plh
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal)

  return (
    <div className={styles.modal}>
      <Button className="btn btn-light btn-block" onClick={toggle}>Enter Details</Button>
      <Modal className={styles.modals} isOpen={modal} toggle={toggle} >
        <ModalHeader >Details</ModalHeader>
        <ModalBody>
          <textarea className={styles.txt} placeholder={placeholder} required name="descrip" rows="8" onChange={onChange} ></textarea>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-light btn-block" onClick={toggle}>Enter</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Modale;