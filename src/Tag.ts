export type AttributeValue = string | number | boolean | null | undefined;
export type Attributes = Record<string, AttributeValue>;
export type Child = string | Tag;
export type Body = Child | Child[];

export default class Tag {
  private static readonly singleTags = new Set<string>([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  private readonly name: string;
  private readonly attributes: Attributes;
  private readonly body: Body;

  constructor(name: string, attributes: Attributes = {}, body: Body = "") {
    this.name = name.toLowerCase();
    this.attributes = attributes;
    this.body = body;
  }

  private buildAttributes(): string[] {
    return Object.entries(this.attributes).flatMap(([key, value]) => {
      if (value === false || value === null || value === undefined) {
        return [];
      }
      if (value === true) {
        return [key];
      }
      return [`${key}="${value}"`];
    });
  }

  private buildBody(): string {
    const children = Array.isArray(this.body) ? this.body : [this.body];

    return children.join("");
  }

  private buildOpenTag(): string {
    return `<${[this.name, ...this.buildAttributes()].join(" ")}>`;
  }

  private isSingle(): boolean {
    return Tag.singleTags.has(this.name);
  }

  toString(): string {
    const open = this.buildOpenTag();

    return this.isSingle() ? open : `${open}${this.buildBody()}</${this.name}>`;
  }
}
