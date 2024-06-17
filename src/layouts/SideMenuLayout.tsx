import { Outlet } from 'react-router-dom'
import SideMenu from '../components/SideMenu'

const SideMenuLayout = () => {
    return (
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <div style={{ marginLeft: '200px', padding: '1rem', flexGrow: 1 }}>
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default SideMenuLayout