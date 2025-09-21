import { Link } from 'react-router-dom';
import { Table, Button, Stack } from 'react-bootstrap';

const ClientTable = ({ clients, onEdit, onDelete }) => {
   return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.length > 0 ? (
          clients.map(client => (
            <tr key={client._id}>
              <td>
                <Link to={`/client/${client._id}`}>{client.name}</Link>
              </td>
              <td>{client.phone}</td>
              <td>{client.address || 'N/A'}</td>
              <td>
                <Stack direction="horizontal" gap={2} className="justify-content-center">
                  <Button variant="warning" size="sm" onClick={() => onEdit(client)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onDelete(client._id)}>
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No clients found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ClientTable;