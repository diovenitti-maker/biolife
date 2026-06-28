import { useState, useEffect } from 'react'
import { db } from './firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defaultAlimentazione, GIORNI, PASTI } from './data/alimentazione.js'
import { defaultStileVita } from './data/stileVita.js'
import { profiliGenetici } from './data/profiliGenetici.js'
import { integratoriDamiano } from './data/integratori.js'
import { defaultAllenamenti, TIPI_ALLENAMENTO, GIORNI_SETTIMANA } from './data/allenamenti.js'

const PROFILI = [
  { id: 'damiano', nome: 'Damiano', eta: 37, emoji: '👨', colore: '#7c6af7' },
  { id: 'ilaria',  nome: 'Ilaria',  eta: 34, emoji: '👩', colore: '#ff6b9d' },
  { id: 'daniele', nome: 'Daniele', eta: 7,  emoji: '👦', colore: '#4ecdc4' },
  { id: 'tommaso', nome: 'Tommaso', eta: 4,  emoji: '👶', colore: '#ffa94d' },
]

const TABS = ['🥗 Alimentazione','🧬 Profilo Genetico','🏃 Allenamento','🌿 Stile di Vita','💊 Integratori']

const css = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#07070f;--surface:#0f0f1a;--card:#151523;--card2:#1c1c2e;
    --border:#252538;--border2:#2e2e48;--text:#e8e8f4;--muted:#7878a0;--muted2:#5a5a80;
    --green:#4ade80;--yellow:#fbbf24;--red:#f87171;--radius:14px;--radius-sm:8px;
    --shadow:0 4px 24px rgba(0,0,0,0.4)
  }
  body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;min-height:100vh}
  .app{max-width:900px;margin:0 auto;padding:0 0 80px}
  .header{background:linear-gradient(135deg,#0f0f1a 0%,#141428 100%);border-bottom:1px solid var(--border);padding:20px 20px 0;position:sticky;top:0;z-index:100;backdrop-filter:blur(12px)}
  .logo{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;background:linear-gradient(135deg,#7c6af7,#4ecdc4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
  .logo-sub{font-size:12px;color:var(--muted);font-weight:400;-webkit-text-fill-color:var(--muted)}
  .profiles-row{display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none;margin-top:16px}
  .profiles-row::-webkit-scrollbar{display:none}
  .profile-btn{display:flex;align-items:center;gap:7px;padding:8px 14px;border-radius:40px;border:2px solid transparent;cursor:pointer;background:var(--card);color:var(--muted);font-size:13px;font-weight:500;white-space:nowrap;transition:all .2s}
  .profile-btn:hover{border-color:var(--border2);color:var(--text)}
  .profile-btn.active{color:#fff;font-weight:600}
  .tabs-row{display:flex;gap:2px;margin:0 -20px;overflow-x:auto;scrollbar-width:none}
  .tabs-row::-webkit-scrollbar{display:none}
  .tab-btn{padding:10px 16px;font-size:13px;font-weight:500;background:transparent;border:none;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .2s}
  .tab-btn:hover{color:var(--text)}
  .tab-btn.active{color:var(--text);border-bottom-color:currentColor}
  .content{padding:20px}
  .section-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;margin-bottom:16px;display:flex;align-items:center;gap:8px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-bottom:12px}
  .card2{background:var(--card2);border:1px solid var(--border2);border-radius:var(--radius-sm);padding:12px;margin-bottom:8px}
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
  .badge-red{background:rgba(248,113,113,.15);color:#f87171}
  .badge-yellow{background:rgba(251,191,36,.15);color:#fbbf24}
  .badge-green{background:rgba(74,222,128,.15);color:#4ade80}
  .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:var(--muted)}
  .text-muted{color:var(--muted);font-size:13px}
  .text-sm{font-size:13px}
  .text-xs{font-size:11px}
  .mb-4{margin-bottom:4px}.mb-8{margin-bottom:8px}.mb-12{margin-bottom:12px}.mb-16{margin-bottom:16px}
  .mt-8{margin-top:8px}.mt-16{margin-top:16px}
  .flex{display:flex}.flex-col{flex-direction:column}.gap-4{gap:4px}.gap-8{gap:8px}.gap-12{gap:12px}
  .items-center{align-items:center}.justify-between{justify-content:space-between}.w-full{width:100%}
  .plan-toggle{display:flex;gap:4px;background:var(--surface);border-radius:10px;padding:4px;margin-bottom:20px;border:1px solid var(--border)}
  .plan-toggle-btn{flex:1;padding:8px 12px;border-radius:7px;border:none;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--muted)}
  .plan-toggle-btn.active{background:var(--card);color:var(--text);box-shadow:0 2px 8px rgba(0,0,0,.3)}
  .day-tabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;margin-bottom:16px}
  .day-tabs::-webkit-scrollbar{display:none}
  .day-tab{padding:7px 12px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s}
  .day-tab:hover{border-color:var(--border2);color:var(--text)}
  .day-tab.active{color:#fff;border-color:transparent;font-weight:600}
  .meal-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:10px;overflow:hidden}
  .meal-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--border)}
  .meal-name{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--muted)}
  .meal-body{padding:12px 14px}
  .meal-text{font-size:14px;line-height:1.6;color:var(--text)}
  .edit-btn{background:transparent;border:1px solid var(--border);border-radius:6px;color:var(--muted);cursor:pointer;font-size:11px;padding:3px 8px;transition:all .2s}
  .edit-btn:hover{border-color:var(--border2);color:var(--text)}
  .save-btn{background:linear-gradient(135deg,#7c6af7,#4ecdc4);border:none;border-radius:6px;color:#fff;cursor:pointer;font-size:11px;padding:4px 10px;font-weight:600}
  .cancel-btn{background:transparent;border:1px solid var(--border);border-radius:6px;color:var(--muted);cursor:pointer;font-size:11px;padding:4px 8px}
  .del-btn{background:transparent;border:1px solid rgba(248,113,113,.3);border-radius:6px;color:#f87171;cursor:pointer;font-size:11px;padding:3px 8px;transition:all .2s}
  .del-btn:hover{background:rgba(248,113,113,.1)}
  textarea{width:100%;background:var(--surface);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;padding:10px 12px;resize:vertical;min-height:80px;outline:none;transition:border-color .2s}
  textarea:focus{border-color:#7c6af7}
  input[type="text"]{width:100%;background:var(--surface);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;padding:8px 12px;outline:none;transition:border-color .2s}
  input[type="text"]:focus{border-color:#7c6af7}
  select{width:100%;background:var(--surface);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;padding:8px 12px;outline:none}
  .risk-bar{background:var(--border);border-radius:4px;height:6px;overflow:hidden;width:120px;flex-shrink:0}
  .risk-fill{height:100%;border-radius:4px;transition:width .5s ease}
  .note-item{display:flex;gap:8px;padding:8px 12px;border-radius:var(--radius-sm);background:var(--surface);margin-bottom:6px;border:1px solid var(--border);font-size:13px;align-items:flex-start}
  .integr-card{background:var(--card);border-left:3px solid;border-radius:var(--radius);padding:14px;margin-bottom:10px}
  .chip{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:20px;font-size:11px;background:var(--card2);color:var(--muted);border:1px solid var(--border)}
  .routine-item{display:flex;gap:12px;padding:10px 14px;border-radius:var(--radius-sm);background:var(--card);margin-bottom:6px;border:1px solid var(--border);align-items:flex-start}
  .routine-time{font-size:11px;font-weight:600;color:var(--muted);min-width:40px;margin-top:2px;font-family:'Space Grotesk',sans-serif}
  .routine-attivita{font-size:13px;font-weight:500}
  .routine-note{font-size:11px;color:var(--muted);margin-top:2px}
  .add-btn{width:100%;padding:11px;background:var(--card);border:2px dashed var(--border2);border-radius:var(--radius);color:var(--muted);cursor:pointer;font-size:13px;font-weight:500;transition:all .2s;margin-bottom:8px}
  .add-btn:hover{border-color:#7c6af7;color:#7c6af7}
  .form-box{background:var(--card);border:1px solid var(--border2);border-radius:var(--radius);padding:16px;margin-bottom:12px}
  hr.sep{border:none;border-top:1px solid var(--border);margin:20px 0}
  .empty-state{text-align:center;padding:40px 20px;color:var(--muted)}
  @media(max-width:600px){.content{padding:14px}.header{padding:14px 14px 0}}
`

// ─── MEAL PLAN ───────────────────────────────────────────────────────────────
function MealPlan({ profilo, profiloColore }) {
  const [piano, setPiano] = useState('base')
  const [giorno, setGiorno] = useState('Lunedì')
  const [dati, setDati] = useState(null)
  const [editing, setEditing] = useState({})
  const [editValues, setEditValues] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, 'biolife_alimentazione', `${profilo}_${piano}`)
        const snap = await getDoc(ref)
        if (snap.exists()) setDati(snap.data())
        else {
          const def = defaultAlimentazione[profilo]?.[`piano_${piano}`] || {}
          setDati(def)
          await setDoc(ref, def)
        }
      } catch { setDati(defaultAlimentazione[profilo]?.[`piano_${piano}`] || {}) }
    }
    load()
  }, [profilo, piano])

  const startEdit = (pasto) => {
    setEditing(e => ({ ...e, [pasto]: true }))
    setEditValues(v => ({ ...v, [pasto]: dati?.[giorno]?.[pasto] || '' }))
  }
  const saveEdit = async (pasto) => {
    setSaving(true)
    const nuovi = { ...dati, [giorno]: { ...(dati?.[giorno] || {}), [pasto]: editValues[pasto] } }
    setDati(nuovi)
    setEditing(e => ({ ...e, [pasto]: false }))
    try { await setDoc(doc(db, 'biolife_alimentazione', `${profilo}_${piano}`), nuovi) } catch(e) { console.error(e) }
    setSaving(false)
  }

  const gs = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom']
  const giornoDati = dati?.[giorno] || {}

  return (
    <div>
      <div className="plan-toggle">
        <button className={`plan-toggle-btn ${piano==='base'?'active':''}`} onClick={()=>setPiano('base')}>📋 Piano Base</button>
        <button className={`plan-toggle-btn ${piano==='alternativo'?'active':''}`} onClick={()=>setPiano('alternativo')}>🔄 Piano Alternativo</button>
      </div>
      <div className="day-tabs">
        {GIORNI.map((g,i)=>(
          <button key={g} className={`day-tab ${giorno===g?'active':''}`}
            style={giorno===g?{background:profiloColore,borderColor:profiloColore}:{}}
            onClick={()=>setGiorno(g)}>{gs[i]}</button>
        ))}
      </div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="section-title" style={{marginBottom:4}}>{giorno}</div>
          <div className="text-muted text-sm">{piano==='base'?'Piano fisso settimanale':'Piano alternativo – suggerimenti personalizzati'}</div>
        </div>
        {saving && <span className="text-xs text-muted">Salvataggio…</span>}
      </div>
      {PASTI.map(pasto => {
        const testo = giornoDati[pasto] || ''
        const isEd = editing[pasto]
        return (
          <div key={pasto} className="meal-card">
            <div className="meal-header">
              <span className="meal-name">{pasto}</span>
              {isEd
                ? <div className="flex gap-4"><button className="cancel-btn" onClick={()=>setEditing(e=>({...e,[pasto]:false}))}>Annulla</button><button className="save-btn" onClick={()=>saveEdit(pasto)}>Salva</button></div>
                : <button className="edit-btn" onClick={()=>startEdit(pasto)}>✏️ Modifica</button>}
            </div>
            <div className="meal-body">
              {isEd
                ? <textarea value={editValues[pasto]||''} onChange={e=>setEditValues(v=>({...v,[pasto]:e.target.value}))} autoFocus />
                : <div className="meal-text">{testo?testo.split('•').map((t,i)=><span key={i}>{i>0&&<span style={{color:profiloColore,margin:'0 6px'}}>·</span>}{t.trim()}</span>):<span className="text-muted">—</span>}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── PROFILO GENETICO ─────────────────────────────────────────────────────────
function ProfiloGenetico({ profilo, profiloColore }) {
  const dati = profiliGenetici[profilo]
  const [patoAperta, setPatoAperta] = useState(null)
  if (!dati) return null

  const badge = (l) => l==='alto'?'badge-red':l==='attenzione'?'badge-yellow':'badge-green'
  const label = (l) => l==='alto'?'⚠️ Alto':l==='attenzione'?'⚡ Attenzione':'✅ Basso'
  const colR  = (p) => p>=25?'#f87171':p>=18?'#fbbf24':'#4ade80'

  return (
    <div>
      {dati.patologie?.length > 0 && (<>
        <div className="section-title">🏥 Patologie Accertate</div>
        <div className="mb-16">
          {dati.patologie.map((p,i)=>(
            <div key={i} style={{background:'var(--card)',border:`1px solid ${p.livello==='alto'?'rgba(248,113,113,.3)':'rgba(251,191,36,.25)'}`,borderRadius:'var(--radius)',marginBottom:10,overflow:'hidden'}}>
              <div className="flex items-center justify-between" style={{padding:'12px 14px',cursor:'pointer'}} onClick={()=>setPatoAperta(patoAperta===i?null:i)}>
                <div className="flex items-center gap-8">
                  <span style={{fontSize:20}}>{p.emoji}</span>
                  <span style={{fontWeight:600,fontSize:14}}>{p.nome}</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className={`badge ${p.livello==='alto'?'badge-red':'badge-yellow'}`}>{p.livello==='alto'?'🔴 Attenzione':'🟡 Monitorare'}</span>
                  <span style={{color:'var(--muted)',fontSize:12}}>{patoAperta===i?'▲':'▼'}</span>
                </div>
              </div>
              {patoAperta===i&&(
                <div style={{padding:'0 14px 14px',borderTop:'1px solid var(--border)'}}>
                  <div className="text-sm text-muted" style={{marginTop:10,marginBottom:10}}>{p.note}</div>
                  <div className="label mb-8">Consigli pratici</div>
                  {p.consigli.map((c,j)=><div key={j} className="note-item" style={{marginBottom:6}}>{c}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </>)}

      {dati.rischiPRS?.length > 0 && (<>
        <div className="section-title">🧬 Rischi Genetici (PRS)</div>
        <div className="card mb-16">
          {dati.rischiPRS.map((r,i)=>(
            <div key={i} className="flex items-center justify-between" style={{padding:'10px 0',borderBottom:i<dati.rischiPRS.length-1?'1px solid var(--border)':'none'}}>
              <div><div className="text-sm" style={{marginBottom:2}}>{r.area}</div><span className={`badge ${badge(r.livello)}`}>{label(r.livello)}</span></div>
              <div className="flex items-center gap-8">
                <div className="risk-bar"><div className="risk-fill" style={{width:`${Math.min(r.percentuale,100)}%`,background:colR(r.percentuale)}}/></div>
                <span className="text-sm" style={{color:colR(r.percentuale),fontFamily:'Space Grotesk',fontWeight:600,minWidth:42,textAlign:'right'}}>{r.percentuale.toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </>)}

      {dati.intolleranze?.length > 0 && (<>
        <div className="section-title">⚡ Intolleranze</div>
        <div className="mb-16">
          {dati.intolleranze.map((t,i)=>(
            <div key={i} className="card2 mb-8">
              <div className="flex items-center gap-8 mb-4">
                <span className="text-sm" style={{fontWeight:600}}>{t.nome}</span>
                <span className={`badge ${t.rischio==='alto'?'badge-red':'badge-yellow'}`}>{t.rischio==='alto'?'⚠️ Rischio':'⚡ Attenzione'}</span>
              </div>
              {t.nota&&<div className="text-xs text-muted">{t.nota}</div>}
            </div>
          ))}
        </div>
      </>)}

      {dati.carenze?.length > 0 && (<>
        <div className="section-title">💊 Carenze Predisposte</div>
        <div className="mb-16">
          {dati.carenze.map((c,i)=>(
            <div key={i} className="card2 mb-8">
              <div className="flex items-center gap-8 mb-4">
                <span className="text-sm" style={{fontWeight:600}}>{c.nutriente}</span>
                <span className={`badge ${c.rischio==='alto'?'badge-red':'badge-yellow'}`}>{c.rischio==='alto'?'🔴 Carenza':'🟡 Attenzione'}</span>
              </div>
              <div className="text-xs text-muted mb-4">Alimenti: {c.alimenti}</div>
              {c.nota&&<div className="text-xs" style={{color:'#fbbf24'}}>{c.nota}</div>}
            </div>
          ))}
        </div>
      </>)}

      <div className="section-title">📋 Note Cliniche</div>
      <div className="card">
        {dati.noteClinici.map((n,i)=><div key={i} className="note-item" style={{marginBottom:6}}>{n}</div>)}
      </div>
    </div>
  )
}

// ─── ALLENAMENTO ─────────────────────────────────────────────────────────────
function Allenamento({ profilo, profiloColore }) {
  const [dati, setDati] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [aggiungendo, setAggiungendo] = useState(false)
  const [nuovoForm, setNuovoForm] = useState({})
  const [giornoFiltro, setGiornoFiltro] = useState('Tutti')
  const [saving, setSaving] = useState(false)
  const [editingNote, setEditingNote] = useState(false)
  const [noteVal, setNoteVal] = useState('')

  const sessVuota = () => ({ id:'all_'+Date.now(), giorno:'Lunedì', tipo:'Altro', disciplina:'', orario:'', durata:'', intensita:'media', note:'' })

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db,'biolife_allenamenti',profilo)
        const snap = await getDoc(ref)
        if (snap.exists()) setDati(snap.data())
        else { const d=defaultAllenamenti[profilo]||{note:'',sessioni:[]}; setDati(d); await setDoc(ref,d) }
      } catch { setDati(defaultAllenamenti[profilo]||{note:'',sessioni:[]}) }
    }
    load()
  }, [profilo])

  const persist = async (nuovi) => { setSaving(true); setDati(nuovi); try { await setDoc(doc(db,'biolife_allenamenti',profilo),nuovi) } catch(e){console.error(e)} setSaving(false) }
  const saveEdit = async () => { await persist({...dati,sessioni:dati.sessioni.map(s=>s.id===editingId?{...editForm}:s)}); setEditingId(null) }
  const elimina = async (id) => { if(!confirm('Eliminare?'))return; await persist({...dati,sessioni:dati.sessioni.filter(s=>s.id!==id)}) }
  const aggiungi = async () => { if(!nuovoForm.disciplina?.trim())return; await persist({...dati,sessioni:[...dati.sessioni,{...nuovoForm,id:'all_'+Date.now()}]}); setAggiungendo(false); setNuovoForm(sessVuota()) }
  const saveNote = async () => { await persist({...dati,note:noteVal}); setEditingNote(false) }

  if(!dati) return <div className="text-muted">Caricamento…</div>

  const colI = (i) => i==='alta'?'#f87171':i==='media'?'#fbbf24':'#4ade80'
  const emoji = (t) => ({'Arti Marziali':'🥋','Corsa':'🏃','Cardio':'🚴','Corpo libero':'💪','Nuoto':'🏊','Atletica':'⚡','Outdoor':'🚵','Allungamento':'🧘','Yoga':'🧘','Recupero':'😴','Gioco libero':'🎮'}[t]||'🏋️')
  const gs2 = {Lunedì:'Lun',Martedì:'Mar',Mercoledì:'Mer',Giovedì:'Gio',Venerdì:'Ven',Sabato:'Sab',Domenica:'Dom'}
  const sessioni = giornoFiltro==='Tutti'?dati.sessioni:dati.sessioni.filter(s=>s.giorno===giornoFiltro)

  const FormSess = ({form,setForm,onSave,onCancel,lbl}) => (
    <div className="form-box">
      <div className="flex gap-8 mb-8" style={{flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:120}}>
          <div className="label mb-4">Giorno</div>
          <select value={form.giorno||'Lunedì'} onChange={e=>setForm(f=>({...f,giorno:e.target.value}))}>
            {GIORNI_SETTIMANA.map(g=><option key={g}>{g}</option>)}
          </select>
        </div>
        <div style={{flex:1,minWidth:120}}>
          <div className="label mb-4">Tipo</div>
          <select value={form.tipo||'Altro'} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}>
            {TIPI_ALLENAMENTO.map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div style={{flex:1,minWidth:100}}>
          <div className="label mb-4">Intensità</div>
          <select value={form.intensita||'media'} onChange={e=>setForm(f=>({...f,intensita:e.target.value}))}>
            <option value="bassa">🟢 Bassa</option><option value="media">🟡 Media</option><option value="alta">🔴 Alta</option>
          </select>
        </div>
      </div>
      <div className="flex gap-8 mb-8" style={{flexWrap:'wrap'}}>
        <div style={{flex:2,minWidth:160}}><div className="label mb-4">Disciplina *</div><input type="text" value={form.disciplina||''} onChange={e=>setForm(f=>({...f,disciplina:e.target.value}))} placeholder="es. Wing Chun" autoFocus /></div>
        <div style={{flex:1,minWidth:90}}><div className="label mb-4">Orario</div><input type="text" value={form.orario||''} onChange={e=>setForm(f=>({...f,orario:e.target.value}))} placeholder="es. 17:00" /></div>
        <div style={{flex:1,minWidth:90}}><div className="label mb-4">Durata</div><input type="text" value={form.durata||''} onChange={e=>setForm(f=>({...f,durata:e.target.value}))} placeholder="es. 60 min" /></div>
      </div>
      <div className="mb-12"><div className="label mb-4">Note</div><input type="text" value={form.note||''} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Dettagli aggiuntivi…" /></div>
      <div className="flex gap-8"><button className="cancel-btn" onClick={onCancel}>Annulla</button><button className="save-btn" onClick={onSave}>{lbl}</button></div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-title" style={{marginBottom:0}}>Piano Allenamento</div>
        {saving&&<span className="text-xs text-muted">Salvataggio…</span>}
      </div>
      <div className="card mb-16">
        <div className="flex items-center justify-between mb-4">
          <span className="label">Note generali</span>
          {editingNote
            ? <div className="flex gap-4"><button className="cancel-btn" onClick={()=>setEditingNote(false)}>Annulla</button><button className="save-btn" onClick={saveNote}>Salva</button></div>
            : <button className="edit-btn" onClick={()=>{setEditingNote(true);setNoteVal(dati.note||'')}}>✏️</button>}
        </div>
        {editingNote ? <textarea value={noteVal} onChange={e=>setNoteVal(e.target.value)} style={{minHeight:60}}/> : <div className="text-sm">{dati.note||'—'}</div>}
      </div>
      <div className="day-tabs mb-16">
        {['Tutti',...GIORNI_SETTIMANA].map(g=>(
          <button key={g} className={`day-tab ${giornoFiltro===g?'active':''}`}
            style={giornoFiltro===g?{background:profiloColore,borderColor:profiloColore}:{}}
            onClick={()=>setGiornoFiltro(g)}>{g==='Tutti'?'Tutti':gs2[g]}</button>
        ))}
      </div>
      {sessioni.map(s=>(
        <div key={s.id}>
          {editingId===s.id
            ? <FormSess form={editForm} setForm={setEditForm} onSave={saveEdit} onCancel={()=>setEditingId(null)} lbl="Salva" />
            : <div className="card mb-8" style={{borderLeft:`3px solid ${colI(s.intensita)}`}}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-8">
                    <span style={{fontSize:20}}>{emoji(s.tipo)}</span>
                    <div><div style={{fontWeight:600,fontSize:14}}>{s.disciplina}</div><div className="text-xs text-muted">{s.giorno} · {s.tipo}</div></div>
                  </div>
                  <div className="flex gap-4">
                    <button className="edit-btn" onClick={()=>{setEditingId(s.id);setEditForm({...s})}}>✏️</button>
                    <button className="del-btn" onClick={()=>elimina(s.id)}>🗑</button>
                  </div>
                </div>
                <div className="flex gap-8" style={{flexWrap:'wrap',marginBottom:s.note?8:0}}>
                  {s.orario&&s.orario!=='—'&&<div className="chip">🕐 {s.orario}</div>}
                  {s.durata&&s.durata!=='—'&&<div className="chip">⏱ {s.durata}</div>}
                  <div className="chip" style={{color:colI(s.intensita),borderColor:colI(s.intensita)+'44'}}>● {s.intensita}</div>
                </div>
                {s.note&&<div className="text-xs text-muted mt-8">{s.note}</div>}
              </div>}
        </div>
      ))}
      {aggiungendo
        ? <FormSess form={nuovoForm} setForm={setNuovoForm} onSave={aggiungi} onCancel={()=>{setAggiungendo(false);setNuovoForm(sessVuota())}} lbl="➕ Aggiungi" />
        : <button className="add-btn" onClick={()=>{setAggiungendo(true);setNuovoForm(sessVuota())}}>➕ Aggiungi sessione</button>}
    </div>
  )
}

// ─── STILE DI VITA ────────────────────────────────────────────────────────────
const voceVuota = () => ({ id:'sv_'+Date.now(), orario:'', attivita:'', note:'' })

function StileVita() {
  const [dati, setDati] = useState(null)
  const [saving, setSaving] = useState(false)
  const [momento, setMomento] = useState('mattina')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [aggiungendo, setAggiungendo] = useState(false)
  const [nuovaVoce, setNuovaVoce] = useState(voceVuota())
  const [editingNoteIdx, setEditingNoteIdx] = useState(null)
  const [editNoteVal, setEditNoteVal] = useState('')
  const [aggiungendoNota, setAggiungendoNota] = useState(false)
  const [nuovaNota, setNuovaNota] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db,'biolife_stile_vita','routine')
        const snap = await getDoc(ref)
        if (snap.exists()) setDati(snap.data())
        else { setDati(defaultStileVita); await setDoc(ref,defaultStileVita) }
      } catch { setDati(defaultStileVita) }
    }
    load()
  }, [])

  const persist = async (nuovi) => { setSaving(true); setDati(nuovi); try { await setDoc(doc(db,'biolife_stile_vita','routine'),nuovi) } catch(e){console.error(e)} setSaving(false) }

  const saveEdit = async () => { await persist({...dati,routine:{...dati.routine,[momento]:dati.routine[momento].map(r=>r.id===editingId?{...editForm}:r)}}); setEditingId(null) }
  const elimina = async (id) => { if(!confirm('Eliminare questa voce?'))return; await persist({...dati,routine:{...dati.routine,[momento]:dati.routine[momento].filter(r=>r.id!==id)}}) }
  const aggiungi = async () => { if(!nuovaVoce.attivita.trim())return; await persist({...dati,routine:{...dati.routine,[momento]:[...(dati.routine[momento]||[]),{...nuovaVoce,id:'sv_'+Date.now()}]}}); setAggiungendo(false); setNuovaVoce(voceVuota()) }
  const saveNota = async (idx,val) => { const n=[...(dati.note_generali||[])]; n[idx]=val; await persist({...dati,note_generali:n}); setEditingNoteIdx(null) }
  const eliminaNota = async (idx) => { if(!confirm('Eliminare nota?'))return; await persist({...dati,note_generali:(dati.note_generali||[]).filter((_,i)=>i!==idx)}) }
  const aggiungiNota = async () => { if(!nuovaNota.trim())return; await persist({...dati,note_generali:[...(dati.note_generali||[]),nuovaNota]}); setAggiungendoNota(false); setNuovaNota('') }

  if(!dati) return <div className="text-muted">Caricamento…</div>

  const momenti = [{id:'mattina',label:'🌅 Mattina'},{id:'pomeriggio',label:'☀️ Pomeriggio'},{id:'sera',label:'🌙 Sera'}]
  const sezione = dati.routine?.[momento] || []

  const FormVoce = ({form,setForm,onSave,onCancel,lbl}) => (
    <div className="form-box mb-8">
      <div className="flex gap-8 mb-8" style={{flexWrap:'wrap'}}>
        <div style={{minWidth:80}}><div className="label mb-4">Orario</div><input type="text" value={form.orario||''} onChange={e=>setForm(f=>({...f,orario:e.target.value}))} placeholder="07:10" style={{width:90}}/></div>
        <div style={{flex:1,minWidth:200}}><div className="label mb-4">Attività *</div><input type="text" value={form.attivita||''} onChange={e=>setForm(f=>({...f,attivita:e.target.value}))} placeholder="Descrivi l'attività" autoFocus /></div>
      </div>
      <div className="mb-12"><div className="label mb-4">Note</div><input type="text" value={form.note||''} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Dettagli aggiuntivi…" /></div>
      <div className="flex gap-8"><button className="cancel-btn" onClick={onCancel}>Annulla</button><button className="save-btn" onClick={onSave}>{lbl}</button></div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-title" style={{marginBottom:0}}>Routine Giornaliera</div>
        {saving&&<span className="text-xs text-muted">Salvataggio…</span>}
      </div>
      <div className="text-muted text-sm mb-16">Personalizzabile · Aggiungi, modifica o elimina le voci liberamente</div>
      <div className="day-tabs mb-16">
        {momenti.map(m=>(
          <button key={m.id} className={`day-tab ${momento===m.id?'active':''}`}
            style={momento===m.id?{background:'#7c6af7',borderColor:'#7c6af7'}:{}}
            onClick={()=>{setMomento(m.id);setEditingId(null);setAggiungendo(false)}}>{m.label}</button>
        ))}
      </div>
      {sezione.map(item=>(
        <div key={item.id}>
          {editingId===item.id
            ? <FormVoce form={editForm} setForm={setEditForm} onSave={saveEdit} onCancel={()=>setEditingId(null)} lbl="Salva" />
            : <div className="routine-item">
                {item.orario&&<div className="routine-time">{item.orario}</div>}
                <div style={{flex:1}}>
                  <div className="routine-attivita">{item.attivita}</div>
                  {item.note&&<div className="routine-note">{item.note}</div>}
                </div>
                <div className="flex gap-4" style={{flexShrink:0,marginLeft:8}}>
                  <button className="edit-btn" onClick={()=>{setEditingId(item.id);setEditForm({...item})}}>✏️</button>
                  <button className="del-btn" onClick={()=>elimina(item.id)}>🗑</button>
                </div>
              </div>}
        </div>
      ))}
      {aggiungendo
        ? <FormVoce form={nuovaVoce} setForm={setNuovaVoce} onSave={aggiungi} onCancel={()=>{setAggiungendo(false);setNuovaVoce(voceVuota())}} lbl="➕ Aggiungi" />
        : <button className="add-btn" onClick={()=>setAggiungendo(true)}>➕ Aggiungi voce</button>}

      <hr className="sep" />
      <div className="section-title mt-8">📌 Note & Regole Generali</div>
      {(dati.note_generali||[]).map((nota,idx)=>(
        <div key={idx} className="note-item" style={{marginBottom:6}}>
          {editingNoteIdx===idx
            ? <div style={{flex:1}}>
                <input type="text" value={editNoteVal} onChange={e=>setEditNoteVal(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')saveNota(idx,editNoteVal)}} autoFocus style={{marginBottom:6}}/>
                <div className="flex gap-4 mt-4"><button className="cancel-btn" onClick={()=>setEditingNoteIdx(null)}>Annulla</button><button className="save-btn" onClick={()=>saveNota(idx,editNoteVal)}>Salva</button></div>
              </div>
            : <><span style={{flex:1}}>{nota}</span><div className="flex gap-4" style={{flexShrink:0,marginLeft:8}}><button className="edit-btn" onClick={()=>{setEditingNoteIdx(idx);setEditNoteVal(nota)}}>✏️</button><button className="del-btn" onClick={()=>eliminaNota(idx)}>🗑</button></div></>}
        </div>
      ))}
      {aggiungendoNota
        ? <div className="form-box" style={{marginTop:8}}>
            <div className="label mb-4">Nuova nota</div>
            <input type="text" value={nuovaNota} onChange={e=>setNuovaNota(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')aggiungiNota()}} placeholder="Scrivi la nota…" autoFocus style={{marginBottom:8}}/>
            <div className="flex gap-8 mt-8"><button className="cancel-btn" onClick={()=>{setAggiungendoNota(false);setNuovaNota('')}}>Annulla</button><button className="save-btn" onClick={aggiungiNota}>➕ Aggiungi</button></div>
          </div>
        : <button className="add-btn" style={{marginTop:8}} onClick={()=>setAggiungendoNota(true)}>➕ Aggiungi nota</button>}
    </div>
  )
}

// ─── INTEGRATORI ─────────────────────────────────────────────────────────────
const COLORI_I = ['#7c6af7','#4ecdc4','#ffa94d','#51cf66','#ff6b6b','#60a5fa','#f9a8d4']
const intVuoto = () => ({ id:'int_'+Date.now(), periodo:"Tutto l'anno", timing:'', nome:'', dosaggio:'', beneficio:'', note:'', colore:'#7c6af7' })

function Integratori({ profilo }) {
  const [lista, setLista] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [aggiungendo, setAggiungendo] = useState(false)
  const [nuovoForm, setNuovoForm] = useState(intVuoto())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db,'biolife_integratori',profilo)
        const snap = await getDoc(ref)
        if (snap.exists()) setLista(snap.data().items||[])
        else { const d=profilo==='damiano'?integratoriDamiano:[]; setLista(d); await setDoc(ref,{items:d}) }
      } catch { setLista(profilo==='damiano'?integratoriDamiano:[]) }
    }
    load()
  }, [profilo])

  const persist = async (nuova) => { setSaving(true); setLista(nuova); try { await setDoc(doc(db,'biolife_integratori',profilo),{items:nuova}) } catch(e){console.error(e)} setSaving(false) }
  const saveEdit = async () => { await persist(lista.map(i=>i.id===editingId?{...editForm}:i)); setEditingId(null) }
  const elimina = async (id) => { if(!confirm('Eliminare?'))return; await persist(lista.filter(i=>i.id!==id)) }
  const aggiungi = async () => { if(!nuovoForm.nome?.trim())return; await persist([...lista,{...nuovoForm,id:'int_'+Date.now()}]); setAggiungendo(false); setNuovoForm(intVuoto()) }

  if(!lista) return <div className="text-muted">Caricamento…</div>

  const periodi = [...new Set(lista.map(i=>i.periodo).filter(Boolean))]

  const FormInt = ({form,setForm,onSave,onCancel,lbl}) => (
    <div className="form-box mb-12">
      <div className="flex gap-8 mb-8" style={{flexWrap:'wrap'}}>
        <div style={{flex:2,minWidth:200}}><div className="label mb-4">Nome *</div><input type="text" value={form.nome||''} onChange={e=>setForm(f=>({...f,nome:e.target.value}))} placeholder="es. Vitamina D3 – Marca" autoFocus /></div>
        <div style={{flex:1,minWidth:140}}><div className="label mb-4">Periodo</div><input type="text" value={form.periodo||''} onChange={e=>setForm(f=>({...f,periodo:e.target.value}))} placeholder="es. Tutto l'anno" /></div>
      </div>
      <div className="flex gap-8 mb-8" style={{flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:140}}><div className="label mb-4">Timing</div><input type="text" value={form.timing||''} onChange={e=>setForm(f=>({...f,timing:e.target.value}))} placeholder="es. Dopo colazione" /></div>
        <div style={{flex:1,minWidth:140}}><div className="label mb-4">Dosaggio</div><input type="text" value={form.dosaggio||''} onChange={e=>setForm(f=>({...f,dosaggio:e.target.value}))} placeholder="es. 1 capsula" /></div>
      </div>
      <div className="mb-8"><div className="label mb-4">Beneficio</div><input type="text" value={form.beneficio||''} onChange={e=>setForm(f=>({...f,beneficio:e.target.value}))} placeholder="es. Antiossidante" /></div>
      <div className="mb-12"><div className="label mb-4">Note</div><input type="text" value={form.note||''} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="es. ⚠️ Importante per DNA" /></div>
      <div className="mb-12">
        <div className="label mb-8">Colore</div>
        <div className="flex gap-8">{COLORI_I.map(c=><div key={c} onClick={()=>setForm(f=>({...f,colore:c}))} style={{width:28,height:28,borderRadius:'50%',background:c,cursor:'pointer',border:form.colore===c?'3px solid white':'3px solid transparent',boxShadow:form.colore===c?`0 0 0 2px ${c}`:'none',transition:'all .2s'}}/>)}</div>
      </div>
      <div className="flex gap-8"><button className="cancel-btn" onClick={onCancel}>Annulla</button><button className="save-btn" onClick={onSave}>{lbl}</button></div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="section-title" style={{marginBottom:0}}>💊 Integratori</div>
        {saving&&<span className="text-xs text-muted">Salvataggio…</span>}
      </div>
      <div className="text-muted text-sm mb-16">Modificabile e ampliabile · Aggiornare con il medico</div>
      {lista.length===0&&!aggiungendo&&<div className="empty-state"><div style={{fontSize:40,marginBottom:12}}>💊</div><div className="text-muted text-sm">Nessun integratore inserito</div></div>}
      {periodi.map(periodo=>(
        <div key={periodo} className="mb-16">
          <div style={{fontFamily:'Space Grotesk',fontWeight:600,fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:10,paddingLeft:4}}>{periodo}</div>
          {lista.filter(i=>i.periodo===periodo).map(item=>(
            <div key={item.id}>
              {editingId===item.id
                ? <FormInt form={editForm} setForm={setEditForm} onSave={saveEdit} onCancel={()=>setEditingId(null)} lbl="Salva" />
                : <div className="integr-card" style={{borderLeftColor:item.colore}}>
                    <div className="flex items-center justify-between mb-4">
                      <div style={{fontWeight:600,fontSize:14,flex:1,paddingRight:8}}>{item.nome}</div>
                      <div className="flex gap-4">
                        <div className="chip">{item.timing}</div>
                        <button className="edit-btn" onClick={()=>{setEditingId(item.id);setEditForm({...item})}}>✏️</button>
                        <button className="del-btn" onClick={()=>elimina(item.id)}>🗑</button>
                      </div>
                    </div>
                    <div className="text-xs text-muted mb-4"><span style={{color:item.colore}}>●</span> {item.dosaggio}</div>
                    <div className="text-sm" style={{marginBottom:item.note?6:0}}>{item.beneficio}</div>
                    {item.note&&<div className="text-xs" style={{color:'#fbbf24',marginTop:4}}>{item.note}</div>}
                  </div>}
            </div>
          ))}
        </div>
      ))}
      {aggiungendo
        ? <FormInt form={nuovoForm} setForm={setNuovoForm} onSave={aggiungi} onCancel={()=>{setAggiungendo(false);setNuovoForm(intVuoto())}} lbl="➕ Aggiungi" />
        : <button className="add-btn" onClick={()=>setAggiungendo(true)}>➕ Aggiungi integratore</button>}
    </div>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [profiloId, setProfiloId] = useState('damiano')
  const [tabIdx, setTabIdx] = useState(0)
  const profilo = PROFILI.find(p=>p.id===profiloId)

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="logo">BioLife <span className="logo-sub">Famiglia Iovenitti</span></div>
          <div className="profiles-row">
            {PROFILI.map(p=>(
              <button key={p.id} className={`profile-btn ${profiloId===p.id?'active':''}`}
                style={profiloId===p.id?{background:p.colore+'22',borderColor:p.colore,color:p.colore}:{}}
                onClick={()=>setProfiloId(p.id)}>
                <span style={{fontSize:16}}>{p.emoji}</span>
                <span>{p.nome}</span>
                <span className="text-xs" style={{opacity:.6}}>{p.eta}a</span>
              </button>
            ))}
          </div>
          <div className="tabs-row">
            {TABS.map((t,i)=>(
              <button key={t} className={`tab-btn ${tabIdx===i?'active':''}`}
                style={tabIdx===i?{color:profilo?.colore,borderBottomColor:profilo?.colore}:{}}
                onClick={()=>setTabIdx(i)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="content">
          {tabIdx===0 && <MealPlan profilo={profiloId} profiloColore={profilo?.colore} />}
          {tabIdx===1 && <ProfiloGenetico profilo={profiloId} profiloColore={profilo?.colore} />}
          {tabIdx===2 && <Allenamento profilo={profiloId} profiloColore={profilo?.colore} />}
          {tabIdx===3 && <StileVita />}
          {tabIdx===4 && <Integratori profilo={profiloId} />}
        </div>
      </div>
    </>
  )
}
