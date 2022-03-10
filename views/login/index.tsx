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
import { login } from "../../redux/auth/auth.thunks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import Link from "next/link";
import { authSelector } from "../../redux/auth/auth.selectors";

interface ILoginFormData {
  password: string;
  email: string;
}

const LoginView: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(authSelector);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const onSubmit: SubmitHandler<ILoginFormData> = async ({
    email,
    password,
  }) => {
    dispatch(login(email, password));
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
            <Typography variant="h4">Login</Typography>

            <Box display="flex" flexDirection="column" gap="10px" width="320px">
              <TextField
                placeholder="Email"
                type="email"
                label="Email"
                variant="filled"
                {...register("email", { required: true })}
                required
              />
              <TextField
                type="password"
                placeholder="Password"
                label="Password"
                variant="filled"
                {...register("password", { required: true })}
                required
              />
            </Box>
            <Button size="large" type="submit" variant="contained">
              Login
            </Button>

            <Link href={ROUTES.REGISTER}>I do not have account!</Link>
          </Box>
        </form>
      )}
    </Container>
  );
};
export default LoginView;
