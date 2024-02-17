function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')

        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'delete');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}


//button eventlisteners

//get submit button element
const submitbutton = document.getElementById("submit");
if (submitbutton) { //check if it's rendered
  submitbutton.addEventListener('click', createEmployee); //adding eventlistener to it
}

const buttonlist = document.querySelector('tbody');
buttonlist.addEventListener('click', function (event) {  //getting the delete button clicked
  if (event.target.classList.contains('delete')) {   //getting all elements with delete class in them (was added to fetchemployees above for convenience)
    deleteEmployee(event.target.parentElement.previousElementSibling.previousElementSibling.innerHTML);  //tracing the node tree to get the id of the delete button clicked
  }
});




//create and delete functions

function createEmployee() {
  const idInput = document.getElementById('code').value;  //grabbing name and id from their fields
  const nameInput = document.getElementById('fam').value;

  // Check if both id and name are provided
  if (!idInput || !nameInput) {
    console.error('Please fill in all fields');
    return;
  }

  const employee = { id: idInput, name: nameInput };  //creating object to pass to json file

  fetch('http://localhost:3000/api/v1/employee', { // post fetch request with body of employee containing dat to be added
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee)
  })
    .then(response => {
      if (response.ok) {
        console.log("created Employee successfully");
      } else {
        throw new Error('Failed to create employee');
      }
      fetchEmployees();  //calling fetchemployees to update ui
    })
    .catch(error => console.error(error));
}


// TODO
function deleteEmployee(employeeId) {
  fetch(`http://localhost:3000/api/v1/employee/${employeeId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('Employee deleted successfully');
      } else {
        throw new Error('Failed to delete employee');
      }
      fetchEmployees();
    })
    .catch(error => console.error(error.message));
}

fetchEmployees()