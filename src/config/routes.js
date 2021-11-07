import LoginScreen from '../screens/LoginScreen';
import NotFound from '../screens/NotFound';
import Hello from '../screens/Hello';

const routes =[
    {
      path:'/',
      component: LoginScreen,
      isPrivate: false,
      exact:true
    },
    {
      path:'/hello',
      component: Hello,
      isPrivate: true,
      exact:false
    },
    {
      path:'/*',
      component: NotFound,
      isPrivate: true,
      exact:false
    },
  ]
   
  export default routes;