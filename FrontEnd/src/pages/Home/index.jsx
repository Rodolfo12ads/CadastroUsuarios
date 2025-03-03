import { useEffect, useState, useRef } from 'react';
import './style.css';
import { FcEmptyTrash } from "react-icons/fc";

import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    try {
      const resp = await api.get('/usuarios'); // Certifique-se de que a URL da API está correta
      setUsers(resp.data); // Atualiza o estado corretamente
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }
  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`)
    } catch (error) {
      console.error("Erro ao excluir usuários:", error);
    }
    getUsers()
  }
  async function createUsers() {
    try {
      await api.post("/usuarios", {
        nome: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      })
    } catch (error) {
      console.error("Erro ao criar usuários:", error);
    }
    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuario</h1>
        <input placeholder='Nome' type="text" name='nome' ref={inputName} />
        <input placeholder='Idade' type="number" name='idade' ref={inputAge}/>
        <input placeholder='Email' type="email" name='email' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div className='card' key={user.id}>
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={()=>deleteUsers(user.id)}>
            <FcEmptyTrash size={24} color="red" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
