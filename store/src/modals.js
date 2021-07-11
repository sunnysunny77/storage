import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import styles from "./modals.module.css";

const Modale = (props) => {
  const { onC } = props;

  const [modal, setModal] = useState(false);
  const [des, setDes] = useState("");
  const toggle = () => {
    setModal(!modal);
    setDes(document.getElementById("txt").value);
  }

  return (
    <div className={styles.modal}>
      <Button className="btn btn-light btn-block" onClick={toggle}>
        Enter Details
      </Button>
      <Modal className={styles.modals} isOpen={modal} toggle={toggle}>
        <ModalHeader>Details</ModalHeader>
        <ModalBody>
          <textarea
            className={styles.txt}
            name="descrip"
            rows="8"
            onChange={onC}
            id="txt"
          >
           {des}
          </textarea>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-light btn-block" onClick={toggle}>
            Enter
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Modale;
