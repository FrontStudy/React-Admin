import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import * as API from '../../service/api';
import * as STR from '../../service/string';

import DashboardPost from './DashboradPost'

function Dashboard() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      animations: {
        enabled: false,
        easing: 'swing'
      },
      background: '#FFFFFF',
      foreColor: '#333',
      fontFamily: 'Roboto Mono',
      height: 265,
      id: 'sZGow',
      stackOnlyBar: true,
      toolbar: {
        show: false
      },
      type: 'bar',
      width: '100%'
    },
    grid: {
      show: false, // This disables the grid lines completely
      borderColor: '#e0e0e0',
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: false // Ensure no vertical grid lines
        }
      },
      yaxis: {
        lines: {
          show: false // Ensure no horizontal grid lines
        }
      }
    },
    xaxis: {
      offsetY: -1,
      labels: {
        trim: true,
        style: {}
      },
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    },
    tooltip: {
      shared: false,
      intersect: true,
      y: {
        formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
          switch (w.config.series[seriesIndex].data[dataPointIndex].x) {
            case '총 회원수':
              return `${value}명`;
            case '총 게시글수':
              return `${value}개`;
            case '총 댓글수':
              return `${value}개`;
            default:
              return value;
          }
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        distributed: true,
        borderRadius: 12
      }
    },
    dataLabels: {
      enabled: false
    }
  });

  const [chartSeries, setChartSeries] = useState([{
    name: 'Column',
    data: []
  }]);

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const data = await API.servicesPostData(STR.urlMemberList, {
        offset: 0,
        size: 10000,
        active: true
      });
      if (data && data.status === "success") {
        setTotalMembers(data.data.length);

        let totalDiaryCount = 0;
        let totalCommentCount = 0;
        data.data.forEach(member => {
          totalDiaryCount += member.diaryCount;
          totalCommentCount += member.commentCount;
        });

        setTotalPosts(totalDiaryCount);
        setTotalComments(totalCommentCount);

        // Update chart series data
        setChartSeries([{
          name: '총',
          data: [
            { x: '총 회원수', y: data.data.length },
            { x: '총 게시글수', y: totalDiaryCount },
            { x: '총 댓글수', y: totalCommentCount }
          ]
        }]);
      } else {
        console.error('응답 데이터에 문제가 있습니다:', data);
      }
    } catch (error) {
      console.error('회원 데이터를 불러오는데 실패했습니다.', error);
    }
  };

  return (
    <>
      <div>
        <h1 className='dashborad_main'>Dashboard</h1>
      </div>
      <div>
        <ul className="dashboard-stats">
          <li className='dashboard-stats-list'>총 회원수 <div>{totalMembers}</div></li>
          <li className='dashboard-stats-list'>총 게시글수 <div>{totalPosts}</div></li>
          <li className='dashboard-stats-list'>총 댓글수 <div>{totalComments}</div></li>
        </ul>
      </div>
      <div className='dashboard-graph'>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={265} />
      </div>
      < DashboardPost />
    </>
  );
}

export default Dashboard;