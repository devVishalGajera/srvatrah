import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const Capacity = () => {
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
          What is your experience's capacity?
        </h2>
        <p style={{ padding: "5px" }}>
          Do you have a maximum number of travellers per departure, or do you
          review and approve each booking individually?
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <FormControl style={{ width: "100%" }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div
              style={{
                border: "1px solid #DEE3EA",
                borderRadius: "7px",
                padding: "55px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <FormControlLabel value="dateTime" control={<Radio />} />
              <div>
                <h5>Free sale (unlimited)</h5>
                <span>
                  There is no limit. Confirm as many bookings as possible.
                </span>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #DEE3EA",
                borderRadius: "7px",
                padding: "55px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <FormControlLabel value="date" control={<Radio />} />
              <div>
                <h5>Limited number</h5>
                <span>
                  I have limited capacity. Bookings should only be confirmed as
                  long as there are seats remaining.
                </span>
              </div>
            </div>
            <div
              style={{
                border: "1px solid #DEE3EA",
                borderRadius: "7px",
                padding: "55px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <FormControlLabel value="pass" control={<Radio />} />
              <div>
                <h5>On request (not recommended)</h5>
                <span>
                  Bookings cannot be confirmed immediately. The customer waits
                  until I manually confirm or reject their booking request.
                </span>
              </div>
            </div>
          </RadioGroup>
        </FormControl>
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
        <Button variant="contained">Continue</Button>
      </div>
    </div>
  );
};

export default Capacity;
