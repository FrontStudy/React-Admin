export const TOKEN = "token";

export const diarynavUrl = "/data/diarynav.json";

const urlPrefix = "http://3.37.128.34:8080";


export const urlSetAdminRole = urlPrefix + "/svc/setAdminRole";

export const urlLogin = urlPrefix + "/pub/login";

// 서비스페이지
export const urlDiaryList = urlPrefix + "/svc/diaryList";
export const urlCcreateDiary = urlPrefix + "/svc/diary";
export const urlMeDiaryList = urlPrefix + "/svc/me/diaryList";
export const urlAddMembers = urlPrefix + "/pub/members ";
export const urlComment = urlPrefix + "/pub/diary/{diaryId}/comment"

// 어드민페이지
export const urlMembers = urlPrefix + "/pub/members";
export const urlMemberPost = urlPrefix + "/pub/diaryList";
export const urlMemberList = urlPrefix + "/admin/memberList";
export const urlAdminMemberGet = urlPrefix + "/pub/members";
export const urlDiaryListAdmin = urlPrefix + "/admin/diaryList"