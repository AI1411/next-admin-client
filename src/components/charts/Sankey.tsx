import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Chart as C } from "react-chartjs-2";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import {FC} from "react";

const Sankey: FC = () => {
  ChartJS.register(SankeyController, Flow, LinearScale, CategoryScale, Tooltip);

  const colors: any = {
    a: "red",
    b: "green",
    c: "blue",
    d: "gray",
  };

  const getColor = (key: string) => colors[key];

  const data = {
    datasets: [
      {
        label: "My sankey",
        data: [
          { from: "a", to: "b", flow: 10 },
          { from: "a", to: "c", flow: 5 },
          { from: "b", to: "c", flow: 10 },
          { from: "d", to: "c", flow: 7 },
        ],
        colorFrom: (c: any) => getColor(c.dataset.data[c.dataIndex].from),
        colorTo: (c: any) => getColor(c.dataset.data[c.dataIndex].to),
        colorMode: "gradient" as "gradient", // or 'from' or 'to'
        /* optional labels */
        labels: {
          a: "Label A",
          b: "Label B",
          c: "Label C",
          d: "Label D",
        },
        /* optional priority */
        priority: {
          b: 1,
          d: 0,
        },
        /* optional column overrides */
        column: {
          d: 1,
        },
        size: "max" as "max", // or 'min' if flow overlap is preferred
      },
    ],
  };

  return <C type="sankey" data={data} />;
}

export default Sankey;
