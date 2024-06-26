import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import * as API from '../../service/api';
import * as STR from '../../service/string';

function DiaryEdit() {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  const { 
    register, 
    handleSubmit, 
    setValue, 
    getValues, 
        formState: { errors } } = useForm({
        defaultValues: {
        _title: "", 
        _content: "",
        }
  });

  const [accessLevel, setAccessLevel] = useState("public");

  useEffect(() => {
    fetchDiaryEntry();
  }, [diaryId]);

  const fetchDiaryEntry = async () => {
    try {
      const url = `${STR.urlDiaryDetail}/${diaryId}`;
      const data = await API.servicesGetData(url);
      if (data && data.data) {
        setValue("_title", data.data.title);
        setValue("_content", data.data.content);
        setAccessLevel(data.data.accessLevel);
      } else {
        console.error('응답 데이터에 문제가 있습니다:', data);
      }
    } catch (error) {
      console.error('일기 세부 정보 불러오기를 실패하였습니다.', error);
    }
  };

  const fnSubmit = () => {
    console.log("Title:", getValues("_title"));
    console.log("Content:", getValues("_content"));
    const url = `${STR.urlDiaryEdit}/${diaryId}`;
    API.servicesPutData(url, {
        title: getValues("_title"),
        content: getValues("_content"),
        accessLevel: accessLevel,
        imgUrl : "",
        active: "true"
    })
    .then((response) => {
      console.log("status"+response);
      if (response && response.status === 'success') {
        alert('일기가 성공적으로 수정되었습니다.');
        navigate(`/diary/MydiarypageDetail/${diaryId}`);
      } else {
        console.error('일기 수정에 실패했습니다:', response);
      }
    })
    .catch((error) => {
      console.error('일기 수정 중 오류가 발생했습니다:', error);
    });
  };


  return (
    <div className='diary-edit'>
      <h1>일기 수정</h1>
      <form onSubmit={handleSubmit(fnSubmit)}>
        <div>
          <label>제목</label>
          <input type='text' name='_title' {...register("_title")} />
          {errors._title && <p>Title is required.</p>}
        </div>
        <div>
          <label>내용</label>
          <textarea name='_content' {...register("_content")} />
          {errors._content && <p>Content is required.</p>}
        </div>
        <div className='diaryEntry-accessLevel'>
          <label>
            <input 
              type="radio" 
              value="public" 
              checked={accessLevel === "public"} 
              onChange={() => setAccessLevel("public")}
            />
            Public
          </label>
          <label>
            <input 
              type="radio" 
              value="private" 
              checked={accessLevel === "private"} 
              onChange={() => setAccessLevel("private")}
            />
            Private
          </label>
        </div>
        <button type='submit'>저장</button>
      </form>
    </div>
  );
}
export default DiaryEdit;