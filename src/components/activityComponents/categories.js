import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = [
    { label: "ATV / quad tour" },
    { label: "Adrenaline and extreme" },
    { label: "Adventure" },
    { label: "Air / helicopter tour" },
    { label: "Airport lounge" },
    { label: "Arts / culture" },
    { label: "Amusement park" },
    { label: "Bike tour" },
    { label: "Birdwatching" },
    { label: "Bus / minivan tour" },
    { label: "Canoeing" },
    { label: "Caving" },
    { label: "City break" },
    { label: "City tours" },
    { label: "Classes / workshops" },
    { label: "Classic car tours" },
    { label: "Climbing" },
    { label: "Culinary" },
    { label: "Cultural and theme tours" },
    { label: "Day trips and excursions" },
    { label: "Diving" },
    { label: "Dolphin / whalewatching" },
    { label: "E-bike tour" },
    { label: "Escape game" },
    { label: "Educational tour" },
    { label: "Festival" },
    { label: "Fishing" },
    { label: "Glacier hiking" },
    { label: "Golf" },
    { label: "Hiking" },
    { label: "Holiday and seasonal tours" },
    { label: "Hop on hop off tour" },
    { label: "Horse carriage ride" },
    { label: "Horseback riding" },
    { label: "Hunting" },
    { label: "Ice climbing" },
    { label: "Kayaking" },
    { label: "Language tour" },
    { label: "Layover tours" },
    { label: "Luxury and special occasions" },
    { label: "Medical tour" },
    { label: "Mini cruise" },
    { label: "Motorcyle Tours" },
    { label: "Mountain biking" },
    { label: "Multisport" },
    { label: "Nature" },
    { label: "Museums / exhibitions" },
    { label: "Nightlife" },
    { label: "Obstacle courses" },
    { label: "Paintball" },
    { label: "Paragliding" },
    { label: "Photography" },
    { label: "Pilgrimage or Religion" },
    { label: "Plantation tours" },
    { label: "Private car tour" },
    { label: "Private roundtrip" },
    { label: "Rafting" },
    { label: "Rail pass" },
    { label: "Running" },
    { label: "Safari / wildlife" },
    { label: "Sailing / boat tour" },
    { label: "Sea angling" },
    { label: "Seat in coach tour" },
    { label: "Segway tour" },
    { label: "Self drive tour" },
    { label: "Shopping" },
    { label: "Shore excursions" },
    { label: "Short break" },
    { label: "Shows / musicals" },
    { label: "Sightseeing" },
    { label: "Sightseeing attraction" },
    { label: "Skiing" },
    { label: "Skip the line" },
    { label: "Snorkeling" },
    { label: "Spa / wellness" },
    { label: "Snowmobile tour" },
    { label: "Spectator sports" },
    { label: "Sun and Beach" },
    { label: "Surfing" },
    { label: "TV / Movies" },
    { label: "Theme parks" },
    { label: "Tourist pass" },
    { label: "Transfers and ground transport" },
    { label: "Trolley tours" },
    { label: "Underground tours" },
    { label: "VIP and exclusive" },
    { label: "Walking tour" },
    { label: "Water" },
    { label: "Wedding and honeymoon" },
    { label: "Zoo / aquarium" },
  ];
  const theme = [
    { label: "Adults only" },
    { label: "Beach" },
    { label: "Couples" },
    { label: "Eco friendly" },
    { label: "Family friendly" },
    { label: "Group friendly" },
    { label: "Indoor" },
    { label: "Luxury" },
    { label: "Outdoor" },
    { label: "Private experience" },
    { label: "Rainy day" },
    { label: "Romantic" },
    { label: "Senior" },
    { label: "Skip the line" },
    { label: "Tailor made" },
    { label: "Volunteers" },
    { label: "Youth" },
  ];
  const [categoriesdata, setCategories] = useState([]);
  const [themedata, setTheme] = useState([]);
  const _id = localStorage.getItem("_id") || "";
  const [experienceId, setExperienceId] = useState(_id);

  useEffect(() => {
    if (experienceId && experienceId.length > 0) {
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
        setCategories(responseJson.category ? [responseJson.category] : []);
        setTheme(
          responseJson.category_theme ? [responseJson.category_theme.theme] : []
        );
      })();
      return;
    }
    if (!experienceId && experienceId.length === 0) {
      alert("please add titel and categories");
      navigate("/titel");
    }
  }, []);
  const submit = async () => {
    if (!categoriesdata.length) {
      alert("Please enter the categories");
      return;
    }
    if (!themedata.length) {
      alert("Please enter the theme");
      return;
    }

    const query = new URLSearchParams();
    query.append("category", categoriesdata[0].label);
    query.append(
      "category_theme",
      JSON.stringify({
        category: categoriesdata[0].label,
        theme: themedata[0].label,
      })
    );
    query.append("theme", themedata[0].label);

    const response = await fetch(
      `https://demo.turangh.com/experience/${_id}?${query.toString()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category_theme: {
            category: categoriesdata[0].label,
            theme: themedata[0].label,
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

  // const submit = async () => {
  //   const query = new URLSearchParams();
  //   console.log(themedata, "themedata");
  //   if (!categoriesdata) {
  //     alert("Please enter the categories");
  //     return;
  //   }
  //   if (!themedata) {
  //     alert("Please enter the theme");
  //     return;
  //   }
  //   console.log(themedata, "themedata");
  //   query.append("category", categoriesdata);
  //   query.append(
  //     "category_theme",
  //     JSON.stringify({
  //       category: categoriesdata.label,
  //       theme: themedata.label,
  //     })
  //   );
  //   query.append("theme", themedata);
  //   console.log(query.toString(), "query");
  //   const response = await fetch(
  //     `https://demo.turangh.com/experience/${_id}?${query.toString()}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         category_theme: {
  //           category: categoriesdata,
  //           theme: themedata,
  //         },
  //       }),
  //     }
  //   );
  //   const responseJson = await response.json();
  //   if (!response.ok) {
  //     alert(responseJson.message);
  //     return;
  //   }
  //   navigate("/description", {
  //     state: {
  //       ...responseJson,
  //     },
  //   });
  // };
  const onChangeCategory = (_, value) => {
    setCategories(value ? [value] : []);
  };
  const onChangeTheme = (_, value) => {
    setTheme(value ? [value] : []);
  };
  //   const selectedValues = React.useMemo(
  //     () => allValues.filter((v) => v.selected),
  //     [allValues]
  //   );
  const goBack = () => {
    navigate("/location");
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
            onChange={onChangeCategory}
            // value={categoriesdata}
            value={
              categoriesdata && categoriesdata.length > 0
                ? categoriesdata[0]
                : null
            }
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
            value={themedata && themedata.length > 0 ? themedata[0] : null}
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

export default Categories;

const categories = [{ label: "The Godfather" }, { label: "Pulp Fiction" }];
const theme = [{ label: "The Godfather" }, { label: "Pulp Fiction" }];
