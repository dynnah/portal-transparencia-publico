import { useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { ButtonContainer, Form, Main } from "../../components/Basic/Containers";
import { Text, Title } from "../../components/Basic/Typography";
import store from "../../storage";

import { StyledLink } from "./styles";
import { loginService } from "../../services/auth";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup.string().required("Senha é obrigatório"),
});

const initialValues = {
  email: "",
  senha: "",
};

const Login = () => {
  const { dispatch } = store;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const data = await loginService(values);
      if (data) {
        dispatch.auth.setUser(data);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const { errors, handleChange, handleSubmit } = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
    validateOnChange: false,
  });

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <Title>Portal Transparência</Title>
        <Input
          label="Email"
          onChange={handleChange}
          name="email"
          error={errors.email}
        />
        <Input
          label="Senha"
          security
          onChange={handleChange}
          name="senha"
          error={errors.senha}
        />
        <ButtonContainer>
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </ButtonContainer>
        <Text>
          Não possui conta?{" "}
          <StyledLink to="/register">Cadastre-se aqui.</StyledLink>
        </Text>
      </Form>
    </Main>
  );
};

export default Login;
