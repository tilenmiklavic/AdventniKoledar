import { writable, derived } from "svelte/store"

// @ts-ignore
const TIMEOUT = 3000

// @ts-ignore
function createNotificationStore (timeout) {
    const _notifications = writable([])

    // @ts-ignore
    function send (message, type = "default", timeout) {
        // @ts-ignore
        _notifications.update(state => {
            return [...state, { id: id(), type, message, timeout }]
        })
    }

    // @ts-ignore
    let timers = []

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            // @ts-ignore
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const { subscribe } = notifications

    return {
        subscribe,
        send,
				// @ts-ignore
				default: (msg, timeout) => send(msg, "default", timeout),
        // @ts-ignore
        danger: (msg, timeout) => send(msg, "danger", timeout),
        // @ts-ignore
        warning: (msg, timeout) => send(msg, "warning", timeout),
        // @ts-ignore
        info: (msg, timeout) => send(msg, "info", timeout),
        // @ts-ignore
        success: (msg, timeout) => send(msg, "success", timeout),
    }
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const notifications = createNotificationStore()