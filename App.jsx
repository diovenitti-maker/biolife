import { useState, useEffect } from 'react'
import { db } from './firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defaultAlimentazione, GIORNI, PASTI } from './data/alimentazione.js'
import { defaultStileVita } from './data/stileVita.js'
import { profiliGenetici } from './data/profiliGenetici.js'
import { integratoriDamiano } from './data/integratori.js'
import { defaultAllenamenti, TIPI_ALLENAMENTO, GIORNI_SETTIMANA } from './data/allenamenti.js'

const PROFILI=[
  {id:'damiano',nome:'Damiano',eta:37,emoji:'👨',colore:'#7c6af7'},
  {id:'ilaria', nome:'Ilaria', eta:34,emoji:'👩',colore:'#ff6b9d'},
  {id:'daniele',nome:'Daniele',eta:7, emoji:'👦',colore:'#4ecdc4'},
  {id:'tommaso',nome:'Tommaso',eta:4, emoji:'👶',colore:'#ffa94d'},
]
const TABS=['🥗 Alimentazione','🧬 Profilo Genetico','🏃 Allenamento','🌿 Stile di Vita','💊 Integratori','💧 Acqua']

const getProteina=(testo)=>{
  if(!testo)return null
  const t=testo.toLowerCase()
  if(t.includes('digiuno')||t.includes('tisana'))return{label:'Digiuno',colore:'#555566'}
  if(t.includes('scuola')||t.includes('mensa'))return{label:'Scuola',colore:'#6b7280'}
  if(t.includes('pesce')||t.includes('sgombro')||t.includes('platessa')||t.includes('salmone')||t.includes('tonno')||t.includes('merluzzo')||t.includes('branzino')||t.includes('orata')||t.includes('sardine')||t.includes('polpo')||t.includes('molluschi')||t.includes('trota')||t.includes('bastoncini')||t.includes('sogliola'))return{label:'Pesce',colore:'#60a5fa'}
  if(t.includes('carne')||t.includes('pollo')||t.includes('manzo')||t.includes('selvaggina')||t.includes('tacchino')||t.includes('prosciutto')||t.includes('ragù')||t.includes('polpett')||t.includes('agnello'))return{label:'Carne',colore:'#f87171'}
  if(t.includes('uov')||t.includes('frittata'))return{label:'Uova',colore:'#fbbf24'}
  if(t.includes('legumi')||t.includes('lenticchie')||t.includes('fagioli')||t.includes('ceci')||t.includes('hummus')||t.includes('minestrone'))return{label:'Legumi',colore:'#a855f7'}
  if(t.includes('kefir')||t.includes('ricotta')||t.includes('yogurt')||t.includes('mozzarella')||t.includes('formaggio'))return{label:'Latticini',colore:'#4ade80'}
  return null
}
const TIPI_PROTEINA=[
  {label:'Pesce',colore:'#60a5fa'},{label:'Carne',colore:'#f87171'},{label:'Uova',colore:'#fbbf24'},
  {label:'Legumi',colore:'#a855f7'},{label:'Latticini',colore:'#4ade80'},{label:'Digiuno',colore:'#555566'},
  {label:'Scuola',colore:'#6b7280'},{label:'—',colore:'#2e2e48'},
]
const getProtByLabel=l=>TIPI_PROTEINA.find(t=>t.label===l)||null
const LEGENDA=TIPI_PROTEINA.slice(0,-1)

const css=`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--bg:#07070f;--surface:#0f0f1a;--card:#151523;--card2:#1c1c2e;--border:#252538;--border2:#2e2e48;--text:#e8e8f4;--muted:#7878a0;--radius:14px;--radius-sm:8px}
  body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;min-height:100vh}
  .app{max-width:900px;margin:0 auto;padding:0 0 80px}
  .header{background:linear-gradient(135deg,#0f0f1a,#141428);border-bottom:1px solid var(--border);padding:20px 20px 0;position:sticky;top:0;z-index:100;backdrop-filter:blur(12px)}
  .logo{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;background:linear-gradient(135deg,#7c6af7,#4ecdc4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .logo-sub{font-size:12px;color:var(--muted);-webkit-text-fill-color:var(--muted)}
  .profiles-row{display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none;margin-top:16px}
  .profiles-row::-webkit-scrollbar,.day-tabs::-webkit-scrollbar,.tabs-row::-webkit-scrollbar{display:none}
  .profile-btn{display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:40px;border:2px solid transparent;cursor:pointer;background:var(--card);color:var(--muted);font-size:13px;font-weight:500;white-space:nowrap;transition:all .2s}
  .profile-btn.active{color:#fff;font-weight:600}
  .tabs-row{display:flex;gap:2px;margin:0 -20px;overflow-x:auto;scrollbar-width:none}
  .tab-btn{padding:10px 14px;font-size:13px;font-weight:500;background:transparent;border:none;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .2s}
  .tab-btn.active{color:var(--text)}
  .content{padding:20px}
  .section-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;margin-bottom:16px;display:flex;align-items:center;gap:8px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px}
  .card2{background:var(--card2);border:1px solid var(--border2);border-radius:var(--radius-sm);padding:12px;margin-bottom:8px}
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
  .badge-red{background:rgba(248,113,113,.15);color:#f87171}
  .badge-yellow{background:rgba(251,191,36,.15);color:#fbbf24}
  .badge-green{background:rgba(74,222,128,.15);color:#4ade80}
  .label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:var(--muted)}
  .text-muted{color:var(--muted);font-size:13px}.text-sm{font-size:13px}.text-xs{font-size:11px}
  .mb-4{margin-bottom:4px}.mb-8{margin-bottom:8px}.mb-12{margin-bottom:12px}.mb-16{margin-bottom:16px}.mt-8{margin-top:8px}
  .flex{display:flex}.gap-4{gap:4px}.gap-8{gap:8px}.items-center{align-items:center}.justify-between{justify-content:space-between}
  .plan-toggle{display:flex;gap:4px;background:var(--surface);border-radius:10px;padding:4px;margin-bottom:20px;border:1px solid var(--border)}
  .plan-toggle-btn{flex:1;padding:8px 12px;border-radius:7px;border:none;font-size:12px;font-weight:600;cursor:pointer;background:transparent;color:var(--muted);transition:all .2s}
  .plan-toggle-btn.active{background:var(--card);color:var(--text);box-shadow:0 2px 8px rgba(0,0,0,.3)}
  .day-tabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;margin-bottom:16px}
  .day-tab{padding:7px 12px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s}
  .day-tab.active{color:#fff;border-color:transparent;font-weight:600}
  .meal-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;overflow:hidden}
  .meal-header{padding:12px 14px;border-bottom:1px solid var(--border)}
  .meal-body{padding:12px 14px}
  .edit-btn{background:transparent;border:1px solid var(--border);border-radius:6px;color:var(--muted);cursor:pointer;font-size:11px;padding:3px 8px}
  .save-btn{background:linear-gradient(135deg,#7c6af7,#4ecdc4);border:none;border-radius:6px;color:#fff;cursor:pointer;font-size:12px;padding:6px 12px;font-weight:600}
  .cancel-btn{background:transparent;border:1px solid var(--border);border-radius:6px;color:var(--muted);cursor:pointer;font-size:12px;padding:6px 10px}
  .del-btn{background:transparent;border:1px solid rgba(248,113,113,.3);border-radius:6px;color:#f87171;cursor:pointer;font-size:11px;padding:3px 8px}
  .reset-btn{background:transparent;border:1px solid rgba(251,191,36,.3);border-radius:6px;color:#fbbf24;cursor:pointer;font-size:11px;padding:3px 8px}
  .move-btn{background:transparent;border:1px solid var(--border);border-radius:6px;color:var(--muted);cursor:pointer;font-size:12px;padding:2px 7px;line-height:1}
  .move-btn:hover{border-color:var(--border2);color:var(--text)}
  textarea{width:100%;background:var(--surface);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;padding:10px 12px;resize:vertical;min-height:80px;outline:none}
  textarea:focus{border-color:#7c6af7}
  input[type="text"]{width:100%;background:var(--surface);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;padding:8px 12px;outline:none}
  input[type="text"]:focus{border-color:#7c6af7}
  select{width:100%;background:var(--surface);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;padding:8px 12px;outline:none}
  .risk-bar{background:var(--border);border-radius:4px;height:6px;overflow:hidden;width:120px;flex-shrink:0}
  .risk-fill{height:100%;border-radius:4px}
  .note-item{display:flex;gap:8px;padding:8px 12px;border-radius:var(--radius-sm);background:var(--surface);margin-bottom:6px;border:1px solid var(--border);font-size:13px;align-items:flex-start}
  .integr-card{background:var(--card);border-left:3px solid;border-radius:var(--radius);padding:14px;margin-bottom:10px}
  .chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:11px;background:var(--card2);color:var(--muted);border:1px solid var(--border)}
  .list-item{display:flex;gap:8px;padding:10px 12px;border-radius:var(--radius-sm);background:var(--card);margin-bottom:6px;border:1px solid var(--border);align-items:flex-start}
  .routine-time{font-size:11px;font-weight:600;color:var(--muted);min-width:38px;margin-top:2px;font-family:'Space Grotesk',sans-serif}
  .add-btn{width:100%;padding:11px;background:var(--card);border:2px dashed var(--border2);border-radius:var(--radius);color:var(--muted);cursor:pointer;font-size:13px;font-weight:500;transition:all .2s;margin-bottom:8px}
  .add-btn:hover{border-color:#7c6af7;color:#7c6af7}
  .form-box{background:var(--card);border:1px solid var(--border2);border-radius:var(--radius);padding:16px;margin-bottom:12px}
  .field-row{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap}
  hr.sep{border:none;border-top:1px solid var(--border);margin:20px 0}
  .empty-state{text-align:center;padding:24px;color:var(--muted)}
  .rg{display:grid;grid-template-columns:70px repeat(7,1fr);gap:3px}
  .rg-h{font-size:10px;font-weight:600;color:var(--muted);text-align:center;padding:4px 2px}
  .rg-l{font-size:10px;color:var(--muted);text-align:right;padding-right:6px;display:flex;align-items:center;justify-content:flex-end}
  .rg-c{display:flex;align-items:center;justify-content:center;min-height:26px}
  @media(max-width:600px){.content{padding:14px}.header{padding:14px 14px 0}.rg{grid-template-columns:55px repeat(7,1fr)}}
`

// ─── FORM VOCE – stato locale, nessun re-render del padre mentre si digita ──
function FormVoce({initialForm, onSave, onCancel, lbl}){
  const[f,setF]=useState(initialForm)
  const ch=k=>e=>setF(p=>({...p,[k]:e.target.value}))
  return(
    <div className="form-box mb-8">
      <div className="field-row">
        <div style={{minWidth:90}}>
          <div className="label mb-4">Orario</div>
          <input type="text" defaultValue={f.orario||''} onChange={ch('orario')} placeholder="07:10" style={{width:90}}/>
        </div>
        <div style={{flex:1,minWidth:180}}>
          <div className="label mb-4">Attività *</div>
          <input type="text" defaultValue={f.attivita||''} onChange={ch('attivita')} placeholder="Descrivi l'attività" autoFocus/>
        </div>
      </div>
      <div style={{marginBottom:12}}>
        <div className="label mb-4">Note</div>
        <input type="text" defaultValue={f.note||''} onChange={ch('note')} placeholder="Dettagli aggiuntivi…"/>
      </div>
      <div className="flex gap-4"><button className="cancel-btn" onClick={onCancel}>Annulla</button><button className="save-btn" onClick={()=>onSave(f)}>{lbl}</button></div>
    </div>
  )
}

function FormSessione({initialForm, onSave, onCancel, lbl}){
  const[f,setF]=useState(initialForm)
  const ch=k=>e=>setF(p=>({...p,[k]:e.target.value}))
  return(
    <div className="form-box mb-8">
      <div className="field-row">
        <div style={{flex:1,minWidth:120}}><div className="label mb-4">Giorno</div><select defaultValue={f.giorno||'Lunedì'} onChange={ch('giorno')}>{GIORNI_SETTIMANA.map(g=><option key={g}>{g}</option>)}</select></div>
        <div style={{flex:1,minWidth:120}}><div className="label mb-4">Tipo</div><select defaultValue={f.tipo||'Altro'} onChange={ch('tipo')}>{TIPI_ALLENAMENTO.map(t=><option key={t}>{t}</option>)}</select></div>
        <div style={{flex:1,minWidth:100}}><div className="label mb-4">Intensità</div><select defaultValue={f.intensita||'media'} onChange={ch('intensita')}><option value="bassa">🟢 Bassa</option><option value="media">🟡 Media</option><option value="alta">🔴 Alta</option></select></div>
      </div>
      <div className="field-row">
        <div style={{flex:2,minWidth:160}}><div className="label mb-4">Disciplina *</div><input type="text" defaultValue={f.disciplina||''} onChange={ch('disciplina')} autoFocus/></div>
        <div style={{flex:1,minWidth:80}}><div className="label mb-4">Orario</div><input type="text" defaultValue={f.orario||''} onChange={ch('orario')} placeholder="17:00"/></div>
        <div style={{flex:1,minWidth:80}}><div className="label mb-4">Durata</div><input type="text" defaultValue={f.durata||''} onChange={ch('durata')} placeholder="60 min"/></div>
      </div>
      <div style={{marginBottom:12}}><div className="label mb-4">Note</div><input type="text" defaultValue={f.note||''} onChange={ch('note')}/></div>
      <div className="flex gap-4"><button className="cancel-btn" onClick={onCancel}>Annulla</button><button className="save-btn" onClick={()=>onSave(f)}>{lbl}</button></div>
    </div>
  )
}

const COLORI_INT=['#7c6af7','#4ecdc4','#ffa94d','#51cf66','#ff6b6b','#60a5fa','#f9a8d4']
function FormIntegratore({initialForm, onSave, onCancel, lbl}){
  const[f,setF]=useState(initialForm)
  const ch=k=>e=>setF(p=>({...p,[k]:e.target.value}))
  return(
    <div className="form-box mb-12">
      <div className="field-row">
        <div style={{flex:2,minWidth:180}}><div className="label mb-4">Nome *</div><input type="text" defaultValue={f.nome||''} onChange={ch('nome')} autoFocus/></div>
        <div style={{flex:1,minWidth:130}}><div className="label mb-4">Periodo</div><input type="text" defaultValue={f.periodo||''} onChange={ch('periodo')} placeholder="Tutto l'anno"/></div>
      </div>
      <div className="field-row">
        <div style={{flex:1,minWidth:130}}><div className="label mb-4">Timing</div><input type="text" defaultValue={f.timing||''} onChange={ch('timing')} placeholder="Dopo colazione"/></div>
        <div style={{flex:1,minWidth:130}}><div className="label mb-4">Dosaggio</div><input type="text" defaultValue={f.dosaggio||''} onChange={ch('dosaggio')} placeholder="1 capsula"/></div>
      </div>
      <div style={{marginBottom:8}}><div className="label mb-4">Beneficio</div><input type="text" defaultValue={f.beneficio||''} onChange={ch('beneficio')}/></div>
      <div style={{marginBottom:12}}><div className="label mb-4">Note</div><input type="text" defaultValue={f.note||''} onChange={ch('note')}/></div>
      <div style={{marginBottom:12}}><div className="label mb-8">Colore</div><div className="flex gap-8">{COLORI_INT.map(c=><div key={c} onClick={()=>setF(p=>({...p,colore:c}))} style={{width:28,height:28,borderRadius:'50%',background:c,cursor:'pointer',border:f.colore===c?'3px solid white':'3px solid transparent',boxShadow:f.colore===c?`0 0 0 2px ${c}`:'none'}}/>)}</div></div>
      <div className="flex gap-4"><button className="cancel-btn" onClick={onCancel}>Annulla</button><button className="save-btn" onClick={()=>onSave(f)}>{lbl}</button></div>
    </div>
  )
}

// ─── MEAL PLAN ────────────────────────────────────────────────────────────────
function MealPlan({profilo,profiloColore}){
  const[piano,setPiano]=useState('base')
  const[giorno,setGiorno]=useState('Lunedì')
  const[dati,setDati]=useState(null)
  const[editing,setEditing]=useState({})
  const[editValues,setEditValues]=useState({})
  const[saving,setSaving]=useState(false)
  const[pickingProt,setPickingProt]=useState(null)
  const fbKey=`${profilo}_${piano}`

  useEffect(()=>{setDati(null);(async()=>{try{const s=await getDoc(doc(db,'biolife_alimentazione',fbKey));if(s.exists())setDati(s.data());else{const d=defaultAlimentazione[profilo]?.[`piano_${piano}`]||{};setDati(d);await setDoc(doc(db,'biolife_alimentazione',fbKey),d)}}catch{setDati(defaultAlimentazione[profilo]?.[`piano_${piano}`]||{})}})()},[profilo,piano])

  const persist=async n=>{setSaving(true);setDati(n);try{await setDoc(doc(db,'biolife_alimentazione',fbKey),n)}catch(e){console.error(e)};setSaving(false)}
  const startEdit=p=>{setEditing(e=>({...e,[p]:true}));setEditValues(v=>({...v,[p]:dati?.[giorno]?.[p]||''}))}
  const saveEdit=async p=>{await persist({...dati,[giorno]:{...(dati?.[giorno]||{}),[p]:editValues[p]}});setEditing(e=>({...e,[p]:false}))}
  const resetDefault=async()=>{if(!confirm('Ripristinare al default?'))return;await persist(defaultAlimentazione[profilo]?.[`piano_${piano}`]||{})}
  const getProtOvr=(g,p)=>dati?._proteine?.[g]?.[p]||null
  const setProtOvr=async(pasto,label)=>{
    const ovr=dati?._proteine||{};const gO=ovr[giorno]||{}
    const nG=label==='—'?(({[pasto]:_,...r})=>r)(gO):{...gO,[pasto]:label}
    await persist({...dati,_proteine:{...ovr,[giorno]:nG}});setPickingProt(null)
  }
  const getProtMeal=(g,p,txt)=>{const o=getProtOvr(g,p);return o?getProtByLabel(o):getProteina(txt)}
  const gs=['Lun','Mar','Mer','Gio','Ven','Sab','Dom']
  const gd=dati?.[giorno]||{}

  return(
    <div>
      <div className="plan-toggle">
        <button className={`plan-toggle-btn ${piano==='base'?'active':''}`} onClick={()=>setPiano('base')}>📋 Piano Base</button>
        <button className={`plan-toggle-btn ${piano==='alternativo'?'active':''}`} onClick={()=>setPiano('alternativo')}>🔄 Piano Alternativo</button>
      </div>
      <div className="day-tabs">{GIORNI.map((g,i)=><button key={g} className={`day-tab ${giorno===g?'active':''}`} style={giorno===g?{background:profiloColore,borderColor:profiloColore}:{}} onClick={()=>setGiorno(g)}>{gs[i]}</button>)}</div>
      <div className="flex items-center justify-between mb-12">
        <div><div className="section-title" style={{marginBottom:4}}>{giorno}</div><div className="text-muted text-sm">{piano==='base'?'Piano fisso':'Suggerimenti personalizzati'}</div></div>
        <div className="flex gap-4">{saving&&<span className="text-xs text-muted">Salv…</span>}<button className="reset-btn" onClick={resetDefault} title="Ripristina default">🔄</button></div>
      </div>
      {!dati&&<div className="text-muted text-sm">Caricamento…</div>}
      {dati&&PASTI.map(pasto=>{
        const testo=gd[pasto]||'';const prot=getProtMeal(giorno,pasto,testo)
        const isEd=editing[pasto];const isPick=pickingProt===pasto;const hasOvr=!!getProtOvr(giorno,pasto)
        return(
          <div key={pasto} className="meal-card">
            <div className="meal-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div onClick={()=>setPickingProt(isPick?null:pasto)} style={{width:14,height:14,borderRadius:'50%',background:prot?prot.colore:'var(--border2)',cursor:'pointer',flexShrink:0,border:hasOvr?'2px solid white':'2px solid transparent',boxShadow:hasOvr&&prot?`0 0 0 1px ${prot.colore}`:'none'}}/>
                  <span className="meal-name">{pasto}</span>
                  {prot&&prot.label!=='—'&&<span style={{fontSize:10,color:prot.colore,fontWeight:600}}>{prot.label}{hasOvr?' ✎':''}</span>}
                </div>
                {isEd?<div className="flex gap-4"><button className="cancel-btn" onClick={()=>setEditing(e=>({...e,[pasto]:false}))}>Annulla</button><button className="save-btn" onClick={()=>saveEdit(pasto)}>Salva</button></div>
                :<button className="edit-btn" onClick={()=>startEdit(pasto)}>✏️</button>}
              </div>
              {isPick&&<div className="flex gap-8" style={{paddingTop:8,flexWrap:'wrap'}}>
                {TIPI_PROTEINA.map(tp=><div key={tp.label} onClick={()=>setProtOvr(pasto,tp.label)} style={{display:'flex',alignItems:'center',gap:4,cursor:'pointer',padding:'3px 8px',borderRadius:20,border:`1px solid ${getProtOvr(giorno,pasto)===tp.label?tp.colore:'var(--border)'}`,background:getProtOvr(giorno,pasto)===tp.label?tp.colore+'22':'transparent'}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:tp.colore}}/><span style={{fontSize:11,color:getProtOvr(giorno,pasto)===tp.label?tp.colore:'var(--muted)'}}>{tp.label}</span>
                </div>)}
              </div>}
            </div>
            <div className="meal-body">
              {isEd?<textarea value={editValues[pasto]||''} onChange={e=>setEditValues(v=>({...v,[pasto]:e.target.value}))} autoFocus/>
              :<div style={{fontSize:14,lineHeight:1.6}}>{testo?testo.split('•').map((t,i)=><span key={i}>{i>0&&<span style={{color:profiloColore,margin:'0 6px'}}>·</span>}{t.trim()}</span>):<span className="text-muted">—</span>}</div>}
            </div>
          </div>
        )
      })}
      {dati&&(
        <div style={{marginTop:28}}>
          <div className="section-title" style={{marginBottom:12}}>📊 Riepilogo Proteico Settimanale</div>
          <div className="flex gap-8 mb-12" style={{flexWrap:'wrap'}}>{LEGENDA.map(l=><div key={l.label} className="flex items-center gap-4"><div style={{width:10,height:10,borderRadius:'50%',background:l.colore}}/><span style={{fontSize:11,color:'var(--muted)'}}>{l.label}</span></div>)}</div>
          <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:12,overflowX:'auto'}}>
            <div className="rg">
              <div/>{['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map(g=><div key={g} className="rg-h">{g}</div>)}
              {PASTI.map((pasto,pi)=>[
                <div key={'l'+pi} className="rg-l">{['Col.','Mer.M','Pran.','Mer.P','Cena'][pi]}</div>,
                ...GIORNI.map(g=>{const o=dati?._proteine?.[g]?.[pasto];const p=o?getProtByLabel(o):getProteina(dati?.[g]?.[pasto]||'');return<div key={g+pi} className="rg-c"><div style={{width:13,height:13,borderRadius:'50%',background:p?p.colore:'var(--border2)'}}/></div>})
              ])}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PROFILO GENETICO ─────────────────────────────────────────────────────────
function ProfiloGenetico({profilo}){
  const dati=profiliGenetici[profilo];const[open,setOpen]=useState(null)
  if(!dati)return null
  const badge=l=>l==='alto'?'badge-red':l==='attenzione'?'badge-yellow':'badge-green'
  const lbl=l=>l==='alto'?'⚠️ Alto':l==='attenzione'?'⚡ Attenzione':'✅ Basso'
  const cR=p=>p>=25?'#f87171':p>=18?'#fbbf24':'#4ade80'
  return(
    <div>
      {dati.patologie?.length>0&&<><div className="section-title">🏥 Patologie Accertate</div><div className="mb-16">{dati.patologie.map((p,i)=>(
        <div key={i} style={{background:'var(--card)',border:`1px solid ${p.livello==='alto'?'rgba(248,113,113,.3)':'rgba(251,191,36,.25)'}`,borderRadius:'var(--radius)',marginBottom:10,overflow:'hidden'}}>
          <div className="flex items-center justify-between" style={{padding:'12px 14px',cursor:'pointer'}} onClick={()=>setOpen(open===i?null:i)}>
            <div className="flex items-center gap-8"><span style={{fontSize:20}}>{p.emoji}</span><span style={{fontWeight:600,fontSize:14}}>{p.nome}</span></div>
            <div className="flex items-center gap-8"><span className={`badge ${p.livello==='alto'?'badge-red':'badge-yellow'}`}>{p.livello==='alto'?'🔴':'🟡'}</span><span style={{color:'var(--muted)',fontSize:12}}>{open===i?'▲':'▼'}</span></div>
          </div>
          {open===i&&<div style={{padding:'0 14px 14px',borderTop:'1px solid var(--border)'}}><div className="text-sm text-muted" style={{margin:'10px 0'}}>{p.note}</div><div className="label mb-8">Consigli</div>{p.consigli.map((c,j)=><div key={j} className="note-item" style={{marginBottom:6}}>{c}</div>)}</div>}
        </div>
      ))}</div></>}
      {dati.rischiPRS?.length>0&&<><div className="section-title">🧬 Rischi Genetici (PRS)</div><div className="card mb-16">{dati.rischiPRS.map((r,i)=>(
        <div key={i} className="flex items-center justify-between" style={{padding:'10px 0',borderBottom:i<dati.rischiPRS.length-1?'1px solid var(--border)':'none'}}>
          <div><div className="text-sm" style={{marginBottom:2}}>{r.area}</div><span className={`badge ${badge(r.livello)}`}>{lbl(r.livello)}</span></div>
          <div className="flex items-center gap-8"><div className="risk-bar"><div className="risk-fill" style={{width:`${Math.min(r.percentuale,100)}%`,background:cR(r.percentuale)}}/></div><span className="text-sm" style={{color:cR(r.percentuale),fontFamily:'Space Grotesk',fontWeight:600,minWidth:42,textAlign:'right'}}>{r.percentuale.toFixed(0)}%</span></div>
        </div>
      ))}</div></>}
      {dati.intolleranze?.length>0&&<><div className="section-title">⚡ Intolleranze</div><div className="mb-16">{dati.intolleranze.map((t,i)=><div key={i} className="card2 mb-8"><div className="flex items-center gap-8 mb-4"><span className="text-sm" style={{fontWeight:600}}>{t.nome}</span><span className={`badge ${t.rischio==='alto'?'badge-red':'badge-yellow'}`}>{t.rischio==='alto'?'⚠️':'⚡'}</span></div>{t.nota&&<div className="text-xs text-muted">{t.nota}</div>}</div>)}</div></>}
      {dati.carenze?.length>0&&<><div className="section-title">💊 Carenze</div><div className="mb-16">{dati.carenze.map((c,i)=><div key={i} className="card2 mb-8"><div className="flex items-center gap-8 mb-4"><span className="text-sm" style={{fontWeight:600}}>{c.nutriente}</span><span className={`badge ${c.rischio==='alto'?'badge-red':'badge-yellow'}`}>{c.rischio==='alto'?'🔴':'🟡'}</span></div><div className="text-xs text-muted mb-4">{c.alimenti}</div>{c.nota&&<div className="text-xs" style={{color:'#fbbf24'}}>{c.nota}</div>}</div>)}</div></>}
      <div className="section-title">📋 Note Cliniche</div>
      <div className="card">{dati.noteClinici.map((n,i)=><div key={i} className="note-item" style={{marginBottom:6}}>{n}</div>)}</div>
    </div>
  )
}

// ─── ALLENAMENTO ──────────────────────────────────────────────────────────────
function Allenamento({profilo,profiloColore}){
  const[dati,setDati]=useState(null)
  const[editingId,setEditingId]=useState(null)
  const[aggiungendo,setAggiungendo]=useState(false)
  const[filtro,setFiltro]=useState('Tutti')
  const[saving,setSaving]=useState(false)
  const[editNote,setEditNote]=useState(false)
  const[noteVal,setNoteVal]=useState('')
  const sv=()=>({id:'all_'+Date.now(),giorno:'Lunedì',tipo:'Altro',disciplina:'',orario:'',durata:'',intensita:'media',note:''})

  useEffect(()=>{(async()=>{try{const s=await getDoc(doc(db,'biolife_allenamenti',profilo));if(s.exists())setDati(s.data());else{const d=defaultAllenamenti[profilo]||{note:'',sessioni:[]};setDati(d);await setDoc(doc(db,'biolife_allenamenti',profilo),d)}}catch{setDati(defaultAllenamenti[profilo]||{note:'',sessioni:[]})}})()},[profilo])

  const persist=async n=>{setSaving(true);setDati(n);try{await setDoc(doc(db,'biolife_allenamenti',profilo),n)}catch(e){console.error(e)};setSaving(false)}
  const saveEdit=async f=>{await persist({...dati,sessioni:dati.sessioni.map(s=>s.id===editingId?{...s,...f}:s)});setEditingId(null)}
  const elimina=async id=>{if(!confirm('Eliminare?'))return;await persist({...dati,sessioni:dati.sessioni.filter(s=>s.id!==id)})}
  const aggiungi=async f=>{if(!f.disciplina?.trim())return;await persist({...dati,sessioni:[...dati.sessioni,{...f,id:'all_'+Date.now()}]});setAggiungendo(false)}
  const saveNote=async()=>{await persist({...dati,note:noteVal});setEditNote(false)}
  const move=async(id,dir)=>{
    const arr=[...dati.sessioni];const i=arr.findIndex(s=>s.id===id);const j=i+dir
    if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];await persist({...dati,sessioni:arr})
  }

  if(!dati)return<div className="text-muted">Caricamento…</div>
  const cI=i=>i==='alta'?'#f87171':i==='media'?'#fbbf24':'#4ade80'
  const em=t=>({'Arti Marziali':'🥋','Corsa':'🏃','Cardio':'🚴','Corpo libero':'💪','Nuoto':'🏊','Atletica':'⚡','Outdoor':'🚵','Allungamento':'🧘','Recupero':'😴','Gioco libero':'🎮'}[t]||'🏋️')
  const gs={Lunedì:'Lun',Martedì:'Mar',Mercoledì:'Mer',Giovedì:'Gio',Venerdì:'Ven',Sabato:'Sab',Domenica:'Dom'}
  const lista=filtro==='Tutti'?dati.sessioni:dati.sessioni.filter(s=>s.giorno===filtro)

  return(
    <div>
      <div className="flex items-center justify-between mb-4"><div className="section-title" style={{marginBottom:0}}>Piano Allenamento</div>{saving&&<span className="text-xs text-muted">Salv…</span>}</div>
      <div className="card mb-16">
        <div className="flex items-center justify-between mb-4"><span className="label">Note generali</span>{editNote?<div className="flex gap-4"><button className="cancel-btn" onClick={()=>setEditNote(false)}>Annulla</button><button className="save-btn" onClick={saveNote}>Salva</button></div>:<button className="edit-btn" onClick={()=>{setEditNote(true);setNoteVal(dati.note||'')}}>✏️</button>}</div>
        {editNote?<textarea value={noteVal} onChange={e=>setNoteVal(e.target.value)} style={{minHeight:60}}/>:<div className="text-sm">{dati.note||'—'}</div>}
      </div>
      <div className="day-tabs mb-16">{['Tutti',...GIORNI_SETTIMANA].map(g=><button key={g} className={`day-tab ${filtro===g?'active':''}`} style={filtro===g?{background:profiloColore,borderColor:profiloColore}:{}} onClick={()=>setFiltro(g)}>{g==='Tutti'?'Tutti':gs[g]}</button>)}</div>
      {lista.map((s,i)=>{
        const realI=dati.sessioni.findIndex(x=>x.id===s.id)
        return(
          <div key={s.id}>
            {editingId===s.id
              ?<FormSessione initialForm={s} onSave={saveEdit} onCancel={()=>setEditingId(null)} lbl="Salva"/>
              :<div className="list-item" style={{borderLeft:`3px solid ${cI(s.intensita)}`}}>
                <div className="flex gap-4" style={{flexShrink:0,flexDirection:'column'}}>
                  <button className="move-btn" onClick={()=>move(s.id,-1)} disabled={realI===0} style={{opacity:realI===0?.3:1}}>↑</button>
                  <button className="move-btn" onClick={()=>move(s.id,1)} disabled={realI===dati.sessioni.length-1} style={{opacity:realI===dati.sessioni.length-1?.3:1}}>↓</button>
                </div>
                <div style={{flex:1}}>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-8"><span style={{fontSize:18}}>{em(s.tipo)}</span><div><div style={{fontWeight:600,fontSize:14}}>{s.disciplina}</div><div className="text-xs text-muted">{s.giorno} · {s.tipo}</div></div></div>
                    <div className="flex gap-4"><button className="edit-btn" onClick={()=>setEditingId(s.id)}>✏️</button><button className="del-btn" onClick={()=>elimina(s.id)}>🗑</button></div>
                  </div>
                  <div className="flex gap-8" style={{flexWrap:'wrap',marginBottom:s.note?6:0}}>
                    {s.orario&&s.orario!=='—'&&<div className="chip">🕐 {s.orario}</div>}
                    {s.durata&&s.durata!=='—'&&<div className="chip">⏱ {s.durata}</div>}
                    <div className="chip" style={{color:cI(s.intensita),borderColor:cI(s.intensita)+'44'}}>● {s.intensita}</div>
                  </div>
                  {s.note&&<div className="text-xs text-muted">{s.note}</div>}
                </div>
              </div>}
          </div>
        )
      })}
      {aggiungendo?<FormSessione initialForm={sv()} onSave={aggiungi} onCancel={()=>setAggiungendo(false)} lbl="➕ Aggiungi"/>
      :<button className="add-btn" onClick={()=>setAggiungendo(true)}>➕ Aggiungi sessione</button>}
    </div>
  )
}

// ─── STILE DI VITA ────────────────────────────────────────────────────────────
function StileVita({profilo}){
  const[dati,setDati]=useState(null)
  const[saving,setSaving]=useState(false)
  const[momento,setMomento]=useState('mattina')
  const[editingId,setEditingId]=useState(null)
  const[aggiungendo,setAggiungendo]=useState(false)
  const[editNoteIdx,setEditNoteIdx]=useState(null)
  const[editNoteVal,setEditNoteVal]=useState('')
  const[aggiungendoNota,setAggiungendoNota]=useState(false)
  const[nuovaNota,setNuovaNota]=useState('')

  useEffect(()=>{
    setDati(null)
    ;(async()=>{try{const s=await getDoc(doc(db,'biolife_stile_vita',profilo));if(s.exists())setDati(s.data());else{const d=defaultStileVita[profilo]||{routine:{mattina:[],pomeriggio:[],sera:[]},note_generali:[]};setDati(d);await setDoc(doc(db,'biolife_stile_vita',profilo),d)}}catch{setDati(defaultStileVita[profilo]||{routine:{mattina:[],pomeriggio:[],sera:[]},note_generali:[]})}})()
  },[profilo])

  const persist=async n=>{setSaving(true);setDati(n);try{await setDoc(doc(db,'biolife_stile_vita',profilo),n)}catch(e){console.error(e)};setSaving(false)}
  const sez=dati?.routine?.[momento]||[]

  const saveEdit=async f=>{await persist({...dati,routine:{...dati.routine,[momento]:sez.map(r=>r.id===editingId?{...r,...f}:r)}});setEditingId(null)}
  const elimina=async id=>{if(!confirm('Eliminare?'))return;await persist({...dati,routine:{...dati.routine,[momento]:sez.filter(r=>r.id!==id)}})}
  const aggiungi=async f=>{if(!f.attivita?.trim())return;await persist({...dati,routine:{...dati.routine,[momento]:[...sez,{...f,id:'sv_'+Date.now()}]}});setAggiungendo(false)}
  const move=async(id,dir)=>{
    const arr=[...sez];const i=arr.findIndex(r=>r.id===id);const j=i+dir
    if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];await persist({...dati,routine:{...dati.routine,[momento]:arr}})
  }
  const saveNota=async(idx,val)=>{const n=[...(dati.note_generali||[])];n[idx]=val;await persist({...dati,note_generali:n});setEditNoteIdx(null)}
  const eliminaNota=async idx=>{if(!confirm('Eliminare?'))return;await persist({...dati,note_generali:(dati.note_generali||[]).filter((_,i)=>i!==idx)})}
  const aggiungiNota=async()=>{if(!nuovaNota.trim())return;await persist({...dati,note_generali:[...(dati.note_generali||[]),nuovaNota]});setAggiungendoNota(false);setNuovaNota('')}
  const resetDef=async()=>{if(!confirm('Ripristinare routine di default?'))return;await persist(defaultStileVita[profilo]||{routine:{mattina:[],pomeriggio:[],sera:[]},note_generali:[]})}

  if(!dati)return<div className="text-muted">Caricamento…</div>
  const momenti=[{id:'mattina',label:'🌅 Mattina'},{id:'pomeriggio',label:'☀️ Pomeriggio'},{id:'sera',label:'🌙 Sera'}]

  return(
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-title" style={{marginBottom:0}}>Routine Giornaliera</div>
        <div className="flex gap-4">{saving&&<span className="text-xs text-muted">Salv…</span>}<button className="reset-btn" onClick={resetDef}>🔄</button></div>
      </div>
      <div className="text-muted text-sm mb-16">Usa ↑↓ per riordinare le voci</div>
      <div className="day-tabs mb-16">{momenti.map(m=><button key={m.id} className={`day-tab ${momento===m.id?'active':''}`} style={momento===m.id?{background:'#7c6af7',borderColor:'#7c6af7'}:{}} onClick={()=>{setMomento(m.id);setEditingId(null);setAggiungendo(false)}}>{m.label}</button>)}</div>
      {sez.length===0&&!aggiungendo&&<div className="empty-state"><div className="text-muted text-sm">Nessuna voce — ➕ per aggiungere</div></div>}
      {sez.map((item,i)=>(
        <div key={item.id}>
          {editingId===item.id
            ?<FormVoce initialForm={item} onSave={saveEdit} onCancel={()=>setEditingId(null)} lbl="Salva"/>
            :<div className="list-item">
              <div className="flex gap-4" style={{flexShrink:0,flexDirection:'column'}}>
                <button className="move-btn" onClick={()=>move(item.id,-1)} disabled={i===0} style={{opacity:i===0?.3:1}}>↑</button>
                <button className="move-btn" onClick={()=>move(item.id,1)} disabled={i===sez.length-1} style={{opacity:i===sez.length-1?.3:1}}>↓</button>
              </div>
              {item.orario&&<div className="routine-time">{item.orario}</div>}
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500}}>{item.attivita}</div>
                {item.note&&<div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{item.note}</div>}
              </div>
              <div className="flex gap-4" style={{flexShrink:0,marginLeft:4}}>
                <button className="edit-btn" onClick={()=>setEditingId(item.id)}>✏️</button>
                <button className="del-btn" onClick={()=>elimina(item.id)}>🗑</button>
              </div>
            </div>}
        </div>
      ))}
      {aggiungendo?<FormVoce initialForm={{id:'',orario:'',attivita:'',note:''}} onSave={aggiungi} onCancel={()=>setAggiungendo(false)} lbl="➕ Aggiungi"/>
      :<button className="add-btn" onClick={()=>setAggiungendo(true)}>➕ Aggiungi voce</button>}
      <hr className="sep"/>
      <div className="section-title mt-8">📌 Note Generali</div>
      {(dati.note_generali||[]).map((nota,idx)=>(
        <div key={idx} className="note-item" style={{marginBottom:6}}>
          {editNoteIdx===idx
            ?<div style={{flex:1}}><input type="text" defaultValue={nota} onChange={e=>setEditNoteVal(e.target.value)} onFocus={e=>setEditNoteVal(e.target.value)} autoFocus style={{marginBottom:6}}/><div className="flex gap-4" style={{marginTop:8}}><button className="cancel-btn" onClick={()=>setEditNoteIdx(null)}>Annulla</button><button className="save-btn" onClick={()=>saveNota(idx,editNoteVal)}>Salva</button></div></div>
            :<><span style={{flex:1}}>{nota}</span><div className="flex gap-4" style={{flexShrink:0,marginLeft:8}}><button className="edit-btn" onClick={()=>{setEditNoteIdx(idx);setEditNoteVal(nota)}}>✏️</button><button className="del-btn" onClick={()=>eliminaNota(idx)}>🗑</button></div></>}
        </div>
      ))}
      {aggiungendoNota?<div className="form-box" style={{marginTop:8}}><div className="label mb-4">Nuova nota</div><input type="text" value={nuovaNota} onChange={e=>setNuovaNota(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')aggiungiNota()}} autoFocus style={{marginBottom:8}}/><div className="flex gap-4" style={{marginTop:8}}><button className="cancel-btn" onClick={()=>{setAggiungendoNota(false);setNuovaNota('')}}>Annulla</button><button className="save-btn" onClick={aggiungiNota}>➕ Aggiungi</button></div></div>
      :<button className="add-btn" style={{marginTop:8}} onClick={()=>setAggiungendoNota(true)}>➕ Aggiungi nota</button>}
    </div>
  )
}

// ─── INTEGRATORI ──────────────────────────────────────────────────────────────
function Integratori({profilo}){
  const[lista,setLista]=useState(null)
  const[editingId,setEditingId]=useState(null)
  const[aggiungendo,setAggiungendo]=useState(false)
  const[saving,setSaving]=useState(false)
  const iv=()=>({id:'int_'+Date.now(),periodo:"Tutto l'anno",timing:'',nome:'',dosaggio:'',beneficio:'',note:'',colore:'#7c6af7'})

  useEffect(()=>{(async()=>{try{const s=await getDoc(doc(db,'biolife_integratori',profilo));if(s.exists())setLista(s.data().items||[]);else{const d=profilo==='damiano'?integratoriDamiano:[];setLista(d);await setDoc(doc(db,'biolife_integratori',profilo),{items:d})}}catch{setLista(profilo==='damiano'?integratoriDamiano:[])}})()},[profilo])

  const persist=async n=>{setSaving(true);setLista(n);try{await setDoc(doc(db,'biolife_integratori',profilo),{items:n})}catch(e){console.error(e)};setSaving(false)}
  const saveEdit=async f=>{await persist(lista.map(i=>i.id===editingId?{...i,...f}:i));setEditingId(null)}
  const elimina=async id=>{if(!confirm('Eliminare?'))return;await persist(lista.filter(i=>i.id!==id))}
  const aggiungi=async f=>{if(!f.nome?.trim())return;await persist([...lista,{...f,id:'int_'+Date.now()}]);setAggiungendo(false)}

  if(!lista)return<div className="text-muted">Caricamento…</div>
  const periodi=[...new Set(lista.map(i=>i.periodo).filter(Boolean))]

  return(
    <div>
      <div className="flex items-center justify-between mb-4"><div className="section-title" style={{marginBottom:0}}>💊 Integratori</div>{saving&&<span className="text-xs text-muted">Salv…</span>}</div>
      <div className="text-muted text-sm mb-16">Modificabile · Aggiornare con il medico</div>
      {lista.length===0&&!aggiungendo&&<div className="empty-state"><div style={{fontSize:40,marginBottom:12}}>💊</div><div className="text-muted text-sm">Nessun integratore</div></div>}
      {periodi.map(periodo=>(
        <div key={periodo} className="mb-16">
          <div style={{fontFamily:'Space Grotesk',fontWeight:600,fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:10,paddingLeft:4}}>{periodo}</div>
          {lista.filter(i=>i.periodo===periodo).map(item=>(
            <div key={item.id}>
              {editingId===item.id?<FormIntegratore initialForm={item} onSave={saveEdit} onCancel={()=>setEditingId(null)} lbl="Salva"/>
              :<div className="integr-card" style={{borderLeftColor:item.colore}}>
                <div className="flex items-center justify-between mb-4"><div style={{fontWeight:600,fontSize:14,flex:1,paddingRight:8}}>{item.nome}</div><div className="flex gap-4"><div className="chip">{item.timing}</div><button className="edit-btn" onClick={()=>setEditingId(item.id)}>✏️</button><button className="del-btn" onClick={()=>elimina(item.id)}>🗑</button></div></div>
                <div className="text-xs text-muted mb-4"><span style={{color:item.colore}}>●</span> {item.dosaggio}</div>
                <div className="text-sm" style={{marginBottom:item.note?6:0}}>{item.beneficio}</div>
                {item.note&&<div className="text-xs" style={{color:'#fbbf24',marginTop:4}}>{item.note}</div>}
              </div>}
            </div>
          ))}
        </div>
      ))}
      {aggiungendo?<FormIntegratore initialForm={iv()} onSave={aggiungi} onCancel={()=>setAggiungendo(false)} lbl="➕ Aggiungi"/>
      :<button className="add-btn" onClick={()=>setAggiungendo(true)}>➕ Aggiungi integratore</button>}
    </div>
  )
}

// ─── ACQUA TRACKER ───────────────────────────────────────────────────────────
const GOAL_ACQUA={damiano:8,ilaria:8,daniele:8,tommaso:8}
function AcquaTracker({profilo,profiloColore}){
  const oggi=new Date()
  const[offset,setOffset]=useState(0)
  const[bicchieri,setBicchieri]=useState(0)
  const[loaded,setLoaded]=useState(false)
  const[saving,setSaving]=useState(false)
  const dStr=(o=0)=>{const d=new Date(oggi);d.setDate(d.getDate()+o);return d.toISOString().split('T')[0]}
  const dLbl=(o)=>{if(o===0)return'Oggi';if(o===-1)return'Ieri';const d=new Date(oggi);d.setDate(d.getDate()+o);return d.toLocaleDateString('it-IT',{day:'numeric',month:'short'})}
  const fbKey=`${profilo}_${dStr(offset)}`

  useEffect(()=>{setLoaded(false);setBicchieri(0);(async()=>{try{const s=await getDoc(doc(db,'biolife_acqua',fbKey));setBicchieri(s.exists()?s.data().bicchieri||0:0)}catch{setBicchieri(0)};setLoaded(true)})()},[profilo,fbKey])

  const goal=GOAL_ACQUA[profilo]||8
  const toggle=async idx=>{const n=idx<bicchieri?idx:idx+1;setBicchieri(n);setSaving(true);try{await setDoc(doc(db,'biolife_acqua',fbKey),{bicchieri:n,data:dStr(offset),profilo})}catch(e){console.error(e)};setSaving(false)}
  const pct=Math.min(bicchieri/goal,1)
  const msg=()=>{if(!bicchieri)return'Inizia la tua idratazione! 💧';if(bicchieri<goal*.5)return'Buon inizio, continua! 🌊';if(bicchieri<goal)return`Quasi! Mancano ${goal-bicchieri} bicchieri 🎯`;return'Obiettivo raggiunto! 🏆'}

  return(
    <div>
      <div className="flex items-center justify-between mb-4"><div className="section-title" style={{marginBottom:0}}>💧 Tracker Acqua</div>{saving&&<span className="text-xs text-muted">Salv…</span>}</div>
      <div className="flex items-center justify-between mb-16" style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'10px 16px'}}>
        <button onClick={()=>setOffset(o=>o-1)} style={{background:'transparent',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:22,padding:'0 8px'}}>‹</button>
        <div style={{textAlign:'center'}}><div style={{fontFamily:'Space Grotesk',fontWeight:600,fontSize:15}}>{dLbl(offset)}</div><div style={{fontSize:11,color:'var(--muted)'}}>{dStr(offset)}</div></div>
        <button onClick={()=>setOffset(o=>Math.min(o+1,0))} style={{background:'transparent',border:'none',color:offset>=0?'var(--border2)':'var(--muted)',cursor:offset>=0?'default':'pointer',fontSize:22,padding:'0 8px'}} disabled={offset>=0}>›</button>
      </div>
      {loaded&&<>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
          {Array.from({length:goal}).map((_,i)=>{
            const p=i<bicchieri
            return(
              <div key={i} onClick={()=>toggle(i)} style={{cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                <div style={{position:'relative',width:46,height:58}}>
                  <div style={{position:'absolute',inset:0,border:`2px solid ${p?profiloColore:'var(--border2)'}`,borderRadius:'4px 4px 8px 8px',overflow:'hidden',background:'var(--surface)',transition:'border-color .3s'}}>
                    <div style={{position:'absolute',bottom:0,left:0,right:0,height:p?'100%':'0%',background:`linear-gradient(180deg,${profiloColore}88,${profiloColore}cc)`,transition:'height .4s cubic-bezier(.4,0,.2,1)',borderRadius:'0 0 6px 6px'}}/>
                    {p&&<div style={{position:'absolute',top:0,left:0,right:0,height:4,background:`${profiloColore}55`,borderRadius:'50% 50% 0 0'}}/>}
                  </div>
                  <div style={{position:'absolute',right:-8,top:'30%',width:8,height:'35%',border:`2px solid ${p?profiloColore:'var(--border2)'}`,borderLeft:'none',borderRadius:'0 4px 4px 0',transition:'border-color .3s'}}/>
                </div>
                <span style={{fontSize:10,color:p?profiloColore:'var(--muted)',fontWeight:p?600:400}}>{(i+1)*250}ml</span>
              </div>
            )
          })}
        </div>
        <div className="card mb-12">
          <div className="flex items-center justify-between mb-8">
            <span style={{fontFamily:'Space Grotesk',fontSize:28,fontWeight:700,color:profiloColore}}>{(bicchieri*250/1000).toFixed(2)}L</span>
            <span style={{fontSize:13,color:'var(--muted)'}}>di {goal*250/1000}L · {bicchieri}/{goal}</span>
          </div>
          <div style={{background:'var(--border)',borderRadius:6,height:8,overflow:'hidden',marginBottom:10}}><div style={{height:'100%',width:`${pct*100}%`,background:`linear-gradient(90deg,${profiloColore}88,${profiloColore})`,borderRadius:6,transition:'width .4s ease'}}/></div>
          <div style={{fontSize:13,color:bicchieri>=goal?profiloColore:'var(--muted)'}}>{msg()}</div>
        </div>
        {bicchieri>0&&<button onClick={()=>toggle(-1)} style={{background:'transparent',border:'1px solid var(--border)',borderRadius:8,color:'var(--muted)',cursor:'pointer',fontSize:12,padding:'6px 14px',width:'100%'}}>🔄 Azzera giornata</button>}
      </>}
      {!loaded&&<div className="text-muted text-sm">Caricamento…</div>}
    </div>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App(){
  const[profiloId,setProfiloId]=useState('damiano')
  const[tabIdx,setTabIdx]=useState(0)
  const profilo=PROFILI.find(p=>p.id===profiloId)
  return(
    <><style>{css}</style>
    <div className="app">
      <div className="header">
        <div className="logo">BioLife <span className="logo-sub">Famiglia Iovenitti</span></div>
        <div className="profiles-row">{PROFILI.map(p=><button key={p.id} className={`profile-btn ${profiloId===p.id?'active':''}`} style={profiloId===p.id?{background:p.colore+'22',borderColor:p.colore,color:p.colore}:{}} onClick={()=>setProfiloId(p.id)}><span style={{fontSize:16}}>{p.emoji}</span><span>{p.nome}</span><span className="text-xs" style={{opacity:.6}}>{p.eta}a</span></button>)}</div>
        <div className="tabs-row">{TABS.map((t,i)=><button key={t} className={`tab-btn ${tabIdx===i?'active':''}`} style={tabIdx===i?{color:profilo?.colore,borderBottomColor:profilo?.colore}:{}} onClick={()=>setTabIdx(i)}>{t}</button>)}</div>
      </div>
      <div className="content">
        {tabIdx===0&&<MealPlan profilo={profiloId} profiloColore={profilo?.colore}/>}
        {tabIdx===1&&<ProfiloGenetico profilo={profiloId}/>}
        {tabIdx===2&&<Allenamento profilo={profiloId} profiloColore={profilo?.colore}/>}
        {tabIdx===3&&<StileVita profilo={profiloId}/>}
        {tabIdx===4&&<Integratori profilo={profiloId}/>}
        {tabIdx===5&&<AcquaTracker profilo={profiloId} profiloColore={profilo?.colore}/>}
      </div>
    </div></>
  )
}
