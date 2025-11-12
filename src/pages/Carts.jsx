import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function Carts({ carts, setCarts }) {
  
  const removeFromCart = (productId) => {
    setCarts(carts.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return carts.reduce((total, item) => total + item.price, 0);
  };

  const getTotalItems = () => {
    return carts.length;
  };

  if (carts.length === 0) {
    return (
      <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2>Carts page</h2>
        <p>Your cart is empty</p>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h2 className="mb-4">Carts page</h2>
      
      <Row className="g-3 mb-4">
        {carts.map((item) => (
          <Col key={item.id} xs={6} sm={4} md={3} lg={3} xl={2}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                <Card.Img 
                  variant="top" 
                  src={item.thumbnailUrl} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <Card.Body className="d-flex flex-column p-3" style={{ minHeight: '140px' }}>
                <Card.Title 
                  style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: '500',
                    lineHeight: '1.3',
                    marginBottom: '8px',
                    height: '40px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {item.title}
                </Card.Title>
                
                <div 
                  style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    color: '#2c3e50',
                    marginBottom: '12px'
                  }}
                >
                  ${item.price?.toFixed(2) || '0.00'}
                </div>
                
                <Button 
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                  className="mt-auto"
                  style={{ 
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    borderColor: '#dc3545',
                    color: '#dc3545'
                  }}
                >
                  Remove from Carts
                </Button>
              </Card.Body>
            </Card>
          </Col>            
        ))}
      </Row>
      
      {/* Summary Section */}
      <div 
        className="d-flex justify-content-between align-items-center p-3 rounded" 
        style={{ 
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
            Products: 
            <span 
              className="ms-2 px-2 py-1 rounded text-white"
              style={{ 
                backgroundColor: '#dc3545',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}
            >
              {getTotalItems()} items
            </span>
          </span>
          <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
            - Total price: 
            <span 
              className="ms-2 px-2 py-1 rounded text-white"
              style={{ 
                backgroundColor: '#28a745',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}
            >
              ${getTotalPrice().toFixed(2)}
            </span>
          </span>
        </div>
        
        <Button 
          variant="warning" 
          style={{ 
            fontSize: '0.9rem',
            fontWeight: 'bold',
            padding: '8px 20px',
            borderRadius: '4px'
          }}
        >
          Checkout 🛒
        </Button>
      </div>
    </Container>
  );
}

export default Carts;