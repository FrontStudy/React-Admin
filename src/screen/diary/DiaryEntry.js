import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { servicesGetStorage } from "../../service/storage";
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
    const [friendIds, setFriendIds] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const handleAddEmail = async (e) => {
        e.preventDefault();
        if (!inputValue) {
            console.log("input is empty");
            TOA.servicesUseToast('이메일을 입력해주세요.', 'w');
            return;
        }
        
        // Todo: email validation
        
        if (emails.includes(inputValue)) {
            TOA.servicesUseToast('이미 입력한 이메일입니다.', 'w');
            return;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(inputValue)) {
            TOA.servicesUseToast('유효한 이메일을 입력해주세요.', 'w');
            return;
        }

        const response = await API.servicesGetData(STR.urlMemberIdByEmail, {
            email: inputValue
        })

        if (response && response.data) {
            
            if (response.data != servicesGetStorage(STR.MEMBERID)) {
                setFriendIds([...friendIds, response.data])
                setEmails([...emails, inputValue]);
                setInputValue('');  
            } else {
                TOA.servicesUseToast("본인에게 공유할 수 없습니다.", "e");
            }

        } else {
            TOA.servicesUseToast("서버 요청 에러", "e");
            console.log("STR.urlMemberIdByEmail 요청 에러");
            console.log(response);
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
            .then((res1) => {
            console.log(friendIds);
            if (res1 && res1.data) {
                API.servicesPatchData(STR.urlsetDiaryShares(res1.data), {
                    memberIds: friendIds
                })
                .then((res2) => {
                    console.log(res2);
                    if (res2 && res2.status == 'success') {
                        navigate('/Mydiarypage');
                    } else {
                        console.error('응답 데이터에 문제가 있습니다:', res2);
                    }
                })
                .catch((e) =>
                    console.error(`오류: ${e}`)
                );
            } 
        })
        .catch((e) =>
            console.error(`오류: ${e}`)
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
                                onChange={() => {
                                    setAccessLevel("public");
                                    setEmails([]);
                                }}
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
                    </div>
                </div>
                {accessLevel === "private" && (
                        <div>
                            <input 
                                type="email" 
                                value={inputValue} 
                                onChange={handleInputChange} 
                                placeholder="Enter email"
                            />
                            <button type="submit" onClick={handleAddEmail}>Add Email</button>
                        </div>
                    )}
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