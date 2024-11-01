import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import { Getbookslist, Addquestions } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../Components/CustomButton";
export const NoteEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [inputValue, setInputValue] = useState("");
  const [questionType, setQuestionType] = useState("1");

  const [formData, setFormData] = useState({});

  console.log("formData", formData);
  console.log("formData", formData);
  console.log("formData", formData);
  const base_url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const is_pinned_options = [
    {
      value: "Is_Pinned",
      label: "Pinned",
    },
    {
      value: "Un_Pinned",
      label: "Unpinned",
    },
  ];

  // const handleChange = (event) => {
  //     const { name, value } = event.target;

  //     setFormData((prevData) => {

  //         return {
  //             ...prevData,
  //             [name]: value,
  //         };
  //     });
  // };

  // const handleChange = (event) => {
  //     const { name, value } = event.target;

  //     // If the name is "is_pinned", set the value accordingly
  //     const newValue = name === "is_pinned" ? (value === "Is_Pinned" ? 0 : 1) : value;

  //     setFormData((prevData) => ({
  //         ...prevData,
  //         [name]: newValue,
  //     }));
  // };

  // const handleChange = (event) => {
  //     const { name, value } = event.target;

  //     // If the name is "is_pinned", set the value accordingly
  //     const newValue = name === "is_pinned" ? (value === "Is_Pinned" ? 0 : 1) : value;

  //     const pinnedValue = value === "" ? 0 : newValue;

  //     setFormData((prevData) => ({
  //         ...prevData,
  //         [name]: pinnedValue,
  //     }));
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Define the default value based on the field name
    let defaultValue = 0;
    if (name === "status") {
      defaultValue = value === "Hidden" ? 0 : 1;
    } else if (name === "is_pinned") {
      defaultValue = value === "Is_Pinned" ? 0 : 1;
    }

    // Set the value accordingly
    const newValue =
      name === "is_pinned" ? (value === "Is_Pinned" ? 0 : 1) : value;

    // If the value is an empty string, set the default value
    const updatedValue = value === "" ? defaultValue : newValue;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const notedetail = () => {
    const LogoutData = localStorage.getItem("login");
    console.log("LogoutData", LogoutData);
    // document.title = 'Tim Admin | Book Detail';
    document.title = "irvSegal Admin | Edit Note";
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/notes/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(data);

        setFormData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    notedetail();
  }, [id]);

  const hanldeRoute = () => {
    navigate("/add-product");
  };
  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const ActiveMale = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;

  useEffect(() => {
    document.title = "Certifires | User Management";
    // UserData()
  }, []);

  const statustype = [
    {
      status: 0,
      name: "Hidden",
    },
    {
      status: 1,
      name: "Show",
    },
  ];

  const is_pinned = [
    {
      is_pinned: 0,
      name: "Is_Pinned",
    },
    {
      is_pinned: 1,
      name: "Un_Pinned",
    },
  ];

  const maleHeaders = [
    {
      key: 1,
      title: "ID",
    },

    {
      key: 2,
      title: "Category Name",
    },

    {
      key: 3,
      title: "Status",
    },
    {
      key: 4,
      title: "Total Question",
    },
    {
      key: 5,
      title: "Opration",
    },
  ];

  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  const [books, setBooklists] = useState([]);

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

  console.log("books", books);
  useEffect(() => {
    booklist();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_BASE_URL;
    console.log("API URL:", apiUrl);

    const logoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");

    const formDataMethod = new FormData();

    for (const key in formData) {
      if (key === "is_pinned") {
        const pined = formData[key] === "Is_Pinned" ? 1 : 0;
        formDataMethod.append(key, pined);
      } else if (key === "status") {
        const status = formData[key] === "Hidden" ? 0 : 1;
        formDataMethod.append(key, status);
      } else {
        formDataMethod.append(key, formData[key]);
      }
    }

    fetch(`${apiUrl}api/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${logoutData}`,
      },
      body: formDataMethod,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("datas", data.data);
        document.querySelector(".loaderBox").classList.add("d-none");

        // setData(data.data); // Assuming setData is a state updater function

                if (data?.status == true) {
                    navigate('/notes-management');

                } else {

                }
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.error("Error:", error);
            });
    };

    console.log("formData", formData)
    return (

        <>
            <DashboardLayout>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="dashCard">
                                    <div className="row mb-3 justify-content-between">
                                        <div className="col-md-6 mb-2">
                                            <h2 className="mainTitle">   <BackButton /> Update Note</h2>
                                        </div>
                                        {/* <div className="col-md-6 mb-2">
                                <div className="addUser">
                                    <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                                </div>
                            </div> */}
                  </div>
                  <div class="row align-items-center"></div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-4">
                      <CustomInput
                        label="  Add Note "
                        required
                        id="name"
                        type="text"
                        placeholder="Add Note"
                        labelClass="mainLabel"
                        inputClass="mainInput"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputWrapper col-md-6">
                      <div className="form-controls">
                        <label htmlFor="">Content</label>
                        <textarea
                          name="content"
                          className="form-control shadow border-0"
                          id="description"
                          cols="30"
                          rows="10"
                          value={formData?.content}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      {/* <SelectBox
                                                selectClass="mainInput"
                                                name="is_pinned"
                                                label="Select Pinned"
                                                placeholder="Select Book Type"
                                                required
                                                value={formData.is_pinned == 0 ? "Is_Pinned" : "Un_Pinned"}
                                                option={is_pinned}
                                                onChange={handleChange}
                                            /> */}

                      <SelectBox
                        selectClass="mainInput"
                        name="is_pinned"
                        label="Select Pinned"
                        placeholder="Select Book Type"
                        required
                        value={
                          formData.is_pinned === 0
                            ? "Is_Pinned"
                            : formData.is_pinned === 1
                            ? "Un_Pinned"
                            : ""
                        }
                        option={is_pinned}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <SelectBox
                        selectClass="mainInput"
                        name="status"
                        label="Select Status"
                        placeholder="Select Book Type"
                        required
                        value={
                          formData.status === 0
                            ? "Hidden"
                            : formData.status === 1
                            ? "Show"
                            : ""
                        }
                        option={statustype}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <CustomButton
                    variant="primaryButton"
                    text="Update Note"
                    type="submit"
                  />
                </div>
              </form>
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
