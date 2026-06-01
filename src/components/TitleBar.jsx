function Mustache({ flip }) {
  return (
    <svg
      width="48" height="24"
      viewBox="0 0 48 24"
      shapeRendering="crispEdges"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', flexShrink: 0 }}
    >
      {/* Top bar */}
      <rect x="12" y="0"  width="20" height="3" fill="#C07828"/>
      {/* Highlights */}
      <rect x="14" y="0"  width="6"  height="2" fill="#E09040"/>
      <rect x="28" y="0"  width="6"  height="2" fill="#E09040"/>
      {/* Left lobe sweeping out */}
      <rect x="6"  y="3"  width="12" height="3" fill="#C07828"/>
      <rect x="2"  y="6"  width="11" height="3" fill="#C07828"/>
      <rect x="2"  y="9"  width="8"  height="3" fill="#C07828"/>
      <rect x="4"  y="12" width="5"  height="3" fill="#C07828"/>
      {/* Right lobe mirror */}
      <rect x="30" y="3"  width="12" height="3" fill="#C07828"/>
      <rect x="35" y="6"  width="11" height="3" fill="#C07828"/>
      <rect x="38" y="9"  width="8"  height="3" fill="#C07828"/>
      <rect x="39" y="12" width="5"  height="3" fill="#C07828"/>
    </svg>
  )
}

export default function TitleBar() {
  return (
    <div className="title-bar">
      <div className="title-deco-row">
        <span className="mustache-wrap"><Mustache /></span>
        <h1>*** VARD &amp; OMSORG ***</h1>
        <span className="mustache-wrap mustache-right"><Mustache flip /></span>
      </div>
      <p>STUDIETERMINAL v2.0 <span className="blink">_</span></p>
      <p className="title-for">TILL JONTE <span className="heart-pulse">♥</span></p>
    </div>
  )
}
