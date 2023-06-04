import { useState } from "react";
import React from 'react'
import { Card, Row, Col, Container } from "react-bootstrap";
import cover1 from './cover3.jpg'
import cover2 from './cover2.jpg'
import cover4 from './cover4.jpg'
import cover5 from './cover5.jpg'
import cover6 from './cover6.jpg'
import book from './Book.pdf'

const arr=[cover1,cover2,cover4,cover5,cover6];

function Table(prop)
{
  const [currentPage,setCurrentPage]=useState(1);
  const recordperpage=10;
  const lastindex=currentPage * recordperpage;
  const firstIndex=lastindex - recordperpage;
  const npage=Math.ceil(prop.search.length/recordperpage);
  const numbers=[...Array(npage+1).keys()].slice(1);
  const records=prop.search.slice(firstIndex,lastindex);
    return(<div>
      <marquee className="h3" width="100%" direction="right" height="44px">
Welcome to Samson Library!!!
     </marquee >
      <p className="fw-bold ml-5" >Total Books:{prop.search.length}</p>
      <Container>
      <Row>
      {records
              .map(({data:{Title,PublishDate,Author,Subject,Category,BookID}},i)=>{
                return(<Col key={i} xs={12} md={4} lg={3}>
                  <Card className="mt-3">
                    <a href={book}><Card.Img src={arr[i%arr.length]}/></a>
                    <Card.Body>
                      <Card.Title><b>Title:</b> {Title}</Card.Title>
                      <Card.Text><b>Subject:</b> {Subject}</Card.Text>
                      <Card.Text><b>Publish Date:</b> {PublishDate.toDate().toDateString()}</Card.Text>
                      <Card.Text><b>Author:</b> {Author}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>)
              })}
      </Row>
    </Container>
      <nav className="pt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" onClick={()=>{currentPage!==1 && setCurrentPage(currentPage-1)}}>Previous</a>
          </li>
          {numbers.map((n,i)=>(
            <li className={`page-item ${currentPage===n?'active':''}`} key={i}>
             <a href="#" className="page-link"  onClick={()=>setCurrentPage(n)}>{n}</a>
             </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={()=>{currentPage!==npage && setCurrentPage(currentPage+1)}}>Next</a>
          </li>
        </ul>
        {/* <p className="fw-bold position-absolute top-0 start-0" >Total Records:{prop.search.length}</p> */}
      </nav>
      </div>);
}
export default Table;