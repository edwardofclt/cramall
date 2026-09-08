import type { MapConfig } from '../../content/social-studies/history-schema';
import { HistoryActivity, type HistoryWidgetProps } from './HistoryActivity';

const mapNames = { 'colonial-regions': 'Atlantic colonial regions', 'united-states': 'Contiguous United States', 'south-carolina': 'South Carolina' };

/** North-up schematics checked against Census regional and SC RIA county reference maps.
 * These orientation drawings never claim to depict historical borders or precise distances.
 * Author coordinates run west-to-east (x) and north-to-south (y), each from 0 to 100.
 * References: https://www2.census.gov/programs-surveys/economic-census/2022/geographies/reference-maps/2022-ec-regions.pdf
 * https://ria.sc.gov/wp-content/uploads/2024/08/2025-Map-PDF.pdf
 */
function MapDrawing({ config, placements }: { config: MapConfig; placements: Record<string, string> }) {
  const attachedCount = (locationId: string) => Object.values(placements).filter(target => target === locationId).length;
  return <figure className="history-map-figure">
    <figcaption><strong>{mapNames[config.mapKind]}</strong><br />Period studied: {config.period}<br />Schematic map — not to scale.</figcaption>
    <div className={`history-map-drawing history-map-${config.mapKind}`} role="img" aria-label={`${mapNames[config.mapKind]}. North is up; east is right. Numbered locations match the complete labeled list below. This schematic shows relative locations, not historical borders.`}>
      <svg viewBox="0 0 500 360" aria-hidden="true" preserveAspectRatio="none">
        <rect width="500" height="360" fill="#dceef2" />
        {config.mapKind === 'south-carolina' ? <>
          <path d="M0 0 H500 V125 L445 171 L427 205 L396 236 L362 264 L328 293 L285 333 L268 360 H0 Z" fill="#dde6d8" />
          <path d="M24 86 L74 49 L131 34 L181 42 L224 48 L273 48 L322 89 L383 129 L445 171 L427 205 L396 236 L362 264 L328 293 L285 333 L256 319 L231 287 L204 266 L184 235 L150 209 L124 184 L91 156 L67 131 Z" fill="#e9ecd4" stroke="#596a57" strokeWidth="3" />
        </> : config.mapKind === 'colonial-regions' ? <>
          <path d="M0 0 H401 L418 28 L438 58 L420 80 L393 96 L383 116 L362 126 L350 154 L330 166 L320 187 L292 201 L281 228 L269 251 L250 273 L234 301 L203 316 L193 343 L184 360 H0 Z" fill="#e9ecd4" stroke="#596a57" strokeWidth="3" />
          <path d="M325 73 L385 104 L358 151 L297 173 L310 123 Z" fill="#d6dcc0" />
          <path d="M280 164 L339 166 L310 213 L277 235 L211 310 L169 329 L213 230 Z" fill="#c4d6ba" />
        </> : <>
          <path d="M34 41 L87 55 L144 67 L244 73 L291 69 L316 87 L341 99 L362 102 L376 91 L399 87 L423 58 L442 48 L455 74 L441 106 L423 125 L425 145 L412 173 L390 206 L376 234 L354 260 L347 284 L376 332 L362 340 L337 301 L311 282 L276 281 L250 295 L218 293 L210 310 L191 290 L179 263 L155 251 L139 229 L110 225 L101 211 L78 206 L60 183 L42 153 L33 125 L30 88 Z" fill="#e9ecd4" stroke="#596a57" strokeWidth="3" />
          <path d="M281 111 Q254 147 282 191 T278 275" fill="none" stroke="#7db0ba" strokeWidth="4" />
        </>}
      </svg>
      <span className="history-north" aria-hidden="true">N ↑</span>
      <span className="history-map-ocean" aria-hidden="true">Atlantic<br />Ocean</span>
      {config.mapKind === 'south-carolina' && <><span className="history-map-neighbor history-map-nc" aria-hidden="true">North Carolina</span><span className="history-map-neighbor history-map-ga" aria-hidden="true">Georgia</span></>}
      {config.mapKind === 'united-states' && <span className="history-map-pacific" aria-hidden="true">Pacific<br />Ocean</span>}
      <div className="history-map-points" aria-hidden="true">{config.locations.map((location, index) => <span className="history-map-point" key={location.id} data-attached={attachedCount(location.id) > 0} style={{ left: `${location.x}%`, top: `${location.y}%` }} title={location.label}>{index + 1}{attachedCount(location.id) > 0 && <span className="history-map-attached">+{attachedCount(location.id)}</span>}</span>)}</div>
    </div>
    <ul className="history-map-key" aria-label="Map key">{config.locations.map((location, index) => <li key={location.id}><strong>{index + 1}. {location.label}: </strong>{attachedCount(location.id)} {attachedCount(location.id) === 1 ? 'card' : 'cards'} attached</li>)}</ul>
    <p className="history-map-note">North is up; east is right. The Atlantic Ocean is east of the land. Present-day land shapes help locate places; these are not borders during the period.</p>
  </figure>;
}

export default function HistoryMap({ config, onEvent }: HistoryWidgetProps<MapConfig>) {
  return <HistoryActivity config={config} onEvent={onEvent} type="history-map" surfaceLabel="Your map connections"
    instruction="Inspect the map and place descriptions. Select a source card, then attach it to the numbered place it describes."
    retryHint="Compare the source with the place description and its position on the map."
    map={placements => <MapDrawing config={config} placements={placements} />}
    items={config.cards.map(card => ({ ...card, title: card.text, targetId: card.locationId }))}
    targets={config.locations.map(location => ({ id: location.id, label: location.label, detail: location.detail, sourceId: location.sourceId }))} />;
}
