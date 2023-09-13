const ul = document.querySelector('ul');
const inputName = document.getElementById('name');
const inputInfix = document.getElementById('infix');
const inputLastName = document.getElementById('lastname');
const inputStreet = document.getElementById('streetname');
const inputStreetNumber = document.getElementById('streetnumber');
const inputPostal = document.getElementById('postalcode');
const inputCity = document.getElementById('city');
let usersArray = localStorage.getItem('users') ?
  JSON.parse(localStorage.getItem('users')) : [];
console.log(usersArray);

function addTask(taskObj) {
  const li = document.createElement('li');
  li.classList.add("gradient");
  li.textContent = `${taskObj.name} ${taskObj.infix} ${taskObj.lastname}`;

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  li.appendChild(deleteButton);
  deleteButton.classList.add("delete");

  deleteButton.addEventListener('click', () => onDelete(taskObj));

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  li.appendChild(editButton);
  editButton.classList.add("delete");

  editButton.addEventListener('click', () => onEdit(taskObj));

  const infoButton = document.createElement('button');
  infoButton.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
  li.appendChild(infoButton);
  infoButton.classList.add('delete');

  infoButton.addEventListener('click', () => onInfo(taskObj));

  if (ul) {
    ul.appendChild(li);
  }
}

function onEdit(taskObj) {
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const editUserIdInput = document.getElementById('editUserId');
  const editNameInput = document.getElementById('editName');
  const editInfixInput = document.getElementById('editInfix');
  const editLastNameInput = document.getElementById('editLastName');
  const editStreetInput = document.getElementById('editStreet');
  const editStreetNumberInput = document.getElementById('editStreetNumber');
  const editPostalInput = document.getElementById('editPostal');
  const editCityInput = document.getElementById('editCity');

  editUserIdInput.value = taskObj.id;
  editNameInput.value = taskObj.name;
  editInfixInput.value = taskObj.infix;
  editLastNameInput.value = taskObj.lastname;
  editStreetInput.value = taskObj.street;
  editStreetNumberInput.value = taskObj.streetnumber;
  editPostalInput.value = taskObj.postalcode;
  editCityInput.value = taskObj.city;

  editModal.style.display = 'block';

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = editUserIdInput.value;
    const userIndex = usersArray.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      usersArray[userIndex] = {
        id: userId,
        name: editNameInput.value,
        infix: editInfixInput.value,
        lastname: editLastNameInput.value,
        street: editStreetInput.value,
        streetnumber: editStreetNumberInput.value,
        postalcode: editPostalInput.value,
        city: editCityInput.value,
      };

      localStorage.setItem('users', JSON.stringify(usersArray));

      editModal.style.display = 'none';

      ul.innerHTML = '';
      usersArray.forEach(addTask);
    }
  });
}

const closeEditModalButton = document.getElementById('closeEditModal');
closeEditModalButton.addEventListener('click', () => {
  const editModal = document.getElementById('editModal');
  editModal.style.display = 'none';
});


function onDelete(taskObj) {
  if (confirm('Weet u het zeker?')) {
    const index = usersArray.findIndex(user => user === taskObj);
    if (index !== -1) {
      usersArray.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(usersArray));
      ul.innerHTML = '';
      usersArray.forEach(addTask);
    }
  }
}

function onInfo(taskObj) {
  const modal = document.getElementById('userModal');
  const userInfoDiv = document.getElementById('userInfo');

  userInfoDiv.innerHTML = '';

  const nameParagraph = document.createElement('p');
  nameParagraph.textContent = `${taskObj.name}`;
  userInfoDiv.appendChild(nameParagraph);

  if (taskObj.infix.trim() !== '') {
    const infixParagraph = document.createElement('p');
    infixParagraph.textContent = ` ${taskObj.infix}`;
    userInfoDiv.appendChild(infixParagraph);
  }

  const lastNameParagraph = document.createElement('p');
  lastNameParagraph.textContent = `${taskObj.lastname}`;
  userInfoDiv.appendChild(lastNameParagraph);

  const streetParagraph = document.createElement('p');
  streetParagraph.textContent = `${taskObj.street}`;
  userInfoDiv.appendChild(streetParagraph);

  const streetNumberParagraph = document.createElement('p');
  streetNumberParagraph.textContent = `${taskObj.streetnumber}`;
  userInfoDiv.appendChild(streetNumberParagraph);

  const postalCodeParagraph = document.createElement('p');
  postalCodeParagraph.textContent = `${taskObj.postalcode}`;
  userInfoDiv.appendChild(postalCodeParagraph);

  const cityCodeParagraph = document.createElement('p');
  cityCodeParagraph.textContent = `${taskObj.city}`;
  userInfoDiv.appendChild(cityCodeParagraph);

  modal.style.display = 'block';

  const closeModalButton = document.getElementById('closeModal');
  closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

function generateUniqueId() {
  return Date.now().toString();
}

function add() {
  const nameText = inputName.value;
  const infixText = inputInfix.value;
  const lastNameText = inputLastName.value;
  const streetText = inputStreet.value;
  const streetNumberText = inputStreetNumber.value;
  const postalText = inputPostal.value;
  const cityText = inputCity.value;

  if (nameText.trim() === '') {
    alert('vul uw naam in');
    return;
  }

  if (lastNameText.trim() === '') {
    alert('vul uw achternaam in');
    return;
  }



  const taskObj = {
    name: nameText,
    infix: infixText,
    lastname: lastNameText,
    street: streetText,
    streetnumber: streetNumberText,
    postalcode: postalText,
    city: cityText,
    id: generateUniqueId()
  };


  usersArray.push(taskObj);
  localStorage.setItem('users', JSON.stringify(usersArray));
  addTask(taskObj);
  inputName.value = '';
  inputInfix.value = '';
  inputLastName.value = '';
  inputStreet.value = '';
  inputStreetNumber.value = '';
  inputPostal.value = '';
  inputCity.value = '';
  alert('succesvol!');
}

usersArray.forEach(addTask);

