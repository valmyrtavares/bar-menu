import React from "react";
import CarrosselImages from "../component/carouselComponent";
import NestedBtn from "../component/nestedBtn";
import { getBtnData } from "../api/Api";
import MenuButton from "../component/menuHamburguerButton";
import RequestModal from "../component/Request/requestModal.js";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/mainMenu.css";
import { common } from "@mui/material/colors";
import { GlobalContext } from "../GlobalContext";
import { CheckUser } from "../Helpers/Helpers.js";
import WarningMessage from "../component/WarningMessages";

function MainMenu() {
  // const [displayForm, setDisplayForm] = React.useState(false);
  const [menuButton, setMenuButton] = React.useState([]);
  const [dishes, setDishes] = React.useState([]);
  const [nameClient, serNameClient] = React.useState("");
  const containerRef = React.useRef(null);
  const global = React.useContext(GlobalContext);
  const [logoutAdminPopup, setLogoutAdminPopup] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!global.authorizated) {
      ChecLogin();
    }
    const fetchData = async () => {
      try {
        const [data, dataItem] = await Promise.all([
          getBtnData("button"),
          getBtnData("item"),
        ]);
        setMenuButton(data);
        setDishes(dataItem);
        grabClient();
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const logoutCustomer = () => {
    if (global.isToten) {
      if (logoutAdminPopup) {
        localStorage.removeItem("userMenu");
        ChecLogin();
      }
      setLogoutAdminPopup(true);
    }
  };
  async function ChecLogin() {
    const userId = await CheckUser("userMenu");
    navigate(userId);
  }

  function grabClient() {
    if (localStorage.hasOwnProperty("userMenu")) {
      const nameCustomer = JSON.parse(localStorage.getItem("userMenu"));
      let firstName = nameCustomer.name.split(" ")[0];
      firstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      serNameClient(firstName);
    }
  }

  return (
    <>
      <div className="WarningMessage-container">
        {logoutAdminPopup && (
          <WarningMessage
            message="Você está prestes a sair do sistema"
            setWarningMsg={setLogoutAdminPopup}
            sendRequestToKitchen={logoutCustomer}
          />
        )}
      </div>

      <div ref={containerRef} style={{ height: "500px", overflowY: "auto" }}>
        {true && <CarrosselImages />}
        <div className="container-btn">
          {nameClient && (
            <section>
              <div>
                <p onClick={logoutCustomer}>
                  Bem vindo <span>{nameClient}</span>
                </p>
              </div>
              <button>
                <Link to="/request">Seus Pedidos</Link>
              </button>
              <button>
                <Link to="/orderqueue">Fila de pedidos</Link>
              </button>
            </section>
          )}
          {menuButton &&
            dishes &&
            menuButton.map((item, index) => (
              <div key={index}>
                <NestedBtn
                  containerRef={containerRef}
                  parent={"main"}
                  item={item}
                  menuButton={menuButton}
                  dishes={dishes}
                />
              </div>
            ))}
        </div>
      </div>
      <Link to="/admin/admin">
        <div className="footer"></div>
      </Link>
    </>
  );
}
export default MainMenu;
