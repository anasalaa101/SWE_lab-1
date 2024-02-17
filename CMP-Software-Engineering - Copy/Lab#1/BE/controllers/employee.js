const employee = [
  { id: '1', name: 'Mohamed Sayed' }
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  const index = employee.findIndex(emp => emp.id === id);

  if (index !== -1) {
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const newEmployee = req.body;
  const existingEmployee = employee.find(emp => emp.id === newEmployee.id);

  if (existingEmployee) {
    return res.status(400).json({ error: 'Employee with the same id already exists' });
  }

  employee.push(newEmployee);
  res.status(201).json({ message: 'Employee created successfully' });
};
