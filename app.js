const navItems = document.querySelectorAll('.nav-item');
const dashboardView = document.querySelector('#dashboard-view');
const otherView = document.querySelector('#other-view');
const pageTitle = document.querySelector('#page-title');
const otherTitle = document.querySelector('#other-title');
const breadcrumbCurrent = document.querySelector('#breadcrumb-current');
const memberModal = document.querySelector('#member-modal');
const toast = document.querySelector('#toast');
const titles = {
  dashboard: 'Votre tontin, en confiance.',
  members: 'Les membres du tontin',
  requests: 'Demandes d\'adhésion',
  payments: 'Suivi des cotisations',
  cycle: 'Le tour de tontine',
  notifications: 'Vos notifications',
  security: 'Sécurité et accès',
  settings: 'Paramètres du tontin'
};
const subtitles = {
  members: 'Consultez et gérez les membres validés de votre tontin.',
  requests: 'Examinez les nouvelles demandes avant de les valider.',
  payments: 'Retrouvez les versements et les retards de paiement.',
  cycle: 'Gérez l\'ordre des bénéficiaires du cycle actuel.',
  notifications: 'Restez en lien avec les membres de votre tontin.',
  security: 'Les accès et les actions sensibles sont protégés.',
  settings: 'Les informations générales de votre tontin.'
};

function showView(view) {
  navItems.forEach(item => item.classList.toggle('active', item.dataset.view === view));
  const isDashboard = view === 'dashboard';
  dashboardView.classList.toggle('hidden', !isDashboard);
  otherView.classList.toggle('hidden', isDashboard);
  pageTitle.textContent = titles[view];
  breadcrumbCurrent.textContent = isDashboard ? 'Vue générale' : titles[view];
  if (!isDashboard) {
    otherTitle.textContent = titles[view];
    otherView.querySelector('p').textContent = subtitles[view];
  }
  document.querySelector('.sidebar').classList.remove('open');
}

navItems.forEach(item => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelector('.go-requests').addEventListener('click', () => showView('requests'));
document.querySelector('.mobile-menu').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));

document.querySelector('#add-member').addEventListener('click', () => memberModal.classList.remove('hidden'));
document.querySelector('#empty-action').addEventListener('click', () => memberModal.classList.remove('hidden'));
function closeModal() { memberModal.classList.add('hidden'); }
document.querySelector('#modal-close').addEventListener('click', closeModal);
document.querySelector('#modal-cancel').addEventListener('click', closeModal);
memberModal.addEventListener('click', event => { if (event.target === memberModal) closeModal(); });

document.querySelector('#member-form').addEventListener('submit', event => {
  event.preventDefault();
  closeModal();
  toast.classList.remove('hidden');
  event.target.reset();
  window.setTimeout(() => toast.classList.add('hidden'), 3500);
});
