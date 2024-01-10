import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Duration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const _id = localStorage.getItem("_id");
  const [duration, setDuration] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [experienceId, setExperienceId] = useState(_id);
  useEffect(() => {
    if (_id) {
      setExperienceId(_id);
      (async function () {
        const response = await fetch(
          `http://127.0.0.1:3232/experience/${_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseJson = await response.json();
        const { duration } = responseJson;
        const durationInString = duration.split(":");
        console.log(durationInString, "durationInString");
        setDuration({
          days: durationInString[0],
          hours: durationInString[1],
          minutes: durationInString[2],
        });
      })();
    } else if (!experienceId && experienceId.length === 0) {
      alert("please add titel and categories");
      navigate("/titel");
    }
  }, []);
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
          value={duration.days}
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
          value={duration.hours}
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
          value={duration.minutes}
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
