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
import { PlusCircle } from "lucide-react"
import moment from "moment";

const LineGraph = ({staffReports}) => {
  const staffData = staffReports?.slice(0, 10).map((report) => {
    return {
      name: report.client_name.substring(0, 5) + moment(report.created_at).format('YY-MM-DD'),
      ReportWording: report.report_draft?.length,
      Communication: report.report_final?.length,
    }
  })
  return (
    <div className="bg-white rounded-xl w-full h-[50vh] p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Reports Wording</h1>
        <PlusCircle />
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
            tick={{ fill: "#000000", fontSize: 10 }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#000000" }} tickLine={false}  tickMargin={20}/>
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="ReportWording"
            stroke="#000000"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="Communication" stroke="#1c71f1" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;