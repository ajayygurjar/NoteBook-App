import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css'; 

const BackDrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>; 
};

const Overlays = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays"); 

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <Overlays>{props.children}</Overlays>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
