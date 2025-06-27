import { h } from "hastscript";
import { visit } from "unist-util-visit";

function classWrapper() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name.length) {
        const data = node.data || (node.data = {});

        data.hName = "div";
        data.hProperties = h("div", { class: node.name }).properties;
      }
    });
  };
}

export default classWrapper;
