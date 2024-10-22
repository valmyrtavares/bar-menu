import React from "react";
import "../assets/styles/customizePriceForm.css";
import Input from "../component/Input.js";
import Title from "../component/title.js";

function CustomizePrice({
  setShowPopupCustomizePrice,
  onPriceChange,
  customizedPriceObj,
}) {
  const [formPrice, setFormPrice] = React.useState({
    firstPrice: 0,
    firstLabel: "",
    secondPrice: 0,
    secondLabel: "",
    thirdPrice: 0,
    thirdLabel: "",
  });

  React.useEffect(() => {
    if (customizedPriceObj) {
      setFormPrice(customizedPriceObj);
    }
  }, [customizedPriceObj]);

  const close = () => {
    setShowPopupCustomizePrice(false);
  };
  const handleChange = ({ target }) => {
    const { id, value } = target;
    setFormPrice({
      ...formPrice,
      [id]: value,
    });
  };

  return (
    <div className="container-custome-price">
      <div className="close-btn">
        <button onClick={close}>X</button>
      </div>
      <Title Preço mainTitle="Preço Customizado" />

      <div className="wrapper-inputs">
        <Input
          id="firstPrice"
          label="Primeiro preço"
          value={formPrice.firstPrice}
          type="number"
          onChange={handleChange}
        />
        <Input
          id="firstLabel"
          label="Descrição do primeiro preço"
          value={formPrice.firstLabel}
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="wrapper-inputs">
        <Input
          id="secondPrice"
          label="Segundo preço"
          value={formPrice.secondPrice}
          type="number"
          onChange={handleChange}
        />
        <Input
          id="secondLabel"
          value={formPrice.secondLabel}
          label="Descrição do segundo preço"
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="wrapper-inputs">
        <Input
          id="thirdPrice"
          value={formPrice.thirdPrice}
          label="Terceiro preço"
          type="number"
          onChange={handleChange}
        />
        <Input
          id="thirdLabel"
          value={formPrice.thirdLabel}
          label="Descrição do terceiro preço"
          type="text"
          onChange={handleChange}
        />
      </div>
      <button
        className="customized-price-btn"
        type="button"
        onClick={() => onPriceChange(formPrice)}
      >
        Enviar
      </button>
    </div>
  );
}
export default CustomizePrice;
