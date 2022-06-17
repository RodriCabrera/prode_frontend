import { SidebarContainer } from './Navbar.styles';

function Sidebar({ showAside, close }) {
  //   if (!showAside) return null;
  console.log('INSIDE SIDEBAR showaside', showAside);
  return (
    <SidebarContainer show={showAside}>
      <button type="button" onClick={() => close()}>
        hide
      </button>
      SHOW MENU
    </SidebarContainer>
  );
}

export default Sidebar;
