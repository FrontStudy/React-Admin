import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";

import * as API from "../../service/api";
import * as STR from "../../service/string";
import * as TOA from "../../service/toast";

function DiaryEntry() {
    
    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: { errors } } = useForm({
            defaultValues: {
            _title: "", 
            _content: "" 
            }
    });
    const navigate = useNavigate();
    const fnSubmit = (e) => {
         // "_title" 및 "_content" 필드의 값 콘솔에 출력
        console.log("Title:", getValues("_title"));
        console.log("Content:", getValues("_content"));
        API.servicesPostData(STR.urlCcreateDiary, {
            title: getValues("_title"),
            content: getValues("_content"),
            accessLevel: "public",
            imgUrl : "",
          })
        .then((res) => {
            console.log(res.data);
            navigate('/Mydiarypage');
        })
        .catch(() =>
            console.error("오류")
        );
    };
  
    return (
    <div className='diaryEntry'>
        <form style={{ flex: 1, marginRight: '10px' }} onSubmit={handleSubmit(fnSubmit)}>
            <h2 className='diaryEntry-h2'>오늘은 입니다.</h2>
            <div className='diaryEntry-contents'>
                <div className='diaryEntry-textarea' >
                <div>
                    <textarea
                    {...register("_title")}
                    id="title"
                    />
                    {/* {errors._title && <p>Title is required.</p>} */}
                </div>
                <div>
                    <textarea
                        style={{ width: '100%', height: '100%' }}
                        {...register("_content")}
                        id="content"
                    />
                    {/* {errors._content && <p>Content is required.</p>} */}
                </div>
                </div>
            </div>
            <div className='diaryEntry-button'>
                <button type="submit">저장</button>
            </div>
        </form>
    </div>
    );
}

export default DiaryEntry;