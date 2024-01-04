import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Duration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, id } = location.state;
  console.log(title, id, "title, id");
  const [duration, setDuration] = useState({});
  const submit = async () => {
    const durationInString = `${duration.days}:${duration.hours}:${duration.minutes}`;
    const query = new URLSearchParams({
      duration: durationInString,
    });
    console.log(query.toString(), "query");
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const response = await fetch(
      `http://127.0.0.1:3232/experience/${id}?${query.toString()}`,
      {
        method: "PUT",
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
