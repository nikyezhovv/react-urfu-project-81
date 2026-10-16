import { test, expect } from "vitest";
import Tag from "../src/Tag.js";

test("renders empty paired tags without attributes", () => {
  const tag = new Tag("div");
  expect(tag.toString()).toBe("<div></div>");
});

test("renders paired tag with body", () => {
  const tag = new Tag("p", {}, "Hello, World!");
  expect(tag.toString()).toBe("<p>Hello, World!</p>");
});

test("renders paired tag with attributes and body", () => {
  const tag = new Tag("label", { for: "email", class: "form-label" }, "Email");
  expect(tag.toString()).toBe('<label for="email" class="form-label">Email</label>');
});

test("renders single tag without attributes", () => {
  const tag = new Tag("br");
  expect(tag.toString()).toBe("<br>");
});

test("renders single tag with attributes", () => {
  const tag = new Tag("input", { type: "submit", value: "Save" });
  expect(tag.toString()).toBe('<input type="submit" value="Save">');
});

test("ignores body for single tag", () => {
  const tag = new Tag("hr", {}, "some text");
  expect(tag.toString()).toBe("<hr>");
});

test("lowercases tag name", () => {
  expect(new Tag("DIV").toString()).toBe("<div></div>");
});

test("renders true as bare attribute", () => {
  expect(new Tag("input", { disabled: true }).toString()).toBe("<input disabled>");
});

test("skips false, null and undefined attributes", () => {
  const tag = new Tag("input", { a: false, b: null, c: undefined, d: "x" });
  expect(tag.toString()).toBe('<input d="x">');
});

test("renders nested tags", () => {
  const tag = new Tag("div", {}, ["a", new Tag("b", {}, "x"), new Tag("br")]);
  expect(tag.toString()).toBe("<div>a<b>x</b><br></div>");
});
