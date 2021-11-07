import React, { useEffect, useState } from 'react';
import { loginUser, reportAttendance, useAuthDispatch } from '../../context/auth';
import { Button, FormControlLabel,Checkbox,Grid,makeStyles, FormHelperText  } from '@material-ui/core/';
import { useTranslation } from 'react-i18next'
import { AccountCircleRounded, HomeRounded, LockRounded } from '@material-ui/icons';
import { mdiDoorOpen, mdiDoorClosed } from '@mdi/js';
import Icon from '@mdi/react';
import Inputs from '../Inputs/Inputs';
import {isMobile} from 'react-device-detect';
import Progress from '../Progress/Progress';
import AlertDialog from '../AlertDialog/AlertDialog';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    margin:0
  },
}));

const textFieldArr = [
  {id:"empICN",label:"eicnLabel",icon:<AccountCircleRounded color="primary"/>,type:'number',required:true},
  {id:"compNumber",label:"cnLabel",icon:<HomeRounded color="primary"/>,type:'number',required:true},
  {id:"password",label:"passLabel",icon:<LockRounded color="primary"/>,type:'password',required:true}
];
const buttonsArr = [
  {id:"inBtn",label:"in",icon:<Icon style={{marginInlineEnd:10}} path={mdiDoorOpen} size={1}/>,reportState:1},
  {id:"outBtn",label:"out",icon:<Icon style={{marginInlineEnd:10}} path={mdiDoorClosed} size={1}/>,reportState:2},
]

export default function SignInForm(props) {
  const dispatch = useAuthDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading,setIsLoading] = useState(false);
  const [isShowAlert,setIsShowAlert] = useState(false);
  const [locationStatus,setLocationStatus] = useState(true);
  const [formData,setFormData] = useState({
      empICN: '',
      compNumber: '',
      password: ''
  });
  const [error,setError] = useState('');
  const [alertTxt,setAlertTxt] = useState('');

  const report = (event, reportState) => {
      event.preventDefault();
      if(validateForm()) {
          setError('');
          getLocation(reportState);
      }else{
          setError('invalidForm');
      }
  }

  const getLocation = (state,healthStatement = false) => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
        setLocationStatus(true);
        reportState(state,healthStatement,position.coords.latitude,position.coords.longitude);
    }, () => {
        setLocationStatus(-1);
        reportState(state,healthStatement);
    });
  }

  const reportState = async(state,healthStatement = false,lat = 0,lon = 0) => {
    if(isLoading){
      console.log('loadinggg');
    }
      setIsLoading(true)
      const dataObj = {
          action: "report",
          cn: formData.compNumber,
          eicn: formData.empICN,
          pass: formData.password,
          device: isMobile ? 1 : 0,
          lat: lat,
          lon: lon,
          type: state,
          workcode:healthStatement,
          reportedTime:''
      };
      try {
        let response = await reportAttendance(dispatch, dataObj);
        handleResponseMsg(response);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
  }

  function handleResponseMsg(data){
    setIsLoading(false);
    let dataSplit = data.split(','); //added msg - check for error in user validation
    let msg = dataSplit[0];
    let time = ""; //time - server time
    let sqlResult = false; //sqlResult - sql success
    if(dataSplit.length === 3) {
      time = dataSplit[1]; //time - server time
      sqlResult = dataSplit[2]; 
    }
    if (msg.length > 10) {
      setError(msg);
    } else if (parseInt(msg) >= -7 && parseInt(msg) <= -1){
      if(parseInt(msg) === -6){
        if(locationStatus === -1){
          msg = "-9";
        }
        else if(locationStatus === -2){
          msg = "-12";
        }
        else if(locationStatus === -3){
          msg = "-14";
        }
        else{
          msg = "-10";
        }
      }
      setError(msg);
    }
    else if(msg === "-13" || msg === "-101"){
      setError(msg);
    }
    else if(msg === '-9'){ //handleHealthStatement
        getLocation(1,1);
    }
    else if(sqlResult === "1"){
      if(msg === "-8"){
        setAlertTxt(t('success') + " " + time + " " + t(msg));
      }
      else {
        setAlertTxt(t('success') + " " + time);
      }
      setIsShowAlert(true);
    }
    else{
      setError('notSaved');
    }
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      if(validateForm()) {
          setError('');
          setIsLoading(true);
          handleLogin();
      }else{
          setError('invalidForm');
      }
  }

  const handleLogin = async() => {
      const dataObj = {
          action: 'login',
          cn: formData.compNumber,
          eicn: formData.empICN,
          pass: formData.password,
      };
      try {
        let response = await loginUser(dispatch, dataObj);
        setIsLoading(false);
        if (!response.token) return;
        props.history.push('/hello');
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
  }
  
  const validateForm = () => {
      return formData.empICN !== '' && formData.compNumber !== '' && formData.password !== '';
  }

  const handleChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
      case 'empICN':
          setFormData({...formData,empICN: value});
          break;
      case 'compNumber':
          setFormData({...formData,compNumber: value});
          break;
      case 'password':
          setFormData({...formData,password: value}); 
          break;
      default:
          break;
      }
  }

  return (
    <form className={classes.form}>
      <Inputs inputs={textFieldArr} handleChange={handleChange}/>
      <Grid container>
        <FormControlLabel
          classes={{root:classes.root}}
          control={<Checkbox value="remember" color="primary" />}
          label={t('rememberMe')}
        />
      </Grid>
      <FormHelperText error={error !== ''}>{t(error)}</FormHelperText>
      <Grid container spacing={3}>
        {buttonsArr.map((btn)=>{
          return(
            <Grid key={btn.id+"grid"} item xs={6}>
              <Button
                type="submit"
                fullWidth
                key={btn.id}
                variant="contained"
                color="primary"
                className={classes.submit}
                startIcon={btn.icon}
                onClick={(e)=>report(e,btn.reportState)}
                disabled={isLoading}
                >
                {t(btn.label)}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <Button disabled={isLoading} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} size='large' onClick={handleSubmit} key="submitBtn">
        {t('loginTitle')}
      </Button>
      <Progress isShow={isLoading} handleClose={()=>setIsLoading(false)} msg={t('pleaseWait')}/>
      <AlertDialog isOpen={isShowAlert} handleClose={()=>setIsShowAlert(false)} title={''} body={alertTxt} agreeTxt={t('okay')} handleAgree={()=>setIsShowAlert(false)}/>
    </form>
  );
}