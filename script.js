//let student = JSON.parse(students)
var student = [];
var xhr = new XMLHttpRequest();
var requestURL = 'https://atukholko.github.io/students.json';
    xhr.open("GET", requestURL,false); // async=true
    xhr.onload = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            student = JSON.parse(xhr.response);
            console.log(student);
        }
    };
    xhr.send();
/*var requestURL = 'https://atukholko.github.io/students.json'
var request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.onload = function() {
    student = JSON.parse(request.response);
  }
request.send()
function load(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200){
        let studentsFromJSON = JSON.parse(xhr.response);
        console.log(student)
        student = studentsFromJSON;
        console.log(student)
    }
    var url = 'https://atukholko.github.io/students.json';
    xhr.open("GET", url, false);
    xhr.send(null);
    }
}*/

function add_row(table, name, age, mark){
    let row = document.createElement("tr")

    let td1 = document.createElement("td");
    td1.innerHTML = name;
    
    let td2 = document.createElement("td");
    td2.innerHTML = age;
    
    let td3 = document.createElement("td");
    td3.innerHTML = mark;

    let td4 = document.createElement('td')
    let button = document.createElement("button")
    button.innerHTML = "&#128465";
    button.onclick = del;
    button.id = "del_button"
    td4.appendChild(button)

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    if(name != "<b>Name</b>")
        row.appendChild(td4);

    table.appendChild(row);
 };

 let table = document.createElement("table");

 function create_table(){
    table.style.border = "1 px solid black";
    table.id = "table";
    add_row(table, "<b>Name</b>", "<b>Age</b>", "<b>Mark</b>");
    document.body.prepend(table);
 };

 function fill_table(table){
    for(let i = 0; i < student.length; i++){
        add_row(table, student[i].name, student[i].age, student[i].mark)
    }
 }
 function add_student(){
    let tb = document.getElementById("table");
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let mark = document.getElementById("mark").value;

    document.getElementById("name").value = '';
    document.getElementById("age").value = '';
    document.getElementById("mark").value = '';

    let obj = `{"name": "${name}","age": "${age}","mark": ${mark}}`
    let json = JSON.stringify(student);
    json = json.substring(0,json.length -1);
    if(student.length != 0)
        json = json + ',' + obj +']';
    else
        json = json + obj +']';
    student = JSON.parse(json);
    console.log(student)
    xhr.open('GET', requestURL, false);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == 4 && xhr.status == 200)
    {
        // we convert your JSON into JavaScript object
        jsonArr = JSON.parse(xhr.responseText);

        // we add new value:
        jsonArr.push({"name": `${name}`, "age": `${age}`, "mark": `${mark}`});

        // we send with new request the updated JSON file to the server:
        xhr.open("POST", requestURL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // if you want to handle the POST response write (in this case you do not need it):
        // xhr.onreadystatechange = function(){ /* handle POST response */ };
        xhr.send(JSON.stringify(jsonArr));
        // but on this place you have to have a server for write updated JSON to the file
    }
};
xhr.send(null);
    add_row(tb, name, age, mark);
 }
 del = function del_student(){
    document.activeElement.parentElement.parentElement.id = "current";
    let current_index = document.getElementById("current").rowIndex - 1;
    student.splice(current_index,1);
    document.getElementById("table").removeChild(document.getElementById("current"));
    console.log("succesfully");
    console.log(student);
 }
 function proverka(input) { 
    var value = input.value; 
    var rep = /[-\.;":'a-zA-Zа-яА-Я]/; 
    if (rep.test(value)) { 
        value = value.replace(rep, ''); 
        input.value = value; 
    } 
} 

create_table();
fill_table(table);