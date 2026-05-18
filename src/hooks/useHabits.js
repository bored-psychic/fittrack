import { useState, useEffect, useCallback } from 'react'
import { format, parseISO, differenceInCalendarDays, subDays } from 'date-fns'
import { doc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const DEFAULT_PROFILE = {
  name: 'Kiyo',
  startWeight: 102.3,
  targetWeight: 88,
  startDate: '2026-05-19',
  targetDate: '2026-09-01',
}

const DEFAULT_SETTINGS = {
  calorieTarget: 2000,
  proteinTarget: 120,
  stepsTarget: 15000,
  cigTarget: 5,
  sleepTarget: 7,
}

const DEFAULT_DAY = {
  protein: 0,
  skincareAM: false,
  skincarePM: false,
  steps: 0,
  cigs: 0,
  weight: null,
  calories: 0,
  fap: 0,
  sleep: 0,
  pushups: 0,
  gym: false,
  notes: '',
}

export function useProfile(uid) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)

  useEffect(() => {
    if (!uid) return
    const ref = doc(db, 'users', uid, 'config', 'profile')
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setProfile({ ...DEFAULT_PROFILE, ...snap.data() })
      }
    })
    return unsub
  }, [uid])

  const updateProfile = useCallback((updates) => {
    if (!uid) return
    const next = { ...profile, ...updates }
    setProfile(next)
    setDoc(doc(db, 'users', uid, 'config', 'profile'), next, { merge: true })
  }, [uid, profile])

  return { profile, updateProfile }
}

export function useSettings(uid) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  useEffect(() => {
    if (!uid) return
    const ref = doc(db, 'users', uid, 'config', 'settings')
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...snap.data() })
      }
    })
    return unsub
  }, [uid])

  const updateSettings = useCallback((updates) => {
    if (!uid) return
    const next = { ...settings, ...updates }
    setSettings(next)
    setDoc(doc(db, 'users', uid, 'config', 'settings'), next, { merge: true })
  }, [uid, settings])

  return { settings, updateSettings }
}

export function useHabits(uid) {
  const [allData, setAllData] = useState({})

  useEffect(() => {
    if (!uid) return
    const ref = doc(db, 'users', uid, 'config', 'habits')
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setAllData(snap.data())
      }
    })
    return unsub
  }, [uid])

  const getDay = useCallback((dateStr) => {
    return { ...DEFAULT_DAY, ...(allData[dateStr] || {}) }
  }, [allData])

  const updateDay = useCallback((dateStr, updates) => {
    if (!uid) return
    setAllData(prev => {
      const existing = prev[dateStr] || {}
      const newDay = { ...DEFAULT_DAY, ...existing, ...updates }
      const next = { ...prev, [dateStr]: newDay }
      setDoc(doc(db, 'users', uid, 'config', 'habits'), { [dateStr]: newDay }, { merge: true })
      return next
    })
  }, [uid])

  const getDayRange = useCallback((startDate, endDate) => {
    const days = []
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate
    const count = differenceInCalendarDays(end, start) + 1
    for (let i = 0; i < count; i++) {
      const date = subDays(end, count - 1 - i)
      const dateStr = format(date, 'yyyy-MM-dd')
      days.push({ date: dateStr, ...DEFAULT_DAY, ...(allData[dateStr] || {}) })
    }
    return days
  }, [allData])

  const getStreak = useCallback((habitKey, checkFn) => {
    let streak = 0
    let d = new Date()
    const today = format(d, 'yyyy-MM-dd')
    const todayData = allData[today]
    if (!todayData || !checkFn(todayData)) {
      d = subDays(d, 1)
    }
    while (true) {
      const dateStr = format(d, 'yyyy-MM-dd')
      const dayData = allData[dateStr]
      if (!dayData || !checkFn(dayData)) break
      streak++
      d = subDays(d, 1)
    }
    return streak
  }, [allData])

  const getAllDates = useCallback(() => {
    return Object.keys(allData).sort()
  }, [allData])

  return { allData, getDay, updateDay, getDayRange, getStreak, getAllDates, DEFAULT_DAY }
}

export { DEFAULT_DAY, DEFAULT_PROFILE, DEFAULT_SETTINGS }
