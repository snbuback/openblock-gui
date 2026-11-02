const STORAGE_PREFIX = 'openblock.webrepl.';
const DEFAULT_PORT = '8266';

const storageKey = deviceId => `${STORAGE_PREFIX}${deviceId}`;

/**
 * Read the last connection settings for a device.
 * @param {string} deviceId - device id.
 * @returns {object} - {host, port, password, remember}.
 */
const loadWebReplConfig = deviceId => {
    try {
        const raw = window.localStorage.getItem(storageKey(deviceId));
        if (raw) {
            const saved = JSON.parse(raw);
            return {
                host: typeof saved.host === 'string' ? saved.host : '',
                port: saved.port ? String(saved.port) : DEFAULT_PORT,
                password: saved.remember && typeof saved.password === 'string' ? saved.password : '',
                remember: !!saved.remember
            };
        }
    } catch (e) {
        // Storage may be unavailable (private mode, embedded webview).
    }
    return {host: '', port: DEFAULT_PORT, password: '', remember: false};
};

/**
 * Persist the connection settings after a successful connection. The
 * password is only stored when the user explicitly asked to remember it.
 * @param {string} deviceId - device id.
 * @param {object} config - {host, port, password, remember}.
 */
const saveWebReplConfig = (deviceId, config) => {
    if (!config) return;
    try {
        window.localStorage.setItem(storageKey(deviceId), JSON.stringify({
            host: config.host || '',
            port: config.port || DEFAULT_PORT,
            remember: !!config.remember,
            password: config.remember ? (config.password || '') : ''
        }));
    } catch (e) {
        // Ignore storage failures; the connection itself already succeeded.
    }
};

export {
    DEFAULT_PORT,
    loadWebReplConfig,
    saveWebReplConfig
};
