import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import bg from "../asset/MeetmitrBgNoHead.png";
import moment from "moment";
import axios from "axios";
import globalApi from "../globalApi";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  background-color: #ffc229;
  color: white;
  border-radius: 15px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  height: 72px;
  width: 360px;
  margin-right: 75px;
  margin-left: 0px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  align-self: flex-end;
`;
const SelectPicButton = styled.button`
  background-color: #ffc229;
  color: white;
  border-radius: 15px;
  outline: 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  height: 72px;
  width: 360px;
  margin-right: 75px;
  margin-left: 0px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  align-self: flex-end;
`;
const CancleButton = styled.button`
  background-color: #535353;
  color: white;
  border-radius: 15px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  height: 72px;
  width: 360px;
  margin-right: 75px;
  margin-left: 0px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  align-self: flex-end;
`;
const Select = styled.select`
  width: 110px;
  height: 60px;
  background: white;
  color: #000000;
  padding-left: 5px;
  margin-top: 10px;
  margin-right: 15px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Titillium Web";
  border: 2px solid #c4c4c4;
  border-radius: 10px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const TextInput = styled.input`
  height: 60px;
  width: 90%;
  border: 2px solid #c4c4c4;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 30px;
  font-weight: bold;
  font-family: "Titillium Web";
  padding-left: 10px;
`;
const InputHeader = styled.p`
  color: #303b5b;
  margin-top: 0px;
  line-height: 10px;
  font-size: 36px;
  font-weight: medium;
  font-family: "Roboto", sans-serif;
`;

function EditProfile() {
  const cookies = new Cookies();
  let user_cookie = cookies.get("cookie");

  const navigate = useNavigate();

  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [firstNamePlaceHolder, setFirstNamePlaceHolder] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNamePlaceHolder, setLastNamePlaceHolder] = useState("");
  const [gender, setGender] = useState("M");
  const [bio, setBio] = useState("");
  const [birthDate, setBirthDate] = useState(moment().format("yyyy-MM-DD"));
  const [profileImg, setProfileImg] = useState("../asset/ayaya.jpeg");
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [changePic, setChangepic] = useState(false);
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const selectFile = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setChangepic(true);
    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setProfileImg(objectUrl);
    setProfileImgFile(event.target.files[0]);
  };
  const uploadPicture = () => {
    const formData = new FormData();
    formData.append("file", profileImgFile);
    axios
      .post(globalApi.upload, formData, {
        headers: {
          Authorization: "Bearer " + user_cookie["accessToken"],
        },
      })
      .then((res) => {
        setProfileImg(res.data.url);
        setChangepic(true);
        alert("Upload Successfully!!");
      })
      .catch((error) => {
        console.log("error");
        console.log(error.response);
        alert("Upload not successful!!");
      });
  };
  const sumbitProfile = () => {
    axios({
      method: "PUT",
      url: globalApi.editProfile,
      headers: {
        Authorization: "Bearer " + user_cookie["accessToken"],
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthDate,
        gender: gender,
        bio: bio,
        profilePicUrl: profileImg,
      },
    })
      .then((respond) => {
        navigate("/profile", {
          state: { userId: user_cookie["userID"] },
        });
      })
      .catch((error) => {});
  };
  const cancleEdit = () => {
    navigate("/profile", {
      state: { userId: user_cookie["userID"] },
    });
  };

  useEffect(() => {
    axios
      .get(globalApi.userData + user_cookie["userID"])
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setGender(res.data.gender);
        setProfileImg(res.data.displayPic);
        setBio(res.data.bio);
        setBirthDate(res.data.birthDate);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error");
        console.log(error.response);
      });
  }, []);
  return (
    <div
      className="editProfilePage"
      style={{
        display: "flex",
        height: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundColor: `#FFE5B9`,
      }}
    >
      <div
        className="editProfile-container"
        style={{
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          marginTop: "150px",
          marginBotton: "150px",
          marginLeft: "250px",
          marginRight: "250px",
          flex: "1",
        }}
      >
        <div
          className="editProfile-header"
          style={{
            display: "flex",
            marginLeft: "50px",
            marginTop: "50px",
            alignItems: "center",
          }}
        >
          <div className="editProfileTextHeader">
            <p
              style={{
                fontSize: "55px",
                margin: "0px",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                lineHeight: "55px",
              }}
            >
              Edit Profile
            </p>
          </div>
        </div>
        <div
          className="editProfile-body"
          style={{
            display: "flex",
            marginLeft: "50px",
            flexDirection: "row",
          }}
        >
          <div
            className="left-register-form"
            style={{
              flex: "1",
              flexDirection: "column",
            }}
          >
            <div
              className="field"
              style={{
                flex: "1",
                marginTop: "50px",
                whiteSpace: "nowrap",
                color: "#303b5b",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div>
                <InputHeader>First Name</InputHeader>
              </div>
              <TextInput
                type="text"
                placeholder={firstNamePlaceHolder}
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div
              className="gender-field"
              style={{
                display: "flex",
                flex: "1",
                marginTop: "50px",
                whiteSpace: "nowrap",
                lineHeight: "10px",
                fontSize: "24px",
                fontWeight: "medium",
                fontFamily: `"Roboto", sans-serif`,
                color: "#303b5b",
                flexDirection: "row",
              }}
            >
              <div
                className="gender"
                style={{
                  marginTop: "10px",
                  whiteSpace: "nowrap",
                  color: "#303b5b",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <InputHeader>Gender</InputHeader>
                </div>
                <Select
                  name="gender"
                  id="gerder"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </Select>
              </div>
              <div
                calss="birthdate"
                style={{
                  marginTop: "10px",
                  whiteSpace: "nowrap",
                  color: "#303b5b",
                  flexDirection: "column",
                  textAlign: "left",
                  display: "flex",
                  flex: "1",
                  marginRight: "70px",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <InputHeader>Birth Date</InputHeader>
                </div>
                <div className="birthDateSelect">
                  <input
                    type="date"
                    placeholder=""
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    style={{
                      height: "60px",
                      width: "100%",
                      border: "2px solid #c4c4c4",
                      borderRadius: "10px",
                      backgroundColor: "#ffffff",
                      fontSize: "30px",
                      fontWeight: "bold",
                      fontFamily: "Titillium Web",
                      paddingLeft: "10px",
                      lineHeight: "30px",
                      margin: "0px",
                      color: " #000000",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="right-register-form"
            style={{
              flex: "1",
              flexDirection: "column",
            }}
          >
            <div
              className="field"
              style={{
                flex: "1",
                marginTop: "50px",
                whiteSpace: "nowrap",
                color: "#303b5b",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div>
                <InputHeader>Last Name</InputHeader>
              </div>
              <TextInput
                type="text"
                placeholder={lastNamePlaceHolder}
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
          </div>
        </div>
        <div
          className="field"
          style={{
            flex: "1",
            marginTop: "50px",
            whiteSpace: "nowrap",
            color: "#303b5b",
            flexDirection: "column",
            textAlign: "left",
            marginLeft: "50px",
          }}
        >
          <div>
            <InputHeader>Bio</InputHeader>
          </div>
          <TextInput type="text" value={bio} onChange={handleBioChange} />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="empty" style={{ flex: 1 }} />
          <img
            src={profileImg}
            id="profile_img"
            style={{
              height: "500px",
              width: "500px",
              borderRadius: "250px",
              marginTop: "50px",
              alignSelf: "center",
            }}
          />
          <div className="empty" style={{ flex: 1 }} />
        </div>
        <div
          className="editProfile-pictureButton"
          style={{
            display: "flex",
            marginTop: "75px",
            marginLeft: "75px",
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="empty" style={{ flex: 1 }} />
          <div className="button">
            <Button type="Button" onClick={uploadPicture}>
              Upload Picture
            </Button>
          </div>
          <SelectPicButton type="file" onClick={selectFile}>
            Select Picture
          </SelectPicButton>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <div className="empty" style={{ flex: 1 }} />
        </div>
        <div
          className="editProfile-last"
          style={{
            display: "flex",
            marginTop: "75px",
            marginLeft: "75px",
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="empty" style={{ flex: 1 }} />
          <div className="button">
            <CancleButton type="Button" onClick={cancleEdit}>
              Cancle Edit Profile
            </CancleButton>
          </div>
          <div className="button">
            <Button type="Button" onClick={sumbitProfile}>
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
