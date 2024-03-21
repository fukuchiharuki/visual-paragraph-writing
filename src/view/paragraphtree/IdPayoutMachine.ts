import hash from "../../util/hash";

export default class IdPayoutMachine<T> {
  private ids = new Array<String>();

  payout(element: T): string {
    const id = hash(element);
    const seq = this.ids.filter(it => it === id).length;
    this.ids.push(id);
    return `${id}:${seq}`;
  }

  clear() {
    this.ids.length = 0;
  }
}
