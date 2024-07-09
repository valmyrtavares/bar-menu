import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainMenu from './Pages/MainMenu';
import Form from './form';
import FormItem from './formItem';
import Header from './component/header';
import MenuButton from './component/menuButton';
import Signup from './Login/signup';
import Login from './Login/login';
import Admin from './Pages/FormMenu';
import Protected from './component/Protected';
import ListToEditAndDelete from './ListToEditAndDelete';

function App() {
  return (
    <BrowserRouter>
      {true && <Header />}
      <MenuButton />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        {/* <Route path="/admin/editButton" element={<EditFormButton />} /> */}
        <Route path="/admin/EditButton/:id" element={<ListToEditAndDelete />} />
        <Route path="/admin/item" element={<FormItem />} />
        <Route path="/admin/category" element={<Form />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin" element={<Protected />} />
        <Route path="/admin/admin" element={<Admin />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//MainMenu    tela principal
//EditFormButton sem dia não existe
//EditFormButton   editar ambas telas de pratos e botões
//FormItem adicionar um novo prato
//Form   Adicionar um novo botão
//Login é a tela igual a de singup protegida
// Signup Não existe link diponivel mas a tela já existe
//Protected vai para a escolha entre o menu administrador e a tela de login
//Admin vai para menu do administrador
