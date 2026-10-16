import FormBuilder, { type Template } from "./FormBuilder.js";
import renderHtml from "./renderHtml.js";

type FormOptions = { url?: string; method?: string };

export default class HexletCode {
  static formFor(
    template: Template,
    options: FormOptions = {},
    callback?: (form: FormBuilder) => void,
  ): string {
    const builder = new FormBuilder(template);
    callback?.(builder);

    return renderHtml({
      action: options.url ?? "#",
      method: options.method ?? "post",
      fields: builder.build(),
    });
  }
}
