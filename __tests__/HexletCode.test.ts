import { describe, test, expect } from "vitest";
import HexletCode from "../src/index.js";
import { readFixture } from "./helpers.js";

const template = { name: "rob", job: "hexlet", gender: "m" };

describe("formFor()", () => {
  test("renders empty form with default action", () => {
    expect(HexletCode.formFor(template, {}, () => {})).toBe(
      '<form method="post" action="#"></form>',
    );
  });

  test("renders empty form with custom url", () => {
    expect(HexletCode.formFor(template, { url: "/users" }, () => {})).toBe(
      '<form method="post" action="/users"></form>',
    );
  });

  test("works without options and callback", () => {
    expect(HexletCode.formFor(template)).toBe('<form method="post" action="#"></form>');
  });

  test("uses custom method", () => {
    expect(HexletCode.formFor(template, { method: "get" })).toBe(
      '<form method="get" action="#"></form>',
    );
  });
});

describe("input()", () => {
  test("renders input and textarea with labels and default submit", () => {
    const form = HexletCode.formFor(template, { method: "post" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.submit();
    });
    expect(form).toBe(readFixture("form-full.html"));
  });

  test("adds extra attributes to input and overrides textarea defaults", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name", { class: "user-input" });
      f.input("job", { as: "textarea", rows: 50, cols: 50 });
    });
    expect(form).toBe(readFixture("form-attributes.html"));
  });

  test("converts non-string values to text", () => {
    const form = HexletCode.formFor({ age: 25 }, {}, (f) => f.input("age"));
    expect(form).toContain('value="25"');
  });

  test("renders empty value for null and undefined", () => {
    const form = HexletCode.formFor({ a: null, b: undefined }, {}, (f) => {
      f.input("a");
      f.input("b");
    });
    expect(form).toContain('<input name="a" type="text" value="">');
    expect(form).toContain('<input name="b" type="text" value="">');
  });

  test("throws when field is missing in template", () => {
    expect(() =>
      HexletCode.formFor(template, { url: "/users" }, (f) => {
        f.input("name");
        f.input("age");
      }),
    ).toThrow("Field 'age' does not exist in the template.");
  });

  test("does not treat inherited properties as fields", () => {
    expect(() => HexletCode.formFor(template, {}, (f) => f.input("toString"))).toThrow(
      "Field 'toString' does not exist in the template.",
    );
  });

  test("throws on unsupported field type", () => {
    expect(() =>
      HexletCode.formFor(template, {}, (f) => f.input("name", { as: "select" as never })),
    ).toThrow("Unsupported field type 'select'.");
  });

  test("renders custom label text and attributes", () => {
    const form = HexletCode.formFor(template, {}, (f) =>
      f.input("name", { label: "User", labelHtml: { class: "form-label", id: "name-label" } }),
    );
    expect(form).toContain(
      '<label for="name" class="form-label" id="name-label">User</label>' +
        '<input name="name" type="text" value="rob">',
    );
  });

  test("keeps default label when only labelHtml is given", () => {
    const form = HexletCode.formFor(template, {}, (f) =>
      f.input("name", { labelHtml: { class: "form-label" } }),
    );
    expect(form).toContain('<label for="name" class="form-label">Name</label>');
  });
});

describe("submit()", () => {
  test("renders custom button text", () => {
    const form = HexletCode.formFor(template, { method: "post" }, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.submit("Wow");
    });
    expect(form).toBe(readFixture("form-custom-submit.html"));
  });

  test("renders default button text", () => {
    const form = HexletCode.formFor(template, {}, (f) => f.submit());
    expect(form).toBe('<form method="post" action="#"><input type="submit" value="Save"></form>');
  });

  test("keeps field order as declared", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.submit("First");
      f.input("name");
    });
    expect(form.indexOf("First")).toBeLessThan(form.indexOf('name="name"'));
  });
});
