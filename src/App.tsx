import React, { useState } from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';
import logo from './logo.svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';

library.add(fas) // 这样就不需要一个一个引入了（fas 是 IconPack)

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon="ad"></FontAwesomeIcon>
        <Icon icon="ad" theme="primary"></Icon>
        <img src={logo} alt="" width="30"/>
        <Button onClick={(e) => {e.preventDefault();alert(1)}}> Hello </Button>
        <Button disabled> disabled Button </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Primary Large</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}> Primary Small</Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" target="_blank"> Button Link </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled> Disabled Link </Button>

        <Menu onSelect={(index) => alert(index)} mode="horizontal" defaultOpenSubMenus={["3"]}>
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

        <Button size={ButtonSize.Large} onClick={() => setShow(!show)}>toggle</Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
         <div>
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
         </div>
        </Transition>
        {/* 
          Button 动画无效，因为 Button 自己也有 transition，覆盖掉了 
          添加 wrapper 属性可以解决这个问题
        */}
        <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
          <Button btnType={ButtonType.Primary}>primary Button</Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;
