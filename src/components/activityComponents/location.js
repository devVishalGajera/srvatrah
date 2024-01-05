import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const LocationDetails = () => {
  const state = useLocation();
  const navigate = useNavigate();
  const [locationdata, setLocation] = useState("");
  const { _id } = state.state ? state.state : localStorage.getItem("_id");
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
  const submit = async () => {
    const query = new URLSearchParams({
      location: locationdata,
    });
    if (!locationdata) {
      alert("Please enter the location");
      return;
    }
    const response = await fetch(
      `http://127.0.0.1:3232/experience/${_id}?${query.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: locationdata }),
      }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson.message);
      return;
    }
    navigate("/categories", {
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
          marginBottom: "30px",
        }}
      >
        <h2 style={{ fontWeight: "bold", padding: "5px" }}>
          What is the location of your experience?
        </h2>
        <p style={{ padding: "5px" }}>
          Inform travellers about the city or town where your experience takes
          place. This will help with filtering and searching online
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="location"
          variant="outlined"
          onChange={(e) => setLocation(e.target.value)}
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
        <Button variant="contained" onClick={submit}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default LocationDetails;
