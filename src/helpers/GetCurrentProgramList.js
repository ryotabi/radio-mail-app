import { useState } from 'react';
import { db } from '../firebase';

export default function GetCurrentProgramList(userId) {
  const [list, setList] = useState([]);
  db.collection(`mail/${userId}/programList`).onSnapshot((snapshot) => {
    setList(
      snapshot.docs.map((doc) => doc.data().prpgram),
    );
  });
  return list;
}
