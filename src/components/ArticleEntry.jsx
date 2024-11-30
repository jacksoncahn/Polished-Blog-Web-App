import { useState } from "react"

export default function ArticleEntry({ addArticle }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState(null)

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() && !body.trim()) {
      setError("⚠️ NEEDS A BODY AND TITLE")
    } else if (!body.trim()){
      setError("⚠️ NEEDS A BODY")
    } else if (!title.trim()) {
      setError("⚠️ NEEDS A TITLE")
    } else {
      addArticle({ title, body })
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Title
        <input className = 'forminput' value={title} onChange={(e) => setTitle(e.target.value)} />
        Body
        <textarea className = 'textarea'
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
