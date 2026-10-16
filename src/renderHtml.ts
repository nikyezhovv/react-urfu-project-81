import Tag from "./Tag.js";
import { type FormField, type FormStructure } from "./FormBuilder.js";
import { capitalize } from "./helpers.js";

const renderField = (field: FormField): Tag[] => {
  if (field.kind === "submit") {
    return [new Tag("input", { type: "submit", value: field.value })];
  }

  const { name, value, attributes, label: labelText, labelHtml } = field;
  const label = new Tag("label", { for: name, ...labelHtml }, labelText ?? capitalize(name));
  const control =
    field.as === "textarea"
      ? new Tag("textarea", { cols: 20, rows: 40, name, ...attributes }, value)
      : new Tag("input", { name, type: "text", value, ...attributes });

  return [label, control];
};

export default (form: FormStructure): string =>
  new Tag(
    "form",
    { method: form.method, action: form.action },
    form.fields.flatMap(renderField),
  ).toString();
