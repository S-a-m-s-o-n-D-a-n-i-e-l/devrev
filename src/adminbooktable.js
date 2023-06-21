import React from "react";

function Adminbook({ data })
{
    if (!data || Object.keys(data).length === 0) {
        return <p>No books borrowed.</p>;
    }
    return(<table className="table table-hover table-light">
    <thead className="table-info">
      <tr>
      <th>Book ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Subject</th>
      </tr>
    </thead>
    <tbody>
      {Object.values(data).map((book, index) => (
        <tr key={index}>
          <th>{book?.data?.BookID || "N/A"}</th>
          <td>{book?.data?.Title || "N/A"}</td>
          <td>{book?.data?.Author || "N/A"}</td>
          <td>{book?.data?.Category || "N/A"}</td>
          <td>{book?.data?.Subject || "N/A"}</td>
        </tr>
      ))}
    </tbody>
  </table>)
}

export default Adminbook;