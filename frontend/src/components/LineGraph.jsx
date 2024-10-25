"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { GraphActions } from "./GraphActions";

const LineGraph = ({staffReports}) => {
  const staffData = staffReports?.slice(0, 10).map((report) => {
    return {
      name: report.client_name.substring(0, 5) + moment(report.created_at).format('YY-MM-DD'),
      ContactedPeople: report.properties?.length,
      ClientInterations: report.properties?.filter(p => p.isFavorite === true).length,
    }
  })
  return (
    <div className="rounded-xl w-full h-[50vh] p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Contacted People and Clients Interacting</h1>
        <GraphActions />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={staffData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ded4d4" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#1c71f1", fontSize: 10 }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{}} tickLine={false}  tickMargin={20}/>
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="ContactedPeople"
            stroke="#E21D48"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="ClientInterations" stroke="#1c71f1" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;