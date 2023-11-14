import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import logo from "./5234205.png";
import axios from "axios";
import Loader from "./Loader/Loader";

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    axios
      .get(`/user/profile`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setProfileData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div
        className="flex justify-content-center align-items-center w-100"
        style={{
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!localStorage.getItem("token") ? (
          <h3 className="flex justify-content-center mt-5">
            Please login to view profile
          </h3>
        ) : (
          profileData && (
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={logo}
                  alt="green iguana"
                />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "600",
                  }}
                >
                  Profile
                </p>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Name - {profileData?.data.user_name}
                  </li>
                  <li
                    class="list-group-item"
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Email - {profileData?.data.email}
                  </li>
                  <li
                    class="list-group-item"
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    User Type - {profileData?.data.user_type}
                  </li>
                  <li
                    class="list-group-item"
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Broker - {profileData?.data.broker}
                  </li>
                </ul>
              </CardActionArea>
            </Card>
          )
        )}
      </div>
    </>
  );
};

export default Profile;
