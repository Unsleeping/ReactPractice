import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signin } from '../../../services/authentication';
import {
  checkUserEmail,
  checkUserPassword,
  getTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from '../../../utils/utils';
import { setAuthenticationState } from '../../../redux/ducks/authentication';
import './Signin.scss';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  useEffect(() => {
    setIsSendingRequest(false);
  }, [errorMessage]);

  const onChangeHandler = (event, setter, validator, errorSetter) => {
    setErrorMessage('');
    if (validator(event.target.value)) errorSetter(false);
    setter(event.target.value);
  };

  const validateInputs = () => {
    if (!checkUserEmail(email)) setIsErrorEmail(true);
    if (!password) setIsErrorPassword(true);
  };

  const onSigninClick = async () => {
    validateInputs();
    if (checkUserEmail(email) && password && !errorMessage) {
      if (isSendingRequest === false) {
        setIsSendingRequest(true);
        const response = await signin({
          email: email,
          password: password,
        });
        if (response.token) {
          history.push('/');
          saveTokenToLocalStorage(response.token);
          getTokenFromLocalStorage();
          dispatch(setAuthenticationState(true));
        } else {
          setErrorMessage('Пользователь не существует');
        }
        if (!response) setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };

  return (
    <div className="Signin">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={
                isErrorEmail ||
                (!!errorMessage &&
                  errorMessage !== 'Проблемы с сервером, попробуйте позже')
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронный адрес"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) =>
                onChangeHandler(
                  event,
                  setEmail,
                  checkUserEmail,
                  setIsErrorEmail
                )
              }
              helperText={
                isErrorEmail &&
                (email
                  ? 'Проверьте правильность ввода электронного адреса'
                  : 'Электронный адрес обязателен')
              }
              autoFocus
            />
            <TextField
              error={
                isErrorPassword ||
                (!!errorMessage &&
                  errorMessage !== 'Проблемы с сервером, попробуйте позже')
              }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              value={password}
              onChange={(event) =>
                onChangeHandler(
                  event,
                  setPassword,
                  checkUserPassword,
                  setIsErrorPassword
                )
              }
              helperText={
                (isErrorPassword && 'Пароль обязателен') || errorMessage
              }
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Button
              disabled={!!errorMessage || isErrorEmail || isErrorPassword}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSigninClick}
            >
              Войти
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signup">Нет аккаунта? Зарегистрироваться</Link>
              </Grid>
            </Grid>
            {isSendingRequest && (
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(Signin);
