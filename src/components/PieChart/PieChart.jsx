
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({totalTickets , totalResolvedTickets}) => {

  console.log(totalTickets , totalResolvedTickets)
  const totalunResolvedTickets = totalTickets - totalResolvedTickets

  const percentage_resolved = Math.round((totalResolvedTickets / totalTickets) * 100);

  const data = {
    datasets: [
      {
        data: [totalResolvedTickets , totalunResolvedTickets], // 80% filled, 20% empty
        backgroundColor: ['#00D907', '#E0E0E0'], // Green and light gray
        borderWidth: 0,
        borderRadius: 5
      },
    ],
  };

  const options = {
    cutout: '80%', // Makes it look like a ring
    responsive: true,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <div style={{ width: '73px', height: '73px', position: 'relative' }}>
      <Doughnut data={data} options={options} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '12px',
        fontWeight: '600',
        color: "#030229"
      }}>
        {percentage_resolved}
      </div>
    </div>
  );
};

export default PieChart;

