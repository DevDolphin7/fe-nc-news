import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/NcNewsLogo.png";
import Dropdown from "./Dropdown";
import "./Nav.css";

const url = paramsUpdater();
let order = "Descending";

export default function Nav() {
  return (
    <div className="NavBar">
      <Link to="/">
        <img src={logoImage} height={64}/>
      </Link>
      <h1>Dolphin News</h1>
      <Dropdown menu={menuItemLookup(url.get())} />
    </div>
  );
}

export function menuItemLookup(page) {
  const navigate = useNavigate();

  if ((page = "/" || page.slice(0, 9) === "/articles")) {
    return [
      "Welcome, cooljmessy",
      "--divider--",
      {
        Articles: [
          "Topics",
          "--divider--",
          "All",
          "Coding",
          "Football",
          "Cooking",
        ].map((topic) => {
          const obj = {};
          if (topic === "Topics" || topic === "--divider--") {
            return topic;
          } else if (topic === "All") {
            obj[topic] = () => {
              navigate(url.setParams());
            };
            return obj;
          }
          obj[topic] = () => {
            navigate(url.setParams("topic", topic.toLowerCase()));
          };
          return obj;
        }),
      },
      {
        Authors: () => {
          return console.log("Here in Authors callbackFn");
        },
      },
      "--divider--",
      {
        Sort: [
          "Sort by",
          "--divider--",
          "Author",
          "Title",
          "Topic",
          "Date Written",
          "Votes",
          `Order: ${order}`,
        ].map((sortBy) => {
          if (sortBy === "Sort by" || sortBy === "--divider--") {
            return sortBy;
          } else if (sortBy === "Date Written") {
            const obj = {};
            obj[sortBy] = () => {
              navigate(url.setParams(url.setParams("sort_by", "created_at")));
            };
            return obj;
          } else if (sortBy === `Order: ${order}`) {
            const obj = {};
            obj[sortBy] = () => {
              if (order === "Descending") {
                order = "Ascending";
                navigate(url.setParams("order", "asc"));
              } else {
                order = "Descending";
                navigate(url.setParams("order", "desc"));
              }
            };
            return obj;
          }
          const obj = {};
          obj[sortBy] = () => {
            navigate(url.setParams("sort_by", sortBy.toLowerCase()));
          };
          return obj;
        }),
      },
    ];
  }
}

export function paramsUpdater(closureUrl = "/articles") {
  // Would use "useLocation" from react-router-dom under normal circumstances
  // But, in my opinion, nice example of closure below for demonstration purposes.
  // Weakness here would be the user manually changing the url
  //    ^ The manual change would be ignored on the next menu click
  const url = {
    get() {
      return closureUrl;
    },
    set(setUrl) {
      closureUrl = setUrl;
      return closureUrl;
    },
  };

  return {
    get() {
      return url.get();
    },
    setParams(param, value) {
      if (!param) {
        url.set("/articles");
        return url.get();
      }

      let currentUrl = url.get();
      const paramRegex = new RegExp(`${param}=[a-z_-]+`);

      if (/\?/.test(currentUrl)) {
        url.set(
          paramRegex.test(currentUrl)
            ? currentUrl.replace(paramRegex, `${param}=${value}`)
            : (currentUrl += `&${param}=${value}`)
        );
      } else {
        url.set((currentUrl += `?${param}=${value}`));
      }

      return url.get();
    },
  };
}
