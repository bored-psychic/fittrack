import PushupQuest from '../components/PushupQuest'

export default function Quests({ profile, allData }) {
  return (
    <div className="quests-container">
      <PushupQuest profile={profile} allData={allData} />
    </div>
  )
}
