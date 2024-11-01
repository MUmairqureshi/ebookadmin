import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Editbook, GetBookdetail, fetchSeriesOptions } from "../../api";
import CustomButton from "../../Components/CustomButton";

export const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [categories, setCategories] = useState({});
  const [unit, setUnit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cover: "", // Initialize image as an empty string
  });
  const [isSeries, setIsSeries] = useState(formData.isSeries);
  const Booktype = [
    {
      key: "0",
      name: "eBook",
    },
    {
      key: "0",
      name: "AudioBook",
    },
  ];
  const baseurl = process.env.REACT_APP_BASE_URL;

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

  const bookdetail = async () => {
    try {
      const response = await GetBookdetail(id);

      setFormData(response?.data);
    } catch (error) {
      console.error("Error in logging in:", error);
    }
  };

  useEffect(() => {
    bookdetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataMethod = new FormData();
    for (const key in formData) {
      if (
        formData.is_series === "0" &&
        (key === "series_id" || key === "part" || key === "seriesname")
      ) {
        continue;
      }
      if (key === "seriesname") {
        continue;
      }
      formDataMethod.append(key, formData[key]);
    }

    formDataMethod.append("id", id);

    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await Editbook(formDataMethod);

      if (response?.status === true) {
        navigate("/book-management");
      } else {
        console.error("Failed to update book:", response);
      }
    } catch (error) {
      console.error("Error in updating book:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  useEffect(() => {
    document.title = "IRV Segal | Edit Book";
  }, []);
  useEffect(() => {
    const getSeries = async () => {
      const resp = await fetchSeriesOptions();
      setSeriesOptions(resp.data);
    };
    getSeries();
  }, []);
  const handleSeriesChange = (event) => {
    const { value } = event.target;
    setIsSeries(value === "1");
    setFormData((prevData) => ({
      ...prevData,
      is_series: value,
      series_id: "",
      part: "",
    }));
  };
  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Book
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
                          label="Author Name                          "
                          required
                          id="name"
                          type="text"
                          placeholder="Enter author Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="author"
                          value={formData?.author}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Title"
                          required
                          id="jobID"
                          type="text"
                          placeholder="Enter Title"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="title"
                          value={formData?.title}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="type"
                          label="Select Book Type"
                          placeholder="Select Book Type"
                          required
                          value={formData?.type}
                          option={Booktype}
                          onChange={handleChange}
                        />
                      </div> */}
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Book Language

                          "
                          required
                          id="info"
                          type="text"
                          placeholder="Enter Book Language

                          "
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="lang"
                          value={formData?.lang}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Book Cover    "
                          id="resume"
                          type="file"
                          required
                          placeholder="Book Cover"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="cover"
                          // value={formData?.cover}
                          onChange={filehandleChange}
                        />

                        <div className="galleryItem col-md-4 mb-3 position-relative">
                          <img
                            src={
                              formData?.cover instanceof File
                                ? URL.createObjectURL(formData?.cover)
                                : baseurl + formData?.cover
                            }
                            className="w-100"
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Audiobook Duration  "
                          required
                          id="schedule_interview"
                          type="text"
                          placeholder="   Enter Audiobook Duration"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="audiobook_duration"
                          value={formData?.audiobook_duration}
                          onChange={handleChange}
                        />
                      </div> */}
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Pages  "
                          required
                          id="schedule_interview"
                          type="text"
                          placeholder="   Enter Pages"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="pages"
                          value={formData?.pages}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Book Rating  "
                          required
                          id="schedule_interview"
                          type="text"
                          placeholder="Enter Book Rating"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="rating"
                          value={formData?.rating || ""}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label className="mainLabel" htmlFor="isSeries">
                          Is this book part of a series?
                        </label>
                        <select
                          className="mainInput"
                          name="is_series"
                          id="isSeries"
                          onChange={handleSeriesChange}
                          required
                          value={formData.is_series}
                        >
                          <option value="">Select Option</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </select>
                      </div>
                      {formData?.is_series == "1" && (
                        <>
                          <div className="col-md-6 mb-4">
                            <label className="mainLabel" htmlFor="series_id">
                              select series
                            </label>
                            <select
                              className="mainInput"
                              name="series_id"
                              id="is-Series"
                              onChange={handleChange}
                              required
                              value={formData.series_id || ""}
                            >
                              <option value="">Select Option</option>
                              {seriesOptions?.map((item, id) => (
                                <option key={id} value={item.id}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6 mb-4">
                            <CustomInput
                              label="Enter Part Number"
                              required
                              id="partNumber"
                              type="number"
                              placeholder="Enter Part Number"
                              labelClass="mainLabel"
                              inputClass="mainInput"
                              name="part"
                              value={formData.part}
                              min={
                                seriesOptions.find(
                                  (series) =>
                                    series.id.toString() === formData.series_id
                                )?.countOfBooks + 1 || 1
                              }
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      )}
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Audiobook Duration  "
                          required
                          id="schedule_interview"
                          type="text"
                          placeholder="   Enter Audiobook Duration"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="audiobook_duration"
                          value={formData.audiobook_duration}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter link"
                          required
                          id="schedule_interview"
                          type="url"
                          placeholder="Enter link"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="amazon_link"
                          value={formData.amazon_link}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        {/* <CustomInput
                                                    label="Description"
                                                    required
                                                    id="dateTime"
                                                    type="text"
                                                    placeholder="Description"
                                                    labelClass="mainLabel"
                                                    inputClass="mainInput"
                                                    name="description"
                                                    value={formData?.description}
                                                    onChange={handleChange}
                                                /> */}
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
