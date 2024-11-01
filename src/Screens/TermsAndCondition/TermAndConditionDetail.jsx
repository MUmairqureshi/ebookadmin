import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import {
  GetBookdetail,
  Getchaptersdetail,
  GetchaptersDelete,
  Getpagedetail,
  pageDelete,
  getpolicedetail,
} from "../../api";
import Accordion from "react-bootstrap/Accordion";
import { Link, useNavigate } from "react-router-dom";
import { SelectBox } from "../../Components/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomInput from "../../Components/CustomInput";

import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { ordersManagement } from "../../Config/Data";

export const TermsAndConditionDetails = () => {
  const Bookstatus = [
    {
      key: "0",
      name: "Free",
    },
    {
      key: "1",
      name: "Paid",
    },
  ];
  const { id } = useParams();
  const [chapterdata, setChapterData] = useState([]);

  const base_url = process.env.REACT_APP_BASE_URL;
  const [Bookdetail, setBookdetail] = useState({});
  const [Policydetail, setPolicydetail] = useState({});
  const [isChapter, setIsChapter] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [pageModal, setpageModal] = useState(false);

  const [addpageModal, setaddpageModal] = useState(false);

  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  const [pagesadd, setPagesadd] = useState();

  const [pagesdetail, setPagesdetail] = useState();
  const [formData, setFormData] = useState({});

  const [data, setData] = useState({});

  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };
  // console.log("id", id);

  const policydetail = async () => {
    try {
      const response = await getpolicedetail(id);
      console.log("response", response);

      setPolicydetail(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  useEffect(() => {
    policydetail();
  }, [id]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  useEffect(() => {
    document.title = "IRV Segal | Terms & Condition Detail";
  }, []);

  // const chapterData = async () => {
  //   document.title = "IRV Segal | Book Chapters Detail";
  //   document.querySelector(".loaderBox").classList.remove("d-none");

  //   try {
  //     const response = await Getchaptersdetail(id); // Make sure bookid is passed correctly
  //     document.querySelector(".loaderBox").classList.add("d-none");
  //     console.log("shapter", response);

  //     setChapterData(response?.data);
  //     setFormData(response?.data);
  //   } catch (error) {
  //     document.querySelector(".loaderBox").classList.add("d-none");
  //     console.log(error);
  //   }
  // };

  // const pagedelete = async (id) => {
  //   document.querySelector(".loaderBox").classList.remove("d-none");
  //   try {
  //     const response = await pageDelete(id);
  //     console.log("response", response);

  //     if (response?.status == true) {
  //       document.querySelector(".loaderBox").classList.add("d-none");
  //       chapterData();
  //     }
  //   } catch (error) {
  //     console.error("Error in logging in:", error);
  //   }
  // };

  // const viewpages = async (id) => {
  //   try {
  //     const response = await Getpagedetail(id);
  //     console.log("response", response);

  //     setPagesdetail(response?.data);
  //   } catch (error) {
  //     console.error("Error in logging in:", error);

  //     // toastAlert(error, ALERT_TYPES.ERROR);
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   document.querySelector(".loaderBox").classList.remove("d-none");

  //   // Create a new FormData object
  //   // const formDataMethod = new FormData();
  //   // for (const key in formData) {
  //   //     formDataMethod.append(key, formData[key]);
  //   // }

  //   // console.log(formData)

  //   // // Make the fetch request
  //   // fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/author/bookchapter_add/${id}`, {
  //   //     method: 'POST',
  //   //     headers: {
  //   //         'Accept': 'application/json',
  //   //         'Authorization': `Bearer ${LogoutData}`
  //   //     },
  //   //     body: formDataMethod // Use the FormData object as the request body
  //   // })
  //   //     .then((response) => {
  //   //         return response.json();
  //   //     })
  //   //     .then((data) => {
  //   //         document.querySelector('.loaderBox').classList.add("d-none");
  //   //         console.log(data);
  //   //         setShowModal(true)
  //   //         setTimeout(() => {
  //   //             setShowModal(false)
  //   //         }, 1000)
  //   //         chapterData()
  //   //         setIsChapter(false)
  //   //         setFormData({
  //   //             title: '',
  //   //             description: ''
  //   //         })
  //   //     })
  //   //     .catch((error) => {
  //   //         document.querySelector('.loaderBox').classList.add("d-none");
  //   //         console.log(error)
  //   //     })
  // };

  // useEffect(() => {
  //   chapterData();
  // }, [id]);

  const editDetailData = () => {};
  const handleEdit = (e) => {
    // console.log("chapetrid ", chapetrid)
    // e.preventDefault();
    // const LogoutData = localStorage.getItem('login');
    // fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/author/bookchapter_update/${chapetrid}`,
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${LogoutData}`
    //         },
    //         body: JSON.stringify(leadData)
    //     },
    // )
    //     .then((response) => {
    //         return response.json()
    //     })
    //     .then((data) => {
    //         console.log(data)
    //         editDetailData(chapetrid)
    //         setEditModal(false)
    //     })
    //     .catch((error) => {
    //         document.querySelector('.loaderBox').classList.add("d-none");
    //         console.log(error);
    //     })
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Terms And Conditions Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              {/* <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  <button onClick={() => {
                    data?.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {data?.status ? 'Inactive' : 'Active'}</button>
                  <span className={`statusBadge ${data?.status == 1 ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{data?.status == 1 ? 'Active' : 'Inactive'}</span>
                </div>
              </div> */}

              {/* <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="productImage">
                    <img src={base_url + Bookdetail?.cover} />
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Author Name</p>
                  <p>{Bookdetail?.author}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Title</p>
                  <p>{Bookdetail?.title}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Type</p>
                  <p>{Bookdetail?.type}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Language</p>
                  <p>{Bookdetail?.lang}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Pages</p>
                  <p>{Bookdetail?.pages}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Audiobook Duration</p>
                  <p>{Bookdetail?.audiobook_duration}</p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Book Rating</p>
                  <p>
                    {Bookdetail?.rating == null
                      ? "No Rating"
                      : Bookdetail?.rating}
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <p className="secondaryText">Description</p>
                  <p>{Bookdetail?.description}</p>
                </div>
              </div> */}

              {/* <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between">
                    <h2 className="mainTitle mb-4">Book Chapters</h2>
                    <div className="addChapter">
                      <CustomButton
                        text="Add Chapter"
                        variant="primaryButton"
                        onClick={() => {
                          setIsChapter(!isChapter);
                        }}
                      ></CustomButton>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Accordion defaultActiveKey="0">
                    {chapterdata &&
                      chapterdata?.map((item, index) => (
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>{`Chapter ${
                            index + 1
                          }`}</Accordion.Header>
                          <Accordion.Body>
                            <div className="chapeditz d-flex">
                              <h4 className="text-capitalize ">
                                {item?.title}
                              </h4>

                              <p>
                                <span>
                                  <Link
                                    onClick={() => {
                                      setEditModal(true);
                                      editDetailData(item?.id);
                                    }}
                                    className="chaptableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="chaptableActionIcon"
                                    />
                                    Edit
                                  </Link>
                                </span>
                                <Link
                                  onClick={() => {
                                    setEditModal(true);
                                    editDetailData(item?.id);
                                  }}
                                  className="chaptableAction"
                                >
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="chaptableActionIcon"
                                  />{" "}
                                  Add Page
                                </Link>
                              </p>
                            </div>
                            <h3 className="text-capitalize">{item?.price}</h3>

                            {item.pages?.map((page, index) => (
                              //  <p> {`Page ${index + 1}`}</p>
                              <div className="   d-flex justify-content-between ">
                                {" "}
                                {`Page ${index + 1}`}
                                <p className=" gap-3    d-flex">
                                  <Link
                                    onClick={() => {
                                      setEditModal(true);
                                      editDetailData(item?.id);
                                    }}
                                    className="chaptableAction"
                                  >
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="chaptableActionIcon"
                                    />{" "}
                                    Edit
                                  </Link>
                                  <Link
                                    onClick={() => {
                                      setpageModal(true);
                                      viewpages(page?.id);
                                    }}
                                    className="chaptableAction"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="tableActionIcon"
                                    />
                                    View
                                  </Link>
                                  <button
                                    type="button"
                                    className="bg-transparent border-0 ps-lg-3 pt-1"
                                    onClick={() => {
                                      pagedelete(page?.id);
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                    ></FontAwesomeIcon>{" "}
                                    Delete
                                  </button>
                                </p>
                              </div>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                  </Accordion>
                </div>
                {isChapter && (
                  <div className="col-md-12 my-5 bg-light">
                    <div className="chapterAdditionForom">
                      <div className="titleBox mb-4">
                        <h3 className="mainTitle">Add New Chapter</h3>
                      </div>
                      <div className="ChapterForm">
                        <CustomInput
                          label="Chapter Title"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Chapter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="ChapterForm">
                        <CustomInput
                          label="Chapter price"
                          required
                          id="title"
                          type="text"
                          placeholder="Enter Chapter price"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="price"
                          value={formData?.price}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="ChapterForm">
                        <CustomInput
                          label="Chapter Audio"
                          required
                          id="audio_file"
                          type="file"
                          placeholder="Upload Chapter Audio"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="audio_file"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="type"
                          label="Chapter status"
                          placeholder="Chapter status"
                          required
                          value={formData.status}
                          option={Bookstatus}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="addNewChapter">
                        <CustomButton
                          text="Add"
                          variant="primaryButton"
                          onClick={handleSubmit}
                        ></CustomButton>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}

              <div className="row">
                <div className="col-md-12 mb-4">
                  <p className="secondaryText">Title</p>
                  <p>{Policydetail.title}</p>
                </div>

                <div className="col-md-12 mb-4">
                  <p className="secondaryText">Description</p>
                  <p>{Policydetail.description}</p>
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
          action={Active}
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

        <CustomModal
          show={editModal}
          close={() => {
            setEditModal(false);
          }}
          heading="Edit Book Chapters"
        >
          <CustomInput
            label="Chapter Title"
            required
            id="title"
            type="text"
            placeholder="Enter Chapter Title"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <CustomInput
            label="Chapter price"
            required
            id="title"
            type="text"
            placeholder="Enter Chapter price"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="price"
            value={formData?.price}
            onChange={handleChange}
          />

          <CustomInput
            label="Chapter Audio"
            required
            id="audio_file"
            type="file"
            placeholder="Upload Chapter Audio"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="audio_file"
            onChange={handleChange}
          />

          <SelectBox
            selectClass="mainInput"
            name="type"
            label="Chapter status"
            placeholder="Chapter status"
            required
            value={formData.status}
            option={Bookstatus}
            onChange={handleChange}
          />

          <CustomButton
            variant="primaryButton"
            text="Edit"
            type="button"
            onClick={handleEdit}
          />
        </CustomModal>

        <CustomModal
          show={pageModal}
          close={() => {
            setpageModal(false);
          }}
          heading="Page Content"
        >
          <div className="col-md-6 mb-4">
            <p className="secondaryText"> Content </p>
            <p>{pagesdetail?.content}</p>
          </div>

          {/* <CustomButton variant='primaryButton' text='Page Content ' type='button' onClick={handleEdit} /> */}
        </CustomModal>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          success
          heading="Chapter Added Successfully."
        />
      </DashboardLayout>
    </>
  );
};
