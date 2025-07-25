import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import {FC, PropsWithChildren, useMemo} from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ProgressBarProps extends PropsWithChildren {
  current: number;
  total: number;
  color?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ current, total, color = "#7F56D9", children }) => {
  const percentage = Math.round((current / total) * 100)

  const data = useMemo(() => ({
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#F5F5F5"],
        borderWidth: 0,
        cutout: '80%',
        circumference: 180,
        rotation: -90,
        borderRadius: 20,
      }
    ]
  }), [percentage, color])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    }
  }

  return (
    <div className={"relative w-[200px] h-[100px] md:w-[300px] md:h-[200]"}>
      <Doughnut data={data} options={options} />
      <div className={"absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold"}>
        {children ? children : `${percentage}%`}
      </div>
    </div>
  )
}

export default ProgressBar;