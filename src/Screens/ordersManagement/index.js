import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faCheck,
  faTimes,
  faFilter,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { Getbookslist, GetbooksDelete, GetOrderlist } from "../../api";

import { ordersManagement } from "../../Config/Data";

import "./style.css";

export const OrdersManagement = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState("");

  const [books, setBooklists] = useState([]);
  const [orders, setOrderslists] = useState([]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
  const hanldeRoute = () => {
    navigate("/orders-management/add-order");
  };

  const booklist = async () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await Getbookslist();
      console.log("response", response);

      document.querySelector(".loaderBox").classList.add("d-none");
      setBooklists(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  const orderlist = async () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await GetOrderlist();
      console.log("response", response);

      document.querySelector(".loaderBox").classList.add("d-none");
      setOrderslists(response?.data);
      setData(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  const bookdelete = async (id) => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const response = await GetbooksDelete(id);
      console.log("response", response);

      if (response?.status == true) {
        document.querySelector(".loaderBox").classList.add("d-none");
        booklist();
      }
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  const handleclick = () => {
    navigate("/profile-page");
  };
  useEffect(() => {
    booklist();
  }, []);

  useEffect(() => {
    orderlist();
  }, []);

  console.log("books", books);
  console.log("orders", orders);

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterData = books?.filter((item) =>
    item?.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData?.slice(indexOfFirstItem, indexOfLastItem);

  // const ordersManagement = [
  //   {
  //     id: 1,
  //     title: "Title",
  //     date: "12-12-2023",
  //     content: "Lorem ipsum doller 10",
  //     isPinned: "true",
  //   },
  // ];

  // const fetchOrderData = async () => {
  //   try {
  //     const response = await fetch(`${url}orders`);
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // console.log("Fetch Order data", fetchOrderData);

  useEffect(() => {
    document.title = "IRV Segal | Order Management";
  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "first_name",
      title: "first name",
    },
    {
      key: "last_name",
      title: "last name",
    },
    {
      key: "address1",
      title: "address",
    },
    {
      key: "phone",
      title: "phone",
    },
    {
      key: "email",
      title: "email",
    },
    {
      key: "country",
      title: "country",
    },
    {
      key: "action  ",
      title: "action  ",
    },
  ];

  console.log("currentItems", currentItems);

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Orders Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {/* <CustomButton
                        text="Add New Order"
                        variant="primaryButton"
                        onClick={hanldeRoute}
                      /> */}
                      <CustomInput
                        type="text"
                        placeholder="Search Here..."
                        value={inputValue}
                        inputClass="mainInput"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <CustomTable headers={maleHeaders}>
                      <tbody>
                        {/* {currentItems?.map((item, index) => ( */}
                        {orders?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>{item?.title} </td> */}
                            {/* <td className="text-capitalize">{item?.title}</td> */}
                            {/* <td>{item?.pages ? `$ ${item?.pages}` : `$0`}</td> */}
                            <td>{item?.first_name}</td>
                            <td>{item?.last_name}</td>
                            <td>{item?.address1}</td>
                            <td>{item?.phone}</td>
                            <td>{item?.email}</td>
                            <td>{item?.country}</td>
                            {/* <td>{item?.country}</td>
                            <td>{item?.created_at}</td>
                            <td>{item?.content}</td>
                            <td>{item?.isPinned}</td> */}

                            {/* <td>{item?.audiobook_duration}</td> */}
                            {/* <td className={item.status == 1 ? 'greenColor' : "redColor"}>{item.status == 1 ? 'Active' : "Inactive"}</td> */}
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle
                                  variant="transparent"
                                  className="notButton classicToggle"
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                  align="end"
                                  className="tableDropdownMenu"
                                >
                                  <Link
                                    // to={`/orders-management/order-details/${item?.id}`}
                                    to={`/orders-management/order-details/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  {/* <Link
                                    to={`/orders-management/edit-order/${item?.id}`}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="tableActionIcon"
                                    />
                                    Edit
                                  </Link>

                                  <button
                                    type="button"
                                    className="bg-transparent border-0 ps-lg-3 pt-1"
                                    onClick={() => {
                                      bookdelete(item?.id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>{" "}
                                    Delete
                                  </button> */}
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CustomModal
            show={showModal}
            close={() => {
              setShowModal(false);
            }}
            action={inActive}
            heading="Are you sure you want to mark this user as inactive?"
          />
          <CustomModal
            show={showModal2}
            close={() => {
              setShowModal2(false);
            }}
            success
            heading="Marked as Inactive"
          />

          <CustomModal
            show={showModal3}
            close={() => {
              setShowModal3(false);
            }}
            action={ActiveMale}
            heading="Are you sure you want to mark this user as Active?"
          />
          <CustomModal
            show={showModal4}
            close={() => {
              setShowModal4(false);
            }}
            success
            heading="Marked as Active"
          />
        </div>
      </DashboardLayout>
    </>
  );
};
