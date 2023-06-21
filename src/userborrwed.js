import React, { useEffect, useState } from "react";
import { db } from "./config";
import BookTable from "./Booktable";

function UserBorrowed() {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userdetails')));
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const documentSnapshot = await db.collection("Users").doc(userData[0].data.id).get();
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        if (data && data.BorrowedBooks) {
          setDocumentData(data.BorrowedBooks);
        } else {
          //console.log("No borrowed books found.");
        }
      } else {
        //console.log("Document does not exist.");
      }
    } catch (error) {
      //console.error("Error fetching document: ", error);
    }
  };

  useEffect(() => {
    //console.log("documentData: ", documentData);
  }, [documentData]);

  return (
    <div>
      <h1 className="d-flex justify-content-center">Books Borrowed</h1>
        {documentData ? (
          <BookTable data={documentData} />
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
}

export default UserBorrowed;
