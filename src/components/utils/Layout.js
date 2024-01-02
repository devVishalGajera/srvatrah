import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./components/home/login";
import Sidebar from "./components/utils/sidebar";
import AddHotels from "./components/home/addHotels";

import AddVehicle from './components/home/addVehicle';
import AddCategory from './components/home/addCategory';
import AddActivity from './components/home/addActivity';
import AddAdvanture from './components/home/addAdvanture';
import AddHolidayPackage from './components/home/addHolidayPackage';
import AddPolicy from './components/home/policy';
import ManageDriver from './components/home/manageDriver';
import ManageOffer from './components/home/manageOffer';
import ManageSeasonality from './components/home/manageSeasonality';
import ManageVendor from './components/home/manageVendor';

const Layout = () => {
  return (
    <>
        {/* <Routes> */}
          {/* <Route path='/login' element={<LoginPage />} />
          <Route path='/addHotels' element={<Sidebar><AddHotels /></Sidebar>} />
          <Route path='/addVehicle' element={<Sidebar><AddVehicle /></Sidebar>} />
          <Route path='/addCategory' element={<Sidebar><AddCategory /></Sidebar>} />
          <Route path='/addActivity' element={<Sidebar><AddActivity /></Sidebar>} />
          <Route path='/addAdvanture' element={<Sidebar><AddAdvanture /></Sidebar>} />
          <Route path='/addHolidayPackage' element={<Sidebar><AddHolidayPackage /></Sidebar>} />
          <Route path='/policy' element={<Sidebar><AddPolicy /></Sidebar>} />
          <Route path='/manageDriver' element={<Sidebar><ManageDriver /></Sidebar>} />
          <Route path='/manageOffer' element={<Sidebar><ManageOffer /></Sidebar>} />
          <Route path='/manageSeasonality' element={<Sidebar><ManageSeasonality /></Sidebar>} />
          <Route path='/manageVendor' element={<Sidebar><ManageVendor /></Sidebar>} /> */}
        {/* </Routes> */}
    </>
  )
}

export default Layout;
