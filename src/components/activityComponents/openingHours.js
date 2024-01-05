import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
const OpeningHours = () => {
  const [showDefaultOperatingHours, setShowDefaultOperatingHours] =
    useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { _id } = location.state ? location.state : {};
  const [experienceId, setExperienceId] = useState("");
  // const [OpeningHours, setOpeningHours] = useState([]);
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
      return;
    }
  });
  const [openingHours, setOpeningHours] = useState({
    Monday: { from: "", to: "", open24Hours: false },
    Tuesday: { from: "", to: "", open24Hours: false },
    Wednesday: { from: "", to: "", open24Hours: false },
    Thursday: { from: "", to: "", open24Hours: false },
    Friday: { from: "", to: "", open24Hours: false },
    Saturday: { from: "", to: "", open24Hours: false },
    Sunday: { from: "", to: "", open24Hours: false },
  });

  const onDaySelect = (day) => (event) => {
    setOpeningHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        selected: event.target.checked,
      },
    }));
  };

  const handleTimeChange = (day, field) => (time) => {
    setOpeningHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        [field]: time,
      },
    }));
  };

  const createOpeningHours = async () => {
    if (showDefaultOperatingHours) {
      navigate("/timeDatePass", {
        state: {
          ...responseJson,
        },
      });
      return;
    }
    const formattedAvailability = [];
    Object.keys(openingHours).forEach((day) => {
      const { selected, open24Hours, from, to } = openingHours[day];
      if (selected) {
        const availabilityData = {
          day,
          isOpen: !open24Hours || (from && to),
          is24Hours: open24Hours,
          openHour: open24Hours ? undefined : from.getHours(),
          closeHour: open24Hours ? undefined : to.getHours(),
        };
        formattedAvailability.push(availabilityData);
      }
    });
    //availability_detail
    const data = {
      availability_detail: formattedAvailability,
    };
    const response = await fetch(`http://127.0.0.1:3232/experience/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson.error);
      return;
    }
    navigate("/timeDatePass", {
      state: {
        ...responseJson,
      },
    });
  };

  return (
    // <div>
    //   {/* Your existing code */}
    //   {/* ... */}

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
          Is your experience only offered during specific hours?
        </h2>
        <p style={{ padding: "5px" }}>
          Your travellers will be able to see this information on their ticket
          once they have booked the experience
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <h5>Enable operating hours</h5>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showDefaultOperatingHours}
                onChange={() => setShowDefaultOperatingHours((prev) => !prev)}
              />
            }
            label="Show operating hours for this experience in your product pages"
          />
        </FormGroup>
      </div>

      {showDefaultOperatingHours && (
        <div
          style={{
            width: "90%",
            border: "1px solid #DEE3EA",
            borderRadius: "7px",
            padding: "20px",
          }}
        >
          <div
            style={{
              padding: "10px",
              background: "#DEE3EA",
              borderBottom: "1px solid black",
              borderRadius: "7px",
            }}
          >
            Default operating hours
          </div>
          <div style={{ padding: "10px", fontStyle: "italic" }}>
            These operating hours are always used, unless you override them with
            seasonal operating hours below.
          </div>
          <div
            style={{
              padding: "10px",
              border: "1px solid black",
              borderRadius: "7px",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
              flexDirection: "column",
            }}
          >
            {Object.keys(openingHours).map((day) => (
              <div
                key={day}
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  //border: "1px solid black",
                  //borderRadius: "7px",
                  marginTop: "10px",
                  //flexDirection: "column",
                  gap: "10px",
                  //background: "#DEE3EA",
                  //  color: "black",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "center",
                  //marginBottom: "10px",
                  //cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={openingHours[day].selected}
                        onChange={onDaySelect(day)}
                      />
                    }
                    label={day}
                  />
                  <TextField
                    label="From"
                    value={openingHours[day].from}
                    onChange={handleTimeChange(day, "from")}
                  />
                  <TextField
                    label="To"
                    value={openingHours[day].to}
                    onChange={handleTimeChange(day, "to")}
                  />{" "}
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={openingHours[day].open24Hours}
                        onChange={(event) =>
                          handleTimeChange(
                            day,
                            "open24Hours"
                          )(event.target.checked)
                        }
                      />
                    }
                    label="Open 24 hours"
                  />
                </FormGroup>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "150px",
        }}
      >
        <Button variant="outlined">Back</Button>
        <Button variant="contained" onClick={createOpeningHours}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OpeningHours;
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Switch,
//   TextField,
// } from "@mui/material";
// import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// const OpeningHours = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { _id } = location.state ? location.state : {};
//   const [experienceId, setExperienceId] = useState("");
//   const [OpeningHours, setOpeningHours] = useState([]);
//   useEffect(() => {
//     const localId = localStorage.getItem("_id");
//     if (_id) {
//       setExperienceId(_id);
//       return;
//     }
//     if (localId) {
//       setExperienceId(localId);
//       return;
//     }
//     if (!experienceId && experienceId.length === 0) {
//       alert("please add titel and categories");
//       navigate("/titel");
//       return;
//     }
//   });
//   const [showDefaultOperatingHours, setShowDefaultOperatingHours] =
//     useState(false);
//   const createOpeningHours = async () => {
//     if (showDefaultOperatingHours) {
//       navigate("/timeDatePass", {
//         state: {
//           ...responseJson,
//         }
//       });
//       return;
//     }
//     const data = {
//
//     }
//   }
//   // const onSelectDay = (day) => {
//   //
//   // }
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "20px",
//           marginBottom: "30px",
//         }}
//       >
//         <h2 style={{ fontWeight: "bold", padding: "5px" }}>
//           Is your experience only offered during specific hours?
//         </h2>
//         <p style={{ padding: "5px" }}>
//           Your travellers will be able to see this information on their ticket
//           once they have booked the experience
//         </p>
//       </div>
//
//       <div style={{ width: "70%" }}>
//         <h5>Enable operating hours</h5>
//         <FormGroup>
//           <FormControlLabel
//             control={
//               <Switch
//                 checked={showDefaultOperatingHours}
//                 onChange={() => setShowDefaultOperatingHours((prev) => !prev)}
//               />
//             }
//             label="Show operating hours for this experience in your product pages"
//           />
//         </FormGroup>
//       </div>
//
//       {showDefaultOperatingHours && (
//         <div
//           style={{
//             width: "90%",
//             border: "1px solid #DEE3EA",
//             borderRadius: "7px",
//             padding: "20px",
//           }}
//         >
//           <div
//             style={{
//               padding: "10px",
//               background: "#DEE3EA",
//               borderBottom: "1px solid black",
//               borderRadius: "7px",
//             }}
//           >
//             Default operating hours
//           </div>
//           <div style={{ padding: "10px", fontStyle: "italic" }}>
//             These operating hours are always used, unless you override them with
//             seasonal operating hours below.
//           </div>
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid black",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "10px",
//             }}
//           >
//             <FormGroup>
//               <FormControlLabel control={<Checkbox onSelect={onDaySelect("Monday")} />} label="Monday" />
//             </FormGroup>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="From" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="To" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
//             </FormGroup>
//           </div>
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid black",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "10px",
//             }}
//           >
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Tuesday" />
//             </FormGroup>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="From" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="To" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
//             </FormGroup>
//           </div>
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid black",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "10px",
//             }}
//           >
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Wednesday" />
//             </FormGroup>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="From" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="To" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
//             </FormGroup>
//           </div>
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid black",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "10px",
//             }}
//           >
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Thursday" />
//             </FormGroup>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="From" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="To" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
//             </FormGroup>
//           </div>
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid black",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "10px",
//             }}
//           >
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Friday" />
//             </FormGroup>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="From" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="To" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
//             </FormGroup>
//           </div>
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid black",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "10px",
//             }}
//           >
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Saturday" />
//             </FormGroup>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="From" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="To" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
//             </FormGroup>
//           </div>
//           <div
//             style={{
//               padding: "10px",
//               border: "1px solid black",
//               borderRadius: "7px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "10px",
//             }}
//           >
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Sunday" />
//             </FormGroup>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="From" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer components={["TimePicker"]}>
//                 <TimePicker size="small" label="To" />
//               </DemoContainer>
//             </LocalizationProvider>
//             <FormGroup>
//               <FormControlLabel control={<Checkbox />} label="Open 24 hours" />
//             </FormGroup>
//           </div>
//         </div>
//       )}
//
//       <div
//         style={{
//           width: "70%",
//           display: "flex",
//           justifyContent: "space-between",
//           marginTop: "150px",
//         }}
//       >
//         <Button variant="outlined">Back</Button>
//         <Button variant="contained" onClick={createOpeningHours}>Continue</Button>
//       </div>
//     </div>
//   );
// };
//
// export default OpeningHours;
//
