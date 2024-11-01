import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { Addbook, fetchSeriesOptions } from "../../api";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { useNavigate } from "react-router";

export const AddBook = () => {
  const [unit, setUnit] = useState({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cover: "", // Initialize image as an empty string
    series_id: "", // Initialize series as empty string
    part: "", // Initialize part number as empty string
    is_series: "0", // Initialize is_series as "0"
  });
  const [isSeries, setIsSeries] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState([]);

  const Booktype = [
    {
      key: "0",
      name: "eBook",
    },
    {
      key: "1",
      name: "AudioBook",
    },
  ];

  useEffect(() => {
    const getSeries = async () => {
      const resp = await fetchSeriesOptions();
      setSeriesOptions(resp.data);
    };
    getSeries();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "series_id") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: seriesOptions.find((item) => item.title === value).id,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSeriesChange = (event) => {
    const { value } = event.target;
    setIsSeries(value === "1");
    setFormData((prevData) => ({
      ...prevData,
      is_series: value,
      series_id: "", // Reset series_id when is_series changes
      part: "", // Reset part when is_series changes
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    document.querySelector(".loaderBox").classList.remove("d-none");
    const formDataMethod = new FormData();
    for (const key in formData) {
      if (key === "is_series" && formData[key] === "0") {
        continue; // Skip adding series_id and part when is_series is "0"
      }
      formDataMethod.append(key, formData[key]);
    }

    try {
      const response = await Addbook(formDataMethod);

      if (response?.status === true) {
        navigate("/book-management");
      } else {
        console.error("Failed to add book:", response);
      }
    } catch (error) {
      console.error("Error in adding book:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  const validatePartNumber = (value) => {
    const selectedSeries = seriesOptions.find(
      (series) => series.id.toString() === formData.series_id
    );
    if (!selectedSeries) return false;
    const countOfBooks = selectedSeries.countOfBooks;
    return parseInt(value, 10) >= countOfBooks;
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Add New Book
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
                          label="Author Name"
                          required
                          id="name"
                          type="text"
                          placeholder="Enter author Name"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="author"
                          value={formData.author}
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
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <SelectBox
                          selectClass="mainInput"
                          name="type"
                          label="Select Book Type"
                          placeholder="Select Book Type"
                          required
                          value={formData.type}
                          option={Booktype}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Book Language"
                          required
                          id="info"
                          type="text"
                          placeholder="Enter Book Language"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="lang"
                          value={formData.lang}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Book Cover"
                          required
                          id="resume"
                          type="file"
                          placeholder="Book Cover"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="cover"
                          onChange={filehandleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Audiobook Duration"
                          required
                          id="schedule_interview"
                          type="text"
                          placeholder="Enter Audiobook Duration"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="audiobook_duration"
                          value={formData.audiobook_duration}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Enter Pages"
                          required
                          id="schedule_interview"
                          type="text"
                          placeholder="Enter Pages"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="pages"
                          value={formData.pages}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <CustomInput
                          label="Amazon Link"
                          required
                          id="amazon_link"
                          type="url"
                          placeholder="Enter Amazon Link"
                          labelClass="mainLabel"
                          inputClass="mainInput"
                          name="amazon_link"
                          value={formData.amazon_link}
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
                      {isSeries && (
                        <div className="col-md-6 mb-4">
                          <SelectBox
                            selectClass="mainInput"
                            name="series_id"
                            label="Select Series"
                            placeholder="Select Series"
                            required
                            value={formData.series_id}
                            option={seriesOptions?.map((series) => ({
                              key: series.id,
                              name: series.title,
                            }))}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                      {isSeries && (
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
                            customValidation={(value) =>
                              validatePartNumber(value)
                                ? ""
                                : "Part number should be greater than countOfBooks"
                            }
                          />
                        </div>
                      )}
                      <div className="col-md-6 mb-4">
                        <div className="inputWrapper">
                          <div className="form-controls">
                            <label htmlFor="description">Description</label>
                            <textarea
                              name="description"
                              className="form-control shadow border-0"
                              id="description"
                              cols="30"
                              rows="10"
                              value={formData.description}
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

export default AddBook;
