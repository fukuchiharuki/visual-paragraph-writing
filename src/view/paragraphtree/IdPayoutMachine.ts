import TextElement, { hashOfTextElement } from "../../model/text/TextElement";

export default class IdPayoutMachine {
  private codes = new Array<string>();

  payout(element: TextElement): string {
    const code = this.code(element);
    const seq = this.codes.filter((it) => it === code).length;
    this.codes.push(code);
    return `${code}:${seq}`;
  }

  reset() {
    this.codes.length = 0;
  }

  code(element: TextElement): string {
    return hashOfTextElement(element);
  }

  isApplicable(element: TextElement, id: string): boolean {
    return id.startsWith(this.code(element));
  }
}
