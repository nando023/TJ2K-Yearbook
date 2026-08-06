import { students } from './students.js';

const sections = [
  { name: 'Página principal', active: false },
  { name: 'Palabras de despedida', active: true, href: '#palabras' },
  { name: 'Personal administrativo', active: true, href: '#personal-administrativo' },
  { name: 'Servicios generales', active: true, href: '#servicios-generales' },
  { name: 'Profesores', active: false },
  { name: 'Prom 2000', active: true, href: '#prom-2000' },
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

  sections.forEach(({ name, active, href }) => {
    const item = document.createElement(active ? 'a' : 'button');
    item.className = active ? 'section-link section-link--active' : 'section-link section-link--pending';
    item.textContent = active ? name : `${name} (pendiente)`;

    if (active) {
      item.href = href;
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

  if (student.legacyLayout?.type === 'composite') {
    return `
      <h2 id="modal-title">${name}</h2>
      <p class="modal__group">Curso ${group}</p>
      ${renderLegacyLayout(student)}
    `;
  }

  if (student.legacyLayout?.type === 'article') {
    return `
      <h2 id="modal-title">${name}</h2>
      <p class="modal__group">Curso ${group}</p>
      ${renderLegacyArticle(student)}
    `;
  }

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

function renderLegacyLayout(student) {
  const layout = student.legacyLayout;
  const name = escapeHtml(student.name);
  const images = (layout.images || []).map((image) => `
    <img
      class="legacy-layout__image"
      src="./${escapeHtml(image.src)}"
      alt="${escapeHtml(image.alt)}"
      style="left: ${(image.left / layout.width) * 100}%; top: ${(image.top / layout.height) * 100}%; width: ${(image.width / layout.width) * 100}%; height: ${(image.height / layout.height) * 100}%;">
  `).join("");
  const textBlocks = (layout.textBlocks || []).map((block) => `
    <div
      class="legacy-layout__text"
      style="left: ${(block.left / layout.width) * 100}%; top: ${(block.top / layout.height) * 100}%; width: ${(block.width / layout.width) * 100}%; height: ${(block.height / layout.height) * 100}%; color: ${escapeHtml(block.color)}; font-size: ${(block.fontSize / layout.width) * 100}cqw; line-height: ${block.lineHeight}; font-weight: ${block.fontWeight}; text-align: ${escapeHtml(block.textAlign)}; font-family: ${escapeHtml(block.fontFamily)};">
      ${escapeHtml(block.text)}
    </div>
  `).join("");

  return `
    <figure class="legacy-layout" style="aspect-ratio: ${layout.width} / ${layout.height}; background: ${escapeHtml(layout.background)};">
      ${images}
      ${textBlocks}
      <figcaption>Composición original de ${name}</figcaption>
    </figure>
  `;
}

function renderLegacyArticle(student) {
  const layout = student.legacyLayout;
  const image = layout.image
    ? `<img class="legacy-article__image" src="./${escapeHtml(layout.image.src)}" alt="${escapeHtml(layout.image.alt)}" width="${layout.image.width}" height="${layout.image.height}">`
    : "";
  const details = (layout.details || []).map((detail) => `
    <p class="legacy-article__detail"><span>${escapeHtml(detail.label)}:</span> ${escapeHtml(detail.value)}</p>
  `).join("");
  const paragraphs = (layout.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const closing = (layout.closing || []).map((line) => `<p class="legacy-article__closing">${escapeHtml(line)}</p>`).join("");
  const backgroundStyle = layout.backgroundImage
    ? ` style="background-image: linear-gradient(rgb(0 0 0 / 18%), rgb(0 0 0 / 18%)), url('./${escapeHtml(layout.backgroundImage)}');"`
    : "";

  return `
    <article class="legacy-article legacy-article--${escapeHtml(layout.theme)}"${backgroundStyle}>
      ${image}
      ${layout.title ? `<h3>${escapeHtml(layout.title)}</h3>` : ""}
      ${layout.subtitle ? `<p class="legacy-article__subtitle">${escapeHtml(layout.subtitle)}</p>` : ""}
      ${details}
      <div class="legacy-article__body">
        ${paragraphs}
        ${closing}
      </div>
    </article>
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
