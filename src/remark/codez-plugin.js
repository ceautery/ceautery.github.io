import { h } from "hastscript";
import { visit } from "unist-util-visit";

function codezPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" &&
        /^(codez|hero)$/.test(node.name)
      ) {
        const data = node.data || (node.data = {});

        data.hName = "div";
        data.hProperties = h("div", { class: node.name }).properties;
      }
    });
  };
}

export default codezPlugin;
