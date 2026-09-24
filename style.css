* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --background: #07111f;
    --background-light: #0b1728;

    --panel: #101d2f;
    --panel-light: #15243a;

    --border: rgba(255, 255, 255, 0.08);

    --text: #f4f7fb;
    --text-secondary: #8ea0b8;

    --positive: #ff4d67;
    --negative: #3f9cff;

    --accent: #7c5cff;

    --green: #35d07f;

    --canvas: #06101d;
}


body {
    min-height: 100vh;

    background:
        radial-gradient(
            circle at 50% -20%,
            rgba(70, 105, 180, 0.18),
            transparent 40%
        ),
        var(--background);

    color: var(--text);

    font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
}


button,
input {
    font-family: inherit;
}


.app {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
}


/* =========================
   TOPBAR
========================= */

.topbar {
    height: 76px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 30px;

    border-bottom: 1px solid var(--border);

    background: rgba(7, 17, 31, 0.85);

    backdrop-filter: blur(12px);
}


.brand {
    display: flex;
    align-items: center;

    gap: 13px;
}


.brand-icon {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 12px;

    background: linear-gradient(
        135deg,
        #795cff,
        #4a8dff
    );

    font-size: 22px;

    box-shadow:
        0 8px 30px rgba(90, 80, 255, 0.25);
}


.brand h1 {
    font-size: 17px;
    font-weight: 700;
}


.brand span {
    display: block;

    margin-top: 2px;

    font-size: 12px;

    color: var(--text-secondary);
}


.status {
    display: flex;
    align-items: center;

    gap: 8px;

    font-size: 12px;

    color: var(--text-secondary);
}


.status-dot {
    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: var(--green);

    box-shadow:
        0 0 12px rgba(53, 208, 127, 0.7);
}


/* =========================
   MAIN
========================= */

.main-content {
    flex: 1;

    width: 100%;

    max-width: 1500px;

    margin: auto;

    padding: 26px 30px;

    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        330px;

    gap: 22px;
}


/* =========================
   SIMULATION
========================= */

.simulation-card {
    min-width: 0;

    background: var(--panel);

    border: 1px solid var(--border);

    border-radius: 18px;

    overflow: hidden;

    box-shadow:
        0 20px 70px rgba(0, 0, 0, 0.18);
}


.simulation-header {
    height: 76px;

    padding: 0 22px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid var(--border);
}


.simulation-header h2 {
    font-size: 15px;
}


.simulation-header p {
    margin-top: 4px;

    color: var(--text-secondary);

    font-size: 12px;
}


.simulation-badge {
    padding: 7px 11px;

    border-radius: 8px;

    background: rgba(53, 208, 127, 0.08);

    color: #7be5aa;

    font-size: 11px;
}


.simulation-badge span {
    margin-right: 5px;
}


/* =========================
   CANVAS
========================= */

.canvas-container {
    position: relative;

    width: 100%;

    height: calc(100vh - 180px);

    min-height: 550px;

    background: var(--canvas);
}


#simulationCanvas {
    display: block;

    width: 100%;
    height: 100%;

    cursor: default;
}


.canvas-help {
    position: absolute;

    bottom: 14px;
    left: 16px;

    padding: 7px 10px;

    border-radius: 8px;

    background: rgba(5, 12, 22, 0.8);

    border: 1px solid rgba(255, 255, 255, 0.07);

    color: var(--text-secondary);

    font-size: 11px;

    pointer-events: none;
}


/* =========================
   PANEL
========================= */

.control-panel {
    background: var(--panel);

    border: 1px solid var(--border);

    border-radius: 18px;

    overflow: hidden;

    height: fit-content;
}


.panel-section {
    padding: 20px;

    border-bottom: 1px solid var(--border);
}


.panel-section:last-child {
    border-bottom: none;
}


.panel-section h3 {
    margin-bottom: 13px;

    font-size: 12px;

    font-weight: 600;

    color: var(--text-secondary);

    text-transform: uppercase;

    letter-spacing: 0.07em;
}


/* =========================
   BUTTONS
========================= */

.main-button,
.secondary-button {
    width: 100%;

    height: 42px;

    border-radius: 9px;

    border: none;

    cursor: pointer;

    font-size: 13px;

    transition:
        transform 0.15s,
        background 0.15s;
}


.main-button {
    display: flex;

    align-items: center;
    justify-content: center;

    gap: 9px;

    background: linear-gradient(
        135deg,
        #7158ff,
        #4d86ff
    );

    color: white;

    font-weight: 600;

    box-shadow:
        0 8px 22px rgba(86, 90, 255, 0.2);
}


.main-button:hover {
    transform: translateY(-1px);
}


.secondary-button {
    margin-top: 9px;

    background: var(--panel-light);

    color: var(--text);

    border: 1px solid var(--border);
}


.secondary-button:hover {
    background: #1a2b43;
}


/* =========================
   CHARGE BUTTONS
========================= */

.charge-buttons {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 9px;
}


.charge-button {
    min-height: 74px;

    display: flex;
    align-items: center;

    gap: 9px;

    padding: 10px;

    border-radius: 10px;

    border: 1px solid var(--border);

    background: var(--panel-light);

    color: var(--text);

    cursor: pointer;

    text-align: left;

    transition:
        transform 0.15s,
        border-color 0.15s;
}


.charge-button:hover {
    transform: translateY(-2px);
}


.charge-button.positive:hover {
    border-color: rgba(255, 77, 103, 0.5);
}


.charge-button.negative:hover {
    border-color: rgba(63, 156, 255, 0.5);
}


.charge-symbol {
    width: 32px;
    height: 32px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    font-size: 18px;
    font-weight: 700;
}


.positive .charge-symbol {
    background: rgba(255, 77, 103, 0.14);

    color: var(--positive);
}


.negative .charge-symbol {
    background: rgba(63, 156, 255, 0.14);

    color: var(--negative);
}


.charge-button strong {
    display: block;

    font-size: 11px;
}


.charge-button small {
    display: block;

    margin-top: 3px;

    font-size: 10px;

    color: var(--text-secondary);
}


/* =========================
   SLIDER
========================= */

.section-title-row {
    display: flex;

    justify-content: space-between;

    align-items: center;
}


.section-title-row h3 {
    margin-bottom: 0;
}


#speedValue {
    color: #9f90ff;

    font-size: 12px;

    font-weight: 700;
}


#speedSlider {
    width: 100%;

    margin-top: 17px;

    accent-color: var(--accent);

    cursor: pointer;
}


.range-labels {
    display: flex;

    justify-content: space-between;

    margin-top: 5px;

    color: #63748b;

    font-size: 9px;
}


/* =========================
   INFORMATION
========================= */

.info-card {
    padding: 5px 0;

    border-radius: 10px;

    background: rgba(255, 255, 255, 0.025);
}


.info-row {
    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 10px 12px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}


.info-row:last-child {
    border-bottom: none;
}


.info-row span {
    color: var(--text-secondary);

    font-size: 11px;
}


.info-row strong {
    font-size: 11px;

    color: white;
}


/* =========================
   LEGEND
========================= */

.legend-item {
    display: flex;

    align-items: center;

    gap: 9px;

    margin-bottom: 9px;

    color: var(--text-secondary);

    font-size: 11px;
}


.legend-item:last-child {
    margin-bottom: 0;
}


.legend-circle {
    width: 10px;
    height: 10px;

    border-radius: 50%;
}


.legend-circle.positive {
    background: var(--positive);

    box-shadow:
        0 0 10px rgba(255, 77, 103, 0.7);
}


.legend-circle.negative {
    background: var(--negative);

    box-shadow:
        0 0 10px rgba(63, 156, 255, 0.7);
}


.legend-circle.test {
    background: #ffd54a;

    box-shadow:
        0 0 10px rgba(255, 213, 74, 0.7);
}


/* =========================
   FOOTER
========================= */

footer {
    height: 45px;

    padding: 0 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid var(--border);

    color: #60728a;

    font-size: 10px;
}


/* =========================
   RESPONSIVO
========================= */

@media (max-width: 1000px) {

    .main-content {
        grid-template-columns: 1fr;
    }

    .control-panel {
        display: grid;

        grid-template-columns:
            repeat(2, 1fr);
    }

    .panel-section {
        border-right: 1px solid var(--border);
    }

    .canvas-container {
        height: 600px;
    }
}


@media (max-width: 650px) {

    .topbar {
        padding: 0 16px;
    }

    .main-content {
        padding: 15px;
    }

    .simulation-header {
        padding: 0 15px;
    }

    .simulation-badge {
        display: none;
    }

    .control-panel {
        display: block;
    }

    .panel-section {
        border-right: none;
    }

    .canvas-container {
        height: 500px;

        min-height: 400px;
    }

    footer {
        padding: 0 15px;
    }
}
