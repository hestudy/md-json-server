import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import yaml from "yaml";
import { removePosition } from "unist-util-remove-position";

export const toJson = async (md: string) => {
  const processor = unified().use(remarkParse).use(remarkFrontmatter);

  const parseTree = processor.parse(md);
  const tree = await processor.run(parseTree);

  removePosition(tree, { force: true });

  return tree;
};
