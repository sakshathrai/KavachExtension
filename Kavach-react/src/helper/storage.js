import { storage } from "webextension-polyfill";

const readLocalStorage = async (key) => {
  try {
    const result = await storage.local.get(key);
    if (result[key] === undefined) {
      throw new Error("Key not found");
    }
    return result[key];
  } catch (error) {
    throw error;
  }
};

export async function getAutoScanPermit() {
  try {
    const permission = await readLocalStorage("autoScan");
    console.log(permission);
    return permission;
  } catch (e) {
    return "Allow";
  }
}

export async function setAutoScanPermit(permit) {
  storage.local.set({ autoScan: permit });
}

export async function getDpCount() {
  try {
    const permission = await readLocalStorage("DP_COUNT");
    return parseInt(permission);
  } catch (e) {
    return 0;
  }
}

export async function setDpCount(DP_COUNT) {
  await storage.local.set({ DP_COUNT });
}

export async function getDpPatternCount() {
  try {
    const DARK_PATTERNS_COUNT = await readLocalStorage("DARK_PATTERNS_COUNT");
    return DARK_PATTERNS_COUNT;
    // return JSON.parse(DARK_PATTERNS_COUNT);
  } catch (e) {
    return {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    };
  }
}

export async function setDpPatternCount(DARK_PATTERNS_COUNT) {
  await storage.local.set({
    DARK_PATTERNS_COUNT: JSON.stringify(DARK_PATTERNS_COUNT),
  });
}

export async function getAllowedPatterns() {
  try {
    const allowedPatterns = await readLocalStorage("allowedPatterns");
    const allowedPatternsArr = JSON.parse(allowedPatterns);
    return allowedPatternsArr.length
      ? allowedPatternsArr
      : [0, 2, 3, 4, 5, 6, 7];
  } catch (e) {
    return [0, 2, 3, 4, 5, 6, 7];
  }
}

export async function setAllowedPatterns(allowedPatterns) {
  await storage.local.set({
    allowedPatterns: JSON.stringify(allowedPatterns),
  });
}

export async function getCurrentSite() {
  try {
    const url = await readLocalStorage("curSite");
    return url;
  } catch (e) {
    return "Kavach";
  }
}

export async function setCurrentSite(url) {
  await storage.local.set({ curSite: url });
}