import React from "react";
import Input from "../../component/Input.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../config-firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import "../../assets/styles/createCustomer.css";
import useFormValidation from "../../Hooks/useFormValidation.js";
// import { Link } from "react-router-dom";
import { getBtnData } from "../../api/Api.js";
// import { FormControlLabel } from "@mui/material";
import { CheckUser } from "../../Helpers/Helpers.js";
import Error from "../../component/error.js";
import CpfMessage from "../../component/CpfMessage";
import Keyboard from "../../component/Keyboard";

const CreateCustomer = () => {
  const navigate = useNavigate();
  const global = React.useContext(GlobalContext);
  const anonymousClient = React.useRef(null);
  const [cpfModal, setCpfModal] = React.useState(true);
  const [errorPopup, setErrorPopup] = React.useState(false);
  const { form, setForm, error, handleChange, handleBlur, clientFinded } =
    useFormValidation({
      name: "",
      phone: "",
      cpf: "",
      birthday: "",
      email: "",
    });

  const [welcome, setWelcome] = React.useState({
    salute: "",
    gift: "",
  });

  // *****************************IMPLEMENTAÇÃO DO TECLADO VIRTUAL

  // const [forms, setForms] = React.useState({ cpf: "" });
  const [showCpfKeyboard, setShowCpfKeyboard] = React.useState(false);
  //*************************************************************** */

  React.useEffect(() => {});

  React.useEffect(() => {
    if (form.name === "") {
      // Ativa o botão de "não quero deixar meus dados" quando o nome está vazio

      anonymousClient.current.disabled = false;
    } else {
      // Desativa o botão quando há dados no nome

      anonymousClient.current.disabled = true;
    }
  }, [form]);

  // FIRESTORE
  const db = getFirestore(app);

  React.useEffect(() => {
    async function CheckLogin() {
      const userId = await CheckUser("userMenu");
      if (userId === "/") {
        global.setAuthorizated(true);
        navigate(userId);
      }
    }
    const fetchSalut = async () => {
      const data = await getBtnData("welcomeCustomer");
      setWelcome(data[0]);
    };
    CheckLogin();
    fetchSalut();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    // Preenche o formulário com dados default se o nome estiver vazio
    const formToSubmit =
      form.name === ""
        ? {
            name: "anonimo",
            phone: "777",
            birthday: "77",
            email: "anonimo@anonimo.com",
          }
        : form;
    if (error.birthday || error.phone || error.cpf) {
      setErrorPopup(true);
    } else {
      // Envia o formulário para o Firestore
      addDoc(collection(db, "user"), formToSubmit)
        .then((docRef) => {
          global.setId(docRef.id); // Pega o id do cliente criado e manda para o meu useContext para vincular os pedidos ao cliente que os fez
          const currentUser = {
            id: docRef.id,
            name: formToSubmit.name,
          };
          localStorage.setItem("userMenu", JSON.stringify(currentUser));
          setForm({
            name: "",
            phone: "",
            birthday: "",
            email: "",
          });
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // function handleChange({ target }) {
  //   const { id, value } = target;

  //   // Chama handlePhoneChange para formatar e validar em tempo real
  //   if (id === "phone") {
  //     handlePhoneChange(value); // Formata o telefone em tempo real
  //     setForm((prevForm) => ({
  //       ...prevForm,
  //       [id]: value, // Atualiza o valor de phone no estado do formulário, se necessário
  //     }));
  //   }

  //   // Atualiza o estado do formulário com o valor formatado
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [id]: value,
  //   }));
  // }

  function handleAnonymousSubmit(event) {
    event.preventDefault();

    // Define dados default e envia para o Firestore
    const formWithDefaults = {
      name: "anonimo",
      phone: "777",
      birthday: "77",
      email: "anonimo@anonimo.com",
    };

    addDoc(collection(db, "user"), formWithDefaults)
      .then((docRef) => {
        global.setId(docRef.id); // Pega o id do cliente criado e manda para o meu useContext para vincular os pedidos ao cliente que os fez
        const currentUser = {
          id: docRef.id,
          name: formWithDefaults.name,
        };
        localStorage.setItem("userMenu", JSON.stringify(currentUser));
        setForm({
          name: "",
          phone: "",
          birthday: "",
          email: "",
          cpf: "",
        });
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // const handleFocus = () => {
  //   // Tenta abrir o teclado virtual
  //   const oskPath = "C:\\Windows\\System32\\osk.exe";
  //   window.open(oskPath); // Tenta abrir o teclado virtual

  //   // Adicionalmente, você pode tentar uma abordagem mais direta:
  // };

  // IMPLEMENTANDO TECLADO VIRTUAL  ********************************************************** */
  // const handleChanges = (e) => {
  //   const { value } = e.target;
  //   setForms((prevForm) => ({ ...prevForm, cpf: value }));
  // };

  const handleFocus = () => {
    setShowCpfKeyboard(true);
  };

  // Função chamada quando um número é clicado no teclado
  const addCharacterToCPF = (char) => {
    const newValue = form.cpf + char;
    const syntheticEvent = {
      target: {
        id: "cpf",
        value: newValue,
      },
    };
    handleChange(syntheticEvent);
  };

  const closeKeyboard = (cpfValue) => {
    setShowCpfKeyboard(false);
    const syntheticEvent = {
      target: {
        id: "cpf",
        value: cpfValue,
      },
    };
    handleBlur(syntheticEvent);
  };

  //******************************************************************

  return (
    <section className="welcome-message">
      <main>
        {welcome.salute && welcome.gift && <h1>Seja bem vindo</h1>}
        {welcome.salute && <p>{welcome.salute}</p>}
        {welcome.gift && <p>{welcome.gift}</p>}
      </main>
      <div className="create-new-customer-btns">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAnonymousSubmit}
          ref={anonymousClient}
        >
          Não quero deixar meus dados
        </button>
      </div>
      {errorPopup && <Error error={error} setErrorPopup={setErrorPopup} />}
      <form onSubmit={handleSubmit} className="m-1">
        <Input
          id="cpf"
          required
          label="CPF"
          value={form.cpf}
          type="text"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {showCpfKeyboard && (
          <Keyboard
            handleBlur={handleBlur}
            addCharacter={addCharacterToCPF}
            setShowCpfKeyboard={setShowCpfKeyboard}
            closeKeyboard={() => closeKeyboard(form.cpf)}
          />
        )}

        {error.cpf && <div className="error-form">{error.cpf}</div>}
        {clientFinded.length > 0 && cpfModal && (
          <CpfMessage
            clientFinded={clientFinded}
            cpf={form.cpf}
            setCpfModal={setCpfModal}
          />
        )}
        <Input
          id="name"
          required
          label="Nome"
          value={form.name}
          type="text"
          // onFocus={handleFocus}
          onChange={handleChange}
        />

        <Input
          id="phone"
          required
          label="Celular"
          value={form.phone}
          type="text"
          onChange={handleChange}
        />
        {error.phone && <div className="error-form">{error.phone}</div>}

        <Input
          id="birthday"
          required
          label="Aniversário"
          value={form.birthday}
          type="date"
          onChange={handleChange}
        />
        {error.birthday && <div className="error-form">{error.birthday}</div>}
        <Input
          id="email"
          required
          label="Email"
          value={form.email}
          type="email"
          onChange={handleChange}
        />
        <div className="create-new-customer-btns">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
      {/* <Link to="/menu" className="btn btn-warning">
        Não quero deixar meus dados
      </Link> */}
    </section>
  );
};

export default CreateCustomer;
//userMenu {"id":"quU8L2vdSlQUdsMYKO0K","name":"Henrrique"}
