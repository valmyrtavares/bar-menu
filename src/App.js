import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainMenu from "./Pages/MainMenu";
import AddButtonForm from "./Forms/AddButtonForm";
import AddSideDishesForm from "./Forms/AddSideDishesForm";
import FormItem from "./Forms/AddDishesForm";
import Header from "./component/header";
import Signup from "./Forms/Login/signup";
import Login from "./Forms/Login/login";
import Admin from "./Pages/FormMenu";
import Protected from "./component/Protected";
import FormFrontImage from "./Forms/formFrontImage";
import ListToEditAndDelete from "./Forms/ListToEditAndDelete";
// import ProtectedUser from "./component/ProtectedUser";
import CreateCustomer from "./Forms/Login/createCustomer";
import RequestModal from "./component/Request/requestModal";
import ScreenStylesForm from "./Forms/ScreenStylesForm";
import WelcomeSaluteForm from "./Forms/WelcomeSaluteForm";
import RequestListToBePrepared from "./component/Request/RequestListToBePrepared";
import OrderQueue from "./component/orderQueue";
import RequestList from "./component/Request/RequestList";
import RecipeDish from "./Forms/recipeDishForm";
import CustomerList from "./component/Customers/customerList";
import NoLog from "./Forms/Login/NoLog";
import PrintRequestCustomer from "./component/Request/PrintRequestCustomer";

import "./style.css";

function App() {
  // const basename = "/bar-menu.io";
  const basename = "/";
  return (
    <div className="ultra-wrapper">
      <BrowserRouter basename={basename}>
        {true && <Header />}

        <Routes>
          <Route path="/" element={<MainMenu />} />
          {/* <Route path="/menu" element={<ProtectedUser />} /> */}
          <Route path="/create-customer" element={<CreateCustomer />} />
          <Route path="/request" element={<RequestModal />} />
          <Route path="/orderqueue" element={<OrderQueue />} />
          <Route path="/requestlistcheck" element={<RequestList />} />
          <Route path="/print" element={<PrintRequestCustomer />} />

          {/* <Route path="/admin/editButton" element={<EditFormButton />} /> */}
          <Route path="/requestlist" element={<RequestListToBePrepared />} />
          <Route
            path="/admin/EditButton/:id"
            element={<ListToEditAndDelete />}
          />
          <Route path="/admin/item" element={<FormItem />} />
          <Route path="/admin/recipedish" element={<RecipeDish />} />
          <Route path="/admin/category" element={<AddButtonForm />} />
          <Route path="/admin/customer" element={<CustomerList />} />
          {/* <Route
            path="/admin/SideDisehsInDishes"
            element={<NoNameSideDisehsInDishes />}
          /> */}
          <Route path="/admin/sidedishes" element={<AddSideDishesForm />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/check-customer-nolog" element={<NoLog />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin" element={<Protected />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/admin" element={<Admin />} />
          <Route path="/admin/frontimage" element={<FormFrontImage />} />
          <Route path="/admin/styles" element={<ScreenStylesForm />} />
          <Route path="/admin/welcome" element={<WelcomeSaluteForm />} />
          {/* <Route path="*" element={<Navigate to="/bar-menu.io" replace />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
