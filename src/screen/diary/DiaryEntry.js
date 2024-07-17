import React, { useState } from 'react';
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
                _content: "",
            }
    });
    const navigate = useNavigate();
    const [accessLevel, setAccessLevel] = useState("public");
    const [emails, setEmails] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        if (inputValue && !emails.includes(inputValue)) {
            setEmails([...emails, inputValue]);
            setInputValue('');
        }
    };

    const handleRemoveEmail = (emailToRemove) => {
        setEmails(emails.filter(email => email !== emailToRemove));
    };

    const fnSubmit = (e) => {
         // "_title" 및 "_content" 필드의 값 콘솔에 출력
        console.log("Title:", getValues("_title"));
        console.log("Content:", getValues("_content"));
        API.servicesPostData(STR.urlCcreateDiary, {
            title: getValues("_title"),
            content: getValues("_content"),
            accessLevel: accessLevel,
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
        <form onSubmit={handleSubmit(fnSubmit)} style={{ width: '100%'}}>
            <div className='diaryEntry-contents'>
                <div className='diaryEntry-textarea' >
                    <div>
                        <textarea
                            {...register("_title")}
                            style={{ width: '100%', height: '60px', padding: '15px', resize: 'none' }}
                                id="title"
                                placeholder='제목'
                                
                        />
                        {/* {errors._title && <p>Title is required.</p>} */}
                    </div>
                    <div>
                        <textarea
                            {...register("_content")}
                            style={{ width: '100%', minHeight: '700px', padding: '15px' }}
                            id="content"
                            // placeholder='일기 내용을 입력해주세요!'
                            placeholder={accessLevel === "public" ? '공개 일기 내용을 입력해주세요!' : '비공개 일기 내용을 입력해주세요!'}
                            />
                        {/* {errors._content && <p>Content is required.</p>} */}
                    </div>
                </div>
                </div>
                <div className='diaryEntry-accessLevel'>
                    <div className='diaryEntry-radio'>
                        <div>
                            <input
                            className='diaryEntry-radioInput'
                            type="radio"
                            value="public"
                            name="accessLevel"
                            id="AccessLevelRadio1"
                            checked={accessLevel === "public"}
                            onChange={() => setAccessLevel("public")}
                        />
                        <label className='diaryEntry-radioLabel' htmlFor="AccessLevelRadio1">공개</label>
                        <input
                            className='diaryEntry-radioInput'
                            type="radio"
                            value="private"
                            name="accessLevel"
                            id="AccessLevelRadio2"
                            checked={accessLevel === "private"}
                            onChange={() => setAccessLevel("private")}
                        />
                        <label className='diaryEntry-radioLabel' htmlFor="AccessLevelRadio2">비공개</label>
                        </div>
                        {accessLevel === "private" && (
                            <div>
                                <input 
                                    type="email" 
                                    value={inputValue} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter email" 
                                    required 
                                />
                                <button type="submit" onClick={handleAddEmail}>Add Email</button>
                            </div>
                        )}
                    </div>
                </div>
                {accessLevel === "private" && (
                    <div>
                        <div style={styles.chipContainer}>
                            {emails.map((email, index) => (
                                <div key={index} style={styles.chip}>
                                    {email}
                                    <button 
                                        style={styles.removeButton} 
                                        onClick={() => handleRemoveEmail(email)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            <div className='diaryEntry-button'>
                <button type="submit">저장</button>
            </div>
        </form>
    </div>
    );
}

const styles = {
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '10px'
    },
    chip: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: '25px',
        padding: '5px 10px',
        margin: '5px',
        fontSize: '14px'
    },
    removeButton: {
        background: 'none',
        border: 'none',
        marginLeft: '10px',
        cursor: 'pointer',
        fontSize: '16px'
    }
};

export default DiaryEntry;