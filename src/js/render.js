import {generateGui} from "./generateGui.js";

const app = document.getElementById('app');

export function render() {
    app.innerHTML = '';

    const containerTag = generateGui();

    app.appendChild(containerTag)
}