"use client";
import { PlusCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const BarGraph = ({staffReports}) => {
  const staffData = staffReports?.slice(0, 10).map((report) => {
    return {
      name: report.client_name.substring(0, 5) + moment(report.created_at).format('YY-MM-DD'),
      ReportWording: report.report_draft?.length,
      Communication: report.report_final?.length,
    }
  })

  return (
    <div className="bg-white rounded-lg h-[50vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg text-black font-semibold">Reports Wording</h1>
        <PlusCircle/>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={staffData} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8a6e6e" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#1c71f1", fontSize: 10 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="ReportWording"
            fill="#15ab3b"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Communication"
            fill="#000000"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;