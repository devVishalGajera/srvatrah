import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
const Videos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { _id } = location.state ? location.state : {};
  const [videoLinks, setVideoLinks] = useState([""]);
  const [experienceId, setExperienceId] = useState("");

  useEffect(() => {
    const localId = localStorage.getItem("_id");
    if (_id) {
      setExperienceId(_id);
      return;
    }
    if (localId) {
      setExperienceId(localId);
      return;
    }
    if (!experienceId && experienceId.length === 0) {
      alert("please add titel and categories");
      navigate("/titel");
      return;
    }
  });
  const submit = async () => {
    const data = {
      videos: videoLinks,
    };
    const response = await fetch(`http://127.0.0.1:3232/experience/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson.error);
      return;
    }
    navigate("/timeDatePass", {
      state: {
        ...responseJson,
      },
    });
  }
  const handleVideoLinkChange = (index, value) => {
    const newLinks = [...videoLinks];
    newLinks[index] = value;
    setVideoLinks(newLinks);
  };


  const addVideoLink = () => {
    setVideoLinks([...videoLinks, ""]);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontWeight: "bold", padding: "5px" }}>
          Want to add videos to your experience?
        </h2>
        <p style={{ padding: "5px" }}>
          Show travellers even more details about your experience to give your
          travellers a better idea of what to expect
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <div style={{ padding: "20px" }}>
          <h5>Video links</h5>
          <span style={{ fontStyle: "italic", paddingBottom: "5px" }}>
            Paste in links from Youtube / Vimeo
          </span>
          {videoLinks.map((link, index) => (
            <TextField
              key={index}
              fullWidth
              id={`outlined-basic-${index}`}
              variant="outlined"
              size="small"
              value={link}
              onChange={(e) => handleVideoLinkChange(index, e.target.value)}
            />
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={addVideoLink}>
              Add onether one
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "150px",
        }}
      >
        <Button variant="outlined">Back</Button>
        <Button variant="contained" onClick={submit}>Continue</Button>
      </div>
    </div>
  );
};

export default Videos;
