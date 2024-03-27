import TextElement from '../../model/text/TextElement';
import IdPayoutMachine from './IdPayoutMachine';

export default class CollapsibleStatesHolder {
  private statesMap = new Map<string, boolean>();

  constructor(private idPayoutMachine: IdPayoutMachine) { }

  set(element: TextElement, expanded: boolean) {
    this.statesMap.set(this.idPayoutMachine.code(element), expanded);
  }

  get(element: TextElement): boolean {
    const code = this.idPayoutMachine.code(element);
    const state = this.statesMap.get(code);
    const ret = (typeof state !== 'undefined') ? state : true;
    this.statesMap.set(code, ret);
    return ret;
  }

  collapseAll() {
    const keys = Array.from(this.statesMap.keys());
    keys.forEach(code => {
      this.statesMap.set(code, false);
    });
  }

  reset(elements: TextElement[]) {
    const codes = elements.map(it => this.idPayoutMachine.code(it));
    const keys = Array.from(this.statesMap.keys());
    keys.forEach(code => {
      if (!codes.includes(code)) {
        this.statesMap.delete(code);
      }
    });
  }
}
