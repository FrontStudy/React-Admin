import Diaryheader from "./Diaryheader";
import Diarynavigation from "./Diarynavigation";
import Diarymain from "../Diarymain";

export default function DiarylayoutMain({ nowTitle, component }) {
console.log(nowTitle);
  return (
    <div id="diarywrap">
      <Diarynavigation />
      <div className="diarycontentWrap">
        <Diaryheader />
        <section className="containerWrap">
          <h2>{nowTitle}</h2>
          <div className="contentBox">{component}</div>
        </section>
      </div>
    </div>
  );
}
