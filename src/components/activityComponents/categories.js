import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { _id } = location?.state ? location.state : {};
  const [categoriesdata, setCategories] = useState("");
  const [themedata, setTheme] = useState("");
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
    const query = new URLSearchParams();
    console.log(themedata, "themedata");
    if (!categoriesdata) {
      alert("Please enter the categories");
      return;
    }
    if (!themedata) {
      alert("Please enter the theme");
      return;
    }
    console.log(themedata, "themedata");
    query.append("category", categoriesdata);
    query.append(
      "category_theme",
      JSON.stringify({
        category: categoriesdata,
        theme: themedata,
      })
    );
    query.append("theme", themedata);
    console.log(query.toString(), "query");
    const response = await fetch(
      `http://127.0.0.1:3232/experience/${_id}?${query.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_theme: {
            category: categoriesdata,
            theme: themedata,
          },
        }),
      }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson.message);
      return;
    }
    navigate("/description", {
      state: {
        ...responseJson,
      },
    });
  };
  const onChangeCategory = (e) => {
    setCategories(categories[e.target.value].label);
  }
  const onChangeTheme = (e) => {
    setTheme(theme[e.target.value].label);
  }
  //   const selectedValues = React.useMemo(
  //     () => allValues.filter((v) => v.selected),
  //     [allValues]
  //   );
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
            onChange={onChangeCategory}
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
            onChange={onChangeTheme}
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
