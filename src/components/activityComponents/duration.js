import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Duration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, _id } = location.state ? location.state : {};
  console.log(title, _id, "title, id");
  const [duration, setDuration] = useState({});
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
    }
  });
  const submit = async () => {
    const durationInString = `${duration.days}:${duration.hours}:${duration.minutes}`;
    const query = new URLSearchParams({
      duration: durationInString,
    });

    const response = await fetch(
      `http://127.0.0.1:3232/experience/${experienceId}?${query.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ duration: durationInString }),
      }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson.message);
      return;
    }
    navigate("/location", {
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
          What is the total duration of your experience?
        </h2>
        <p style={{ padding: "5px" }}>
          Inform your travellers about the duration of your experience so they
          can plan their time accordingly
        </p>
      </div>

      <div style={{ width: "30%", display: "flex", gap: "20px" }}>
        <TextField
          id="outlined-number"
          label="Days"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) =>
            setDuration((prev) => ({ ...prev, days: e.target.value }))
          }
        />
        <TextField
          id="outlined-number"
          label="Hours"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) =>
            setDuration((prev) => ({ ...prev, hours: e.target.value }))
          }
        />
        <TextField
          id="outlined-number"
          label="Minutes"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) =>
            setDuration((prev) => ({ ...prev, minutes: e.target.value }))
          }
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

export default Duration;
