import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/NcNewsLogo.png";
import Dropdown from "./Dropdown";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="NavBar">
      <Link to="/">
        <img src={logoImage} />
      </Link>
      <h1>Dolphin News</h1>
      <Dropdown menuItems={menuItemLookup()} />
    </div>
  );
}

export function menuItemLookup(page = "/") {
  const navigate = useNavigate();

  // Currently the required object for the dropdown menu is functional but ugly
  //  - to be updated after NC task completion!
  if ((page = "/" || page.slice(0, 8) === "/articles")) {
    return [
      { text: "Welcome, cooljmessy" },
      { text: "--divider--" },
      {
        button: "Articles",
        subMenu: [
          "Topics",
          "--divider--",
          "All",
          "Coding",
          "Football",
          "Cooking",
        ].map((topic) => {
          if (topic === "Topics" || topic === "--divider--") {
            return { text: topic };
          } else if (topic === "All") {
            return {
              button: topic,
              select: () => {
                navigate("/");
              },
            }
          }
          return {
            button: topic,
            select: () => {
              navigate(`/articles?topic=${topic.toLowerCase()}`);
            },
          };
        }),
      },
      {
        button: "Authors",
        select: () => {
          return console.log("Here in Authors callbackFn");
        },
      },
    ];
  }
}
