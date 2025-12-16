(async function () {
  const employees = [];
  let selectedEmployeeId = -1;
  let selectedEmployee = {};

  const employeeList = document.querySelector(".employees_names--list");
  const employeeInfo = document.querySelector(".employees_single--info");

  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");
  const dobInput = document.querySelector(".addEmployee_create--dob");

  // Minimum age 18
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;

  // Show modal
  createEmployee.addEventListener("click", () => {
      addEmployeeModal.style.display = "flex";
  });

  // Close modal when clicking outside
  addEmployeeModal.addEventListener("click", (e) => {
      if (e.target === addEmployeeModal) addEmployeeModal.style.display = "none";
  });

  // Add employee
  addEmployeeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(addEmployeeForm);
      const empData = {};
      formData.forEach((val, key) => { empData[key] = val; });

      empData.id = employees.length === 0 ? 1001 : employees[employees.length - 1].id + 1;
      const dobParts = empData.dob.split("-");
      empData.age = new Date().getFullYear() - parseInt(dobParts[0], 10);
      empData.imageUrl = empData.imageUrl || "gfg.png";

      employees.push(empData);

      selectedEmployeeId = empData.id;
      selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);

      renderEmployees();
      renderSingleEmployee();

      addEmployeeForm.reset();
      addEmployeeModal.style.display = "none";
  });

  // Select/Delete employee
  employeeList.addEventListener("click", (e) => {
      // Delete
      if (e.target.classList.contains("delete-btn")) {
          const removeId = parseInt(e.target.parentElement.id);
          const index = employees.findIndex(emp => emp.id === removeId);
          if (index !== -1) employees.splice(index, 1);

          selectedEmployeeId = employees[0]?.id || -1;
          selectedEmployee = employees[0] || {};
          renderEmployees();
          renderSingleEmployee();
          return;
      }

      // Select employee
      const parent = e.target.closest(".employees_names--item");
      if (parent) {
          selectedEmployeeId = parseInt(parent.id);
          selectedEmployee = employees.find(emp => emp.id === selectedEmployeeId);
          renderEmployees();
          renderSingleEmployee();
      }
  });

  function renderEmployees() {
      employeeList.innerHTML = "";
      employees.forEach(emp => {
          const span = document.createElement("span");
          span.classList.add("employees_names--item");
          span.setAttribute("id", emp.id);
          span.innerHTML = `
              ${emp.firstName} ${emp.lastName}
              <button class="delete-btn">Delete</button>
          `;
          if (emp.id === selectedEmployeeId) span.classList.add("selected");
          employeeList.append(span);
      });
  }

  function renderSingleEmployee() {
      if (selectedEmployeeId === -1) {
          employeeInfo.innerHTML = "";
          return;
      }
      employeeInfo.innerHTML = `
          <img src="${selectedEmployee.imageUrl}" />
          <span class="employee_single--heading">ID: ${selectEmployee.id}<span>
          <span class="employees_single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})</span>
          <span>Address: ${selectedEmployee.address}</span>
          <span>Email: ${selectedEmployee.email}</span>
          <span>Cell no. : ${selectedEmployee.contactNumber}</span>
          <span>DOB : ${selectedEmployee.dob}</span>
      `;
  }

  // Initial render
  renderEmployees();
  renderSingleEmployee();
})();
