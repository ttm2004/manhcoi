
(function enableEverything() {
    const events = [
        'contextmenu', 'keydown', 'keyup', 'keypress',
        'mousedown', 'mouseup', 'copy', 'cut', 'paste'
    ];
    const targets = [document, document.body, window];
    events.forEach(event => {
        targets.forEach(target => {
            try {
                target['on' + event] = null;
                Object.defineProperty(target, 'on' + event, {
                    get: () => null,
                    set: () => {},
                    configurable: true
                });
            } catch (e) {}
        });
        window.addEventListener(event, e => e.stopPropagation(), true);
    });

    console.log("🟢 Đã bật lại F12, F5, chuột phải, Ctrl+C,... thành công!");
})();

