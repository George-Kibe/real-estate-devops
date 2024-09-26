"use client";
import Image from "next/image";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Group A", value: 92, fill: "#000FFF" },
//   { name: "Group B", value: 8, fill: "#FAE27C" },
// ];

const PieChartGraph = ({averageDraftLength}) => {
  const data = [
    {name: "Group A", value: averageDraftLength, fill: "#000FFF"},
    {name: "Group B", value: 200 - averageDraftLength, fill: "#FAE27C"}
  ]
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/images/plus.png" alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">{averageDraftLength}</h1>
        <p className="text-xs">Characters per Report</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">Average All Time</h2>
    </div>
  );
};

export default PieChartGraph;