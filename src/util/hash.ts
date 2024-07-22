import { Md5 } from 'ts-md5';

type Any = string | string[] | object

export default function hash(obj: Any): string {
  return Md5.hashStr(JSON.stringify(obj));
}
