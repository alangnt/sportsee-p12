import { Bar, BarChart, Line, LineChart, Tooltip, type TooltipContentProps, type TooltipIndex, XAxis } from "recharts";

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

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  const kg = payload?.[0];
  const kcal = payload?.[1];
  const isVisible = active && kg != null && kcal != null;
  return (
    <div className="custom-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p>{`${kg.value}kg`}</p>
          <p>{`${kcal.value}kcal`}</p>
        </>
      )}
    </div>
  );
};

export default function HomeComponent({
  isAnimationActive,
  defaultIndex,
}: {
  isAnimationActive?: boolean;
  defaultIndex?: TooltipIndex;
}) {
  return (
    <div className="grow grid grid-cols-4 grid-rows-2">
      <div className="col-span-3 row-span-1 aspect-3/1 rounded-md bg-[#fbfbfb]">
        <BarChart
          style={{ width: '100%', aspectRatio: 1.618, height: '100%' }}
          responsive
          data={dataActivity}
        >
          <Tooltip content={CustomTooltip} isAnimationActive={isAnimationActive} defaultIndex={defaultIndex} />
          <Bar dataKey="kg" fill="#8884d8" />
          <Bar dataKey="kcal" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="col-span-3 grid grid-cols-3 row-span-1">
        <div className="bg-[#ff0200] text-white col-span-1 aspect-square rounded-md">
          <p>Durée moyenne des sessions</p>
          <LineChart
            style={{ width: '100%', aspectRatio: 1.618, height: '100%' }}
            responsive
            data={dataSessions}
          >
            <Line type="monotone" dataKey="value" stroke="white" strokeWidth={2} />
            <XAxis dataKey="name" />
          </LineChart>
        </div>
      </div>
    </div>
  )
}