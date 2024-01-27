import "./App.css";
import LoginPage from "./components/home/login";
import Sidebar from "./components/utils/sidebar";
import AddHotels from "./components/home/addHotels";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddVehicle from "./components/home/addVehicle";
import AddCategory from "./components/home/addCategory";
import AddActivity from "./components/home/addActivity";
import AddAdvanture from "./components/home/addAdvanture";
import AddHolidayPackage from "./components/home/addHolidayPackage";
import AddPolicy from "./components/home/policy";
import ManageDriver from "./components/home/manageDriver";
import ManageOffer from "./components/home/manageOffer";
import ManageSeasonality from "./components/home/manageSeasonality";
import ManageVendor from "./components/home/manageVendor";
import Titel from "./components/activityComponents/titel";
import Duration from "./components/activityComponents/duration";
import Categories from "./components/activityComponents/categories";
import Location from "./components/activityComponents/location";
import Description from "./components/activityComponents/description";
import Photos from "./components/activityComponents/photos";
import Videos from "./components/activityComponents/video";
import Inclusions from "./components/activityComponents/Inclusions";
import Exclusions from "./components/activityComponents/exclusions";
import TimeDatePass from "./components/activityComponents/timeDatePass";
import OpeningHours from "./components/activityComponents/openingHours";
import BookingCutoff from "./components/activityComponents/bookingCutoff";
import BookingOpeningDate from "./components/activityComponents/bookingOpeningDate";
import Capacity from "./components/activityComponents/capacity";
import StartTime from "./components/activityComponents/startTime";
import ActivityLayout from "./components/utils/ActivityLayout";
import PricingCategories from "./components/activityComponents/pricingCategories";
import Rates from "./components/activityComponents/rates";
import Pricing from "./components/activityComponents/pricing";
import MeetingPickup from "./components/activityComponents/meetingPickup";
import MeetingPoint from "./components/activityComponents/meetingPoint";
import Calender from "./components/activityComponents/Calender";

function App() {
  return (
    <Router>
      <div>
        <Sidebar>
          {/* {!isLoginOrRegisterRoute() && <Navbar />} */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/addHotels" element={<AddHotels />} />
            <Route path="/addVehicle" element={<AddVehicle />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/addActivity" element={<AddActivity />} />
            <Route path="/addAdvanture" element={<AddAdvanture />} />
            <Route path="/addHolidayPackage" element={<AddHolidayPackage />} />
            <Route path="/policy" element={<AddPolicy />} />
            <Route path="/manageDriver" element={<ManageDriver />} />
            <Route path="/manageOffer" element={<ManageOffer />} />
            <Route path="/manageSeasonality" element={<ManageSeasonality />} />
            <Route path="/manageVendor" element={<ManageVendor />} />

            <Route
              path="/titel"
              element={
                <ActivityLayout>
                  <Titel />
                </ActivityLayout>
              }
            />
            <Route
              path="/duration"
              element={
                <ActivityLayout>
                  <Duration />
                </ActivityLayout>
              }
            />
            <Route
              path="/categories"
              element={
                <ActivityLayout>
                  <Categories />
                </ActivityLayout>
              }
            />
            <Route
              path="/location"
              element={
                <ActivityLayout>
                  <Location />
                </ActivityLayout>
              }
            />
            <Route
              path="/description"
              element={
                <ActivityLayout>
                  <Description />
                </ActivityLayout>
              }
            />
            <Route
              path="/photos"
              element={
                <ActivityLayout>
                  <Photos />
                </ActivityLayout>
              }
            />
            <Route
              path="/videos"
              element={
                <ActivityLayout>
                  <Videos />
                </ActivityLayout>
              }
            />
            <Route
              path="/inclusions"
              element={
                <ActivityLayout>
                  <Inclusions />
                </ActivityLayout>
              }
            />
            <Route
              path="/exclusions"
              element={
                <ActivityLayout>
                  <Exclusions />
                </ActivityLayout>
              }
            />
            <Route
              path="/timeDatePass"
              element={
                <ActivityLayout>
                  <TimeDatePass />
                </ActivityLayout>
              }
            />
            <Route
              path="/openingHours"
              element={
                <ActivityLayout>
                  <OpeningHours />
                </ActivityLayout>
              }
            />
            <Route
              path="/bookingCutoff"
              element={
                <ActivityLayout>
                  <BookingCutoff />
                </ActivityLayout>
              }
            />
            {/* <Route
              path="/bookingOpeningDate"
              element={
                <ActivityLayout>
                  <BookingOpeningDate />
                </ActivityLayout>
              }
            /> */}
            <Route
              path="/capacity"
              element={
                <ActivityLayout>
                  <Capacity />
                </ActivityLayout>
              }
            />
            <Route
              path="/startTime"
              element={
                <ActivityLayout>
                  <StartTime />
                </ActivityLayout>
              }
            />
            <Route
              path="/calendar"
              element={
                <ActivityLayout>
                  <Calender />
                </ActivityLayout>
              }
            />
            <Route
              path="/pricingCategories"
              element={
                <ActivityLayout>
                  <PricingCategories />
                </ActivityLayout>
              }
            />
            <Route
              path="/rates"
              element={
                <ActivityLayout>
                  <Rates />
                </ActivityLayout>
              }
            />
            <Route
              path="/pricing"
              element={
                <ActivityLayout>
                  <Pricing />
                </ActivityLayout>
              }
            />
            <Route
              path="/meetingPickup"
              element={
                <ActivityLayout>
                  <MeetingPickup />
                </ActivityLayout>
              }
            />
            <Route
              path="/meetingPoint"
              element={
                <ActivityLayout>
                  <MeetingPoint />
                </ActivityLayout>
              }
            />
          </Routes>
        </Sidebar>
        {/* {!isLoginOrRegisterRoute() && <Footer />} */}
      </div>
    </Router>
  );
}

export default App;
