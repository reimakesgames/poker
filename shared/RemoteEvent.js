class RemoteEvent {
    _listeners = [];
    static _websockets = {};
    static RemoteEvents = {};
    static id = "";
    constructor() {
        RemoteEvent.RemoteEvents[this.constructor.name] = this;
    }
    Connect(callback) {
        this._listeners.push(callback);
    }
    _emit(data) {
        for (let listener of this._listeners) {
            listener(data);
        }
    }
    _transmit(data) {
        // go through all the websockets and send the data
        for (let ws of RemoteEvent._websockets[RemoteEvent.id] || []) {
            if (ws)
                ws.send(JSON.stringify({
                    target: this.constructor.name,
                    id: RemoteEvent.id,
                    data,
                }));
        }
    }
    MessageServer(data) {
        this._transmit(data);
    }
    MessageClient(data) {
        this._transmit(data);
    }
}
export { RemoteEvent };
