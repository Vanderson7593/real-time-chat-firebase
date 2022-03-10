import { FC } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "../../styles/global.styles";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { register } from "../../redux/auth/auth.thunks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import Link from "next/link";
import { authSelector } from "../../redux/auth/auth.selectors";

interface IRegisterFormData {
  username: string;
  password: string;
  email: string;
}

const RegisterView: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(authSelector);
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IRegisterFormData> = async ({
    username: displayName,
    email,
    password,
  }) => {
    dispatch(register(email, password, displayName));
    router.push(ROUTES.HOME);
  };

  return (
    <Container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            gap="30px"
          >
            <Typography variant="h4">Create account</Typography>

            <Box display="flex" flexDirection="column" gap="10px" width="320px">
              <TextField
                placeholder="Username"
                type="text"
                label="Username"
                variant="filled"
                {...formRegister("username", { required: true })}
                required
              />
              <TextField
                placeholder="Email"
                type="email"
                label="Email"
                variant="filled"
                {...formRegister("email", { required: true })}
                required
              />
              <TextField
                type="password"
                placeholder="Password"
                label="Password"
                variant="filled"
                {...formRegister("password", { required: true })}
                required
              />
            </Box>
            <Button size="large" variant="contained" type="submit">
              Register
            </Button>

            <Link href={ROUTES.LOGIN}>I already have account!</Link>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default RegisterView;
