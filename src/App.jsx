import { useState, useEffect, useCallback, useRef } from "react";
import { fbGet, fbSet } from "./firebase.js";

const C = {
  bg:        "#0F1117",
  surface:   "#181C26",
  elevated:  "#1E2333",
  surfaceHi: "#232840",
  border:    "#2A2F42",
  borderSoft:"#1E2235",
  text:      "#F0F2FA",
  textSoft:  "#8890B0",
  textDim:   "#50567A",
  green:     "#4ADE80",
  greenDim:  "#0E2A1A",
  pink:      "#F472B6",
  pinkDim:   "#2A0E1D",
  gold:      "#FBBF24",
  goldDim:   "#2A1E04",
};

function fmt(n) {
  return (Number(n)||0).toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2});
}
function uid() { return Math.random().toString(36).slice(2,9); }

// ── STRUTTURA CON ID FISSI ────────────────────────────────────────────────────
// Gli ID sono fissi e hardcodati così i valori salvati nello storage
// corrispondono sempre alle voci giuste, anche dopo un reload.
const STRUCTURE = [
  { id:"cat20", name:"Conto deposito 1,50%", subcats:[
    { id:"s2001", name:"Altro", future:false, base:10 },
  ]},
  { id:"cat01", name:"Alimentari", subcats:[
    { id:"s0101", name:"Alimentari", future:false, base:500 },
  ]},
  { id:"cat02", name:"Animali domestici", subcats:[
    { id:"s0201", name:"Animali domestici", future:false, base:50 },
  ]},
  { id:"cat03", name:"Automobili", subcats:[
    { id:"s0301", name:"Assicurazioni",    future:true,  base:155   },
    { id:"s0302", name:"Bolli",            future:true,  base:50    },
    { id:"s0303", name:"Carburante",       future:false, base:180   },
    { id:"s0304", name:"Jeep club e FIF",  future:true,  base:6.25  },
    { id:"s0305", name:"Manutenzione",     future:true,  base:38    },
    { id:"s0306", name:"Parcheggio",       future:false, base:4     },
    { id:"s0307", name:"Pedaggio",         future:false, base:8     },
    { id:"s0308", name:"Revisioni",        future:true,  base:15    },
    { id:"s0309", name:"Varie",            future:false, base:30    },
  ]},
  { id:"cat04", name:"Casa", subcats:[
    { id:"s0401", name:"Assicurazione",      future:true,  base:73  },
    { id:"s0402", name:"Bollette acqua",     future:true,  base:35  },
    { id:"s0403", name:"Bollette corrente",  future:true,  base:90  },
    { id:"s0404", name:"Telefoni + internet",future:false, base:57  },
    { id:"s0405", name:"Giardinaggio",       future:false, base:15  },
    { id:"s0406", name:"Immondizia",         future:true,  base:13  },
    { id:"s0407", name:"Manutenzione",       future:false, base:15  },
    { id:"s0408", name:"Mobili / Accessori", future:false, base:30  },
    { id:"s0409", name:"Pulizia",            future:false, base:140 },
    { id:"s0410", name:"Varie",              future:false, base:30  },
  ]},
  { id:"cat05", name:"Casa Pedica", subcats:[
    { id:"s0501", name:"Casa Pedica", future:true, base:45 },
  ]},
  { id:"cat06", name:"Costi C/C", subcats:[
    { id:"s0601", name:"Costi C/C", future:false, base:10 },
  ]},
  { id:"cat07", name:"Cura Pers. / Beness.", subcats:[
    { id:"s0701", name:"Cura Pers. / Beness.", future:false, base:70 },
  ]},
  { id:"cat08", name:"Digitale e libri", subcats:[
    { id:"s0801", name:"Applicazioni", future:true,  base:14.99 },
    { id:"s0802", name:"Film",         future:false, base:5     },
    { id:"s0803", name:"Libri",        future:false, base:10    },
    { id:"s0804", name:"Varie",        future:false, base:5     },
  ]},
  { id:"cat09", name:"Divertimento", subcats:[
    { id:"s0901", name:"Intrattenimento", future:false, base:35  },
    { id:"s0902", name:"Sport e natura",  future:true,  base:180 },
  ]},
  { id:"cat10", name:"Figli", subcats:[
    { id:"s1001", name:"Figli", future:false, base:900 },
  ]},
  { id:"cat11", name:"Fondi D. e T.", subcats:[
    { id:"s1101", name:"Fondi anche Daniele e Tommaso", future:false, base:662.25 },
  ]},
  { id:"cat12", name:"Lavoro Damiano", subcats:[
    { id:"s1201", name:"Accantonamento", future:true, base:600 },
  ]},
  { id:"cat13", name:"Lavoro Ilaria (fisiot.) ed EMI", subcats:[
    { id:"s1301", name:"Accantonamento", future:true, base:600 },
  ]},
  { id:"cat14", name:"Lavoro Ilaria (viola)", subcats:[
    { id:"s1401", name:"Accantonamento", future:false, base:0 },
  ]},
  { id:"cat15", name:"Mangiare fuori", subcats:[
    { id:"s1501", name:"Mangiare fuori", future:false, base:80 },
  ]},
  { id:"cat16", name:"Regali", subcats:[
    { id:"s1601", name:"Regali", future:false, base:20 },
  ]},
  { id:"cat17", name:"Salute", subcats:[
    { id:"s1701", name:"Analisi e varie",  future:true,  base:50 },
    { id:"s1702", name:"Dentista",         future:true,  base:20 },
    { id:"s1703", name:"Dermatologo",      future:true,  base:15 },
    { id:"s1704", name:"Farmacia",         future:false, base:15 },
    { id:"s1705", name:"Ginecologa",       future:true,  base:7  },
    { id:"s1706", name:"Medico sportivo",  future:true,  base:15 },
    { id:"s1707", name:"Oculista",         future:true,  base:10 },
  ]},
  { id:"cat18", name:"Shopping", subcats:[
    { id:"s1801", name:"Shopping", future:true, base:50 },
  ]},
  { id:"cat19", name:"Viaggi", subcats:[
    { id:"s1901", name:"Viaggi", future:true, base:150 },
  ]},
];

const INCOME_LIST = [
  { id:"inc01", name:"Assegno Unico",               base:0       },
  { id:"inc02", name:"GSE",                         base:0       },
  { id:"inc03", name:"Bonus Nido",                  base:0       },
  { id:"inc04", name:"Affitto Pedica",              base:1300    },
  { id:"inc05", name:"Lavoro Ilaria fisioterapia",  base:1309.51 },
  { id:"inc06", name:"Lavoro Ilaria viola",         base:0       },
  { id:"inc07", name:"Lavoro Damiano",              base:3077    },
  { id:"inc08", name:"Utili NEVE",                  base:0       },
  { id:"inc09", name:"Utili IOVE",                  base:0       },
  { id:"inc10", name:"Rimborsi assicurazione",      base:0       },
  { id:"inc11", name:"Varie",                       base:0       },
];

// valori fissi iniziali (colonna verde)
const INIT_FIXED = {};
STRUCTURE.forEach(c => c.subcats.forEach(s => { if (s.base) INIT_FIXED[s.id] = s.base; }));

// valori entrate iniziali
const INIT_INCOME = {};
INCOME_LIST.forEach(i => { if (i.base) INIT_INCOME[i.id] = i.base; });

// ─── COMPONENTI ───────────────────────────────────────────────────────────────
function InlineEdit({ value, onChange, style }) {
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);

  // aggiorna il contenuto solo quando non si sta editando
  useEffect(() => {
    if (!editing && ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value, editing]);

  function handleFocus() {
    setEditing(true);
  }

  function handleBlur() {
    const newVal = ref.current?.textContent ?? "";
    setEditing(false);
    if (newVal !== value) onChange(newVal);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") { e.preventDefault(); ref.current?.blur(); }
  }

  const baseColor = style?.color ?? C.text;

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={{
        minWidth: 40,
        width: "100%",
        outline: "none",
        cursor: "text",
        wordBreak: "break-word",
        color: baseColor,
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        padding: "2px 0",
        ...style,
        color: baseColor, // forza sempre il colore finale
      }}
    />
  );
}

function AmountInput({ value, onChange, color, dimColor }) {
  const toStr = v => (v != null && v !== 0) ? String(v).replace(".",",") : "";
  const [local, setLocal] = useState(toStr(value));
  useEffect(() => setLocal(toStr(value)), [value]);

  function commit() {
    const current = Number(value) || 0;
    const raw = local.trim().replace(",",".");

    let final = 0;
    if (raw.startsWith("=")) {
      // formula stile Excel: =100+30, =valore*2, ecc.
      try {
        final = Function('"use strict"; return (' + raw.slice(1) + ')')();
        if (!isFinite(final)) final = current;
      } catch { final = current; }
    } else if (raw.startsWith("+") || raw.startsWith("-") || raw.startsWith("*") || raw.startsWith("/")) {
      // formula relativa: +30, -50 (applica al valore corrente)
      try {
        final = Function('"use strict"; return (' + current + raw + ')')();
        if (!isFinite(final)) final = current;
      } catch { final = current; }
    } else {
      final = parseFloat(raw);
      if (isNaN(final)) final = 0;
    }

    final = Math.round(final * 100) / 100;
    setLocal(final === 0 ? "" : String(final).replace(".",","));
    if (final !== current) onChange(final);
  }

  return (
    <div style={{ display:"flex", alignItems:"center", background:dimColor, borderRadius:7, padding:"5px 10px", minWidth:108 }}>
      <span style={{ color:C.textDim, fontSize:11, marginRight:3, fontFamily:"monospace" }}>€</span>
      <input
        value={local} placeholder="0,00" inputMode="text"
        onChange={e => setLocal(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key==="Enter") e.target.blur(); }}
        style={{
          background:"transparent", border:"none",
          color, WebkitTextFillColor:color,
          fontFamily:"monospace", fontSize:13, fontWeight:600,
          textAlign:"right", width:"100%", outline:"none",
        }}
      />
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded,    setLoaded]    = useState(false);
  const [structure, setStructure] = useState(STRUCTURE);
  const [incList,   setIncList]   = useState(INCOME_LIST);
  const [fixed,     setFixedData] = useState(INIT_FIXED);
  const [variable,  setVarData]   = useState({});
  const [incData,   setIncData]   = useState(INIT_INCOME);
  const [carry,     setCarryVal]  = useState(0);
  const [collapsed, setCollapsed] = useState({});
  const [tab,       setTab]       = useState("uscite");
  const [saving,    setSaving]    = useState(false);
  const timer = useRef(null);

  // ── carica dallo storage (sovrascrive i default solo se esistono dati salvati)
  useEffect(() => {
    async function load() {
      const [s, il, f, v, id, c, col] = await Promise.all([
        fbGet("structure"), fbGet("incList"), fbGet("fixed"),
        fbGet("variable"), fbGet("incData"), fbGet("carry"), fbGet("collapsed"),
      ]);
      if (s)   setStructure(JSON.parse(s));
      if (il)  setIncList(JSON.parse(il));
      if (f)   setFixedData(JSON.parse(f));
      if (v)   setVarData(JSON.parse(v));
      if (id)  setIncData(JSON.parse(id));
      if (c)   setCarryVal(Number(c) || 0);
      if (col) setCollapsed(JSON.parse(col));
      setLoaded(true);
    }
    load();
  }, []);

  function save(key, val) {
    setSaving(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      await fbSet(key, typeof val==="string" ? val : JSON.stringify(val));
      setSaving(false);
    }, 350);
  }

  const pStruct = useCallback(n => { setStructure(n); save("structure",n); },[]);
  const pInc    = useCallback(n => { setIncList(n);   save("incList",n);   },[]);
  const upFixed = (id,v) => { const n={...fixed,[id]:v};    setFixedData(n); save("fixed",n); };
  const upVar   = (id,v) => { const n={...variable,[id]:v}; setVarData(n);   save("variable",n);   };
  const upInc   = (id,v) => { const n={...incData,[id]:v};  setIncData(n);   save("incData",n);   };
  const upCarry = v      => { setCarryVal(v);                                  save("carry",String(v)); };
  const toggleC = id     => { const n={...collapsed,[id]:!collapsed[id]}; setCollapsed(n); save("collapsed",n); };

  // struttura ops
  const renameCat    = (id,name) => pStruct(structure.map(c=>c.id===id?{...c,name}:c));
  const deleteCat    = id        => pStruct(structure.filter(c=>c.id!==id));
  const addCat       = ()        => pStruct([...structure,{id:uid(),name:"Nuova categoria",subcats:[{id:uid(),name:"Nuova voce",future:false,base:0}]}]);
  const addSub       = cid       => pStruct(structure.map(c=>c.id===cid?{...c,subcats:[...c.subcats,{id:uid(),name:"Nuova voce",future:false,base:0}]}:c));
  const renameSub    = (cid,sid,name) => pStruct(structure.map(c=>c.id===cid?{...c,subcats:c.subcats.map(s=>s.id===sid?{...s,name}:s)}:c));
  const toggleFuture = (cid,sid) => pStruct(structure.map(c=>c.id===cid?{...c,subcats:c.subcats.map(s=>s.id===sid?{...s,future:!s.future}:s)}:c));
  const deleteSub    = (cid,sid) => pStruct(structure.map(c=>c.id===cid?{...c,subcats:c.subcats.filter(s=>s.id!==sid)}:c));
  const renameInc    = (id,name) => pInc(incList.map(i=>i.id===id?{...i,name}:i));
  const deleteInc    = id        => pInc(incList.filter(i=>i.id!==id));
  const addInc       = ()        => pInc([...incList,{id:uid(),name:"Nuova entrata",base:0}]);

  // totali
  let totFixed=0, totVar=0;
  structure.forEach(c=>c.subcats.forEach(s=>{ totFixed+=Number(fixed[s.id])||0; totVar+=Number(variable[s.id])||0; }));
  let totIncome=Number(carry)||0;
  incList.forEach(i=>{ totIncome+=Number(incData[i.id])||0; });
  const net = totIncome - totVar;

  if (!loaded) return (
    <div style={{background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:C.textSoft,fontFamily:"system-ui,sans-serif"}}>
      Apertura delle buste…
    </div>
  );

  return (
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"system-ui,-apple-system,sans-serif",color:C.text}}>

      {/* HEADER */}
      <div style={{padding:"24px 24px 18px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14}}>
          <div>
            <div style={{fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",color:C.textDim,marginBottom:5}}>Budget familiare condiviso</div>
            <h1 style={{margin:0,fontSize:24,fontWeight:300,color:C.text}}>Le <strong style={{color:C.green,fontWeight:700}}>buste</strong> di casa</h1>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {label:"Entrate",    val:totIncome, color:C.green},
              {label:"Uscite mese",val:totVar,    color:C.pink },
              {label:"Saldo",      val:net,       color:net>=0?C.green:C.pink},
            ].map(card=>(
              <div key={card.label} style={{background:C.elevated,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 16px",minWidth:120}}>
                <div style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:"0.08em"}}>{card.label}</div>
                <div style={{fontFamily:"monospace",fontSize:17,fontWeight:700,color:card.color,marginTop:4}}>€ {fmt(card.val)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:2,padding:"14px 24px 0",borderBottom:`1px solid ${C.border}`}}>
        {[["uscite","Buste di spesa"],["entrate","Entrate del mese"]].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)} style={{
            padding:"8px 20px",fontSize:13,fontWeight:tab===k?600:400,
            color:tab===k?C.text:C.textSoft,
            background:tab===k?C.elevated:"transparent",
            border:`1px solid ${tab===k?C.border:"transparent"}`,
            borderBottom:tab===k?`1px solid ${C.elevated}`:`1px solid ${C.border}`,
            borderRadius:"8px 8px 0 0",cursor:"pointer",marginBottom:-1,
          }}>{l}</button>
        ))}
      </div>

      {/* PANEL */}
      <div style={{background:C.elevated,margin:"0 24px 24px",border:`1px solid ${C.border}`,borderTop:"none",borderRadius:"0 8px 8px 8px",paddingBottom:20}}>

        {tab==="uscite" ? (
          <div>


            {structure.map(cat=>{
              const open = !collapsed[cat.id];
              let cF=0,cV=0;
              cat.subcats.forEach(s=>{cF+=Number(fixed[s.id])||0;cV+=Number(variable[s.id])||0;});
              return (
                <div key={cat.id} style={{borderBottom:`1px solid ${C.borderSoft}`}}>
                  {/* riga categoria */}
                  <div
                    onClick={()=>toggleC(cat.id)}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"11px 16px",cursor:"pointer",background:C.surface,userSelect:"none"}}
                  >
                    <span style={{color:C.textSoft,fontSize:10,flexShrink:0,display:"inline-block",transition:"transform .15s",transform:open?"rotate(90deg)":"rotate(0deg)"}}>▶</span>
                    <div onClick={e=>e.stopPropagation()} style={{flex:1,minWidth:0}}>
                      <InlineEdit
                        value={cat.name}
                        onChange={v=>renameCat(cat.id,v)}
                        style={{fontSize:14,fontWeight:700,color:"#FFFFFF",WebkitTextFillColor:"#FFFFFF"}}
                      />
                    </div>
                    <span style={{fontFamily:"monospace",fontSize:12,color:C.green,minWidth:75,textAlign:"right",flexShrink:0}}>€ {fmt(cF)}</span>
                    <span style={{fontFamily:"monospace",fontSize:12,color:C.pink, minWidth:75,textAlign:"right",flexShrink:0}}>€ {fmt(cV)}</span>
                    <button
                      onClick={e=>{e.stopPropagation();if(window.confirm(`Eliminare "${cat.name}"?`))deleteCat(cat.id);}}
                      style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:16,padding:"0 2px",lineHeight:1,flexShrink:0}}
                    >×</button>
                  </div>

                  {/* sottocategorie */}
                  {open && cat.subcats.map(sub=>(
                    <div key={sub.id} style={{
                      padding:"9px 16px 11px 20px",
                      background:sub.future?C.goldDim:"transparent",
                      borderLeft:sub.future?`3px solid ${C.gold}`:"3px solid transparent",
                      borderBottom:`1px solid ${C.borderSoft}`,
                    }}>
                      {/* riga 1: nome */}
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                        <span style={{color:C.gold,fontSize:12,flexShrink:0,minWidth:16,textAlign:"center"}}>{sub.future?"★":""}</span>
                        <InlineEdit
                          value={sub.name}
                          onChange={v=>renameSub(cat.id,sub.id,v)}
                          style={{fontSize:14,fontWeight:500,color:"#E8EAF0",flex:1}}
                        />
                        <button onClick={()=>toggleFuture(cat.id,sub.id)} style={{
                          fontSize:9,padding:"2px 8px",borderRadius:10,cursor:"pointer",flexShrink:0,
                          background:sub.future?C.gold:C.elevated,
                          color:sub.future?"#1a1200":C.textDim,
                          border:`1px solid ${sub.future?C.gold:C.border}`,
                          textTransform:"uppercase",letterSpacing:"0.05em",fontFamily:"system-ui",
                        }}>futuro</button>
                        <button onClick={()=>deleteSub(cat.id,sub.id)}
                          style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:16,padding:"0 2px",lineHeight:1,flexShrink:0}}>×</button>
                      </div>
                      {/* riga 2: caselle importo */}
                      <div style={{display:"flex",gap:8,paddingLeft:24}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:9,color:C.green,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>Fisso</div>
                          <AmountInput value={fixed[sub.id]}    onChange={v=>upFixed(sub.id,v)} color={C.green} dimColor={C.greenDim}/>
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:9,color:C.pink,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>Questo mese</div>
                          <AmountInput value={variable[sub.id]} onChange={v=>upVar(sub.id,v)}   color={C.pink}  dimColor={C.pinkDim}/>
                        </div>
                      </div>
                    </div>
                  ))}

                  {open && (
                    <button onClick={()=>addSub(cat.id)} style={{
                      margin:"4px 16px 10px 42px",background:"none",border:"none",
                      color:C.textDim,cursor:"pointer",fontSize:12,padding:"3px 8px",borderRadius:5,fontFamily:"system-ui",
                    }}>+ aggiungi voce</button>
                  )}
                </div>
              );
            })}

            <button onClick={addCat} style={{
              margin:"16px 16px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              width:"calc(100% - 32px)",padding:"10px",background:"none",
              border:`1.5px dashed ${C.border}`,color:C.textDim,cursor:"pointer",
              fontSize:13,borderRadius:8,fontFamily:"system-ui",
            }}>+ Nuova categoria</button>

            <div style={{display:"flex",justifyContent:"flex-end",gap:24,padding:"18px 16px 4px",marginTop:8,borderTop:`1px solid ${C.border}`}}>
              {[{l:"Totale fisso",v:totFixed,c:C.green},{l:"Totale mese",v:totVar,c:C.pink}].map(t=>(
                <div key={t.l} style={{textAlign:"right"}}>
                  <div style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:"0.08em"}}>{t.l}</div>
                  <div style={{fontFamily:"monospace",fontSize:17,fontWeight:700,color:t.c,marginTop:3}}>€ {fmt(t.v)}</div>
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* TAB ENTRATE */
          <div>
            {incList.map(inc=>(
              <div key={inc.id} style={{display:"grid",gridTemplateColumns:"1fr 130px 30px",alignItems:"center",gap:10,padding:"9px 16px",borderBottom:`1px solid ${C.borderSoft}`}}>
                <InlineEdit value={inc.name} onChange={v=>renameInc(inc.id,v)} style={{fontSize:13.5,color:"#E8EAF0",WebkitTextFillColor:"#E8EAF0"}}/>
                <AmountInput value={incData[inc.id]} onChange={v=>upInc(inc.id,v)} color={C.green} dimColor={C.greenDim}/>
                <button onClick={()=>deleteInc(inc.id)} style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:16,padding:0}}>×</button>
              </div>
            ))}

            <button onClick={addInc} style={{margin:"8px 16px 0",background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:12.5,padding:"4px 8px",fontFamily:"system-ui"}}>
              + aggiungi fonte di entrata
            </button>

            {/* totale parziale prima del riporto */}
            <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:16,padding:"10px 16px",marginTop:8,borderTop:`1px solid ${C.border}`}}>
              <span style={{fontSize:11,color:C.textDim,textTransform:"uppercase",letterSpacing:"0.08em"}}>Subtotale entrate</span>
              <span style={{fontFamily:"monospace",fontSize:15,fontWeight:600,color:C.green}}>€ {fmt(Object.values(incData).reduce((a,b)=>a+(Number(b)||0),0))}</span>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 130px 30px",alignItems:"center",gap:10,padding:"12px 16px",background:C.surface}}>
              <span style={{fontSize:13,color:C.textSoft,fontWeight:500}}>Avanzato dal mese precedente</span>
              <AmountInput value={carry} onChange={upCarry} color={C.green} dimColor={C.greenDim}/>
              <span/>
            </div>

            <div style={{display:"flex",justifyContent:"flex-end",padding:"18px 16px 4px",marginTop:8,borderTop:`1px solid ${C.border}`}}>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:"0.08em"}}>Totale entrate</div>
                <div style={{fontFamily:"monospace",fontSize:17,fontWeight:700,color:C.green,marginTop:3}}>€ {fmt(totIncome)}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:14,right:14,background:C.elevated,border:`1px solid ${C.border}`,color:C.textSoft,fontSize:11,padding:"4px 12px",borderRadius:20,opacity:saving?1:0,transition:"opacity 0.3s",pointerEvents:"none"}}>
        salvataggio…
      </div>
    </div>
  );
}
