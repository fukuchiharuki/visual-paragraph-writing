import Paragraph, { hashOfParagraph } from "./Paragraph";
import Sentence, { hashOfSentence, isSentence } from "./Sentence";

type TextElement = Paragraph | Sentence;

export default TextElement;

export function hashOfTextElement(textElement: TextElement): string {
  return isSentence(textElement)
    ? hashOfSentence(textElement)
    : hashOfParagraph(textElement);
}
