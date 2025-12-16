(async function () {
    const employees = [];
    let selectedEmployeeId = -1;
    let isEditMode = false;
    let editEmployeeId = null;
  
    const employeeList = document.querySelector(".employees_names--list");
    const employeeInfo = document.querySelector(".employees_single--info");
  
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");
    const dobInput = document.querySelector(".addEmployee_create--dob");
  
    // Minimum age 18
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;
  
    // OPEN MODAL (ADD MODE)
    createEmployee.addEventListener("click", () => {
      isEditMode = false;
      editEmployeeId = null;
      addEmployeeForm.reset();
      addEmployeeModal.style.display = "flex";
    });
  
    // CLOSE MODAL
    addEmployeeModal.addEventListener("click", (e) => {
      if (e.target === addEmployeeModal) addEmployeeModal.style.display = "none";
    });
  
    // ADD / UPDATE EMPLOYEE
    addEmployeeForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = new FormData(addEmployeeForm);
      const empData = {};
      formData.forEach((val, key) => (empData[key] = val));
  
      // Age calculation
      const dobYear = parseInt(empData.dob.split("-")[0]);
      empData.age = new Date().getFullYear() - dobYear;
      empData.imageUrl = empData.imageUrl || "gfg.png";
  
      if (isEditMode) {
        // UPDATE
        const index = employees.findIndex(emp => emp.id === editEmployeeId);
        if (index !== -1) {
          empData.id = editEmployeeId;
          employees[index] = { ...employees[index], ...empData };
          selectedEmployeeId = editEmployeeId;
        }
      } else {
        // ADD
        empData.id =
          employees.length === 0
            ? 1001
            : employees[employees.length - 1].id + 1;
  
        employees.push(empData);
        selectedEmployeeId = empData.id;
      }
  
      isEditMode = false;
      editEmployeeId = null;
  
      renderEmployees();
      renderSingleEmployee();
  
      addEmployeeForm.reset();
      addEmployeeModal.style.display = "none";
    });
  
    // LIST ACTIONS
    employeeList.addEventListener("click", (e) => {
      const parent = e.target.closest(".employees_names--item");
      if (!parent) return;
  
      const id = parseInt(parent.id);
  
      // DELETE
      if (e.target.classList.contains("delete-btn")) {
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) employees.splice(index, 1);
  
        selectedEmployeeId = employees[0]?.id || -1;
        renderEmployees();
        renderSingleEmployee();
        return;
      }
  
      // EDIT
      if (e.target.classList.contains("edit-btn")) {
        const emp = employees.find(emp => emp.id === id);
        if (!emp) return;
  
        isEditMode = true;
        editEmployeeId = id;
  
        addEmployeeForm.firstName.value = emp.firstName;
        addEmployeeForm.lastName.value = emp.lastName;
        addEmployeeForm.imageUrl.value = emp.imageUrl;
        addEmployeeForm.position.value = emp.position;
        addEmployeeForm.email.value = emp.email;
        addEmployeeForm.contactNumber.value = emp.contactNumber;
        addEmployeeForm.address.value = emp.address;
        addEmployeeForm.dob.value = emp.dob;
  
        addEmployeeModal.style.display = "flex";
        return;
      }
  
      // SELECT
      selectedEmployeeId = id;
      renderEmployees();
      renderSingleEmployee();
    });
  
    function renderEmployees() {
      employeeList.innerHTML = "";
      employees.forEach(emp => {
        const span = document.createElement("span");
        span.className = "employees_names--item";
        span.id = emp.id;
        span.innerHTML = `
          ${emp.firstName} ${emp.lastName}
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        `;
        if (emp.id === selectedEmployeeId) span.classList.add("selected");
        employeeList.append(span);
      });
    }
  
    function renderSingleEmployee() {
      const emp = employees.find(e => e.id === selectedEmployeeId);
      if (!emp) {
        employeeInfo.innerHTML = "";
        return;
      }
  
      employeeInfo.innerHTML = `
        <img src="${emp.imageUrl}">
        <span class="employees_single--heading">ID: ${emp.id}</span>
        <span class="employees_single--heading">
          ${emp.firstName} ${emp.lastName} (${emp.age})
        </span>
        <span>Position: ${emp.position}</span>
        <span>Address: ${emp.address}</span>
        <span>Email: ${emp.email}</span>
        <span>Cell no.: ${emp.contactNumber}</span>
        <span>DOB: ${emp.dob}</span>
      `;
    }
  
  })();
