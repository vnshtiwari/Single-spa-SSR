import React from "react";
import ReactDOMServer from "react-dom/server.js";
import Root from "../src/root.component";

export const getResponseHeaders = (props) => {
  return {
    "x-navbar": 1,
  };
};

export function serverRender(props) {
  const htmlStream = ReactDOMServer.renderToString(<Root></Root>);
  return { content: htmlStream };
}
