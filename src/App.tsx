import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.svg'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
        <img src={logo} alt="" width="30"/>
        <Button onClick={(e) => {e.preventDefault();alert(1)}}> Hello </Button>
        <Button disabled> disabled Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Primary Large</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}> Primary Small</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" target="_blank"> Button Link </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled> Disabled Link </Button>

        <Menu onSelect={(index) => alert(index)} mode="vertical" defaultOpenSubMenus={["3"]}>
          <MenuItem>
            item1
          </MenuItem>
          <MenuItem disabled>
            item2
          </MenuItem>
          <MenuItem>
            item3
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown1
            </MenuItem>
            <MenuItem>
              dropdown2
            </MenuItem>
          </SubMenu>
        </Menu>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
