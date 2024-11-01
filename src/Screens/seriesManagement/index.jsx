import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomButton from "../../Components/CustomButton";
import CategoryCard from "../../Components/CategoryCard/index";
import CustomModal from "../../Components/CustomModal";
import { addseries } from "../../api";
import CustomInput from "../../Components/CustomInput";

export const SeriesManagement = () => {
  const [feedback, setfeedback] = useState({
    modalHeading: "Add New Series",
    feedbackModalHeading: "series added successfully",
    btnText: "add",
  });
  const [edit, setEdit] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ title: "", parts_count: "" });

  const LogoutData = localStorage.getItem("login");
  const { id } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleDropdownToggle = (userId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const base_url = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const hanldeRoute = (id) => {
    if (id) {
      navigate(`/series-management/series-details/${id}`);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const CategoryData = () => {
    const url = `https://custom3.mystagingserver.site/Irving-Segal/public/api/series`;
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        setData(data.data);
      })
      .catch((error) => {
        setData([]);
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  useEffect(() => {
    CategoryData();
  }, [location.pathname]);

  const handleDelete = (categoryId) => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");

    const url = `https://custom3.mystagingserver.site/Irving-Segal/public/api/series/${categoryId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",

        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          document.querySelector(".loaderBox").classList.add("d-none");

          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            CategoryData();
          }, 1000);
        } else {
          console.error("Failed to delete category");
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleSeriesAddEdit = async (e) => {
    setEdit(false);
    e.preventDefault();
    try {
      document.querySelector(".loaderBox").classList.remove("d-none");
      await addseries(currentFaq);

      setCurrentFaq({ title: "", parts_count: "" });
      document.querySelector(".loaderBox").classList.add("d-none");
      CategoryData();
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding/updating FAQ:", error);
    }
  };

  const handleEdit = (item) => {
    setfeedback({
      modalHeading: "Update Series",
      feedbackModalHeading: "series Updated successfully",
      btnText: "Update",
    });
    setCurrentFaq(item);
    setEdit(true);
  };
  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h1 className="mainTitle text-uppercase">
                      Series Management
                    </h1>
                  </div>
                  <div className="col-md-12 mb-2">
                    <div className="addUser">
                      <CustomButton
                        text="Add New Series"
                        variant="primaryButton"
                        onClick={() => {
                          setfeedback({
                            modalHeading: "Add New Series",
                            feedbackModalHeading: "series added successfully",
                            btnText: "add",
                          });
                          setCurrentFaq({});
                          setEdit(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashCard">
            <CategoryCard
              data={data}
              hanldeRoute={hanldeRoute}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
        <CustomModal
          show={showModal}
          close={() => setShowModal(false)}
          success
          heading="Category Deleted Successfully"
        />
      </DashboardLayout>
      <CustomModal
        show={edit}
        close={() => setEdit(false)}
        heading={feedback.modalHeading}
      >
        <div className="col-md-12 mb-4 text-capitalize">
          <CustomInput
            label="Title"
            required
            id="question"
            type="text"
            placeholder="Enter title"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="title"
            value={currentFaq.title}
            onChange={(e) =>
              setCurrentFaq({ ...currentFaq, title: e.target.value })
            }
          />
        </div>
        <div className="col-md-12 mb-4 text-capitalize">
          <CustomInput
            label="Parts Count"
            required
            id="question"
            type="number"
            placeholder="Enter parts count"
            labelClass="mainLabel"
            inputClass="mainInput"
            name="parts_count"
            value={currentFaq.parts_count}
            onChange={(e) =>
              setCurrentFaq({ ...currentFaq, parts_count: e.target.value })
            }
          />
        </div>
        <CustomButton
          variant="primaryButton"
          text={feedback.btnText}
          className="me-2"
          type="submit"
          onClick={handleSeriesAddEdit}
        />
      </CustomModal>
      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        success
        heading={feedback.feedbackModalHeading}
      />
    </>
  );
};

export default SeriesManagement;
