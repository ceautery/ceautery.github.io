import { h } from "hastscript";
import { visit } from "unist-util-visit";

function codezPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name === "codez") {
        const data = node.data || (node.data = {});

        data.hName = "div";
        data.hProperties = h("div", { class: "codez" }).properties;
      }
    });
  };
}

export default codezPlugin;
