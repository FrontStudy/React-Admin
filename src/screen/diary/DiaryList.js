import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import * as STR from "../../service/string";

function DiaryList() {
    const { id } = useParams();
    console.log(id); 
    const [diaries, setDiaries] = useState([]);

    // useEffect(() => {
    //     axios
    //     .post(
    //       STR.urlDiaryList, {
    //         offset: 0,
    //         size: 10,
    //     }).then(res => {
    //         setDiaries(res.data);
    //         console.log(res.data); 
    //     }).catch(error => {
    //         console.error('Error fetching diaries:', error);
    //     });
   
    // }, []); 

    return (
        <div className='diaryList'>
            {diaries.map(diary => (
                <div key={diary.id}>
                    <h3>{diary.title}</h3>
                    <p>{diary.content}</p>
                </div>
            ))}
        </div>
    );
}

export default DiaryList;