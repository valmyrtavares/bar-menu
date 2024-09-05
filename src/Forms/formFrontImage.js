import React from "react";
import Input from "../component/Input";
import { app, storage } from "../config-firebase/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { GlobalContext } from "../GlobalContext.js";
import "../assets/styles/form.css";
import { useNavigate } from "react-router-dom";
//import { cardClasses } from "@mui/material";
import useLocalStorage from "../Hooks/useLocalStorage.js";

const FormFrontImage = () => {
  const [url, setUrl] = React.useState("");
  const [progress, setProgress] = React.useState("");
  const global = React.useContext(GlobalContext);
  const [publicStatement, setPublicStatement] = useLocalStorage(
    "isToten",
    false
  );

  //Navigate
  const navigate = useNavigate();

  //FIRESTORE
  const db = getFirestore(app);

  const changePublicStatement = () => {
    setPublicStatement((prev) => !prev);
  };

  React.useState(() => {
    console.log("publicStatement   ", publicStatement);
  }, [publicStatement]);

  const onfileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const path = `frontImage/${file.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_change",
        (snapshot) => {
          const progress = (snapshot.bytesTrans / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
          global.setImage(downloadURL);
          setDoc(doc(db, "frontImage", "oIKq1AHF4cHMkqgOcz1h"), {
            image: downloadURL,
          })
            .then(() => {
              console.log("Document successfully updated !");
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    }
  };
  return (
    <>
      <Input
        id="uploadImage"
        label="Upload image"
        type="file"
        onChange={onfileChange}
      />
      <progress value={progress} max="100" />
      {url && <img className="image-preview" src={url} alt="Uploaded file" />}

      <div className="form-check my-1">
        <input
          className="form-check-input"
          id="carrossel"
          type="checkbox"
          checked={publicStatement}
          onChange={changePublicStatement}
        />
        <label className="form-check-label">
          Manter selecionado para que o cliente seja deslogado logo após o envio
          do pedido
        </label>
      </div>
    </>
  );
};

export default FormFrontImage;
