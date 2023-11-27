export function classes(array) {
    return array.join(' ');
}

export function decodeUrlToState(incomingParams, validParams) {
    console.log("decodeUrlToState() start: ", new Date().toISOString());
    const params = new URLSearchParams(incomingParams);
    const state = {};
    for (const [k, v] of params.entries()) {
        if (validParams.includes(k)) {
            state[k] = v;
        }
    }
    console.log("decodeUrlToState() end: ", new Date().toISOString());
    return state;
}

export function encodeStateToUrl(state) {
    if (!state) return '';
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(state)) {
        if (value === null || value === undefined) continue;
        params.set(key, value);
    }
    return params.toString();
}