import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section className="account">
        <div className="component_header">
          <p>Dashboard</p>
          <p>
            Welcome! <span>{user && user.name}</span>
          </p>
        </div>
        <div className="container">
          <div className={show ? "sidebar showSidebar" : "sidebar"}>
            <ul className="sidebar_links">
              <h4>Manage Account</h4>
              <li>
                <button
                  onClick={() => {
                    setComponentName("My Profile");
                    setShow(!show);
                  }}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Profile");
                    setShow(!show);
                  }}
                >
                  Update Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Password");
                    setShow(!show);
                  }}
                >
                  Update Password
                </button>
              </li>

              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Job Post");
                      setShow(!show);
                    }}
                  >
                    Post New Job
                  </button>
                </li>
              )}
              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Jobs");
                      setShow(!show);
                    }}
                  >
                    My Jobs
                  </button>
                </li>
              )}
              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Applications");
                      setShow(!show);
                    }}
                  >
                    Applications
                  </button>
                </li>
              )}
              {user && user.role === "Job Seeker" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Applications");
                      setShow(!show);
                    }}
                  >
                    My Applications
                  </button>
                </li>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          <div className="banner">
            <div
              className={
                show ? "sidebar_icon move_right" : "sidebar_icon move_left"
              }
            >
              <LuMoveRight
                onClick={() => setShow(!show)}
                className={show ? "left_arrow" : "right_arrow"}
              />
            </div>
            {(() => {
              switch (componentName) {
                case "My Profile":
                  return <MyProfile />;
                  break;
                case "Update Profile":
                  return <UpdateProfile />;
                  break;
                case "Update Password":
                  return <UpdatePassword />;
                  break;
                case "Job Post":
                  return <JobPost />;
                  break;
                case "My Jobs":
                  return <MyJobs />;
                  break;
                case "Applications":
                  return <Applications />;
                  break;
                case "My Applications":
                  return <MyApplications />;
                  break;

                default:
                  <MyProfile />;
                  break;
              }
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
