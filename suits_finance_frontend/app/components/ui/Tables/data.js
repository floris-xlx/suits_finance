const columns = [
  { name: "Trade hash", uid: "trade_hash", sortable: false },
  { name: "Pairname", uid: "pairname", sortable: true },
  // { name: "Position size", uid: "position_size", sortable: true },
  { name: "Date", uid: "created_at", sortable: true },
  // { name: "Profit & Loss", uid: "pnl" },
  { name: "Entry level", uid: "entry_level" },
  { name: "Trade Status", uid: "trade_status", sortable: true },
  //{ name: "Trading session", uid: "session", sortable: true },
  { name: "Actions", uid: "actions" },
  // { name: "Unix time", uid: "unix_time" },

];

const statusOptions = [
  { name: "Loss", uid: "Loss" },
  { name: "Pending", uid: "Pending" },
  { name: "Tp1", uid: "Tp1" },
  { name: "Tp2", uid: "Tp2" },
  { name: "TP3", uid: "TP3" },
  { name: "Unapproved", uid: "Unapproved" },
  { name: "Invalid", uid: "Invalid" },
];

const users = [
  {
    trade_hash: 1,
    pairname: "Tony Reichert",
    date: "CEO",
    pnl: "Management",
    outcome: "Win",
    position_size: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    entry: "tony.reichert@example.com",
  },
  {
    trade_hash: 2,
    pairname: "Zoey Lang",
    date: "Tech Lead",
    pnl: "Development",
    outcome: "Unknown",
    position_size: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    entry: "zoey.lang@example.com",
  },
  {
    trade_hash: 3,
    pairname: "Jane Fisher",
    date: "Sr. Dev",
    pnl: "Development",
    outcome: "Win",
    position_size: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    entry: "jane.fisher@example.com",
  },
  {
    trade_hash: 4,
    pairname: "William Howard",
    date: "C.M.",
    pnl: "Marketing",
    outcome: "Loss",
    position_size: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    entry: "william.howard@example.com",
  },
  {
    trade_hash: 5,
    pairname: "Kristen Copper",
    date: "S. Manager",
    pnl: "Sales",
    outcome: "Win",
    position_size: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    entry: "kristen.cooper@example.com",
  },
  {
    trade_hash: 6,
    pairname: "Brian Kim",
    date: "P. Manager",
    pnl: "Management",
    position_size: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    entry: "brian.kim@example.com",
    outcome: "Win",
  },
  {
    trade_hash: 7,
    pairname: "Michael Hunt",
    date: "Designer",
    pnl: "Design",
    outcome: "Unknown",
    position_size: "27",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    entry: "michael.hunt@example.com",
  },
  {
    trade_hash: 8,
    pairname: "Samantha Brooks",
    date: "HR Manager",
    pnl: "HR",
    outcome: "Win",
    position_size: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    entry: "samantha.brooks@example.com",
  },
  {
    trade_hash: 9,
    pairname: "Frank Harrison",
    date: "F. Manager",
    pnl: "Finance",
    outcome: "Loss",
    position_size: "33",
    avatar: "https://i.pravatar.cc/150?img=4",
    entry: "frank.harrison@example.com",
  },
  {
    trade_hash: 10,
    pairname: "Emma Adams",
    date: "Ops Manager",
    pnl: "Operations",
    outcome: "Win",
    position_size: "35",
    avatar: "https://i.pravatar.cc/150?img=5",
    entry: "emma.adams@example.com",
  },
  {
    trade_hash: 11,
    pairname: "Brandon Stevens",
    date: "Jr. Dev",
    pnl: "Development",
    outcome: "Win",
    position_size: "22",
    avatar: "https://i.pravatar.cc/150?img=8",
    entry: "brandon.stevens@example.com",
  },
  {
    trade_hash: 12,
    pairname: "Megan Richards",
    date: "P. Manager",
    pnl: "Product",
    outcome: "Unknown",
    position_size: "28",
    avatar: "https://i.pravatar.cc/150?img=10",
    entry: "megan.richards@example.com",
  },
  {
    trade_hash: 13,
    pairname: "Oliver Scott",
    date: "S. Manager",
    pnl: "Security",
    outcome: "Win",
    position_size: "37",
    avatar: "https://i.pravatar.cc/150?img=12",
    entry: "oliver.scott@example.com",
  },
  {
    trade_hash: 14,
    pairname: "Grace Allen",
    date: "M. Specialist",
    pnl: "Marketing",
    outcome: "Win",
    position_size: "30",
    avatar: "https://i.pravatar.cc/150?img=16",
    entry: "grace.allen@example.com",
  },
  {
    trade_hash: 15,
    pairname: "Noah Carter",
    date: "IT Specialist",
    pnl: "I. Technology",
    outcome: "Unknown",
    position_size: "31",
    avatar: "https://i.pravatar.cc/150?img=15",
    entry: "noah.carter@example.com",
  },
  {
    trade_hash: 16,
    pairname: "Ava Perez",
    date: "Manager",
    pnl: "Sales",
    outcome: "Win",
    position_size: "29",
    avatar: "https://i.pravatar.cc/150?img=20",
    entry: "ava.perez@example.com",
  },
  {
    trade_hash: 17,
    pairname: "Liam Johnson",
    date: "Data Analyst",
    pnl: "Analysis",
    outcome: "Win",
    position_size: "28",
    avatar: "https://i.pravatar.cc/150?img=33",
    entry: "liam.johnson@example.com",
  },
  {
    trade_hash: 18,
    pairname: "Sophia Taylor",
    date: "QA Analyst",
    pnl: "Testing",
    outcome: "Win",
    position_size: "27",
    avatar: "https://i.pravatar.cc/150?img=29",
    entry: "sophia.taylor@example.com",
  },
  {
    trade_hash: 19,
    pairname: "Lucas Harris",
    date: "Administrator",
    pnl: "Information Technology",
    outcome: "Unknown",
    position_size: "32",
    avatar: "https://i.pravatar.cc/150?img=50",
    entry: "lucas.harris@example.com",
  },
  {
    trade_hash: 20,
    pairname: "Mia Robinson",
    date: "Coordinator",
    pnl: "Operations",
    outcome: "Win",
    position_size: "26",
    avatar: "https://i.pravatar.cc/150?img=45",
    entry: "mia.robinson@example.com",
  },
];

export { columns, users, statusOptions };
