import React from "react";
import { Modal, Button } from "antd";

const ContactUsModal = ({ isVisible, onClose, title }) => {
  return (
    <Modal title={title} visible={isVisible} onCancel={onClose} footer={null}>
      <div>
        <h3>Contact Information</h3>
        <p>Email: contact@dreamhome.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Dream St, Home City, Country</p>
      </div>
      <Button onClick={onClose} type="primary" style={{ marginTop: '20px' }}>
        Close
      </Button>
    </Modal>
  );
};

export default ContactUsModal;
