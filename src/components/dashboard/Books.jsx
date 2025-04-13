import React, { useEffect, useState } from "react";
import { FaBook, FaSearch } from "react-icons/fa";
import BookTable from "../tables/BookTable";
import AddBook from "../AddBook";
import EditBook from "../EditBook";
import { ToastContainer, toast } from "react-toastify";
import { handleSearch } from "../../utils/utils";
import { useAuthContext } from "../../context/AuthContext";
import BookInfo from "../BookInfo";

const Books = () => {
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const { currentUser } = useAuthContext();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedBook, setSelectedBook] = useState();
  const [searchBook, setSearchBook] = useState("")
  const { privateInstance } = useAuthContext()

  // close modal
  const closeModal = () => {
    setIsEdit(false);
    setIsModal(false);
    setIsInfo(false);
    setSelectedBook()
  };

  // open modal
  const openModal = () => setIsModal(true);

  // retrieve books
  const RetrieveBooks = async () => {
    try {
      const res = await privateInstance.get(`/book/lib/${currentUser?.libId}`);
      if (res.data) {
        setList(res.data?.list);
        setFilteredList(res.data?.list)
      }
    } catch (e) {
      let error = e?.response?.data?.message || e?.response?.data?.error;
      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(e?.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  // handle delete book
  const deleteBook = async (id) => {
    try {
      const res = await privateInstance.delete(`/admin/delete/book/${id}`);
      if (res.data) {
        toast.success(res.data?.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        RetrieveBooks();
      }
    } catch (e) {
      let error = e?.response?.data?.message || e?.response?.data?.error;
      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(e?.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  // handle isEdit
  const handleIsEdit = (id) => {
    const selected = list.find(item => item?.isbn === id);
    setSelectedBook(selected)
    setIsEdit(true);
  };

  // handle book info 
  const handleBookInfo = (id) => {
    const selected = list.find(item => item?.isbn === id);
    setSelectedBook(selected)
    setIsInfo(true)
  }


  useEffect(() => {
    if(searchBook !== ""){
      const filtered = handleSearch(searchBook, list)
      setFilteredList(filtered)
    }else {
      setFilteredList(list)
    }
  }, [searchBook])

  useEffect(() => {
    RetrieveBooks();
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {isModal && (
        <AddBook closeModal={closeModal} RetrieveBooks={RetrieveBooks} />
      )}
      {isEdit && <EditBook closeModal={closeModal} book={selectedBook} RetrieveBooks={RetrieveBooks} />}
      {isInfo && <BookInfo closeModal={closeModal} book={selectedBook}/>}
      <div className="dashboard-content">
        <div className="add-book-wrapper">
          <button type="button" className="add-book" onClick={openModal}>
            <FaBook color="#fff" className="add-book-icon" /> Add Book
          </button>
          <div className="search-wrapper">
            <form className="search-form">
              <input
                type="text"
                name="search"
                className="search-form-input"
                placeholder="Search Book"
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <FaSearch className="search-icon" />
              </button>
            </form>
          </div>
        </div>
        <BookTable
          handleIsEdit={handleIsEdit}
          list={filteredList}
          deleteBook={deleteBook}
          handleBookInfo={handleBookInfo}
        />
      </div>
    </>
  );
};

export default Books;
