import { type Attributes, type AttributeValue } from "./Tag.js";
import { toText } from "./helpers.js";

export type Template = Record<string, unknown>;

export type InputOptions = {
  as?: "input" | "textarea";
  label?: string;
  labelHtml?: Attributes;
  [attribute: string]: AttributeValue | Attributes;
};

export type FormField =
  | {
      kind: "input";
      as: "input" | "textarea";
      name: string;
      value: string;
      attributes: Attributes;
      label?: string;
      labelHtml?: Attributes;
    }
  | { kind: "submit"; value: string };

export type FormStructure = { action: string; method: string; fields: FormField[] };

export default class FormBuilder {
  private readonly template: Template;
  private readonly fields: FormField[] = [];

  constructor(template: Template) {
    this.template = template;
  }

  input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as = "input", label, labelHtml, ...rest } = options;

    if (as !== "input" && as !== "textarea") {
      throw new Error(`Unsupported field type '${String(as)}'.`);
    }

    this.fields.push({
      kind: "input",
      as,
      name,
      value: toText(this.template[name]),
      attributes: rest as Attributes,
      label,
      labelHtml,
    });
  }

  submit(value = "Save"): void {
    this.fields.push({ kind: "submit", value });
  }

  build(): FormField[] {
    return [...this.fields];
  }
}
