// Realistic UoA mail data — Greek + English mix.
// Senders: γραμματεία, faculty, listservs, admin, ΕΛΚΕ, library, registrar.

const FOLDERS = [
  { id: 'inbox',   name: 'Εισερχόμενα',     en: 'Inbox',    count: 28, unread: 6, active: true },
  { id: 'sent',    name: 'Απεσταλμένα',     en: 'Sent',     count: 412 },
  { id: 'drafts',  name: 'Πρόχειρα',         en: 'Drafts',   count: 3 },
  { id: 'junk',    name: 'Ανεπιθύμητα',     en: 'Junk',     count: 17 },
  { id: 'trash',   name: 'Διαγραμμένα',     en: 'Trash',    count: 9 },
  { id: 'archive', name: 'Αρχείο',           en: 'Archive',  count: 1284 },
];

const LABELS = [
  { id: 'erasmus',  name: 'Erasmus' },
  { id: 'phd',      name: 'Διδακτορικό' },
  { id: 'admin',    name: 'Διοικητικά' },
  { id: 'info-cs',  name: 'info-cs' },
  { id: 'cs-fac',   name: 'cs-faculty' },
  { id: 'personal', name: 'Προσωπικά' },
];

// Each message has both Greek and English flavour. `from.handle` is the
// email-style identifier; `from.name` is the display name (often Greek).
const MESSAGES = [
  {
    id: 'm-9821', uid: 9821, unread: true, flagged: true,
    from: { name: 'Γραμματεία Πληροφορικής', handle: 'secr-di@di.uoa.gr', initials: 'ΓΠ' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Πρόγραμμα εξετάσεων εαρινού εξαμήνου 2025–26',
    preview: 'Σας ενημερώνουμε ότι το πρόγραμμα εξετάσεων για το εαρινό εξάμηνο έχει αναρτηθεί στην ιστοσελίδα του Τμήματος. Παρακαλούμε ελέγξτε προσεκτικά τις ημερομηνίες και τις αίθουσες.',
    date: '14 Μαΐ', time: '11:42', iso: '2026-05-14',
    label: 'admin', size: '14 KB', hasAttachment: true,
    attachments: [{ name: 'programma_exetaseon_v3.pdf', size: '218 KB' }],
    body: [
      'Αγαπητοί φοιτητές,',
      'Σας ενημερώνουμε ότι το πρόγραμμα εξετάσεων για το εαρινό εξάμηνο 2025–26 έχει αναρτηθεί στην ιστοσελίδα του Τμήματος Πληροφορικής και Τηλεπικοινωνιών.',
      'Παρακαλούμε ελέγξτε προσεκτικά τις ημερομηνίες, ώρες και αίθουσες των μαθημάτων σας. Τυχόν αλλαγές θα ανακοινώνονται μέσω της ιστοσελίδας και του eclass.',
      'Η περίοδος εξετάσεων ξεκινά στις 8 Ιουνίου 2026 και ολοκληρώνεται στις 3 Ιουλίου 2026. Η επαναληπτική περίοδος του Σεπτεμβρίου θα διεξαχθεί από 1 έως 19 Σεπτεμβρίου 2026.',
      'Με εκτίμηση,',
      'Γραμματεία Τμήματος Πληροφορικής & Τηλεπικοινωνιών',
      'Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών',
    ],
  },
  {
    id: 'm-9820', uid: 9820, unread: true,
    from: { name: 'Καθ. Π. Σταματόπουλος', handle: 'takis@di.uoa.gr', initials: 'ΠΣ' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Re: Πτυχιακή εργασία — προσχέδιο κεφαλαίου 3',
    preview: 'Αλέξανδρε, διάβασα το προσχέδιο. Καλή κατεύθυνση συνολικά, αλλά χρειάζονται διορθώσεις στις αποδείξεις της §3.4. Πρότεινε να συναντηθούμε την Πέμπτη 15:00 στο γραφείο μου.',
    date: '14 Μαΐ', time: '09:18', iso: '2026-05-14',
    label: 'phd', size: '22 KB', hasAttachment: false,
    body: [
      'Αλέξανδρε,',
      'Διάβασα το προσχέδιο που μου έστειλες. Καλή κατεύθυνση συνολικά, αλλά χρειάζονται διορθώσεις στις αποδείξεις της §3.4 — η επαγωγή στο Λήμμα 3.4.2 δεν είναι σαφής.',
      'Επίσης, στην εισαγωγή του κεφαλαίου, θα ήθελα να αναφέρεις ρητά τη σύνδεση με το πλαίσιο του Murphy (2019). Δεν αρκεί η παραπομπή στη βιβλιογραφία.',
      'Πρότεινε να συναντηθούμε την Πέμπτη 15:00 στο γραφείο μου, αν είσαι διαθέσιμος.',
      '— Π.',
    ],
  },
  {
    id: 'm-9819', uid: 9819, unread: true,
    from: { name: 'info-cs listserv', handle: 'info-cs@di.uoa.gr', initials: 'IC' },
    to: 'info-cs@di.uoa.gr',
    subject: '[info-cs] Διάλεξη: Verification of Distributed Protocols — 22 Μαΐ, 17:00',
    preview: 'Speaker: Prof. Constantin Enea (LIX, École Polytechnique). Title: "Modular verification of distributed protocols under partial synchrony." Α2 αμφιθέατρο, κτίριο Πληροφορικής.',
    date: '13 Μαΐ', time: '18:04', iso: '2026-05-13',
    label: 'info-cs', size: '8 KB',
    body: [
      'Dear all,',
      'The Department of Informatics invites you to a research seminar:',
      'Speaker: Prof. Constantin Enea (LIX, École Polytechnique)',
      'Title: "Modular verification of distributed protocols under partial synchrony"',
      'Date: 22 May 2026, 17:00 — Α2 Amphitheatre, Informatics Building',
      'Abstract: We present a compositional proof technique for safety properties of message-passing protocols where the network may experience bounded but unknown periods of asynchrony…',
      'Light refreshments will be served afterwards.',
    ],
  },
  {
    id: 'm-9818', uid: 9818, unread: false,
    from: { name: 'Κέντρο Λειτουργίας Δικτύου', handle: 'noc@noc.uoa.gr', initials: 'NOC' },
    to: 'all-users@uoa.gr',
    subject: 'Προγραμματισμένη διακοπή — Σαββατοκύριακο 17–18/05',
    preview: 'Το Σάββατο 17/05 από 02:00 έως 06:00 θα διεξαχθούν εργασίες συντήρησης στους mail servers (mail.uoa.gr). Κατά τη διάρκεια αυτή, η πρόσβαση στην ηλεκτρονική αλληλογραφία θα είναι περιορισμένη.',
    date: '13 Μαΐ', time: '14:30', iso: '2026-05-13',
    label: 'admin', size: '6 KB',
  },
  {
    id: 'm-9817', uid: 9817, unread: false, flagged: true,
    from: { name: 'Erasmus+ Office', handle: 'erasmus@uoa.gr', initials: 'ER' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Outgoing application — status update (KTH Stockholm)',
    preview: 'Dear Alexandros, your Erasmus+ outgoing application for the autumn 2026 semester at KTH Royal Institute of Technology has been forwarded to the receiving institution for evaluation.',
    date: '12 Μαΐ', time: '16:22', iso: '2026-05-12',
    label: 'erasmus', size: '11 KB', hasAttachment: true,
    attachments: [
      { name: 'learning_agreement_draft.pdf', size: '94 KB' },
      { name: 'mobility_calendar_2026.ics', size: '4 KB' },
    ],
  },
  {
    id: 'm-9816', uid: 9816, unread: false,
    from: { name: 'ΕΛΚΕ ΕΚΠΑ', handle: 'elke-admin@elke.uoa.gr', initials: 'ΕΛ' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Έγκριση δαπάνης — Έργο 17453 (συνέδριο ICSE 2026)',
    preview: 'Σας ενημερώνουμε ότι το αίτημα έγκρισης δαπάνης για τη συμμετοχή σας στο συνέδριο ICSE 2026 (Λισσαβώνα) εγκρίθηκε. Παρακαλούμε προσκομίστε τα παραστατικά εντός 30 ημερών.',
    date: '12 Μαΐ', time: '10:14', iso: '2026-05-12',
    label: 'admin', size: '18 KB',
  },
  {
    id: 'm-9815', uid: 9815, unread: false,
    from: { name: 'ACM Digital Library', handle: 'noreply@acm.org', initials: 'AC' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Your saved search "byzantine fault tolerance" — 4 new results',
    preview: '4 new papers match your saved search. View results in the ACM Digital Library, or unsubscribe at the bottom of this email.',
    date: '11 Μαΐ', time: '23:01', iso: '2026-05-11', size: '23 KB',
  },
  {
    id: 'm-9814', uid: 9814, unread: false,
    from: { name: 'Βιβλιοθήκη ΕΚΠΑ', handle: 'library@lib.uoa.gr', initials: 'ΒΒ' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Υπενθύμιση επιστροφής βιβλίου — λήγει 18/05',
    preview: 'Σας υπενθυμίζουμε ότι η περίοδος δανεισμού του βιβλίου "Distributed Algorithms" (Lynch, 1996) λήγει την Δευτέρα 18 Μαΐου. Παρακαλούμε επιστρέψτε το ή ανανεώστε τον δανεισμό.',
    date: '11 Μαΐ', time: '08:00', iso: '2026-05-11',
    label: 'admin', size: '4 KB',
  },
  {
    id: 'm-9813', uid: 9813, unread: false,
    from: { name: 'cs-faculty listserv', handle: 'cs-faculty@di.uoa.gr', initials: 'CS' },
    to: 'cs-faculty@di.uoa.gr',
    subject: '[cs-faculty] Συνεδρίαση Γενικής Συνέλευσης — 19/05/2026',
    preview: 'Συνημμένα η ημερήσια διάταξη της Γενικής Συνέλευσης του Τμήματος. Παρακαλούνται τα μέλη να επιβεβαιώσουν την παρουσία τους έως την Παρασκευή 17/05.',
    date: '10 Μαΐ', time: '12:45', iso: '2026-05-10',
    label: 'cs-fac', size: '32 KB', hasAttachment: true,
  },
  {
    id: 'm-9812', uid: 9812, unread: false,
    from: { name: 'IEEE Membership', handle: 'membership@ieee.org', initials: 'IE' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Renewal reminder — IEEE Computer Society 2026',
    preview: 'Your IEEE Computer Society membership renews on 1 July 2026. Renew now to keep uninterrupted access to IEEE Xplore and Computer Society publications.',
    date: '10 Μαΐ', time: '06:30', iso: '2026-05-10', size: '15 KB',
  },
  {
    id: 'm-9811', uid: 9811, unread: false,
    from: { name: 'Φοιτητική Μέριμνα', handle: 'merimna@uoa.gr', initials: 'ΦΜ' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Δωρεάν σίτιση 2025–26 — Επιβεβαίωση δικαιώματος',
    preview: 'Σας ενημερώνουμε ότι η αίτησή σας για δωρεάν σίτιση για το ακαδημαϊκό έτος 2025–26 έγινε δεκτή. Η κάρτα σίτισης είναι διαθέσιμη στη Φοιτητική Μέριμνα.',
    date: '09 Μαΐ', time: '15:20', iso: '2026-05-09',
    label: 'admin', size: '7 KB',
  },
  {
    id: 'm-9810', uid: 9810, unread: false,
    from: { name: 'Maria Papadopoulou', handle: 'maria.p@cs.aueb.gr', initials: 'MP' },
    to: 'alexliaskos@uoa.gr',
    subject: 'Re: paper draft — Section 4 comments',
    preview: 'Hi Alex, I have read through Section 4 and left inline comments. Overall the proofs read well but Lemma 4.2 needs a tighter argument — see my notes on page 9.',
    date: '08 Μαΐ', time: '21:11', iso: '2026-05-08',
    label: 'phd', size: '47 KB', hasAttachment: true,
  },
  {
    id: 'm-9809', uid: 9809, unread: false,
    from: { name: 'Πρυτανεία ΕΚΠΑ', handle: 'rectorate@uoa.gr', initials: 'ΠΡ' },
    to: 'all-uoa@uoa.gr',
    subject: 'Ανακοίνωση: Επετειακή ημερίδα 188 ετών ΕΚΠΑ',
    preview: 'Με αφορμή τη συμπλήρωση 188 ετών από την ίδρυση του Πανεπιστημίου, η Πρυτανεία διοργανώνει επετειακή ημερίδα στις 03 Μαΐου 2026, στην Αίθουσα Τελετών.',
    date: '07 Μαΐ', time: '13:00', iso: '2026-05-07',
    label: 'admin', size: '12 KB',
  },
  {
    id: 'm-9808', uid: 9808, unread: false,
    from: { name: 'GitHub', handle: 'noreply@github.com', initials: 'GH' },
    to: 'alexliaskos@uoa.gr',
    subject: '[liaskos/uoa-thesis] Pull request #34 opened',
    preview: 'A new pull request was opened by collaborator @takis-uoa on liaskos/uoa-thesis. Title: "Restructure §3.4 proof — apply reviewer comments". 3 files changed, +127/-89.',
    date: '07 Μαΐ', time: '11:48', iso: '2026-05-07', size: '9 KB',
  },
];

const COUNT_BY_LABEL = LABELS.reduce((acc, l) => {
  acc[l.id] = MESSAGES.filter((m) => m.label === l.id).length;
  return acc;
}, {});

Object.assign(window, { FOLDERS, LABELS, MESSAGES, COUNT_BY_LABEL });
