import { format } from 'date-fns';
import firebase from 'firebase';
type DataToStringType = (data: string) => string

export default function dateToString(date: Date) {
  if (!date) { return ''; }
  return format(date, 'yyyy年M月d日');
}
