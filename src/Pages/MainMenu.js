import React from 'react';
import Form from '../form';
import CarrosselImages from '../component/carrosselImages';
import Header from '../component/header';
import NestedBtn from '../nestedBtn';
import { getBtnData } from '../api/buttonApi';
import FormItem from '../formItem';

function MainMenu() {
  const [displayForm, setDisplayForm] = React.useState(false);
  const [menuButton, setMenuButton] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBtnData('button');
        setMenuButton(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        {false && <Header />}
        {true && <CarrosselImages />}
        {false && <Form />}
        {menuButton &&
          menuButton.map((item, index) => (
            <div key={index}>
              <NestedBtn parent={'main'} item={item} menuButton={menuButton} />
            </div>
          ))}
        <div>{false && <FormItem />}</div>
      </div>
    </>
  );
}
export default MainMenu;