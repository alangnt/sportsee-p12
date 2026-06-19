import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
  type TooltipContentProps,
  type TooltipIndex,
  XAxis,
  YAxis,
} from 'recharts';
import { getUserData } from '../services/api';
import { DAY_LABELS } from '../models/UserAverageSessions';
import type { UserData } from '../types';

const SessionCursor = ({ points }: any) => {
  if (!points?.length) return null;
  return <rect x={points[0].x} y={-9999} width={9999} height={19999} fill="rgba(0,0,0,0.15)" />;
};

const SessionTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="bg-white px-3 py-2 text-xs font-medium rounded-sm">
      {payload[0].value} min
    </div>
  );
};

const ActivityTooltip = ({ active, payload }: TooltipContentProps) => {
  const kg = payload?.[0];
  const kcal = payload?.[1];
  const isVisible = active && kg != null && kcal != null;
  return (
    <div className={`${isVisible ? 'visible' : 'invisible'} bg-[#E60000] text-white px-3 py-2 rounded text-xs font-medium leading-[1.8]`}>
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
  <div className="flex gap-6">
    {[{ label: 'Poids (kg)', color: '#282D30' }, { label: 'Calories brûlées (kCal)', color: '#E60000' }].map(({ label, color }) => (
      <span key={label} className="flex items-center gap-2 text-sm text-[#74798C]">
        <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
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
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    getUserData(Number(userId))
      .then(setUserData)
      .catch((err) => {
        console.error('Échec du chargement des données utilisateur :', err);
        setError('Impossible de charger les données utilisateur.');
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="grow bg-[#F2F2F2] flex items-center justify-center text-[#74798C]">
        Chargement...
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="grow bg-[#F2F2F2] flex items-center justify-center text-red-500">
        {error ?? 'Erreur inconnue'}
      </div>
    );
  }

  const { mainData, activity, averageSessions, performance } = userData;
  const scorePercent = Math.round(mainData.score * 100);

  const stats = [
    { icon: '/icons/energy.svg', value: `${mainData.calorieCount.toLocaleString('fr-FR')}kCal`, label: 'Calories', bg: '#FBEAEA' },
    { icon: '/icons/chicken.svg', value: `${mainData.proteinCount}g`, label: 'Proteines', bg: '#E8F0FF' },
    { icon: '/icons/apple.svg', value: `${mainData.carbohydrateCount}g`, label: 'Glucides', bg: '#FFF3CC' },
    { icon: '/icons/cheeseburger.svg', value: `${mainData.lipidCount}g`, label: 'Lipides', bg: '#FFE8EA' },
  ] as const;

  return (
    <div className="grow min-h-0 bg-[#F2F2F2] overflow-hidden">
      <div className="flex flex-col h-full px-12 py-10 xl:px-18 xl:py-16 gap-8">
        <div>
          <h1 className="text-4xl font-bold">
            Bonjour <span className="text-[#E60000]">{mainData.firstName}</span>
          </h1>
          <p className="text-[#74798C] mt-2">Félicitation ! Vous avez explosé vos objectifs hier 🎉</p>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-4 grid-rows-2 gap-4">
          <section className="col-span-3 row-span-1 rounded-md bg-[#fbfbfb] p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[15px]">Activité quotidienne</h2>
              <ActivityLegend />
            </div>
            <BarChart
              className="w-full flex-1"
              barSize={7}
              barGap={8}
              barCategoryGap="40%"
              responsive
              data={activity}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dedede" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9B9EAC', fontSize: 14 }} />
              <YAxis
                yAxisId="kg"
                dataKey="kilogram"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tickCount={3}
                domain={[(min: number) => min - 1, (max: number) => max + 1]}
                tick={{ fill: '#9B9EAC', fontSize: 14 }}
              />
              <YAxis yAxisId="kcal" dataKey="calories" hide />
              <Tooltip
                content={ActivityTooltip}
                cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
                isAnimationActive={isAnimationActive}
                defaultIndex={defaultIndex}
              />
              <Bar yAxisId="kg" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} />
              <Bar yAxisId="kcal" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} />
            </BarChart>
          </section>

          <section className="col-span-1 row-span-2 flex flex-col gap-4 h-full">
            {stats.map(({ icon, value, label, bg }) => (
              <div key={label} className="flex items-center gap-4 bg-[#fbfbfb] rounded-md p-6 h-full">
                <div className="rounded-lg w-14 h-14 flex items-center justify-center shrink-0" style={{ background: bg }}>
                  <img src={icon} alt={label} width={24} height={24} />
                </div>
                <div>
                  <p className="font-bold text-lg text-[#282D30]">{value}</p>
                  <p className="text-sm text-[#74798C]">{label}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="col-span-3 grid grid-cols-3 row-span-1 gap-4">
            <div className="bg-[#E60000] col-span-1 rounded-md relative overflow-hidden">
              <p className="absolute top-6 left-6 text-white/60 font-medium text-sm leading-snug z-10">
                Durée moyenne des<br />sessions
              </p>
              <LineChart
                className="w-full h-full absolute inset-0"
                responsive
                data={averageSessions}
                margin={{ top: 80, right: 20, bottom: 20, left: 0 }}
              >
                <XAxis
                  dataKey="day"
                  tickFormatter={(day: number) => DAY_LABELS[day - 1] ?? String(day)}
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
                  dataKey="sessionLength"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: 'white', stroke: 'white' }}
                />
              </LineChart>
            </div>

            <div className="col-span-1 rounded-md bg-[#1B1B27]">
              <RadarChart
                className="w-full h-full"
                responsive
                data={performance}
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
              >
                <PolarGrid stroke="#FFFFFF" radialLines={false} />
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
              <PieChart className="w-full h-full absolute inset-0" responsive>
                <Pie
                  data={[{ value: scorePercent, fill: '#E60000' }, { value: 100 - scorePercent, fill: 'transparent' }]}
                  innerRadius="70%"
                  outerRadius="75%"
                  startAngle={210}
                  endAngle={-30}
                  dataKey="value"
                  strokeWidth={0}
                  cornerRadius={10}
                />
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-[#282D30]">{scorePercent}%</p>
                <p className="text-sm text-[#74798C] text-center leading-tight">de votre<br />objectif</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
