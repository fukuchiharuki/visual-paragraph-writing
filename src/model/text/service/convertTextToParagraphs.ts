import Paragraph from "../Paragraph";

export default function convertTextToParagraphs(text: string): Paragraph[] {
  return text.split('\n')
    .reduce(reducer, [])
    .filter(isNotEmpty);
}

function reducer(acc: Paragraph[], line: string): Paragraph[] {
  return line ? appendSentence(acc, line) : newParagraph(acc);
}

function appendSentence(acc: Paragraph[], line: string): Paragraph[] {
  const ret = [...acc];
  const lastParagraph = ret.pop();
  return ret.concat([
    {
      content: lastParagraph
        ? lastParagraph.content.concat([{ content: line }])
        : [{ content: line }]
    }
  ]);
}

function newParagraph(acc: Paragraph[]): Paragraph[] {
  return acc.concat([{ content: [] }]);
}

function isNotEmpty(it: Paragraph): Boolean {
  return it.content.length > 0;
}
