import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function Products({ products, carts, setCarts }) {
  
  const addToCart = (product) => {
    // ตรวจสอบว่าสินค้านี้มีในตะกร้าแล้วหรือไม่
    const existingItem = carts.find(item => item.id === product.id);
    
    if (!existingItem) {
      // ถ้ายังไม่มี เพิ่มสินค้าใหม่ (แค่ 1 ชิ้นเท่านั้น)
      setCarts([...carts, { ...product, quantity: 1 }]);
    }
    // ถ้ามีอยู่แล้วไม่ทำอะไร (ไม่เพิ่มจำนวน)
  };

  // ตรวจสอบว่าสินค้าอยู่ในตะกร้าหรือไม่
  const isInCart = (productId) => {
    return carts.some(item => item.id === productId);
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="g-3">
        {products.map((product) => {
          const inCart = isInCart(product.id);
          
          return (
            <Col key={product.id} xs={6} sm={4} md={3} lg={3} xl={2}>
              <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                  <Card.Img 
                    variant="top" 
                    src={product.thumbnailUrl} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                <Card.Body className="d-flex flex-column p-3" style={{ minHeight: '160px' }}>
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
                    {product.title}
                  </Card.Title>
                  
                  <div 
                    style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      color: '#2c3e50',
                      marginBottom: '12px'
                    }}
                  >
                    ${product.price?.toFixed(2) || '0.00'}
                  </div>
                  
                  <Button 
                    variant={inCart ? "danger" : "primary"}
                    size="sm"
                    onClick={() => addToCart(product)}
                    className="mt-auto"
                    style={{ 
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      borderRadius: '4px',
                      padding: '6px 12px'
                    }}
                    disabled={inCart}
                  >
                    {inCart ? "added to carts" : "Add to carts"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>            
          );
        })}
      </Row>
    </Container>
  )
}

export default Products;