import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  RotateCcw,
  Pill,
  Building2,
  Sparkles,
  Users,
  FileBarChart,
  Target,
  Gauge,
  ClipboardCheck,
  Award,
  Stethoscope,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  Legend,
  ComposedChart,
} from "recharts";

export const Route = createFileRoute("/")({ component: Index });

const TEAL = "#14b8a6";
const TEAL_DARK = "#0d9488";
const NAVY = "#0a2540";
const GREEN = "#16a34a";
const AMBER = "#f59e0b";
const RED = "#ef4444";
const SLATE = "#64748b";

/* ---------- helpers ---------- */
function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1400px] px-6 py-8 space-y-6">{children}</div>;
}

function Header() {
  return (
    <div className="flex items-start justify-between border-b border-slate-200 pb-6">
      <div>
        <div className="flex items-center gap-2 text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          <Activity className="h-4 w-4" />
          Pharmaceutical Analytics
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          KAM HCO Performance Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Strategic account-level insights across sales, access, engagement, and hierarchy
        </p>
      </div>
      <div className="flex items-start gap-3">
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-slate-400">Last Updated</div>
          <div className="text-sm font-medium text-slate-700 mt-1">May 26, 2026, 3:12 PM</div>
        </div>
        <div className="h-11 w-11 rounded-lg bg-[#0a2540] grid place-items-center text-white">
          <Activity className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function FilterBar() {
  const filters = [
    ["Time Period", "YTD"],
    ["Territory / Region", "All Regions"],
    ["HCO Type", "All Types"],
    ["Facility", "All Facilities"],
    ["IDN", "All IDNs"],
    ["Provider Network", "All Networks"],
    ["Payer Type", "All Payers"],
    ["Product", "Cardiox-XR 50mg"],
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
        {filters.map(([label, val]) => (
          <div key={label}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              {label}
            </div>
            <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-none">
              <option>{val}</option>
            </select>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
}

function Tabs({ active, onChange }: { active: number; onChange: (n: number) => void }) {
  const labels = ["Executive Summary", "Account Level", "Account 360 View"];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-1.5 grid grid-cols-3 gap-1">
      {labels.map((l, i) => (
        <button
          key={l}
          onClick={() => onChange(i)}
          className={`h-12 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition ${
            active === i ? "bg-[#0a2540] text-white" : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <span className="text-xs opacity-60">0{i + 1}</span>
          {l}
        </button>
      ))}
    </div>
  );
}

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div>
      <div className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">{kicker}</div>
      <h2 className="text-2xl font-bold text-slate-900 mt-1">{title}</h2>
      <p className="text-slate-500 text-sm mt-1">{sub}</p>
    </div>
  );
}

function KpiCard({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  icon,
  iconBg,
  iconColor,
}: {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  deltaLabel: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </div>
        <div
          className="h-9 w-9 rounded-lg grid place-items-center"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        {unit && <div className="text-slate-400 text-sm">{unit}</div>}
      </div>
      <div className="mt-2 text-xs flex items-center gap-1.5">
        <span className="text-green-600 font-semibold">↑ {delta}</span>
        <span className="text-slate-500">{deltaLabel}</span>
      </div>
    </div>
  );
}

function Card({
  title,
  sub,
  right,
  children,
  className = "",
}: {
  title?: string;
  sub?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-6 ${className}`}>
      {(title || right) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
            {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------- Data ---------- */
const trendData = [
  { m: "Dec'24", v: 2250 },
  { m: "Jan'25", v: 2400 },
  { m: "Feb'25", v: 2600 },
  { m: "Mar'25", v: 2720 },
  { m: "Apr'25", v: 2820 },
  { m: "May'25", v: 2860 },
  { m: "Jun'25", v: 2840 },
  { m: "Jul'25", v: 2900 },
  { m: "Aug'25", v: 2872 },
  { m: "Sep'25", v: 2810 },
  { m: "Oct'25", v: 2780 },
  { m: "Nov'25", v: 2770 },
];

const topGrowth = [
  { name: "HCA Healthcare", v: 14 },
  { name: "Mercy Health System", v: 11 },
  { name: "Trinity Health", v: 9 },
  { name: "Ascension Network", v: 7.5 },
  { name: "CommonSpirit Health", v: 6.5 },
];

const velocity = [
  { m: "Dec'24", b: 0, l: 1.2 },
  { m: "Jan'25", b: 1.4, l: 2.5 },
  { m: "Feb'25", b: 1.1, l: 3.2 },
  { m: "Mar'25", b: 0.5, l: 3.5 },
  { m: "Apr'25", b: -0.4, l: 2.8 },
  { m: "May'25", b: -1.2, l: 1.9 },
  { m: "Jun'25", b: -1.4, l: 1.2 },
  { m: "Jul'25", b: -1.2, l: 0.6 },
  { m: "Aug'25", b: -0.2, l: 0.4 },
  { m: "Sep'25", b: -0.8, l: 0.2 },
  { m: "Oct'25", b: 0.1, l: 0.3 },
  { m: "Nov'25", b: 0.6, l: 0.8 },
];

const callActivity = trendData.map((d, i) => ({
  m: d.m,
  inPerson: 180 + i * 3,
  virtual: 130 + (i % 4) * 5,
  phone: 80 + ((i * 2) % 6),
  target: 420,
}));

const accessData = [
  { name: "Open Access", value: 58, fill: GREEN },
  { name: "Restricted", value: 31, fill: AMBER },
  { name: "Blocked", value: 11, fill: RED },
];

const newAccounts: {
  account: string;
  territory: string;
  activatedOn: string;
  trx: number;
  status: "Active" | "Ramping";
}[] = [
  { account: "Banner Health", territory: "Southwest", activatedOn: "Nov 12, 2025", trx: 42, status: "Ramping" },
  { account: "Geisinger Health", territory: "Mid-Atlantic", activatedOn: "Nov 04, 2025", trx: 58, status: "Active" },
  { account: "Intermountain Health", territory: "West", activatedOn: "Oct 28, 2025", trx: 71, status: "Active" },
  { account: "Sutter Health", territory: "West", activatedOn: "Oct 18, 2025", trx: 36, status: "Ramping" },
  { account: "Tenet Healthcare", territory: "Southeast", activatedOn: "Oct 09, 2025", trx: 88, status: "Active" },
  { account: "AdventHealth", territory: "Southeast", activatedOn: "Sep 30, 2025", trx: 64, status: "Active" },
];

const activations = [
  { name: "Northeast", v: 28 },
  { name: "Mid-Atlantic", v: 22 },
  { name: "Southeast", v: 16 },
  { name: "Midwest", v: 24 },
  { name: "Southwest", v: 12 },
  { name: "West", v: 14 },
];

const penetration = [
  { name: "Northeast", v: 72 },
  { name: "Mid-Atlantic", v: 64 },
  { name: "Southeast", v: 58 },
  { name: "Midwest", v: 69 },
  { name: "Southwest", v: 47 },
  { name: "West", v: 53 },
];

const formulary = [
  { name: "Mercy Health System", preferred: 30, covered: 30, restricted: 25, blocked: 15 },
  { name: "Ascension Network", preferred: 35, covered: 30, restricted: 22, blocked: 13 },
  { name: "HCA Healthcare", preferred: 50, covered: 28, restricted: 12, blocked: 10 },
  { name: "Kaiser Permanente", preferred: 28, covered: 42, restricted: 18, blocked: 12 },
  { name: "CommonSpirit Health", preferred: 32, covered: 33, restricted: 22, blocked: 13 },
  { name: "Trinity Health", preferred: 38, covered: 30, restricted: 20, blocked: 12 },
];

const protocolStatus = [
  { name: "Included", value: 47, fill: GREEN },
  { name: "Pending", value: 28, fill: AMBER },
  { name: "Not Included", value: 25, fill: SLATE },
];

const ptPresentations = [
  { m: "Dec'24", scheduled: 10, completed: 7 },
  { m: "Jan'25", scheduled: 10, completed: 8 },
  { m: "Feb'25", scheduled: 10, completed: 10 },
  { m: "Mar'25", scheduled: 10, completed: 10 },
  { m: "Apr'25", scheduled: 10, completed: 10 },
  { m: "May'25", scheduled: 10, completed: 9 },
  { m: "Jun'25", scheduled: 10, completed: 7 },
  { m: "Jul'25", scheduled: 10, completed: 8 },
  { m: "Aug'25", scheduled: 10, completed: 7 },
  { m: "Sep'25", scheduled: 10, completed: 6 },
  { m: "Oct'25", scheduled: 10, completed: 6 },
  { m: "Nov'25", scheduled: 10, completed: 7 },
];

const quarters = [
  { q: "Q4'24", v: 14500 },
  { q: "Q1'25", v: 16240 },
  { q: "Q2'25", v: 17800 },
  { q: "Q3'25", v: 19350 },
];

/* ---------- Tabs ---------- */
function ExecutiveTab() {
  const [trendMode, setTrendMode] = useState<"TRx" | "NRx">("NRx");
  return (
    <div className="space-y-8">
      <SectionTitle
        kicker="Tab 01 — Executive Summary"
        title="Overall Nation Performance"
        sub="National KPIs, access posture, engagement and growth momentum"
      />
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Nation TRx (YTD)"
          value="111,932"
          delta="4.8%"
          deltaLabel="vs prior 12 mo"
          icon={<Pill className="h-4 w-4" />}
          iconBg="#cffafe"
          iconColor="#0e7490"
        />
        <KpiCard
          label="Nation NRx (YTD)"
          value="32,783"
          delta="6.2%"
          deltaLabel="vs prior 12 mo"
          icon={<Pill className="h-4 w-4" />}
          iconBg="#dcfce7"
          iconColor="#15803d"
        />
        <KpiCard
          label="Active HCOs"
          value="96"
          unit="/124"
          delta="4.1%"
          deltaLabel="Strategic accounts writing"
          icon={<Building2 className="h-4 w-4" />}
          iconBg="#dcfce7"
          iconColor="#15803d"
        />
        <KpiCard
          label="New Activations (YTD)"
          value="142"
          delta="9.4%"
          deltaLabel="Net-new HCOs"
          icon={<Sparkles className="h-4 w-4" />}
          iconBg="#dcfce7"
          iconColor="#15803d"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card
          className="col-span-2"
          title={`Nation ${trendMode} — 12 Month Trend`}
          sub="32,783 NRx prescriptions · +19.2% vs Dec'24"
          right={
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              {(["TRx", "NRx"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setTrendMode(m)}
                  className={`px-4 py-1 text-xs font-semibold rounded-full ${trendMode === m ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="teal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TEAL} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={TEAL} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="m" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="v"
                stroke={TEAL}
                strokeWidth={2.5}
                fill="url(#teal)"
                dot={{ r: 4, fill: TEAL }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-500"></span> NRx volume ·
            <span className="text-green-600 font-semibold">↗ Trending upward · 19.2% growth</span>
          </div>
        </Card>

        <Card title="Top 5 MoM Growth HCOs" sub="Highest month-over-month TRx growth">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topGrowth} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={100} />
              <Tooltip />
              <Bar dataKey="v" fill={GREEN} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* National Growth Velocity — left text REMOVED */}
      <Card title="National Growth Velocity" sub="Month-over-month TRx growth · momentum & acceleration view">
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={velocity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="m" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${v}%`} />
            <Tooltip />
            <ReferenceLine y={0} stroke="#94a3b8" />
            <Bar dataKey="b" radius={[3, 3, 3, 3]}>
              {velocity.map((d, i) => (
                <Cell key={i} fill={d.b >= 0 ? "#86efac" : "#fca5a5"} />
              ))}
            </Bar>
            <Line type="monotone" dataKey="l" stroke={NAVY} strokeWidth={2.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Access Classification" sub="Open · Restricted · Blocked">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={accessData}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {accessData.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {accessData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.fill }} />
                  {d.name}
                </span>
                <span className="font-semibold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          className="col-span-2"
          title="HCO Call Activity by Channel"
          sub="In-Person · Virtual · Phone — target: 420 calls/mo"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={callActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="m" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar dataKey="inPerson" stackId="a" fill={NAVY} name="In-Person" />
              <Bar dataKey="virtual" stackId="a" fill={TEAL} name="Virtual" />
              <Bar dataKey="phone" stackId="a" fill="#7dd3fc" name="Phone" />
              <ReferenceLine y={420} stroke={AMBER} strokeDasharray="6 4" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Newly Activated Accounts" sub="Recent HCO activations with first-Rx volume and ramp status">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {["Account", "Territory", "Activated On", "First-Month TRX", "Status"].map((h, i) => (
                  <th
                    key={h}
                    className={`py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 ${
                      i === 3 ? "text-right" : i === 4 ? "text-left pl-6" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newAccounts.map((r) => (
                <tr key={r.account} className="border-b border-slate-100 last:border-0">
                  <td className="py-3.5 font-semibold text-slate-900">{r.account}</td>
                  <td className="py-3.5 text-slate-600">{r.territory}</td>
                  <td className="py-3.5 text-slate-600">{r.activatedOn}</td>
                  <td className="py-3.5 text-right font-medium text-slate-900">{r.trx}</td>
                  <td className="py-3.5 pl-6">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        r.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AccountLevelTab() {
  return (
    <div className="space-y-8">
      <SectionTitle
        kicker="Tab 02 — Account Level"
        title="Territory, Formulary & Account KPIs"
        sub="Account performance, territory penetration, and formulary intelligence"
      />
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total Claims" value="67,320" delta="6.4%" deltaLabel="vs prior period" icon={<FileBarChart className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
        <KpiCard label="No. of HCPs" value="4,218" delta="2.1%" deltaLabel="Affiliated providers" icon={<Users className="h-4 w-4" />} iconBg="#cffafe" iconColor="#0e7490" />
        <KpiCard label="Total TRx" value="111,932" delta="4.8%" deltaLabel="12 mo rolling" icon={<Pill className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
        <KpiCard label="Total NRx" value="32,783" delta="6.2%" deltaLabel="12 mo rolling" icon={<Pill className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
        <KpiCard label="No. of Targets" value="1,840" delta="1.2%" deltaLabel="Targeted HCPs" icon={<Target className="h-4 w-4" />} iconBg="#cffafe" iconColor="#0e7490" />
        <KpiCard label="No. of Accounts" value="124" delta="3.3%" deltaLabel="Strategic HCOs" icon={<Building2 className="h-4 w-4" />} iconBg="#cffafe" iconColor="#0e7490" />
        <KpiCard label="Target Penetration" value="61" unit="%" delta="2.4%" deltaLabel="Targets engaged" icon={<Gauge className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
        <KpiCard label="Active HCO Count" value="96" delta="4.1%" deltaLabel="Writing Rx in 90d" icon={<ClipboardCheck className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
      </div>

      <div>
        <div className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Section · Territory</div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">Territory Performance</h2>
        <p className="text-slate-500 text-sm mt-1">Activation and penetration across regions</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Activations by Territory" sub="Net-new HCOs by region (YTD)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activations} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={90} />
              <Tooltip />
              <Bar dataKey="v" fill={TEAL} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Account Penetration by Territory" sub="Targeted HCOs writing Rx vs 75% goal">
          <div className="space-y-5 mt-2">
            {penetration.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700">{p.name}</span>
                  <span className="text-slate-500">
                    <span className="font-semibold text-slate-900">{p.v}%</span> / 75%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#0a2540]" style={{ width: `${(p.v / 75) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <div className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Section · Formulary</div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">Formulary Intelligence</h2>
        <p className="text-slate-500 text-sm mt-1">Tier distribution across strategic accounts</p>
      </div>

      <Card title="Formulary Status by Account" sub="HCO-level tier distribution (%)">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={formulary} layout="vertical" margin={{ left: 40 }} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
            <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={140} />
            <Tooltip />
            <Legend />
            <Bar dataKey="preferred" stackId="a" fill={GREEN} name="Preferred" />
            <Bar dataKey="covered" stackId="a" fill={TEAL} name="Covered" />
            <Bar dataKey="restricted" stackId="a" fill={AMBER} name="Restricted" />
            <Bar dataKey="blocked" stackId="a" fill={RED} name="Blocked" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function HierarchyLevel({
  num,
  title,
  iconBg,
  rows,
}: {
  num: string;
  title: string;
  iconBg: string;
  rows: [string, string][];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center gap-3 p-5 border-b border-slate-100">
        <div className="h-11 w-11 rounded-lg grid place-items-center" style={{ background: iconBg }}>
          <Stethoscope className="h-5 w-5 text-teal-700" />
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Level {num} · {title.split(" ")[0]} Information
          </div>
          <div className="text-lg font-semibold text-slate-900">{title}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-slate-100">
        {rows.map(([k, v]) => (
          <div key={k} className="bg-white px-5 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{k}</div>
            <div className="text-sm text-slate-900 font-medium mt-1">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center">
      <div className="text-sm leading-none text-slate-300">⬇</div>
    </div>
  );
}

function Account360Tab() {
  return (
    <div className="space-y-8">
      <SectionTitle
        kicker="Tab 03 — Account 360 View"
        title="Single-Account Deep Dive"
        sub="Account intelligence, protocol adoption, claims, and HCO affiliation hierarchy"
      />

      <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Selected Account
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-teal-600" />
            <div className="text-lg font-semibold text-slate-900">HCA Healthcare</div>
            <span className="ml-2 inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
              ✦ Strategic IDN
            </span>
          </div>
        </div>
        <select className="h-10 rounded-lg border border-slate-200 px-3 text-sm">
          <option>HCA Healthcare</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Latest Quarter Claims" value="19,350" delta="8.1%" deltaLabel="Q3'25" icon={<FileBarChart className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
        <KpiCard label="Affiliated Providers" value="612" delta="2.6%" deltaLabel="Linked to this HCO" icon={<Users className="h-4 w-4" />} iconBg="#cffafe" iconColor="#0e7490" />
        <KpiCard label="Protocol Inclusion" value="47" unit="%" delta="5.2%" deltaLabel="Included pathways" icon={<Award className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
        <KpiCard label="P&T Completion" value="72" unit="%" delta="4.0%" deltaLabel="Scheduled vs completed" icon={<ClipboardCheck className="h-4 w-4" />} iconBg="#dcfce7" iconColor="#15803d" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Protocol Inclusion Status" sub="Account treatment pathway inclusion">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={protocolStatus} innerRadius={60} outerRadius={95} paddingAngle={2} dataKey="value">
                {protocolStatus.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {protocolStatus.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.fill }} />
                  {d.name}
                </span>
                <span className="font-semibold text-slate-700">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* SWAPPED: Claims by Quarter now where P&T Presentations was */}
        <Card title="Claims by Quarter" sub="Account quarterly claims volume">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={quarters}>
              <defs>
                <linearGradient id="qg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={NAVY} />
                  <stop offset="100%" stopColor={TEAL} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="q" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Bar dataKey="v" fill="url(#qg)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* SWAPPED: P&T Presentations now full-width where Claims was */}
      <Card title="P&T Presentations" sub="Monthly — scheduled vs completed">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={ptPresentations}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="m" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="scheduled" fill="#bae6fd" name="scheduled" radius={[3, 3, 0, 0]} />
            <Bar dataKey="completed" fill={NAVY} name="completed" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div>
        <div className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Section · Hierarchy</div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1">HCO Affiliation Summary</h2>
        <p className="text-slate-500 text-sm mt-1">
          HCP → Facility → HCO → Parent Organization relationship structure
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 space-y-2">
        <HierarchyLevel
          num="01"
          title="HCP Information"
          iconBg="#cffafe"
          rows={[
            ["HCP ID", "HCP-582914"],
            ["Specialty", "Oncology"],
            ["Affiliation Type", "Primary Affiliated Provider"],
            ["Territory", "Tennessee South"],
            ["Target Status", "High Priority"],
            ["KOL Status", "Medium"],
          ]}
        />
        <Arrow />
        <HierarchyLevel
          num="02"
          title="Facility Information"
          iconBg="#dcfce7"
          rows={[
            ["Facility Name", "TriStar Centennial Medical Center"],
            ["Facility Type", "Acute Care Hospital"],
            ["Facility ID", "FAC-88312"],
            ["Address", "2300 Patterson St"],
            ["City", "Nashville"],
            ["State", "Tennessee"],
            ["Bed Capacity", "741"],
          ]}
        />
        <Arrow />
        <HierarchyLevel
          num="03"
          title="HCO Information"
          iconBg="#fef3c7"
          rows={[
            ["HCO Name", "HCA TriStar Division"],
            ["HCO Type", "Provider Network"],
            ["HCO ID", "HCO-20481"],
            ["Region", "Southeast"],
            ["Territory", "Tennessee South"],
            ["Formulary Status", "Preferred"],
            ["Protocol Status", "Included"],
          ]}
        />
        <Arrow />
        <HierarchyLevel
          num="04"
          title="Parent Information"
          iconBg="#e0e7ff"
          rows={[
            ["Parent Name", "HCA Healthcare, Inc."],
            ["Parent Type", "IDN"],
            ["Parent ID", "PARENT-10021"],
            ["Headquarters", "One Park Plaza"],
            ["City", "Nashville"],
            ["State", "Tennessee"],
            ["Total Facilities", "182"],
          ]}
        />
      </div>
    </div>
  );
}


function Index() {
  const [tab, setTab] = useState(0);
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Shell>
        <Header />
        <FilterBar />
        <Tabs active={tab} onChange={setTab} />
        {tab === 0 && <ExecutiveTab />}
        {tab === 1 && <AccountLevelTab />}
        {tab === 2 && <Account360Tab />}
      </Shell>
    </div>
  );
}
