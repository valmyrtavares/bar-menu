import React from "react";
import { fetchCategoriesItem } from "../api/Api.js";
import Input from "../component/Input.js";
import Title from "../component/title.js";
import { app, storage } from "../config-firebase/firebase.js";
import MenuButton from "../component/menuHamburguerButton.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import IncludeSideDishesForm from "./IncludeSideDishesForm.js";
import PriceAndExpenseBuilder from "../component/Payment/PriceAndExpenseBuilder";
import "../assets/styles/form.css";
import CustomizePrice from "./CustomizePriceForm";
import RecipeDish from "./recipeDishForm.js";
import useFormValidation from "../Hooks/useFormValidation.js";
import { cardClasses } from "@mui/material";
//import { cardClasses } from "@mui/material";

function AddDishesForm({ dataObj, mainTitle, setModalEditDishes }) {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    title: "",
    category: "",
    comment: "",
    price: 0,
    image: "",
    costPriceObj: {},
    recipe: {},
    display: false,
    carrossel: false,
    sideDishesElementList: [],
    maxLimitSideDishes: 0,
    CustomizedPrice: {},
  });
  const [categories, setCategories] = React.useState([]);
  const [url, setUrl] = React.useState("");
  const [showPopupCostAndPrice, setShowPopupCostAndPrice] =
    React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [showPopupSideDishes, setShowPopupSideDisehs] = React.useState(false);
  const [showPopupCustomizePrice, setShowPopupCustomizePrice] =
    React.useState(false);
  const [newSideDishesList, setNewSideDishesList] = React.useState([]);
  const [maxLimitSideDishes, setMaxLimitSideDishes] = React.useState([]);
  const [customizedPriceObj, setCustomizedPriceObj] = React.useState({});
  const [recipeModal, setRecipeModal] = React.useState(false);
  const [recipe, setRecipe] = React.useState(null);
  const { handleBlur } = useFormValidation();

  //FIRESTORE
  const db = getFirestore(app);

  //Update the new side dishes that come from noNameDishesInDishes
  React.useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      sideDishesElementList: newSideDishesList,
      maxLimitSideDishes: maxLimitSideDishes,
      recipe: recipe,
    }));
  }, [newSideDishesList, maxLimitSideDishes]);

  React.useEffect(() => {
    if (recipe) {
      form.recipe = recipe;
      console.log(form);
    }
  }, [recipe]);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  //If is there a filled dataObj it will load the input fields
  React.useEffect(() => {
    if (dataObj) {
      setForm(dataObj);
      setNewSideDishesList(dataObj.sideDishesElementList);
      setMaxLimitSideDishes(dataObj.maxLimitSideDishes);
      setCustomizedPriceObj(dataObj.CustomizedPrice);
      setRecipe(dataObj.recipe ? dataObj.recipe : {});
    }
  }, [dataObj]);

  const fetchCategories = async () => {
    const categories = await fetchCategoriesItem("button");
    categories.unshift("Selecione uma categoria"); // Add a first option
    setCategories(categories);
  };

  function handleChange({ target }) {
    const { id, value, type, checked } = target;
    if (id === "price") {
      const formattedValue = value.split(".")[0];
      console.log(formattedValue);
      setForm({
        ...form,
        [id]: formattedValue,
      });
    } else if (type === "checkbox") {
      setForm({
        ...form,
        [id]: checked, // Use checked diretamente, que já é um booleano
      });
    } else {
      setForm({
        ...form,
        [id]: value,
      });
    }
  }

  const onfileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const path = `dishes/${file.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function (optional)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          // Handle successful uploads
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
          form.image = downloadURL;
        }
      );
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (!dataObj) {
      addDoc(collection(db, "item"), form)
        .then((docRef) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setDoc(doc(db, "item", dataObj.id), form)
        .then(() => {
          navigate("/");
          console.log("Document successfully updated !");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const openModalSideDishes = () => {
    setShowPopupSideDisehs(true);
    if (dataObj) {
      console.log("Data obj", dataObj);
    }
  };

  const openRecipeModal = () => {
    setRecipeModal(true);
    console.log(recipeModal);
  };

  React.useEffect(() => {
    if (customizedPriceObj) {
      setForm((prevForm) => ({
        ...prevForm,
        CustomizedPrice: customizedPriceObj,
      }));
    }
  }, [customizedPriceObj]);

  const onPriceChange = (customizedPriceChanged) => {
    console.log("Objeto de preço enviado   ", customizedPriceChanged);
    setCustomizedPriceObj(customizedPriceChanged);
    console.log("Preço muda no on Price  ", customizedPriceObj);
  };

  const addPriceObj = (obj) => {
    console.log(obj);
    obj.profit = (obj.price - obj.cost).toFixed(2);
    console.log(obj);
    setForm({
      ...form,
      costPriceObj: obj,
    });
  };

  React.useEffect(() => {
    if (form.costPriceObj) {
      console.log("form   ", form);
      console.log("form.costPriceObj   ", form.costPriceObj);
    }
  }, [form]);

  return (
    <div className="Edit-Add-Popup mt-5 p-3 bg-body-tertiar">
      <div className="close-btn">
        {setModalEditDishes ? (
          <button onClick={() => setModalEditDishes(false)}>X</button>
        ) : (
          <Link to="/admin/admin">X</Link>
        )}
      </div>
      <div className="recipeModal-container">
        {recipeModal && (
          <RecipeDish
            setRecipeModal={setRecipeModal}
            setRecipe={setRecipe}
            recipe={recipe}
          />
        )}
      </div>
      <Title mainTitle={mainTitle ? mainTitle : "Adicione um novo prato"} />
      <form onSubmit={handleSubmit} className="m-1">
        <Input
          id="title"
          label="Titulo"
          required
          value={form.title}
          type="text"
          onChange={handleChange}
        />
        <div className="my-3">
          <label className="form-label">Categoria</label>
          <select
            id="category"
            required
            value={form.category}
            className="form-select"
            onChange={handleChange}
          >
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
        <Input
          id="comment"
          required
          label="Comentário"
          value={form.comment}
          type="text"
          onChange={handleChange}
        />
        <div className="box-price">
          <Input
            id="price"
            label="Preço"
            value={form.price}
            required
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={() => setShowPopupCustomizePrice(true)}
          >
            Preço Customizado
          </button>
        </div>
        <Input
          id="image"
          label="Image"
          value={form.image}
          type="text"
          onChange={handleChange}
        />
        <Input
          id="sideDishesElementList"
          label="Image"
          value={form.sideDishesElementList}
          type="hidden"
          onChange={handleChange}
        />
        <Input
          id="maxLimitSideDishes"
          value={form.maxLimitSideDishes}
          type="hidden"
          onChange={handleChange}
        />

        <input type="file" onChange={onfileChange} />
        <progress value={progress} max="100" />
        {url && <img className="image-preview" src={url} alt="Uploaded file" />}
        <div className="form-check my-1">
          <input
            className="form-check-input"
            id="carrossel"
            type="checkbox"
            checked={form.carrossel}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Adicionar item ao carrossel
          </label>
        </div>
        <button className="btn btn-primary">Enviar</button>
      </form>
      {showPopupSideDishes && (
        <div className="container-new-sideDishes">
          <IncludeSideDishesForm
            setShowPopupSideDisehs={setShowPopupSideDisehs}
            setNewSideDishesList={setNewSideDishesList}
            newSideDishesList={newSideDishesList}
            setMaxLimitSideDishes={setMaxLimitSideDishes}
            maxLimitSideDishes={maxLimitSideDishes}
          />
        </div>
      )}
      <div className="external-container-customize-price">
        {showPopupCustomizePrice && (
          <CustomizePrice
            setShowPopupCustomizePrice={setShowPopupCustomizePrice}
            onPriceChange={onPriceChange}
            customizedPriceObj={customizedPriceObj}
          />
        )}
      </div>
      <div className="sidedishes-recipe-btn-container">
        <button className="btn btn-success " onClick={openModalSideDishes}>
          {" "}
          Acompanhamentos
        </button>
        <button className="btn btn-success recipe" onClick={openRecipeModal}>
          {" "}
          Receita
        </button>
      </div>
    </div>
  );
}
export default AddDishesForm;
