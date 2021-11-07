import { InputAdornment, TextField } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

export function Input({required,id,label,type,handleChange,icon}) {
    const { t } = useTranslation();
  

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required={required ? required : false}
            fullWidth
            id={id}
            color="primary"
            label={t(label)}
            name={id}
            autoComplete={id}
            type={type}
            onChange={handleChange}
            InputProps={ icon ? {
            startAdornment:            
                <InputAdornment position="start">
                {icon}
                </InputAdornment>
            } : {}}
        />
    );
}