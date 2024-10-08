import { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import axios from 'axios';
// import { Link } from '../../components/Link';
import { Link, useNavigate } from 'react-router-dom';

// import { api } from '../../../../../API/src/services/api';
import { api } from '../../../../API/src/services/api';

import { FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Container, Form, Background } from './styles';


export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    function handleSignUp() {
        if (!name || !email || !password) {
            return alert("Preencha todos os campos!");
        }

        api.post("/users", { name, email, password })
            .then(() => {
                alert("Usuário cadastrado com sucesso!");
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.message);
                }
                
                else {
                    alert("Não foi possivel cadastrar!");
                }
            });
    }

    return (
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar links</p>
                <h2>Crie sua conta!</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail" 
                    type="text" 
                    icon={FiMail} 
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha" 
                    type="password" 
                    icon={FiLock} 
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Criar Conta" onClick={handleSignUp} />
                    
                <Link to="/" >
                    Voltar para o Login
                </Link >

            </Form>

            <Background/>

        </Container>

    );
}