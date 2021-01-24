import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ChartComponent, { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux'
import { Divider, Header, Icon } from 'semantic-ui-react'
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


  const data = {
    labels: [2, 3, 2, 9, 7, 7, 4],
    datasets: [
      {
        backgroundColor: "rgba(246, 109, 155, 0.1)",
        borderColor: "rgba(246, 109, 155, 0.8)",
        borderWidth: 2,
        data:[2, 3, 2, 9, 7, 7, 4],
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
        <div class="w-full max-w-3xl">
          <div class="-mx-2 md:flex">
            <div class="w-full md:w-1/3 px-2">
              <div class="rounded-lg shadow-sm mb-4">
                <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div class="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 class="text-sm uppercase text-gray-500 leading-tight">Weekly Income</h4>
                    <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">${incomeData.weekIncome}</h3>
                    <p class="text-xs text-red-500 leading-tight">▼ 42.8%</p>
                  </div>
                  <div class="absolute bottom-0 inset-x-0">
                    <Line data={data} options={chartOptions} height={55} />
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
                    <p class="text-xs text-red-500 leading-tight">▼ 42.8%</p>
                  </div>
                  <div class="absolute bottom-0 inset-x-0">
                    <Line data={data} options={chartOptions} height={55} />
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
                    <p class="text-xs text-green-500 leading-tight">▲ 8.2%</p>
                  </div>
                  <div class="absolute bottom-0 inset-x-0">
                    <Line data={data} options={chartOptions} height={55} />
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
