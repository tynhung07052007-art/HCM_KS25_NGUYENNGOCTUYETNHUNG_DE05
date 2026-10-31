let employees = [
    {
    employeeCode: "EMP-001",
    fullName: "Ngo Thanh Tung",
    department: "Phong ky thuat ",
    age: 28,experienceYears:5
    },
    {
    employeeCode: "EMP-002",
    fullName: "Ho thi thu",
    department: "Phong Nhan Su ",
    age: 35,experienceYears:10
    },
    {
    employeeCode: "EMP-003",
    fullName: "Mai quoc Viet",
    department: "Phong ky thuat ",
    age: 24,experienceYears:1
    }
];

function menu(){
    while (true) {
        console.log("====================================");
        console.log("Hệ thống quản lý nhân viên SkyTech");
        console.log("1. Hiển thị danh sách nhân viên");
        console.log("2.Thêm nhân viên mới");
        console.log("3.Cập nhật thông tin nhân viên");
        console.log("4.Xóa nhân viên");
        console.log("5.Tìm kiếm nhân viên theo phòng ban");
        console.log("0.TTgoát chương trình");
        console.log("====================================");
        let choice = prompt("Nhập lựa chọn(0-5):");
        if (choice === null ) {
            console.log("Lựa chọn không hợp lệ");
            continue;
        }
        choice = choice.trim();
        switch (choice) {
            case "1":
                showEmployees();
                break;
            case "2":
                addEmployees();
                break;
            case "3":
                updateEmployees();
                break;
            case "4":
                deleteEmployees();
                break;
            case "5":
                searchEmployees();
                break;
            case "0":
                employeeReport();
                console.log("Cảm ơn đã sử dụng chương trình!");
                return ; 
            default:
                console.log("Lựa chọn không hợp lệ, vui lòng nhập lại!");
                break;
        }
    }
}
menu();
function showEmployees() {
    let choice; 
    while (true) {
        choice = prompt (
            "1.Theo thứ tự hiện tại: \n"+ 
            "2.Sắp xếp  theo kinh nghiệm tăng dần:"
        );
        if (choice === null ) {
            return ;
        }
        if (choice.trim() === "1") {
            displayEmployees(employees);
        } else if (choice.trim() === "2") {
            let list = [];
            for (let i = 0; i < employees.length; i++){
                list.push(employees[i]);
            }

            for (let i = 0 ; i < list.length - 1; i++) {
                for (let j = i + 1; j < list.length; j++) {
                    if (list[i].experienceYears > list[j].experienceYears) {
                        let temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
                }
            }
            displayEmployees(list);
        } 
        else {
            console.log(" Lựa chọn không hợp lệ");
        }
    }
}

function addEmployees() {
    let code = prompt("Nhập mã nhân viên:");
    if (code === null) {
        console.log("Hiện Đã hủy thao tác thêm");
        return;
    }
    code = code.trim().toUpperCase();
    let error = validateEmployeeCode(code);
    if (error !== "") {
        console.log("lỗi:" + error);
        return;
    }
    let fullName = inputRequredText("Nhập họ tên:");
    if (fullName === null) {
        console.log("Hiện dã hủy thao tác thêm");
        return;
    }
    let department = inputRequredText("Nhập phòng ban:");
    if (department === null) {
        console.log("Hiện dã hủy thao tác thêm");
        return;
    }
    let age = inputRequredText("Nhập tuổi(18-60):",18,60);
    if (age === null) {
        console.log("Hiện dã hủy thao tác thêm");
        return;
    }
    let experienceYears = inputRequredText("Nhập số năm kinh nghiệm (0-40):",0,40);
    if (experienceYears === null) {
        console.log("Hiện dã hủy thao tác thêm");
        return;
    }
    let newEmployee = {
    employeeCode: code,
    fullName:fullName,
    department: department,
    age: age,experienceYears:experienceYears
    };
    employees.push(newEmployee);
    console.log("Thêm nhân viên thành công");
    displayEmployees([newEmployee]);
}

function updateEmployees() {
    let code = prompt("Nhập mã nhân viên cần cập nhật:");
    if (code === null ){
        console.log("Hiện đã hủy thao tác cập nhật");
        return;
    }
    code = code.trim().toUpperCase();
    let index = findEmployeeIndex(code);
    if (index === -1) {
        console.log("Không tìm thấy nhân viên nào có mã"+ code);
        return;
    }
    let oldAge = employees[index].age;
    let oldExperience = employees[index].experienceYears;
    console.log("Thông tin trước khi cập nhật:");
    console.log("Tuổi:"+ oldAge);
    console.log("Kinh nghiệm:"+ oldExperience);
    let newAge = inputIntegerRange("Nhập tuổi mới:",18,60);
    if (newAge === null ){
        console.log("Hiện đã hủy thao tác cập nhật:");
        return;
    } 
    let newExperinence = inputIntegerRange("Nhập số kinh nghiệm mới:",0,40);
    if (newExperinence === null ){
        console.log("Hiện đã hủy thao tác cập nhật:");
        return;
    } 
    employees[index].age = newAge;
    employees[index].experienceYears = newExperinence;
    console.log("Cập nhật thành công!");
    console.log("Tuổi:"+oldAge + "->"+ newAge);
    console.log("Số năm kinh nghiệm:"+oldExperience + "->"+ newExperinence);
}