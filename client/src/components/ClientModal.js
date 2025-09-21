
import  { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ClientModal = ({ isOpen, onClose, onSave, clientToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    googleMapsLink: ''
  });

  useEffect(() => {
    if (clientToEdit) {
      setFormData(clientToEdit);
    } else {
      setFormData({ name: '', phone: '', address: '', googleMapsLink: '' });
    }
  }, [clientToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{clientToEdit ? 'Edit Client' : 'Add New Client'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formClientName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClientPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClientAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClientMapsLink">
            <Form.Label>Google Maps Link</Form.Label>
            <Form.Control type="url" name="googleMapsLink" value={formData.googleMapsLink} onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ClientModal;