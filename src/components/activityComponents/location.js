import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const LocationDetails = () => {
  const state = useLocation();
  const navigate = useNavigate();
  const [locationdata, setLocation] = useState({
    location: "",
    city: "",
    state: "",
    country: "",
  });
  const localId = localStorage.getItem("_id");
  const [experienceId, setExperienceId] = useState(localId);
  useEffect(() => {
    if (experienceId) {
      (async function () {
        const response = await fetch(
          `https://demo.turangh.com/experience/${experienceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseJson = await response.json();
        console.log(responseJson, "responseJson");
        if (!responseJson.location) {
          return;
        }
        setLocation(responseJson.location);
      })();
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
    if (
      !locationdata ||
      (!locationdata.location && !locationdata.location === "") ||
      (!locationdata.city && !locationdata.city === "") ||
      (!locationdata.state && !locationdata.state === "") ||
      (!locationdata.country && !locationdata.country === "")
    ) {
      alert("Please enter the location");
      return;
    }
    const data = {
      location: locationdata,
    };

    const response = await fetch(
      `https://demo.turangh.com/experience/${experienceId}?${query.toString()}`,
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

  const goBack = () => {
    navigate("/duration");
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
          label="location link"
          variant="outlined"
          value={locationdata.location}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="City"
            variant="outlined"
            value={locationdata.city}
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, city: e.target.value }))
            }
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="State"
            variant="outlined"
            value={locationdata.state}
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, state: e.target.value }))
            }
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Country"
            variant="outlined"
            value={locationdata.country}
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, country: e.target.value }))
            }
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
        <Button variant="outlined" onClick={goBack}>
          Back
        </Button>
        <Button variant="contained" onClick={submit}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default LocationDetails;
