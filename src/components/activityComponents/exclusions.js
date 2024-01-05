import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const modules = {
  toolbar: [
    [{ size: [] }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "bullet" }, { list: "ordered" }],
    ["link", "image", "code-block", "blockquote"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
export const formats = [
  "size",
  "align",
  "color",
  "background",
  "bold",
  "italic",
  "underline",
  "strike",
  "bullet",
  "list",
  "link",
  "image",
  "code-block",
  "blockquote",
];

const Exclusions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [short_description, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const { _id } = location.state ? location.state : localStorage.getItem("_id");
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
    if (!experienceId) {
      alert("Please fill in all the fields");
      return;
    }
  }, []);
  const handleSubmit = async () => {
    if (!short_description.length > 0 && !description.length > 0) {
      alert("Please fill in all the fields");
      return;
    }
    const data = {
      included: short_description,
      detail_des: description,
    };
    const res = await fetch(
      "http://127.0.0.1:3232/experience/" + experienceId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseJson = await res.json();
    if (!res.ok) {
      alert(responseJson.message);
      return;
    }
    navigate("/photos", {
      state: {
        ...responseJson,
      },
    });
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
          What is NOT included in your experience?
        </h2>
        <p style={{ padding: "5px", textAlign: "center" }}>
          Is there anything your travellers may need that is not included in
          your offering? Example: Food, Equipment or Additional fees
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <div style={{ padding: "20px" }}>
          <h5>Exclusions</h5>
          <span style={{ fontStyle: "italic", paddingBottom: "5px" }}>
            Is there something that's not included but can be purchased on the
            day of travel?
          </span>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              console.log(e);
              setShortDescription(e?.target?.value);
            }}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <span style={{ fontStyle: "italic", paddingBottom: "5px" }}>
            If you need to add more details about what is excluded, you can use
            the text field below.
          </span>
          <ReactQuill
            style={{ height: "150px" }}
            modules={modules}
            formats={formats}
            onChange={(e) => {
              setDescription(e);
            }}
          // value={editorValue}
          // {...restProps}
          // onChange={handleEditorChange}
          />
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
        <Button variant="contained" onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Exclusions;
