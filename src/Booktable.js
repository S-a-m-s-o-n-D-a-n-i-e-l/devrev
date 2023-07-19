import React from "react";
import { db } from "./config";
import Book from "./Book.pdf"

function BookTable({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p>No books borrowed.</p>;
  }

  const storedArray = JSON.parse(localStorage.getItem("userdetails"));
  console.log(data);
  const deleteBookFromFirestore = async (userId, bookId) => {
    try {
      const userRef = db.collection("Users").doc(userId);
      const userSnapshot = await userRef.get();
  
      if (userSnapshot.exists) {
        const user = userSnapshot.data();
        const borrowedBooks = user.BorrowedBooks || {};
  
        // Find the book with matching bookId
        const bookKey = Object.keys(borrowedBooks).find(
          (key) => borrowedBooks[key].data.id === bookId
        );

        console.log(bookKey);
  
        if (bookKey) {
          // Remove the book from borrowedBooks
          delete borrowedBooks[bookKey];
  
          // Update the Firestore document
          await userRef.update({
            BorrowedBooks: borrowedBooks,
            BorrowedCount: user.BorrowedCount - 1,
          });
  
          alert("Book returned successfully.");
          returnBook(bookKey);
        } else {
          alert("Book not found.");
        }
      } else {
        alert("User document not found.");
      }
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };
  
  const returnBook = (index) => {
    const storedArray = JSON.parse(localStorage.getItem("userdetails"));

    if (storedArray && storedArray.length > 0) {
      const user = storedArray[0].data;
      const borrowedBooks = user.BorrowedBooks || {};

      delete borrowedBooks[index];

      const updatedBooks = Object.values(borrowedBooks);

      user.BorrowedBooks = updatedBooks;
      user.BorrowedCount--;

      localStorage.setItem("userdetails", JSON.stringify(storedArray));
    }
    window.location.reload();
  };

  return (
    <table className="table table-hover table-light">
      <thead className="table-warning">
        <tr>
          <th>Book ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Subject</th>
          <th>Download Book</th>
          <th>Action</th>
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
            <td><a href={Book}>Book Link</a></td>
            <td>
              <button
                onClick={() => {
                  const bookId = book?.data?.id;
                  if (bookId) {
                    deleteBookFromFirestore(
                      storedArray[0].data.id,
                      bookId,
                      index
                    );
                  }
                }}
                className="btn btn-primary"
              >
                Return
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;
