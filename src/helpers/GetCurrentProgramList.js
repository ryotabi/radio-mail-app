import { useState } from 'react';
import { db } from '../firebase';

export const GetCurrentProgramList = (userId) => {
    const [list, setList] = useState([])
    db.collection(`mail/${userId}/programList`).onSnapshot((snapshot) => {
        setList(
            snapshot.docs.map((doc) => {
                return doc.data().prpgram;
            })
        )
    })
    return list;
}