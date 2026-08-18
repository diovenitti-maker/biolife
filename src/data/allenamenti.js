export const defaultAllenamenti = {
  damiano: {
    note: 'Allenamento bilanciato tra arti marziali, corsa e corpo libero. Crioterapia dopo ogni sessione intensa.',
    sessioni: [
      { id: 'a1', giorno: 'Lunedì',    tipo: 'Arti Marziali',  disciplina: 'Wing Chun',              orario: '13:00',  durata: '60 min', intensita: 'alta',   note: 'Pranzo prima • Respirazione a Quadrato pre-allenamento' },
      { id: 'a2', giorno: 'Lunedì',    tipo: 'Corpo libero',   disciplina: 'Fartlek + pesi',         orario: '07:10',  durata: '30 min', intensita: 'media',  note: 'Pre-colazione a digiuno' },
      { id: 'a3', giorno: 'Martedì',   tipo: 'Corsa',          disciplina: 'Corto veloce',           orario: 'Da definire', durata: 'Da definire', intensita: 'alta', note: 'Decidere al momento in base alle condizioni' },
      { id: 'a4', giorno: 'Martedì',   tipo: 'Corpo libero',   disciplina: 'Pesi / corpo libero',    orario: 'Pomeriggio', durata: '20 min', intensita: 'media', note: '' },
      { id: 'a5', giorno: 'Mercoledì', tipo: 'Corsa',          disciplina: 'Corsa lunga',            orario: 'Da definire', durata: 'Da definire', intensita: 'media', note: 'Ritmo costante • Decidere al momento' },
      { id: 'a6', giorno: 'Mercoledì', tipo: 'Corpo libero',   disciplina: 'Fartlek + pesi',         orario: '07:10',  durata: '30 min', intensita: 'media',  note: 'Pre-colazione a digiuno' },
      { id: 'a7', giorno: 'Giovedì',   tipo: 'Corsa',          disciplina: 'Corto veloce',           orario: 'Da definire', durata: 'Da definire', intensita: 'alta', note: 'Decidere al momento in base alle condizioni' },
      { id: 'a8', giorno: 'Giovedì',   tipo: 'Corpo libero',   disciplina: 'Pesi / corpo libero',    orario: 'Pomeriggio', durata: '20 min', intensita: 'media', note: '' },
      { id: 'a9', giorno: 'Venerdì',   tipo: 'Arti Marziali',  disciplina: 'Wing Chun',              orario: '13:00',  durata: '60 min', intensita: 'alta',   note: 'Pranzo prima • Respirazione a Quadrato pre-allenamento' },
      { id: 'a10', giorno: 'Venerdì',  tipo: 'Corpo libero',   disciplina: 'Fartlek + pesi',         orario: '07:10',  durata: '30 min', intensita: 'media',  note: 'Pre-colazione a digiuno' },
      { id: 'a11', giorno: 'Sabato',   tipo: 'Outdoor',        disciplina: 'Mountain Bike / SICS',   orario: '10:00',  durata: 'Variabile', intensita: 'media', note: 'Attività all\'aria aperta' },
      { id: 'a12', giorno: 'Sabato',   tipo: 'Allungamento',   disciplina: 'Stretching + Tai Chi',   orario: '14:00',  durata: '20 min', intensita: 'bassa',  note: 'Power Nap dopo' },
      { id: 'a13', giorno: 'Domenica', tipo: 'Recupero',       disciplina: 'Riposo attivo',          orario: 'Tutto il giorno', durata: '—', intensita: 'bassa', note: 'Forme Wing Chun leggere se voglia. Nessun obbligo.' },
    ]
  },

  ilaria: {
    note: 'Allenamento leggero ma costante. Priorità: ossigenazione, tonificazione e salute ossea (fondamentale per paratormone).',
    sessioni: [
      { id: 'b1', giorno: 'Lunedì',    tipo: 'Arti Marziali',  disciplina: 'Wing Chun',              orario: '13:00',  durata: '60 min', intensita: 'alta',   note: 'Stessa classe di Damiano' },
      { id: 'b2', giorno: 'Martedì',   tipo: 'Cardio',         disciplina: 'Corsa o Ellittica',      orario: 'Da definire', durata: 'Da definire', intensita: 'media', note: 'Decidere al momento in base alla forma fisica' },
      { id: 'b3', giorno: 'Mercoledì', tipo: 'Cardio',         disciplina: 'Corsa o Ellittica',      orario: 'Da definire', durata: 'Da definire', intensita: 'media', note: 'Decidere al momento in base alla forma fisica' },
      { id: 'b4', giorno: 'Giovedì',   tipo: 'Cardio',         disciplina: 'Corsa o Ellittica',      orario: 'Da definire', durata: 'Da definire', intensita: 'media', note: 'Decidere al momento in base alla forma fisica' },
      { id: 'b5', giorno: 'Venerdì',   tipo: 'Arti Marziali',  disciplina: 'Wing Chun',              orario: '13:00',  durata: '60 min', intensita: 'alta',   note: 'Stessa classe di Damiano' },
      { id: 'b6', giorno: 'Sabato',    tipo: 'Recupero',       disciplina: 'Camminate + stretching', orario: 'Mattina', durata: '30-45 min', intensita: 'bassa', note: 'Attività all\'aperto con la famiglia' },
      { id: 'b7', giorno: 'Domenica',  tipo: 'Recupero',       disciplina: 'Riposo attivo',          orario: '—', durata: '—', intensita: 'bassa', note: 'Yoga o stretching se voglia' },
    ]
  },

  daniele: {
    note: 'Piano sportivo strutturato. Atletica 3 volte/settimana + piscina sabato. Ottimo per sviluppo motorio e fisico.',
    sessioni: [
      { id: 'c1', giorno: 'Lunedì',    tipo: 'Atletica',       disciplina: 'Atletica leggera',       orario: '17:00',  durata: '60-90 min', intensita: 'alta',  note: 'Portare acqua e merenda pre-allenamento' },
      { id: 'c2', giorno: 'Martedì',   tipo: 'Recupero',       disciplina: 'Riposo / gioco libero',  orario: '—',      durata: '—',         intensita: 'bassa', note: 'Recupero muscolare' },
      { id: 'c3', giorno: 'Mercoledì', tipo: 'Atletica',       disciplina: 'Atletica leggera',       orario: '17:00',  durata: '60-90 min', intensita: 'alta',  note: 'Portare acqua e merenda pre-allenamento' },
      { id: 'c4', giorno: 'Giovedì',   tipo: 'Recupero',       disciplina: 'Riposo / gioco libero',  orario: '—',      durata: '—',         intensita: 'bassa', note: 'Recupero muscolare' },
      { id: 'c5', giorno: 'Venerdì',   tipo: 'Atletica',       disciplina: 'Atletica leggera',       orario: '17:00',  durata: '60-90 min', intensita: 'alta',  note: 'Portare acqua e merenda pre-allenamento' },
      { id: 'c6', giorno: 'Sabato',    tipo: 'Nuoto',          disciplina: 'Piscina',                orario: '13:30',  durata: '60 min',    intensita: 'media', note: 'Primo pomeriggio • Con Tommaso' },
      { id: 'c7', giorno: 'Domenica',  tipo: 'Recupero',       disciplina: 'Riposo / gioco libero',  orario: '—',      durata: '—',         intensita: 'bassa', note: 'Giornata famiglia' },
    ]
  },

  tommaso: {
    note: 'Attività fisica adatta all\'età (4 anni). Piscina il sabato. Il resto è gioco libero e movimento naturale.',
    sessioni: [
      { id: 'd1', giorno: 'Lunedì',    tipo: 'Gioco libero',   disciplina: 'Movimento libero',       orario: '—',      durata: '—',         intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'd2', giorno: 'Martedì',   tipo: 'Gioco libero',   disciplina: 'Movimento libero',       orario: '—',      durata: '—',         intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'd3', giorno: 'Mercoledì', tipo: 'Gioco libero',   disciplina: 'Movimento libero',       orario: '—',      durata: '—',         intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'd4', giorno: 'Giovedì',   tipo: 'Gioco libero',   disciplina: 'Movimento libero',       orario: '—',      durata: '—',         intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'd5', giorno: 'Venerdì',   tipo: 'Gioco libero',   disciplina: 'Movimento libero',       orario: '—',      durata: '—',         intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'd6', giorno: 'Sabato',    tipo: 'Nuoto',          disciplina: 'Piscina',                orario: '13:30',  durata: '60 min',    intensita: 'media', note: 'Primo pomeriggio • Con Daniele' },
      { id: 'd7', giorno: 'Domenica',  tipo: 'Recupero',       disciplina: 'Riposo / gioco libero',  orario: '—',      durata: '—',         intensita: 'bassa', note: 'Giornata famiglia' },
    ]
  }
}

export const TIPI_ALLENAMENTO = [
  'Arti Marziali', 'Corsa', 'Cardio', 'Corpo libero', 'Nuoto', 'Atletica',
  'Outdoor', 'Allungamento', 'Yoga', 'Recupero', 'Gioco libero', 'Altro'
]

export const GIORNI_SETTIMANA = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica']
