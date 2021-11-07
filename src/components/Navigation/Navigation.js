import React,{useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useTranslation } from 'react-i18next';
import { Description } from '@material-ui/icons';

const pages = [
  {title:'adminTitle',icon:<DashboardIcon />},
  {title:'editReportsTitle',icon:<Description />},
  {title:'aboutTitle',icon:<PeopleIcon />},
  {title:'attendanceStatsTitle',icon:<BarChartIcon />}
]

export default function Navigation(){
  const {t} = useTranslation();
  const [selectedPage,setSelectedPage] = useState(1);
  return(
    <div>
      {pages.map((page,index)=>(
        <ListItem button selected={selectedPage === index} onClick={()=>{setSelectedPage(index)}}>
          <ListItemIcon>
            {page.icon}
          </ListItemIcon>
          <ListItemText primary={t(page.title)}/>
        </ListItem>
      )
      )}
    </div>
  )
}
