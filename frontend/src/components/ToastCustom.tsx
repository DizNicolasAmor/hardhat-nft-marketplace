import React, { FC } from 'react';
import { Toast } from 'react-bootstrap';

export type ToastTypes =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

interface IToastCustom {
  body: string;
  onClose: () => void;
  show: boolean;
  type: ToastTypes;
}

const ToastCustom: FC<IToastCustom> = ({ body, onClose, show, type }) => (
  <div
    aria-live="assertive"
    aria-atomic="true"
    className="position-absolute top-10 start-50 translate-middle"
  >
    <Toast autohide bg={type} delay={3000} onClose={onClose} show={show}>
      <Toast.Body className="text-white">{body}</Toast.Body>
    </Toast>
  </div>
);

export default ToastCustom;
