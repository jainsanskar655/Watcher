const state = {
  user: null,
  dashboard: null,
  route: 'dashboard',
  account: null,
  accountFilter: 'all',
  accountSort: { key: 'name', direction: 'asc' },
  accountSelectedId: null,
  accountSelectedField: 'name',
  accountEdit: null,
  search: '',
  searchTimer: null,
  guide: { log: [] },
  passwordResets: [],
  modal: null,
  timeline: [],
  timelineScope: 'account',
  timelineGroup: 'all',
  timelineAccount: 'all',
  timelineLoading: false
};

const icons = {
  'arrow-up-right': '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  'arrow-left': '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>',
  'arrow-right': '<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>',
  'bell': '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
  'check': '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
  'check-circle': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.6L16.5 9"/></svg>',
  'clock': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  'edit': '<svg viewBox="0 0 24 24"><path d="m4 16-.7 4.7L8 20l11.3-11.3a2.2 2.2 0 0 0-3.1-3.1L4 16Z"/><path d="m14.5 7.5 2 2"/></svg>',
  'filter': '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  'grid': '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
  'layers': '<svg viewBox="0 0 24 24"><path d="m12 4 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 16l8 4 8-4"/></svg>',
  'lock': '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  'log-out': '<svg viewBox="0 0 24 24"><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"/></svg>',
  'menu': '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  'plus': '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  'minimise': '<svg viewBox="0 0 24 24"><path d="M6 15h12"/></svg>',
  'moon': '<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>',
  'refresh': '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14.7-3L4 10"/><path d="M4 5v5h5M4 13a8 8 0 0 0 14.7 3L20 14"/><path d="M20 19v-5h-5"/></svg>',
  'search': '<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
  'sun': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>',
  'send': '<svg viewBox="0 0 24 24"><path d="m21 3-7.2 18-3.4-7.4L3 10.2 21 3Z"/><path d="M10.4 13.6 21 3"/></svg>',
  'shield': '<svg viewBox="0 0 24 24"><path d="M12 3 19 6v5c0 4.5-3 8.1-7 10-4-1.9-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  'spark': '<svg viewBox="0 0 24 24"><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>',
  'trash': '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M6.5 7l.8 12.1A1.5 1.5 0 0 0 8.8 20.5h6.4a1.5 1.5 0 0 0 1.5-1.4L17.5 7"/><path d="M10.5 11v6M13.5 11v6"/></svg>',
  'unlock': '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/></svg>',
  'users': '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 19a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5"/></svg>',
  'x': '<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function icon(name) {
  return `<span data-icon="${escapeHtml(name)}">${icons[name] || icons.spark}</span>`;
}

function hydrateIcons(root = document) {
  $$('[data-icon]', root).forEach((element) => {
    const name = element.dataset.icon;
    if (icons[name] && !element.querySelector('svg')) element.innerHTML = icons[name];
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cleanClass(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
}

function initials(value) {
  const text = String(value || '').trim();
  if (!text) return '?';
  const parts = text.split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : text.slice(0, 2)).toUpperCase();
}

function avatarHtml(user, size = '') {
  const name = user?.name || user?.ownerName || '?';
  const accent = user?.accent || user?.ownerAccent || 'red';
  return `<span class="avatar avatar-${cleanClass(accent)} ${size}">${escapeHtml(user?.initials || user?.ownerInitials || initials(name))}</span>`;
}

function statusChip(status, label) {
  const key = cleanClass(status);
  const labels = {
    'on-track': 'On track',
    'at-risk': 'At risk',
    'watch': 'Watch',
    'new': 'New',
    'pending-review': 'Needs review',
    'pending_review': 'Needs review',
    'approved': 'Approved',
    'changes-requested': 'Changes requested',
    'changes_requested': 'Changes requested',
    'handoff': 'Handoff',
    'draft': 'Draft'
  };
  return `<span class="status-chip status-chip-${key}">${escapeHtml(label || labels[key] || status || 'Unknown')}</span>`;
}

function stageLabel(value) {
  const labels = { discovery: 'Discovery', engagement: 'Engagement', solutioning: 'Solutioning', proposal: 'Proposal', poc: 'POC', negotiation: 'Negotiation', on_hold: 'On hold' };
  return labels[value] || String(value || '').replace(/_/g, ' ');
}

function healthLabel(value) {
  const labels = { on_track: 'On track', at_risk: 'At risk', watch: 'Watch', new: 'New' };
  return labels[value] || String(value || '').replace(/_/g, ' ');
}

function priorityLabel(value) {
  const labels = { normal: 'Standard', high: 'High', critical: 'Critical' };
  return labels[value] || String(value || '').replace(/_/g, ' ');
}

function typeLabel(value) {
  const labels = { 'check-in': 'Check-in', meeting: 'Meeting', milestone: 'Milestone', risk: 'Risk signal', task: 'Task', issue: 'Issue', roadblock: 'Roadblock', resolution: 'Resolution · rejoin', handoff: 'Handoff' };
  return labels[value] || value || 'Check-in';
}

function firstName(value) {
  return String(value || '').trim().split(/\s+/)[0] || '';
}

function signalType(update) {
  const type = String(update?.type || '').toLowerCase();
  if (['task', 'issue', 'roadblock', 'resolution'].includes(type)) return type;
  if (type === 'risk') return 'issue';
  const body = String(update?.body || '').toLowerCase();
  if (/no update|not responsive|on hold|waiting|pending|hasnt shared|not shared/.test(body)) return 'roadblock';
  if (/problem|issue|blocker|concern|risk/.test(body)) return 'issue';
  if (/follow up|to follow|need to|has to|schedule|meeting|call|tomorrow|send|share|poc|deck|quote/.test(body)) return 'task';
  if (type === 'milestone') return 'milestone';
  if (type === 'meeting') return 'meeting';
  return 'check-in';
}

function signalLabel(value) {
  const labels = { task: 'Task', issue: 'Issue', roadblock: 'Roadblock', resolution: 'Resolution', milestone: 'Milestone', meeting: 'Meeting', 'check-in': 'Check-in' };
  return labels[value] || 'Check-in';
}

function signalIcon(value) {
  if (value === 'roadblock') return 'x';
  if (value === 'issue') return 'bell';
  if (value === 'task') return 'check';
  if (value === 'resolution') return 'check-circle';
  if (value === 'milestone') return 'spark';
  return 'clock';
}

function roleLabel(value) {
  const labels = { lead: 'Lead Consultant', reviewer: 'Review Lead', contributor: 'Associate Consultant' };
  return labels[value] || value;
}

function formatDate(value, options = {}) {
  if (!value) return 'Not set';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', ...options }).format(date);
}

function formatFullDate(value) {
  return formatDate(value, { year: 'numeric' });
}

function formatTimeAgo(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatDate(value);
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(value);
}

function todayValue() {
  return new Date().toISOString().slice(0, 10);
}

const API_BASE = String(window.WATCHER_API_BASE || '').replace(/\/$/, '');

function api(path, options = {}) {
  const config = { credentials: 'include', ...options, headers: { ...(options.headers || {}) } };
  if (config.body && typeof config.body !== 'string') {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(config.body);
  }
  return fetch(`${API_BASE}${path}`, config).then(async (response) => {
    let payload = {};
    try { payload = await response.json(); } catch { payload = {}; }
    if (!response.ok) {
      if (response.status === 401 && state.user) showLogin();
      const error = new Error(payload.error || 'Request failed');
      error.status = response.status;
      throw error;
    }
    return payload;
  });
}

function showLogin() {
  state.user = null;
  state.dashboard = null;
  state.account = null;
  state.accountSelectedId = null;
  state.accountEdit = null;
  state.timeline = [];
  state.timelineScope = 'account';
  state.timelineGroup = 'all';
  state.timelineAccount = 'all';
  $('#login-screen')?.classList.remove('is-hidden');
  $('#app-shell')?.classList.add('is-hidden');
  $('#login-username')?.focus();
}

async function enterApp(user) {
  state.user = user;
  state.timelineScope = user.role === 'lead' ? 'global' : 'account';
  state.timeline = [];
  $('#login-screen')?.classList.add('is-hidden');
  $('#app-shell')?.classList.remove('is-hidden');
  setUserChrome(user);
  await loadDashboard();
  navigate('dashboard');
}

function setUserChrome(user) {
  if (!user) return;
  $('#sidebar-user-name').textContent = user.name;
  $('#sidebar-user-role').textContent = user.title;
  $('#topbar-user-name').textContent = user.name;
  $('#topbar-user-title').textContent = user.title;
  $('#topbar-avatar').textContent = user.initials || initials(user.name);
  $('#topbar-avatar').className = `avatar avatar-small avatar-${cleanClass(user.accent)}`;
}

async function loadDashboard() {
  const payload = await api('/api/dashboard');
  state.dashboard = payload;
  state.timeline = payload.timeline || [];
  updateNavCounts();
  if (state.user) setUserChrome(state.dashboard.user || state.user);
  return payload;
}

async function loadTimeline(scope = state.timelineScope) {
  state.timelineScope = scope === 'global' ? 'global' : 'account';
  state.timelineLoading = true;
  if (state.route === 'timeline') renderTimeline();
  try {
    const payload = await api(`/api/timeline?scope=${encodeURIComponent(state.timelineScope)}`);
    state.timeline = payload.timeline || [];
  } catch (error) {
    showToast('Timeline unavailable', error.message, true);
  } finally {
    state.timelineLoading = false;
    if (state.route === 'timeline') renderTimeline();
  }
}

function updateNavCounts() {
  const pending = state.dashboard?.stats?.pending || 0;
  $('#nav-pending-count').textContent = pending || '';
  $('#nav-review-count').textContent = pending || '';
  $('.notification-button')?.classList.toggle('has-notifications', pending > 0);
}

function setBreadcrumb(current) {
  const labels = { dashboard: 'Command center', timeline: 'TVA signal map', accounts: 'Account workspace', reviews: 'Review queue', team: 'Team roster', 'account-detail': 'Account timeline' };
  $('#breadcrumb-current').textContent = labels[current] || current;
  $$('.nav-item[data-route]').forEach((item) => item.classList.toggle('is-active', item.dataset.route === current || (current === 'account-detail' && item.dataset.route === 'accounts')));
}

function navigate(route) {
  state.route = route;
  setBreadcrumb(route);
  closeSidebar();
  if (route === 'account-detail') {
    renderLoading();
    return;
  }
  if (route === 'team') loadPendingResets().then(renderTeam);
  return renderPage();
}

async function openAccount(accountId) {
  state.route = 'account-detail';
  setBreadcrumb('account-detail');
  closeSidebar();
  renderLoading('Opening account timeline');
  try {
    state.account = await api(`/api/accounts/${accountId}`);
    renderAccountDetail();
  } catch (error) {
    showToast('Could not open account', error.message, true);
    navigate('accounts');
  }
}

function renderLoading(label = 'Syncing mission data') {
  $('#page-content').innerHTML = `<div class="loading-screen"><span class="loading-dots"><i></i><i></i><i></i></span>${escapeHtml(label)}</div>`;
}

function renderPage() {
  if (!state.dashboard) return renderLoading();
  if (state.route === 'dashboard') renderDashboard();
  if (state.route === 'timeline') renderTimeline();
  if (state.route === 'accounts') renderAccounts();
  if (state.route === 'reviews') renderReviews();
  if (state.route === 'team') renderTeam();
}

function renderDashboard() {
  const data = state.dashboard;
  const user = data.user || state.user;
  const accounts = data.accounts || [];
  const queue = data.reviewQueue || [];
  const recent = data.recent || [];
  const firstName = String(user?.name || 'Operator').split(' ')[0];
  const atRisk = data.stats.atRisk || 0;
  const page = `
    <div class="page-header">
      <div class="page-header-copy">
        <span class="eyebrow">${escapeHtml(formatFullDate(new Date()))} · ${escapeHtml(roleLabel(user?.role))}</span>
        <h1>Good to see you, ${escapeHtml(firstName)}.</h1>
        <p>Here is the live read on every account, the next move, and where your review gate needs attention.</p>
      </div>
      <div class="page-header-actions">
        <button class="button button-ghost" type="button" data-action="refresh">${icon('refresh')} Refresh data</button>
        <button class="button button-primary" type="button" data-action="new-account">${icon('plus')} Add account</button>
      </div>
    </div>
    <section class="dashboard-hero">
      <div class="hero-copy">
        <span class="eyebrow">The Watcher · overall presales</span>
        <h2>Make the next move visible.</h2>
        <p>One timeline for every account. One review gate for every field update. One Watcher keeping the whole mission in view.</p>
        <div class="hero-status-bar"><span></span></div>
      </div>
      <div class="hero-status">
        <div class="hero-status-inner">
          <span class="hero-status-label">Awaiting your review</span>
          <strong class="hero-status-number">${queue.length}</strong>
          <span class="hero-status-copy">${queue.length ? 'Updates need a Watcher decision.' : 'The review gate is clear.'}</span>
        </div>
      </div>
    </section>
    <section class="stat-grid" aria-label="Portfolio metrics">
      ${statCard('Accounts in view', data.stats.accounts, 'Shared across the mission', 'red')}
      ${statCard('Awaiting review', queue.length, queue.length ? 'Action required' : 'Queue is clear', 'gold')}
      ${statCard('At-risk signals', atRisk, atRisk ? 'Needs a next move' : 'Portfolio is steady', 'ink')}
      ${statCard('Team operators', data.team.length, `${data.team.filter((member) => member.role !== 'lead').length} field contributors`, '')}
    </section>
    <div class="dashboard-grid">
      <div class="dashboard-stack">
        <section class="panel">
          <div class="panel-header">
            <div><span class="eyebrow">Portfolio pulse</span><h2 class="panel-title">Accounts needing a read</h2><p class="panel-subtitle">Sorted by risk, priority, and most recent movement.</p></div>
            <button class="panel-link" type="button" data-route="accounts">View all ${icon('arrow-right')}</button>
          </div>
          <div class="account-list">${accounts.slice(0, 6).map(accountRow).join('')}</div>
        </section>
        <section class="panel">
          <div class="panel-header">
            <div><span class="eyebrow">Live transmissions</span><h2 class="panel-title">Latest timeline movement</h2><p class="panel-subtitle">The most recent notes across all operators.</p></div>
          </div>
          <div class="activity-list">${recent.length ? recent.slice(0, 7).map(activityItem).join('') : emptyState('No transmissions yet', 'Log the first account update to start the mission timeline.')}</div>
        </section>
      </div>
      <div class="dashboard-stack">
        <section class="panel">
          <div class="panel-header">
            <div><span class="eyebrow">Review gate</span><h2 class="panel-title">Needs your eye</h2><p class="panel-subtitle">${queue.length ? `${queue.length} update${queue.length === 1 ? '' : 's'} in the queue.` : 'Nothing is waiting for review.'}</p></div>
            <button class="panel-link" type="button" data-route="reviews">Open queue ${icon('arrow-right')}</button>
          </div>
          <div class="review-list">${queue.length ? queue.slice(0, 3).map(reviewCard).join('') : emptyState('Gate clear', 'New field updates will appear here for review.')}</div>
        </section>
        <section class="route-card">
          <span class="eyebrow">Operating model</span>
          <h3>One mission, clear authority.</h3>
          <p>Field updates move through the hierarchy before they become trusted account history.</p>
          <div class="route-line"><span class="route-node">S</span><span class="route-arrow"></span><span class="route-node">A</span><span class="route-arrow"></span><span class="route-node route-node-red">W</span><span>Watcher</span></div>
        </section>
      </div>
    </div>`;
  $('#page-content').innerHTML = page;
  hydrateIcons($('#page-content'));
}

function statCard(label, value, caption, variant) {
  return `<article class="stat-card ${variant ? `stat-card--${variant}` : ''}"><span class="stat-label">${escapeHtml(label)}</span><strong class="stat-value">${escapeHtml(value)}</strong><span class="stat-caption">${escapeHtml(caption)}</span></article>`;
}

function accountRow(account) {
  return `<button class="account-row account-row-button" type="button" data-action="open-account" data-account-id="${account.id}">
    <span class="account-identity"><span class="account-mark">${escapeHtml(initials(account.name))}</span><span><strong class="account-name">${escapeHtml(account.name)}</strong><small class="account-partner">${escapeHtml(account.partner)}</small></span></span>
    <span class="owner-cell">${avatarHtml(account, 'avatar-small')}<span>${escapeHtml(account.ownerName)}</span></span>
    <span>${statusChip(account.health)}</span>
    <span class="account-updated">${escapeHtml(account.lastUpdateAt ? formatDate(account.lastUpdateAt) : 'No update')}</span>
    <span class="row-chevron">${icon('arrow-right')}</span>
  </button>`;
}

function activityItem(update) {
  return `<button class="activity-item account-row-button" type="button" data-action="open-account" data-account-id="${update.accountId}">
    ${avatarHtml(update, 'avatar-small')}
    <span class="activity-copy"><strong>${escapeHtml(update.accountName)} · ${escapeHtml(update.authorName)}</strong><p>${escapeHtml(update.body)}</p></span>
    <span class="activity-time">${escapeHtml(formatTimeAgo(update.createdAt))}</span>
  </button>`;
}

function reviewCard(update) {
  const canReview = update.reviewerId === state.user?.id;
  const controls = canReview
    ? `<span class="review-actions"><button class="button button-ghost" type="button" data-action="open-account" data-account-id="${update.accountId}">Open</button><button class="button button-danger" type="button" data-action="review" data-review-action="request_changes" data-update-id="${update.id}">Request changes</button><button class="button button-success" type="button" data-action="review" data-review-action="approve" data-update-id="${update.id}">${icon('check')} Approve</button></span>`
    : `<span class="review-route">Waiting on ${escapeHtml(update.reviewerName || 'the assigned reviewer')}</span>`;
  return `<article class="review-card">
    <div class="review-card-top"><div class="review-account"><span class="account-mark">${escapeHtml(initials(update.accountName))}</span><strong>${escapeHtml(update.accountName)}</strong></div>${statusChip(update.reviewStatus)}</div>
    <p class="review-card-body">${escapeHtml(update.body)}</p>
    <div class="review-card-footer"><span class="review-author">${avatarHtml(update, 'avatar-small')} ${escapeHtml(update.authorName)} · ${escapeHtml(formatDate(update.occurredAt))}</span>${controls}</div>
  </article>`;
}

function eraseRequestCard(update) {
  const isLead = state.user?.role === 'lead';
  const mine = update.deletionRequestedBy === state.user?.id;
  const controls = isLead
    ? `<span class="review-actions"><button class="button button-ghost" type="button" data-action="open-account" data-account-id="${update.accountId}">Open</button><button class="button button-ghost" type="button" data-action="erase-decision" data-decision="keep" data-update-id="${update.id}">${icon('check')} Keep entry</button><button class="button button-danger" type="button" data-action="erase-decision" data-decision="erase" data-update-id="${update.id}">${icon('trash')} Erase now</button></span>`
    : `<span class="review-actions"><button class="button button-ghost" type="button" data-action="open-account" data-account-id="${update.accountId}">Open</button><button class="button button-ghost" type="button" data-action="cancel-erase" data-update-id="${update.id}">Cancel request</button></span>`;
  return `<article class="review-card erase-request-card">
    <div class="review-card-top"><div class="review-account"><span class="account-mark account-mark-danger">${icon('trash')}</span><strong>${escapeHtml(update.accountName || 'Account timeline')}</strong></div><span class="status-chip status-changes">${isLead ? 'Your decision' : 'Awaiting Watcher'}</span></div>
    <p class="review-card-body">${escapeHtml(update.body)}</p>
    <div class="erase-reason">${icon('send')}<span><strong>${escapeHtml(update.deletionRequestedByName || update.authorName)}</strong> asked to erase this: ${escapeHtml(update.deletionReason || 'no reason given')}</span></div>
    <div class="review-card-footer"><span class="review-author">${avatarHtml(update, 'avatar-small')} ${escapeHtml(update.authorName)} · ${escapeHtml(formatDate(update.occurredAt))}${mine ? ' · your request' : ''}</span>${controls}</div>
  </article>`;
}

function emptyState(title, copy) {
  return `<div class="empty-state"><span class="empty-state-icon">${icon('check')}</span><strong>${escapeHtml(title)}</strong><p>${escapeHtml(copy)}</p></div>`;
}

const accountSheetColumns = [
  { key: 'name', label: 'Account', type: 'text', sortable: true },
  { key: 'partner', label: 'Partner / source', type: 'text', sortable: true },
  { key: 'ownerId', label: 'Owner', type: 'owner', sortable: true },
  { key: 'stage', label: 'Stage', type: 'stage', sortable: true },
  { key: 'health', label: 'Health', type: 'health', sortable: true },
  { key: 'priority', label: 'Priority', type: 'priority', sortable: true },
  { key: 'nextAction', label: 'Next action', type: 'text', sortable: true },
  { key: 'nextActionDate', label: 'Due date', type: 'date', sortable: true },
  { key: 'lastUpdateAt', label: 'Last movement', type: 'date', sortable: true },
  { key: 'pendingReviews', label: 'Review', type: 'number', sortable: true },
  { key: 'actions', label: 'Open', type: 'actions', sortable: false }
];

function filteredAccounts() {
  const accounts = state.dashboard?.accounts || [];
  const query = state.search.trim().toLowerCase();
  return accounts.filter((account) => {
    const matchesFilter = state.accountFilter === 'all'
      || (state.accountFilter === 'mine' && (account.ownerId === state.user?.id || account.isMember))
      || (state.accountFilter === 'at-risk' && account.health === 'at_risk')
      || (state.accountFilter === 'pending' && account.pendingReviews > 0);
    const matchesSearch = !query || `${account.name} ${account.partner} ${account.ownerName}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
}

function accountSheetValue(account, field) {
  const values = {
    name: account.name,
    partner: account.partner,
    ownerId: account.ownerId,
    stage: account.stage,
    health: account.health,
    priority: account.priority,
    nextAction: account.nextAction,
    nextActionDate: account.nextActionDate ? String(account.nextActionDate).slice(0, 10) : '',
    lastUpdateAt: account.lastUpdateAt,
    pendingReviews: account.pendingReviews
  };
  return values[field] ?? '';
}

function accountSheetDisplayValue(account, field) {
  const value = accountSheetValue(account, field);
  if (field === 'ownerId') return account.ownerName || value;
  if (field === 'stage') return stageLabel(value);
  if (field === 'health') return healthLabel(value);
  if (field === 'priority') return priorityLabel(value);
  if (field === 'nextActionDate' || field === 'lastUpdateAt') return value ? formatDate(value, { year: 'numeric' }) : '—';
  if (field === 'pendingReviews') return String(value || 0);
  return value || '—';
}

function accountSheetSortValue(account, field) {
  if (field === 'ownerId') return account.ownerName || '';
  if (field === 'stage') return stageLabel(account.stage);
  if (field === 'health') return healthLabel(account.health);
  if (field === 'priority') return priorityLabel(account.priority);
  if (field === 'lastUpdateAt' || field === 'nextActionDate') return accountSheetValue(account, field) ? new Date(accountSheetValue(account, field)).getTime() : 0;
  if (field === 'pendingReviews') return Number(account.pendingReviews || 0);
  return accountSheetValue(account, field);
}

function sortedSheetAccounts(accounts) {
  const { key, direction } = state.accountSort;
  const multiplier = direction === 'desc' ? -1 : 1;
  return [...accounts].sort((left, right) => {
    const leftValue = accountSheetSortValue(left, key);
    const rightValue = accountSheetSortValue(right, key);
    if (typeof leftValue === 'number' && typeof rightValue === 'number') return (leftValue - rightValue) * multiplier;
    return String(leftValue || '').localeCompare(String(rightValue || ''), undefined, { sensitivity: 'base', numeric: true }) * multiplier;
  });
}

function canEditAccountSheet(account) {
  return state.user?.role === 'lead' || account?.ownerId === state.user?.id || account?.isMember;
}

function canEditAccountSheetField(account, field) {
  if (!canEditAccountSheet(account)) return false;
  if (field === 'ownerId') return state.user?.role === 'lead';
  return ['name', 'partner', 'stage', 'health', 'priority', 'nextAction', 'nextActionDate'].includes(field);
}

function accountSheetCellContent(account, column) {
  const value = accountSheetDisplayValue(account, column.key);
  if (column.key === 'health') return statusChip(account.health);
  if (column.key === 'ownerId') return `<span class="sheet-owner"><span class="account-mark">${escapeHtml(account.ownerInitials || initials(account.ownerName))}</span><span>${escapeHtml(value)}</span></span>`;
  if (column.key === 'name') return `<span class="sheet-account-name">${escapeHtml(value)}</span>${account.memberCount > 1 ? `<span class="sheet-member-count">${account.memberCount}</span>` : ''}`;
  if (column.key === 'pendingReviews') return `<span class="sheet-review-count ${Number(account.pendingReviews) ? 'has-pending' : ''}">${escapeHtml(value)}</span>`;
  if (column.key === 'nextAction') return `<span class="sheet-wrap-text">${escapeHtml(value)}</span>`;
  return `<span>${escapeHtml(value)}</span>`;
}

function accountSheetActions(account) {
  const canUpdate = canEditAccountSheet(account);
  return `<span class="sheet-row-actions">${canUpdate ? `<button class="sheet-log-button" type="button" data-action="correct" data-account-id="${account.id}">Fix</button><button class="sheet-log-button" type="button" data-action="new-update" data-account-id="${account.id}">Log signal</button><button class="sheet-log-button sheet-log-button-danger" type="button" data-action="pick-erase" data-account-id="${account.id}">Erase&hellip;</button>` : ''}<button class="sheet-open-button" type="button" data-action="open-account" data-account-id="${account.id}" aria-label="Open ${escapeHtml(account.name)}">${icon('arrow-right')}</button></span>`;
}

async function openAccountErasePicker(accountId) {
  let payload;
  try {
    payload = await api(`/api/accounts/${accountId}`);
  } catch (error) {
    return showToast('Timeline unavailable', error.message, true);
  }
  const account = payload.account;
  const updates = payload.updates || [];
  updates.forEach((update) => pickedAccountUpdates.set(Number(update.id), update));
  const isLead = state.user?.role === 'lead';
  const rows = updates.length
    ? updates.map((update) => {
      const pending = update.deletionState === 'requested';
      return `<div class="erase-picker-row ${pending ? 'is-pending' : ''}">
        <span class="erase-picker-meta">${timelineSignalChip(update)}<small>${escapeHtml(update.authorName)} · ${escapeHtml(formatFullDate(update.occurredAt))}</small></span>
        <p>${escapeHtml(timelineTruncate(update.body, 160))}</p>
        <span class="erase-picker-actions">${pending ? `<span class="timeline-pending-chip">erase requested</span>` : `<button class="button button-ghost button-small" type="button" data-action="correct" data-account-id="${account.id}" data-update-id="${update.id}">${icon('spark')} Fix</button><button class="button button-danger button-small" type="button" data-action="erase" data-update-id="${update.id}">${icon('trash')} ${isLead ? 'Erase' : 'Request'}</button>`}</span>
      </div>`;
    }).join('')
    : emptyState('No timeline entries', 'Log a signal first, then it can be corrected or erased from here.');
  openModal(`${modalHeader('Erase a timeline entry', escapeHtml(account.name))}<div class="modal-body"><p class="form-help">${isLead ? 'Erasing as the Watcher removes the entry immediately.' : 'Pick the entry that is wrong. Nothing is removed until the Watcher approves the request.'}</p><div class="erase-picker">${rows}</div><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Close</button></div></div>`);
}

function accountSheetCell(account, column, rowIndex) {
  if (column.type === 'actions') return `<td class="account-sheet-cell sheet-actions-cell">${accountSheetActions(account)}</td>`;
  const selected = Number(state.accountSelectedId) === Number(account.id) && state.accountSelectedField === column.key;
  const editable = canEditAccountSheetField(account, column.key);
  const display = accountSheetDisplayValue(account, column.key);
  const title = editable ? `Double-click to edit ${column.label}. Changes save automatically.` : `${column.label}: ${display}`;
  return `<td class="account-sheet-cell sheet-column-${cleanClass(column.key)} ${selected ? 'is-selected' : ''}"><button class="sheet-cell ${editable ? 'is-editable' : 'is-locked'}" type="button" data-action="select-account-cell" data-account-id="${account.id}" data-field="${column.key}" data-row-index="${rowIndex}" data-editable="${editable}" aria-label="${escapeHtml(`${column.label}: ${display}`)}" title="${escapeHtml(title)}">${accountSheetCellContent(account, column)}${editable ? `<span class="sheet-cell-edit-hint">${icon('edit')}</span>` : `<span class="sheet-cell-lock">${icon('lock')}</span>`}</button></td>`;
}

function accountSheetRow(account, rowIndex) {
  const selected = Number(state.accountSelectedId) === Number(account.id);
  return `<tr class="account-sheet-row ${selected ? 'is-selected' : ''}" data-account-id="${account.id}" data-row-index="${rowIndex}"><th class="account-sheet-row-number" scope="row">${rowIndex + 1}</th>${accountSheetColumns.map((column) => accountSheetCell(account, column, rowIndex)).join('')}</tr>`;
}

function accountSheetHeader() {
  const sort = state.accountSort;
  return `<thead><tr><th class="account-sheet-row-number" scope="col">#</th>${accountSheetColumns.map((column) => {
    const active = sort.key === column.key;
    const direction = active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none';
    return `<th scope="col" class="sheet-column-${cleanClass(column.key)}" aria-sort="${direction}">${column.sortable ? `<button class="sheet-column-heading ${active ? 'is-active' : ''}" type="button" data-action="sort-accounts" data-sort-key="${column.key}"><span>${escapeHtml(column.label)}</span><span class="sheet-sort-indicator">${active ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}</span></button>` : `<span class="sheet-column-heading">${escapeHtml(column.label)}</span>`}</th>`;
  }).join('')}</tr></thead>`;
}

function accountSheetEditorOptions(field) {
  if (field === 'ownerId') return (state.dashboard?.users || []).map((user) => ({ value: user.id, label: `${user.name} · ${roleLabel(user.role)}` }));
  if (field === 'stage') return ['discovery', 'engagement', 'solutioning', 'proposal', 'poc', 'negotiation', 'on_hold'].map((value) => ({ value, label: stageLabel(value) }));
  if (field === 'health') return ['new', 'on_track', 'at_risk', 'watch'].map((value) => ({ value, label: healthLabel(value) }));
  if (field === 'priority') return ['normal', 'high', 'critical'].map((value) => ({ value, label: priorityLabel(value) }));
  return [];
}

function beginAccountCellEdit(cell) {
  if (!cell || cell.dataset.editable !== 'true') return;
  if (state.accountEdit) {
    if (state.accountEdit.accountId === Number(cell.dataset.accountId) && state.accountEdit.field === cell.dataset.field) return;
    if (state.accountEdit.committing) return;
    cancelAccountCellEdit();
    return;
  }
  const account = (state.dashboard?.accounts || []).find((item) => Number(item.id) === Number(cell.dataset.accountId));
  if (!account || !canEditAccountSheetField(account, cell.dataset.field)) return;
  selectAccountCell(cell.dataset.accountId, cell.dataset.field);
  const field = cell.dataset.field;
  const original = String(accountSheetValue(account, field) ?? '');
  const options = accountSheetEditorOptions(field);
  const editor = document.createElement(options.length ? 'select' : 'input');
  editor.className = 'account-sheet-editor';
  editor.dataset.accountEditor = 'true';
  editor.dataset.accountId = account.id;
  editor.dataset.field = field;
  editor.setAttribute('aria-label', `Edit ${accountSheetColumns.find((column) => column.key === field)?.label || field}`);
  if (options.length) {
    options.forEach((option) => {
      const element = document.createElement('option');
      element.value = option.value;
      element.textContent = option.label;
      editor.appendChild(element);
    });
  } else {
    editor.type = field === 'nextActionDate' ? 'date' : 'text';
    if (field === 'name') editor.required = true;
  }
  editor.value = original;
  state.accountEdit = { accountId: Number(account.id), field, original };
  cell.classList.add('is-editing');
  cell.replaceChildren(editor);
  hydrateIcons(cell);
  editor.focus();
  if (typeof editor.select === 'function') editor.select();
}

function cancelAccountCellEdit() {
  if (!state.accountEdit) return;
  state.accountEdit = null;
  renderAccounts();
}

async function commitAccountCellEdit(editor) {
  const session = state.accountEdit;
  if (!editor || !session || session.committing || Number(editor.dataset.accountId) !== Number(session.accountId) || editor.dataset.field !== session.field) return;
  const nextValue = String(editor.value || '').trim();
  if (nextValue === session.original) {
    cancelAccountCellEdit();
    return;
  }
  if (session.field === 'name' && !nextValue) {
    editor.setCustomValidity('Account name cannot be empty.');
    editor.reportValidity();
    return;
  }
  editor.setCustomValidity('');
  state.accountEdit = { ...session, committing: true };
  editor.disabled = true;
  try {
    await api(`/api/accounts/${session.accountId}`, { method: 'PATCH', body: { [session.field]: nextValue } });
    state.accountEdit = null;
    state.accountSelectedId = session.accountId;
    state.accountSelectedField = session.field;
    await loadDashboard();
    if (state.route === 'accounts') renderAccounts();
    showToast('Cell updated', `${accountSheetColumns.find((column) => column.key === session.field)?.label || session.field} saved to the account register.`);
    if (state.route === 'accounts') focusAccountSheetCell(session.accountId, session.field);
  } catch (error) {
    state.accountEdit = { ...session, committing: false };
    editor.disabled = false;
    showToast('Could not update cell', error.message, true);
  }
}

function focusAccountSheetCell(accountId, field) {
  requestAnimationFrame(() => {
    const cell = $$('.sheet-cell').find((item) => Number(item.dataset.accountId) === Number(accountId) && item.dataset.field === field);
    cell?.focus();
  });
}

function accountSheetColumnIndex(field) {
  return accountSheetColumns.findIndex((column) => column.key === field);
}

function accountSheetCellAddress(accountId, field) {
  const row = $$('.account-sheet-row').find((item) => Number(item.dataset.accountId) === Number(accountId));
  const column = accountSheetColumnIndex(field);
  const rowIndex = row ? Number(row.dataset.rowIndex) : 0;
  if (column < 0) return '—';
  return `${String.fromCharCode(65 + column)}${rowIndex + 1}`;
}

function accountSheetFormulaValue(account, field) {
  if (!account || !field) return '';
  if (field === 'ownerId') return account.ownerName || account.ownerId;
  if (field === 'stage') return stageLabel(account.stage);
  if (field === 'health') return healthLabel(account.health);
  if (field === 'priority') return priorityLabel(account.priority);
  if (field === 'lastUpdateAt') return account.lastUpdateAt || '';
  return accountSheetValue(account, field);
}

function updateAccountSheetSelection() {
  const selectedId = Number(state.accountSelectedId);
  $$('.account-sheet-row').forEach((row) => row.classList.toggle('is-selected', Number(row.dataset.accountId) === selectedId));
  $$('.sheet-cell').forEach((cell) => cell.closest('td')?.classList.toggle('is-selected', Number(cell.dataset.accountId) === selectedId && cell.dataset.field === state.accountSelectedField));
  const account = (state.dashboard?.accounts || []).find((item) => Number(item.id) === selectedId);
  const address = $('#sheet-cell-address');
  const value = $('#sheet-formula-value');
  if (address) address.textContent = accountSheetCellAddress(selectedId, state.accountSelectedField);
  if (value) value.textContent = accountSheetFormulaValue(account, state.accountSelectedField) || 'Select a cell';
}

function selectAccountCell(accountId, field) {
  state.accountSelectedId = Number(accountId);
  state.accountSelectedField = field || 'name';
  updateAccountSheetSelection();
}

function renderAccounts() {
  const allAccounts = state.dashboard?.accounts || [];
  const accounts = sortedSheetAccounts(filteredAccounts());
  if (!accounts.some((account) => Number(account.id) === Number(state.accountSelectedId))) state.accountSelectedId = accounts[0]?.id || null;
  if (!accountSheetColumns.some((column) => column.key === state.accountSelectedField)) state.accountSelectedField = 'name';
  const tabs = [
    ['all', 'All accounts', allAccounts.length],
    ['mine', 'My accounts', allAccounts.filter((account) => account.ownerId === state.user?.id || account.isMember).length],
    ['at-risk', 'At risk', allAccounts.filter((account) => account.health === 'at_risk').length],
    ['pending', 'Needs review', allAccounts.filter((account) => account.pendingReviews > 0).length]
  ];
  const sort = state.accountSort;
  $('#page-content').innerHTML = `
    <div class="page-header">
      <div class="page-header-copy"><span class="eyebrow">Live workbook · ${allAccounts.length} records</span><h1>Account workspace.</h1><p>A spreadsheet-style register for the mission portfolio. Select a cell, or double-click an unlocked field to edit it in place.</p></div>
      <div class="page-header-actions"><button class="button button-ghost" type="button" data-action="refresh">${icon('refresh')} Refresh</button><button class="button button-primary" type="button" data-action="new-account">${icon('plus')} Add account</button></div>
    </div>
    <div class="filter-bar account-sheet-filter-bar"><div class="filter-tabs">${tabs.map(([key, label, count]) => `<button class="filter-tab ${state.accountFilter === key ? 'is-active' : ''}" type="button" data-filter="${key}">${escapeHtml(label)} <span>${count}</span></button>`).join('')}</div><label class="filter-search">${icon('search')}<input id="account-filter-search" type="search" value="${escapeHtml(state.search)}" placeholder="Search this sheet..." aria-label="Search accounts"></label></div>
    <section class="panel account-sheet-panel">
      <div class="account-sheet-heading"><div><span class="eyebrow">Portfolio register</span><strong>${accounts.length} visible ${accounts.length === 1 ? 'row' : 'rows'}</strong></div><span class="account-sheet-sort-label">Sorted by ${escapeHtml(accountSheetColumns.find((column) => column.key === sort.key)?.label || sort.key)} ${sort.direction === 'asc' ? '↑' : '↓'}</span></div>
      <div class="account-sheet-formula"><span class="account-sheet-address" id="sheet-cell-address">A1</span><span class="account-sheet-fx">fx</span><output id="sheet-formula-value" aria-live="polite"></output></div>
      <div class="account-sheet-scroll"><table class="account-sheet" aria-label="Account spreadsheet"><colgroup><col class="sheet-col-row"><col class="sheet-col-name"><col class="sheet-col-partner"><col class="sheet-col-owner"><col class="sheet-col-stage"><col class="sheet-col-health"><col class="sheet-col-priority"><col class="sheet-col-action"><col class="sheet-col-date"><col class="sheet-col-movement"><col class="sheet-col-review"><col class="sheet-col-open"></colgroup>${accountSheetHeader()}<tbody>${accounts.length ? accounts.map((account, index) => accountSheetRow(account, index)).join('') : `<tr><td colspan="12">${emptyState('No accounts match', 'Try another filter or search term.')}</td></tr>`}</tbody></table></div>
      <div class="account-sheet-footer"><span><span class="sheet-legend-dot is-editable"></span> Double-click an unlocked cell to edit</span><span><span class="sheet-legend-dot is-locked"></span> Read-only</span><span class="account-sheet-footer-spacer"></span><span>${escapeHtml(state.user?.name || 'Operator')} · changes save to the live database</span></div>
    </section>`;
  hydrateIcons($('#page-content'));
  updateAccountSheetSelection();
}

function renderReviews() {
  const queue = state.dashboard?.reviewQueue || [];
  const eraseRequests = state.dashboard?.eraseRequests || [];
  const isLead = state.user?.role === 'lead';
  const title = isLead ? 'Review queue.' : 'Apeksha’s review gate.';
  const copy = isLead ? 'Every field update in the mission is visible here. Approve it, or send it back with a clear next instruction. Erase requests are yours alone to decide.' : 'Samriddhi’s and Renuja’s field updates arrive here before they become trusted account history.';
  const eraseSection = isLead || eraseRequests.length ? `<section class="panel"><div class="panel-header"><div><span class="eyebrow">Erase requests · ${eraseRequests.length} waiting</span><h2 class="panel-title">${isLead ? 'Decide what leaves the record.' : 'Your erase requests.'}</h2><p class="panel-subtitle">Nothing disappears on request alone. ${isLead ? 'Approve to erase it permanently, or keep it and the entry returns to the timeline.' : 'The Watcher approves each request before the entry is erased.'}</p></div>${isLead && eraseRequests.length ? `<span class="status-chip status-changes">${eraseRequests.length} to decide</span>` : ''}</div><div class="review-list">${eraseRequests.length ? eraseRequests.map(eraseRequestCard).join('') : emptyState('No erase requests', isLead ? 'No keeper has asked to remove a timeline entry.' : 'You have not asked to erase any timeline entry.')}</div></section>` : '';
  $('#page-content').innerHTML = `
    <div class="page-header"><div class="page-header-copy"><span class="eyebrow">Hierarchy gate · ${queue.length} waiting${eraseRequests.length ? ` · ${eraseRequests.length} erase` : ''}</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(copy)}</p></div><div class="page-header-actions"><button class="button button-ghost" type="button" data-action="refresh">${icon('refresh')} Refresh queue</button></div></div>
    <div class="dashboard-grid"><section class="panel"><div class="panel-header"><div><span class="eyebrow">Incoming transmissions</span><h2 class="panel-title">Review in context.</h2><p class="panel-subtitle">Open the account timeline if you need the full story before deciding.</p></div></div><div class="review-list">${queue.length ? queue.map(reviewCard).join('') : emptyState('The gate is clear', 'New updates from the field will land here automatically.')}</div></section><div class="dashboard-stack"><section class="route-card"><span class="eyebrow">Authority map</span><h3>Review, then release.</h3><p>Every note keeps its author and review state in the timeline, so accountability stays visible.</p><div class="route-line"><span class="route-node">S</span><span class="route-arrow"></span><span class="route-node">A</span><span class="route-arrow"></span><span class="route-node route-node-red">W</span><span>Trusted history</span></div></section><section class="panel"><div class="panel-header"><div><span class="eyebrow">How it works</span><h2 class="panel-title">A simple field loop.</h2></div></div><div class="detail-panel"><div class="detail-list"><div class="detail-list-row"><span>01 · Field operator</span><strong>Logs the next move</strong></div><div class="detail-list-row"><span>02 · Review lead</span><strong>Checks context</strong></div><div class="detail-list-row"><span>03 · Watcher</span><strong>Sees the whole mission</strong></div></div></div></section></div></div>
    ${eraseSection}`;
  hydrateIcons($('#page-content'));
}

function renderTeam() {
  const team = state.dashboard?.team || [];
  $('#page-content').innerHTML = `
    <div class="page-header"><div class="page-header-copy"><span class="eyebrow">The roster · ${team.length} operators</span><h1>Team roster.</h1><p>Clear ownership keeps the account timeline calm: the field moves, the review gate protects, and the Watcher sees everything.</p></div></div>
    <div class="team-grid">${team.map(teamCard).join('')}</div>
    ${passwordResetPanel()}
    <section class="panel" style="margin-top:18px"><div class="panel-header"><div><span class="eyebrow">Operating hierarchy</span><h2 class="panel-title">The Watcher model.</h2><p class="panel-subtitle">A lightweight process that keeps autonomy and accountability in the same room.</p></div></div><div class="detail-panel"><div class="detail-list"><div class="detail-list-row"><span>Samriddhi + Renuja</span><strong>Handle assigned accounts and submit updates for review</strong></div><div class="detail-list-row"><span>Apeksha</span><strong>Reviews field updates and keeps the senior quality bar</strong></div><div class="detail-list-row"><span>Sanskar</span><strong>Watches the full presales portfolio and owns final visibility</strong></div></div></div></section>`;
  hydrateIcons($('#page-content'));
}

function passwordResetPanel() {
  if (state.user?.role !== 'lead') return '';
  const resets = state.passwordResets || [];
  const rows = resets.length
    ? resets.map((reset) => `<div class="reset-row">
        <div class="reset-identity"><strong>${escapeHtml(reset.name)}</strong><span>${escapeHtml(reset.email)}</span></div>
        <div class="reset-delivery"><span class="reset-channel ${reset.delivery === 'email' ? 'is-email' : 'is-handover'}">${reset.delivery === 'email' ? 'emailed' : 'handover'}</span></div>
        <div class="reset-code">${reset.code
          ? `<code>${escapeHtml(reset.code)}</code><button class="button button-ghost button-small" type="button" data-action="copy-reset-code" data-reset-id="${reset.id}">Copy</button>`
          : '<span class="reset-pending">check their inbox</span>'}</div>
        <div class="reset-expiry">expires ${new Date(reset.expiresAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
      </div>`).join('')
    : '<p class="reset-empty">No one is waiting on a passcode reset right now.</p>';
  return `<section class="panel reset-panel"><div class="panel-header"><div><span class="eyebrow">Lead only</span><h2 class="panel-title">Passcode resets.</h2>`
    + `<p class="panel-subtitle">${resets.length ? 'Hand the code over privately. It works once and then expires.' : 'Requests appear here the moment someone asks for one.'}</p></div>`
    + `<button class="button button-ghost" type="button" data-action="refresh">Refresh</button></div>${rows}</section>`;
}

function teamCard(member) {
  const variant = member.role === 'lead' ? 'lead' : member.role === 'reviewer' ? 'reviewer' : 'contributor';
  return `<article class="team-card team-card--${variant}"><div class="team-card-top">${avatarHtml(member)}<span class="team-card-role">${escapeHtml(member.role === 'lead' ? 'Watcher' : member.role === 'reviewer' ? 'Review gate' : 'Field operator')}</span></div><h3>${escapeHtml(member.name)}</h3><div class="team-card-title">${escapeHtml(member.title)}</div><div class="team-metrics"><div class="team-metric"><strong>${member.ownedAccounts}</strong><span>owned</span></div><div class="team-metric"><strong>${member.pendingUpdates}</strong><span>pending</span></div><div class="team-metric"><strong>${member.approvedUpdates}</strong><span>approved</span></div></div></article>`;
}

function timelineEvents() {
  return Array.isArray(state.timeline) ? state.timeline : [];
}

function timelineAccountLookup() {
  return new Map((state.dashboard?.accounts || []).map((account) => [Number(account.id), account]));
}

function timelineAccountOwnerId(update) {
  return timelineAccountLookup().get(Number(update.accountId))?.ownerId || update.authorId;
}

function timelineGroupRank(userId) {
  return { sam: 0, renuja: 1, apeksha: 2 }[userId] ?? 3;
}

function timelineVisibleEvents() {
  const query = state.timelineAccount === 'all' ? '' : Number(state.timelineAccount);
  return timelineEvents()
    .filter((update) => state.timelineGroup === 'all' || timelineAccountOwnerId(update) === state.timelineGroup)
    .filter((update) => !query || Number(update.accountId) === query)
    .sort((left, right) => new Date(left.occurredAt) - new Date(right.occurredAt));
}

function timelineGroupUsers(events) {
  const users = state.dashboard?.users || [];
  const ownerIds = new Set(events.map(timelineAccountOwnerId));
  if (state.timelineGroup !== 'all') ownerIds.add(state.timelineGroup);
  return users
    .filter((user) => user.role !== 'lead' && ownerIds.has(user.id))
    .sort((left, right) => timelineGroupRank(left.id) - timelineGroupRank(right.id) || left.name.localeCompare(right.name));
}

function timelineVisibleAccounts(events) {
  const accounts = state.dashboard?.accounts || [];
  const scopedAccounts = accounts.filter((account) => state.timelineGroup === 'all' || account.ownerId === state.timelineGroup);
  if (state.timelineScope === 'global') return scopedAccounts;
  const eventAccountIds = new Set(events.map((update) => Number(update.accountId)));
  return scopedAccounts.filter((account) => eventAccountIds.has(Number(account.id)) || account.ownerId === state.user?.id || account.isMember);
}

function timelineStreams(accounts, events) {
  return accounts
    .map((account) => ({ account, events: events.filter((update) => Number(update.accountId) === Number(account.id)) }))
    .sort((left, right) => timelineGroupRank(left.account.ownerId) - timelineGroupRank(right.account.ownerId) || left.account.name.localeCompare(right.account.name));
}

function timelineSignalChip(update) {
  const signal = signalType(update);
  return `<span class="signal-chip signal-chip-${signal}">${icon(signalIcon(signal))}${escapeHtml(signalLabel(signal))}</span>`;
}

function timelineGroupUsersLabel(user) {
  if (user.role === 'lead') return 'Watcher';
  return firstName(user.name) || user.name;
}

function timelineIsIssue(update) {
  return ['issue', 'roadblock'].includes(signalType(update));
}

function timelineIsResolution(update, issueId) {
  if (issueId && Number(update.correctsUpdateId) === Number(issueId)) return true;
  return signalType(update) === 'resolution' || /resolved|resolution|rejoin|re-join|unblocked|back on track|cleared/i.test(String(update.body || ''));
}

function timelineBranchModels(stream) {
  const sorted = stream.events.slice().sort((left, right) => new Date(left.occurredAt) - new Date(right.occurredAt));
  const branches = [];
  sorted.forEach((issue, issueIndex) => {
    if (!timelineIsIssue(issue)) return;
    const nextIssueIndex = sorted.findIndex((candidate, candidateIndex) => candidateIndex > issueIndex && timelineIsIssue(candidate));
    const endIndex = nextIssueIndex === -1 ? sorted.length : nextIssueIndex;
    const resolutionIndex = sorted.findIndex((candidate, candidateIndex) => candidateIndex > issueIndex && candidateIndex < endIndex && timelineIsResolution(candidate, issue.id));
    const resolution = resolutionIndex === -1 ? null : sorted[resolutionIndex];
    const related = sorted
      .slice(issueIndex + 1, resolutionIndex === -1 ? endIndex : resolutionIndex + 1)
      .filter((event) => event.id !== issue.id && (timelineIsResolution(event, issue.id) || ['task', 'roadblock', 'meeting', 'milestone'].includes(signalType(event))));
    branches.push({ issue, resolution, related, open: !resolution });
  });
  return branches;
}

function timelineStreamStatus(stream) {
  const branches = timelineBranchModels(stream);
  const openBranches = branches.filter((branch) => branch.open).length;
  const resolvedBranches = branches.length - openBranches;
  const status = openBranches ? 'blocked' : resolvedBranches ? 'rejoined' : 'flowing';
  const label = status === 'blocked' ? 'Branch open' : status === 'rejoined' ? 'Rejoined' : 'Flowing';
  return { branches, openBranches, resolvedBranches, status, label };
}

function timelineTruncate(value, length = 28) {
  const text = String(value || '');
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

const TVA_PLOT = { left: 330, right: 1440 };
// The trunk must terminate exactly where the convergence bundle begins, otherwise a
// visible gap opens up between the account line and the owner bundle.
const TVA_TRUNK_END = TVA_PLOT.right;
const TVA_BUNDLE_START = TVA_TRUNK_END;
const TVA_TRUNK_OFFSET = 34;
const TVA_ROW_BASE = 76;
const TVA_LANE_START = 26;
const TVA_LANE_GAP = 21;
const TVA_NODE_GAP = 30;
const TVA_BRANCH_RADIUS = 9;

function timelineStreamHeight(branchCount) {
  return TVA_ROW_BASE + Math.max(0, branchCount - 1) * TVA_LANE_GAP;
}

function timelineLaneOffset(branchIndex) {
  return TVA_LANE_START + branchIndex * TVA_LANE_GAP;
}

function timelineTimeValue(event) {
  const parsed = new Date(event.occurredAt).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

function timelinePlotX(value, minimum, span) {
  const usable = TVA_PLOT.right - TVA_PLOT.left;
  const clamped = Math.max(minimum, Math.min(minimum + span, value));
  return TVA_PLOT.left + ((clamped - minimum) / span) * usable;
}

function timelineEventPositions(events, minimum, maximum) {
  const span = maximum - minimum || 24 * 60 * 60 * 1000;
  const buckets = new Map();
  events.forEach((event) => {
    const time = timelineTimeValue(event);
    const key = time === null ? minimum : time;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(event);
  });
  const keys = Array.from(buckets.keys()).sort((left, right) => left - right);
  const xs = keys.map((key) => timelinePlotX(key, minimum, span));
  for (let index = 1; index < xs.length; index += 1) {
    if (xs[index] - xs[index - 1] < TVA_NODE_GAP) xs[index] = xs[index - 1] + TVA_NODE_GAP;
  }
  const overflow = xs.length ? xs[xs.length - 1] - TVA_PLOT.right : 0;
  const corrected = overflow > 0 ? xs.map((x) => x - overflow) : xs;
  const byKey = new Map(keys.map((key, index) => [key, corrected[index]]));
  const positions = new Map();
  buckets.forEach((bucket, key) => {
    bucket.forEach((event, index) => {
      const base = byKey.get(key) ?? TVA_PLOT.left;
      const stagger = (bucket.length - 1) * 6;
      positions.set(event.id, base + index * 12 - stagger);
    });
  });
  return positions;
}

function timelineTrunkPath(y, startX, endX) {
  return `M ${startX} ${y} L ${endX} ${y}`;
}

function timelineBranchPath(issueX, joinX, y, laneY) {
  const radius = Math.min(TVA_BRANCH_RADIUS, Math.max(4, (joinX - issueX) / 2));
  return `M ${issueX} ${y}`
    + ` L ${issueX} ${laneY + radius}`
    + ` Q ${issueX} ${laneY} ${issueX + radius} ${laneY}`
    + ` L ${joinX - radius} ${laneY}`
    + ` Q ${joinX} ${laneY} ${joinX} ${laneY + radius}`
    + ` L ${joinX} ${y}`;
}

function timelineOpenBranchPath(issueX, endX, y, laneY) {
  const radius = Math.min(TVA_BRANCH_RADIUS, Math.max(4, (endX - issueX) / 2));
  return `M ${issueX} ${y}`
    + ` L ${issueX} ${laneY + radius}`
    + ` Q ${issueX} ${laneY} ${issueX + radius} ${laneY}`
    + ` L ${endX} ${laneY}`;
}

function timelineNodeTitle(event) {
  return `${event.accountName} · ${event.authorName} · ${typeLabel(event.type)}\n${event.body}`;
}

function timelineStreamMarkup(stream, config) {
  const { positions, minimum, span, nowX, layout, streamIndex } = config;
  const y = layout.trunkY;
  const variant = ['red', 'blue', 'violet', 'gold', 'green'][streamIndex % 5];
  const branches = timelineBranchModels(stream);
  const openBranches = branches.filter((branch) => branch.open);
  const railEnd = TVA_TRUNK_END;
  const trunk = timelineTrunkPath(y, TVA_PLOT.left, railEnd);
  const capX = Math.min(nowX, TVA_PLOT.right - 4);
  const branchMarkup = branches.map((branch, branchIndex) => {
    const issueX = Math.max(TVA_PLOT.left, positions.get(branch.issue.id) ?? TVA_PLOT.left);
    const hasResolution = Boolean(branch.resolution);
    const resolutionX = hasResolution ? Math.max(issueX + TVA_NODE_GAP + 8, positions.get(branch.resolution.id) ?? issueX) : null;
    const laneY = y + timelineLaneOffset(branchIndex);
    const openEndX = Math.max(issueX + 40, capX);
    const path = hasResolution
      ? timelineBranchPath(issueX, resolutionX, y, laneY)
      : timelineOpenBranchPath(issueX, openEndX, y, laneY);
    const label = `${typeLabel(branch.issue.type)} · ${hasResolution ? 'rejoined' : 'open'}`;
    const labelX = Math.max(issueX + 14, Math.min(issueX + 46, TVA_PLOT.right - 176));
    const labelWidth = Math.max(96, Math.min(168, (resolutionX || nowX) - labelX - 14));
    const related = branch.related
      .filter((event) => event.id !== branch.resolution?.id && positions.has(event.id))
      .filter((event) => timelineTimeValue(event) >= timelineTimeValue(branch.issue))
      .map((event) => {
        const eventX = Math.max(issueX + TVA_NODE_GAP, Math.min((resolutionX || nowX) - 8, positions.get(event.id)));
        const title = timelineNodeTitle(event);
        return `<g class="tva-branch-node" data-action="open-account" data-account-id="${event.accountId}" tabindex="0" role="button" aria-label="${escapeHtml(timelineTruncate(title, 120))}"><title>${escapeHtml(title)}</title><rect x="${eventX - 5}" y="${laneY - 5}" width="10" height="10" rx="3"></rect></g>`;
      })
      .join('');
    const cap = hasResolution
      ? `<g class="tva-rejoin-node" data-action="open-account" data-account-id="${branch.resolution.accountId}" tabindex="0" role="button" aria-label="Resolution and rejoin"><title>Rejoined · ${escapeHtml(timelineTruncate(branch.resolution.body, 90))}</title><circle class="tva-rejoin-halo" cx="${resolutionX}" cy="${y}" r="11"></circle><circle class="tva-rejoin-core" cx="${resolutionX}" cy="${y}" r="6.5"></circle></g>`
      : `<g class="tva-open-branch-end"><line x1="${openEndX}" y1="${laneY - 13}" x2="${openEndX}" y2="${laneY + 5}"></line><text x="${openEndX + 7}" y="${laneY + 4}">OPEN</text></g>`;
    return `<g class="tva-branch ${hasResolution ? 'is-resolved' : 'is-open'}"><path class="tva-branch-path" d="${path}"></path><rect class="tva-branch-label-bg" x="${labelX}" y="${laneY - 11}" width="${labelWidth}" height="22" rx="11"></rect><text class="tva-branch-label" x="${labelX + 10}" y="${laneY + 4}">${escapeHtml(timelineTruncate(label, 24))}</text>${related}${cap}</g>`;
  }).join('');
  const nodeMarkup = stream.events
    .filter((event) => positions.has(event.id))
    .map((event) => {
      const x = positions.get(event.id);
      const warning = timelineIsIssue(event);
      const resolution = timelineIsResolution(event);
      const correction = event.type === 'correction';
      const title = timelineNodeTitle(event);
      const mark = warning ? `<text class="tva-node-mark" x="${x}" y="${y + 4}" text-anchor="middle">!</text>` : resolution ? `<path class="tva-node-check" d="M ${x - 4.5} ${y} l 3 3.5 l 6.5 -8"></path>` : correction ? `<path class="tva-node-spark" d="M ${x} ${y - 5} l 1.6 3.4 l 3.4 1.6 l -3.4 1.6 l -1.6 3.4 l -1.6 -3.4 l -3.4 -1.6 l 3.4 -1.6 z"></path>` : '';
      return `<g class="tva-stream-node ${warning ? 'is-issue' : ''} ${resolution ? 'is-resolution' : ''} ${correction ? 'is-correction' : ''}" data-action="open-account" data-account-id="${event.accountId}" tabindex="0" role="button" aria-label="${escapeHtml(timelineTruncate(title, 120))}"><title>${escapeHtml(title)}</title><circle class="tva-node-halo" cx="${x}" cy="${y}" r="12"></circle><circle class="tva-node-core signal-node-${event.type}" cx="${x}" cy="${y}" r="6.5"></circle>${mark}</g>`;
    })
    .join('');
  const startCap = `<circle class="tva-trunk-start" cx="${TVA_PLOT.left}" cy="${y}" r="5"></circle>`;
  const statusLabel = openBranches.length
    ? `${openBranches.length} open`
    : branches.length
      ? 'rejoined'
      : 'flowing';
  return `<g class="tva-stream tva-stream-${variant}">`
    + `<rect class="tva-stream-row-bg" x="0" y="${layout.rowTop + 2}" width="${TVA_PLOT.right + 22}" height="${layout.height - 12}" rx="12"></rect>`
    + `<text class="tva-stream-label" x="18" y="${y - 4}">${escapeHtml(timelineTruncate(stream.account.name, 22))}</text>`
    + `<text class="tva-stream-owner" x="18" y="${y + 15}">${escapeHtml(firstName(stream.account.ownerName) || stream.account.ownerName)} · ${stream.events.length} events</text>`
    + `<text class="tva-stream-flow-state ${openBranches.length ? 'is-open' : ''}" x="${TVA_PLOT.left - 14}" y="${y - 22}">${escapeHtml(statusLabel)}</text>`
    + `<path class="tva-stream-path" d="${trunk}"></path>${startCap}${branchMarkup}${nodeMarkup}`
    + `</g>`;
}

function timelineAxisTicks(minimum, maximum) {
  const span = maximum - minimum || 24 * 60 * 60 * 1000;
  const count = Math.max(2, Math.min(7, Math.round(span / (7 * 24 * 60 * 60 * 1000)) + 2));
  return Array.from({ length: count }, (_, index) => minimum + (span * index) / (count - 1));
}

function timelineMap(events, accounts, groups) {
  const streams = timelineStreams(accounts, events);
  const groupedStreams = groups
    .map((user) => ({ user, streams: streams.filter((stream) => stream.account.ownerId === user.id) }))
    .filter((group) => group.streams.length);
  if (!groupedStreams.length) return `<div class="tva-map-empty">No account streams are visible in this scope.</div>`;

  const width = 1980;
  const groupHeader = 52;
  const groupGap = 22;
  const convergenceX = TVA_BUNDLE_START + 40;
  const junctionX = convergenceX + 74;
  const masterStart = junctionX + 78;
  const masterEnd = width - 42;
  const top = 96;

  const times = events.map(timelineTimeValue).filter((value) => value !== null);
  const minimum = times.length ? Math.min(...times) : Date.now();
  const maximum = times.length ? Math.max(...times) : minimum;
  const span = maximum - minimum || 24 * 60 * 60 * 1000;
  const positions = timelineEventPositions(events, minimum, maximum);
  const nowX = timelinePlotX(Date.now(), minimum, span);

  let cursor = top;
  const layouts = groupedStreams.map((group) => {
    const groupTop = cursor;
    let streamCursor = groupTop + groupHeader;
    const streamLayouts = group.streams.map((stream) => {
      const height = timelineStreamHeight(timelineBranchModels(stream).length);
      const layout = { rowTop: streamCursor, height, trunkY: streamCursor + TVA_TRUNK_OFFSET };
      streamCursor += height;
      return layout;
    });
    const groupHeight = groupHeader + (streamCursor - (groupTop + groupHeader));
    cursor += groupHeight + groupGap;
    return { ...group, groupTop, groupHeight, streamLayouts };
  });
  const masterY = cursor + 84;
  const height = masterY + 128;
  const plotBottom = cursor + 12;

  const ticks = timelineAxisTicks(minimum, maximum);
  const gridMarkup = ticks.map((value) => {
    const x = timelinePlotX(value, minimum, span);
    const label = new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `<line class="tva-flow-gridline" x1="${x}" y1="${top - 46}" x2="${x}" y2="${plotBottom}"></line><text class="tva-flow-axis-label" x="${x}" y="${top - 54}" text-anchor="middle">${escapeHtml(label)}</text>`;
  }).join('');
  const nowMarkup = nowX <= TVA_PLOT.right + 10
    ? `<line class="tva-flow-nowline" x1="${nowX}" y1="${top - 46}" x2="${nowX}" y2="${plotBottom}"></line><text class="tva-flow-nowlabel" x="${nowX + 7}" y="${top - 54}">NOW</text>`
    : '';
  const axisLine = `<line class="tva-flow-axis" x1="${TVA_PLOT.left}" y1="${top - 46}" x2="${TVA_PLOT.right}" y2="${top - 46}"></line>`;

  const groupMarkup = layouts.map((layout) => {
    const accent = cleanClass(layout.user.accent || 'red');
    const branches = layout.streams.flatMap((stream) => timelineBranchModels(stream));
    const openBranches = branches.filter((branch) => branch.open).length;
    const resolvedBranches = branches.length - openBranches;
    const firstY = layout.streamLayouts[0].trunkY;
    const lastY = layout.streamLayouts[layout.streamLayouts.length - 1].trunkY;
    const junctionY = layout.streamLayouts.length === 1 ? firstY : firstY + (lastY - firstY) / 2;
    const accountMarkup = layout.streams
      .map((stream, index) => timelineStreamMarkup(stream, { positions, minimum, span, nowX, layout: layout.streamLayouts[index], streamIndex: index }))
      .join('');
    const bundleMarkup = layout.streams
      .map((stream, index) => {
        const y = layout.streamLayouts[index].trunkY;
        return `<path class="tva-group-bundle" d="M ${TVA_BUNDLE_START} ${y} C ${convergenceX} ${y}, ${junctionX - 40} ${junctionY}, ${junctionX} ${junctionY}"></path>`;
      })
      .join('');
    const status = openBranches ? `${openBranches} open branch${openBranches === 1 ? '' : 'es'}` : resolvedBranches ? `${resolvedBranches} rejoined` : 'flowing';
    return `<g class="tva-stream-group tva-group-${accent}">`
      + `<rect class="tva-group-background" x="0" y="${layout.groupTop}" width="${masterStart - 26}" height="${layout.groupHeight}" rx="16"></rect>`
      + `<text class="tva-group-title" x="18" y="${layout.groupTop + 31}">${escapeHtml(timelineGroupUsersLabel(layout.user).toUpperCase())} STREAMS</text>`
      + `<text class="tva-group-meta" x="200" y="${layout.groupTop + 31}">${layout.streams.length} account${layout.streams.length === 1 ? '' : 's'}</text>`
      + `<text class="tva-group-status ${openBranches ? 'has-warning' : ''}" x="${masterStart - 42}" y="${layout.groupTop + 31}" text-anchor="end">${escapeHtml(status)}</text>`
      + accountMarkup
      + bundleMarkup
      + `<path class="tva-group-output" d="M ${junctionX} ${junctionY} C ${junctionX + 34} ${junctionY}, ${masterStart - 52} ${masterY}, ${masterStart} ${masterY}"></path>`
      + `<circle class="tva-group-junction ${openBranches ? 'is-blocked' : 'is-flowing'}" cx="${junctionX}" cy="${junctionY}" r="8"></circle>`
      + `</g>`;
  }).join('');

  const allBranches = groupedStreams.flatMap((group) => group.streams.flatMap((stream) => timelineBranchModels(stream)));
  const openBranches = allBranches.filter((branch) => branch.open).length;
  const resolvedBranches = allBranches.length - openBranches;
  const masterStatus = openBranches
    ? `${openBranches} branch${openBranches === 1 ? '' : 'es'} blocking convergence`
    : resolvedBranches
      ? `${resolvedBranches} branch${resolvedBranches === 1 ? '' : 'es'} rejoined · flow restored`
      : 'All account streams converging';
  const masterMarkup = `<g class="tva-master-flow">`
    + `<rect class="tva-master-background" x="${masterStart - 14}" y="${masterY - 70}" width="${masterEnd - masterStart + 28}" height="140" rx="18"></rect>`
    + `<text class="tva-master-kicker" x="${masterStart + 4}" y="${masterY - 38}">MASTER TIMELINE</text>`
    + `<text class="tva-master-status ${openBranches ? 'has-warning' : ''}" x="${masterStart + 4}" y="${masterY - 14}">${escapeHtml(masterStatus)}</text>`
    + `<path class="tva-master-path" d="M ${masterStart + 4} ${masterY + 34} L ${masterEnd - 26} ${masterY + 34}" marker-end="url(#tva-master-arrow)"></path>`
    + `<circle class="tva-master-node" cx="${masterStart + 4}" cy="${masterY + 34}" r="9"></circle>`
    + `</g>`;

  return `<div class="tva-map-scroll tva-flow-map"><svg class="tva-map-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Account streams branching and converging into the Master Timeline"><title>Account streams, branches, and Master Timeline</title><desc>Each account keeps a straight timeline. An issue drops the path onto its own branch rail, follow-up work runs along that rail, and a resolution lifts the rail back into the main flow before the streams converge into the Master Timeline.</desc><defs><marker id="tva-master-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker></defs>${axisLine}${gridMarkup}${nowMarkup}${groupMarkup}${masterMarkup}</svg></div>`;
}
function timelineEventCard(update) {
  const signal = signalType(update);
  const canEdit = canEditTimelineAccount(update.accountId);
  const isLead = state.user?.role === 'lead';
  const isCorrection = update.type === 'correction' || Boolean(update.correctsUpdateId);
  const tools = canEdit && !isCorrection ? `<span class="tva-event-card-tools"><button class="button button-ghost" type="button" data-action="correct" data-account-id="${update.accountId}" data-update-id="${update.id}">${icon('check-circle')} Fix</button><button class="button button-ghost button-ghost-danger" type="button" data-action="erase" data-update-id="${update.id}">${icon('trash')} ${isLead ? 'Erase' : 'Request erase'}</button></span>` : '';
  return `<div class="tva-event-card-wrap"><button class="tva-event-card" type="button" data-action="open-account" data-account-id="${update.accountId}"><span class="tva-event-card-top">${timelineSignalChip(update)}<span class="timeline-date">${escapeHtml(formatDate(update.occurredAt))}</span></span><strong>${escapeHtml(update.accountName)}</strong><p>${escapeHtml(update.body)}</p><span class="tva-event-card-owner">${avatarHtml(update, 'avatar-small')} ${escapeHtml(update.authorName)} · ${escapeHtml(update.reviewerName ? `review ${update.reviewerName}` : update.reviewStatus === 'approved' ? 'trusted history' : 'in review')}</span></button>${tools}</div>`;
}

function timelineAccountCard(stream) {
  const status = timelineStreamStatus(stream);
  const signals = stream.events.filter((event) => ['task', 'issue', 'roadblock'].includes(signalType(event))).length;
  return `<button class="tva-account-card ${status.status}" type="button" data-action="open-account" data-account-id="${stream.account.id}"><span class="tva-account-card-top"><span class="account-mark">${escapeHtml(initials(stream.account.name))}</span><span class="tva-account-card-title"><strong>${escapeHtml(stream.account.name)}</strong><small>${escapeHtml(stream.account.partner)}</small></span><span class="tva-stream-status ${status.status}">${escapeHtml(status.label)}</span></span><span class="tva-account-card-meta"><span>${stream.events.length} timeline event${stream.events.length === 1 ? '' : 's'}</span><span>${signals} signal${signals === 1 ? '' : 's'}</span></span><span class="tva-account-card-owner">${escapeHtml(firstName(stream.account.ownerName) || stream.account.ownerName)} · ${status.openBranches ? `${status.openBranches} open branch${status.openBranches === 1 ? '' : 'es'}` : status.resolvedBranches ? 'branch rejoined' : 'normal flow'}</span></button>`;
}

function canEditTimelineAccount(accountId) {
  if (state.user?.role === 'lead') return true;
  const account = timelineAccountLookup().get(Number(accountId));
  return Boolean(account && (account.ownerId === state.user?.id || account.isMember));
}

function timelineBranchCard(branch) {
  const signal = signalType(branch.issue);
  const relatedCount = branch.related.filter((event) => event.id !== branch.resolution?.id).length;
  const canFix = branch.open && canEditTimelineAccount(branch.issue.accountId);
  const fix = canFix ? `<span class="tva-branch-card-actions"><button class="button button-ghost" type="button" data-action="correct" data-account-id="${branch.issue.accountId}" data-update-id="${branch.issue.id}">${icon('check-circle')} Fix deviation</button></span>` : '';
  return `<article class="tva-branch-card ${branch.open ? 'is-open' : 'is-resolved'}"><button class="tva-branch-card-open" type="button" data-action="open-account" data-account-id="${branch.issue.accountId}"><span class="tva-branch-card-top"><span class="signal-chip signal-chip-${signal}">${icon(signalIcon(signal))}${escapeHtml(signalLabel(signal))}</span><span class="tva-branch-state">${branch.open ? 'Needs resolution' : 'Rejoined'}</span></span><strong>${escapeHtml(branch.issue.accountName)}</strong><p>${escapeHtml(timelineTruncate(branch.issue.body, 110))}</p><span class="tva-branch-card-meta">${relatedCount ? `${relatedCount} follow-up event${relatedCount === 1 ? '' : 's'}` : branch.open ? 'No resolution logged yet' : 'Resolution logged'} · ${escapeHtml(formatDate(branch.issue.occurredAt))}</span></button>${fix}</article>`;
}

function timelineGroupSummary(group, streams) {
  const branches = streams.flatMap((stream) => timelineBranchModels(stream));
  const openBranches = branches.filter((branch) => branch.open).length;
  const resolvedBranches = branches.length - openBranches;
  return `<article class="tva-master-group-card ${openBranches ? 'is-blocked' : 'is-flowing'}"><div class="tva-master-group-top"><span class="tva-master-group-mark tva-group-${cleanClass(group.accent || 'red')}">${escapeHtml(timelineGroupUsersLabel(group).slice(0, 1))}</span><div><span class="eyebrow">${escapeHtml(timelineGroupUsersLabel(group))} streams</span><strong>${openBranches ? `${openBranches} blocking branch${openBranches === 1 ? '' : 'es'}` : resolvedBranches ? `${resolvedBranches} rejoined` : 'Flowing cleanly'}</strong></div></div><div class="tva-master-group-bottom"><span>${streams.length} accounts</span><span>${openBranches ? 'Needs Watcher attention' : 'Moving to convergence'}</span></div></article>`;
}

function renderTimeline() {
  if (state.timelineLoading && !state.timeline.length) return renderLoading('Aligning the account streams');
  const events = timelineVisibleEvents();
  const groups = timelineGroupUsers(events);
  const accounts = timelineVisibleAccounts(events);
  if (state.timelineAccount !== 'all' && !accounts.some((account) => String(account.id) === String(state.timelineAccount))) state.timelineAccount = 'all';
  const streams = timelineStreams(accounts, events);
  const branches = streams.flatMap((stream) => timelineBranchModels(stream).map((branch) => ({ ...branch, stream })));
  const openBranches = branches.filter((branch) => branch.open).length;
  const resolvedBranches = branches.length - openBranches;
  const blockedStreams = streams.filter((stream) => timelineStreamStatus(stream).status === 'blocked').length;
  const signalCount = events.filter((event) => ['task', 'issue', 'roadblock'].includes(signalType(event))).length;
  const resolutionCount = events.filter((event) => timelineIsResolution(event)).length;
  const accountOptions = accounts.map((account) => `<option value="${account.id}" ${String(state.timelineAccount) === String(account.id) ? 'selected' : ''}>${escapeHtml(account.name)}</option>`).join('');
  const groupOptions = [{ id: 'all', name: 'All streams', initials: 'Σ' }, ...groups].map((group) => `<button class="tva-lane-chip ${state.timelineGroup === group.id ? 'is-active' : ''}" type="button" data-timeline-group="${group.id}">${group.id === 'all' ? '<span class="tva-lane-chip-mark">Σ</span>' : avatarHtml(group, 'avatar-small')}<span>${escapeHtml(group.id === 'all' ? 'All streams' : timelineGroupUsersLabel(group))}</span></button>`).join('');
  const isGlobal = state.timelineScope === 'global';
  const selectedGroup = state.timelineGroup === 'all' ? 'all keeper streams' : `${timelineGroupUsersLabel(groups.find((group) => group.id === state.timelineGroup) || { name: state.timelineGroup })} streams`;
  const scopeTitle = isGlobal ? 'Global Watcher.' : `${firstName(state.user?.name) || 'Your'} stream map.`;
  const scopeCopy = isGlobal ? 'The Watcher sees the whole convergence: normal streams, open branches, and the Master Timeline outcome.' : 'Your account streams stay independent while their progress, branches, and rejoins remain legible.';
  const accountCards = streams.length ? streams.map(timelineAccountCard).join('') : emptyState('No account streams yet', 'Log a task, issue, or resolution to light up the first journey.');
  const branchCards = branches.length ? branches.slice(0, 12).map(timelineBranchCard).join('') : emptyState('No branches detected', 'Every visible account stream is following its normal path.');
  const eventCards = events.length ? events.slice().reverse().slice(0, 12).map(timelineEventCard).join('') : emptyState('No signals in this scope', 'Switch to the Global Watcher or add the first account signal.');
  const groupSummaries = groups.map((group) => timelineGroupSummary(group, streams.filter((stream) => stream.account.ownerId === group.id))).join('');
  $('#page-content').innerHTML = `
    <div class="page-header">
      <div class="page-header-copy"><span class="eyebrow">Account streams · ${streams.length} journeys · ${events.length} events</span><h1>Every account has a flow.</h1><p>${escapeHtml(scopeCopy)}</p></div>
      <div class="page-header-actions"><button class="button button-primary" type="button" data-action="new-signal" ${accounts.length ? '' : 'disabled'}>${icon('plus')} Add signal</button></div>
    </div>
    <section class="tva-sacred-banner"><div><span class="eyebrow">Sacred timeline · ${escapeHtml(selectedGroup)}</span><h2>${escapeHtml(scopeTitle)}</h2><p>Normal flow → issue branch → work → resolution → rejoin → Master Timeline.</p></div><div class="tva-sacred-mark"><span>W</span><i></i></div></section>
    <section class="tva-command-bar" aria-label="Timeline controls"><div class="tva-scope-toggle"><button type="button" data-timeline-scope="account" class="${!isGlobal ? 'is-active' : ''}">My streams</button><button type="button" data-timeline-scope="global" class="${isGlobal ? 'is-active' : ''}">Global Watcher</button></div><label class="tva-account-select"><span>Account focus</span><select id="timeline-account-filter"><option value="all">All accounts</option>${accountOptions}</select></label><div class="tva-lane-filter"><span>Stream owner</span><div class="tva-lane-chips">${groupOptions}</div></div></section>
    <section class="tva-stat-strip tva-stat-strip-five"><div><span>Account streams</span><strong>${streams.length}</strong></div><div><span>Visible events</span><strong>${events.length}</strong></div><div><span>Open branches</span><strong class="${openBranches ? 'has-warning' : ''}">${openBranches}</strong></div><div><span>Rejoined</span><strong>${resolvedBranches}</strong></div><div><span>Resolutions</span><strong>${resolutionCount}</strong></div></section>
    <section class="panel tva-map-panel"><div class="panel-header"><div><span class="eyebrow">Account streams → branches → Master Timeline</span><h2 class="panel-title">The convergence map.</h2><p class="panel-subtitle">Every account keeps its own identity. Issues divert the path; resolution brings it back into the shared flow.</p></div><div class="tva-legend"><span><i class="legend-dot legend-task"></i>Task</span><span><i class="legend-dot legend-issue"></i>Issue branch</span><span><i class="legend-dot legend-roadblock"></i>Roadblock</span><span><i class="legend-dot legend-resolution"></i>Rejoin</span></div></div>${timelineMap(events, accounts, groups)}</section>
    <section class="panel tva-master-summary"><div class="panel-header"><div><span class="eyebrow">Watcher lens</span><h2 class="panel-title">Where the flow is heading.</h2><p class="panel-subtitle">The Master Timeline summarizes the outcome without hiding the individual account stories.</p></div><span class="mono-label">${openBranches ? `${openBranches} blocking` : 'Converging'}</span></div><div class="tva-master-group-grid">${groupSummaries}</div></section>
    <div class="tva-story-grid"><section class="panel"><div class="panel-header"><div><span class="eyebrow">Account-wise view</span><h2 class="panel-title">Independent streams.</h2><p class="panel-subtitle">Each card is one account journey.</p></div><span class="mono-label">${streams.length} accounts</span></div><div class="tva-account-grid">${accountCards}</div></section><section class="panel"><div class="panel-header"><div><span class="eyebrow">Issue lifecycle</span><h2 class="panel-title">Branches and rejoins.</h2><p class="panel-subtitle">Open work stays visible until a resolution reconnects the path.</p></div><span class="mono-label">${branches.length} branches</span></div><div class="tva-branch-list">${branchCards}</div></section><section class="panel"><div class="panel-header"><div><span class="eyebrow">Signal queue</span><h2 class="panel-title">The next moves.</h2><p class="panel-subtitle">Tasks, issues, roadblocks, and resolutions stay attached to their stream.</p></div></div><div class="tva-event-list">${eventCards}</div></section></div>`;
  hydrateIcons($('#page-content'));
}

function renderAccountDetail() {
  const payload = state.account;
  if (!payload) return renderLoading();
  const account = payload.account;
  const updates = payload.updates || [];
  const erased = payload.erasedUpdates || [];
  const detailActions = payload.canEdit
    ? `<div class="detail-actions"><button class="button button-ghost" type="button" data-action="edit-account" data-account-id="${account.id}">${icon('edit')} Edit account</button><button class="button button-ghost" type="button" data-action="correct" data-account-id="${account.id}">${icon('check-circle')} Fix deviation</button><button class="button button-primary" type="button" data-action="new-update" data-account-id="${account.id}">${icon('plus')} Log timeline update</button></div>`
    : '';
  const eraseLog = erased.length
    ? `<section class="panel detail-panel"><div class="panel-header" style="padding:0 0 14px"><div><span class="eyebrow">Erase log · ${erased.length}</span><h2 class="panel-title">What left the record.</h2></div></div><div class="erased-log">${erased.map((entry) => `<div class="erased-log-item"><strong>${escapeHtml(entry.authorName)} · ${escapeHtml(typeLabel(entry.type))}</strong><p>${escapeHtml(timelineTruncate(entry.body, 96))}</p><small>erased by ${escapeHtml(entry.erasedByName)} · ${escapeHtml(formatTimeAgo(entry.erasedAt))}${entry.requestedByName ? ` · asked by ${escapeHtml(entry.requestedByName)}` : ''}</small></div>`).join('')}</div></section>`
    : '';
  $('#page-content').innerHTML = `
    <button class="back-link" type="button" data-route="accounts">${icon('arrow-left')} Back to account index</button>
    <div class="detail-header"><div><div class="detail-heading"><span class="account-mark">${escapeHtml(initials(account.name))}</span><div><h1>${escapeHtml(account.name)}</h1><p>${escapeHtml(account.partner)} · ${escapeHtml(stageLabel(account.stage))}${account.memberCount > 1 ? ` · ${account.memberCount} timeline keepers` : ''}</p></div></div></div>${detailActions}</div>
    <div class="detail-layout"><div class="detail-main">
      <section class="detail-summary"><div class="detail-summary-item"><span>Health signal</span><strong>${statusChip(account.health)}</strong></div><div class="detail-summary-item"><span>Current stage</span><strong>${escapeHtml(stageLabel(account.stage))}</strong></div><div class="detail-summary-item"><span>Next action</span><strong>${escapeHtml(account.nextAction || 'Confirm next milestone')}</strong></div></section>
      <section class="panel timeline-panel"><div class="panel-header"><div><span class="eyebrow">Account timeline</span><h2 class="panel-title">The line of play.</h2><p class="panel-subtitle">Every note stays attached to its author, date, and review state. Keepers can fix a deviation or ask the Watcher to erase an entry.</p></div><span class="mono-label">${updates.length} events</span></div>${updates.length ? `<div class="timeline-line">${updates.map(timelineEvent).join('')}</div>` : `<div class="timeline-empty">No timeline events yet. Log the first field update to start this account’s line.</div>`}</section>
    </div><div class="detail-side">
      <section class="panel detail-panel"><div class="panel-header" style="padding:0 0 14px"><div><span class="eyebrow">Account card</span><h2 class="panel-title">Mission details.</h2></div></div><div class="detail-list"><div class="detail-list-row"><span>Account owner</span><strong>${escapeHtml(account.ownerName)}</strong></div><div class="detail-list-row"><span>Next action date</span><strong>${escapeHtml(account.nextActionDate ? formatFullDate(account.nextActionDate) : 'Not set')}</strong></div><div class="detail-list-row"><span>Priority</span><strong>${escapeHtml(account.priority === 'normal' ? 'Standard' : account.priority)}</strong></div><div class="detail-list-row"><span>Source record</span><strong>${escapeHtml(account.sourceFile || 'Manual entry')}</strong></div></div></section>
      <section class="panel detail-panel"><div class="panel-header" style="padding:0 0 14px"><div><span class="eyebrow">Timeline keepers</span><h2 class="panel-title">Account crew.</h2></div></div><div class="member-list">${payload.members.map(memberItem).join('')}</div></section>
      ${eraseLog}
      ${routeCard(account)}
    </div></div>`;
  hydrateIcons($('#page-content'));
}

function timelineEvent(update) {
  const status = update.reviewStatus === 'approved' ? 'approved' : update.reviewStatus === 'changes_requested' ? 'changes' : update.reviewStatus === 'handoff' ? 'handoff' : 'pending';
  const note = update.reviewNote ? `<div class="timeline-review-note ${update.reviewStatus === 'approved' ? 'is-approved' : ''}">${icon(update.reviewStatus === 'approved' ? 'check-circle' : 'send')} <span>${escapeHtml(update.reviewNote)}</span></div>` : '';
  const editAction = update.authorId === state.user?.id && update.reviewStatus === 'changes_requested' ? `<div class="timeline-event-action"><button class="button button-danger" type="button" data-action="edit-update" data-update-id="${update.id}">${icon('edit')} Edit & resubmit</button></div>` : '';
  const pendingErase = update.deletionState === 'requested';
  const canEdit = Boolean(state.account?.canEdit);
  const isLead = state.user?.role === 'lead';
  const requesterOwnsRequest = pendingErase && (isLead || update.deletionRequestedBy === state.user?.id);
  const guard = `<article class="timeline-event timeline-event-${status} ${pendingErase ? 'is-erasing' : ''}">
    <div class="timeline-event-top"><div class="timeline-event-author">${avatarHtml(update, 'avatar-small')}<strong>${escapeHtml(update.authorName)}</strong><span class="timeline-type">${escapeHtml(typeLabel(update.type))}</span></div><span class="timeline-date">${escapeHtml(formatFullDate(update.occurredAt))}</span></div>
    <p class="timeline-event-body">${escapeHtml(update.body)}</p>`;
  if (pendingErase) {
    const cancel = requesterOwnsRequest ? `<button class="button button-ghost" type="button" data-action="cancel-erase" data-update-id="${update.id}">Cancel request</button>` : '';
    const decide = isLead ? `<button class="button button-ghost" type="button" data-action="erase-decision" data-decision="keep" data-update-id="${update.id}">${icon('check')} Keep entry</button><button class="button button-danger" type="button" data-action="erase-decision" data-decision="erase" data-update-id="${update.id}">${icon('trash')} Erase now</button>` : '';
    return `${guard}
    <div class="timeline-erase-state">${icon('trash')}<div><strong>Erase requested${update.deletionRequestedByName ? ` by ${escapeHtml(update.deletionRequestedByName)}` : ''}</strong><p>${escapeHtml(update.deletionReason || 'No reason given')}</p><small>${escapeHtml(formatTimeAgo(update.deletionRequestedAt))} · waiting on the Watcher</small></div><span class="timeline-erase-actions">${cancel}${decide}</span></div>
    ${note}</article>`;
  }
  const correct = canEdit ? `<button class="button button-ghost" type="button" data-action="correct" data-account-id="${update.accountId}" data-update-id="${update.id}">${icon('check-circle')} Fix deviation</button>` : '';
  const erase = canEdit ? `<button class="button button-ghost button-ghost-danger" type="button" data-action="erase" data-update-id="${update.id}">${icon('trash')} ${isLead ? 'Erase' : 'Request erase'}</button>` : '';
  const ownedActions = canEdit || editAction ? `<div class="timeline-event-action">${editAction ? `<div>${editAction}</div>` : ''}<div class="timeline-event-tools">${correct}${erase}</div></div>` : '';
  return `${guard}
    ${note}${ownedActions}</article>`;
}

function memberItem(member) {
  return `<div class="member-item">${avatarHtml(member, 'avatar-small')}<div class="member-item-copy"><strong>${escapeHtml(member.name)}</strong><span>${escapeHtml(member.title)}</span></div><span class="member-role">${escapeHtml(member.memberRole)}</span></div>`;
}

function routeCard(account) {
  const isLead = state.user?.role === 'lead';
  const isReviewer = state.user?.role === 'reviewer';
  const nodes = isLead ? '<span class="route-node route-node-red">W</span><span>Direct Watcher visibility</span>' : isReviewer ? '<span class="route-node">A</span><span class="route-arrow"></span><span class="route-node route-node-red">W</span><span>Lead review</span>' : '<span class="route-node">S</span><span class="route-arrow"></span><span class="route-node">A</span><span class="route-arrow"></span><span class="route-node route-node-red">W</span><span>Trusted history</span>';
  return `<section class="route-card"><span class="eyebrow">Review route</span><h3>${isLead ? 'You are the Watcher.' : isReviewer ? 'You guard the gate.' : 'Your update has a route.'}</h3><p>${isLead ? 'Approve or return any field update across the full mission.' : isReviewer ? 'Your review protects the senior quality bar before Sanskar sees the final picture.' : 'Your note is submitted to Apeksha first, then visible to the Watcher after review.'}</p><div class="route-line">${nodes}</div></section>`;
}

function openModal(content) {
  state.modal = content;
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-modal-close="true"><div class="modal" role="dialog" aria-modal="true">${content}</div></div>`;
  hydrateIcons($('#modal-root'));
  const firstInput = $('#modal-root input, #modal-root textarea, #modal-root select');
  setTimeout(() => firstInput?.focus(), 20);
}

function closeModal() {
  state.modal = null;
  $('#modal-root').innerHTML = '';
}

function modalHeader(kicker, title) {
  return `<div class="modal-header"><div><span class="eyebrow">${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2></div><button class="icon-button" type="button" data-action="close-modal" aria-label="Close dialog">${icon('x')}</button></div>`;
}

function openPasswordResetModal() {
  openModal(`${modalHeader('Passcode reset', 'Reset with your work email')}<div class="modal-body"><form id="password-reset-form" class="modal-form">`
    + `<label class="form-field"><span>Your work email</span><input name="email" type="email" required autocomplete="email" placeholder="you@anakage.com"></label>`
    + `<p class="form-help">We match the address against the team roster. If it is on file you get a reset code, and if it is not you get the same reply either way.</p>`
    + `<div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button>`
    + `<button class="button button-primary" type="submit">${icon('send')} Send my code</button></div></form></div>`);
}

function openPasswordResetConfirmModal(email) {
  openModal(`${modalHeader('Passcode reset', 'Enter your code')}<div class="modal-body"><form id="password-reset-confirm-form" class="modal-form" data-email="${escapeHtml(email || '')}">`
    + `<label class="form-field"><span>Work email</span><input name="email" type="email" required autocomplete="email" value="${escapeHtml(email || '')}"></label>`
    + `<label class="form-field"><span>Reset code</span><input name="code" required autocapitalize="characters" autocomplete="one-time-code" placeholder="e.g. K7M2QP4X"></label>`
    + `<label class="form-field"><span>New passcode</span><input name="password" type="password" required minlength="10" autocomplete="new-password" placeholder="At least 10 characters"></label>`
    + `<p class="form-help">The code works once and expires after 15 minutes. Setting a new passcode signs you out everywhere else.</p>`
    + `<div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button>`
    + `<button class="button button-primary" type="submit">${icon('lock')} Set new passcode</button></div></form></div>`);
}

async function submitPasswordReset(form) {
  const email = form.elements.email.value.trim();
  try {
    const result = await api('/api/auth/password-reset', { method: 'POST', body: { email } });
    closeModal();
    openPasswordResetConfirmModal(email);
    $('#login-error').textContent = '';
    if (result?.devCode) showToast('Local reset code', `Use code ${result.devCode} to finish resetting.`);
    else showToast('Code requested', result.message);
  } catch (error) {
    $('#login-error').textContent = error.message;
    closeModal();
    showLogin();
  }
}

async function submitPasswordResetConfirm(form) {
  const email = form.elements.email.value.trim();
  try {
    await api('/api/auth/password-reset/confirm', {
      method: 'POST',
      body: { email, code: form.elements.code.value.trim(), password: form.elements.password.value }
    });
    closeModal();
    showLogin();
    $('#login-username').value = email.split('@')[0] || '';
    $('#login-password').value = '';
    $('#login-password').focus();
    showToast('Passcode updated', 'Sign in with your new passcode.');
  } catch (error) {
    const field = $('.modal .form-error') || $('.modal-form');
    if (field) field.insertAdjacentHTML('afterend', `<p class="form-error" role="alert">${escapeHtml(error.message)}</p>`);
    else showToast('Reset failed', error.message, true);
  }
}

async function loadPendingResets() {
  if (state.user?.role !== 'lead') return;
  try {
    state.passwordResets = (await api('/api/password-resets/pending')).resets || [];
  } catch {
    state.passwordResets = [];
  }
}

function openAccountModal() {  const isLead = state.user?.role === 'lead';
  const users = state.dashboard?.users || [];
  const ownerOptions = users.map((user) => `<option value="${user.id}" ${user.id === state.user?.id ? 'selected' : ''}>${escapeHtml(user.name)} · ${escapeHtml(roleLabel(user.role))}</option>`).join('');
  openModal(`${modalHeader('New record', 'Add an account')}<div class="modal-body"><form id="account-form" class="modal-form"><div class="form-grid"><label class="form-field"><span>Account name</span><input name="name" required placeholder="e.g. Acme Bank"></label><label class="form-field"><span>Partner / source</span><input name="partner" placeholder="e.g. Kyndryl"></label></div><div class="form-grid"><label class="form-field"><span>Owner</span><select name="ownerId" ${isLead ? '' : 'disabled'}>${ownerOptions}</select></label><label class="form-field"><span>Stage</span><select name="stage"><option value="discovery">Discovery</option><option value="engagement">Engagement</option><option value="solutioning">Solutioning</option><option value="proposal">Proposal</option><option value="poc">POC</option><option value="negotiation">Negotiation</option><option value="on_hold">On hold</option></select></label><label class="form-field"><span>Health</span><select name="health"><option value="new">New</option><option value="on_track">On track</option><option value="at_risk">At risk</option><option value="watch">Watch</option></select></label><label class="form-field"><span>Priority</span><select name="priority"><option value="normal">Standard</option><option value="high">High</option><option value="critical">Critical</option></select></label></div><div class="form-grid"><label class="form-field"><span>Next action</span><input name="nextAction" placeholder="Confirm next milestone and owner"></label><label class="form-field"><span>Next action date</span><input name="nextActionDate" type="date" value="${todayValue()}"></label></div><p class="form-help">The account starts with ${isLead ? 'the selected owner' : 'you as owner'} and a visible timeline line.</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${icon('plus')} Create account</button></div></form></div>`);
}

function openUpdateModal(accountId) {
  const accountIdValue = accountId || state.account?.account?.id;
  const account = state.account?.account?.id === accountIdValue ? state.account.account : (state.dashboard?.accounts || []).find((item) => item.id === Number(accountIdValue));
  openModal(`${modalHeader('Account timeline', 'Log an update')}<div class="modal-body"><form id="update-form" class="modal-form" data-account-id="${accountIdValue}"><div class="form-grid"><label class="form-field"><span>Update type</span><select name="type"><option value="check-in">Check-in</option><option value="meeting">Meeting</option><option value="milestone">Milestone</option><option value="risk">Risk signal</option><option value="task">Task</option><option value="issue">Issue</option><option value="roadblock">Roadblock</option><option value="resolution">Resolution · rejoin</option></select></label><label class="form-field"><span>Event date</span><input name="occurredAt" type="date" value="${todayValue()}" required></label></div><label class="form-field"><span>What changed?</span><textarea name="body" required placeholder="Share the context, movement, and next step..."></textarea></label><div class="form-grid"><label class="form-field"><span>Set next action <span class="form-help">Optional</span></span><input name="nextAction" placeholder="e.g. Share revised deck"></label><label class="form-field"><span>Next action date <span class="form-help">Optional</span></span><input name="nextActionDate" type="date"></label><label class="form-field"><span>Health signal <span class="form-help">Optional</span></span><select name="health"><option value="">Keep current</option><option value="on_track">On track</option><option value="at_risk">At risk</option><option value="watch">Watch</option></select></label><label class="form-field"><span>Stage <span class="form-help">Optional</span></span><select name="stage"><option value="">Keep current</option><option value="discovery">Discovery</option><option value="engagement">Engagement</option><option value="solutioning">Solutioning</option><option value="proposal">Proposal</option><option value="poc">POC</option><option value="negotiation">Negotiation</option><option value="on_hold">On hold</option></select></label></div><p class="form-help">${state.user?.role === 'lead' ? 'Watcher updates are released immediately.' : 'This update will enter the review gate before becoming trusted history.'}</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${icon('send')} Submit update</button></div></form></div>`);
  if (account) $('.modal .form-help')?.replaceChildren(document.createTextNode(`${account.name} · ${state.user?.role === 'lead' ? 'Watcher update releases immediately.' : 'This update will enter the review gate before becoming trusted history.'}`));
}

function openSignalModal() {
  const accounts = (state.dashboard?.accounts || []).filter((account) => state.user?.role === 'lead' || account.ownerId === state.user?.id || account.isMember);
  if (!accounts.length) return showToast('No editable accounts', 'Your account scope is ready, but no editable account is attached yet.', true);
  const selectedAccount = accounts.some((account) => String(account.id) === String(state.timelineAccount)) ? state.timelineAccount : 'all';
  const accountOptions = accounts.map((account) => `<option value="${account.id}" ${String(selectedAccount) === String(account.id) ? 'selected' : ''}>${escapeHtml(account.name)} · ${escapeHtml(account.partner)}</option>`).join('');
  openModal(`${modalHeader('TVA signal', 'Add a task, issue, or roadblock')}<div class="modal-body"><form id="update-form" class="modal-form" data-return-timeline="true"><div class="form-grid"><label class="form-field"><span>Account</span><select name="accountId" required><option value="">Choose an account...</option>${accountOptions}</select></label><label class="form-field"><span>Signal type</span><select name="type"><option value="task">Task · next move</option><option value="issue">Issue · needs attention</option><option value="roadblock">Roadblock · dependency</option><option value="milestone">Milestone · progress</option><option value="meeting">Meeting · coordination</option><option value="check-in">Check-in · context</option><option value="resolution">Resolution · rejoin flow</option></select></label></div><div class="form-grid"><label class="form-field"><span>Event date</span><input name="occurredAt" type="date" value="${todayValue()}" required></label><label class="form-field"><span>Next action <span class="form-help">Optional</span></span><input name="nextAction" placeholder="e.g. Confirm the sponsor response"></label></div><label class="form-field"><span>Signal context</span><textarea name="body" required placeholder="Describe the task, issue, or roadblock and the next move..."></textarea></label><p class="form-help">Your signal enters the review gate before it becomes trusted timeline history.</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${icon('plus')} Add to timeline</button></div></form></div>`);
}

function openReviewModal(updateId, action) {
  const update = (state.dashboard?.reviewQueue || []).find((item) => item.id === Number(updateId)) || (state.account?.updates || []).find((item) => item.id === Number(updateId));
  if (!update) return showToast('Update unavailable', 'Refresh the review queue and try again.', true);
  const isChanges = action === 'request_changes';
  openModal(`${modalHeader(isChanges ? 'Return to field' : 'Review gate', isChanges ? 'Request changes' : 'Approve update')}<div class="modal-body"><form id="review-form" class="modal-form" data-update-id="${update.id}" data-review-action="${isChanges ? 'request_changes' : 'approve'}"><div class="review-modal-update"><strong>${escapeHtml(update.accountName || 'Account timeline')} · ${escapeHtml(update.authorName)} · ${escapeHtml(formatFullDate(update.occurredAt))}</strong>${escapeHtml(update.body)}</div><label class="form-field"><span>${escapeHtml(isChanges ? 'What should change?' : 'Review note')}</span><textarea name="note" ${isChanges ? 'required' : ''} placeholder="${isChanges ? 'Give the field operator a clear next instruction...' : 'Add context for the timeline...'}"></textarea></label><p class="form-help">${isChanges ? 'The update will return to its author as “changes requested”.' : 'The update will be marked approved and become trusted account history.'}</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button ${isChanges ? 'button-danger' : 'button-success'}" type="submit">${icon(isChanges ? 'send' : 'check')} ${isChanges ? 'Request changes' : 'Approve update'}</button></div></form></div>`);
}

function openEditUpdateModal(updateId) {
  const update = (state.account?.updates || []).find((item) => item.id === Number(updateId));
  if (!update) return showToast('Update unavailable', 'Refresh the account timeline and try again.', true);
  openModal(`${modalHeader('Return to field', 'Edit and resubmit')}<div class="modal-body"><form id="edit-update-form" class="modal-form" data-update-id="${update.id}"><div class="form-grid"><label class="form-field"><span>Update type</span><select name="type">${['check-in', 'meeting', 'milestone', 'risk', 'task', 'issue', 'roadblock', 'resolution'].map((value) => `<option value="${value}" ${update.type === value ? 'selected' : ''}>${escapeHtml(typeLabel(value))}</option>`).join('')}</select></label><label class="form-field"><span>Event date</span><input name="occurredAt" type="date" value="${escapeHtml(update.occurredAt || todayValue())}" required></label></div><label class="form-field"><span>Updated account context</span><textarea name="body" required>${escapeHtml(update.body)}</textarea></label><p class="form-help">This returns the update to ${escapeHtml(update.reviewerName || 'the assigned reviewer')} for another pass.</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${icon('send')} Resubmit for review</button></div></form></div>`);
}

function openEditAccountModal() {
  const account = state.account?.account;
  if (!account) return;
  const users = state.dashboard?.users || [];
  const isLead = state.user?.role === 'lead';
  openModal(`${modalHeader('Account record', 'Edit account')}<div class="modal-body"><form id="edit-account-form" class="modal-form" data-account-id="${account.id}"><div class="form-grid"><label class="form-field"><span>Account name</span><input name="name" value="${escapeHtml(account.name)}" required></label><label class="form-field"><span>Partner / source</span><input name="partner" value="${escapeHtml(account.partner)}"></label></div><div class="form-grid"><label class="form-field"><span>Owner</span><select name="ownerId" ${isLead ? '' : 'disabled'}>${users.map((user) => `<option value="${user.id}" ${user.id === account.ownerId ? 'selected' : ''}>${escapeHtml(user.name)} · ${escapeHtml(roleLabel(user.role))}</option>`).join('')}</select></label><label class="form-field"><span>Stage</span><select name="stage">${['discovery', 'engagement', 'solutioning', 'proposal', 'poc', 'negotiation', 'on_hold'].map((value) => `<option value="${value}" ${account.stage === value ? 'selected' : ''}>${escapeHtml(stageLabel(value))}</option>`).join('')}</select></label><label class="form-field"><span>Health</span><select name="health">${['new', 'on_track', 'at_risk', 'watch'].map((value) => `<option value="${value}" ${account.health === value ? 'selected' : ''}>${escapeHtml(value.replace('_', ' '))}</option>`).join('')}</select></label><label class="form-field"><span>Priority</span><select name="priority">${['normal', 'high', 'critical'].map((value) => `<option value="${value}" ${account.priority === value ? 'selected' : ''}>${escapeHtml(value)}</option>`).join('')}</select></label></div><div class="form-grid"><label class="form-field"><span>Next action</span><input name="nextAction" value="${escapeHtml(account.nextAction || '')}"></label><label class="form-field"><span>Next action date</span><input name="nextActionDate" type="date" value="${escapeHtml(account.nextActionDate || '')}"></label></div><p class="form-help">Ownership changes are recorded as a visible handoff on the timeline.</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${icon('check')} Save account</button></div></form></div>`);
}

const pickedAccountUpdates = new Map();

function findTimelineUpdate(updateId) {
  const id = Number(updateId);
  return (state.account?.updates || []).find((item) => item.id === id)
    || (state.dashboard?.reviewQueue || []).find((item) => item.id === id)
    || (state.dashboard?.eraseRequests || []).find((item) => item.id === id)
    || timelineEvents().find((item) => item.id === id)
    || pickedAccountUpdates.get(id)
    || null;
}

function openEraseModal(updateId) {
  const update = findTimelineUpdate(updateId);
  if (!update) return showToast('Entry unavailable', 'Refresh the timeline and try again.', true);
  const isLead = state.user?.role === 'lead';
  openModal(`${modalHeader(isLead ? 'Erase record' : 'Erase request', isLead ? 'Erase this entry now?' : 'Ask the Watcher to erase this')}<div class="modal-body"><form id="erase-form" class="modal-form" data-update-id="${update.id}"><div class="review-modal-update"><strong>${escapeHtml(update.accountName || 'Account timeline')} · ${escapeHtml(update.authorName)} · ${escapeHtml(formatFullDate(update.occurredAt))}</strong>${escapeHtml(update.body)}</div><label class="form-field"><span>Why should this be erased?</span><textarea name="reason" required placeholder="${isLead ? 'Record why this entry is being removed...' : 'Tell the Watcher what is wrong with this entry...'}"></textarea></label><p class="form-help">${isLead ? 'As the Watcher this erases immediately. The entry is kept in a private erase log with your name and the reason.' : 'Nothing is removed yet. The entry stays visible with a pending mark until the Watcher approves the erase.'}</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button button-danger" type="submit">${icon('trash')} ${isLead ? 'Erase now' : 'Send erase request'}</button></div></form></div>`);
}

function openEraseDecisionModal(updateId, decision) {
  const update = findTimelineUpdate(updateId);
  if (!update) return showToast('Entry unavailable', 'Refresh the queue and try again.', true);
  const erasing = decision === 'erase';
  openModal(`${modalHeader('Erase decision', erasing ? 'Erase this entry permanently?' : 'Keep this entry?')}<div class="modal-body"><form id="erase-decision-form" class="modal-form" data-update-id="${update.id}" data-decision="${decision}"><div class="review-modal-update"><strong>${escapeHtml(update.accountName || 'Account timeline')} · ${escapeHtml(update.authorName)} · ${escapeHtml(formatFullDate(update.occurredAt))}</strong>${escapeHtml(update.body)}</div><div class="erase-reason">${icon('send')}<span><strong>${escapeHtml(update.deletionRequestedByName || update.authorName)}</strong> asked to erase this: ${escapeHtml(update.deletionReason || 'no reason given')}</span></div><label class="form-field"><span>${erasing ? 'Erase note' : 'Why are you keeping it?'}</span><textarea name="note" placeholder="${erasing ? 'Optional note for the erase log...' : 'Explain the call to the keeper who asked...'}"></textarea></label><p class="form-help">${erasing ? 'Approving removes the entry from every timeline, the account sheet, and the convergence map. A private erase log keeps a record of what was removed, by whom, and why.' : 'Keeping clears the pending mark and returns the entry to the normal timeline.'}</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button ${erasing ? 'button-danger' : 'button-success'}" type="submit">${icon(erasing ? 'trash' : 'check')} ${erasing ? 'Erase permanently' : 'Keep entry'}</button></div></form></div>`);
}

function openCorrectionModal(accountId, updateId) {
  const account = (state.account?.account?.id === Number(accountId) ? state.account.account : null)
    || timelineAccountLookup().get(Number(accountId))
    || (state.dashboard?.accounts || []).find((item) => item.id === Number(accountId));
  if (!account) return showToast('Account unavailable', 'Refresh the timeline and try again.', true);
  const target = updateId ? findTimelineUpdate(updateId) : null;
  const field = (name, label, value, options) => `<label class="form-field"><span>${label}</span><select name="${name}"><option value="">Keep current${value ? ` · ${escapeHtml(value)}` : ''}</option>${options.map((option) => `<option value="${option.value}">${escapeHtml(option.label)}</option>`).join('')}</select></label>`;
  openModal(`${modalHeader('Keeper correction', 'Fix a deviation')}<div class="modal-body"><form id="correction-form" class="modal-form" data-account-id="${account.id}" data-update-id="${target ? target.id : ''}" data-current-next-action="${escapeHtml(account.nextAction || '')}" data-current-next-action-date="${escapeHtml(account.nextActionDate || '')}"><div class="correction-scope">${icon('spark')}<div><strong>${escapeHtml(account.name)}</strong><p>${escapeHtml(account.partner)} · ${escapeHtml(stageLabel(account.stage))} · ${escapeHtml(healthLabel(account.health))}</p></div></div>${target ? `<div class="correction-target">${icon('layers')}<div><strong>Correcting this entry</strong><p>${escapeHtml(timelineTruncate(target.body, 140))}</p><small>${escapeHtml(formatFullDate(target.occurredAt))} · ${escapeHtml(typeLabel(target.type))}</small></div></div>` : ''}<div class="form-grid">${field('health', 'Correct the health signal', healthLabel(account.health), [{ value: 'on_track', label: 'On track' }, { value: 'at_risk', label: 'At risk' }, { value: 'watch', label: 'Watch' }, { value: 'new', label: 'New' }])}${field('stage', 'Correct the stage', stageLabel(account.stage), ['discovery', 'engagement', 'solutioning', 'proposal', 'poc', 'negotiation', 'on_hold'].map((value) => ({ value, label: stageLabel(value) })))}</div><div class="form-grid"><label class="form-field"><span>Correct the next action</span><input name="nextAction" value="${escapeHtml(account.nextAction || '')}" placeholder="Leave unchanged to keep it"></label><label class="form-field"><span>Correct the next action date</span><input name="nextActionDate" type="date" value="${escapeHtml(account.nextActionDate || '')}"></label></div><label class="form-field"><span>What is the correct picture?</span><textarea name="note" required placeholder="Explain the deviation and what the record should say..."></textarea></label><p class="form-help">Corrections apply immediately and stay visible on the timeline as a trusted correction. ${target ? 'This entry will be treated as resolved, so the branch rejoins the normal flow.' : 'No Watcher review is needed for a correction.'}</p><div class="form-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button button-success" type="submit">${icon('check')} Apply correction</button></div></form></div>`);
}

function showToast(title, message, isError = false) {
  const root = $('#toast-root');
  if (!root) return;
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'is-error' : ''}`;
  toast.innerHTML = `${icon(isError ? 'x' : 'check-circle')}<div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(message)}</p></div>`;
  root.appendChild(toast);
  hydrateIcons(toast);
  setTimeout(() => toast.remove(), 4200);
}

function assignedReviewerName() {
  const reviewerId = state.user?.role === 'reviewer' ? 'sanskar' : state.user?.role === 'contributor' ? 'apeksha' : null;
  return state.dashboard?.users?.find((user) => user.id === reviewerId)?.name || (reviewerId === 'sanskar' ? 'Sanskar' : 'Apeksha');
}

function formObject(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  for (const key of Object.keys(values)) if (values[key] === '') delete values[key];
  return values;
}

async function submitLogin(form) {
  const values = formObject(form);
  const errorNode = $('#login-error');
  errorNode.textContent = '';
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const payload = await api('/api/auth/login', { method: 'POST', body: values });
    form.reset();
    await enterApp(payload.user);
  } catch (error) {
    errorNode.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

async function submitAccount(form) {
  const values = formObject(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const payload = await api('/api/accounts', { method: 'POST', body: values });
    closeModal();
    await loadDashboard();
    showToast('Account added', `${payload.account.name} is now on the mission index.`);
    await openAccount(payload.account.id);
  } catch (error) {
    showToast('Could not add account', error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function submitUpdate(form) {
  const values = formObject(form);
  const accountId = values.accountId || form.dataset.accountId;
  delete values.accountId;
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await api(`/api/accounts/${accountId}/updates`, { method: 'POST', body: values });
    closeModal();
    await loadDashboard();
    showToast('Signal submitted', state.user?.role === 'lead' ? 'The timeline has been updated.' : `${assignedReviewerName()} can now review the signal.`);
    if (form.dataset.returnTimeline === 'true') renderTimeline();
    else await openAccount(accountId);
  } catch (error) {
    showToast('Could not submit signal', error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function submitReview(form) {
  const values = formObject(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await api(`/api/updates/${form.dataset.updateId}/review`, { method: 'POST', body: { action: form.dataset.reviewAction, note: values.note || '' } });
    closeModal();
    await loadDashboard();
    showToast(form.dataset.reviewAction === 'approve' ? 'Update approved' : 'Update returned', form.dataset.reviewAction === 'approve' ? 'It is now trusted account history.' : 'The author can now make the requested change.');
    if (state.route === 'account-detail' && state.account) await openAccount(state.account.account.id);
    else renderPage();
  } catch (error) {
    showToast('Review action failed', error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function submitEditUpdate(form) {
  const values = formObject(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await api(`/api/updates/${form.dataset.updateId}`, { method: 'PATCH', body: values });
    closeModal();
    await loadDashboard();
    showToast('Update resubmitted', 'The assigned reviewer can now take another pass.');
    if (state.account?.account?.id) await openAccount(state.account.account.id);
  } catch (error) {
    showToast('Could not resubmit update', error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function submitEditAccount(form) {
  const values = formObject(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await api(`/api/accounts/${form.dataset.accountId}`, { method: 'PATCH', body: values });
    closeModal();
    await loadDashboard();
    showToast('Account updated', 'The account card and timeline context are current.');
    await openAccount(form.dataset.accountId);
  } catch (error) {
    showToast('Could not update account', error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function submitErase(form) {
  const values = formObject(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  const isLead = state.user?.role === 'lead';
  try {
    const payload = await api(`/api/updates/${form.dataset.updateId}/erase`, { method: 'POST', body: { reason: values.reason || '' } });
    closeModal();
    await loadDashboard();
    if (payload.erased) showToast('Entry erased', 'It is gone from every timeline and kept in the private erase log.');
    else showToast('Erase request sent', 'The entry stays visible until the Watcher approves.');
    if (state.route === 'account-detail' && state.account) await openAccount(state.account.account.id);
    else renderPage();
  } catch (error) {
    showToast('Erase request failed', error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function submitEraseDecision(form) {
  const values = formObject(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  const erasing = form.dataset.decision === 'erase';
  try {
    await api(`/api/updates/${form.dataset.updateId}/erase-decision`, { method: 'POST', body: { decision: form.dataset.decision, note: values.note || '' } });
    closeModal();
    await loadDashboard();
    showToast(erasing ? 'Entry erased' : 'Entry kept', erasing ? 'It has been removed from every timeline.' : 'The entry is back on the normal timeline.');
    if (state.route === 'account-detail' && state.account) await openAccount(state.account.account.id);
    else renderPage();
  } catch (error) {
    showToast('Erase decision failed', error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function cancelErase(updateId) {
  try {
    await api(`/api/updates/${updateId}/erase`, { method: 'DELETE' });
    await loadDashboard();
    showToast('Request cancelled', 'The entry is back on the normal timeline.');
    if (state.route === 'account-detail' && state.account) await openAccount(state.account.account.id);
    else renderPage();
  } catch (error) {
    showToast('Could not cancel the request', error.message, true);
  }
}

async function submitCorrection(form) {
  const values = formObject(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const payload = await api(`/api/accounts/${form.dataset.accountId}/corrections`, {
      method: 'POST',
      body: {
        health: values.health || '',
        stage: values.stage || '',
        nextAction: (values.nextAction || '') === form.dataset.currentNextAction ? undefined : (values.nextAction || ''),
        nextActionDate: (values.nextActionDate || '') === form.dataset.currentNextActionDate ? undefined : (values.nextActionDate || ''),
        note: values.note || '',
        correctsUpdateId: form.dataset.updateId || ''
      }
    });
    closeModal();
    await loadDashboard();
    showToast('Correction applied', 'The record is corrected and the correction is now trusted timeline history.');
    if (form.dataset.updateId && payload.correction) await openAccount(form.dataset.accountId);
    else if (state.route === 'account-detail' && state.account) await openAccount(state.account.account.id);
    else renderPage();
  } catch (error) {
    showToast('Correction failed', error.message, true);
  } finally {
    button.disabled = false;
  }
}

function guideFaq() {
  return window.WatcherFaq || null;
}

function guideGreeting() {
  return {
    role: 'guide',
    title: 'Ask me how the Watcher works',
    body: 'I answer from a fixed knowledge base written for this team, so I can walk you through the exact steps for any task. Try a question, or pick a topic below.',
    steps: [],
    related: ['posting-update', 'review-flow', 'erase-request', 'corrections', 'tva-basics'].map((id) => guideFaq()?.byId(id)).filter(Boolean)
  };
}

function guideMessage(markup) {
  return `<article class="guide-message is-guide">`
    + `<span class="guide-avatar">${icons.spark}</span>`
    + `<div class="guide-bubble">${markup}</div>`
    + `</article>`;
}

function guideRenderEntry(entry, route) {
  const steps = (entry.steps || []).map((step, index) => `<li class="guide-step"><span class="guide-step-index">${index + 1}</span><span>${escapeHtml(step)}</span></li>`).join('');
  const related = guideRelatedChips(entry);
  return guideMessage(
    `<h4 class="guide-message-title">${escapeHtml(entry.title)}</h4>`
    + `<p class="guide-message-body">${escapeHtml(entry.answer || '')}</p>`
    + (steps ? `<ol class="guide-steps">${steps}</ol>` : '')
    + (route ? `<button class="guide-open-route" type="button" data-guide-route="${escapeHtml(route)}">Open that screen</button>` : '')
    + (related ? `<div class="guide-related">${related}</div>` : '')
  );
}

function guideRelatedChips(entry) {
  const faq = guideFaq();
  if (!faq) return '';
  const ids = (entry.related || []).concat(['no-answer']);
  return faq.relatedTo(entry).concat([faq.byId('no-answer')]).filter(Boolean)
    .filter((item, index, list) => list.findIndex((other) => other.id === item.id) === index)
    .map((item) => `<button class="guide-chip" type="button" data-guide-topic="${escapeHtml(item.title)}">${escapeHtml(item.title)}</button>`)
    .join('');
}

function guideRender() {
  const log = $('#guide-log');
  if (!log) return;
  log.innerHTML = state.guide.log.map((message) => {
    if (message.role === 'user') {
      return `<article class="guide-message is-user"><div class="guide-bubble"><p class="guide-message-body">${escapeHtml(message.text)}</p></div></article>`;
    }
    return guideRenderEntry(message, message.route);
  }).join('');
  log.scrollTop = log.scrollHeight;
  const faq = guideFaq();
  const chips = $('#guide-chips');
  if (chips && faq) {
    chips.innerHTML = faq.topics().slice(0, 6)
      .map((topic) => `<button class="guide-chip" type="button" data-guide-topic="${escapeHtml(topic.title)}">${escapeHtml(topic.title)}</button>`)
      .join('');
  }
}

function guideAsk(rawQuestion) {
  const question = String(rawQuestion || '').trim();
  if (!question) return;
  const faq = guideFaq();
  state.guide.log.push({ role: 'user', text: question });
  if (!faq) {
    state.guide.log.push({ role: 'guide', title: 'Guide unavailable', body: 'The knowledge base did not load, so I cannot answer right now.', steps: [], related: [] });
    return guideRender();
  }
  // Asking a chip re-uses its title, which scores as an exact phrase match.
  const result = faq.match(question);
  const entry = result.entry;
  const route = faq.routeFromQuery(question);
  state.guide.log.push({ role: 'guide', title: entry.title, answer: entry.answer, steps: entry.steps, related: entry.related, route });
  if (result.confidence > 0 && result.confidence < 0.45 && result.alternatives.length) {
    const nearest = result.alternatives[0];
    state.guide.log[state.guide.log.length - 1].related = [nearest.id].concat(entry.related || []);
  }
  return guideRender();
}

function openGuide() {
  const guide = $('#guide');
  if (!guide) return;
  if (!state.guide.log.length) state.guide.log.push(guideGreeting());
  guide.classList.remove('is-hidden');
  $('#guide-launcher')?.classList.add('is-dismissed');
  $('#guide-launcher')?.setAttribute('aria-expanded', 'true');
  guideRender();
  $('#guide-input')?.focus();
}

function closeGuide() {
  $('#guide')?.classList.add('is-hidden');
  const launcher = $('#guide-launcher');
  launcher?.classList.remove('is-dismissed');
  launcher?.setAttribute('aria-expanded', 'false');
}

function minimiseGuide() {
  closeGuide();
}

async function copyResetCode(resetId) {
  const reset = (state.passwordResets || []).find((item) => String(item.id) === String(resetId));
  if (!reset?.code) return showToast('Nothing to copy', 'That reset is waiting on an email, not a handover code.', true);
  try {
    await navigator.clipboard.writeText(reset.code);
    showToast('Code copied', `Send ${reset.code} to ${reset.name} privately.`);
  } catch {
    showToast('Copy it by hand', reset.code, true);
  }
}

function handleAction(actionElement) {
  const action = actionElement.dataset.action;
  if (action === 'close-modal') return closeModal();
  if (action === 'open-reset-request') return openPasswordResetModal();
  if (action === 'copy-reset-code') return copyResetCode(actionElement.dataset.resetId);
  if (action === 'open-guide') return openGuide();
  if (action === 'close-guide') return closeGuide();
  if (action === 'minimise-guide') return minimiseGuide();
  if (action === 'refresh') return loadDashboard().then(() => { renderPage(); showToast('Data refreshed', 'The Watcher HQ is in sync with the local database.'); }).catch((error) => showToast('Refresh failed', error.message, true));
  if (action === 'new-account') return openAccountModal();
  if (action === 'new-update') return openUpdateModal(actionElement.dataset.accountId);
  if (action === 'new-signal') return openSignalModal();
  if (action === 'select-account-cell') return selectAccountCell(actionElement.dataset.accountId, actionElement.dataset.field);
  if (action === 'sort-accounts') {
    state.accountSort = state.accountSort.key === actionElement.dataset.sortKey
      ? { key: actionElement.dataset.sortKey, direction: state.accountSort.direction === 'asc' ? 'desc' : 'asc' }
      : { key: actionElement.dataset.sortKey, direction: 'asc' };
    return renderAccounts();
  }
  if (action === 'edit-update') return openEditUpdateModal(actionElement.dataset.updateId);
  if (action === 'edit-account') return openEditAccountModal();
  if (action === 'open-account') return openAccount(actionElement.dataset.accountId);
  if (action === 'review') return openReviewModal(actionElement.dataset.updateId, actionElement.dataset.reviewAction);
  if (action === 'erase') return openEraseModal(actionElement.dataset.updateId);
  if (action === 'erase-decision') return openEraseDecisionModal(actionElement.dataset.updateId, actionElement.dataset.decision);
  if (action === 'cancel-erase') return cancelErase(actionElement.dataset.updateId);
  if (action === 'correct') return openCorrectionModal(actionElement.dataset.accountId, actionElement.dataset.updateId);
  if (action === 'pick-erase') return openAccountErasePicker(actionElement.dataset.accountId);
  if (action === 'logout') return logout();
}

async function logout() {
  try { await api('/api/auth/logout', { method: 'POST' }); } catch { return showLogin(); }
  showLogin();
}

function closeSidebar() {
  $('#sidebar')?.classList.remove('is-open');
  $('#sidebar-scrim')?.classList.remove('is-visible');
}

function openSidebar() {
  $('#sidebar')?.classList.add('is-open');
  $('#sidebar-scrim')?.classList.add('is-visible');
}

function handleClick(event) {
  if (event.target.closest('[data-modal-close="true"]') && !event.target.closest('.modal')) return closeModal();
  const topicElement = event.target.closest('[data-guide-topic]');
  if (topicElement) {
    event.preventDefault();
    return guideAsk(topicElement.dataset.guideTopic);
  }
  const routeActionElement = event.target.closest('[data-guide-route]');
  if (routeActionElement) {
    event.preventDefault();
    closeGuide();
    return navigate(routeActionElement.dataset.guideRoute);
  }
  const scopeElement = event.target.closest('[data-timeline-scope]');
  if (scopeElement) {
    state.timelineAccount = 'all';
    state.timelineGroup = 'all';
    return loadTimeline(scopeElement.dataset.timelineScope);
  }
  const laneElement = event.target.closest('[data-timeline-group]');
  if (laneElement) {
    state.timelineGroup = laneElement.dataset.timelineGroup;
    renderTimeline();
    return;
  }
  const routeElement = event.target.closest('[data-route]');
  if (routeElement) {
    event.preventDefault();
    navigate(routeElement.dataset.route);
    return;
  }
  const actionElement = event.target.closest('[data-action]');
  if (actionElement) {
    event.preventDefault();
    handleAction(actionElement);
    return;
  }
  const filterElement = event.target.closest('[data-filter]');
  if (filterElement) {
    state.accountFilter = filterElement.dataset.filter;
    renderAccounts();
  }
}

function handleDoubleClick(event) {
  const cell = event.target.closest('.sheet-cell');
  if (!cell) return;
  event.preventDefault();
  beginAccountCellEdit(cell);
}

function handleFocusOut(event) {
  if (event.target.matches('[data-account-editor]')) commitAccountCellEdit(event.target);
}

function moveAccountSheetFocus(cell, key) {
  const rows = $$('.account-sheet-row');
  const rowIndex = rows.findIndex((row) => row === cell.closest('.account-sheet-row'));
  let nextRow = rowIndex;
  if (key === 'ArrowUp') nextRow = Math.max(0, rowIndex - 1);
  if (key === 'ArrowDown') nextRow = Math.min(rows.length - 1, rowIndex + 1);
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    const direction = key === 'ArrowRight' ? 1 : -1;
    let columnIndex = accountSheetColumnIndex(cell.dataset.field);
    if (direction > 0 && columnIndex >= accountSheetColumns.length - 1) return;
    if (direction < 0 && columnIndex <= 0) return;
    do {
      columnIndex += direction;
    } while (accountSheetColumns[columnIndex] && accountSheetColumns[columnIndex].type === 'actions');
    const nextField = accountSheetColumns[columnIndex]?.key;
    const nextCell = nextField && $$('.sheet-cell').find((item) => Number(item.dataset.accountId) === Number(cell.dataset.accountId) && item.dataset.field === nextField);
    if (nextCell) {
      selectAccountCell(cell.dataset.accountId, nextField);
      nextCell.focus();
    }
    return;
  }
  const nextCell = rows[nextRow] && $$('.sheet-cell').find((item) => item.closest('.account-sheet-row') === rows[nextRow] && item.dataset.field === cell.dataset.field);
  if (nextCell) {
    selectAccountCell(nextCell.dataset.accountId, nextCell.dataset.field);
    nextCell.focus();
  }
}

function handleKeyDown(event) {
  const editor = event.target.closest('[data-account-editor]');
  if (editor) {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitAccountCellEdit(editor);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancelAccountCellEdit();
    }
    return;
  }
  if (event.key === 'Escape') {
    if (state.accountEdit) cancelAccountCellEdit();
    else if (state.modal) closeModal();
    else closeSidebar();
    return;
  }
  const cell = event.target.closest('.sheet-cell');
  if (!cell) return;
  if (event.key === 'Enter' || event.key === 'F2') {
    event.preventDefault();
    beginAccountCellEdit(cell);
    return;
  }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    moveAccountSheetFocus(cell, event.key);
  }
}

function handleInput(event) {
  if (event.target.id === 'global-search' || event.target.id === 'account-filter-search') {
    state.search = event.target.value;
    clearTimeout(state.searchTimer);
    state.searchTimer = setTimeout(() => {
      if (state.route !== 'accounts') {
        state.route = 'accounts';
        setBreadcrumb('accounts');
      }
      renderAccounts();
    }, 120);
  }
}

function handleChange(event) {
  if (event.target.id === 'timeline-account-filter') {
    state.timelineAccount = event.target.value || 'all';
    renderTimeline();
  }
  if (event.target.matches('[data-account-editor]')) commitAccountCellEdit(event.target);
}

function handleSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault();
  if (form.id === 'login-form') return submitLogin(form);
  if (form.id === 'password-reset-form') return submitPasswordReset(form);
  if (form.id === 'password-reset-confirm-form') return submitPasswordResetConfirm(form);
  if (form.id === 'guide-form') {
    const field = form.elements.question;
    const question = field ? field.value : '';
    if (field) field.value = '';
    return guideAsk(question);
  }
  if (form.id === 'account-form') return submitAccount(form);
  if (form.id === 'update-form') return submitUpdate(form);
  if (form.id === 'review-form') return submitReview(form);
  if (form.id === 'edit-update-form') return submitEditUpdate(form);
  if (form.id === 'edit-account-form') return submitEditAccount(form);
  if (form.id === 'erase-form') return submitErase(form);
  if (form.id === 'erase-decision-form') return submitEraseDecision(form);
  if (form.id === 'correction-form') return submitCorrection(form);
}

function bindEvents() {
  document.addEventListener('click', handleClick);
  document.addEventListener('dblclick', handleDoubleClick);
  document.addEventListener('focusout', handleFocusOut);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('input', handleInput);
  document.addEventListener('change', handleChange);
  document.addEventListener('keydown', handleKeyDown);
  $('#menu-button')?.addEventListener('click', openSidebar);
  $('#sidebar-close')?.addEventListener('click', closeSidebar);
  $('#sidebar-scrim')?.addEventListener('click', closeSidebar);
}

async function boot() {
  bindEvents();
  hydrateIcons();
    try {
    const payload = await api('/api/me');
    await enterApp(payload.user);
  } catch {
    showLogin();
  }
}

boot();
