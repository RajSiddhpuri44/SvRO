import { useState,  useEffect, useCallback } from 'react';
import API from '../api'; 
import ClientTable from '../components/ClientTable';
import ClientModal from '../components/ClientModal';
import { Button, Stack, Spinner, Form  } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useDebounce from '../hooks/useDebounce'; 


const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
   const [loading, setLoading] = useState(true);

   const debouncedSearchQuery = useDebounce(searchQuery, 500);

 const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get(`/clients?search=${debouncedSearchQuery}`);
      setClients(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch clients.");
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

    useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleOpenModal = (client = null) => {
    setClientToEdit(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setClientToEdit(null);
    setIsModalOpen(false);
  };

  const handleSaveClient = async (clientData) => {
    try {
      if (clientToEdit) {
        await API.put(`/clients/${clientToEdit._id}`, clientData);
        toast.success('Client updated successfully!');
      } else {
        await API.post('/clients', clientData);
        toast.success('Client added successfully!');
      }
      fetchClients(); 
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save client. Please try again.');
      console.error("Error saving client:", error);
    }
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await API.delete(`/clients/${id}`);
         toast.success('Client deleted successfully!');
        fetchClients();
      } catch (error) {
        toast.error('Failed to delete client. Please try again.');
        console.error("Error deleting client:", error);
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
       <Stack direction="horizontal" gap={3} className="mb-4">
        <h1 className="me-auto">Client Management</h1>
        <Form.Control 
          type="search" 
          placeholder="Search by Name or Phone..." 
          className="me-2" 
          style={{ width: '250px' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={() => handleOpenModal()}>
          Add New Client
        </Button>
      </Stack>
      
     <ClientTable clients={clients} onEdit={handleOpenModal} onDelete={handleDeleteClient} />

      <ClientModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveClient}
        clientToEdit={clientToEdit} 
      />
    </>
  );
};

export default Dashboard;