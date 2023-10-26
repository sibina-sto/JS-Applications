import { showSection } from '../../router.js';

const section = document.querySelector('#homeSection');
section.remove();

export function showHome() {
    showSection(section);
}
