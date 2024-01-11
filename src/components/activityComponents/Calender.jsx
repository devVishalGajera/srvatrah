import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
const generateSundayEvents = (startDate, endDate) => {
  const sundays = calculateSundays(startDate, endDate);

  return sundays.map((sunday) => ({
    id: createEventId(),
    title: "Sunday",
    start: sunday,
  }));
};

const calculateSundays = (startDate, numberOfWeeks) => {
  const sundays = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < numberOfWeeks * 7; i++) {
    if (currentDate.getDay() === 0) {
      sundays.push(currentDate.toISOString().split("T")[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(sundays);

  return sundays;
};

const generateEventBasedOnWeekDays = (wekkDays, startDate, numberOfWeeks) => {
  const events = [];
  for (let i = 0; i < numberOfWeeks * 7; i++) {
    if (wekkDays.includes(new Date(startDate).getDay())) {
      events.push({
        id: createEventId(),
        title: "Event",
        start: new Date(startDate),
      });
    }
  }
  console.log(events);
  return events;
};

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
  },
];
//  ...generateSundayEvents(new Date(todayStr), 52), // Displaying Sundays for the next year (52 weeks)

function createEventId() {
  return String(eventGuid++);
}

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today // ...
    const events = generateEventBasedOnWeekDays([1, 2], todayStr, 52);
    console.log(events.length, "events");
    setCurrentEvents(...events);
  }, []);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

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
    console.log(event);
  };

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
          initialEvents={currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventAdd={handleEventAdd}
        />
      </div>
    </div>
  );
};

export default Calendar;
