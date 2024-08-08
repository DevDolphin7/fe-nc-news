import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
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
//    < Order

// How WILL it do it AFTER NC TASK COMPLETION? An array of srtings and objects:
// menu = [
//   "Welcome User",
//   "--divider--",
//   { Articles: ["Here ok"] },
//   {
//     Authors: () => {
//       console.log("Here in Authors callbackFn");
//     },
//   },
// ];

// Behaviour:
// Any string is displayed (not a button)
// Any keyword "--divider" shows a divider
// Any object key is displayed
// Any object where value is a function, invoke the function
// Any object where value is a list acts as above - ONLY DESIGNED FOR 1 SUB MENU

// Every item in menuItems may only have some of these keys: text, button, subMenu, select, divider
//    Any string would result: {text: "string"}
//    Any divider would result: {divider: true}
//    Any object key with a function value would result: {button: "key", select: callbackFn}
//    Any object key with an array value would result: {button: "key", subMenu: [<parsed sub menu>]}

// Dependencies:
// React Transition Group `npm install react-transition-group --save`

export default function Dropdown({ menuItems }) {
  // Currently menu is not provided - to be updated after NC task completion
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

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
                placement === "bottom-start" ? "left top" : "left bottom",
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

export function DropdownMenu({ menuItems, setOpen }, subMenu = []) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const nodeRef = useRef(null);

  function calculateHeight(domElement) {
    const height = domElement.offsetHeight;
    setMenuHeight(height)
  }

  const handledMenuItems = menuItems.map((item) => {
    if (item.select) {
      item.handleSelect = () => {
        setOpen(false);
        item.select();
      };
    }
    // A lot of WET code! Below if statement and CSSTransitions will be
    // refactored to recursive call - if time allows post core task completion
    if (item.subMenu) {
      item.subMenu.map((item) => {
        if (item.select) {
          item.handleSelect = () => {
            setOpen(false);
            item.select();
          };
        }
      });
    }
    return item;
  });

  return (
    <>
      <div className="dropdown-menu" style={{height: menuHeight}}>
        <CSSTransition
          nodeRef={nodeRef}
          in={activeMenu === "main"}
          unmountOnExit
          timeout={500}
          onEnter={calculateHeight}
          classNames="dropdown-menu-primary"
        >
          <div ref={nodeRef}>
            {handledMenuItems.map((item, index) => {
              if (item.subMenu) {
                subMenu = item.subMenu;
              }
              return (
                <DropdownItem
                  key={index}
                  click={item.handleSelect}
                  textOnly={item.text}
                  setOpen={setOpen}
                  setActiveMenu={setActiveMenu}
                >
                  {item.button}
                </DropdownItem>
              );
            })}
          </div>
        </CSSTransition>
      </div>
      <div className="dropdown-menu" style={{height: menuHeight}}>
        <CSSTransition
          nodeRef={nodeRef}
          in={activeMenu === "sub"}
          unmountOnExit
          timeout={500}
          onEnter={calculateHeight}
          classNames="dropdown-menu-secondary"
        >
          <div ref={nodeRef}>
            {subMenu.map((item, index) => {
              return (
                <DropdownItem
                  key={index}
                  click={item.handleSelect}
                  textOnly={item.text}
                  setOpen={setOpen}
                  setActiveMenu={setActiveMenu}
                >
                  {item.button}
                </DropdownItem>
              );
            })}
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

export function DropdownItem(props) {
  if (props.textOnly === "--divider--") {
    return <div className="dropdown-menu-item-divider"></div>;
  } else if (props.textOnly) {
    return <div className="dropdown-menu-item-text-only">{props.textOnly}</div>;
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
      onClick={() => props.setActiveMenu("sub")}
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
