import React from "react";
import { getBtnData, deleteData } from "../../api/Api.js";
import { app } from "../../config-firebase/firebase.js";

import { fetchInDataChanges } from "../../api/Api.js";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import "../../assets/styles/RequestListToBePrepared.css";
import { Link } from "react-router-dom";
import {
  getFirstFourLetters,
  requestSorter,
  firstNameClient,
} from "../../Helpers/Helpers.js";
import RecipeModal from "./RecipeModal";
import { cardClasses } from "@mui/material";
import DefaultComumMessage from "../Messages/DefaultComumMessage";

const RequestListToBePrepared = () => {
  const db = getFirestore(app);

  const [requestsDoneList, setRequestDoneList] = React.useState([]);
  const [ShowDefaultMessage, setShowDefaultMessage] = React.useState(false);

  const [recipeModal, setRecipeModal] = React.useState({
    openModal: false,
    id: "",
  });

  // const { isOpen, toggle } = useModal();

  React.useEffect(() => {
    const unsubscribe = fetchInDataChanges("request", (data) => {
      let requestList = data.filter((item) => item.orderDelivered == false);
      requestList = requestSorter(requestList);
      setRequestDoneList(requestList);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserRequests = async () => {
    let requestList = await getBtnData("request");
    requestList = requestList.filter((item) => item.orderDelivered == false);
    requestList = requestSorter(requestList);
    setRequestDoneList(requestList);
  };

  const handleDeleteRequest = (id) => {
    deleteData("request", id);
    console.log("Pedido excluído:", id);
    setShowDefaultMessage(false); // Fecha o modal após excluir
  };

  const openModal = () => setShowDefaultMessage(true);

  const closeModal = () => {
    console.log("Estou chegando   ");

    setShowDefaultMessage(false);
  };

  const RequestDone = (item) => {
    item.done = false;
    setDoc(doc(db, "request", item.id), item)
      .then(() => {
        console.log("Document successfully updated !");
        fetchUserRequests();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeStatusPaid = (item) => {
    item.paymentDone = true;
    setDoc(doc(db, "request", item.id), item)
      .then(() => {
        console.log("Document successfully updated !");
        fetchUserRequests();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const orderDelivery = (item) => {
    if (item.name === "anonimo") {
      deleteData("user", item.idUser);
    }

    item.orderDelivered = true;
    setDoc(doc(db, "request", item.id), item)
      .then(() => {
        console.log("Document successfully updated !");
        fetchUserRequests();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container-btn-request">
        <Link className="all-request" to="/requestlistcheck">
          Todos os pedidos
        </Link>
      </div>
      {requestsDoneList &&
        requestsDoneList.map((item, itemIndex) => (
          <div className="container-requestListToBePrepared" key={item.id}>
            <div className="user-container">
              <div>
                <p>
                  <span>Nome</span> {firstNameClient(item.name)}
                </p>
                <p>
                  <span>Pedido</span>: {getFirstFourLetters(item.id, 4)} ;
                </p>
                <p>
                  <span>Mesa</span>: 12
                </p>
                <p>
                  <span>Data</span> {item.dateTime}
                </p>
                <h2>Valor final {item.finalPriceRequest}</h2>
              </div>
              <div className="btn-status">
                <button onClick={openModal} className="pendent">
                  Cancelar pedido
                </button>
                <div>
                  {ShowDefaultMessage && (
                    <DefaultComumMessage
                      msg="Você está prestes a excluir esse pedido"
                      onClose={closeModal}
                      onConfirm={() => handleDeleteRequest(item.id)}
                    />
                  )}
                </div>
                <button
                  className={item.paymentDone ? "done" : "pendent"}
                  onClick={() => changeStatusPaid(item)}
                >
                  Pago
                </button>
                <button
                  disabled={!item.paymentDone}
                  className={item.done ? "pendent" : "done"}
                  onClick={() => RequestDone(item)}
                >
                  Pronto
                </button>
                <button
                  disabled={item.done}
                  className={item.orderDelivered ? "done" : "pendent"}
                  onClick={() => orderDelivery(item)}
                >
                  Entregue
                </button>
              </div>
            </div>

            {item.request &&
              item.request.map((item, recipeIndex) => (
                <div className="request-item" key={recipeIndex}>
                  {recipeModal.openModal && (
                    <RecipeModal
                      setRecipeModal={setRecipeModal}
                      recipeModal={recipeModal}
                    />
                  )}
                  <div>
                    <h5>{item.name}</h5>
                    <p>{getFirstFourLetters(item.id, 4)}</p>
                    <h5>Acompanhamento</h5>
                    <div className="sideDishes-list">
                      {item.sideDishes && item.sideDishes.length > 0 ? (
                        item.sideDishes.map((item, index) => (
                          <p key={index}>{item.name},</p>
                        ))
                      ) : (
                        <p>Não tem acompanhamento</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <img src={item.image} alt="123" />
                    <button
                      // onClick={() => toggle(`${item.id}-${recipeIndex}`)}
                      onClick={() =>
                        setRecipeModal({ openModal: true, id: item.id })
                      }
                      className="btn btn-warning"
                    >
                      Receita
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      ;
    </div>
  );
};
export default RequestListToBePrepared;
