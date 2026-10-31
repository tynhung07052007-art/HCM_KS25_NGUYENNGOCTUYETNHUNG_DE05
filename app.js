
let employees = [
    {
        employeeCode: "EMP-001",
        fullName: "Ngô Thanh Tùng",
        department: "Phòng Kỹ Thuật",
        age: 28,
        experienceYears: 5
    },
    {
        employeeCode: "EMP-002",
        fullName: "Hồ Thị Thu",
        department: "Phòng Nhân Sự",
        age: 35,
        experienceYears: 10
    },
    {
        employeeCode: "EMP-003",
        fullName: "Mai Quốc Việt",
        department: "Phòng Kỹ Thuật",
        age: 24,
        experienceYears: 1
    }
];
function menu() {
    while (true) {
        console.log("================================");
        console.log("HỆ THỐNG QUẢN LÝ NHÂN VIÊN SKYTECH");
        console.log("================================");
        console.log("1. Hiển thị danh sách nhân viên");
        console.log("2. Thêm nhân viên mới");
        console.log("3. Cập nhật thông tin nhân viên");
        console.log("4. Xóa nhân viên");
        console.log("5. Tìm kiếm theo phòng ban");
        console.log("0. Thoát chương trình");
        console.log("================================");

        let choice = prompt("Nhập lựa chọn (0 - 5):");

        if (choice === null) {
            console.log("Lựa chọn không hợp lệ");
            continue;
        }

        choice = choice.trim();

        switch (choice) {
            case "1":
                showEmployees();
                break;

            case "2":
                addEmployee();
                break;

            case "3":
                updateEmployee();
                break;

            case "4":
                deleteEmployee();
                break;

            case "5":
                searchEmployeeByDepartment();
                break;

            case "0":
                employeeReport();
                console.log("Cảm ơn bạn đã sử dụng chương trình!");
                return;

            default:
                console.log("Lựa chọn không hợp lệ!");
                break;
        }
    }
}
function normalizeText(rawText) {
    let text = rawText.trim();
    let words = text.split(" ");
    let result = [];

    for (let i = 0; i < words.length; i++) {
        if (words[i] !== "") {
            let word = words[i].toLowerCase();
            word = word.charAt(0).toUpperCase() + word.slice(1);
            result.push(word);
        }
    }

    return result.join(" ");
}

function findEmployeeIndex(code) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeCode === code) {
            return i;
        }
    }

    return -1;
}


function validateEmployeeCode(code) {
    if (code === "") {
        return "Chưa nhập mã nhân viên";
    }

    if (code.length < 6) {
        return "Độ dài mã nhỏ hơn 6 ký tự";
    }

    if (!code.startsWith("EMP-")) {
        return 'Mã phải bắt đầu bằng EMP-';
    }

    if (/\s/.test(code)) {
        return "Mã không được chứa khoảng trắng";
    }

    if (findEmployeeIndex(code) !== -1) {
        return "Mã nhân viên đã tồn tại";
    }

    return "";
}

function inputIntegerInRange(message, min, max) {
    while (true) {
        let value = prompt(message);

        if (value === null) {
            return null;
        }

        value = value.trim();

        if (value === "") {
            console.log("Chưa nhập dữ liệu, vui lòng nhập lại");
        } else if (!Number.isInteger(Number(value))) {
            console.log("Phải nhập số nguyên");
        } else if (Number(value) < min || Number(value) > max) {
            console.log("Giá trị nằm ngoài phạm vi");
        } else {
            return Number(value);
        }
    }
}

function displayEmployees(list) {
    if (list.length === 0) {
        console.log("Danh sách nhân viên trống");
        return;
    }

    for (let i = 0; i < list.length; i++) {
        console.log(
            (i + 1) + ". " +
            list[i].employeeCode + " - " +
            list[i].fullName + " - " +
            list[i].department
        );

        console.log(
            "Tuổi: " + list[i].age +
            " | Số năm kinh nghiệm: " + list[i].experienceYears
        );
    }

    console.log("Tổng: " + list.length + " nhân viên");
}

// 6. Nhập thông tin không được để trống
function inputRequiredText(message) {
    while (true) {
        let value = prompt(message);

        if (value === null) {
            return null;
        }

        value = normalizeText(value);

        if (value === "") {
            console.log("Không được để trống");
        } else {
            return value;
        }
    }
}


function showEmployees() {
    let choice = prompt(
        "1. Hiển thị theo thứ tự hiện tại\n" +
        "2. Sắp xếp theo kinh nghiệm tăng dần"
    );

    if (choice === null) {
        return;
    }

    if (choice.trim() === "1") {
        displayEmployees(employees);
    } else if (choice.trim() === "2") {
        let list = [];

        for (let i = 0; i < employees.length; i++) {
            list.push(employees[i]);
        }

        for (let i = 0; i < list.length - 1; i++) {
            for (let j = i + 1; j < list.length; j++) {
                if (list[i].experienceYears > list[j].experienceYears) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }

        displayEmployees(list);
    } else {
        console.log("Lựa chọn không hợp lệ");
    }
}


function addEmployee() {
    let code = prompt("Nhập mã nhân viên:");

    if (code === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    code = code.trim().toUpperCase();

    let error = validateEmployeeCode(code);

    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }

    let fullName = inputRequiredText("Nhập họ tên:");

    if (fullName === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let department = inputRequiredText("Nhập phòng ban:");

    if (department === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let age = inputIntegerInRange("Nhập tuổi (18 - 60):", 18, 60);

    if (age === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let experienceYears = inputIntegerInRange(
        "Nhập số năm kinh nghiệm (0 - 40):", 0, 40
    );

    if (experienceYears === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let newEmployee = {
        employeeCode: code,
        fullName: fullName,
        department: department,
        age: age,
        experienceYears: experienceYears
    };

    employees.push(newEmployee);

    console.log("Thêm nhân viên thành công!");
    displayEmployees([newEmployee]);
}

function updateEmployee() {
    let code = prompt("Nhập mã nhân viên cần cập nhật:");

    if (code === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy nhân viên có mã " + code);
        return;
    }

    let oldAge = employees[index].age;
    let oldExperience = employees[index].experienceYears;

    console.log("Thông tin trước khi cập nhật:");
    console.log("Tuổi: " + oldAge);
    console.log("Kinh nghiệm: " + oldExperience);

    let newAge = inputIntegerInRange("Nhập tuổi mới:", 18, 60);

    if (newAge === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    let newExperience = inputIntegerInRange(
        "Nhập số năm kinh nghiệm mới:", 0, 40
    );

    if (newExperience === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    employees[index].age = newAge;
    employees[index].experienceYears = newExperience;

    console.log("Cập nhật thành công!");
    console.log("Tuổi: " + oldAge + " -> " + newAge);
    console.log("Kinh nghiệm: " + oldExperience + " -> " + newExperience);
}


function deleteEmployee() {
    let code = prompt("Nhập mã nhân viên cần xóa:");

    if (code === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy nhân viên có mã " + code);
        return;
    }

    let confirmDelete = prompt("Bạn có chắc chắn muốn xóa? (Y/N)");

    if (confirmDelete === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    if (confirmDelete.trim().toLowerCase() === "y") {
        employees.splice(index, 1);

        console.log("Xóa thành công!");
        console.log("Còn lại " + employees.length + " nhân viên");
    } else {
        console.log("Đã hủy thao tác xóa");
    }
}

function searchEmployeeByDepartment() {
    let keyword = prompt("Nhập tên phòng ban cần tìm:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = [];

    for (let i = 0; i < employees.length; i++) {
        let department = employees[i].department.toLowerCase();

        if (department.includes(keyword)) {
            result.push(employees[i]);
        }
    }

    if (result.length === 0) {
        console.log("Không tìm thấy nhân viên phù hợp");
    } else {
        console.log("Tìm thấy " + result.length + " nhân viên");
        displayEmployees(result);
    }
}

function employeeReport() {
    console.log("================================");
    console.log("BÁO CÁO TỔNG KẾT NHÂN VIÊN");
    console.log("================================");

    if (employees.length === 0) {
        console.log("Chưa có nhân viên nào");
        return;
    }

    let total = 0;
    let max = employees[0].experienceYears;
    let bestEmployee = employees[0];

    for (let i = 0; i < employees.length; i++) {
        total += employees[i].experienceYears;

        if (employees[i].experienceYears > max) {
            max = employees[i].experienceYears;
            bestEmployee = employees[i];
        }
    }

    let average = total / employees.length;

    console.log("Tổng số nhân viên: " + employees.length);
    console.log("Kinh nghiệm trung bình: " + average.toFixed(1));

    console.log(
        "Kinh nghiệm nhiều nhất: " +
        bestEmployee.employeeCode + " - " +
        bestEmployee.fullName + " - " + max
    );

    console.log("================================");
}

menu();
