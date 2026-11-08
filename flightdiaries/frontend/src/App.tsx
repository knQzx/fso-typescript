import { useEffect, useState } from 'react'
import diaryService from './services/diaries'
import Diaries from './components/Diaries'
import NewDiaryForm from './components/NewDiaryForm'
import { errorMessage } from './utils'
import type { DiaryEntry, NewDiaryEntry } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    diaryService.getAll().then(setDiaries)
  }, [])

  const showError = (message: string) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }

  const addDiary = async (entry: NewDiaryEntry): Promise<boolean> => {
    try {
      const added = await diaryService.create(entry)
      setDiaries(diaries.concat(added))
      return true
    } catch (e: unknown) {
      showError(errorMessage(e))
      return false
    }
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <NewDiaryForm onSubmit={addDiary} />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
