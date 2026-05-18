import { useState } from 'react'
import { Save, User, Target, LogOut } from 'lucide-react'

export default function SettingsPage({ profile, updateProfile, settings, updateSettings, logout }) {
  const [localProfile, setLocalProfile] = useState(profile)
  const [localSettings, setLocalSettings] = useState(settings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateProfile(localProfile)
    updateSettings(localSettings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="settings-section">
        <div className="settings-section-header">
          <User size={18} />
          <h3>Profile</h3>
        </div>
        <div className="settings-grid">
          <label className="setting-item">
            <span>Name</span>
            <input
              type="text"
              value={localProfile.name}
              onChange={e => setLocalProfile({ ...localProfile, name: e.target.value })}
            />
          </label>
          <label className="setting-item">
            <span>Start Weight (kg)</span>
            <input
              type="number"
              step="0.1"
              value={localProfile.startWeight}
              onChange={e => setLocalProfile({ ...localProfile, startWeight: parseFloat(e.target.value) })}
            />
          </label>
          <label className="setting-item">
            <span>Target Weight (kg)</span>
            <input
              type="number"
              step="0.1"
              value={localProfile.targetWeight}
              onChange={e => setLocalProfile({ ...localProfile, targetWeight: parseFloat(e.target.value) })}
            />
          </label>
          <label className="setting-item">
            <span>Start Date</span>
            <input
              type="date"
              value={localProfile.startDate}
              onChange={e => setLocalProfile({ ...localProfile, startDate: e.target.value })}
            />
          </label>
          <label className="setting-item">
            <span>Target Date</span>
            <input
              type="date"
              value={localProfile.targetDate}
              onChange={e => setLocalProfile({ ...localProfile, targetDate: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-header">
          <Target size={18} />
          <h3>Daily Targets</h3>
        </div>
        <div className="settings-grid">
          <label className="setting-item">
            <span>Calorie Target (kcal)</span>
            <input
              type="number"
              value={localSettings.calorieTarget}
              onChange={e => setLocalSettings({ ...localSettings, calorieTarget: parseInt(e.target.value) })}
            />
          </label>
          <label className="setting-item">
            <span>Protein Target (g)</span>
            <input
              type="number"
              value={localSettings.proteinTarget}
              onChange={e => setLocalSettings({ ...localSettings, proteinTarget: parseInt(e.target.value) })}
            />
          </label>
          <label className="setting-item">
            <span>Steps Target</span>
            <input
              type="number"
              value={localSettings.stepsTarget}
              onChange={e => setLocalSettings({ ...localSettings, stepsTarget: parseInt(e.target.value) })}
            />
          </label>
          <label className="setting-item">
            <span>Max Cigarettes/day</span>
            <input
              type="number"
              value={localSettings.cigTarget}
              onChange={e => setLocalSettings({ ...localSettings, cigTarget: parseInt(e.target.value) })}
            />
          </label>
          <label className="setting-item">
            <span>Sleep Target (hrs)</span>
            <input
              type="number"
              step="0.5"
              value={localSettings.sleepTarget}
              onChange={e => setLocalSettings({ ...localSettings, sleepTarget: parseFloat(e.target.value) })}
            />
          </label>
        </div>
      </div>

      <button className="save-btn" onClick={handleSave}>
        <Save size={18} />
        {saved ? 'Saved!' : 'Save Settings'}
      </button>

      <button className="logout-btn" onClick={logout}>
        <LogOut size={18} />
        Log Out
      </button>
    </div>
  )
}
