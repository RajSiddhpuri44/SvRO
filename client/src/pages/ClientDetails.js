import  { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import ClientInfoCard from '../components/ClientInfoCard';
import ServiceHistoryTable from '../components/ServiceHistoryTable';
import ServiceModal from '../components/ServiceModal';
import { toast } from 'react-toastify';
import { Spinner, Stack, Button, Form  } from 'react-bootstrap';
import useDebounce from '../hooks/useDebounce';

const ClientDetails = () => {
  const { id } = useParams(); 
  const [client, setClient] = useState(null);
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [serviceToEdit, setServiceToEdit] = useState(null);
   const [loading, setLoading] = useState(true); 

   const debouncedServiceSearchQuery = useDebounce(serviceSearchQuery, 500);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const clientRes = await API.get(`/clients/${id}`);
      setClient(clientRes.data.data);
      
      const servicesRes = await API.get(`/services/client/${id}?search=${debouncedServiceSearchQuery}`);
      setServices(servicesRes.data.data);
    } catch (error) {
      toast.error("Failed to fetch data.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [id, debouncedServiceSearchQuery]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const handleOpenModal = (service = null) => {
    setServiceToEdit(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setServiceToEdit(null);
    setIsModalOpen(false);
  };

  const handleSaveService = async (serviceData) => {
    const dataWithClient = { ...serviceData, client: id };
    try {
      if (serviceToEdit) {
        await API.put(`/services/${serviceToEdit._id}`, dataWithClient);
         toast.success('Service record updated!');
      } else {
        await API.post('/services', dataWithClient);
          toast.success('Service record added!'); 
      }
      fetchData(); 
      handleCloseModal();
    } catch (error) {
       toast.error('Failed to save service record.');
      console.error("Error saving service:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service record?")) {
      try {
        await API.delete(`/services/${serviceId}`);
        toast.success('Service record deleted!');
        fetchData(); 
      } catch (error) {
         toast.error('Failed to delete service record.');
        console.error("Error deleting service:", error);
      }
    }
  };

 
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Link to="/" className="mb-4 d-inline-block">&larr; Back to Dashboard</Link>
      
      <ClientInfoCard client={client} />
      
      <Stack direction="horizontal" gap={3} className="my-4">
        <h3 className="me-auto">Service Management</h3>
        <Form.Control 
          type="search" 
          placeholder="Search by Description..." 
          className="me-2" 
          style={{ width: '250px' }}
          value={serviceSearchQuery}
           onChange={(e) => setServiceSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add Service Record
        </Button>
      </Stack>

       <ServiceHistoryTable services={services} onEdit={handleOpenModal} onDelete={handleDeleteService} />
      
      <ServiceModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveService} 
        serviceToEdit={serviceToEdit}
      />
    </>
  );
};

export default ClientDetails;