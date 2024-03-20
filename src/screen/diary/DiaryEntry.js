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
        formState: { errors } } 
        = useForm();

    const fnSubmit = (e) => {
        API.servicesPostData(STR.urlCcreateDiary, {
            title: getValues("_title"),
            content: getValues("_content"),
            accessLevel: "public"
          })
        .then((res) => {
            console.log(res.data);
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
                <div className='diaryEntry-check'>
                    <h2>체크리스트</h2>
                </div>
                <div className='diaryEntry-textarea' >
                <div>
                    <textarea
                    {...register("_title")}
                    id="title"
                    name="title"
                    />
                    {errors.title && <p>Title is required.</p>}
                </div>
                <div>
                    <textarea
                        style={{ width: '100%', height: '100%' }}
                        {...register("_content")}
                        id="content"
                        name="content"
                    >
                    {errors.content && <p>Content is required.</p>}
                    </textarea>
                </div>
                </div>
                <div className='diaryEntry-review'>
                    <h2>친구들을 한마디</h2>
                    <div>
                        <ul>
                            <li>리뷰 목록1</li>
                            <li>리뷰 목록2</li>
                        </ul>
                        <textarea
                            style={{ width: '100%' }}
                        ></textarea>
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