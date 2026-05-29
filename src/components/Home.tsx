import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip, type TooltipContentProps, type TooltipIndex, XAxis, YAxis } from "recharts";

const stats = [
  { icon: '/icons/energy.svg',       value: '1,930kCal', label: 'Calories',  bg: '#FBEAEA' },
  { icon: '/icons/chicken.svg',      value: '155g',      label: 'Proteines', bg: '#E8F0FF' },
  { icon: '/icons/apple.svg',        value: '290g',      label: 'Glucides',  bg: '#FFF3CC' },
  { icon: '/icons/cheeseburger.svg', value: '50g',       label: 'Lipides',   bg: '#FFE8EA' },
] as const;

const dataActivity = [
  {
    name: '1',
    kg: 68,
    kcal: 356
  },
  {
    name: '2',
    kg: 69,
    kcal: 349
  },
  {
    name: '3',
    kg: 68,
    kcal: 310
  },
  {
    name: '4',
    kg: 69,
    kcal: 800
  },
  {
    name: '5',
    kg: 67,
    kcal: 100
  },
  {
    name: '6',
    kg: 67,
    kcal: 320
  },
  {
    name: '7',
    kg: 68,
    kcal: 329
  },
  {
    name: '8',
    kg: 67,
    kcal: 510
  },
  {
    name: '9',
    kg: 66,
    kcal: 1100
  },
  {
    name: '10',
    kg: 68,
    kcal: 342
  }
];

const dataSessions = [
  {
    name: 'L',
    value: 400
  },
  {
    name: 'M',
    value: 300
  },
  {
    name: 'M',
    value: 320
  },
  {
    name: 'J',
    value: 200
  },
  {
    name: 'V',
    value: 278
  },
  {
    name: 'S',
    value: 189
  },
  {
    name: 'D',
    value: 189
  }
];

const dataPerformance = [
  { subject: 'Intensité', value: 80 },
  { subject: 'Vitesse', value: 90 },
  { subject: 'Force', value: 70 },
  { subject: 'Endurance', value: 85 },
  { subject: 'Energie', value: 60 },
  { subject: 'Cardio', value: 75 },
];

const SessionCursor = ({ points, height }: any) => {
  if (!points?.length) return null;
  return <rect x={points[0].x} y={0} width={9999} height={height} fill="rgba(0,0,0,0.15)" />;
};

const SessionTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div style={{ background: 'white', padding: '8px 12px', fontSize: '12px', fontWeight: 500, borderRadius: 2 }}>
      {payload[0].value} min
    </div>
  );
};

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  const kg = payload?.[0];
  const kcal = payload?.[1];
  const isVisible = active && kg != null && kcal != null;
  return (
    <div style={{
      visibility: isVisible ? 'visible' : 'hidden',
      background: '#E60000',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '1.8',
    }}>
      {isVisible && (
        <>
          <p>{`${kg.value}kg`}</p>
          <p>{`${kcal.value}Kcal`}</p>
        </>
      )}
    </div>
  );
};

const ActivityLegend = () => (
  <div style={{ display: 'flex', gap: '24px' }}>
    {[{ label: 'Poids (kg)', color: '#282D30' }, { label: 'Calories brûlées (kCal)', color: '#E60000' }].map(({ label, color }) => (
      <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#74798C' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
        {label}
      </span>
    ))}
  </div>
);

export default function HomeComponent({
  isAnimationActive,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  return (
    <div className="grow min-h-0 bg-[#F2F2F2] overflow-hidden">
      <div className="flex flex-col h-full px-10 py-8 gap-8">
      <div>
        <h1 className="text-4xl font-bold">
          Bonjour <span className="text-[#E60000]">Thomas</span>
        </h1>
        <p className="text-[#74798C] mt-2">Félicitation ! Vous avez explosé vos objectifs hier 🎉</p>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-4 grid-rows-2 gap-4">
      <div className="col-span-3 row-span-1 rounded-md bg-[#fbfbfb] p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-[15px]">Activité quotidienne</h2>
          <ActivityLegend />
        </div>
        <BarChart
          style={{ width: '100%', flex: 1 }}
          barSize={7}
          barGap={8}
          barCategoryGap="40%"
          responsive
          data={dataActivity}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dedede" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9B9EAC', fontSize: 14 }} />
          <YAxis
            yAxisId="kg"
            dataKey="kg"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tickCount={3}
            domain={[(min: number) => min - 1, (max: number) => max + 1]}
            tick={{ fill: '#9B9EAC', fontSize: 14 }}
          />
          <YAxis yAxisId="kcal" dataKey="kcal" hide />
          <Tooltip
            content={CustomTooltip}
            cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
            isAnimationActive={isAnimationActive}
            defaultIndex={defaultIndex}
          />
          <Bar yAxisId="kg" dataKey="kg" fill="#282D30" radius={[3, 3, 0, 0]} />
          <Bar yAxisId="kcal" dataKey="kcal" fill="#E60000" radius={[3, 3, 0, 0]} />
        </BarChart>
      </div>

      <div className="col-span-1 row-span-2 flex flex-col justify-around p-4 gap-4">
        {stats.map(({ icon, value, label, bg }) => (
          <div key={label} className="flex items-center gap-4 bg-[#fbfbfb] rounded-md p-6 flex-1">
            <div style={{ background: bg, borderRadius: 8, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={icon} alt={label} width={24} height={24} />
            </div>
            <div>
              <p className="font-bold text-lg text-[#282D30]">{value}</p>
              <p className="text-sm text-[#74798C]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-3 grid grid-cols-3 row-span-1 gap-4">
        <div className="bg-[#E60000] col-span-1 rounded-md relative overflow-hidden">
          <p className="absolute top-6 left-6 text-white/60 font-medium text-sm leading-snug z-10">
            Durée moyenne des<br />sessions
          </p>
          <LineChart
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            responsive
            data={dataSessions}
            margin={{ top: 80, right: 0, bottom: 20, left: 0 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            />
            <Tooltip
              content={SessionTooltip}
              cursor={<SessionCursor />}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: 'white', stroke: 'white' }}
            />
          </LineChart>
        </div>

        <div className="col-span-1 rounded-md" style={{ background: '#1B1B27' }}>
          <RadarChart
            style={{ width: '100%', height: '100%' }}
            responsive
            data={dataPerformance}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
          >
            <PolarGrid stroke="rgba(255,255,255,0.2)" radialLines={false} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'white', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Radar
              dataKey="value"
              fill="#E60000"
              fillOpacity={0.75}
              stroke="#E60000"
              strokeWidth={1}
            />
          </RadarChart>
        </div>

        <div className="col-span-1 rounded-md bg-white relative">
          <p className="absolute top-4 left-4 font-bold text-sm text-[#20253A] z-10">Score</p>
          <PieChart style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} responsive>
            <Pie
              data={[{ value: 12 }, { value: 88 }]}
              innerRadius="55%"
              outerRadius="75%"
              startAngle={210}
              endAngle={-30}
              dataKey="value"
              strokeWidth={0}
              cornerRadius={10}
            >
              <Cell fill="#E60000" />
              <Cell fill="transparent" />
            </Pie>
          </PieChart>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-[#282D30]">12%</p>
            <p className="text-sm text-[#74798C] text-center leading-tight">de votre<br />objectif</p>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}