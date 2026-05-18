import { format, subDays } from 'date-fns'
import Countdown from '../components/Countdown'
import WeightTracker from '../components/WeightTracker'
import DailyChecklist from '../components/DailyChecklist'
import StreakCounter from '../components/StreakCounter'
import ProgressRing from '../charts/ProgressRing'

export default function Dashboard({ habits, profile, settings }) {
  const today = format(new Date(), 'yyyy-MM-dd')
  const dayData = habits.getDay(today)

  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd')
  const yesterdayData = habits.getDay(yesterday)

  const latestWeight = dayData.weight || yesterdayData.weight || profile.startWeight

  const completedCount = [
    dayData.protein >= (settings.proteinTarget || 120),
    dayData.skincareAM,
    dayData.skincarePM,
    dayData.steps >= (settings.stepsTarget || 15000),
    dayData.cigs <= (settings.cigTarget || 5) && Object.keys(habits.allData).includes(today),
    dayData.sleep >= (settings.sleepTarget || 6),
    dayData.fap === 0,
    dayData.pushups > 0,
  ].filter(Boolean).length

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>FitTrack</h1>
        <span className="dashboard-greeting">Let's crush it today 💪</span>
      </header>

      <Countdown targetDate={profile.targetDate} startDate={profile.startDate} />

      <div className="today-summary">
        <ProgressRing
          value={completedCount}
          max={8}
          size={70}
          color={completedCount >= 6 ? 'var(--success)' : completedCount >= 4 ? 'var(--warning)' : 'var(--danger)'}
          label={`${completedCount}/8`}
          sublabel="habits"
        />
        <WeightTracker currentWeight={latestWeight} profile={profile} />
      </div>

      <StreakCounter getStreak={habits.getStreak} />

      <DailyChecklist
        date={today}
        dayData={dayData}
        onUpdate={habits.updateDay}
        settings={settings}
      />
    </div>
  )
}
