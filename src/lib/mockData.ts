// Mock data for the entire accounting OS demo

export const mockKPIs = {
  revenue: { value: 847200, change: 12.4, label: 'Monthly Revenue' },
  activeClients: { value: 142, change: 8.2, label: 'Active Clients' },
  pipeline: { value: 2340000, change: 23.1, label: 'Pipeline Value' },
  tasksCompleted: { value: 94, change: 5.6, label: 'Tasks Completed' },
};

export const mockRevenueData = [
  { month: 'Oct', revenue: 620000, expenses: 310000, profit: 310000 },
  { month: 'Nov', revenue: 680000, expenses: 340000, profit: 340000 },
  { month: 'Dec', revenue: 720000, expenses: 360000, profit: 360000 },
  { month: 'Jan', revenue: 710000, expenses: 355000, profit: 355000 },
  { month: 'Feb', revenue: 790000, expenses: 395000, profit: 395000 },
  { month: 'Mar', revenue: 847200, expenses: 380000, profit: 467200 },
];

export const mockActivityFeed = [
  { id: 1, type: 'client', message: 'Arcturus Holdings onboarded successfully', time: '2 min ago', icon: 'user-check' },
  { id: 2, type: 'billing', message: 'Invoice #INV-2847 paid — $12,400', time: '15 min ago', icon: 'dollar-sign' },
  { id: 3, type: 'lead', message: 'New lead: Meridian Capital — CFO reached', time: '1 hr ago', icon: 'trending-up' },
  { id: 4, type: 'task', message: 'Q1 Tax Filing completed for 7 clients', time: '3 hrs ago', icon: 'check-circle' },
  { id: 5, type: 'outreach', message: 'Email sequence started: 24 prospects', time: '5 hrs ago', icon: 'mail' },
  { id: 6, type: 'workflow', message: 'Bookkeeping automation triggered — 18 transactions', time: '6 hrs ago', icon: 'zap' },
];

export const mockDeals = [
  {
    id: 'd1', title: 'Arcturus Holdings', value: 48000, stage: 'qualified', owner: 'Jonathan',
    company: 'Arcturus Holdings LLC', contact: 'Michael Torres', email: 'mtorres@arcturus.com',
    probability: 85, notes: 'CFO interested in full-service package', daysInStage: 3,
  },
  {
    id: 'd2', title: 'Meridian Capital', value: 120000, stage: 'proposal', owner: 'James Park',
    company: 'Meridian Capital Group', contact: 'Jennifer Walsh', email: 'jwalsh@meridian.com',
    probability: 65, notes: 'Reviewing proposal. Follow up Thursday.', daysInStage: 7,
  },
  {
    id: 'd3', title: 'Vertex Solutions', value: 36000, stage: 'discovery', owner: 'Jonathan',
    company: 'Vertex Solutions Inc', contact: 'David Kim', email: 'dkim@vertex.com',
    probability: 40, notes: 'Initial call done. Needs and assessment booked.', daysInStage: 2,
  },
  {
    id: 'd4', title: 'Pinnacle Group', value: 84000, stage: 'negotiation', owner: 'Raj Patel',
    company: 'Pinnacle Group International', contact: 'Amanda Chen', email: 'achen@pinnacle.com',
    probability: 90, notes: 'Contract review in progress.', daysInStage: 5,
  },
  {
    id: 'd5', title: 'Cascade Partners', value: 62000, stage: 'closed-won', owner: 'James Park',
    company: 'Cascade Partners LLC', contact: 'Robert Lee', email: 'rlee@cascade.com',
    probability: 100, notes: 'Contract signed. Onboarding scheduled.', daysInStage: 1,
  },
  {
    id: 'd6', title: 'Nexus Ventures', value: 28000, stage: 'qualified', owner: 'Raj Patel',
    company: 'Nexus Ventures Capital', contact: 'Lisa Morgan', email: 'lmorgan@nexus.com',
    probability: 55, notes: 'Warm lead from referral.', daysInStage: 4,
  },
  {
    id: 'd7', title: 'Zenith Corp', value: 95000, stage: 'proposal', owner: 'Jonathan',
    company: 'Zenith Corporation', contact: 'Alex Rivera', email: 'arivera@zenith.com',
    probability: 70, notes: 'Proposal sent. Awaiting board approval.', daysInStage: 9,
  },
];

export const mockLeads = [
  { id: 'l1', name: 'Patricia Nguyen', title: 'CFO', company: 'Orion Systems', industry: 'Technology', revenue: '$12M', status: 'hot', email: 'pnguyen@orion.com', phone: '+1 (555) 201-4820', enriched: true, score: 94 },
  { id: 'l2', name: 'Gregory Walsh', title: 'Controller', company: 'Summit Logistics', industry: 'Logistics', revenue: '$8M', status: 'warm', email: 'gwalsh@summit.com', phone: '+1 (555) 348-2910', enriched: true, score: 78 },
  { id: 'l3', name: 'Stephanie Patel', title: 'CFO', company: 'BlueWave Capital', industry: 'Finance', revenue: '$45M', status: 'hot', email: 'spatel@bluewave.com', phone: '+1 (555) 409-1823', enriched: false, score: 91 },
  { id: 'l4', name: 'Marcus Johnson', title: 'Director of Finance', company: 'Apex Retail', industry: 'Retail', revenue: '$22M', status: 'cold', email: 'mjohnson@apex.com', phone: '+1 (555) 572-3091', enriched: false, score: 45 },
  { id: 'l5', name: 'Rachel Kim', title: 'VP Finance', company: 'TerraGreen Energy', industry: 'Energy', revenue: '$67M', status: 'warm', email: 'rkim@terragreen.com', phone: '+1 (555) 639-4829', enriched: true, score: 82 },
  { id: 'l6', name: 'Daniel Torres', title: 'CFO', company: 'Helix Pharma', industry: 'Healthcare', revenue: '$31M', status: 'hot', email: 'dtorres@helix.com', phone: '+1 (555) 721-5930', enriched: true, score: 96 },
  { id: 'l7', name: 'Michelle Chang', title: 'Controller', company: 'Pacific Brands', industry: 'Consumer Goods', revenue: '$18M', status: 'warm', email: 'mchang@pacific.com', phone: '+1 (555) 814-6072', enriched: false, score: 67 },
  { id: 'l8', name: 'James O\'Brien', title: 'CFO', company: 'Fortis Construction', industry: 'Construction', revenue: '$54M', status: 'cold', email: 'jobrien@fortis.com', phone: '+1 (555) 903-7183', enriched: false, score: 38 },
];

export const mockEmailSequences = [
  {
    id: 'seq1', name: 'CFO Outreach — Q2 2026', status: 'active', prospects: 24, opened: 18, replied: 6,
    steps: [
      { day: 1, type: 'email', subject: 'Quick question about your Q1 close', sent: 24, opened: 18 },
      { day: 3, type: 'email', subject: 'Following up — financial automation insight', sent: 18, opened: 12 },
      { day: 7, type: 'linkedin', subject: 'LinkedIn connection request', sent: 12, opened: 12 },
      { day: 10, type: 'email', subject: 'Case study: How Meridian saved $140K', sent: 10, opened: 7 },
      { day: 14, type: 'call', subject: 'Discovery call invitation', sent: 6, opened: 6 },
    ],
  },
  {
    id: 'seq2', name: 'Controller Nurture — Mid-Market', status: 'paused', prospects: 41, opened: 28, replied: 9,
    steps: [
      { day: 1, type: 'email', subject: 'Bookkeeping automation for controllers', sent: 41, opened: 28 },
      { day: 5, type: 'email', subject: 'The hidden cost of manual reconciliation', sent: 28, opened: 19 },
      { day: 9, type: 'linkedin', subject: 'LinkedIn message', sent: 19, opened: 19 },
      { day: 14, type: 'email', subject: 'Free workflow assessment', sent: 15, opened: 9 },
    ],
  },
];

export const mockClients = [
  { id: 'c1', name: 'Arcturus Holdings', contact: 'Michael Torres', plan: 'Enterprise', mrr: 4800, status: 'active', since: '2024-01', health: 98, tasks: 3 },
  { id: 'c2', name: 'Meridian Capital', contact: 'Jennifer Walsh', plan: 'Growth', mrr: 2400, status: 'active', since: '2024-03', health: 87, tasks: 1 },
  { id: 'c3', name: 'Pinnacle Group', contact: 'Amanda Chen', plan: 'Enterprise', mrr: 6200, status: 'active', since: '2023-11', health: 95, tasks: 5 },
  { id: 'c4', name: 'Cascade Partners', contact: 'Robert Lee', plan: 'Starter', mrr: 1200, status: 'onboarding', since: '2026-04', health: 72, tasks: 8 },
  { id: 'c5', name: 'TerraGreen Energy', contact: 'Rachel Kim', plan: 'Growth', mrr: 2800, status: 'active', since: '2024-07', health: 91, tasks: 2 },
  { id: 'c6', name: 'Helix Pharma', contact: 'Daniel Torres', plan: 'Enterprise', mrr: 7400, status: 'active', since: '2023-09', health: 99, tasks: 4 },
];

export const mockTimeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
];

export const mockPlans = [
  {
    id: 'starter', name: 'Starter', price: 1200, period: 'month',
    description: 'Perfect for small businesses getting started',
    features: ['Up to 5 clients', 'Basic bookkeeping', 'Monthly reports', 'Email support', 'Cloud storage 10GB'],
    recommended: false,
  },
  {
    id: 'growth', name: 'Growth', price: 2400, period: 'month',
    description: 'For growing firms with complex needs',
    features: ['Up to 25 clients', 'Full bookkeeping suite', 'Weekly reports', 'Priority support', 'Cloud storage 50GB', 'CRM access', 'Outreach automation'],
    recommended: true,
  },
  {
    id: 'enterprise', name: 'Enterprise', price: 6200, period: 'month',
    description: 'Unlimited power for large operations',
    features: ['Unlimited clients', 'AI-powered bookkeeping', 'Real-time dashboards', 'Dedicated account manager', 'Cloud storage 500GB', 'Full CRM + Outreach', 'Custom workflows', 'Offshore team access', 'White-label options'],
    recommended: false,
  },
];

export const mockTasks = [
  { id: 't1', title: 'Reconcile Q1 accounts — Arcturus', assignee: 'Priya Sharma', status: 'inProgress', priority: 'high', due: '2026-04-18', client: 'Arcturus Holdings' },
  { id: 't2', title: 'Prepare tax documents — Meridian', assignee: 'Raj Kumar', status: 'todo', priority: 'high', due: '2026-04-20', client: 'Meridian Capital' },
  { id: 't3', title: 'Monthly P&L report — Pinnacle', assignee: 'Anya Singh', status: 'done', priority: 'medium', due: '2026-04-15', client: 'Pinnacle Group' },
  { id: 't4', title: 'Payroll processing — TerraGreen', assignee: 'Priya Sharma', status: 'inProgress', priority: 'medium', due: '2026-04-19', client: 'TerraGreen Energy' },
  { id: 't5', title: 'Invoice follow-up — Helix Pharma', assignee: 'Raj Kumar', status: 'todo', priority: 'low', due: '2026-04-22', client: 'Helix Pharma' },
  { id: 't6', title: 'Expense categorization — Cascade', assignee: 'Anya Singh', status: 'todo', priority: 'medium', due: '2026-04-21', client: 'Cascade Partners' },
  { id: 't7', title: 'Audit prep — Pinnacle Group', assignee: 'Raj Kumar', status: 'inProgress', priority: 'high', due: '2026-04-17', client: 'Pinnacle Group' },
  { id: 't8', title: 'Bank feed sync review', assignee: 'Anya Singh', status: 'done', priority: 'low', due: '2026-04-14', client: 'All Clients' },
];

export const mockTeamMembers = [
  { id: 'tm1', name: 'Priya Sharma', role: 'Senior Bookkeeper', location: 'Manila, PH', avatar: 'PS', tasks: 8, completed: 6, rating: 4.9, status: 'online' },
  { id: 'tm2', name: 'Raj Kumar', role: 'Tax Specialist', location: 'Bangalore, IN', avatar: 'RK', tasks: 11, completed: 9, rating: 4.7, status: 'online' },
  { id: 'tm3', name: 'Anya Singh', role: 'Accountant', location: 'Lahore, PK', avatar: 'AS', tasks: 7, completed: 5, rating: 4.8, status: 'away' },
  { id: 'tm4', name: 'Carlos Mendez', role: 'Payroll Specialist', location: 'Mexico City, MX', avatar: 'CM', tasks: 5, completed: 5, rating: 5.0, status: 'online' },
];

export const mockReportData = {
  cashFlow: [
    { month: 'Oct', inflow: 780000, outflow: 420000 },
    { month: 'Nov', inflow: 840000, outflow: 390000 },
    { month: 'Dec', inflow: 920000, outflow: 510000 },
    { month: 'Jan', inflow: 750000, outflow: 380000 },
    { month: 'Feb', inflow: 890000, outflow: 430000 },
    { month: 'Mar', inflow: 1020000, outflow: 460000 },
  ],
  clientRevenue: [
    { name: 'Helix Pharma', value: 88800 },
    { name: 'Pinnacle Group', value: 74400 },
    { name: 'Arcturus Holdings', value: 57600 },
    { name: 'TerraGreen', value: 33600 },
    { name: 'Meridian Capital', value: 28800 },
    { name: 'Others', value: 56000 },
  ],
  expenseBreakdown: [
    { category: 'Payroll', amount: 180000 },
    { category: 'Software', amount: 24000 },
    { category: 'Marketing', amount: 36000 },
    { category: 'Operations', amount: 48000 },
    { category: 'Other', amount: 22000 },
  ],
};
