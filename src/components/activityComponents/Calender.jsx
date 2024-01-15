import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const style = {
  marginTop: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: "20px",
  "@media(max-height: 890px)": {
    top: "0",
    transform: "translate(-50%, 0%)",
  },
};
const buttonStyle = {
  width: "4%",
  height: "34px",
  border: "1px solid black",
  borderRadius: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: "0 5px",
};

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, "");

const generateEventBasedOnWeekDays = (weekDays, startDate, numberOfWeeks) => {
  const events = [];
  let newDate = new Date(startDate);

  for (let i = 0; i < numberOfWeeks * 7; i++) {
    if (weekDays.includes(newDate.getDay())) {
      events.push({
        id: createEventId(),
        title: "Event",
        start: newDate.toISOString().split("T")[0],
      });
    }
    newDate.setDate(newDate.getDate() + 1);
  }
  return events;
};

function createEventId() {
  return String(eventGuid++);
}

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    const todayStr = new Date().toISOString().replace(/T.*$/, "");
    console.log(todayStr);
    const events = generateEventBasedOnWeekDays([5, 6, 7], todayStr, 52);
    console.log(events, "events");
    setCurrentEvents(events);
    const dummy_event_with_timeing = {
      id: createEventId(),
      title: "Event",
    };
    console.log(currentEvents, "currentEvents");
  }, []);
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    console.log(selectInfo, "selectInfo");
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
  const calendarStyle = {
    maxWidth: "100%",
    margin: "auto",
  };
  const handleEventAdd = (event) => {
    // console.log(event._instance, "event");
  };

  const renderSwitchForm = () => {
    switch (selectedCategory?.label) {
      case "Repeat weekly on selected days":
        return (
          <Formik
            initialValues={{ days: [] }}
            validationSchema={Yup.object({
              days: Yup.array()
                .min(1, "Select at least one day")
                .required("Days are required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // Handle form submission here
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form style={{ padding: "25px" }}>
              <h6>Affected days</h6>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontStyle: "italic",
                    paddingBottom: "5px",
                    fontSize: "15px",
                  }}
                >
                  Select which days this availability rule applies to.
                </span>
                <Field name="days" type="checkbox" value="Monday" /> Monday
                <Field name="days" type="checkbox" value="Tuesday" /> Tuesday
                <Field name="days" type="checkbox" value="Wednesday" />{" "}
                Wednesday
                <Field name="days" type="checkbox" value="Thursday" /> Thursday
                <Field name="days" type="checkbox" value="Friday" /> Friday
                <Field name="days" type="checkbox" value="Saturday" /> Saturday
                <Field name="days" type="checkbox" value="Sunday" /> Sunday
                <button type="submit">Submit</button>
              </div>
            </Form>
          </Formik>
        );

      case "Repeat yearly during selected months":
        return (
          <Formik
            initialValues={{ months: [] }}
            validationSchema={Yup.object({
              months: Yup.array()
                .min(1, "Select at least one month")
                .required("Months are required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // Handle form submission here
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form style={{ padding: "25px" }}>
              <h6>Affected months</h6>
              <span
                style={{
                  fontStyle: "italic",
                  paddingBottom: "5px",
                  fontSize: "15px",
                }}
              >
                Select which month(s) this availability rule applies to.
              </span>
              <Field name="months" type="checkbox" value="January" /> January
              <Field name="months" type="checkbox" value="February" /> February
              {/* Repeat for other months */}
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        );

      case "happen between selected dates":
        return (
          <Formik
            initialValues={{ startDate: "", endDate: "" }}
            validationSchema={Yup.object({
              startDate: Yup.date().required("Start date is required"),
              endDate: Yup.date()
                .min(Yup.ref("startDate"), "End date must be after start date")
                .required("End date is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // Handle form submission here
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form style={{ padding: "25px" }}>
              <h6>Select date range</h6>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div>This rule applies from</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="startDate"
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <div>to</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      name="endDate"
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        );

      case "happen on a selected date":
        return (
          <Formik
            initialValues={{ selectedDate: "" }}
            validationSchema={Yup.object({
              selectedDate: Yup.date().required("Date is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // Handle form submission here
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form style={{ padding: "25px" }}>
              <h6>Affected start times</h6>
              <span
                style={{
                  fontStyle: "italic",
                  paddingBottom: "5px",
                  fontSize: "15px",
                }}
              >
                Select all start times
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FormGroup>
                  <FormControlLabel control={<Switch />} />
                </FormGroup>
              </div>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        );

      default:
        return null;
    }
  };

  // const renderSwitchForm = () => {
  //   switch (selectedCategory?.label) {
  //     case "Repeat weekly on selected days":
  //       return (
  //         <div style={{ padding: "25px" }}>
  //           <h6>Affected days</h6>
  //           <div style={{ display: "flex", flexDirection: "column" }}>
  //             <span
  //               style={{
  //                 fontStyle: "italic",
  //                 paddingBottom: "5px",
  //                 fontSize: "15px",
  //               }}
  //             >
  //               Select which days this availability rule applies to.
  //             </span>
  //             <div
  //               style={{
  //                 display: "flex",
  //                 gap: "10px",
  //                 paddingTop: "10px",
  //                 paddingBottom: "10px",
  //                 paddingLeft: "5px",
  //                 paddingRight: "5px",
  //               }}
  //             >
  //               <div style={buttonStyle}>M</div>
  //               <div style={buttonStyle}>T</div>
  //               <div style={buttonStyle}>W</div>
  //               <div style={buttonStyle}>T</div>
  //               <div style={buttonStyle}>F</div>
  //               <div style={buttonStyle}>S</div>
  //               <div style={buttonStyle}>S</div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     case "Repeat yearly during selected months":
  //       return (
  //         <div style={{ padding: "25px" }}>
  //           <h6>Affected months</h6>
  //           <span
  //             style={{
  //               fontStyle: "italic",
  //               paddingBottom: "5px",
  //               fontSize: "15px",
  //             }}
  //           >
  //             Select which month(s) this availability rule applies to.
  //           </span>
  //           <div style={{ width: "40%", paddingTop: "5px" }}>
  //             <Autocomplete
  //               disablePortal
  //               id="combo-box-demo"
  //               options={categories}
  //               size="small"
  //               renderInput={(params) => <TextField {...params} />}
  //             />
  //           </div>
  //         </div>
  //       );
  //     case "happen beatween selected dates":
  //       return (
  //         <div style={{ padding: "25px" }}>
  //           <h6>Select date range</h6>
  //           <div
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               gap: "10px",
  //             }}
  //           >
  //             <div>This rule applies from</div>
  //             <LocalizationProvider dateAdapter={AdapterDayjs}>
  //               <DemoContainer components={["DatePicker"]}>
  //                 <DatePicker slotProps={{ textField: { size: "small" } }} />
  //               </DemoContainer>
  //             </LocalizationProvider>
  //             <div>to</div>
  //             <LocalizationProvider dateAdapter={AdapterDayjs}>
  //               <DemoContainer components={["DatePicker"]}>
  //                 <DatePicker slotProps={{ textField: { size: "small" } }} />
  //               </DemoContainer>
  //             </LocalizationProvider>
  //           </div>
  //         </div>
  //       );
  //     case "happen on a selected date":
  //       return (
  //         <div style={{ padding: "25px" }}>
  //           <h6>Select date</h6>
  //           <LocalizationProvider dateAdapter={AdapterDayjs}>
  //             <DemoContainer components={["DatePicker"]}>
  //               <DatePicker slotProps={{ textField: { size: "small" } }} />
  //             </DemoContainer>
  //           </LocalizationProvider>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  // const renderSwitchForm = () => {
  //   switch (selectedCategory?.label) {
  //     case "Repeat weekly on selected days":
  //       return (
  //         <>
  //           <Box sx={style}>
  //             <div style={{ borderBottom: "1px solid", padding: "10px" }}>
  //               <Typography id="modal-modal-title" variant="h6" component="h2">
  //                 Add availability
  //               </Typography>
  //             </div>
  //             <div style={{ marginTop: "10px" }}>
  //               <div style={{ padding: "25px" }}>
  //                 <h6>Select the type of availability rule</h6>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                     gap: "10px",
  //                   }}
  //                 >
  //                   <div>This rule should</div>
  //                   <div style={{ width: "30%" }}>
  //                     <Autocomplete
  //                       disablePortal
  //                       id="combo-box-demo"
  //                       options={categories}
  //                       size="small"
  //                       renderInput={(params) => <TextField {...params} />}
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //               <div style={{ padding: "25px" }}>
  //                 <h6>Select date range</h6>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                     gap: "10px",
  //                   }}
  //                 >
  //                   <div>This rule applies from</div>
  //                   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //                     <DemoContainer components={["DatePicker"]}>
  //                       <DatePicker
  //                         slotProps={{ textField: { size: "small" } }}
  //                       />
  //                     </DemoContainer>
  //                   </LocalizationProvider>
  //                   <div>to</div>
  //                   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //                     <DemoContainer components={["DatePicker"]}>
  //                       <DatePicker
  //                         slotProps={{ textField: { size: "small" } }}
  //                       />
  //                     </DemoContainer>
  //                   </LocalizationProvider>
  //                 </div>
  //               </div>
  //               <div style={{ padding: "25px" }}>
  //                 <h6>Affected days</h6>
  //                 <div style={{ display: "flex", flexDirection: "column" }}>
  //                   <span
  //                     style={{
  //                       fontStyle: "italic",
  //                       paddingBottom: "5px",
  //                       fontSize: "15px",
  //                     }}
  //                   >
  //                     Select which days this availability rule applies to.
  //                   </span>
  //                   <div
  //                     style={{
  //                       display: "flex",
  //                       gap: "10px",
  //                       paddingTop: "10px",
  //                     }}
  //                   >
  //                     <div style={buttonStyle}>M</div>
  //                     <div style={buttonStyle}>T</div>
  //                     <div style={buttonStyle}>W</div>
  //                     <div style={buttonStyle}>T</div>
  //                     <div style={buttonStyle}>F</div>
  //                     <div style={buttonStyle}>S</div>
  //                     <div style={buttonStyle}>S</div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div style={{ padding: "25px", display: "flex", gap: "15px" }}>
  //                 <div style={{}}>
  //                   <h6>Participants (PAX)</h6>
  //                   <span
  //                     style={{
  //                       fontStyle: "italic",
  //                       paddingBottom: "5px",
  //                       fontSize: "15px",
  //                     }}
  //                   >
  //                     The experience will only be bookable if minimum
  //                     participants is met.
  //                   </span>
  //                   <div
  //                     style={{
  //                       display: "flex",
  //                       alignItems: "center",
  //                       gap: "15px",
  //                       paddingTop: "5px",
  //                     }}
  //                   >
  //                     <div style={{ width: "20%" }}>
  //                       <TextField
  //                         size="small"
  //                         id="outlined-number"
  //                         type="number"
  //                         InputLabelProps={{
  //                           shrink: true,
  //                         }}
  //                       />
  //                     </div>
  //                     <div>minimum</div>
  //                     <div style={{ width: "20%" }}>
  //                       <TextField
  //                         size="small"
  //                         id="outlined-number"
  //                         type="number"
  //                         InputLabelProps={{
  //                           shrink: true,
  //                         }}
  //                       />
  //                     </div>
  //                     <div>maximum</div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div style={{ padding: "25px" }}>
  //                 <h6>Affected start times</h6>
  //                 <span
  //                   style={{
  //                     fontStyle: "italic",
  //                     paddingBottom: "5px",
  //                     fontSize: "15px",
  //                   }}
  //                 >
  //                   Select all start times
  //                 </span>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                     gap: "10px",
  //                   }}
  //                 >
  //                   <FormGroup>
  //                     <FormControlLabel control={<Switch />} />
  //                   </FormGroup>
  //                 </div>
  //               </div>
  //             </div>
  //             <div
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 marginTop: "40px",
  //               }}
  //             >
  //               <Button onClick={handleClose} variant="outlined">
  //                 Back
  //               </Button>
  //               <Button
  //                 variant="contained"
  //                 // onClick={() => {
  //                 //   createMeetingPoint();
  //                 // }}
  //               >
  //                 Continue
  //               </Button>
  //             </div>
  //           </Box>
  //         </>
  //       );
  //     case "Repeat yearly during selected month":
  //       return (
  //         <>
  //           <Box sx={style}>
  //             <div style={{ borderBottom: "1px solid", padding: "10px" }}>
  //               <Typography id="modal-modal-title" variant="h6" component="h2">
  //                 Add availability
  //               </Typography>
  //             </div>
  //             <div style={{ marginTop: "10px" }}>
  //               <div style={{ padding: "25px" }}>
  //                 <h6>Select the type of availability rule</h6>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                     gap: "10px",
  //                   }}
  //                 >
  //                   <div>This rule should</div>
  //                   <div style={{ width: "30%" }}>
  //                     <Autocomplete
  //                       disablePortal
  //                       id="combo-box-demo"
  //                       options={categories}
  //                       size="small"
  //                       renderInput={(params) => <TextField {...params} />}
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //               <div style={{ padding: "25px" }}>
  //                 <h6>Affected days</h6>
  //                 <div style={{ display: "flex", flexDirection: "column" }}>
  //                   <span
  //                     style={{
  //                       fontStyle: "italic",
  //                       paddingBottom: "5px",
  //                       fontSize: "15px",
  //                     }}
  //                   >
  //                     Select which days this availability rule applies to.
  //                   </span>
  //                   <div
  //                     style={{
  //                       display: "flex",
  //                       gap: "10px",
  //                       paddingTop: "10px",
  //                     }}
  //                   >
  //                     <div style={buttonStyle}>M</div>
  //                     <div style={buttonStyle}>T</div>
  //                     <div style={buttonStyle}>W</div>
  //                     <div style={buttonStyle}>T</div>
  //                     <div style={buttonStyle}>F</div>
  //                     <div style={buttonStyle}>S</div>
  //                     <div style={buttonStyle}>S</div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div style={{ padding: "25px", display: "flex", gap: "15px" }}>
  //                 <div style={{}}>
  //                   <h6>Participants (PAX)</h6>
  //                   <span
  //                     style={{
  //                       fontStyle: "italic",
  //                       paddingBottom: "5px",
  //                       fontSize: "15px",
  //                     }}
  //                   >
  //                     The experience will only be bookable if minimum
  //                     participants is met.
  //                   </span>
  //                   <div
  //                     style={{
  //                       display: "flex",
  //                       gap: "15px",
  //                       paddingTop: "5px",
  //                     }}
  //                   >
  //                     <TextField
  //                       size="small"
  //                       id="outlined-number"
  //                       type="number"
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                     />
  //                     <div>minimum</div>
  //                     <TextField
  //                       size="small"
  //                       id="outlined-number"
  //                       type="number"
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                     />
  //                     <div>maximum</div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div style={{ padding: "25px" }}>
  //                 <h6>Select all start times</h6>
  //                 <span
  //                   style={{
  //                     fontStyle: "italic",
  //                     paddingBottom: "5px",
  //                     fontSize: "15px",
  //                   }}
  //                 >
  //                   Select all start times
  //                 </span>
  //                 <div
  //                   style={{
  //                     display: "flex",
  //                     alignItems: "center",
  //                     gap: "10px",
  //                   }}
  //                 >
  //                   <FormGroup>
  //                     <FormControlLabel control={<Switch />} />
  //                   </FormGroup>
  //                 </div>
  //               </div>
  //             </div>
  //             <div
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 marginTop: "40px",
  //               }}
  //             >
  //               <Button onClick={handleClose} variant="outlined">
  //                 Back
  //               </Button>
  //               <Button
  //                 variant="contained"
  //                 // onClick={() => {
  //                 //   createMeetingPoint();
  //                 // }}
  //               >
  //                 Continue
  //               </Button>
  //             </div>
  //           </Box>
  //         </>
  //       );
  //     case "happen beatween selected dates":
  //       return <></>;
  //   }
  // };
  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <Button onClick={handleOpen} variant="outlined">
          open
        </Button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          // eventsSet={handleEvents}
          eventAdd={handleEventAdd}
        />
        <div>
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflowY: "scroll" }}
          >
            <Box sx={style}>
              <div style={{ borderBottom: "1px solid", padding: "10px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add availability
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ padding: "25px" }}>
                  <h6>Select the type of availability rule</h6>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div>This rule should</div>
                    <div style={{ width: "30%" }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Affected days</h6>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontStyle: "italic",
                        paddingBottom: "5px",
                        fontSize: "15px",
                      }}
                    >
                      Select which days this availability rule applies to.
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      <div style={buttonStyle}>M</div>
                      <div style={buttonStyle}>T</div>
                      <div style={buttonStyle}>W</div>
                      <div style={buttonStyle}>T</div>
                      <div style={buttonStyle}>F</div>
                      <div style={buttonStyle}>S</div>
                      <div style={buttonStyle}>S</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px", display: "flex", gap: "15px" }}>
                  <div style={{}}>
                    <h6>Participants (PAX)</h6>
                    <span
                      style={{
                        fontStyle: "italic",
                        paddingBottom: "5px",
                        fontSize: "15px",
                      }}
                    >
                      The experience will only be bookable if minimum
                      participants is met.
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        paddingTop: "5px",
                      }}
                    >
                      <TextField
                        size="small"
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div>minimum</div>
                      <TextField
                        size="small"
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div>maximum</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Select all start times</h6>
                  <span
                    style={{
                      fontStyle: "italic",
                      paddingBottom: "5px",
                      fontSize: "15px",
                    }}
                  >
                    Select all start times
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch />}
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Button onClick={handleClose} variant="outlined">
                  Back
                </Button>
                <Button
                  variant="contained"
                  // onClick={() => {
                  //   createMeetingPoint();
                  // }}
                >
                  Continue
                </Button>
              </div>
            </Box>
          </Modal> */}
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflowY: "scroll" }}
          >
            <Box sx={style}>
              <div style={{ borderBottom: "1px solid", padding: "10px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add availability
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ padding: "25px" }}>
                  <h6>Select the type of availability rule</h6>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div>This rule should</div>
                    <div style={{ width: "30%" }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Affected months</h6>
                  <span
                    style={{
                      fontStyle: "italic",
                      paddingBottom: "5px",
                      fontSize: "15px",
                    }}
                  >
                    Select which month(s) this availability rule applies to.
                  </span>
                  <div style={{ width: "40%", paddingTop: "5px" }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categories}
                      size="small"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Affected days</h6>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontStyle: "italic",
                        paddingBottom: "5px",
                        fontSize: "15px",
                      }}
                    >
                      Select which days this availability rule applies to.
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      <div style={buttonStyle}>M</div>
                      <div style={buttonStyle}>T</div>
                      <div style={buttonStyle}>W</div>
                      <div style={buttonStyle}>T</div>
                      <div style={buttonStyle}>F</div>
                      <div style={buttonStyle}>S</div>
                      <div style={buttonStyle}>S</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px", display: "flex", gap: "15px" }}>
                  <div style={{}}>
                    <h6>Participants (PAX)</h6>
                    <span
                      style={{
                        fontStyle: "italic",
                        paddingBottom: "5px",
                        fontSize: "15px",
                      }}
                    >
                      The experience will only be bookable if minimum
                      participants is met.
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        paddingTop: "5px",
                      }}
                    >
                      <div style={{ width: "20%" }}>
                        <TextField
                          size="small"
                          id="outlined-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>minimum</div>
                      <div style={{ width: "20%" }}>
                        <TextField
                          size="small"
                          id="outlined-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>maximum</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Affected start times</h6>
                  <span
                    style={{
                      fontStyle: "italic",
                      paddingBottom: "5px",
                      fontSize: "15px",
                    }}
                  >
                    Select all start times
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel control={<Switch />} />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Button onClick={handleClose} variant="outlined">
                  Back
                </Button>
                <Button
                  variant="contained"
                  // onClick={() => {
                  //   createMeetingPoint();
                  // }}
                >
                  Continue
                </Button>
              </div>
            </Box>
          </Modal> */}
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflowY: "scroll" }}
          >
            <Box sx={style}>
              <div style={{ borderBottom: "1px solid", padding: "10px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add availability
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ padding: "25px" }}>
                  <h6>Select the type of availability rule</h6>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div>This rule should</div>
                    <div style={{ width: "30%" }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Select date range</h6>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div>This rule applies from</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <div>to</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Affected days</h6>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontStyle: "italic",
                        paddingBottom: "5px",
                        fontSize: "15px",
                      }}
                    >
                      Select which days this availability rule applies to.
                    </span>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        paddingTop: "10px",
                      }}
                    >
                      <div style={buttonStyle}>M</div>
                      <div style={buttonStyle}>T</div>
                      <div style={buttonStyle}>W</div>
                      <div style={buttonStyle}>T</div>
                      <div style={buttonStyle}>F</div>
                      <div style={buttonStyle}>S</div>
                      <div style={buttonStyle}>S</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px", display: "flex", gap: "15px" }}>
                  <div style={{}}>
                    <h6>Participants (PAX)</h6>
                    <span
                      style={{
                        fontStyle: "italic",
                        paddingBottom: "5px",
                        fontSize: "15px",
                      }}
                    >
                      The experience will only be bookable if minimum
                      participants is met.
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        paddingTop: "5px",
                      }}
                    >
                      <div style={{ width: "20%" }}>
                        <TextField
                          size="small"
                          id="outlined-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>minimum</div>
                      <div style={{ width: "20%" }}>
                        <TextField
                          size="small"
                          id="outlined-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>maximum</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Affected start times</h6>
                  <span
                    style={{
                      fontStyle: "italic",
                      paddingBottom: "5px",
                      fontSize: "15px",
                    }}
                  >
                    Select all start times
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel control={<Switch />} />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Button onClick={handleClose} variant="outlined">
                  Back
                </Button>
                <Button
                  variant="contained"
                  // onClick={() => {
                  //   createMeetingPoint();
                  // }}
                >
                  Continue
                </Button>
              </div>
            </Box>
          </Modal> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflowY: "scroll" }}
          >
            <Box sx={style}>
              <div style={{ borderBottom: "1px solid", padding: "10px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add availability
                </Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <div style={{ padding: "25px" }}>
                  <h6>Select the type of availability rule</h6>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div>This rule should</div>
                    <div style={{ width: "30%" }}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories}
                        onChange={handleCategoryChange}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px", display: "flex", gap: "15px" }}>
                  <div style={{}}>
                    <h6>Participants (PAX)</h6>
                    <span
                      style={{
                        fontStyle: "italic",
                        paddingBottom: "5px",
                        fontSize: "15px",
                      }}
                    >
                      The experience will only be bookable if minimum
                      participants is met.
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        paddingTop: "5px",
                      }}
                    >
                      <div style={{ width: "20%" }}>
                        <TextField
                          size="small"
                          id="outlined-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>minimum</div>
                      <div style={{ width: "20%" }}>
                        <TextField
                          size="small"
                          id="outlined-number"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>maximum</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "25px" }}>
                  <h6>Affected start times</h6>
                  <span
                    style={{
                      fontStyle: "italic",
                      paddingBottom: "5px",
                      fontSize: "15px",
                    }}
                  >
                    Select all start times
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <>{renderSwitchForm()}</>
                    <FormGroup>
                      <FormControlLabel control={<Switch />} />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Button onClick={handleClose} variant="outlined">
                  Back
                </Button>
                <Button
                  variant="contained"
                  // onClick={() => {
                  //   createMeetingPoint();
                  // }}
                >
                  Continue
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

const categories = [
  { label: "Repeat weekly on selected days" },
  { label: "Repeat yearly during selected months" },
  { label: "happen beatween selected dates" },
  { label: "happen on a selected date" },
];

// const generateSundayEvents = (startDate, endDate) => {
//   const sundays = calculateSundays(startDate, endDate);

//   return sundays.map((sunday) => ({
//     id: createEventId(),
//     title: "Sunday",
//     start: sunday,
//   }));
// };

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "All-day event",
//     start: todayStr,
//   },
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: todayStr + "T12:00:00",
//   },
// ];

// const calculateSundays = (startDate, numberOfWeeks) => {
//   const sundays = [];
//   let currentDate = new Date(startDate);

//   for (let i = 0; i < numberOfWeeks * 7; i++) {
//     if (currentDate.getDay() === 0) {
//       sundays.push(currentDate.toISOString().split("T")[0]);
//     }
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   console.log(sundays);

//   return sundays;
// };

/**
 * 
 * 
 return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          // eventsSet={handleEvents}
          eventAdd={handleEventAdd}
        />
      </div>
    </div>
  );
 */
