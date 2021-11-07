import React, { useState } from "react";
import { Button, colors, Container, Grid, makeStyles } from "@material-ui/core/";
import { useTranslation } from "react-i18next";
import lumen_logo from "./../../images/lumen_logo.svg";
import bg from "./../../images/bg.png";
import SelectLanguage from "../../components/SelectLanguage";
import SignInForm from "../../components/SignInForm/SignInForm";
import TimeDisplay from "../../components/TimeDisplay/TimeDisplay";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Slide
} from "@material-ui/core";
import { AccountCircleRounded, HomeRounded } from "@material-ui/icons";
import Inputs from "../../components/Inputs/Inputs";
import { useAuthDispatch } from "../../context/auth";
import { forgotPassword } from "../../context/auth/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: theme.spacing(4),
    backgroundColor: colors.grey[200],
    border: "2px solid",
    borderColor: colors.blueGrey[400],
    padding: theme.spacing(4),
    opacity: 0.95
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0)
  },
  button: {
    margin: theme.spacing(1)
  },
  root: {
    margin: 0
  }
}));

const textFieldArr = [
  { id: "empICN", label: "eicnLabel", icon: <AccountCircleRounded color="primary" />, type: "number", required: true },
  { id: "compNumber", label: "cnLabel", icon: <HomeRounded color="primary" />, type: "number", required: true }
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LoginScreen(props) {
  const dispatch = useAuthDispatch();
  const [message, setMessage] = useState('');
  const classes = useStyles();
  const { t } = useTranslation();
  const [error, setError] = useState("");

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    empICN: "",
    compNumber: "",
    password: ""
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    setOpen(true);
    console.log("forgotPassword");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "empICN":
        setFormData({ ...formData, empICN: value });
        break;
      case "compNumber":
        setFormData({ ...formData, compNumber: value });
        break;
      default:
        break;
    }
  };

  const handlePassword = async () => {
    const dataObj = {
      action: "forgotPassword",
      cn: formData.compNumber,
      eicn: formData.empICN
    };
    try {
      let response = await forgotPassword(dispatch, dataObj);
      handleResponseMsg(response);
    } catch (error) {
      setError(error);
    }
  };

  function handleResponseMsg(data){
     const msg = JSON.stringify(data)

    if (msg.includes('resetPassEmail')) {
      setMessage(msg);
    } else if (msg.includes('missingValidMail') ||
      parseInt(msg) === -1){
      setError(msg);
    }
  }

  return (
    <div style={{ flex: 1, width: "100%", height: "100%", background: `url(${bg})` }}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img alt="lumen_logo" src={lumen_logo} height="135" />
          <SignInForm {...props} />
          <TimeDisplay />
          <SelectLanguage />
          <Grid container>
            <Button disabled={false} onClick={handleForgotPassword}>
              {t("forgotPassTitle")}
            </Button>
          </Grid>
        </div>
      </Container>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        className={classes.form}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Forgot my password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FormHelperText error={error !== ""}>{error}</FormHelperText>
            <FormHelperText message={message !== ""}>{message}</FormHelperText>
            <Inputs inputs={textFieldArr} handleChange={handleChange} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
            onClick={handlePassword}
            key="submitBtn">
            Send
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default LoginScreen;