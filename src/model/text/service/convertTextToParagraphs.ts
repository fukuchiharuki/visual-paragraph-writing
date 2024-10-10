import Paragraph from "../Paragraph";
import Sentence from "../Sentence";

type Line = Sentence;

export default function convertTextToParagraphs(text: string): Paragraph[] {
  return text
    .split(/\r?\n/)
    .map((content, lineNumber) => ({ content, lineNumber }))
    .reduce(reducer, [])
    .filter(isNotEmpty);
}

function reducer(acc: Paragraph[], line: Line): Paragraph[] {
  return line.content ? appendSentence(acc, line) : newParagraph(acc);
}

function appendSentence(acc: Paragraph[], line: Line): Paragraph[] {
  const ret = [...acc];
  const lastParagraph = ret.pop();
  return ret.concat([
    {
      content: lastParagraph ? lastParagraph.content.concat([line]) : [line],
    },
  ]);
}

function newParagraph(acc: Paragraph[]): Paragraph[] {
  return acc.concat([{ content: [] }]);
}

function isNotEmpty(it: Paragraph): boolean {
  return it.content.length > 0;
}
