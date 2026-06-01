export default function TitleBar() {
  return (
    <header className="title-bar">
      <div className="title-kicker">
        <span>Studieterminal v2.0</span>
        <span className="title-dot" />
        <span>Till Jonte</span>
      </div>
      <div className="title-main-row">
        <span className="title-spark" aria-hidden="true">+</span>
        <h1>Vård &amp; omsorg</h1>
        <span className="title-spark" aria-hidden="true">+</span>
      </div>
      <div className="title-tags" aria-label="Studielage">
        <span>Kort</span>
        <span>Snabbt</span>
        <span>Lite kul</span>
      </div>
    </header>
  )
}
