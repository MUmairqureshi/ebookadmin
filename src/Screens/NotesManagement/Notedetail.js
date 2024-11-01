import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
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

export const NoteDateil = () => {
  const { id } = useParams();

  const base_url = process.env.REACT_APP_API_URL;

  const [data, setData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [message, setMessage] = useState(false);

  console.log("datadetil", data);
  const inActive = () => {
    setShowModal(false);
    setShowModal2(true);
  };
  const Active = () => {
    setShowModal3(false);
    setShowModal4(true);
  };

  const notedetail = () => {
    const LogoutData = localStorage.getItem("login");
    console.log("LogoutData", LogoutData);
    // document.title = 'Tim Admin | Book Detail';
    document.title = "irvSegal Admin | Note Detail";
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

        setData(data.data);
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };
  const navigate = useNavigate();
  useEffect(() => {
    notedetail();
  }, [id]);
  const EditQuiz = (id) => {
    navigate(`/quiz-management/edit-quiz/${id}`);
  };
  const DeleteQuiz = (catId) => {
    const LogoutData = localStorage.getItem("login");
    document.querySelector(".loaderBox").classList.remove("d-none");
    fetch(`${process.env.REACT_APP_BASE_URL}api/questions/${catId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${LogoutData}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector(".loaderBox").classList.add("d-none");
        notedetail();
      })
      .catch((error) => {
        document.querySelector(".loaderBox").classList.add("d-none");
        console.log(error);
      });
  };

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Notes Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">
                <div className=" col-md-6">
                  <p className="secondaryText"> Title</p>
                  <p>{data?.title}</p>
                </div>

                <div className=" col-md-6">
                  <p className="secondaryText"> Content</p>
                  <p>{data?.content}</p>
                </div>
                <div className=" col-md-6">
                  <p className="secondaryText"> Notes Status</p>
                  <p>{data?.status == 0 ? "Hidden" : "Show"}</p>
                </div>
                <div className=" col-md-6">
                  <p className="secondaryText"> Pinned Status</p>
                  <p>{data?.is_pinned == 0 ? "Is_Pinned" : "Un_Pinned"}</p>
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
      </DashboardLayout>
    </>
  );
};
