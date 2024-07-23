import hash from "../../util/hash";

type Sentence = {
  content: string;
  lineNumber: number;
};

export default Sentence;

export function isSentence(value: unknown): value is Sentence {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const { content } = value as Record<keyof Sentence, unknown>;
  if (typeof content !== "string") {
    return false;
  }

  return true;
}

export function hashOfSentence(sentence: Sentence): string {
  return hash(sentence.content);
}
