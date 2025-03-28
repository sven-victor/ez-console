import React from 'react';
import { Row, Col, Card, Statistic, message, Skeleton } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DynamicIcon from '@/components/DynamicIcon';
import { useRequest } from 'ahooks';
import { getStatistics } from '@/api/base';
import { transparentize } from '@/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: statistics = [], loading } = useRequest(getStatistics, {
    onError: (error) => {
      message.error(t('dashboard.fetchStatisticsError', { defaultValue: 'Error fetching statistics: {{error}}', error: error.message }),);
    },
  });

  const renderChart = (chart: API.Chart) => {
    if ('value' in chart) {
      return (
        <Card>
          <Statistic
            title={chart.title}
            value={chart.value}
            prefix={<DynamicIcon iconName={chart.icon} />}
            valueStyle={{ color: chart.color }}
          />
        </Card>
      )
    } else {
      return (
        <Card>
          <Bar data={{
            labels: chart.labels,
            datasets: chart.datasets.map((dataset) => ({
              label: dataset.label,
              data: dataset.data,
              borderColor: dataset.color,
              backgroundColor: transparentize(dataset.color, 0.5),
              borderRadius: 5,
              borderWidth: 2,
            })),
          }} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom' as const,
              },
            },
          }} />
        </Card>
      )
    }
    return null
  }
  return (
    <Skeleton active loading={loading}>
      <p>{t('dashboard.welcome', { defaultValue: 'Welcome, {{name}}!', name: user?.full_name || user?.username })}</p>
      {
        statistics?.map((row) => (<Row gutter={16} style={{ marginTop: 20 }}>
          {
            row.map((chart) => (<Col span={chart.width}>
              {renderChart(chart)}
            </Col>))
          }
        </Row>))
      }

    </Skeleton>
  );
};

export default Dashboard; 