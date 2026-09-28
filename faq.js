/*
 * Watcher HQ guide.
 *
 * A fixed, hand-written knowledge base with a deterministic intent matcher.
 * There is no language model and no network call here: every answer is authored
 * content, and routing is plain keyword scoring. Editing the ENTRIES array below
 * is the only thing needed to teach the guide something new.
 */
(function initWatcherFaq(global) {
  'use strict';

  var ENTRIES = [
    {
      id: 'orientation',
      title: 'What is Watcher HQ?',
      group: 'Basics',
      keywords: ['watcher', 'what is', 'overview', 'about', 'how does it work', 'introduce', 'purpose', 'start', 'begin', 'first time', 'new here', 'help'],
      answer: 'Watcher HQ is the team command center for the presales motion. It keeps one shared record of every account: who owns it, how healthy it is, what was logged, and what the next move is.',
      steps: [
        'Open the Command center for portfolio health and anything awaiting review.',
        'Open the TVA timeline to see how each account story flows and where it branches.',
        'Open the Account workspace to post updates, propose changes, and request erases.',
        'Open the Review queue if you are the reviewer for the week.'
      ],
      related: ['posting-update', 'tva-basics', 'roles']
    },
    {
      id: 'posting-update',
      title: 'How do I post an update on an account?',
      group: 'Daily work',
      keywords: ['post', 'update', 'add update', 'log', 'new update', 'write', 'publish', 'share news', 'record', 'check in', 'check-in'],
      answer: 'Updates are posted from the Account workspace. Pick the account, choose the update type that matches what happened, and write what changed rather than what you did.',
      steps: [
        'Open Account workspace and find the account.',
        'Use the row action or the new update button on the account card.',
        'Choose a type: check-in, milestone, issue, roadblock, or task.',
        'Write one clear sentence, pick the date it happened, and save.',
        'Your update lands in the review queue unless you are the lead.'
      ],
      related: ['review-flow', 'corrections', 'update-types']
    },
    {
      id: 'update-types',
      title: 'Which update type should I use?',
      group: 'Daily work',
      keywords: ['type', 'types', 'difference', 'check-in', 'milestone', 'issue', 'roadblock', 'task', 'which one', 'categor'],
      answer: 'Choose the type by what the reader needs to do next, not by how it felt.',
      steps: [
        'Check-in: routine progress with no decision needed.',
        'Milestone: a dated, verifiable step was reached.',
        'Issue: something is wrong with the deal or the account itself.',
        'Roadblock: progress is waiting on a dependency outside your control.',
        'Task: you or someone else owes a specific next action.'
      ],
      related: ['posting-update', 'at-risk', 'review-flow']
    },
    {
      id: 'review-flow',
      title: 'How does the review gate work?',
      group: 'Reviews',
      keywords: ['review', 'reviewer', 'approve', 'approval', 'queue', 'pending', 'gate', 'sign off', 'signoff', 'audit'],
      answer: 'Contributors post, reviewers clear. An update stays out of the account record as a fact until it is approved, so the timeline only ever shows agreed history.',
      steps: [
        'Open the Review queue to see updates waiting on you.',
        'Read the update against the account it belongs to.',
        'Approve it if the account record should now treat it as fact.',
        'Request changes if it is unclear, unverified, or missing an owner.',
        'Rejected work returns to the author with your note attached.'
      ],
      related: ['changes-requested', 'roles', 'posting-update']
    },
    {
      id: 'changes-requested',
      title: 'What do I do when changes are requested?',
      group: 'Reviews',
      keywords: ['changes requested', 'rejected', 'feedback', 'fix', 'revise', 'what now', 'not approved', 'send back', 'returned'],
      answer: 'A change request is not a dead end. It tells you exactly what would make the update trustworthy.',
      steps: [
        'Open the Review queue and read the reviewer note in full.',
        'Decide whether you can source the missing fact or not.',
        'Post a new update that answers the note directly.',
        'Do not delete the original. The history of the request stays visible.',
        'If the note is wrong, reply with your evidence and ask for a second look.'
      ],
      related: ['review-flow', 'corrections', 'posting-update']
    },
    {
      id: 'erase-request',
      title: 'How do I remove an update that should not be there?',
      group: 'Erasure',
      keywords: ['erase', 'delete', 'remove', 'remove an update', 'wrong update', 'mistake', 'retract', 'take down', 'remove entry'],
      answer: 'Nothing is deleted on trust. Your account owner or the lead clears the request, and only then does the entry leave the account record. The erase itself is logged.',
      steps: [
        'Open the account and use the Erase action on the row.',
        'Pick the exact entry and give a reason.',
        'Send the erase request. It is now visible to the lead as pending.',
        'The lead or the account owner approves or declines it.',
        'The erase and its reason are recorded in the erase log.'
      ],
      related: ['erase-log', 'roles', 'corrections']
    },
    {
      id: 'erase-log',
      title: 'What is the erase log for?',
      group: 'Erasure',
      keywords: ['erase log', 'audit', 'who erased', 'history', 'accountability', 'trace', 'erased log', 'audit trail'],
      answer: 'The erase log exists so a removal is never invisible. It records who asked, who approved, when, and the reason given.',
      steps: [
        'Open the account and look for the erased updates section.',
        'Compare the reason with the original update.',
        'Use it when a removal looks wrong and needs a conversation.',
        'Lead and reviewer accounts can see the full log for every account.'
      ],
      related: ['erase-request', 'data-safety', 'roles']
    },
    {
      id: 'corrections',
      title: 'How do I correct something I already posted?',
      group: 'Erasure',
      keywords: ['correction', 'correct', 'wrong', 'mistake', 'fix a post', 'amend', 'wrong info', 'mistaken'],
      answer: 'If the entry is right in spirit but wrong in detail, correct it. The original stays as history and the correction closes what was open.',
      steps: [
        'Open the account and find the entry you need to correct.',
        'Use the correct action on that entry.',
        'Write what is actually true, in one sentence.',
        'The correction is posted instantly for reviewers and leads.',
        'On the timeline the correction closes any branch the original opened.'
      ],
      related: ['erase-request', 'tva-branches', 'posting-update']
    },
    {
      id: 'tva-basics',
      title: 'How do I read the TVA timeline?',
      group: 'Timeline',
      keywords: ['tva', 'timeline', 'map', 'read the map', 'what is the map', 'streams', 'trunk', 'flow', 'master timeline', 'convergence'],
      answer: 'Each account is one horizontal stream running left to right through time. Everything logged sits on that line, so the shape of the account is readable at a glance.',
      steps: [
        'Use the scope control to switch between the whole team and one owner.',
        'Read each row left to right: early history on the left, now on the right.',
        'Each stream belongs to an owner and is grouped under their name.',
        'Owner streams bundle into a junction, then into the master timeline.',
        'The gold dashed line marks now, and the dotted verticals are date ticks.'
      ],
      related: ['tva-branches', 'tva-filters', 'at-risk']
    },
    {
      id: 'tva-branches',
      title: 'What do the branches and rails mean?',
      group: 'Timeline',
      keywords: ['branch', 'branches', 'rail', 'rails', 'open', 'rejoined', 'fork', 'split', 'diverge', 'converge', 'what does open mean'],
      answer: 'A branch is a deviation: something happened that pulled the account off its main line. Each open branch gets its own rail so branches never overlap.',
      steps: [
        'A dashed rail drops below the trunk when an issue or roadblock is logged.',
        'The rail is labelled with the type and whether it is open or rejoined.',
        'An open rail is capped with an OPEN marker and still blocks convergence.',
        'A resolution or a correction lands the account back on the trunk with a rejoin marker.',
        'Rails are ordered, so two branches on one account are always readable.'
      ],
      related: ['corrections', 'tva-basics', 'at-risk']
    },
    {
      id: 'tva-filters',
      title: 'How do I filter the timeline?',
      group: 'Timeline',
      keywords: ['filter', 'scope', 'filter timeline', 'narrow', 'only', 'show me', 'lane', 'toggle', 'zoom'],
      answer: 'Filtering is the fastest way to answer a specific question about the map.',
      steps: [
        'Use scope to switch between all accounts and a single owner.',
        'Use the lane control to focus on one class of signal.',
        'Use the account picker to isolate a single account stream.',
        'Every filter keeps the geometry intact, so rails still never overlap.'
      ],
      related: ['tva-basics', 'global-search', 'tva-branches']
    },
    {
      id: 'at-risk',
      title: 'What does it mean when an account is at risk?',
      group: 'Portfolio',
      keywords: ['at risk', 'at-risk', 'risk', 'red', 'health', 'unhealthy', 'slipping', 'stuck', 'silent', 'going quiet'],
      answer: 'Health is a judgement, not a metric. At risk means the next move is unclear or blocked, and someone owns fixing that.',
      steps: [
        'Open Command center to see every account currently at risk.',
        'Open the account and read the last update on the timeline.',
        'Check whether a branch is still open, which is the usual cause.',
        'Post a roadblock naming the dependency and its owner.',
        'If the account has gone quiet, escalate it in the review queue.'
      ],
      related: ['propose-changes', 'tva-branches', 'review-flow']
    },
    {
      id: 'propose-changes',
      title: 'How do I change an account health or stage?',
      group: 'Portfolio',
      keywords: ['change health', 'propose', 'update account', 'stage', 'move account', 'set health', 'next action', 'priority', 'rename account'],
      answer: 'Account facts change through proposals, so the record always shows who decided what and when.',
      steps: [
        'Open the account you want to change.',
        'Use the edit action on the field you are changing.',
        'Propose the new value and add a one line reason.',
        'The proposal goes to the review queue.',
        'Once approved the account row and every timeline view update together.'
      ],
      related: ['at-risk', 'review-flow', 'posting-update']
    },
    {
      id: 'new-account',
      title: 'How do I add a new account?',
      group: 'Portfolio',
      keywords: ['add account', 'new account', 'create account', 'add client', 'onboard', 'new client', 'add a company'],
      answer: 'New accounts start as a stream with no history, ready for the first update.',
      steps: [
        'Use the Add account action in the quick actions menu.',
        'Give the account its exact name, since the name is the identity used across the app.',
        'Set the owner and the partner.',
        'Set the next action and its date before you save.',
        'Post the first update so the stream is not empty.'
      ],
      related: ['posting-update', 'propose-changes', 'orientation']
    },
    {
      id: 'global-search',
      title: 'How do I find a specific account fast?',
      group: 'Portfolio',
      keywords: ['search', 'find', 'look for', 'global search', 'where is', 'locate', 'filter accounts'],
      answer: 'The top bar search is global, so it works from any screen.',
      steps: [
        'Click the search field in the top bar.',
        'Type the account name or the partner name.',
        'Pick the result to open the account workspace.',
        'Clear the search to return to the full list.'
      ],
      related: ['tva-filters', 'new-account', 'orientation']
    },
    {
      id: 'roles',
      title: 'What are the roles and what can each do?',
      group: 'Roles',
      keywords: ['role', 'roles', 'permission', 'permissions', 'lead', 'reviewer', 'contributor', 'access', 'who can', 'authority'],
      answer: 'Three roles, and the differences are about trust rather than seniority.',
      steps: [
        'Lead sees everything and clears erase requests immediately.',
        'Reviewer clears updates in the review queue and proposes account changes.',
        'Contributor posts updates, proposes changes, and requests erases.',
        'Account owners always act on their own accounts regardless of role.',
        'Your role is shown under your name in the sidebar.'
      ],
      related: ['erase-request', 'review-flow', 'account-members']
    },
    {
      id: 'account-members',
      title: 'How do I manage who is on an account?',
      group: 'Roles',
      keywords: ['members', 'member', 'team on account', 'add someone', 'remove someone', 'collaborators', 'access account'],
      answer: 'Membership decides who can act on an account, and the member count is shown on the account card.',
      steps: [
        'Open the account and find the members section.',
        'Add or remove team members as the engagement changes.',
        'Owners and the lead can always act, membership widens it.',
        'Changing members does not change the account owner.'
      ],
      related: ['roles', 'propose-changes', 'new-account']
    },
    {
      id: 'data-safety',
      title: 'Where is our data stored and is it safe?',
      group: 'Trust',
      keywords: ['data', 'stored', 'storage', 'safe', 'security', 'privacy', 'database', 'backup', 'where is data', 'sqlite', 'turso', 'lost'],
      answer: 'Everything lives in the team database, not in the browser. Sessions expire, and nothing is removed without a logged decision.',
      steps: [
        'Data is held in the shared team database behind the app.',
        'Your session is time limited and ends on its own.',
        'Removals go through the erase log, so history is never silently lost.',
        'Corrections keep the original visible, which is the safest kind of history.',
        'Account data is visible to the lead and reviewers by role.'
      ],
      related: ['erase-log', 'login-help', 'corrections']
    },
    {
      id: 'login-help',
      title: 'I cannot sign in',
      group: 'Trust',
      keywords: ['login', 'log in', 'sign in', 'password', 'passcode', 'locked out', 'username', 'cannot access', 'forgot', 'not recognised'],
      answer: 'The passcode is a team secret, not a personal one. Nothing can be reset from inside the app.',
      steps: [
        'Confirm you are using your team username, in lower case.',
        'Check for a stray space at the start or end of the passcode.',
        'Sessions expire, so a stale tab can look like a wrong passcode.',
        'If it still fails, ask the lead for a fresh passcode.',
        'Never share a passcode in a chat or a screenshot.'
      ],
      related: ['data-safety', 'roles', 'orientation']
    },
    {
      id: 'no-show',
      title: 'An account has not been updated in a while. What now?',
      group: 'Portfolio',
      keywords: ['no update', 'not updated', 'stale', 'quiet', 'inactive', 'gone quiet', 'overdue', 'chase', 'follow up', 'no news'],
      answer: 'Silence is a signal. Treat it as a roadblock rather than letting the account drift.',
      steps: [
        'Check the account timeline for the date of the last update.',
        'Confirm the owner still owns it, and reassign if the engagement moved.',
        'Post a roadblock naming who owes the update and by when.',
        'Flag the account at risk if the silence passes the agreed window.',
        'Escalate in the review queue if nobody responds.'
      ],
      related: ['at-risk', 'posting-update', 'account-members']
    },
    {
      id: 'stuck-branch',
      title: 'A branch has been open for a long time',
      group: 'Timeline',
      keywords: ['open branch', 'stuck', 'not rejoined', 'long open', 'blocker', 'blocking', 'unresolved', 'still open'],
      answer: 'An open branch is the clearest sign that an account needs a decision, not more activity.',
      steps: [
        'Find the account on the timeline and read the rail label.',
        'Open the issue or roadblock that opened the branch.',
        'Decide whether the issue is resolved, still true, or replaced.',
        'Post a resolution to rejoin, or a correction if the original was wrong.',
        'If the issue is dead, post a resolution that says so plainly.'
      ],
      related: ['corrections', 'tva-branches', 'review-flow']
    },
    {
      id: 'handover',
      title: 'An account is being handed to me',
      group: 'Portfolio',
      keywords: ['handover', 'handoff', 'take over', 'reassign', 'new owner', 'inherit', 'ownership change', 'transfer'],
      answer: 'Ownership moves the account to a new owner and the new owner starts from the full history, not a blank page.',
      steps: [
        'Open the account and change the owner in the account details.',
        'Read the timeline first, especially any open branch.',
        'Post a check-in introducing yourself as the new owner.',
        'Set the next action and date so the account has a pulse.',
        'Add yourself to the members if you were not already on it.'
      ],
      related: ['account-members', 'propose-changes', 'tva-basics']
    },
    {
      id: 'keyboard',
      title: 'What are the quick ways to move around?',
      group: 'Basics',
      keywords: ['keyboard', 'shortcut', 'fast', 'quick', 'navigate', 'speed', 'tips', 'use it', 'how to use'],
      answer: 'The app is built to be used fast, with a small number of habits that cover most of the work.',
      steps: [
        'Use the sidebar for the five main views instead of hunting for links.',
        'Keep the global search focused, it works on every screen.',
        'Use the quick actions menu for adding an account and refreshing.',
        'Open the guide, this panel, from any screen when you are unsure.'
      ],
      related: ['orientation', 'global-search', 'guide-shortcuts']
    },
    {
      id: 'guide-shortcuts',
      title: 'What can this guide do?',
      group: 'Guide',
      keywords: ['guide', 'chat', 'chatbot', 'assistant', 'help panel', 'ask', 'bot', 'this guide', 'what can you'],
      answer: 'The guide answers from a fixed, hand written knowledge base. There is no language model behind it, so it only knows what has been written down here.',
      steps: [
        'Type a question in plain words, for example how do I request an erase.',
        'Pick a topic chip if you would rather not type.',
        'Answers include numbered steps you can follow in order.',
        'Use the related links at the end of an answer to go deeper.',
        'If nothing matches, the guide offers the closest topics.'
      ],
      related: ['orientation', 'keyboard', 'erase-request']
    },
    {
      id: 'no-answer',
      title: 'Suggested topics',
      group: 'Guide',
      keywords: [],
      answer: 'I did not find a close match for that. Try one of the topics below, or rephrase with the thing you are trying to do.',
      steps: [],
      related: ['posting-update', 'review-flow', 'erase-request', 'corrections', 'tva-basics', 'at-risk', 'roles', 'login-help']
    }
  ];

  var STOP_WORDS = ('a an and are as at be but by can do does for from had has have how i if in into is it its me my of on or our so that the their then there these they this to was what when where which who will with you your'
    + ' get got just like really need want would could should about please help hi hello thanks thank ok okay').split(' ');

  var ACTION_ALIASES = {
    dashboard: 'dashboard',
    'command center': 'dashboard',
    home: 'dashboard',
    timeline: 'timeline',
    tva: 'timeline',
    map: 'timeline',
    accounts: 'accounts',
    'account workspace': 'accounts',
    reviews: 'reviews',
    'review queue': 'reviews',
    team: 'team',
    'team roster': 'team'
  };

  function normalize(value) {
    return String(value == null ? '' : value)
      .toLowerCase()
      .replace(/[‘’]/g, "'")
      .replace(/[^a-z0-9' ]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokenize(value) {
    var normalized = normalize(value);
    if (!normalized) return [];
    return normalized.split(' ').filter(function (word) {
      return word.length > 1 && STOP_WORDS.indexOf(word) === -1;
    });
  }

  // Phrase hits score higher than loose single words, and a title that is almost
  // the whole question wins outright.
  function scoreIntent(entry, normalized, tokens) {
    var score = 0;
    var phrases = entry.keywords.concat([entry.title.toLowerCase()]);

    phrases.forEach(function (keyword) {
      var needle = normalize(keyword);
      if (!needle) return;
      if (normalized === needle) score += 12;
      else if (normalized.indexOf(needle) === 0) score += 6;
      else if (normalized.indexOf(' ' + needle + ' ') !== -1) score += 5;
      else if (normalized.indexOf(needle) !== -1) score += 3;
    });

    tokens.forEach(function (token) {
      phrases.forEach(function (keyword) {
        var needle = normalize(keyword);
        if (needle === token) score += 2;
        else if (needle.length > 3 && needle.indexOf(token) !== -1) score += 1;
      });
    });

    // A keyword buried in a long question is less reliable than one the user led with.
    if (tokens.length > 8) score *= 0.85;
    return score;
  }

  function byId(id) {
    for (var i = 0; i < ENTRIES.length; i += 1) if (ENTRIES[i].id === id) return ENTRIES[i];
    return null;
  }

  function rank(query) {
    var normalized = normalize(query);
    var tokens = tokenize(query);
    if (!normalized || !tokens.length) return [];
    return ENTRIES
      .map(function (entry) { return { entry: entry, score: scoreIntent(entry, normalized, tokens) }; })
      .filter(function (hit) { return hit.score > 0 && hit.entry.id !== 'no-answer'; })
      .sort(function (left, right) {
        if (right.score !== left.score) return right.score - left.score;
        return ENTRIES.indexOf(left.entry) - ENTRIES.indexOf(right.entry);
      });
  }

  // Returns the winning intent plus runners-up, which the panel turns into follow-up chips.
  function match(query) {
    var ranked = rank(query);
    if (!ranked.length) return { entry: byId('no-answer'), confidence: 0, alternatives: [] };
    var best = ranked[0];
    var runnerUp = ranked[1] ? ranked[1].score : 0;
    var separation = best.score === 0 ? 0 : (best.score - runnerUp) / best.score;
    var confidence = Math.max(0, Math.min(1, (best.score / 8) * 0.6 + separation * 0.4));
    return {
      entry: best.score >= 3 ? best.entry : byId('no-answer'),
      confidence: best.score >= 3 ? confidence : 0,
      alternatives: ranked.filter(function (hit) { return hit.entry.id !== best.entry.id; }).slice(0, 3).map(function (hit) { return hit.entry; })
    };
  }

  function resolveAction(entry) {
    if (!entry || !entry.action) return null;
    return entry.action;
  }

  // Lets a guided step jump the user to the screen where the work happens.
  function routeFromQuery(query) {
    var normalized = normalize(query);
    var words = Object.keys(ACTION_ALIASES);
    for (var i = 0; i < words.length; i += 1) {
      var word = words[i];
      if (normalized.indexOf(word) !== -1) return ACTION_ALIASES[word];
    }
    return null;
  }

  function topics() {
    return ENTRIES.filter(function (entry) {
      return entry.group !== 'Guide' && entry.keywords.length;
    }).map(function (entry) { return { id: entry.id, title: entry.title, group: entry.group }; });
  }

  function relatedTo(entry) {
    if (!entry) return [];
    return (entry.related || []).map(byId).filter(Boolean);
  }

  global.WatcherFaq = {
    entries: ENTRIES,
    normalize: normalize,
    tokenize: tokenize,
    scoreIntent: scoreIntent,
    rank: rank,
    match: match,
    topics: topics,
    relatedTo: relatedTo,
    resolveAction: resolveAction,
    routeFromQuery: routeFromQuery,
    byId: byId
  };
}(typeof window !== 'undefined' ? window : globalThis));
