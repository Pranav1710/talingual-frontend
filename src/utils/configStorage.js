// src/utils/configStorage.js
const CONFIG_KEY = "resume_default_config";

export function getStoredConfig() {
  const raw = localStorage.getItem(CONFIG_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setStoredConfig(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}
