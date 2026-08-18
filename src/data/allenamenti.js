export const defaultAllenamenti = {
  damiano: {
    note: 'Wing Chun lun/ven ore 13:30 • Fartlek mattina lun/ven • Ginnastica KB mar/gio • Corsa mer • Allungamento/MTB/SICS sab',
    sessioni: [
      // LUNEDÌ — due sessioni
      { id: 'da1', giorno: 'Lunedì',    tipo: 'Corsa',        disciplina: 'Fartlek – variazioni 30"/30" × 8 attive', orario: '06:50', durata: '15 min', intensita: 'alta',  note: '5 min riscaldamento → 8 ripetizioni: 30" corsa veloce + 30" recupero → 5 min defaticamento + stretching' },
      { id: 'da2', giorno: 'Lunedì',    tipo: 'Arti Marziali', disciplina: 'Wing Chun', orario: '13:30', durata: '90 min', intensita: 'alta',  note: 'Respirazione a Quadrato pre-allenamento' },
      // MARTEDÌ
      { id: 'da3', giorno: 'Martedì',   tipo: 'Corpo libero',  disciplina: 'Ginnastica corpo completo – Kettlebell 8kg', orario: '06:50', durata: '15 min', intensita: 'media', note: 'KB swing 15 • Goblet squat 12 • Deadlift 12 • Shoulder press 10 • Plank 45 sec • Crunch 15 — 2 giri compatti' },
      // MERCOLEDÌ
      { id: 'da4', giorno: 'Mercoledì', tipo: 'Corsa',         disciplina: 'Corsa corto/medio/lungo veloce', orario: '06:50', durata: '30 min', intensita: 'media', note: 'Alternare settimanalmente: corto veloce (5km) → medio (7km) → lungo (10km) → ripeti il ciclo' },
      // GIOVEDÌ
      { id: 'da5', giorno: 'Giovedì',   tipo: 'Corpo libero',  disciplina: 'Ginnastica corpo completo – Kettlebell 8kg', orario: '06:50', durata: '15 min', intensita: 'media', note: 'KB swing 15 • Goblet squat 12 • Deadlift 12 • Shoulder press 10 • Plank 45 sec • Crunch 15 — 2 giri compatti' },
      // VENERDÌ — due sessioni
      { id: 'da6', giorno: 'Venerdì',   tipo: 'Corsa',         disciplina: 'Fartlek – variazioni 60"/60" × 4 attive', orario: '06:50', durata: '15 min', intensita: 'alta',  note: '5 min riscaldamento → 4 ripetizioni: 60" corsa veloce + 60" recupero → 5 min defaticamento + stretching' },
      { id: 'da7', giorno: 'Venerdì',   tipo: 'Arti Marziali', disciplina: 'Wing Chun', orario: '13:30', durata: '90 min', intensita: 'alta',  note: 'Respirazione a Quadrato pre-allenamento' },
      // SABATO
      { id: 'da8', giorno: 'Sabato',    tipo: 'Outdoor',       disciplina: 'Allungamento / Mountain Bike / SICS', orario: '10:00', durata: 'Variabile', intensita: 'media', note: 'Scegliere in base alla forma e al meteo' },
      // DOMENICA
      { id: 'da9', giorno: 'Domenica',  tipo: 'Recupero',      disciplina: 'Riposo attivo', orario: '—', durata: '—', intensita: 'bassa', note: 'Forme Wing Chun leggere se voglia. Giornata famiglia.' },
    ]
  },

  ilaria: {
    note: 'Wing Chun lun/ven ore 13:30 • Fartlek mattina lun/ven • Ginnastica mar/gio • Cardio mer • Obiettivi: tonificare gambe/glutei/addome/braccia, ridurre cellulite e ciccetta',
    sessioni: [
      // LUNEDÌ — due sessioni
      { id: 'il1', giorno: 'Lunedì',    tipo: 'Corsa',         disciplina: 'Fartlek – variazioni 30"/30" × 8 attive', orario: '06:30', durata: '15 min', intensita: 'alta',  note: '5 min riscaldamento → 8 ripetizioni: 30" corsa veloce + 30" recupero → 5 min defaticamento + stretching gambe e glutei' },
      { id: 'il2', giorno: 'Lunedì',    tipo: 'Arti Marziali', disciplina: 'Wing Chun', orario: '13:30', durata: '90 min', intensita: 'alta',  note: 'Stessa classe di Damiano' },
      // MARTEDÌ
      { id: 'il3', giorno: 'Martedì',   tipo: 'Corpo libero',  disciplina: 'Ginnastica – KB + Elastici + Cavigliere (Circuit A)', orario: '06:30', durata: '15 min', intensita: 'alta',  note: '2 giri: Hip thrust con elastico 15 • Sumo squat KB 12 • Lateral walk elastico 12+12 • Donkey kick cavigliera 15+15 • Plank 30 sec • Crunch inverso 12 • Tricep kickback elastico 12' },
      // MERCOLEDÌ
      { id: 'il4', giorno: 'Mercoledì', tipo: 'Cardio',        disciplina: 'Ellittica / camminata veloce / corsa', orario: '06:30', durata: '20 min', intensita: 'media', note: 'Scegliere in base alla forma → Ellittica 20 min oppure Camminata veloce (preferita per cellulite) oppure Corsa lenta' },
      // GIOVEDÌ
      { id: 'il5', giorno: 'Giovedì',   tipo: 'Corpo libero',  disciplina: 'Ginnastica – KB + Elastici + Cavigliere (Circuit B)', orario: '06:30', durata: '15 min', intensita: 'alta',  note: '2 giri: Stacco rumeno KB 12 • Bulgarian squat KB 8+8 • Clamshell elastico 15+15 • Abductor lift cavigliera 15+15 • Plank laterale 25 sec • Shoulder press KB 10 • Curl bicipite KB 10' },
      // VENERDÌ — due sessioni
      { id: 'il6', giorno: 'Venerdì',   tipo: 'Corsa',         disciplina: 'Fartlek – variazioni 60"/60" × 4 attive', orario: '06:30', durata: '15 min', intensita: 'alta',  note: '5 min riscaldamento → 4 ripetizioni: 60" corsa veloce + 60" recupero → 5 min defaticamento + stretching profondo gambe, glutei, fianchi' },
      { id: 'il7', giorno: 'Venerdì',   tipo: 'Arti Marziali', disciplina: 'Wing Chun', orario: '13:30', durata: '90 min', intensita: 'alta',  note: 'Stessa classe di Damiano' },
      // SABATO
      { id: 'il8', giorno: 'Sabato',    tipo: 'Allungamento',  disciplina: 'Stretching attivo + foam roller', orario: 'Mattina', durata: '20-30 min', intensita: 'bassa', note: 'Stretching profondo gambe, fianchi, glutei • Foam roller su cosce e glutei per cellulite' },
      // DOMENICA
      { id: 'il9', giorno: 'Domenica',  tipo: 'Recupero',      disciplina: 'Riposo attivo', orario: '—', durata: '—', intensita: 'bassa', note: 'Passeggiata con la famiglia. Nessun allenamento strutturato.' },
    ]
  },

  daniele: {
    note: 'Piano sportivo strutturato. Atletica 3 volte/settimana (lun/mer/ven 17:00) + piscina sabato. Ottimo per sviluppo motorio e fisico.',
    sessioni: [
      { id: 'da1', giorno: 'Lunedì',    tipo: 'Atletica',      disciplina: 'Atletica leggera', orario: '17:00', durata: '60-90 min', intensita: 'alta',  note: 'Portare acqua e merenda pre-allenamento' },
      { id: 'da2', giorno: 'Martedì',   tipo: 'Recupero',      disciplina: 'Riposo / gioco libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Recupero muscolare' },
      { id: 'da3', giorno: 'Mercoledì', tipo: 'Atletica',      disciplina: 'Atletica leggera', orario: '17:00', durata: '60-90 min', intensita: 'alta',  note: 'Portare acqua e merenda pre-allenamento' },
      { id: 'da4', giorno: 'Giovedì',   tipo: 'Recupero',      disciplina: 'Riposo / gioco libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Recupero muscolare' },
      { id: 'da5', giorno: 'Venerdì',   tipo: 'Atletica',      disciplina: 'Atletica leggera', orario: '17:00', durata: '60-90 min', intensita: 'alta',  note: 'Portare acqua e merenda pre-allenamento' },
      { id: 'da6', giorno: 'Sabato',    tipo: 'Nuoto',         disciplina: 'Piscina', orario: '13:30', durata: '60 min', intensita: 'media', note: 'Primo pomeriggio • Con Tommaso' },
      { id: 'da7', giorno: 'Domenica',  tipo: 'Recupero',      disciplina: 'Riposo / gioco libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Giornata famiglia' },
    ]
  },

  tommaso: {
    note: 'Attività fisica adatta all\'età (4 anni). Piscina il sabato. Il resto è gioco libero e movimento naturale.',
    sessioni: [
      { id: 'to1', giorno: 'Lunedì',    tipo: 'Gioco libero',  disciplina: 'Movimento libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'to2', giorno: 'Martedì',   tipo: 'Gioco libero',  disciplina: 'Movimento libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'to3', giorno: 'Mercoledì', tipo: 'Gioco libero',  disciplina: 'Movimento libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'to4', giorno: 'Giovedì',   tipo: 'Gioco libero',  disciplina: 'Movimento libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'to5', giorno: 'Venerdì',   tipo: 'Gioco libero',  disciplina: 'Movimento libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Gioco all\'aperto preferibile' },
      { id: 'to6', giorno: 'Sabato',    tipo: 'Nuoto',         disciplina: 'Piscina', orario: '13:30', durata: '60 min', intensita: 'media', note: 'Primo pomeriggio • Con Daniele' },
      { id: 'to7', giorno: 'Domenica',  tipo: 'Recupero',      disciplina: 'Riposo / gioco libero', orario: '—', durata: '—', intensita: 'bassa', note: 'Giornata famiglia' },
    ]
  }
}

export const TIPI_ALLENAMENTO = [
  'Arti Marziali', 'Corsa', 'Cardio', 'Corpo libero', 'Nuoto', 'Atletica',
  'Outdoor', 'Allungamento', 'Yoga', 'Recupero', 'Gioco libero', 'Altro'
]

export const GIORNI_SETTIMANA = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica']
