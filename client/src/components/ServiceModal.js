
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const initialFormState = {
  serviceDate: '',
  serviceDescription: '',
  amountCharged: '',
  profitEarned: '',
  referral: { name: '', commissionPercentage: '',  note: '' }
};

const ServiceModal = ({ isOpen, onClose, onSave, serviceToEdit }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (serviceToEdit) {
      const formattedDate = new Date(serviceToEdit.serviceDate).toISOString().split('T')[0];
      const referralData = serviceToEdit.referral || { name: '', commissionPercentage: '' };
      setFormData({ ...serviceToEdit, serviceDate: formattedDate, referral: referralData });
    } else {
      setFormData(initialFormState);
    }
  }, [serviceToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'referralName' || name === 'referralCommission' || name === 'referralNote') {
      let key = 'name';
    if (name === 'referralCommission') key = 'commissionPercentage';
    if (name === 'referralNote') key = 'note'; 
      setFormData(prevState => ({
        ...prevState,
        referral: { ...prevState.referral, [key]: value }
      }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{serviceToEdit ? 'Edit Service Record' : 'Add New Service Record'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formServiceDate">
            <Form.Label>Service Date</Form.Label>
            <Form.Control type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formServiceDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmountCharged">
            <Form.Label>Amount Charged</Form.Label>
            <Form.Control type="number" min="0" name="amountCharged" value={formData.amountCharged} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProfitEarned">
            <Form.Label>Profit Earned</Form.Label>
            <Form.Control type="number" min="0" name="profitEarned" value={formData.profitEarned} onChange={handleChange} required />
          </Form.Group>
          <hr />
          <h5>Referral (Optional)</h5>
          <Form.Group className="mb-3" controlId="formReferralName">
            <Form.Label>Referral Name</Form.Label>
            <Form.Control type="text" name="referralName" value={formData.referral.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formReferralCommission">
            <Form.Label>Commission Percentage (%)</Form.Label>
            <Form.Control type="number" min="0" max="100" name="referralCommission" value={formData.referral.commissionPercentage} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formReferralNote">
            <Form.Label>Referral Note</Form.Label>
            <Form.Control as="textarea" rows={2} name="referralNote" value={formData.referral.note} onChange={handleChange} />
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

export default ServiceModal;