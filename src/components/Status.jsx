export default function StatusBar({messages, className}) {
const message = messages[Math.floor(Math.random() * messages.length)]

  return (
    <section className={`status-display ${className}`}>
      <p>{message ? message : "Save as much programming languages as you can from the fallout."}</p>
    </section>
  )
}