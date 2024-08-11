const AllowedKeys = [
  'cachedOrganization',
  'organization',
  'userId',
  'username',
  'drilldownViewTradeHash',
  'cachedManualAlertTradeTp',
  'cachedManualAlertTradeHash',
  'notificationType',
  'viewOnlyPendingCards',
  'cachedFilterTradesByKey',
  'filterTradesByKey',
  'profilePic',
  'showTimeframe',
  'showRr',
  'autoApproval',
  'cachedTradeAlerts',
  'showTime',
  'showPipsAway',
  'showCurrentPrice',
  'strategyName',
  'strategyHash',
  'tradeHash',
  'currentVerticalNavItem',
  'currency',
  'NewTradetime',
  'disabledMetadataHashes',
  'cachedAlgorithmId',
  'cachedAdminSafeMode',
  'cachedPendingTradesAlgoSettings',
  'cachedPendingTradesAlgoAutoUpdate',
  'cachedMountTimeDataWrapper',
  'cachedKeyStroke_channel_id_pending_trades',
  'cachedGlobalFilterRouter',
  'cachedPendingTradesFilterDateRange',
  'cachedPendingTradesFilterStatus',
  'showPipsLevel',
  'BLOCKED_FROM_PALETTE_EVENT',
  'cachedTradeStatusUpdating',
  'cachedTradeStatusUpdatingTradeHash',
  'cachedTradeStatusUpdatingTradeStatus',
  'cachedMountTimeTradeNoteArea',
  'cachedEquityCurveDateLength'
];

function SetKeyLocalStorage_UNSAFE(key, value) {
  if (value !== undefined && value !== null) {
    localStorage.setItem(key, value);
  }
}

function GetKeyLocalStorage_UNSAFE(key) {
  return localStorage.getItem(key);
}

function RemoveKeyLocalStorage_UNSAFE(key) {
  localStorage.removeItem(key);
}



function SetKeyLocalStorage(key, value) {
  if (AllowedKeys.includes(key) && key.startsWith('cached')) {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, value);
    } else {
      // value is undefined or null
      console.warn(`Value for key "${key}" is undefined or null.`);
    }
  } else {
    // key is not allowed in AllowedKeys or starts with 'cached'
    console.warn(`Key "${key}" is not allowed or starts with 'cached'.`);
  }
}

function SetObjectLocalStorage(key, value, tradeHash) {
  if (AllowedKeys.includes(key)) {
    if (value !== undefined && value !== null) {
      const jsonObject = {
        value: value,
        tradeHash: tradeHash,
      };
      localStorage.setItem(key, JSON.stringify(jsonObject));
    }
  }
}

function GetObjectLocalStorage(key) {
  if (AllowedKeys.includes(key)) {
    const jsonObject = JSON.parse(localStorage.getItem(key));
    return jsonObject;
  } else {
    console.warn(`Key "${key}" is not allowed.`);
    return null;
  }
}

function RemoveObjectLocalStorage(key) {
  if (AllowedKeys.includes(key)) {
    localStorage.removeItem(key);
  } else {
    console.warn(`Key "${key}" is not allowed.`);
  }
}

function GetKeyLocalStorage(key) {
  if (typeof localStorage !== 'undefined') {
    if (AllowedKeys.includes(key)) {
      return localStorage.getItem(key);
    } else {
      console.warn(`Key "${key}" is not allowed.`);
      return null;
    }
  } else {
    console.warn('localStorage is not defined.');
    return null;
  }
}

function RemoveKeyLocalStorage(key) {
  if (AllowedKeys.includes(key)) {
    localStorage.removeItem(key);
  } else {
    console.warn(`Key "${key}" is not allowed.`);
  }
}

function RemoveAllCachedKeys() {
  AllowedKeys.filter((key) => !key.startsWith('cached')).forEach((key) => {
    localStorage.removeItem(key);
  });
}

function clearAll() {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
}

export {
  SetKeyLocalStorage,
  GetKeyLocalStorage,
  RemoveKeyLocalStorage,
  RemoveAllCachedKeys,
  SetObjectLocalStorage,
  GetObjectLocalStorage,
  RemoveObjectLocalStorage,
  clearAll,
  SetKeyLocalStorage_UNSAFE,
  GetKeyLocalStorage_UNSAFE,
  RemoveKeyLocalStorage_UNSAFE
};