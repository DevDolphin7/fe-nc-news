import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import "./Dropdown.css";

// What does it need to do? Show:
//    Welcome {user}
//    -----divider------
//    < Articles
//    Authors
//    -----divider------
//    < Sort

// How does it do it? An array of srtings and objects:
// menu = [
//   "Welcome User",
//   "--divider--",
//   { button: "Articles", subMenu: [<sameFormatForSubMenu-StringsAndObjects>] },
//   {
//     button: "Authors"
//     select: () => {
//       console.log("Here in Authors callbackFn");
//     },
//   },
// ];

// Behaviour:
// Any string is displayed (subMenu strings go back to main menu)
// Any keyword "--divider--" shows a divider
// Any object key is displayed
// Any object where value is a function, invoke the function
// Any object where value is a list acts as above - ONLY DESIGNED FOR 1 SUB MENU

// Every item in menuItems may only have some of these keys: text, button, subMenu, select, divider
//    Any string would result: {text: "string"}
//    Any divider would result: {divider: true}
//    Any object key with a function value would result: {button: "key", select: callbackFn}
//    Any object key with an array value would result: {button: "key", subMenu: [<parsed sub menu>]}

// Dependencies:
// React Transition Group `npm install react-transition-group`
// Material UI `npm install @mui/material @emotion/react @emotion/styled`

export default function Dropdown({ menu }) {
  // Currently menu is not provided - to be updated after NC task completion
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const anchorRef = useRef(null);

  useEffect(() => {
    setMenuItems(parseInputMenu(menu, setOpen));
  }, [menu]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div></div>
        <div></div>
        <div></div>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "right top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <DropdownMenu menuItems={menuItems} setOpen={setOpen} />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}

export function DropdownMenu({ menuItems, setOpen, subMenus = [] }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const nodeRef = useRef(null);

  return (
    <div className="dropdown-menu">
      <CSSTransition
        nodeRef={nodeRef}
        in={activeMenu === "main"}
        unmountOnExit
        timeout={0}
        classNames="dropdown-menu-primary"
      >
        <div ref={nodeRef}>
          {menuItems.map((item, index) => {
            if (item.subMenu) {
              subMenus.push(item.subMenu);
            }
            return (
              <DropdownItem
                key={index}
                click={item.handleSelect}
                textOnly={item.text}
                setOpen={setOpen}
                goToMenu={`menu${subMenus.length}`}
                setActiveMenu={setActiveMenu}
              >
                {item.button}
              </DropdownItem>
            );
          })}
        </div>
      </CSSTransition>
      {subMenus.map((subMenu, menuIndex) => {
        return (
          <CSSTransition
            key={menuIndex}
            nodeRef={nodeRef}
            in={activeMenu === `menu${menuIndex + 1}`}
            unmountOnExit
            timeout={0}
            classNames={`dropdown-menu${menuIndex + 1}`}
          >
            <div ref={nodeRef}>
              {subMenu.map((item, index) => {
                return (
                  <DropdownItem
                    key={index}
                    click={item.handleSelect}
                    textOnly={item.text}
                    setOpen={setOpen}
                    goToMenu={`menu${menuIndex + 1}`}
                    setActiveMenu={setActiveMenu}
                  >
                    {item.button}
                  </DropdownItem>
                );
              })}
            </div>
          </CSSTransition>
        );
      })}
    </div>
  );
}

export function DropdownItem(props) {
  if (props.textOnly === "--divider--") {
    return <div className="dropdown-menu-item-divider"></div>;
  } else if (props.textOnly) {
    return (
      <div
        onClick={() => props.setActiveMenu("main")}
        className="dropdown-menu-item-text-only"
      >
        {props.textOnly}
      </div>
    );
  } else if (props.click) {
    return (
      <button onClick={props.click} className="dropdown-menu-item">
        <span>{props.left}</span>
        <span>{props.children}</span>
      </button>
    );
  }
  return (
    <button
      onClick={() => props.setActiveMenu(props.goToMenu)}
      className="dropdown-menu-item"
    >
      <span>
        <div className="sub-menu-div-upper"></div>
        <div className="sub-menu-div-lower"></div>
      </span>
      <span>{props.children}</span>
    </button>
  );
}

export function parseInputMenu(menu, setOpen) {
  function invalidObjectError(item) {
    throw Error(
      `Objects must be in format {<displayedName>: <callbackFn>} or {<displayedName>: [<subMenu-sameFormat>], recieved: ${item}`
    );
  }

  return menu.map((item) => {
    if (typeof item === "string") {
      return { text: item };
    } else if (Array.isArray(Object.values(item)[0])) {
      // Recursively parse sub-menu
      return {
        button: Object.keys(item)[0],
        subMenu: parseInputMenu(Object.values(item)[0], setOpen),
      };
    }
    // Throw error if not a valid object
    if (typeof Object.values(item)[0] !== "function") {
      return invalidObjectError();
    }
    // For buttons with a callbackFn, close the menu and invoke the function
    return {
      button: Object.keys(item)[0],
      handleSelect: () => {
        setOpen(false);
        Object.values(item)[0]();
      },
    };
  });
}
