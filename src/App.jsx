import React, {useState} from 'react'

function App() {
  const [topic, setTopic] = useState('')
  const [url, setUrl] = useState('')

  async function handleClick() {
    const today = new Date()
    console.log({today})
    const response = await fetch('/.netlify/functions/zoomer', {
      method: 'POST',
      body: JSON.stringify({
        topic: `Cohort 20 (NS): ${topic}`,
        startTime: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
          today.getDate()
        ).padStart(2, '0')}T18:30:00`,
        duration: 150,
      }),
    })
    const data = await response.json()
    setUrl(data.start_url)
  }

  return (
    <>
      <input type="text" placeholder="Lecture Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <button onClick={handleClick}>Ok Zoomer</button>

      {url.length > 0 && <a href={url}>Start Lecture</a>}
    </>
  )
}

export default App
