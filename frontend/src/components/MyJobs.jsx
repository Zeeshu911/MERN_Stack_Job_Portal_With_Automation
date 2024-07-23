import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not posted any job!
        </h1>
      ) : (
        <>
          <div className="account_components">
            <h3>My Jobs</h3>
            <div className="applications_container">
              {myJobs.map((element) => (
                <div className="card" key={element._id}>
                  <p className="sub-sec">
                    <span>Job Title: </span>
                    {element.title}
                  </p>
                  <p className="sub-sec">
                    <span>Job Niche:</span> {element.jobNiche}
                  </p>
                  <p className="sub-sec">
                    <span>Salary: </span> {element.salary}
                  </p>
                  <p className="sub-sec">
                    <span>Location:</span> {element.location}
                  </p>
                  <p className="sub-sec">
                    <span>Job Type:</span> {element.jobType}
                  </p>
                  <p className="sub-sec">
                    <span>Company Name:</span> {element.companyName}
                  </p>
                  <p className="sub-sec">
                    <span>Introduction:</span> {element.introduction}
                  </p>
                  <p className="sub-sec">
                    <span>Qualifications:</span> {element.qualifications}
                  </p>
                  <p className="sub-sec">
                    <span>Responsibilities:</span> {element.responsibilities}
                  </p>
                  {element.offers && (
                    <p className="sub-sec">
                      <span>What Are We Offering:</span> {element.offers}
                    </p>
                  )}
                  <button
                    className="btn"
                    onClick={() => handleDeleteJob(element._id)}
                  >
                    Delete Job
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;
