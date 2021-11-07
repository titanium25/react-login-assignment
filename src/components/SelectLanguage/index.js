import React, { useState } from 'react';
import { RadioGroup, Radio, FormControlLabel, FormLabel } from '@material-ui/core/';

import { useTranslation } from 'react-i18next'

import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    title:{
      textAlign:'center',
    }
  }));

export default function SelectLanguage() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [language,setLanguage] = useState(i18n.language);
  const theme = useTheme();
 
  const [radioArr] = useState([
    {value:"he",label:"hebrew"},
    {value:"en",label:"english"},
  ]);

  const changeLanguageHandler = (lang) =>
  {
    setLanguage(lang?.target?.value);
    i18n.changeLanguage(lang?.target?.value);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  }
  
  return (
    <div>
    <FormLabel component="legend" className={classes.title}>{t('language')}</FormLabel>
        <RadioGroup row aria-label="language" name="language" value={language} onChange={changeLanguageHandler}>
        {radioArr.map((btn)=>{
            return(
            <FormControlLabel key={btn.label} value={btn.value} control={<Radio color="primary"/>} label={t(btn.label)}/>
            )
        })}
    </RadioGroup>
    </div>
  );
}