import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import { Editpolicy, GetBookdetail, getpolicedetail } from "../../api";
import CustomButton from "../../Components/CustomButton";
export const EditPolicies = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState({});
  const [unit, setUnit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const Booktype = [
    {
      key: "0",
      name: "true",
    },
    {
      key: "0",
      name: "false",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const filehandleChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file;
      setFormData((prevData) => ({
        ...prevData,
        cover: fileName,
      }));
    }
  };

  const policedetail = async () => {
    try {
      const response = await getpolicedetail(id);
      setFormData(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);

      // toastAlert(error, ALERT_TYPES.ERROR);
    }
  };

  useEffect(() => {
    policedetail();
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // document.querySelector('.loaderBox').classList.remove("d-none");
    const formDataMethod = new FormData();
    for (const key in formData) {
      formDataMethod.append(key, formData[key]);
    }
    formDataMethod.append("contentkey", "privacy");
    formDataMethod.append("id", id);

    document.querySelector(".loaderBox").classList.remove("d-none");
    // Make the fetch request

    try {
      const response = await Editpolicy(formDataMethod);

      if (response?.status == true) {
        navigate("/policies-management");
      } else {
      }
    } catch (error) {
      console.error("Error in adding model post:", error);
    }
  };

  useEffect(() => {
    document.title = "IRV Segal | Edit Policy";
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Policies
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Title"
                          required
                          id="name"
                          type="text"
                          placeholder="Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData?.title}
                          onChange={handleChange}
                        />
                      </div>

                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Content Key"
                          required
                          id="name"
                          type="text"
                          placeholder="Content Key"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="contentkey"
                          value={formData?.contentkey}
                          onChange={handleChange}
                        />
                      </div> */}

                      <div className="col-md-6 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="">Description</label>
                            <textarea
                              name="description"
                              className="form-control shadow border-0"
                              id="description"
                              cols="30"
                              rows="10"
                              value={formData?.description}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="type"
                          label="Edit isPinned"
                          placeholder="Edit isPinned"
                          required
                          value={formData?.isPinned}
                          option={Booktype}
                          onChange={handleChange}
                        />
                      </div> */}

                      <div className="col-md-12">
                        <CustomButton
                          variant="primaryButton"
                          text="Submit"
                          type="submit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <CustomModal
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          success
          heading="Book added Successfully."
        />
      </DashboardLayout>
    </>
  );
};
