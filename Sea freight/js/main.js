let users = JSON.parse(localStorage.getItem('users')) || [];
let editIndex = null;

const form = document.getElementById('crudForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const searchInput = document.getElementById('search');
const userList = document.getElementById('userList');
const submitBtn = document.getElementById('submitBtn');

renderUsers();

// إضافة أو تعديل مستخدم
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (!name || !email) return;

  const user = { name, email };

  if (editIndex === null) {
    users.push(user);
  } else {
    users[editIndex] = user;
    editIndex = null;
    submitBtn.textContent = '➕ Add';
    submitBtn.classList.remove('update-btn');
    submitBtn.classList.add('add-btn');
  }

  nameInput.value = '';
  emailInput.value = '';
  saveToLocalStorage();
  renderUsers();
});

// البحث التلقائي
searchInput.addEventListener('input', renderUsers);

// عرض المستخدمين
function renderUsers() {
  const filter = searchInput.value.toLowerCase();
  userList.innerHTML = '';

  users.forEach((user, index) => {
    if (
      !user.name.toLowerCase().includes(filter) &&
      !user.email.toLowerCase().includes(filter)
    ) return;

    const li = document.createElement('li');

    const info = document.createElement('span');
    info.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => editUser(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => deleteUser(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);

    userList.appendChild(li);
  });
}

// تعديل مستخدم
function editUser(index) {
  nameInput.value = users[index].name;
  emailInput.value = users[index].email;
  editIndex = index;

  submitBtn.textContent = '🔄 Update';
  submitBtn.classList.remove('add-btn');
  submitBtn.classList.add('update-btn');
}

// حذف مستخدم
function deleteUser(index) {
  users.splice(index, 1);
  saveToLocalStorage();
  renderUsers();
}

// حفظ في localStorage
function saveToLocalStorage() {
  localStorage.setItem('users', JSON.stringify(users));
}
