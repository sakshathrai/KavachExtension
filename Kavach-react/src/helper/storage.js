import { storage } from "webextension-polyfill";

const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });
};

export async function getAutoScanPermit() {
  try {
    const permission = await readLocalStorage("autoScan");
    return permission;
  } catch (e) {
    return "Allow";
  }
}

export async function setAutoScanPermit(permit) {
  storage.local.set({ autoScan: permit });
}
