import hash from "../../util/hash";
import Sentence, { hashOfSentence } from "./Sentence";

type Paragraph = {
  content: Sentence[]
};

export default Paragraph;

export function hashOfParagraph(paragraph: Paragraph): string {
  return hash(paragraph.content.map(it => hashOfSentence(it)));
}
