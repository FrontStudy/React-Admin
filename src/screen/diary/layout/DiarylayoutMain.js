import Diaryheader from "./Diaryheader";
import Diarynavigation from "./Diarynavigation";
import Diarymain from "../Diarymain";

export default function DiarylayoutMain({ nowTitle, component }) {
console.log(nowTitle);
  return (
    <div id="diarywrap">
      <Diarynavigation />
      <div className="diarycontentWrap">
        <Diaryheader nowTitle={nowTitle} />
        <section className="containerWrap">
          <div className="contentBox">{component}</div>
        </section>
      </div>
    </div>
  );
}
