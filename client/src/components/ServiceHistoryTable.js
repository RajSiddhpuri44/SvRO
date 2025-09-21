import { Card, Table, Button, Stack, Tooltip, OverlayTrigger } from 'react-bootstrap';
const ServiceHistoryTable = ({ services, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

   const renderTooltip = (note) => (
    <Tooltip id="button-tooltip">
      {note}
    </Tooltip>
  );

  return (
    <Card>
      <Card.Header as="h5">Service History</Card.Header>
      <Card.Body>
        {services.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Profit</th>
                <th>Referral</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service._id}>
                  <td>{formatDate(service.serviceDate)}</td>
                  <td>{service.serviceDescription}</td>
                  <td>${service.amountCharged}</td>
                  <td>${service.profitEarned}</td>
                  <td>
                   {service.referral && service.referral.name 
                      ? (
                        <>
                          {`${service.referral.name} (${service.referral.commissionPercentage || 0}%)`}
                          {service.referral.note && (
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltip(service.referral.note)}
                            >
                              <span className="ms-2" style={{cursor: 'pointer'}}>📝</span>
                            </OverlayTrigger>
                          )}
                        </>
                      )
                      : 'N/A'
                    }
                  </td>
                  <td>
                    <Stack direction="horizontal" gap={2} className="justify-content-center">
                      <Button variant="warning" size="sm" onClick={() => onEdit(service)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => onDelete(service._id)}>
                        Delete
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center">No service history found.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default ServiceHistoryTable;