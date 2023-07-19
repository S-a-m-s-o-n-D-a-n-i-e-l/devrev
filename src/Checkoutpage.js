import React,{useState} from "react";
import { Card, Col, Container } from "react-bootstrap";
import cover6 from './cover6.jpg'
import { db } from "./config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useNavigate } from "react-router-dom";




function Checkout()
{ 
    const navigate=useNavigate();
    const[userdataa,setUserDataa]=useState(JSON.parse(localStorage.getItem('userdetails')));
    const[dataa,setDataa]=useState(JSON.parse(localStorage.getItem('bookdetails')));
    // console.log(userdataa);
    // console.log(dataa);
    const timestamp=dataa.data.PublishDate;
    const sec=timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() :"";
    const arr=sec.split(",");
    // const docrefer = doc(db,"Books",dataa.data.id);

    const update = async() => {
      const index = userdataa[0].data.BorrowedCount;
      if(index>2)
      {
        alert("You cant Borrow more than 3 Books");
        navigate('/');
        return;
      }
      console.log(userdataa[0].data.BorrowedBooks);
      const borrowedBooks = userdataa[0].data.BorrowedBooks || {}; // Initialize as empty object if not available
      const borrowedBookIds = Object.keys(borrowedBooks);
    
      const isBookBorrowed = borrowedBookIds.find(
        (bookId) => borrowedBooks[bookId].BookID === dataa.data.BookID
      );
      if (isBookBorrowed) {
        alert("This book is already borrowed");
        navigate("/");
        return;
      }
      const storedData = JSON.parse(localStorage.getItem('userdetails'))
      storedData[0].data.BorrowedCount=storedData[0].data.BorrowedCount+1;
      storedData[0].data.BorrowedBooks[index]=dataa.data;
      const updatedData = JSON.stringify(storedData);
      localStorage.setItem('userdetails', updatedData);
      setUserDataa(storedData);

      const docRef = doc(db,"Users",userdataa[0].data.id);
      await updateDoc(docRef,{[`BorrowedBooks.${index}`]:dataa,});
      await updateDoc(docRef,{BorrowedCount:index+1});
      navigate('/');
        
    }
    
    //fetchDocument();
    return(<div>
        {/* <UndoIcon/> */}
        <div className="d-flex justify-content-end mr-3 mt-2">
          <a href="/">
            <FontAwesomeIcon icon={faHome} />Home
          </a>
        </div>
        {/* <a className="d-flex justify-content-end mr-5 mt-1" href="/">Home</a> */}
        <h1 className="d-flex justify-content-center">Verify the Details before Checkout</h1>
        <Container className="d-flex justify-content-center">
        <Col xs={12} md={4} lg={4}>
                  <Card className="mt-3">
                    <a href=""><Card.Img src={cover6}/></a>
                    <Card.Body>
                      <Card.Title><b>Title:  </b>{dataa.data.Title} </Card.Title>
                      <Card.Text><b>Subject: </b>{dataa.data.Subject} </Card.Text>
                      <Card.Text><b>Publish Date: </b>{arr[0]}</Card.Text>
                      <Card.Text><b>Author: </b>{dataa.data.Author}</Card.Text>
                    </Card.Body>
                  </Card>
        </Col>
        </Container>
        <div className="d-flex justify-content-center mt-3 mb-3">
          <button className="btn btn-lg  btn-primary" onClick={update}>Complete Checkout</button>
        </div>
    </div>);
}

export default Checkout;