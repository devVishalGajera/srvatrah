import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Titel = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate(); // Move useNavigate outside the function

  const createExperience = async () => {
    if (!title) return;
    console.log(title);
    const data = {
      title: title,
    };
    console.log(data);
    const queryParams = new URLSearchParams({
      title: title,
    });
    const response = await fetch(
      `http://127.0.0.1:3232/experience?${queryParams.toString()}`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      alert("Something went wrong");
      // console.log("error", response);
      return;
    }
    // if (response.ok) {
    //   console.log("success", response);
    // }
    const responseJson = await response.json();
    console.log(responseJson, "responseJson");
    localStorage.setItem("_id", responseJson._id);
    navigate("/duration", {
      state: {
        title: title,
        _id: responseJson._id,
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
          marginBottom: "30px",
        }}
      >
        <h2 style={{ fontWeight: "bold", padding: "5px" }}>
          Give your experience a short but descriptive name
        </h2>
        <p style={{ padding: "5px" }}>
          We recommend using simple language, keep it less than 80 characters,
          mention what and where the experience is
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Titel"
          variant="outlined"
        />
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
        <Button variant="contained" onClick={createExperience}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Titel;
