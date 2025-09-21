import { Card, Button } from 'react-bootstrap'; 

const ClientInfoCard = ({ client }) => {
  if (!client) {
    return <div>Loading client details...</div>;
  }
  
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Client Information</Card.Header>
      <Card.Body>
        <Card.Title>{client.name}</Card.Title>
        <Card.Text>
          <strong>Phone:</strong> {client.phone}
        </Card.Text>
        <Card.Text>
          <strong>Address:</strong> {client.address || 'Not provided'}
        </Card.Text>
        {client.googleMapsLink && (
          <Button variant="primary" href={client.googleMapsLink} target="_blank" rel="noopener noreferrer">
            View on Map
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ClientInfoCard;