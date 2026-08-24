import { checks } from "@/data/sitemap";
import CheckView from "./CheckView";

/* 三道自检连排：覆盖推导、层次、安全三个最容易混的判断 */

const LIST = [checks.check1, checks.check2, checks.check3];

export default function ChecksPanel() {
  return (
    <div className="reveal checks-panel">
      <p className="eyebrow">检索练习 · 先回想，再看答案</p>
      <h2 className="view-title">三问自检</h2>
      {LIST.map((c, i) => (
        <section key={c.question} className="checks-item">
          <span className="mini-label">问题 {i + 1} / 3</span>
          <CheckView check={c} title={null} eyebrow={null} />
        </section>
      ))}
    </div>
  );
}
