import React, { useContext, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
//import coursesContext from "../context/coursesContext";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/shopcontent";
import "./css/profile.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Profile() {
    const navigate = useNavigate();
    const context = useContext(ShopContext);
    const { getUserDetail,userdetail,handleOrderDetails,orderdetail,getOrderDetail} = context;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem("auth-token")) {
                    await getUserDetail();
                  await handleOrderDetails();
                  await getOrderDetail();
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Container>
                <br />
            </Container>
            <Row>
                <Col md={3}>
                    <h3 className="bg-success text-white text-center">PERSONAL DETAILS</h3>
                    
                    <Table responsive="sm">
                        <tr className="bg-primary text-white">
                            <th>Name</th>
                            <td>{userdetail.name}</td>
                        </tr>
                        <tr className="bg-primary text-white">
                            <th>Email</th>
                            <td>{userdetail.email}</td>
                        </tr>
                        
                    </Table>
                </Col>
                <Col md={9}>
                    <div className="OrderD">
      <h1>Order Details</h1>
      <div className="order">
  
      
     
      {orderdetail ? (
         orderdetail.map((order) => {
           return  <Card className="card">
      <Card.Img variant="top" src={order.image} className="Image"/>
      <Button variant="primary">Track Order</Button>
     
      <Card.Body className="text">
        <Card.Title>Product Name:{order.name}</Card.Title>
        <Card.Text>
     Quantity:-{order.quantity}
        </Card.Text>
        
        <Card.Text>
    Price  {order.new_price}
        </Card.Text>
        <Card.Text>
      total order price:-{order.new_price*(order.quantity)}
        </Card.Text>
        
        
      </Card.Body>
      
    </Card>
    
         }))
            : (
        <p>Loading...</p>
           )
      }
    </div> 
    </div>
  
</Col>
            </Row>
        </>
    );
}

export default Profile;
