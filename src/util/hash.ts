import { Md5 } from 'ts-md5';

export default function hash(obj: any): string {
  return Md5.hashStr(JSON.stringify(obj));
}
