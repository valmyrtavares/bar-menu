import React from 'react';
import '../assets/styles/recipeDish.css';
import Input from '../component/Input';
import CloseBtn from '../component/closeBtn';
import { getBtnData } from '../api/Api';

const RecipeDish = ({
  setRecipeModal,
  setRecipe,
  recipe,
  customizedPriceObj,
}) => {
  const [ingridients, setIngridients] = React.useState({
    name: '',
    amount: '',
    unitOfMeasurement: '',
  });
  const [IngridientsGroup, setIngridientsGroup] = React.useState([]);
  const [recipeExplanation, setRecipeExplanation] = React.useState('');
  const [productList, setProductList] = React.useState(null);
  const [ingredientsSimple, setIngredientsSimple] = React.useState([]);
  const [ingredientsBySize, setIngredientsBySize] = React.useState({});
  const fieldFocus = React.useRef();
  React.useEffect(() => {
    if (recipe) {
      if (!recipe.Explanation && !recipe.FinalingridientsList) {
        recipe.Explanation = '';
        recipe.FinalingridientsList = [];
        formatterRecipes(recipe);
      } else {
        formatterRecipes(recipe);
      }
      setIngridientsGroup(recipe.FinalingridientsList);
      setRecipeExplanation(recipe.Explanation);
    }
  }, [recipe]);

  React.useEffect(() => {
    console.log('Veja como bem o nossa receita    ', recipe);
    const fetchProduct = async () => {
      const data = await getBtnData('stock');
      const sortedData = data.sort((a, b) =>
        a.product.localeCompare(b.product)
      );
      console.log('Produtos   ', sortedData);
      setProductList(sortedData);
    };

    fetchProduct();
    setIngridientsGroup([]);
    console.log('Customized Price   ', customizedPriceObj);
  }, []);

  React.useEffect(() => {
    if (ingredientsBySize)
      console.log('ingredientsBySize    ', ingredientsBySize);
    if (ingredientsSimple)
      console.log('ingredientsSimple    ', ingredientsSimple);
  }, [ingredientsBySize, ingredientsSimple]);

  const isEmptyObject = (obj) => {
    if (obj.firstLabel === '' || obj.firstLabel === undefined) {
      return true;
    } else {
      return false;
    }
  };
  const formatterRecipes = (recipe) => {
    if (Array.isArray(recipe.FinalingridientsList)) {
      setIngredientsSimple(recipe.FinalingridientsList);
    } else {
      setIngredientsBySize(recipe.FinalingridientsList);
    }
  };

  const extractLabelSizes = () => {
    return [
      customizedPriceObj.firstLabel,
      customizedPriceObj.secondLabel,
      customizedPriceObj.thirdLabel,
    ];
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name') {
      const selectedProduct = productList[value];

      setIngridients((prevForm) => ({
        ...prevForm,
        name: selectedProduct ? selectedProduct.product : '', // Define o nome do produto
        unitOfMeasurement: selectedProduct
          ? selectedProduct.unitOfMeasurement
          : '', // Define a unidade de medida
      }));
    } else {
      setIngridients({
        ...ingridients,
        [id]: value,
      });
    }
  };

  const addIngredient = (size) => {
    if (!isEmptyObject(customizedPriceObj)) {
      setIngredientsBySize((prev) => ({
        ...prev,
        [size]: [...(prev[size] || []), ingridients],
      }));
    } else {
      setIngredientsSimple((prev) => [...prev, ingridients]);
    }
    setIngridients({ name: '', amount: '', unitOfMeasurement: '' });
  };

  const sendRecipe = () => {
    if (!isEmptyObject(customizedPriceObj)) {
      setRecipe({
        FinalingridientsList: ingredientsBySize,
        Explanation: recipeExplanation,
      });
    } else {
      setRecipe({
        FinalingridientsList: ingredientsSimple,
        Explanation: recipeExplanation,
      });
    }
    setRecipeModal(false);
  };

  const remveIten = (sizeOrIndex, index) => {
    if (!isEmptyObject(customizedPriceObj) && index !== undefined) {
      // Caso com `customizedPriceObj` e dois parâmetros (size e index)
      setIngredientsBySize((prev) => ({
        ...prev,
        [sizeOrIndex]: prev[sizeOrIndex]?.filter((_, i) => i !== index), // Remove o item específico
      }));
    } else if (!isEmptyObject(customizedPriceObj)) {
      console.error('Index is required for customizedPriceObj scenario.');
    } else {
      // Caso sem `customizedPriceObj`, com apenas o index
      const updatedList = ingredientsSimple.filter((_, i) => i !== sizeOrIndex); // Aqui, sizeOrIndex é tratado como o índice
      setIngredientsSimple(updatedList);
    }
  };

  return (
    <div className="recipeDish-container">
      <CloseBtn setClose={setRecipeModal} />
      <h1>Faça sua receita</h1>
      {isEmptyObject(customizedPriceObj) ? (
        <div>
          <div className="ingridients">
            <select
              id="name"
              value={productList?.findIndex(
                (product) => product.product === ingridients.name
              )}
              className="select-input"
              onChange={handleChange}
            >
              <option value="">Selecione um produto</option>
              {productList &&
                productList.length > 0 &&
                productList.map((item, index) => (
                  <option key={index} value={index}>
                    {`${item.product}-${item.unitOfMeasurement}`}
                  </option>
                ))}
            </select>
            <input
              id="amount"
              fieldFocus={fieldFocus}
              placeholder="Quantidade"
              className="number-input"
              value={ingridients.amount}
              type="text"
              onChange={handleChange}
            />

            <button type="button" onClick={addIngredient}>
              Adicione
            </button>
          </div>
          <div className="items-recipe">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                {ingredientsSimple &&
                  ingredientsSimple.map((item, index) => (
                    <tr key={index}>
                      <td className="items">{item.name}</td>
                      <td className="items">
                        {item.amount}
                        {item.unitOfMeasurement}
                      </td>
                      <td
                        className="items"
                        style={{ cursor: 'pointer' }}
                        onClick={() => remveIten(index)}
                      >
                        x
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        extractLabelSizes() &&
        extractLabelSizes().length > 0 &&
        extractLabelSizes().map((label) => (
          <div className="container-with-differents-sizes">
            <div className="ingridients">
              {label}
              <select
                id="name"
                value={productList?.findIndex(
                  (product) => product.product === ingridients.name
                )}
                className="select-input"
                onChange={handleChange}
              >
                <option value="">Selecione um produto</option>
                {productList &&
                  productList.length > 0 &&
                  productList.map((item, index) => (
                    <option key={index} value={index}>
                      {`${item.product}-${item.unitOfMeasurement}`}
                    </option>
                  ))}
              </select>
              <input
                id="amount"
                fieldFocus={fieldFocus}
                placeholder="Quantidade"
                className="number-input"
                value={ingridients.amount}
                type="text"
                onChange={handleChange}
              />

              <button type="button" onClick={() => addIngredient(label)}>
                Adicionek
              </button>
            </div>
            <div className="items-recipe">
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientsBySize &&
                    ingredientsBySize[label]?.map((item, index) => (
                      <tr key={index}>
                        <td className="items">{item.name}</td>
                        <td className="items">
                          {item.amount}
                          {item.unitOfMeasurement}
                        </td>
                        <td
                          className="items"
                          style={{ cursor: 'pointer' }}
                          onClick={() => remveIten(label, index)}
                        >
                          x
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
      <div>
        <label>Escreva sua receita</label>
        <textarea
          id="gift"
          className="text-area"
          value={recipeExplanation}
          onChange={({ target }) => setRecipeExplanation(target.value)}
        >
          Saudação
        </textarea>
      </div>
      <div className="btn-container">
        <button onClick={sendRecipe}>Enviar Receita</button>
      </div>
    </div>
  );
};
export default RecipeDish;
