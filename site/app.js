import { students } from './students.js';

const sections = [
  { name: 'Página principal', active: false },
  { name: 'Palabras de despedida', active: false },
  { name: 'Personal administrativo', active: false },
  { name: 'Servicios generales', active: false },
  { name: 'Profesores', active: false },
  { name: 'Prom 2000', active: true },
  { name: 'Pre-escolar', active: false },
  { name: 'Primaria', active: false },
  { name: 'Bachillerato', active: false },
  { name: 'Comités', active: false },
  { name: 'Equipos', active: false },
  { name: 'Parejas', active: false },
  { name: 'Hermanos', active: false },
  { name: 'Collage', active: false },
];

const sectionContainer = document.querySelector('#yearbook-sections');
const groupContainer = document.querySelector('#student-groups');
const modal = document.querySelector('#student-modal');
const modalContent = document.querySelector('#modal-content');
const closeButton = document.querySelector('.modal__close');
let previousFocus = null;

function renderSections() {
  const fragment = document.createDocumentFragment();

  sections.forEach(({ name, active }) => {
    const item = document.createElement(active ? 'a' : 'button');
    item.className = active ? 'section-link section-link--active' : 'section-link section-link--pending';
    item.textContent = active ? name : `${name} (pendiente)`;

    if (active) {
      item.href = '#prom-2000';
    } else {
      item.type = 'button';
      item.disabled = true;
    }

    fragment.append(item);
  });

  sectionContainer.append(fragment);
}

function createStudentButton(student) {
  const button = document.createElement('button');
  button.className = 'student-card';
  button.type = 'button';
  button.textContent = student.name;
  button.addEventListener('click', () => openStudent(student));
  return button;
}

function renderStudents() {
  const studentsByGroup = Object.groupBy(students, ({ group }) => group);
  const fragment = document.createDocumentFragment();

  Object.entries(studentsByGroup).forEach(([group, members]) => {
    const section = document.createElement('section');
    section.className = 'student-group';
    section.setAttribute('aria-labelledby', `group-${group}`);

    const title = document.createElement('h3');
    title.id = `group-${group}`;
    title.textContent = group;

    const grid = document.createElement('div');
    grid.className = 'student-grid';
    members.forEach((student) => grid.append(createStudentButton(student)));

    section.append(title, grid);
    fragment.append(section);
  });

  groupContainer.append(fragment);
}

function openStudent(student) {
  previousFocus = document.activeElement;
  modalContent.innerHTML = renderStudentModal(student);
  modal.hidden = false;
  document.body.classList.add('modal-open');
  closeButton.focus();
}

function closeStudent() {
  if (modal.hidden) return;

  modal.hidden = true;
  modalContent.replaceChildren();
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
  previousFocus = null;
}

function renderStudentModal(student) {
  const name = escapeHtml(student.name);
  const group = escapeHtml(student.group);

  if (!student.hasProfileImage || !student.image) {
    return `
      <h2 id="modal-title">${name}</h2>
      <p class="modal__group">Curso ${group}</p>
      <p class="modal__notice">No hay una imagen disponible en el archivo original.</p>
    `;
  }

  const imagePath = `./assets/students/${student.id}${getImageExtension(student.image)}`;
  return `
    <h2 id="modal-title">${name}</h2>
    <p class="modal__group">Curso ${group}</p>
    <img class="modal__image" src="${imagePath}" alt="Retrato de ${name}">
  `;
}

function getImageExtension(imagePath) {
  return imagePath.slice(imagePath.lastIndexOf('.'));
}

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeStudent);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeStudent();
});

renderSections();
renderStudents();
