export default function StatusBar({messages, className}) {
const message = messages[Math.floor(Math.random() * messages.length)]

  return (
    <section className={`status-display ${className}`}>
      <p>{message}</p>
    </section>
  )
}