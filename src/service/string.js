export const TOKEN = "token";
export const MEMBERID = "memberId";

export const diarynavUrl = "/data/diarynav.json";

const urlPrefix = "http://3.37.128.34:8080";


export const urlSetAdminRole = urlPrefix + "/svc/setAdminRole";

export const urlLogin = urlPrefix + "/pub/login";

// 서비스페이지
export const urlDiaryList = urlPrefix + "/svc/diaryList";
export const urlCcreateDiary = urlPrefix + "/svc/diary";
export const urlMeDiaryList = urlPrefix + "/svc/me/diaryList";
export const urlAddMembers = urlPrefix + "/pub/members";
export const urlComment = urlPrefix + "/pub/diary/{diaryId}/comment"
export const urlDiaryDetail = urlPrefix + "/svc/diaryDetail"
export const urlDiaryEdit = urlPrefix + "/svc/diary"
export const urlSharedDiaryDetail = urlPrefix + "/svc/diaryDetail"
export const urlMemberIdByEmail = urlPrefix + "/pub/memberId"
export const urlsetDiaryShares = (diaryId) => `${urlPrefix}/svc/diary/${diaryId}/shares`;

export const urlDetailInfo = urlPrefix + "/svc/member/me/detailInfo"
export const urlUpdateUserNickname = (memberId) => `${urlPrefix}/svc/members/${memberId}`;
export const urlAddComment = urlPrefix + "/svc/comment"
export const urlGetComment = urlPrefix + "/svc/diary"

// 어드민페이지
export const urlMembers = urlPrefix + "/pub/members";
export const urlMemberPost = urlPrefix + "/pub/diaryList";
export const urlMemberList = urlPrefix + "/admin/memberList";
export const urlAdminMemberGet = urlPrefix + "/pub/members";
export const urlDiaryListAdmin = urlPrefix + "/admin/diaryList"