import { useI18n } from "@/components/I18n";

export default function D6TrustBoundaryDiagram() {
  const { lang } = useI18n();
  const L = (zh: string, en: string) => (lang === "en" ? en : zh);

  return (
    <svg viewBox="0 0 1040 320" role="img" aria-label={L("信任边界图：不可信输入穿过认证、对象级授权、校验、脱敏的检查点，才能接触数据与密钥", "Trust boundary: untrusted input passes authn, object-level authz, validation and masking checkpoints before touching data and secrets")} className="diagram diagram-sm">
      <title>{L("D6 安全 · 信任边界与检查点", "D6 Security · trust boundary & checkpoints")}</title>
      <defs>
        <marker id="d6-m" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" className="marker-ink" />
        </marker>
      </defs>
      <line x1={540} y1={36} x2={540} y2={284} className="mn-acc-line mn-dash" />
      <text x={540} y={24} textAnchor="middle" className="mn-a">{L("信任边界", "trust boundary")}</text>
      <text x={60} y={52} className="mn-f">{L("不可信 · UNTRUSTED", "UNTRUSTED")}</text>
      <text x={620} y={52} className="mn-f">{L("可信 · TRUSTED", "TRUSTED")}</text>
      <rect x={60} y={80} width={150} height={52} rx={4} className="mn-r" />
      <text x={135} y={112} textAnchor="middle" className="mn-t">{L("用户请求", "user request")}</text>
      <rect x={60} y={156} width={150} height={52} rx={4} className="mn-rd" />
      <text x={135} y={188} textAnchor="middle" className="mn-t">{L("注入 · 越权", "injection · IDOR")}</text>
      <rect x={60} y={232} width={150} height={52} rx={4} className="mn-rd" />
      <text x={135} y={264} textAnchor="middle" className="mn-t">{L("伪造凭证", "forged credentials")}</text>
      <rect x={460} y={96} width={160} height={172} rx={4} className="mn-rt" />
      <text x={540} y={122} textAnchor="middle" className="mn-t">{L("检查点", "checkpoints")}</text>
      <text x={540} y={150} textAnchor="middle" className="mn-s">{L("认证", "AuthN")}</text>
      <text x={540} y={176} textAnchor="middle" className="mn-s">{L("授权 · 对象级", "AuthZ · object-level")}</text>
      <text x={540} y={202} textAnchor="middle" className="mn-s">{L("输入校验", "input validation")}</text>
      <text x={540} y={228} textAnchor="middle" className="mn-s">{L("脱敏", "masking")}</text>
      <rect x={760} y={100} width={220} height={64} rx={4} className="mn-r" />
      <text x={870} y={128} textAnchor="middle" className="mn-t">{L("数据", "data")}</text>
      <text x={870} y={150} textAnchor="middle" className="mn-f">{L("每一次对象访问都检查", "checked on every object access")}</text>
      <rect x={760} y={196} width={220} height={64} rx={4} className="mn-r" />
      <text x={870} y={224} textAnchor="middle" className="mn-t">{L("密钥管理", "secrets")}</text>
      <text x={870} y={246} textAnchor="middle" className="mn-f">{L("进过 git = 已泄露", "committed to git once = leaked")}</text>
      <line x1={210} y1={106} x2={460} y2={150} className="mn-arrow" markerEnd="url(#d6-m)" />
      <line x1={210} y1={182} x2={460} y2={182} className="mn-arrow" markerEnd="url(#d6-m)" />
      <line x1={210} y1={258} x2={460} y2={214} className="mn-arrow" markerEnd="url(#d6-m)" />
      <line x1={620} y1={132} x2={760} y2={132} className="mn-arrow" markerEnd="url(#d6-m)" />
      <line x1={620} y1={228} x2={760} y2={228} className="mn-arrow" markerEnd="url(#d6-m)" />
    </svg>
  );
}
