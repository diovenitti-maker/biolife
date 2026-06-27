export const profiliGenetici = {
  damiano: {
    nome: 'Damiano',
    eta: 37,
    patologie: [
      {
        nome: 'Ipercolesterolemia + placca aterosclerotica',
        livello: 'alto',
        emoji: '❤️',
        note: 'In terapia con statine. Priorità assoluta: omega-3, OPC Complex, ridurre grassi saturi.',
        consigli: ['Pesce azzurro 3-4x/settimana', 'Olio EVO a crudo, mai scaldato', 'Evitare carni rosse >1x/settimana', 'Avocado, noci, semi di lino quotidiani', 'OPC Complex + Vitamina E come da piano integratori']
      },
      {
        nome: 'Gonfiore addominale (aria)',
        livello: 'medio',
        emoji: '🫁',
        note: 'Possibile disbiosi intestinale o SIBO. Il digiuno serale (lun-gio) aiuta molto.',
        consigli: ['Mangiare lentamente e masticare bene', 'Evitare legumi crudi o poco cotti', 'Zenzero e finocchio nelle tisane serali', 'Probiotici ciclici come da piano', 'Kombucha e crauti per microbiota']
      },
      {
        nome: 'Allergie stagionali',
        livello: 'medio',
        emoji: '🌿',
        note: 'Predisposizione genetica confermata dal DNA. Protocollo marzo-fine confezioni.',
        consigli: ['Coenzima Q10 dopo colazione', 'Spirulina 4 capsule/die', 'Ortica in polvere prima di cena', 'Propoli nov-feb per immunità invernale', 'Occhiali anti-luce blu per ridurre irritazione oculare']
      },
    ],
    rischiPRS: [
      { area: 'Glicemia e Diabete', percentuale: 21.43, livello: 'attenzione' },
      { area: 'Sensibilità al Glutine', percentuale: 27.27, livello: 'attenzione' },
      { area: 'Colesterolo e Trigliceridi', percentuale: 13.05, livello: 'basso' },
      { area: 'Sovrappeso', percentuale: 11.44, livello: 'basso' },
      { area: 'Vitamina D', percentuale: 20.00, livello: 'attenzione' },
    ],
    intolleranze: [
      { nome: 'Sale', rischio: 'alto', nota: 'Sensibilità genetica → rischio ipertensione. Usare sale di Cervia in piccole dosi.' },
      { nome: 'Uova', rischio: 'attenzione', nota: 'Monitorare. Tuorlo crudo sempre, mai cotto.' },
    ],
    carenze: [
      { nutriente: 'Vitamina B6', rischio: 'alto', alimenti: 'Banane, avocado, carne, nocciole, legumi' },
      { nutriente: 'Vitamina B9 (Folati)', rischio: 'alto', alimenti: 'Avocado, verdure foglia verde, legumi', nota: '⚠️ Mutazione MTHFR – usare solo METILFOLATO (forma attiva)' },
      { nutriente: 'Vitamina K', rischio: 'alto', alimenti: 'Prezzemolo, spinaci, broccoli, asparagi' },
      { nutriente: 'Vitamina E', rischio: 'alto', alimenti: 'Olio EVO, mandorle, verdure foglia larga' },
      { nutriente: 'Zinco', rischio: 'alto', alimenti: 'Sardine, funghi, cacao, semi di zucca' },
      { nutriente: 'Fosforo (sovraccarico)', rischio: 'attenzione', alimenti: 'Evitare: cola, alimenti con additivi E338-E452' },
    ],
    noteClinici: [
      '⚠️ Mutazione MTHFR → NO acido folico sintetico, usare METILFOLATO',
      '⚠️ Ipercolesterolemia + placca → statine + OPC Complex + omega-3 prioritari',
      '⚠️ Dieta iperproteica sconsigliata (gene PPMK1)',
      '⛔ NO integratori BCAA o aminoacidi ramificati',
      '✅ Dieta ottimale: 40-45% grassi buoni, 40-45% carboidrati complessi, 15% proteine',
      '✅ Pesce azzurro fondamentale per omega-3',
      '✅ Raffreddare riso e patate prima di mangiare → amido resistente',
      '✅ Predisposizione sport Potenza + Resistenza',
    ],
    integratori: true,
  },

  ilaria: {
    nome: 'Ilaria',
    eta: 34,
    patologie: [
      {
        nome: 'Sensibilità Istamina / Nichel (probabile)',
        livello: 'medio',
        emoji: '🔬',
        note: 'Sintomo principale: screpolatura pelle sotto occhi e orecchie dopo ingestione di alimenti ricchi di istamina o nichel. Da confermare con test.',
        consigli: [
          'ISTAMINA — evitare: formaggi stagionati, salumi, tonno/sgombro in scatola, pomodori, spinaci, melanzane, avocado, alcol, aceti',
          'NICHEL — evitare: cioccolato, legumi, pomodori, cereali integrali, spinaci, cacao, frutta secca',
          'Preferire alimenti freschi e poco processati',
          'Vitamina C aiuta a ridurre l\'istamina (ma non da agrumi se sensibile)',
          'Tenere un diario alimentare per identificare i trigger'
        ]
      },
      {
        nome: 'Paratormone alterato / Rischio Osteopenia',
        livello: 'alto',
        emoji: '🦴',
        note: '6 anni di allattamento consecutivo con 2 figli hanno impoverito le riserve di calcio. Rischio osteopenia reale. Integrare SUBITO calcio e vitamina D.',
        consigli: [
          'Calcio da alimenti: latte capra/pecora, sardine con lisca, broccoli, mandorle',
          'Vitamina D3 in gocce quotidiana (anche estate)',
          'Vitamina K2 per veicolare calcio nelle ossa e non nelle arterie',
          'Magnesio per assorbimento calcio',
          'Esposizione solare quotidiana 15-20 min senza creme',
          'Esercizio fisico con carico (camminate, pesi leggeri) per stimolare densità ossea',
          '📋 Esame urgente: MOC/DEXA (densitometria ossea) + PTH + Calcio sierico + Vitamina D'
        ]
      },
    ],
    rischiPRS: [
      { area: 'Sovrappeso', percentuale: 21.45, livello: 'attenzione' },
      { area: 'Colesterolo e Trigliceridi', percentuale: 26.10, livello: 'attenzione' },
      { area: 'Glicemia e Diabete', percentuale: 14.29, livello: 'basso' },
      { area: 'Sensibilità al Glutine', percentuale: 18.18, livello: 'basso' },
      { area: 'Vitamina D', percentuale: 20.00, livello: 'attenzione' },
    ],
    intolleranze: [
      { nome: 'Proteine del latte vaccino', rischio: 'alto', nota: 'Preferire sempre latte/yogurt/formaggi di capra o pecora' },
      { nome: 'Sale', rischio: 'alto', nota: 'Sensibilità genetica → rischio ipertensione' },
      { nome: 'Istamina (probabile)', rischio: 'attenzione', nota: 'Screpolatura pelle sotto occhi/orecchie come sintomo guida' },
      { nome: 'Nichel (probabile)', rischio: 'attenzione', nota: 'Da confermare con test specifico' },
    ],
    carenze: [
      { nutriente: 'Vitamina D', rischio: 'alto', alimenti: 'Sgombro, tonno, salmone, formaggi capra/pecora', nota: '⚠️ Urgente per rischio osteopenia' },
      { nutriente: 'Calcio', rischio: 'alto', alimenti: 'Sardine con lisca, broccoli, mandorle, latte capra', nota: '⚠️ Depleto da 6 anni allattamento' },
      { nutriente: 'Vitamina K2', rischio: 'alto', alimenti: 'Natto, formaggi fermentati capra/pecora', nota: 'Fondamentale per direzionare calcio nelle ossa' },
      { nutriente: 'Vitamina A', rischio: 'alto', alimenti: 'Carote, zucca, mango, arancia, rucola' },
      { nutriente: 'Vitamina B6', rischio: 'alto', alimenti: 'Banane, avocado, carne, nocciole, legumi' },
      { nutriente: 'Magnesio', rischio: 'attenzione', alimenti: 'Mandorle, quinoa, miglio, fagioli, ceci, noci' },
    ],
    noteClinici: [
      '🦴 PRIORITÀ: integrare Calcio + Vit D3 + Vit K2 quotidianamente',
      '📋 Esami urgenti: MOC/DEXA + PTH + Calcio sierico + 25-OH Vitamina D',
      '⚠️ Sospetta sensibilità istamina/nichel → tenere diario alimentare',
      '⚠️ Sintomo guida: screpolatura pelle sotto occhi e orecchie dopo certi cibi',
      '✅ Preferire sempre latte/formaggi di capra o pecora (no vaccino)',
      '✅ Esposizione solare 15-20 min/die senza creme solari',
      '✅ Esercizio fisico con carico per stimolare densità ossea',
      '✅ Assumere vitamina D con grassi buoni per massimo assorbimento',
      '📋 Valutare: test istamina (DAO) + prick test nichel',
    ],
    integratori: false,
  },

  daniele: {
    nome: 'Daniele',
    eta: 7,
    patologie: [
      {
        nome: 'Allergia alle proteine del latte (seria)',
        livello: 'alto',
        emoji: '🥛',
        note: 'Allergia confermata e seria. NO latte vaccino, formaggi vaccini, burro, panna, yogurt vaccino in nessuna forma.',
        consigli: [
          '⛔ VIETATO: latte vaccino, formaggi vaccini, burro, panna, yogurt vaccino, caseina, siero di latte',
          '✅ Alternativa: latte di riso, avena, mandorla, cocco',
          '✅ Formaggi capra/pecora se tollerati (proteine diverse)',
          'Controllare etichette: caseina, lattosio, siero di latte negli ingredienti',
          'Attenzione a: biscotti, merendine, cioccolato al latte, prodotti da forno industriali',
          '📋 Portare sempre con sé piano di emergenza se allergia grave'
        ]
      },
      {
        nome: 'Gonfiore addominale (aria)',
        livello: 'medio',
        emoji: '🫁',
        note: 'Comune nei bambini con allergia al latte e sensibilità al glutine. Probabile disbiosi.',
        consigli: [
          'Limitare zuccheri semplici e succhi industriali',
          'Probiotici per bambini (concordare con pediatra)',
          'Masticare bene i cibi',
          'Evitare legumi in eccesso',
          'Acqua tiepida con limone a digiuno'
        ]
      },
      {
        nome: 'Allergie stagionali',
        livello: 'medio',
        emoji: '🌿',
        note: 'Come il papà. Supportare il sistema immunitario nel periodo primaverile.',
        consigli: [
          'Vitamina C naturale (kiwi, agrumi, fragole)',
          'Miele locale per desensibilizzazione (1 cucchiaino/die)',
          'Ridurre latticini nel periodo allergico (aumentano muco)',
          'Lavaggi nasali con soluzione fisiologica',
          '📋 Concordare eventuale terapia con il pediatra/allergologo'
        ]
      },
    ],
    rischiPRS: [
      { area: 'Glicemia e Diabete', percentuale: 28.58, livello: 'alto' },
      { area: 'Vitamina D', percentuale: 20.00, livello: 'attenzione' },
      { area: 'Sensibilità al Glutine', percentuale: 18.18, livello: 'attenzione' },
      { area: 'Colesterolo e Trigliceridi', percentuale: 10.88, livello: 'basso' },
      { area: 'Sovrappeso', percentuale: 11.44, livello: 'basso' },
    ],
    intolleranze: [
      { nome: 'Proteine del latte vaccino', rischio: 'alto', nota: '⚠️ ALLERGIA SERIA — nessuna forma di latte vaccino' },
      { nome: 'Sale', rischio: 'alto', nota: 'Sensibilità genetica confermata' },
      { nome: 'Fruttosio', rischio: 'attenzione', nota: 'Monitorare succhi e zuccheri aggiunti' },
    ],
    carenze: [
      { nutriente: 'Vitamina B6', rischio: 'alto', alimenti: 'Banane, avocado, carne, nocciole, legumi' },
      { nutriente: 'Vitamina B9 (Folati)', rischio: 'alto', alimenti: 'Avocado, verdure foglia verde, legumi', nota: 'Riduzione attività MTHFR' },
      { nutriente: 'Vitamina D', rischio: 'alto', alimenti: 'Sardine, salmone, uova, formaggi capra' },
      { nutriente: 'Vitamina K', rischio: 'alto', alimenti: 'Spinaci, broccoli, asparagi' },
      { nutriente: 'Vitamina E', rischio: 'alto', alimenti: 'Olio EVO, mandorle, verdure foglia larga' },
      { nutriente: 'Zinco', rischio: 'alto', alimenti: 'Sardine, funghi, cacao, semi di zucca' },
      { nutriente: 'Magnesio', rischio: 'alto', alimenti: 'Mandorle, quinoa, miglio, fagioli, noci' },
      { nutriente: 'Calcio', rischio: 'alto', alimenti: 'Sardine con lisca, broccoli, mandorle, latte vegetale arricchito', nota: 'Da integrare perché NO latte vaccino' },
    ],
    noteClinici: [
      '⛔ ALLERGIA SERIA al latte vaccino — vietato in qualsiasi forma',
      '⚠️ ALTA predisposizione glicemia (28.58%) → evitare picchi glicemici, succhi, zuccheri',
      '⚠️ Riduzione MTHFR – preferire folati in forma attiva',
      '✅ Calcio da fonti alternative: sardine, broccoli, latte vegetale arricchito',
      '✅ Combinare sempre carboidrati + proteine + fibre in ogni pasto',
      '✅ Esposizione solare quotidiana per vitamina D',
      '📋 Esami consigliati: Glicemia • Insulinemia • Emoglobina glicata • IgE latte',
      '📋 Consultare allergologo pediatrico per piano di emergenza',
    ],
    integratori: false,
  },

  tommaso: {
    nome: 'Tommaso',
    eta: 4,
    patologie: [
      {
        nome: 'Pelle secca',
        livello: 'medio',
        emoji: '🧴',
        note: 'Possibile predisposizione atopica, probabile carenza di acidi grassi essenziali e/o vitamina E.',
        consigli: [
          'Aumentare omega-3: salmone, sardine, semi di lino macinati',
          'Vitamina E da alimenti: olio EVO, mandorle, avocado',
          'Idratazione adeguata: almeno 1L acqua/die',
          'Evitare bagni/docce troppo caldi e lunghi',
          'Creme idratanti naturali (shea butter, olio di mandorle)',
          'Ridurre zuccheri raffinati che infiammano la pelle'
        ]
      },
      {
        nome: 'Problemi gastrici (se alimentazione scorretta)',
        livello: 'medio',
        emoji: '🤢',
        note: 'Stomaco sensibile. Reagisce male a cibi processati, zuccheri in eccesso, fritti.',
        consigli: [
          'Evitare cibi fritti, processati e troppo grassi',
          'Piccoli pasti frequenti piuttosto che pochi abbondanti',
          'Tisana camomilla e finocchio se dolori di stomaco',
          'Probiotici per bambini per rafforzare flora intestinale',
          'Ridurre succhi industriali e bevande gassate'
        ]
      },
      {
        nome: 'Gonfiore addominale (aria)',
        livello: 'medio',
        emoji: '🫁',
        note: 'Come fratello e papà. Tendenza familiare. Probabile sensibilità intestinale.',
        consigli: [
          'Masticare bene e lentamente',
          'Evitare legumi in eccesso o poco cotti',
          'Semi di finocchio in acqua calda dopo i pasti',
          'Limitare zuccheri e bevande gassate',
          'Movimento fisico quotidiano aiuta la motilità intestinale'
        ]
      },
    ],
    rischiPRS: [],
    intolleranze: [],
    carenze: [],
    noteClinici: [
      'ℹ️ Analisi genetiche non ancora effettuate per Tommaso',
      '🧴 Pelle secca → omega-3 + vitamina E + idratazione',
      '🤢 Stomaco sensibile → evitare cibi processati, fritti, zuccheri in eccesso',
      '🫁 Gonfiore addominale → masticare bene, finocchio, probiotici bambini',
      '✅ Seguire piano alimentare familiare equilibrato',
      '✅ Esposizione solare quotidiana per vitamina D',
      '✅ Preferire snack naturali: frutta, yogurt, frutta secca',
      '📋 Valutare analisi genetiche quando opportuno',
    ],
    integratori: false,
  }
}
