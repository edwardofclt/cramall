import './guide-led-science.css';

/** These scenes illustrate authored qualitative models; they do not collect measurements. */
export function EnergyScene({ source, receiver, active, electric = false, connected = false }: { source: string; receiver: string; active: boolean; electric?: boolean; connected?: boolean }) {
 const motor = /motor|shaft/i.test(receiver);
 const sound = /buzz|sound/i.test(receiver);
 const crank = /crank|generator/i.test(source);
 const supported = electric ? /battery|crank/i.test(source) && /motor|shaft|buzzer|lamp/i.test(receiver) : /sun/i.test(source) && /paper square/i.test(receiver);
 if(!supported) return <svg className="science-scene" viewBox="0 0 520 270" role="img" aria-label={`${source} to ${receiver}: simplified connection model ${active?'running':'before running'}.`}><rect x="25" y="80" width="180" height="100" rx="18" fill="#dbe9df"/><rect x="315" y="80" width="180" height="100" rx="18" fill={active?'#f2dda1':'#dbe9df'}/><text x="115" y="135" textAnchor="middle">{source}</text><text x="405" y="135" textAnchor="middle">{receiver}</text>{connected&&<path d="M210 130H305m-12 -10l12 10 -12 10" fill="none" stroke="#416f73" strokeWidth="4"/>}<text x="260" y="218" textAnchor="middle">{active?'Modeled output shown by the labels':'Connect and run the model'}</text></svg>;
 return <svg className="science-scene" viewBox="0 0 520 310" role="img" aria-label={active ? `${source} model running: ${motor ? 'motor shaft turning' : sound ? 'buzzer vibrating' : electric ? 'lamp glowing' : 'sunlit paper warmer than shaded paper'}. Energy is inferred, not seen.` : `${source} and ${receiver} before the model runs.`}>
  <rect x="8" y="8" width="504" height="294" rx="24" fill="#eaf4ef"/><path d="M35 245H485" stroke="#839f94" strokeWidth="5"/>
  {electric ? <>
    {crank ? <g aria-label="Hand crank turns the generator rotor">
      <path d="M52 219H166L151 235H66Z" fill="#456272"/>
      <rect x="58" y="129" width="91" height="86" rx="25" fill="#86a7a2" stroke="#456272" strokeWidth="4"/>
      <circle data-testid="generator-rotor" cx="102" cy="175" r="31" fill="#d6c999" stroke="#456272" strokeWidth="4"/>
      <g data-testid="generator-crank" className={active ? 'science-crank-turn' : ''}>
        <path d="M81 154L123 196M81 196L123 154" stroke="#8b784c" strokeWidth="4"/>
        <path d="M102 175L148 155" fill="none" stroke="#3f6267" strokeWidth="8" strokeLinecap="round"/>
        <rect x="141" y="141" width="15" height="27" rx="6" fill="#bf8050" stroke="#654d36" strokeWidth="2"/>
      </g>
      <circle cx="102" cy="175" r="7" fill="#456272"/>
      <text x="106" y="263" textAnchor="middle">Hand-crank generator</text>
      <text x="106" y="284" textAnchor="middle">{active ? 'Crank turns the rotor' : 'Run to turn the crank'}</text>
    </g> : <g data-testid="battery-terminals"><rect x="52" y="132" width="100" height="86" rx="13" fill="#456272"/><rect x="66" y="119" width="20" height="13" rx="2" fill="#d1b575"/><rect x="116" y="119" width="20" height="13" rx="2" fill="#d1b575"/><text x="76" y="157" fill="white">+</text><text x="126" y="157" fill="white">−</text><text x="102" y="194" textAnchor="middle" fill="white">Battery</text></g>}
    {connected && <path data-testid="energy-connection" d="M76 119V86H364V143M126 119V65H438V185" fill="none" stroke={active ? '#be713c' : '#7a8c92'} strokeWidth="5"/>}
    {crank && <path d="M76 119V132M126 119V132" fill="none" stroke="#456272" strokeWidth="5"/>}
  </> : <><circle cx="95" cy="82" r="31" fill="#edbe54"/>{[0,45,90,135,180,225,270,315].map(a=><path key={a} d="M95 38V27" transform={`rotate(${a} 95 82)`} stroke="#d8a536" strokeWidth="4" strokeLinecap="round"/>)}{active && <path d="M125 105L267 202M109 115L204 214M130 90L301 182" stroke="#d9b24f" strokeWidth="9" opacity=".5"/>}<path d="M332 122H470L486 155H343Z" fill="#617f85"/><path d="M466 153V245" stroke="#496971" strokeWidth="6"/></>}
  {motor ? <><rect x="330" y="142" width="108" height="77" rx="22" fill="#72999c" stroke="#385e66" strokeWidth="4"/><path d="M355 218V245M414 218V245" stroke="#385e66" strokeWidth="7"/><g className={active ? 'science-motor-turn' : ''}><circle cx="386" cy="179" r="27" fill="#e5cf85" stroke="#6f784c" strokeWidth="3"/><path d="M368 179H404M386 161V197" stroke="#45636a" strokeWidth="5"/></g></> : sound ? <><path d="M338 220V154Q385 104 432 154V220Z" fill="#bf985d" stroke="#735d42" strokeWidth="4"/><ellipse className={active ? 'science-buzzer-tremble' : ''} cx="385" cy="165" rx="28" ry="34" fill="#384d57"/><circle cx="385" cy="165" r="11" fill="#cedecf"/>{active && <><path d="M324 145Q309 165 324 185M446 145Q461 165 446 185" fill="none" stroke="#4c8185" strokeWidth="4"/></>}</> : electric ? <><path d="M369 198V220H409V198" fill="#678188"/><path d="M356 160A33 33 0 1 1 422 160Q419 181 406 195H372Q359 181 356 160" fill={active ? '#ffe3a0' : '#d6e2db'} stroke="#738a81" strokeWidth="4"/><path d="M351 244H428L413 220H367Z" fill="#45636a"/></> : <><path d="M182 205L282 192L297 234L198 244Z" fill="#fff1be" stroke="#ac9a6a" strokeWidth="2"/><path d="M342 205L442 192L457 234L358 244Z" fill="#d1dfd5" stroke="#798f87" strokeWidth="2"/><text x="237" y="273" textAnchor="middle">Sunlit paper</text><text x="401" y="273" textAnchor="middle">Shaded paper</text>{active && <><text x="237" y="185" textAnchor="middle">Warmer</text><text x="398" y="185" textAnchor="middle">Less warm</text></>}</>}
  {electric && <text x="384" y="272" textAnchor="middle">{receiver}</text>}
 </svg>;
}

export function SoilTray({ covered, after }: { covered: boolean; after: boolean }) {
 return <svg className="science-tray" viewBox="0 0 280 155" role="img" aria-label={`${covered ? 'Planted' : 'Bare'} tray: ${after ? covered ? 'less soil shifted downhill after water' : 'more soil shifted downhill after water' : 'soil before water runs'}`}>
  <path d="M20 110L235 132L264 105L60 84Z" fill="#94b4b1" stroke="#486e71" strokeWidth="3"/>
  <path d="M32 102L72 44L244 95L227 119Z" fill="#aa7c4c"/><path d="M32 102L227 119V132L20 111Z" fill="#684e36"/>
  {covered && [90,135,177].map(x=><g key={x}><path d={`M${x} 82V48m0 16l-12 -10m12 17l12 -15`} stroke="#527f47" strokeWidth="5" fill="none"/><path d={`M${x} 83l-7 12m7 -12l9 10`} stroke="#674f33" strokeWidth="2"/></g>)}
  {after && <><path d="M59 51Q78 71 106 78T203 106" stroke="#69b0bd" strokeWidth={covered ? 5 : 10} fill="none"/>{Array.from({length:covered?4:12},(_,i)=><circle key={i} className="science-soil-grain" cx={215+(i%4)*9} cy={105+Math.floor(i/4)*7} r="3" fill="#9a673e"/>)}</>}
  <text x="140" y="149" textAnchor="middle">{after ? 'After water · model' : 'Before water · model'}</text>
 </svg>;
}

export function WrenScene({ selected, matched, internal }: { selected: string | null; matched: string[]; internal: boolean }) {
 return <svg className="science-scene" viewBox="0 0 480 300" role="img" aria-label={`Wren structure model. ${selected ? `${selected} selected.` : ''} ${internal ? 'Lungs cutaway shown inside the chest.' : 'External beak and wing shown.'} Matched structures: ${matched.join(', ') || 'none'}.`}>
  <path d="M48 261H444" stroke="#8c6f4f" strokeWidth="12" strokeLinecap="round"/>
  <path d="M186 212L182 258M220 213L228 258" stroke="#866340" strokeWidth="7"/>
  <path d="M104 209L40 166L68 142L139 169" fill="#826442"/><ellipse cx="208" cy="169" rx="102" ry="67" fill="#b89a69"/>
  <circle cx="294" cy="111" r="51" fill="#947647"/><path d="M286 81L318 83" stroke="#e8d3a3" strokeWidth="9"/><circle cx="317" cy="101" r="6" fill="#24383d"/>
  <path data-selected={selected==='beak'} d="M339 105L390 117L340 129Z" fill="#d4ad56" stroke={selected==='beak'?'#277477':'#74583b'} strokeWidth="5"/>
  <path data-selected={selected==='wing'} d="M165 143Q253 131 269 188Q203 223 143 198Z" fill="#7f6747" stroke={selected==='wing'?'#277477':'#d6c19a'} strokeWidth="5"/>
  {internal && <g><ellipse cx="243" cy="166" rx="34" ry="41" fill="#f2ddd0" stroke="#547d7b" strokeWidth="3"/><path d="M242 129V174m0 -30q-29 -8 -22 34m22 -34q29 -8 22 34" stroke="#a76668" strokeWidth="8" fill="none"/></g>}
  <text x="369" y="149">Beak</text><text x="141" y="127">Wing</text>{internal && <text x="281" y="214">Lungs · inside</text>}
 </svg>;
}

export function HazardScene({ flood, selected, checked }: { flood: boolean; selected: string[]; checked: boolean }) {
 const shutters=selected.includes('shutters'); const channel=selected.includes('waterway'); const warning=selected.includes('warnings')||selected.includes('warning');
 return <svg className="science-scene" viewBox="0 0 500 300" role="img" aria-label={`Planning model: ${flood?'floodwater near a house and road':'hurricane winds near a house'}. ${selected.length ? `Selected protections: ${selected.join(', ')}.`:'No protections placed.'} ${checked?'The plan was checked. Risk remains.':''}`}>
  <rect x="5" y="5" width="490" height="290" rx="24" fill="#e8f0ed"/><path d="M20 260H480" stroke="#879b82" strokeWidth="16"/>
  <path d="M202 144H370V248H202Z" fill="#e2c99b"/><path d="M183 145L285 64L391 145Z" fill="#52757d"/><rect x="271" y="184" width="38" height="64" fill="#80654a"/>
  <rect x="225" y="166" width="31" height="32" fill="#a6c8cb"/>{shutters&&<><rect x="220" y="162" width="18" height="40" fill="#577879"/><rect x="245" y="162" width="18" height="40" fill="#577879"/></>}
  <path d="M400 272V182" stroke="#6c7371" strokeWidth="13"/>
  {flood?<><path d={channel?'M15 220Q124 219 144 260L190 285':'M15 220Q106 186 184 225T360 264'} fill="none" stroke="#6eacbc" strokeWidth="25" opacity=".8"/>{channel&&<path d="M24 241Q128 240 122 274" fill="none" stroke="#557c86" strokeWidth="5"/>}</>:<><path d="M22 90H152M48 117H172M24 143H125" stroke="#90aab1" strokeWidth="7" strokeLinecap="round"/><path d="M148 81L162 90L148 99" fill="none" stroke="#90aab1" strokeWidth="4"/></>}
  {warning&&<><rect x="55" y="157" width="74" height="75" rx="8" fill="#b9874c"/><path d="M73 195L92 168L112 195Z" fill="#fff0b5"/><text x="93" y="218" textAnchor="middle">Warning</text></>}
  <text x="250" y="289" textAnchor="middle">Planning model · protections have limits</text>
 </svg>;
}

export function ResourceObject({ label }: { label: string }) {
 const sun = /sun/i.test(label);
 const wind = /wind/i.test(label);
 const coal = /coal/i.test(label);
 const oil = /oil/i.test(label);
 return <svg className="science-resource-object" viewBox="0 0 120 90" aria-hidden="true">
  <ellipse cx="60" cy="80" rx="44" ry="5" fill="#dce7db" />
  {sun ? <><circle cx="60" cy="42" r="22" fill="#e7bd52"/>{[0,45,90,135,180,225,270,315].map(angle=><path key={angle} d="M60 10V3" transform={`rotate(${angle} 60 42)`} stroke="#ad8428" strokeWidth="3" strokeLinecap="round"/>)}</>
    : wind ? <><path d="M59 39L55 79H65L61 39" fill="#76969b"/><path d="M60 38L66 4Q48 12 60 38M60 38L26 43Q35 59 60 38M60 38L82 65Q92 46 60 38" fill="#bfd3cb" stroke="#53787a" strokeWidth="2"/><circle cx="60" cy="38" r="5" fill="#547779"/></>
    : coal ? <><path d="M21 67L33 42L58 39L72 66L56 80L31 78Z" fill="#4f585a"/><path d="M55 42L73 23L96 31L103 60L78 72L72 62Z" fill="#687276"/><path d="M35 49L54 45M78 34L92 39" stroke="#97a2a0" strokeWidth="3"/></>
    : oil ? <><rect x="30" y="18" width="60" height="60" rx="9" fill="#789295" stroke="#486970" strokeWidth="3"/><ellipse cx="60" cy="19" rx="30" ry="7" fill="#b0c7c5" stroke="#486970" strokeWidth="3"/><path d="M30 37H90M30 63H90" stroke="#486970" strokeWidth="3"/><path d="M60 39Q42 57 60 60Q77 57 60 39" fill="#2d4649"/></>
    : <><path d="M47 56Q28 39 41 22Q60 3 79 22Q92 39 73 56L71 66H49Z" fill="#e6d49b" stroke="#7f8c71" strokeWidth="3"/><path d="M48 68H73M50 74H71" stroke="#58787a" strokeWidth="5"/><path d="M23 30L10 25M97 30L110 25" stroke="#b19b51" strokeWidth="3"/></>}
 </svg>;
}
