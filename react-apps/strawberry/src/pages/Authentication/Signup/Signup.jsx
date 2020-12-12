import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { signup } from '../../../services/authentication';
import {
  checkUserEmail,
  checkUserPassword,
  getTokenFromLocalStorage,
  saveTokenToLocalStorage,
  emptyChecker,
} from '../../../utils/utils';
import { setAuthenticationState } from '../../../redux/ducks/authentication';
import Container from '@material-ui/core/Container';
import './Signup.scss';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorFirstname, setIsErrorFirstname] = useState(false);
  const [isErrorLastname, setIsErrorLastname] = useState(false);

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
    if (!checkUserPassword(password)) setIsErrorPassword(true);
    if (!firstname) setIsErrorFirstname(true);
    if (!lastname) setIsErrorLastname(true);
  };

  const onSignupClick = async () => {
    validateInputs();
    if (checkUserEmail(email) && checkUserPassword(password) && !errorMessage) {
      if (isSendingRequest === false) {
        setIsSendingRequest(true);
        const response = await signup({
          email: email,
          password: password,
          profile: {
            first_name: firstname,
            last_name: lastname,
          },
        });
        if (response.token) {
          saveTokenToLocalStorage(response.token);
          getTokenFromLocalStorage();
          dispatch(setAuthenticationState(true));
          history.push('/');
        } else if (response.email)
          setErrorMessage(
            'Пользователь с данной электронной почтой уже зарегистрирован'
          );
        else setErrorMessage('Проблемы с сервером, попробуйте позже');
      }
    }
  };

  return (
    <div className="Signup">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={firstname}
                  error={isErrorFirstname}
                  onChange={(event) =>
                    onChangeHandler(
                      event,
                      setFirstname,
                      emptyChecker,
                      setIsErrorFirstname
                    )
                  }
                  helperText={isErrorFirstname && 'Имя обязательно'}
                  id="firstName"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="lname"
                  value={lastname}
                  error={isErrorLastname}
                  onChange={(event) =>
                    onChangeHandler(
                      event,
                      setLastname,
                      emptyChecker,
                      setIsErrorLastname
                    )
                  }
                  helperText={isErrorLastname && 'Фамилия обязательна'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isErrorEmail}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={isErrorPassword}
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
                    (isErrorPassword &&
                      (password
                        ? 'Пароль должен содержать не менее 8-ми символов, в том числе цифры, прописные и строчные буквы'
                        : 'Пароль обязателен')) ||
                    errorMessage
                  }
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={
                !!errorMessage ||
                isErrorPassword ||
                isErrorEmail ||
                isErrorFirstname ||
                isErrorLastname
              }
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignupClick}
            >
              Зарегистрироваться
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin">Уже есть аккаунт? Войти</Link>
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

export default withRouter(SignUp);
