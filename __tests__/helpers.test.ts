import { test, expect } from "vitest";
import { toText, capitalize } from "../src/helpers.js";

test("toText handles empty values", () => {
  expect(toText(null)).toBe("");
  expect(toText(undefined)).toBe("");
});

test("toText stringifies other values", () => {
  expect(toText(0)).toBe("0");
  expect(toText(false)).toBe("false");
  expect(toText("a")).toBe("a");
});

test("capitalize", () => {
  expect(capitalize("name")).toBe("Name");
  expect(capitalize("")).toBe("");
  expect(capitalize("Name")).toBe("Name");
});
