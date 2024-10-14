import { expect, it } from "vitest";
import { toJson } from "../src";

it("toJson", async () => {
  const md = `---
title: 测试
date: 2024-02-01
---

# 标题

内容`;

  const json = await toJson(md);
  expect(json).toMatchSnapshot();
});
