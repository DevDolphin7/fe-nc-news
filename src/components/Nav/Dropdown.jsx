import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

// What does it need to do? Show:
//    Welcome {user}
//    -----divider------
//    < Articles
//    Authors
//    -----divider------
//    < Sort
//    < Order

// How does it do it? An array of srtings and objects:
// ["Welcome, user",
//  "--divider--",
//  {"< Articles": [{"Topic 1": callbackFn}, {"Topic 2": callbackFn}]},
//  {Authors: callbackFn},
//  "--divider--",
//  {"< Sort": [{"author": "?sort_by=author"}]}
//  ]

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

export default function Dropdown(desiredMenu) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  desiredMenu = [
    "Welcome User",
    "--divider--",
    { Articles: ["Here ok"] },
    {
      Authors: () => {
        console.log("Here in Authors callbackFn");
      },
    },
  ];
  const menuItems = [
    { text: "Welcome User" },
    { text: "--divider--" },
    { button: "Articles", subMenu: [{ text: "Here ok" }] },
    {
      button: "Authors",
      select: () => {
        return console.log("Here in Authors callbackFn");
      },
    },
  ];

  const handleToggle = () => {
    console.log("Hello");
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="toggle-dropdown"
      >
        <div className="button-div"></div>
        <div className="button-div"></div>
        <div className="button-div"></div>
      </button>
      {dropdownOpen && (
        <DropdownMenu menuItems={menuItems} setDropdownOpen={setDropdownOpen} />
      )}
    </>
    //onKeyDown=handleListKeyDown
  );
}

export function DropdownMenu({ menuItems, setDropdownOpen }) {
  return (
    <div className="dropdown-menu">
      {menuItems.map((item, index) => {
        if (item.select) {
          item.handleSelect = () => {
            setDropdownOpen(false);
            item.select();
          };
        }
        return (
          <DropdownItem
            key={index}
            // left={item.subMenu}
            click={item.handleSelect}
            textOnly={item.text}
            setDropdownOpen={setDropdownOpen}
          >
            {item.button}
          </DropdownItem>
        );
      })}
    </div>
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
    <button onClick={props.click} className="dropdown-menu-item">
      <span>
        <div className="sub-menu-div-upper"></div>
        <div className="sub-menu-div-lower"></div>
        {props.left}
      </span>
      <span>{props.children}</span>
    </button>
  );
}
