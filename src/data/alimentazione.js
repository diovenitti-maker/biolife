export const GIORNI = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica']
export const PASTI = ['Colazione','Merenda mattina','Pranzo','Merenda pomeriggio','Cena']

export const defaultAlimentazione = {
  damiano: {
    piano_base: {
      'Lunedì':    { 'Colazione': 'Uovo (tuorlo crudo) • Tè verde Matcha', 'Merenda mattina': 'Cioccolato fave • Pane di segale • Formaggio capra/pecora stagionato • 1L acqua', 'Pranzo': 'Aglio • Insalata mista • Mix semi • Verdura cotta • Pesce grasso • Amaranto o miglio o quinoa • 2L acqua', 'Merenda pomeriggio': 'Cioccolato fave • Pane di segale • Prosciutto crudo • 1L acqua', 'Cena': 'DIGIUNO: Tisana zenzero, finocchio e limone' },
      'Martedì':   { 'Colazione': 'Kefir capra • Frutta secca', 'Merenda mattina': 'Mix semi • Frutta fresca • 1L acqua', 'Pranzo': 'Aglio • Insalata • Verdura cotta • Carne bianca • Riso rosso • 2L acqua', 'Merenda pomeriggio': 'Carote e finocchi cotti • Noci Pecan • Avocado • Kombucha • 1L acqua', 'Cena': 'DIGIUNO: Tisana arancio e cannella' },
      'Mercoledì': { 'Colazione': 'Estratto frutta e verdura • Mix semi', 'Merenda mattina': 'Frutta secca • Frutta fresca • 1L acqua', 'Pranzo': 'Aglio • Insalata • Verdura cotta • Uovo (tuorlo crudo) • Pasta grano saraceno • 2L acqua', 'Merenda pomeriggio': 'Yogurt capra Greco • Polline • Cannella • 1L acqua', 'Cena': 'DIGIUNO: Tisana zenzero, finocchio e limone' },
      'Giovedì':   { 'Colazione': 'Kefir capra • Frutta secca', 'Merenda mattina': 'Mix semi • Frutta fresca • 1L acqua', 'Pranzo': 'Aglio • Insalata • Verdura cotta • Pesce azzurro • Riso nero • 2L acqua', 'Merenda pomeriggio': 'Carote e finocchi cotti • Noci Pecan • Avocado • Kombucha • 1L acqua', 'Cena': 'DIGIUNO: Tisana arancio e cannella' },
      'Venerdì':   { 'Colazione': 'Uovo (tuorlo crudo) • Tè verde Matcha', 'Merenda mattina': 'Ricotta pecora • Polline • Cannella • Mix semi • Frutta fresca • 1L acqua', 'Pranzo': 'Aglio • Minestrone con legumi • Riso basmati integrale • 2L acqua', 'Merenda pomeriggio': 'Cioccolato fave • Pane di segale • Prosciutto crudo • 1L acqua', 'Cena': 'Vellutata carote/zucca/patata americana • Pesce intero • Patate • 2L acqua' },
      'Sabato':    { 'Colazione': 'Kefir capra • Frutta secca', 'Merenda mattina': 'Frutta secca • Frutta fresca • 1L acqua', 'Pranzo': 'Insalata • Verdura cotta • Mix pesci e molluschi • 2L acqua', 'Merenda pomeriggio': 'Crostata nonno Max • 1L acqua', 'Cena': 'Pizza rossa con mozzarella (con glutine) • 2L acqua' },
      'Domenica':  { 'Colazione': 'DIGIUNO: Tisana', 'Merenda mattina': 'Pancake con farina avena o grano saraceno • 1L acqua', 'Pranzo': 'Insalata • Avocado • Pasta grano tenero con ragù di carne rossa (con glutine) • 2L acqua', 'Merenda pomeriggio': 'Crostata nonno Max • 1L acqua', 'Cena': 'Minestrone con legumi • 2L acqua' },
    },
    piano_alternativo: {
      'Lunedì':    { 'Colazione': 'Kefir capra • Mirtilli • Chia • Polline', 'Merenda mattina': 'Avocado • Mix semi • Ricotta pecora • 1L acqua', 'Pranzo': 'Aglio • Insalata • Verdura cotta • Sgombro • Riso rosso • 2L acqua', 'Merenda pomeriggio': 'Frutta secca • Cioccolato fondente 85%+ • 1L acqua', 'Cena': 'DIGIUNO: Tisana zenzero e curcuma' },
      'Martedì':   { 'Colazione': 'Estratto verde (spinaci, sedano, mela, zenzero) • Mix semi', 'Merenda mattina': 'Frutta fresca di stagione • Noci • 1L acqua', 'Pranzo': 'Aglio • Insalata • Verdura cotta • Salmone selvatico • Quinoa • 2L acqua', 'Merenda pomeriggio': 'Yogurt capra • Polline • Cannella • Mirtilli • 1L acqua', 'Cena': 'DIGIUNO: Tisana finocchio e limone' },
      'Mercoledì': { 'Colazione': 'Uovo (tuorlo crudo) • Tè verde Matcha • Chia', 'Merenda mattina': 'Frutta secca • Kombucha • 1L acqua', 'Pranzo': 'Aglio • Insalata • Verdura cotta • Sardine • Miglio • 2L acqua', 'Merenda pomeriggio': 'Carote crude • Hummus fatto in casa • 1L acqua', 'Cena': 'DIGIUNO: Tisana melissa e camomilla' },
      'Giovedì':   { 'Colazione': 'Kefir capra • Frutti di bosco • Polline', 'Merenda mattina': 'Mix semi • Avocado • 1L acqua', 'Pranzo': 'Aglio • Insalata • Verdura cotta • Tonno fresco • Riso nero • 2L acqua', 'Merenda pomeriggio': 'Noci Pecan • Cioccolato fave • Kombucha • 1L acqua', 'Cena': 'DIGIUNO: Tisana zenzero e arancio' },
      'Venerdì':   { 'Colazione': 'Estratto di frutta e verdura • Chia • Miele melata', 'Merenda mattina': 'Ricotta capra • Frutta fresca • Mix semi • 1L acqua', 'Pranzo': 'Aglio • Insalata • Zuppa di legumi • Amaranto • 2L acqua', 'Merenda pomeriggio': 'Pane segale • Formaggio pecora • 1L acqua', 'Cena': 'Vellutata di zucca • Branzino intero • Patate dolci • 2L acqua' },
      'Sabato':    { 'Colazione': 'Pancake grano saraceno • Mirtilli • Sciroppo d\'acero', 'Merenda mattina': 'Frutta secca • Kombucha • 1L acqua', 'Pranzo': 'Insalata mista • Polpo • Verdura cotta • 2L acqua', 'Merenda pomeriggio': 'Dolce fatto in casa • 1L acqua', 'Cena': 'Pizza bianca con verdure (con glutine) • 2L acqua' },
      'Domenica':  { 'Colazione': 'DIGIUNO prolungato: Tisana e acqua', 'Merenda mattina': 'Uovo • Avocado • Pane segale • 1L acqua', 'Pranzo': 'Pasta farro con ragù di selvaggina (con glutine) • Insalata • 2L acqua', 'Merenda pomeriggio': 'Frutta di stagione • Noci • 1L acqua', 'Cena': 'Brodo d\'ossa con verdure • 2L acqua' },
    }
  },

  ilaria: {
    piano_base: {
      'Lunedì':    { 'Colazione': 'Kefir', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Insalata • Filetto di platessa • Patate', 'Merenda pomeriggio': 'Frutta • Mandorle e noci', 'Cena': 'Minestrone di legumi • Prosciutto crudo' },
      'Martedì':   { 'Colazione': 'Pane senza glutine tostato • Uovo strapazzato • Avocado', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Pasta senza glutine con ricotta • Insalata', 'Merenda pomeriggio': 'Biscotti', 'Cena': 'Vellutata di verdure e patate • Carne' },
      'Mercoledì': { 'Colazione': 'Kefir', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Uova con insalata e gallette', 'Merenda pomeriggio': 'Pane senza glutine con cioccolato e nocciole', 'Cena': 'Pesce intero • Pasta senza glutine con verdura' },
      'Giovedì':   { 'Colazione': 'Pancake con frutta', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Carne con riso rosso e insalata', 'Merenda pomeriggio': 'Mandorle e taralli', 'Cena': 'Lenticchie con riso • Carote e finocchi' },
      'Venerdì':   { 'Colazione': 'Gallette con ricotta di capra o pecora', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Polpette di sgombro • Patate • Insalata', 'Merenda pomeriggio': 'Mandarini • Merendina cioccolato e cocco', 'Cena': 'Polpette di sgombro • Patate • Insalata • Carote e finocchi' },
      'Sabato':    { 'Colazione': 'Kefir', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Carne • Insalata • Riso', 'Merenda pomeriggio': 'Dolce fatto in casa', 'Cena': 'Pizza con mozzarella e pane senza glutine' },
      'Domenica':  { 'Colazione': 'Dolce fatto in casa • Spremuta', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Uova con pasta senza glutine e verdure', 'Merenda pomeriggio': 'Dolce fatto in casa', 'Cena': 'Bastoncini di pesce o filetti gratinati • Pasta senza glutine al sugo • Carote e finocchi' },
    },
    piano_alternativo: {
      'Lunedì':    { 'Colazione': 'Kefir • Frutti di bosco • Polline', 'Merenda mattina': 'Frutta di stagione • Mandorle', 'Pranzo': 'Insalata • Salmone al vapore • Patate dolci', 'Merenda pomeriggio': 'Noci • Frutta secca', 'Cena': 'Zuppa di legumi con curcuma • Pane senza glutine' },
      'Martedì':   { 'Colazione': 'Gallette con avocado e uova strapazzate senza glutine', 'Merenda mattina': 'Mela • Mandorle', 'Pranzo': 'Pasta riso con pesto di basilico e noci • Insalata', 'Merenda pomeriggio': 'Yogurt cocco • Frutta', 'Cena': 'Vellutata zucca e zenzero • Carne bianca' },
      'Mercoledì': { 'Colazione': 'Kefir • Mirtilli • Chia', 'Merenda mattina': 'Pera • Noci', 'Pranzo': 'Frittata di verdure senza glutine • Gallette', 'Merenda pomeriggio': 'Cioccolato fondente 85%+ • Mandorle', 'Cena': 'Trota al forno • Riso basmati • Insalata' },
      'Giovedì':   { 'Colazione': 'Pancake grano saraceno • Miele • Frutta', 'Merenda mattina': 'Banana • Mandorle', 'Pranzo': 'Pollo arrosto • Quinoa • Insalata', 'Merenda pomeriggio': 'Frutta secca mista', 'Cena': 'Minestra di farro senza glutine • Verdure miste' },
      'Venerdì':   { 'Colazione': 'Ricotta di capra • Miele • Gallette', 'Merenda mattina': 'Frutti di bosco • Yogurt di capra', 'Pranzo': 'Polpo • Patate • Insalata mista', 'Merenda pomeriggio': 'Mandarini • Noci', 'Cena': 'Orata al cartoccio • Verdure grigliate • Patate' },
      'Sabato':    { 'Colazione': 'Kefir • Granola senza glutine • Frutta', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Tagliata di manzo • Riso rosso • Rucola', 'Merenda pomeriggio': 'Dolce di riso fatto in casa', 'Cena': 'Pizza senza glutine con verdure di stagione' },
      'Domenica':  { 'Colazione': 'Pancake avena senza glutine • Sciroppo d\'acero • Frutta', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Uova in camicia • Pasta di legumi • Spinaci', 'Merenda pomeriggio': 'Budino di chia al cocco', 'Cena': 'Baccalà con patate • Pasta senza glutine al pomodoro • Carote' },
    }
  },

  daniele: {
    piano_base: {
      'Lunedì':    { 'Colazione': 'Pane con cioccolata • Succo', 'Merenda mattina': 'Pane con cioccolata', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola + pizza', 'Cena': 'Minestrone di legumi • Prosciutto crudo' },
      'Martedì':   { 'Colazione': 'Pancake • Spremuta', 'Merenda mattina': 'Pancake', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola', 'Cena': 'Vellutata di verdure e patate • Carne' },
      'Mercoledì': { 'Colazione': 'Dolcetto • Succo', 'Merenda mattina': 'Taralli', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola', 'Cena': 'Pesce intero • Pasta senza glutine con verdura' },
      'Giovedì':   { 'Colazione': 'Pancake • Spremuta', 'Merenda mattina': 'Pancake', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola', 'Cena': 'Lenticchie con riso • Carote e finocchi' },
      'Venerdì':   { 'Colazione': 'Pane con cioccolata • Spremuta', 'Merenda mattina': 'Pane con cioccolata', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola + pizza', 'Cena': 'Polpette di sgombro • Patate • Insalata • Carote e finocchi' },
      'Sabato':    { 'Colazione': 'Dolcetto • Succo', 'Merenda mattina': 'Frutta di stagione • Frutta secca', 'Pranzo': 'Carne • Insalata • Riso', 'Merenda pomeriggio': 'Dolce fatto in casa', 'Cena': 'Pizza con mozzarella' },
      'Domenica':  { 'Colazione': 'Dolce fatto in casa • Spremuta', 'Merenda mattina': 'Dolce fatto in casa', 'Pranzo': 'Uova con pasta senza glutine e verdure', 'Merenda pomeriggio': 'Dolce fatto in casa', 'Cena': 'Bastoncini di pesce • Pasta senza glutine al sugo • Carote e finocchi' },
    },
    piano_alternativo: {
      'Lunedì':    { 'Colazione': 'Pancake avena • Miele • Latte vegetale', 'Merenda mattina': 'Frutta fresca • Yogurt', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Pane tostato senza glutine • Marmellata', 'Cena': 'Zuppa di verdure • Polpettine di pollo • Patate' },
      'Martedì':   { 'Colazione': 'Pane senza glutine • Burro di mandorle • Banana', 'Merenda mattina': 'Mela • Mandorle', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Biscotti avena senza glutine', 'Cena': 'Pasta riso al pomodoro • Polpette carne bianca • Carote' },
      'Mercoledì': { 'Colazione': 'Yogurt naturale • Granola • Frutti di bosco', 'Merenda mattina': 'Crackers di riso • Formaggio leggero', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Cioccolato fondente • Banana', 'Cena': 'Merluzzo al forno • Riso • Zucchine' },
      'Giovedì':   { 'Colazione': 'Pancake grano saraceno • Sciroppo d\'acero', 'Merenda mattina': 'Pera • Noci', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Frullato frutta fresca', 'Cena': 'Lenticchie rosse • Riso basmati • Spinaci saltati' },
      'Venerdì':   { 'Colazione': 'Pane senza glutine tostato • Uovo strapazzato • Succo arancia', 'Merenda mattina': 'Frutta secca • Yogurt', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Pizza fatta in casa senza glutine', 'Cena': 'Salmone al vapore • Patate • Insalata' },
      'Sabato':    { 'Colazione': 'Crepes senza glutine • Marmellata • Succo', 'Merenda mattina': 'Frutta di stagione • Cioccolato fondente', 'Pranzo': 'Pollo arrosto • Patate al forno • Insalata', 'Merenda pomeriggio': 'Torta di riso fatta in casa', 'Cena': 'Pizza senza glutine con mozzarella e pomodoro' },
      'Domenica':  { 'Colazione': 'Dolce fatto in casa • Cioccolata calda', 'Merenda mattina': 'Pancake • Frutta', 'Pranzo': 'Pasta senza glutine al ragù • Insalata verde', 'Merenda pomeriggio': 'Gelato di frutta fatto in casa', 'Cena': 'Filetti di pesce gratinati • Pasta senza glutine • Carote' },
    }
  },

  tommaso: {
    piano_base: {
      'Lunedì':    { 'Colazione': 'Yogurt • Succo', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola + pizza', 'Cena': 'Minestrone di legumi • Prosciutto crudo' },
      'Martedì':   { 'Colazione': 'Pancake • Spremuta', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola', 'Cena': 'Vellutata di verdure e patate • Carne' },
      'Mercoledì': { 'Colazione': 'Dolcetto • Succo', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola', 'Cena': 'Pesce intero • Pasta senza glutine con verdura' },
      'Giovedì':   { 'Colazione': 'Pancake • Spremuta', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola', 'Cena': 'Lenticchie con riso • Carote e finocchi' },
      'Venerdì':   { 'Colazione': 'Yogurt • Spremuta', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': '🏫 Scuola + pizza', 'Cena': 'Polpette di sgombro • Patate • Insalata • Carote e finocchi' },
      'Sabato':    { 'Colazione': 'Dolcetto • Succo', 'Merenda mattina': 'Frutta di stagione • Frutta secca', 'Pranzo': 'Carne • Insalata • Riso', 'Merenda pomeriggio': 'Dolce fatto in casa', 'Cena': 'Pizza con mozzarella' },
      'Domenica':  { 'Colazione': 'Dolce fatto in casa • Spremuta', 'Merenda mattina': 'Dolce fatto in casa', 'Pranzo': 'Uova con pasta senza glutine e verdure', 'Merenda pomeriggio': 'Dolce fatto in casa', 'Cena': 'Bastoncini di pesce • Pasta senza glutine al sugo • Carote e finocchi' },
    },
    piano_alternativo: {
      'Lunedì':    { 'Colazione': 'Yogurt greco • Miele • Frutta fresca', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Frutta frullata • Crackers riso', 'Cena': 'Minestrina di verdure • Polpettine • Patate' },
      'Martedì':   { 'Colazione': 'Pancake avena • Banana • Latte intero', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Yogurt frutta • Biscotti avena', 'Cena': 'Pasta riso al pomodoro fresco • Carne bianca' },
      'Mercoledì': { 'Colazione': 'Pane senza glutine • Crema nocciole artigianale • Succo', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Mela • Cioccolato fondente', 'Cena': 'Sogliola al vapore • Riso • Zucchine' },
      'Giovedì':   { 'Colazione': 'Pancake grano saraceno • Marmellata • Latte', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Banana • Mandorle', 'Cena': 'Zuppa lenticchie • Riso basmati • Carote' },
      'Venerdì':   { 'Colazione': 'Yogurt bianco • Frutta fresca • Cereali senza glutine', 'Merenda mattina': '🏫 Scuola', 'Pranzo': '🏫 Mensa scolastica', 'Merenda pomeriggio': 'Pizza fatta in casa senza glutine', 'Cena': 'Merluzzo in umido • Patate • Insalata' },
      'Sabato':    { 'Colazione': 'Crepes avena • Miele • Latte', 'Merenda mattina': 'Frutta di stagione', 'Pranzo': 'Tacchino al forno • Patate arrosto • Insalata', 'Merenda pomeriggio': 'Budino di riso fatto in casa', 'Cena': 'Pizza senza glutine con mozzarella' },
      'Domenica':  { 'Colazione': 'Dolce fatto in casa • Cioccolata calda', 'Merenda mattina': 'Frutta fresca', 'Pranzo': 'Pasta senza glutine al ragù bianco • Verdure', 'Merenda pomeriggio': 'Sorbetto frutta fatto in casa', 'Cena': 'Bastoncini di pesce • Pasta riso • Carote e finocchi' },
    }
  }
}
