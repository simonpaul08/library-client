import React, { useEffect, useState } from "react";
import { FaBook, FaSearch, FaUserPlus } from "react-icons/fa";
import UserTable from "../tables/UserTable";
import AddUser from "../AddUser";
import Book from "../Book";
import { useAuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { handleSearch } from "../../utils/utils";
import Loader from "../loader/Loader";

const Home = () => {
  const [isModal, setIsModal] = useState(false);

  const { currentUser } = useAuthContext();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([])
  const [searchBook, setSearchBook] = useState("");
  const { privateInstance } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false);

  // close modal
  const closeModal = () => setIsModal(false);

  // open modal
  const openModal = () => setIsModal(true);

  // retrieve users
  const retrieveUsers = async () => {
    setIsLoading(true)
    let url = currentUser?.role === "reader" ? `/book/lib/${currentUser?.libId}` : `${currentUser?.role}/${currentUser?.role === "owner" ? "admin" : "reader"}/list`
    try {
      const res = await privateInstance.get(url);
      if (res.data) {
        setList(res.data?.list);
        setFilteredList(res?.data?.list)
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
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if(searchBook !== ""){
      const filtered = handleSearch(searchBook, list)
      setFilteredList(filtered)
    }else {
      setFilteredList(list)
    }
  }, [searchBook])

  useEffect(() => {
    if (list?.length === 0) {
      retrieveUsers();
    }

    return () => {
      setList([])
    }
  }, [])

  return (
    <>
      {isModal && <AddUser closeModal={closeModal} role={currentUser?.role} currentUser={currentUser} retrieveUsers={retrieveUsers} />}

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

      {/* Owner */}
      {currentUser?.role === "owner" && (
        <div className="dashboard-content">
          <div className="add-admin-wrapper">
            <button type="button" className="add-admin" onClick={openModal}>
              <FaUserPlus color="#fff" className="add-admin-icon" /> Add Admin
            </button>
          </div>
          <UserTable list={list} isLoading={isLoading}/>
        </div>
      )}

      {/* Admin */}
      {currentUser?.role === "admin" && (
        <div className="dashboard-content">
          <div className="add-reader-wrapper">
            <button type="button" className="add-reader" onClick={openModal}>
              <FaUserPlus color="#fff" className="add-reader-icon" /> Add Reader
            </button>
          </div>
          <UserTable list={list} isLoading={isLoading}/>
        </div>
      )}

      {/* Reader */}
      {currentUser?.role === "reader" && (
        <div className="dashboard-content">
          <div className="add-book-wrapper">
            <div></div>
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
          {isLoading && filteredList.length === 0 && <Loader />}
          <div className="books-grid">
            {filteredList?.map(book => {
              return <Book book={book} key={book?.isbn} />
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
