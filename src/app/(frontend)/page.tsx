import './styles.css'

export default async function HomePage() {
  return (
    <div className="container">
      <h1 className="text-4xl">Welcome to the Frontend!</h1>
      <p className="text-sm">This is the frontend application.</p>
      <div className="grid">
        <a href="/admin" className="card">
          <h2>Admin &rarr;</h2>
          <p>Explore the Admin</p>
        </a>
      </div>
    </div>
  )
}
