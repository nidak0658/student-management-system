#!  /usr/bin/env node
import inquirer from 'inquirer';
class Student {
    name;
    studentID;
    courses;
    balance;
    static nextID = 1;
    constructor(name) {
        this.name = name;
        this.studentID = this.generateStudentID();
        this.courses = [];
        this.balance = 0;
    }
    generateStudentID() {
        const id = Student.nextID.toString().padStart(5, '0');
        Student.nextID++;
        return id;
    }
    enroll(course) {
        this.courses.push(course);
        console.log(`${this.name} enrolled in ${course}.`);
    }
    viewBalance() {
        console.log(`Balance for ${this.name} is $${this.balance}.`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`${this.name} paid $${amount}. Remaining balance is $${this.balance}.`);
    }
    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
}
let students = {};
function addStudent() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]).then(answers => {
        const student = new Student(answers.name);
        students[student.studentID] = student;
        console.log(`Student ${student.name} added with ID ${student.studentID}.`);
        mainMenu();
    });
}
function enrollStudent() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter course to enroll:'
        }
    ]).then(answers => {
        const student = students[answers.studentID];
        if (student) {
            student.enroll(answers.course);
        }
        else {
            console.log('Student not found.');
        }
        mainMenu();
    });
}
function payStudentTuition() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter amount to pay:'
        }
    ]).then(answers => {
        const student = students[answers.studentID];
        if (student) {
            student.payTuition(parseFloat(answers.amount));
        }
        else {
            console.log('Student not found.');
        }
        mainMenu();
    });
}
function showStudentStatus() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter student ID:'
        }
    ]).then(answers => {
        const student = students[answers.studentID];
        if (student) {
            student.showStatus();
        }
        else {
            console.log('Student not found.');
        }
        mainMenu();
    });
}
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Choose an option:',
            choices: [
                'Add Student',
                'Enroll Student',
                'Pay Student Tuition',
                'Show Student Status',
                'Exit'
            ]
        }
    ]).then(answers => {
        switch (answers.choice) {
            case 'Add Student':
                addStudent();
                break;
            case 'Enroll Student':
                enrollStudent();
                break;
            case 'Pay Student Tuition':
                payStudentTuition();
                break;
            case 'Show Student Status':
                showStudentStatus();
                break;
            case 'Exit':
                console.log('Goodbye!');
                break;
        }
    });
}
console.log('Welcome to Student Management System!');
mainMenu();
