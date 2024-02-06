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
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import rrulePlugin from "@fullcalendar/rrule";

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
const daysArray = [
  {
    label: "Sunday",
    value: "su",
  },
  {
    label: "Monday",
    value: "mo",
  },
  {
    label: "Tuesday",
    value: "tu",
  },
  {
    label: "Wednesday",
    value: "we",
  },
  {
    label: "Thursday",
    value: "th",
  },
  {
    label: "Friday",
    value: "fr",
  },
  {
    label: "Saturday",
    value: "sa",
  },
];
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

const RecurringTypes = {
  WEEKLY: "weekly",
  SPECIFIC_DATE: "specific_date",
  BETWEEN_TWO_DATES: "between_two_dates",
  MONTHLY_SELECTED_DAYS: "monthly_selected_days",
};

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, "");
let nextDayStr = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

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
const todayDate = new Date();

function createEventId() {
  return String(eventGuid++);
}
const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const localId = localStorage.getItem("_id");
  const [experienceId, setExperienceId] = useState(localId ? localId : null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    "happen on a selected date"
  );
  const [participant, setParticipant] = useState({
    minimum: 1,
    maximum: 100,
  });
  const [experienceTiming, setExperienceTiming] = useState({
    startTime: "",
    endTime: "",
  });
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [isEventAllTime, setIsEventAllTime] = useState(false);
  const [eventType, setEventType] = useState(RecurringTypes.WEEKLY);
  const [startTime, setStartTime] = useState([]);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const [currentSelectedStartTime, setCurrentStartTime] = useState([]);
  const [currentSelectedInfo, setCurrentSelectInfo] = useState({});
  const [deleteEventModal, setDeleteEventModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory("happen on a selected date");
  };

  useEffect(() => {
    if (!experienceId && experienceId.length === 0) {
      alert("please add titel and categories");
      navigate("/titel");
      return;
    }
    (async function () {
      const response = await fetch(
        "http://localhost:3232/experience/" + experienceId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseJson = await response.json();
      const { calender_events } = responseJson;
      if (calender_events && calender_events.length > 0) {
        const events = calender_events.map((item) => item.event);
        setCurrentEvents(events);
      }
    })();
    getStartTIme();
  }, []);
  const getStartTIme = async () => {
    const response = await fetch(
      "http://localhost:3232/experience/" + experienceId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { start_time } = await response.json();
    if (start_time && start_time.length > 0) {
      console.log(start_time, "start_time");
      setStartTime(start_time);
      setCurrentStartTime(start_time[0]);
      return;
    }
    alert("Start time not found please add start time");
    navigate("/startTime");
  };
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    handleOpen();
    // setCurrentSelectInfo(selectInfo);
    // // let title = prompt("Please enter a new title for your event");
    // let calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect();
  };

  const handleEventClick = (clickInfo) => {
    setDeleteEventModal(true);
    setCurrentSelectInfo(clickInfo);
  };
  const deleteEvent = () => {
    setDeleteEventModal(false);
    const events = currentEvents.filter(
      (event) => event.id !== currentSelectedInfo.event.id
    );
    setCurrentEvents(events);
  };
  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <i>
        {eventInfo.event?.start_time
          ? startTime.find((time) => time._id === eventInfo.event?.start_time)
              .start_time
          : ""}
      </i>
    </>
  );
  const calendarStyle = {
    maxWidth: "100%",
    margin: "auto",
  };
  const handleEventAdd = (event) => {};
  const handleOnFormSubmit = async () => {
    const data = currentEvents;
    const result = await fetch(
      "http://localhost:3232/experience/" + experienceId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await result.json();
    console.log(response, "response");
    navigate("/pricingCategories", {
      state: {
        ...response,
      },
    });
  };

  const handleParticipantChange = (event, type) => {
    setParticipant((prev) => ({
      ...prev,
      [type]: event.target.value,
    }));
  };
  const handleBackendEventAdd = async (event) => {
    const data = {
      event: event,
    };
    const result = await fetch(
      "http://localhost:3232/experience/" + experienceId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await result.json();
    console.log(response, "response");
  };
  const subMitingData = async (formVal, type = RecurringTypes.WEEKLY) => {
    console.log(formVal, "formVal");
    let startStr = startTime.find((time) => {
      if (time && formVal.start_time.includes(time._id)) {
        return true;
      }
    });
    let startHoursArr = [];
    let startMinutesArr = [];
    for (let i = 0; i < startTime?.length; i++) {
      if (startTime[i] && formVal.start_time.includes(startTime[i]._id)) {
        const [startHours, startMinutes] = startTime[i].start_time.split(":");
        startHoursArr.push(startHours);
        startMinutesArr.push(startMinutes);
      }
    }
    startStr = startStr ? startStr.start_time : "";
    const todayStrWithTime = `${todayStr}T${startStr}`;
    switch (type) {
      case RecurringTypes.WEEKLY:
        const days = [];
        formVal.days.forEach((day) => {
          if (day && day.length > 0) {
            days.push(day.join(""));
          }
        });
        const backendEvent = {
          title: "my recurring event",
          rrule: {
            freq: "weekly",
            interval: 1,
            byweekday: days,
            dtstart: todayStrWithTime,
            until: formVal.endDate ? formVal.endDate : "2025-06-01",
            byhour: startHoursArr.map((hour) => parseInt(hour)),
          },
          start_time: formVal.start_time,
          participant: formVal.participant,
        };
        handleBackendEventAdd(backendEvent);
        setCurrentEvents([backendEvent]);
        return backendEvent;
      case RecurringTypes.MONTHLY:
        console.log(formVal, "formVal");
        const monthlyEvent = {
          title: "my recurring event",
          rrule: {
            freq: "monthly",
            interval: 1,
            bymonthday: formVal.days,
            dtstart: todayStrWithTime,
            until: formVal.endDate ? formVal.endDate : "2025-06-01",
            byhour: startHoursArr.map((hour) => parseInt(hour)),
          },
          start_time: formVal.start_time,
          participant: formVal.participant,
        };
        handleBackendEventAdd(monthlyEvent);
        console.log(monthlyEvent, "backendEvent");
        setCurrentEvents((prev) => [...prev, monthlyEvent]);
        return;
      case RecurringTypes.SPECIFIC_DATE:
        console.log(formVal, "formVal00000000000");
        const specificEvent = {
          title: startTime.find((time) => time._id === formVal.start_time),
          rrule: {
            freq: "daily",
            interval: 1,
            dtstart: todayStrWithTime,
            byhour: startHoursArr.map((hour) => parseInt(hour)),
            count: startHoursArr.length,
          },
          start_time: formVal.start_time,
          participant: formVal.participant,
        };

        console.log(specificEvent, "backendEvent");
        setCurrentEvents([specificEvent]);
        return;
      case RecurringTypes.BETWEEN_TWO_DATES:
        console.log(formVal, "formVal");
        const startTimestr = `${new Date(formVal.startDate)
          .toString()
          .replace(/T.*$/, "")}T${startStr}`;
        const betweenEvent = {
          title: startTime.find((time) => time._id === formVal.start_time),
          rrule: {
            freq: "daily",
            interval: 1,
            dtstart: new Date(formVal.startDate),
            until: formVal.endDate,
            byhour: startHoursArr.map((hour) => parseInt(hour)),
          },
          start_time: formVal.start_time,
          participant: formVal.participant,
        };
        console.log(betweenEvent, "backendEvent");
        setCurrentEvents([betweenEvent]);
    }
  };

  const renderSwitchForm = () => {
    switch (selectedCategory) {
      case "Repeat weekly on selected days":
        return (
          <Formik
            initialValues={{
              days: [],
              participant: { minimum: 0, maximum: 100 },
              start_time: startTime[0]._id,
            }}
            validationSchema={Yup.object({
              days: Yup.array()
                .min(1, "Select at least one day")
                .required("Days are required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              // console.log(values, "values");
              if (!values.start_time) {
                values.start_time = startTime[0]._id;
              }
              subMitingData(values);
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue }) => (
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
                  <FieldArray name="days">
                    {({ form, push, remove }) => (
                      <>
                        {daysArray.map((day, index) => (
                          <div key={index}>
                            <Field
                              type="checkbox"
                              name={`days.${index}`}
                              value={day.value}
                            />
                            {day.label}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                  <div>
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
                          value={values.participant?.minimum || 0}
                          onChange={(e) =>
                            setFieldValue("participant.minimum", e.target.value)
                          }
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
                          value={values.participant?.maximum}
                          onChange={(e) =>
                            setFieldValue("participant.maximum", e.target.value)
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>maximum</div>
                    </div>
                    {/*display start Time checkBox*/}
                    <div>
                      <h6>Select all start times</h6>
                      <FieldArray name="start_time">
                        {({ form, push, remove }) => (
                          <>
                            {startTime.map((time, index) => (
                              <div key={index}>
                                <Field
                                  type="checkbox"
                                  name={`start_time.${index}`}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const timeId = time._id;
                                    const startTimes = values.start_time || [];
                                    console.log(startTimes, "startTimes");
                                    if (
                                      isChecked &&
                                      !startTimes.includes(timeId)
                                    ) {
                                      setFieldValue("start_time", [
                                        ...startTimes,
                                        timeId,
                                      ]);
                                    } else if (
                                      !isChecked &&
                                      startTimes.includes(timeId)
                                    ) {
                                      setFieldValue(
                                        "start_time",
                                        startTimes.filter((id) => id !== timeId)
                                      );
                                    }
                                  }}
                                  checked={
                                    values.start_time
                                      ? values.start_time.includes(time._id)
                                      : false
                                  }
                                />
                                {time.start_time}
                              </div>
                            ))}
                          </>
                        )}
                      </FieldArray>

                      {/* <FieldArray name="start_time">
                        {({ form, push, remove }) => (
                          <>
                            {startTime.map((time, index) => (
                              <div key={index}>
                                <Field
                                  type="checkbox"
                                  name={`start_time.${index}`}
                                  onChange={(e) => {
                                    if (
                                      !values?.start_time &&
                                      e.target.checked
                                    ) {
                                      push(time._id);
                                      return;
                                    }
                                    if (
                                      values.start_time &&
                                      values?.start_time.includes(time._id)
                                    ) {
                                      remove(
                                        values?.start_time.indexOf(time._id)
                                      );
                                      return;
                                    }
                                    if (e.target.checked) {
                                      push(time._id);
                                    }
                                  }}
                                />
                                {time.start_time}
                              </div>
                            ))}
                          </>
                        )}
                      </FieldArray> */}
                    </div>
                  </div>
                  <button type="submit">Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        );

      case "Repeat yearly during selected months":
        return (
          <Formik
            initialValues={{
              months: [],
              participant: { minimum: 0, maximum: 100 },
              start_time: startTime[0]._id,
            }}
            validationSchema={Yup.object({
              months: Yup.array()
                .min(1, "Select at least one month")
                .required("Months are required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              if (!values.start_time) {
                values.start_time = startTime[0]._id;
              }
              subMitingData(values, RecurringTypes.MONTHLY_SELECTED_DAYS);
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue }) => (
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
                <FormControl fullWidth>
                  <InputLabel htmlFor="months">Affected Months</InputLabel>
                  <Select
                    multiple
                    name="months"
                    value={values.months || []}
                    onChange={(e) => setFieldValue("months", e.target.value)}
                    label="Affected Months"
                  >
                    {monthArray.map((month, index) => (
                      <MenuItem key={index} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <h6>Affected days</h6>
                <FieldArray name="days">
                  {({ form, push, remove }) => (
                    <>
                      {daysArray.map((day, index) => (
                        <div key={index}>
                          <Field
                            type="checkbox"
                            name={`days.${index}`}
                            value={day.value}
                          />
                          {day.label}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
                <div>
                  <h6>Participants (PAX)</h6>
                  <span
                    style={{
                      fontStyle: "italic",
                      paddingBottom: "5px",
                      fontSize: "15px",
                    }}
                  >
                    The experience will only be bookable if minimum participants
                    is met.
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
                        value={values.participant?.minimum}
                        onChange={(e) =>
                          setFieldValue("participant.minimum", e.target.value)
                        }
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
                        value={values.participant?.maximum}
                        onChange={(e) =>
                          setFieldValue("participant.maximum", e.target.value)
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <div>maximum</div>
                  </div>
                </div>
                <div>
                  <h6>Select all start times</h6>

                  <FieldArray name="start_time">
                    {({ form, push, remove }) => (
                      <>
                        {startTime.map((time, index) => (
                          <div key={index}>
                            <Field
                              type="checkbox"
                              name={`start_time.${index}`}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const timeId = time._id;
                                const startTimes = values.start_time || [];
                                console.log(startTimes, "startTimes");
                                if (isChecked && !startTimes.includes(timeId)) {
                                  setFieldValue("start_time", [
                                    ...startTimes,
                                    timeId,
                                  ]);
                                } else if (
                                  !isChecked &&
                                  startTimes.includes(timeId)
                                ) {
                                  setFieldValue(
                                    "start_time",
                                    startTimes.filter((id) => id !== timeId)
                                  );
                                }
                              }}
                              checked={
                                values.start_time
                                  ? values.start_time.includes(time._id)
                                  : false
                              }
                            />
                            {time.start_time}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        );

      case "happen beatween selected dates":
        return (
          <Formik
            initialValues={{
              startDate: null,
              endDate: null,
              participant: { minimum: 0, maximum: 100 },
            }}
            validationSchema={Yup.object({
              startDate: Yup.date().required("Start date is required"),
              endDate: Yup.date()
                .min(Yup.ref("startDate"), "End date must be after start date")
                .required("End date is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              if (!values.start_time) {
                values.start_time = startTime[0]._id;
              }
              subMitingData(values, RecurringTypes.BETWEEN_TWO_DATES);
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form style={{ padding: "25px" }}>
                <h6>Affected dates</h6>
                <span
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  Select which dates this availability rule applies to.
                </span>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start date"
                        onChange={(newValue) => {
                          setFieldValue("startDate", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField>{params.inputProps.value}</TextField>
                        )}
                        value={values.startDate || ""}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="End date"
                        onChange={(newValue) => {
                          setFieldValue("endDate", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField>{params.inputProps.value}</TextField>
                        )}
                        value={values.endDate || null}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <h6>Participants (PAX)</h6>
                  <span
                    style={{
                      fontStyle: "italic",
                      paddingBottom: "5px",
                      fontSize: "15px",
                    }}
                  >
                    The experience will only be bookable if minimum participants
                    are met.
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
                      <Field name="participant.minimum">
                        {({ field }) => (
                          <TextField
                            size="small"
                            id="outlined-number"
                            type="number"
                            {...field}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => {
                              if (e.target.value > values.participant.maximum) {
                                setFieldValue(
                                  "participant.maximum",
                                  e.target.value
                                );
                              }
                            }}
                            value={values.participant?.minimum || 0}
                          />
                        )}
                      </Field>
                    </div>
                    <div>minimum</div>
                    <div style={{ width: "20%" }}>
                      <Field name="participant.maximum">
                        {({ field }) => (
                          <TextField
                            size="small"
                            id="outlined-number"
                            type="number"
                            {...field}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value < values?.participant?.minimum
                              ) {
                                setFieldValue(
                                  "participant.minimum",
                                  e.target.value
                                );
                              }
                            }}
                            value={values?.participant?.maximum || 100}
                          />
                        )}
                      </Field>
                    </div>
                    <div>maximum</div>
                  </div>

                  <div>
                    <h6>Select all start times</h6>
                    <FieldArray name="start_time">
                      {({ form, push, remove }) => (
                        <>
                          {startTime.map((time, index) => (
                            <div key={index}>
                              <Field
                                type="checkbox"
                                name={`start_time.${index}`}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const timeId = time._id;
                                  const startTimes = values.start_time || [];
                                  console.log(startTimes, "startTimes");
                                  if (
                                    isChecked &&
                                    !startTimes.includes(timeId)
                                  ) {
                                    setFieldValue("start_time", [
                                      ...startTimes,
                                      timeId,
                                    ]);
                                  } else if (
                                    !isChecked &&
                                    startTimes.includes(timeId)
                                  ) {
                                    setFieldValue(
                                      "start_time",
                                      startTimes.filter((id) => id !== timeId)
                                    );
                                  }
                                }}
                                checked={
                                  values.start_time
                                    ? values.start_time.includes(time._id)
                                    : false
                                }
                              />
                              {time.start_time}
                            </div>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        );

      // return (
      //   <Formik
      //     initialValues={{
      //       startDate: "",
      //       endDate: "",
      //       participant: { minimum: 0, maximum: 100 },
      //     }}
      //     validationSchema={Yup.object({
      //       startDate: Yup.date().required("Start date is required"),
      //       endDate: Yup.date()
      //         .min(Yup.ref("startDate"), "End date must be after start date")
      //         .required("End date is required"),
      //     })}
      //     onSubmit={(values, { setSubmitting }) => {
      //       console.log(values);
      //       if (!values.start_time) {
      //         values.start_time = startTime[0]._id;
      //       }
      //       subMitingData(
      //         values,
      //         RecurringTypes.happen_beetween_selected_dates
      //       );
      //       setSubmitting(false);
      //     }}
      //   >
      //     {({ values, setFieldValue }) => (
      //       <Form style={{ padding: "25px" }}>
      //         <h6>Affected dates</h6>
      //         <span
      //           style={{
      //             fontStyle: "italic",
      //           }}
      //         >
      //           Select which dates this availability rule applies to.
      //         </span>
      //         <div
      //           style={{
      //             display: "flex",
      //           }}
      //         >
      //           <LocalizationProvider dateAdapter={AdapterDayjs}>
      //             <DemoContainer components={["DatePicker"]}>
      //               <DatePicker
      //                 label="Start date"
      //                 value={values.startDate}
      //                 onChange={(newValue) => {
      //                   setFieldValue("startDate", newValue);
      //                 }}
      //                 renderInput={(params) => (
      //                   <TextField>{params.inputProps.value}</TextField>
      //                 )}
      //               />
      //             </DemoContainer>
      //           </LocalizationProvider>
      //           <LocalizationProvider dateAdapter={AdapterDayjs}>
      //             <DemoContainer components={["DatePicker"]}>
      //               <DatePicker
      //                 label="End date"
      //                 value={values.endDate}
      //                 onChange={(newValue) => {
      //                   setFieldValue("endDate", newValue);
      //                 }}
      //                 renderInput={(params) => (
      //                   <TextField>{params.inputProps.value}</TextField>
      //                 )}
      //               />
      //             </DemoContainer>
      //           </LocalizationProvider>
      //         </div>
      //         <div>
      //           <h6>Participants (PAX)</h6>
      //           <span
      //             style={{
      //               fontStyle: "italic",
      //               paddingBottom: "5px",
      //               fontSize: "15px",
      //             }}
      //           >
      //             The experience will only be bookable if minimum participants
      //             are met.
      //           </span>
      //           <div
      //             style={{
      //               display: "flex",
      //               alignItems: "center",
      //               gap: "15px",
      //               paddingTop: "5px",
      //             }}
      //           >
      //             <div style={{ width: "20%" }}>
      //               <Field
      //                 type="number"
      //                 name="participant.minimum"
      //                 render={({ field, meta }) => (
      //                   <TextField
      //                     size="small"
      //                     id="outlined-number"
      //                     type="number"
      //                     {...field}
      //                     InputLabelProps={{
      //                       shrink: true,
      //                     }}
      //                     onChange={(e) => {
      //                       if (e.target.value > values.participant.maximum) {
      //                         setFieldValue(
      //                           "participant.maximum",
      //                           e.target.value
      //                         );
      //                       }
      //                     }}
      //                     value={values.participant.minimum}
      //                   />
      //                 )}
      //               />
      //             </div>
      //             <div>minimum</div>
      //             <div style={{ width: "20%" }}>
      //               <Field
      //                 type="number"
      //                 name="participant.maximum"
      //                 render={({ field }) => (
      //                   <TextField
      //                     size="small"
      //                     id="outlined-number"
      //                     type="number"
      //                     {...field}
      //                     InputLabelProps={{
      //                       shrink: true,
      //                     }}
      //                     onChange={(e) => {
      //                       if (e.target.value < values.participant.minimum) {
      //                         setFieldValue(
      //                           "participant.minimum",
      //                           e.target.value
      //                         );
      //                       }
      //                     }}
      //                     value={values.participant.maximum}
      //                   />
      //                 )}
      //               />
      //             </div>
      //             <div>maximum</div>
      //           </div>

      //           <div>
      //             <h6>Select all start times</h6>
      //             <FieldArray name="start_time">
      //               {({ form, push, remove }) => (
      //                 <>
      //                   {startTime.map((time, index) => (
      //                     <div key={index}>
      //                       <Field
      //                         type="checkbox"
      //                         name={`start_time.${index}`}
      //                         onChange={(e) => {
      //                           const isChecked = e.target.checked;
      //                           const timeId = time._id;
      //                           const startTimes = values.start_time || [];
      //                           console.log(startTimes, "startTimes");
      //                           if (
      //                             isChecked &&
      //                             !startTimes.includes(timeId)
      //                           ) {
      //                             setFieldValue("start_time", [
      //                               ...startTimes,
      //                               timeId,
      //                             ]);
      //                           } else if (
      //                             !isChecked &&
      //                             startTimes.includes(timeId)
      //                           ) {
      //                             setFieldValue(
      //                               "start_time",
      //                               startTimes.filter((id) => id !== timeId)
      //                             );
      //                           }
      //                         }}
      //                         checked={
      //                           values.start_time
      //                             ? values.start_time.includes(time._id)
      //                             : false
      //                         }
      //                       />
      //                       {time.start_time}
      //                     </div>
      //                   ))}
      //                 </>
      //               )}
      //             </FieldArray>
      //           </div>
      //         </div>
      //         <button type="submit">Submit</button>
      //       </Form>
      //     )}
      //   </Formik>
      // );

      case "happen on a selected date":
        return (
          <Formik
            initialValues={{ selectedDate: selectedDate }}
            validationSchema={Yup.object({
              selectedDate: Yup.date().required("Date is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              if (!values.start_time) {
                values.start_time = startTime[0]._id;
              }
              subMitingData(values, RecurringTypes.SPECIFIC_DATE);
            }}
          >
            {({ values, setFieldValue }) => (
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        name="selectedDate"
                        value={dayjs(selectedDate)}
                        onChange={(date) => {
                          setFieldValue("selectedDate", date);
                          setSelectedDate(date);
                        }}
                        // slotProps={{ textField: { size: "small" } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch />}
                      label="Switch"
                      name="switch"
                      onChange={(e) => setIsEventAllTime(e.target.checked)}
                      checked={isEventAllTime}
                      // Handle switch state here if needed
                    />
                  </FormGroup>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "40px",
                  }}
                >
                  <div>
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
                          value={values.participant?.minimum || 0}
                          onChange={(e) =>
                            setFieldValue("participant.minimum", e.target.value)
                          }
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
                          value={values.participant?.maximum}
                          onChange={(e) =>
                            setFieldValue("participant.maximum", e.target.value)
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div>maximum</div>
                    </div>
                    {/*display start Time checkBox*/}
                    <div>
                      <h6>Select all start times</h6>

                      <FieldArray name="start_time">
                        {({ form, push, remove }) => (
                          <>
                            {startTime.map((time, index) => (
                              <div key={index}>
                                <Field
                                  type="checkbox"
                                  name={`start_time.${index}`}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const timeId = time._id;
                                    const startTimes = values.start_time || [];
                                    console.log(startTimes, "startTimes");
                                    if (
                                      isChecked &&
                                      !startTimes.includes(timeId)
                                    ) {
                                      setFieldValue("start_time", [
                                        ...startTimes,
                                        timeId,
                                      ]);
                                    } else if (
                                      !isChecked &&
                                      startTimes.includes(timeId)
                                    ) {
                                      setFieldValue(
                                        "start_time",
                                        startTimes.filter((id) => id !== timeId)
                                      );
                                    }
                                  }}
                                  checked={
                                    values.start_time
                                      ? values.start_time.includes(time._id)
                                      : false
                                  }
                                />
                                {time.start_time}
                              </div>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <button type="submit">Submit</button>

                  <Button onClick={handleClose} variant="outlined">
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"

                    // onClick={onSubmit}
                    // onClick={() => {
                    //   createMeetingPoint();
                    // }}
                  >
                    Continue
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        );
      default:
        return null;
    }
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <Button onClick={handleOpen} variant="outlined">
          open
        </Button>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            rrulePlugin,
          ]}
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
          eventDisplay="block"
          weekends={weekendsVisible}
          events={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          // eventsSet={handleEvents}
          eventAdd={handleEventAdd}
        />
        <div>
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
                        value={selectedCategory}
                        size="small"
                        renderInput={(params) => <TextField {...params} />}
                      />
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
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <RadioGroup
                            onChange={(e) => {
                              setCurrentStartTime(e.target.value);
                            }}
                            value={currentSelectedStartTime}
                          >
                            {startTime && startTime.length > 0
                              ? startTime.map((item, index) => {
                                  <Radio key={index} value={item} />;
                                })
                              : null}
                          </RadioGroup>
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        <Modal
          open={deleteEventModal}
          onClose={() => setDeleteEventModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflowY: "scroll" }}
        >
          <div>
            <div style={{ padding: "25px" }}>
              <h6>Are you sure you want to delete this event?</h6>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={() => setDeleteEventModal(false)}
                variant="outlined"
              >
                Back
              </Button>
              <Button variant="contained" onClick={deleteEvent}>
                Continue
              </Button>
            </div>
          </div>
        </Modal>
        <Button onClick={handleOnFormSubmit}>Countinue </Button>
      </div>
    </div>
  );
};

export default Calendar;
const categories = [
  "Repeat weekly on selected days",
  "Repeat yearly during selected months",
  "happen beatween selected dates",
  "happen on a selected date",
];
