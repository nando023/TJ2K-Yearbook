import { students } from './students.js';

const sections = [
  { name: 'Pagina principal', active: false },
  { name: 'Palabras de despedida', active: false },
  { name: 'Personal administrativo', active: false },
  { name: 'Servivicos generales', active: false },
  { name: 'Profesores', active: false },
  { name: 'Prom 2000', active: true },
  { name: 'Pre-escolar', active: false },
  { name: 'Primaria', active: false },
  { name: 'Bachillerato', active: false },
  { name: 'Comites', active: false },
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
  button.addEventListener('click', () => openStudentModal(student, button));
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

function openStudentModal(student, trigger) {
  previousFocus = trigger;
  modalContent.replaceChildren();

  const title = document.createElement('h2');
  title.id = 'modal-title';
  title.textContent = student.name;

  const group = document.createElement('p');
  group.className = 'modal__group';
  group.textContent = `Curso ${student.group}`;

  modalContent.append(title, group);

  if (student.hasProfileImage && student.image) {
    const image = document.createElement('img');
    image.className = 'modal__image';
    image.src = `../${student.image}`;
    image.alt = `Retrato de ${student.name}`;
    modalContent.append(image);
  } else {
    const message = document.createElement('p');
    message.className = 'modal__notice';
    message.textContent = 'No hay una imagen disponible en el archivo original.';
    modalContent.append(message);
  }

  modal.hidden = false;
  document.body.classList.add('modal-open');
  closeButton.focus();
}

function closeModal() {
  if (modal.hidden) return;

  modal.hidden = true;
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
}

document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

renderSections();
renderStudents();
