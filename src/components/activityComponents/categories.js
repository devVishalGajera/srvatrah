import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { _id } = location?.state ? location.state : {};
  const [categoriesdata, setCategories] = useState("");
  const [themedata, setTheme] = useState("");
  const submit = async () => {
    const query = new URLSearchParams({
      categories: encodeURIComponent([categoriesdata, themedata]),
    });
    console.log(query.toString(), "query");
    const response = await fetch(
      `http://127.0.0.1:3232/experience/${_id}?${query.toString()}`,
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
          Choose the themes that best describe your experience
        </h2>
        <p style={{ padding: "5px" }}>
          Help your travellers find what they are looking for. Are you offering
          a walking tour or helicopter tour?
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <div style={{ padding: "20px" }}>
          <h5>Categories</h5>
          <span style={{ fontStyle: "italic", paddingBottom: "5px" }}>
            Help your customer understand what type of experience this is
          </span>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            onChange={(e) => setCategories(e.target.value.label)}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div style={{ padding: "20px" }}>
          <h5>Theme</h5>
          <span style={{ fontStyle: "italic", paddingBottom: "5px" }}>
            Select the themes that apply for this experience...
          </span>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={theme}
            onChange={(e) => setTheme(e.target.value.label)}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        {/* <TextField
                    id="outlined-number"
                    label="Days"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Hours"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Minutes"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                /> */}
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

export default Categories;

const categories = [{ label: "The Godfather" }, { label: "Pulp Fiction" }];
const theme = [{ label: "The Godfather" }, { label: "Pulp Fiction" }];
