import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, HorizontalBar, Line, Pie, Polar } from 'react-chartjs-2';
import { Divider, Header, Icon } from 'semantic-ui-react';
import { byBookingMonthUrl, byClientAgeUrl, byClientNationalityUrl, byEventTypeUrl, incomeUrl } from '../../../redux/api';

export const Dashboard = () => {


  const [incomeData, setIncomeData] = useState({});
  const [clientAgeData, setClientAgeData] = useState({});
  const [clientNationalityData, setClientNationalityData] = useState({});
  const [bookingMonthData, setBookingtMonthData] = useState({});
  const [bookingEventTypeData, setBookingtEventTypeData] = useState({});

  useEffect(() => {

    const getBookingEventTypeData = async () => {
      const resp = await axios.get(byEventTypeUrl);
      console.log(resp.data);
      setBookingtEventTypeData(resp.data);
    }

    const getBookingMonthData = async () => {
      const resp = await axios.get(byBookingMonthUrl);
      setBookingtMonthData(resp.data);
    }

    const getClientNationalityData = async () => {
      const resp = await axios.get(byClientNationalityUrl);
      setClientNationalityData(resp.data);
    }

    const getClientAgeData = async () => {
      const resp = await axios.get(byClientAgeUrl);
      setClientAgeData(resp.data);
    }

    const getIncome = async () => {
      const response = await axios.get(incomeUrl);
      setIncomeData(response.data);
    }

    getBookingEventTypeData();
    getBookingMonthData();
    getClientAgeData();
    getIncome();
    getClientNationalityData();

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

  const byClientAgeData = {
    labels: ['18 to 29', '30 to 39', '40 to 65', 'Above 66'],
    datasets: [
      {
        data: [clientAgeData["18 to 29"], clientAgeData["30 to 39"], clientAgeData["40 to 65"], clientAgeData["Above 66"]],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const byClientNationalitydata = {
    labels: Object.keys(clientNationalityData),
    datasets: [
      {
        label: '# of Clients',
        data: Object.values(clientNationalityData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }


  const byBookingMonthData = {
    labels: Object.keys(bookingMonthData),
    datasets: [
      {
        label: '# of Bookings',
        data: Object.values(bookingMonthData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
          'rgba(225, 224, 0, 1)',
          'rgba(135, 10, 24, 0.5)',
          'rgba(154, 262, 125, 103.5)',
        ],
        borderWidth: 1,
      },
    ],
  }



  const byEventTypeData = {
    labels: Object.keys(bookingEventTypeData),
    datasets: [
      {
        data: Object.values(bookingEventTypeData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const byEventTypeOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
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
      <div className="flex items-center justify-center px-5 py-5">
        <div className="w-full max-w-8xl">
          <div className="-mx-2 md:flex">
            <div className="w-full md:w-1/3 px-5">
              <div className="rounded-lg shadow-sm mb-4">
                <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div className="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 className="text-sm uppercase text-gray-500 leading-tight">Weekly Income</h4>
                    <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">${incomeData.weekIncome}</h3>
                    <p className={`text-xs $ text-${incomeData.weekAvg < 0 ? "red" : "green"}-500 leading-tight`}>{incomeData.weekAvg < 0 ? "▼ " : "▲ "}{incomeData.weekAvg}%</p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0">
                    <Line data={weekData} options={chartOptions} height={55} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2">
              <div className="rounded-lg shadow-sm mb-4">
                <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div className="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 className="text-sm uppercase text-gray-500 leading-tight">Monthly Income</h4>
                    <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">${incomeData.monthIncome}</h3>
                    <p className={`text-xs $ text-${incomeData.monthAvg < 0 ? "red" : "green"}-500 leading-tight`}>{incomeData.monthAvg < 0 ? "▼ " : "▲ "}{incomeData.monthAvg}%</p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0">
                    <Line data={monthData} options={chartOptions} height={55} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-2">
              <div className="rounded-lg shadow-sm mb-4">
                <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                  <div className="px-3 pt-8 pb-10 text-center relative z-10">
                    <h4 className="text-sm uppercase text-gray-500 leading-tight">Total Income</h4>
                    <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">${incomeData.totalIncome}</h3>
                    <p className={`text-xs $ text-${incomeData.totalAvg < 0 ? "red" : "green"}-500 leading-tight`}>{incomeData.totalAvg < 0 ? "▼ " : "▲ "}{incomeData.totalAvg}%</p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0">
                    <Line data={totalData} options={chartOptions} height={55} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-0 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-7">


          <div className="my-1 px-1 w-full md:w-1/2 lg:my-6 lg:px-9 lg:w-1/2">


            <article className="overflow-hidden rounded-lg shadow-lg">


              <header className="flex items-center justify-between leading-tight p-2 md:p-4">

                <p className="text-grey-darker text-lg text-center">
                  Bookings Classed by Customer Age
             </p>
              </header>

              <Pie data={byClientAgeData} />


              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              </footer>

            </article>


          </div>
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-6 lg:px-9 lg:w-1/2">


            <article className="overflow-hidden rounded-lg shadow-lg">


              <header className="flex items-center justify-between leading-tight p-2 md:p-4">

                <p className="text-grey-darker text-lg text-center">
                  Bookings Classed by Customer Country
                         </p>
              </header>

              <Bar data={byClientNationalitydata} />


              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              </footer>

            </article>


          </div>




        </div>
      </div>

      <div className="container my-0 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-7">


          <div className="my-1 px-1 w-full md:w-1/2 lg:my-6 lg:px-9 lg:w-1/2">


            <article className="overflow-hidden rounded-lg shadow-lg">


              <header className="flex items-center justify-between leading-tight p-2 md:p-4">

                <p className="text-grey-darker text-lg text-center">
                  Bookings Classed by Month
             </p>
              </header>

              <Polar data={byBookingMonthData} />


              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              </footer>

            </article>


          </div>
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-6 lg:px-9 lg:w-1/2">


            <article className="overflow-hidden rounded-lg shadow-lg">


              <header className="flex items-center justify-between leading-tight p-2 md:p-4">

                <p className="text-grey-darker text-lg text-center">
                  Bookings Classed by Event Type
                         </p>
              </header>

              <HorizontalBar data={byEventTypeData} options={byEventTypeOptions} />

              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              </footer>

            </article>


          </div>




        </div>
      </div>

      {/*  <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">


        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
            <h4 className="text-sm uppercase text-gray-500 leading-tight">Clients Grouped By Age</h4>
            <Pie data={byClientAgeData} style={{ marginBottom: "2rem" }} />
          </div>

        </div>


      </div> */}

    </div>

  )
}
