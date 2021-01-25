import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Divider, Header, Icon } from 'semantic-ui-react';
import { incomeUrl } from '../../../redux/api';

export const Dashboard = () => {


  const [incomeData, setIncomeData] = useState({});

  useEffect(() => {
    const getIncome = async () => {
      const response = await axios.get(incomeUrl);
      setIncomeData(response.data);
    }
    getIncome();
  }, [])


  const weekData = {
    labels: incomeData.weekAvg > 0 ? [2, 3, 2, 8, 7, 8, 15] : [15, 13, 7, 12, 7, 8, 4],
    datasets: [
      {
        backgroundColor: "rgba(101, 116, 205, 0.1)",
        borderColor: "rgba(101, 116, 205, 0.8)",
        borderWidth: 2,
        data: incomeData.weekAvg > 0 ? [2, 3, 2, 8, 7, 8, 15] : [15, 13, 7, 10, 7, 8, 4],
      },
    ],
  };

  const monthData = {
    labels: incomeData.monthAvg > 0 ? [2, 3, 2, 8, 7, 9, 15] : [15, 9, 7, 8, 2, 3, 2],
    datasets: [
      {
        backgroundColor: "rgba(246, 153, 63, 0.1)",
        borderColor: "rgba(246, 153, 63, 0.8)",
        borderWidth: 2,
        data: incomeData.monthAvg > 0 ? [2, 3, 2, 8, 7, 9, 15] : [15, 9, 7, 8, 2, 3, 2],
      },
    ],
  };

  const totalData = {
    labels: incomeData.totalAvg > 0 ? [2, 4, 5, 8, 12, 9, 20] : [20, 9, 12, 8, 5, 4, 2],
    datasets: [
      {
        backgroundColor: "rgba(246, 109, 155, 0.1)",
        borderColor: "rgba(246, 109, 155, 0.8)",
        borderWidth: 2,
        data: incomeData.totalAvg > 0 ? [2, 4, 5, 8, 12, 9, 20] : [20, 9, 12, 8, 5, 4, 2],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    elements: {
      point: {
        radius: 0
      },
    },
    scales: {
      xAxes: [{
        gridLines: false,
        scaleLabel: false,
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: false,
        scaleLabel: false,
        ticks: {
          display: false,
          suggestedMin: 0,
          suggestedMax: 10
        }
      }]
    }
  };
  return (

    <div>
      <div className="header">
        <Header as='h2'>
          <Icon name='chart line' />
          <Header.Content>
            Analytics Dashboard
      <Header.Subheader>Check Your Events Performance </Header.Subheader>
          </Header.Content>
        </Header>
      </div>
      <Divider />
      <div class="flex items-center justify-center px-5 py-5">
        <div class="w-full max-w-8xl">
          <div class="-mx-2 md:flex">
            <div class="w-full md:w-1/3 px-5">
              <div class="rounded-lg shadow-sm mb-4">
                <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div class="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 class="text-sm uppercase text-gray-500 leading-tight">Weekly Income</h4>
                    <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">${incomeData.weekIncome}</h3>
                    <p class={`text-xs $ text-${incomeData.weekAvg < 0 ? "red" : "green"}-500 leading-tight`}>{incomeData.weekAvg < 0 ? "▼ " : "▲ "}{incomeData.weekAvg}%</p>
                  </div>
                  <div class="absolute bottom-0 inset-x-0">
                    <Line data={weekData} options={chartOptions} height={55} />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
              <div class="rounded-lg shadow-sm mb-4">
                <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div class="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 class="text-sm uppercase text-gray-500 leading-tight">Monthly Income</h4>
                    <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">${incomeData.monthIncome}</h3>
                    <p class={`text-xs $ text-${incomeData.monthAvg < 0 ? "red" : "green"}-500 leading-tight`}>{incomeData.monthAvg < 0 ? "▼ " : "▲ "}{incomeData.monthAvg}%</p>
                  </div>
                  <div class="absolute bottom-0 inset-x-0">
                    <Line data={monthData} options={chartOptions} height={55} />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
              <div class="rounded-lg shadow-sm mb-4">
                <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div class="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 class="text-sm uppercase text-gray-500 leading-tight">Total Income</h4>
                    <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">${incomeData.totalIncome}</h3>
                    <p class={`text-xs $ text-${incomeData.totalAvg < 0 ? "red" : "green"}-500 leading-tight`}>{incomeData.totalAvg < 0 ? "▼ " : "▲ "}{incomeData.totalAvg}%</p>
                  </div>
                  <div class="absolute bottom-0 inset-x-0">
                    <Line data={totalData} options={chartOptions} height={55} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
