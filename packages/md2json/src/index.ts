import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const toJson = async (md: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, {
      type: "yaml",
      marker: "-",
    })
    .use(remarkRehype, { allowDangerousHtml: true });

  const tree = processor.parse(md);

  return tree;
};

export const transformFrontmatter = (
  tree: Awaited<ReturnType<typeof toJson>>
) => {
  const frontmatter = tree.children.find((child: any) => child.type === "yaml");
  tree.children = tree.children.filter((child: any) => child.type !== "yaml");

  return {
    frontmatter,
    tree,
  };
};
