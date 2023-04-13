// load all data
document.onload = showData();
document.getElementById("step1").style.backgroundColor = "#e22691";
document.getElementById("step1").style.color = "white";
var roundButtons = false;
var getIndex;
var peopleList = [];

//validate data 
function validateForm() {

    if ((validatePersonalDetails() == false) || (validateSocialProfile() == false) || (validateAccount() == false)) {
        return false;
    }

    return true;

}

//  show data
function showData() {
    document.getElementById("update").style.display = "none";
    putValues();
    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";

        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.lname + "</td>";
        html += "<td>" + element.phone + "</td>";

        html += "<td>" + element.twitter + "</td>";
        html += "<td>" + element.facebook + "</td>";
        html += "<td>" + element.googleplus + "</td>";

        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.password + "</td>";
        html += "<td>" + element.Cpassword + "</td>";

        html += '<td class="pt-0"><button onclick = "deleteData(' + index + ')" class = "btn mx-2"> <i class="fa-solid fa-trash"></i></button><button onclick = "updateData(' + index + ')" class = "btn  m-2 change"><i class="fas fa-edit"></i></button>';
        html += "</tr>";

    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}

// add data to local storage

function AddData() {

    if (validateForm() == true) {
        var name = document.getElementById("name").value;
        var lname = document.getElementById("lname").value;
        var phone = document.getElementById("phone").value;
        var twitter = document.getElementById("twitter").value;
        var facebook = document.getElementById("facebook").value;
        var googleplus = document.getElementById("googleplus").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var Cpassword = document.getElementById("Cpassword").value;

        putValues();

        peopleList.push({
            name: name,
            lname: lname,
            phone: phone,
            twitter: twitter,
            facebook: facebook,
            googleplus: googleplus,
            email: email,
            password: password,
            Cpassword: Cpassword,

        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        showData();

        emptyValues();

        reload();
    }
}


// delete data 
function deleteData(index) {

    let text = "Are you sure";
    if (confirm(text) == true) {
        putValues();

        peopleList.splice(index, 1);
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
    }
    showData();
}


// update data
function updateData(index) {
    roundButtons = true;
    getIndex = index;
    color2();
    color3();

    document.getElementById("Submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    putValues();

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("lname").value = peopleList[index].lname;
    document.getElementById("phone").value = peopleList[index].phone;

    document.getElementById("twitter").value = peopleList[index].twitter;
    document.getElementById("facebook").value = peopleList[index].facebook;
    document.getElementById("googleplus").value = peopleList[index].googleplus;

    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("password").value = peopleList[index].password;
    document.getElementById("Cpassword").value = peopleList[index].Cpassword;


    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {

            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].lname = document.getElementById("lname").value;
            peopleList[index].phone = document.getElementById("phone").value;

            peopleList[index].twitter = document.getElementById("twitter").value;
            peopleList[index].facebook = document.getElementById("facebook").value;
            peopleList[index].googleplus = document.getElementById("googleplus").value;


            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].password = document.getElementById("password").value;
            peopleList[index].Cpassword = document.getElementById("Cpassword").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            emptyValues();

            reload();

        }
    }
}

// ------------------------------Validation Functions-------------
function blurName() {
    let name = document.getElementById("name").value;
    if ((/^[A-Za-z ]{3,30}$/).test(name) == false) {
        document.getElementById("iname").innerHTML = "Enter valid Name";
        return false;
    } else if ((/^[A-Za-z ]{3,30}$/).test(name) == true) {
        document.getElementById("iname").innerHTML = " ";
    }
}

function blurLname() {
    let lname = document.getElementById("lname").value;
    if ((/^[A-Za-z ]{3,30}$/).test(lname) == false) {
        document.getElementById("ilname").innerHTML = "Enter valid last Name";
        return false;
    } else if ((/^[A-Za-z ]{3,30}$/).test(lname) == true) {
        document.getElementById("ilname").innerHTML = " ";
    }
}


function blurEmail() {
    let email = document.getElementById("email").value;
    if ((/^[A_Za-z0-9]{1,}@[A_Za-z]{3,}[.]{1}[A_Za-z.]{2,6}$/).test(email) == false) {
        document.getElementById("iemail").innerHTML = "Enter valid email";
        return false;
    } else if ((/^[A_Za-z0-9]{1,}@[A_Za-z]{3,}[.]{1}[A_Za-z.]{2,6}$/).test(email) == true) {
        document.getElementById("iemail").innerHTML = " ";
    }
}

function blurPhone() {
    let phone = document.getElementById("phone").value;
    if ((/^[789][0-9]{9}$/).test(phone) == false) {
        document.getElementById("iphone").innerHTML = "Enter valid phone number";
        return false;
    }
    else if ((/^[789][0-9]{9}$/).test(phone) == true) {
        document.getElementById("iphone").innerHTML = " ";
    }

}

function blurPassword() {
    let pass = document.getElementById("password").value;
    if ((/(?=^.{9,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).test(pass) == false) {
        document.getElementById("ipassword").innerHTML = "Enter valid password";
        return false;
    }
    else if ((/(?=^.{9,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).test(pass) == true) {
        document.getElementById("ipassword").innerHTML = " ";
    }
}

function blurCPassword() {
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("Cpassword").value;
    if ((pass != cpass) || (cpass == "")) {
        document.getElementById("iCpassword").innerHTML = "Password Doesn't match";
        return false;
    }
    else {
        document.getElementById("iCpassword").innerHTML = " ";
    }
}

function blurfacebook() {

    let facebook = document.getElementById("facebook").value;


    if (facebook == "") {
        document.getElementById("ifacebook").innerHTML = "Enter Facebook ID";
        return false;
    }

    else {
        document.getElementById("ifacebook").innerHTML = " ";
    }

}

function facebookCheck() {
    let facebook = document.getElementById("facebook").value;
    facebook = facebook.toLowerCase();

    let ds = JSON.parse(localStorage.getItem("peopleList"));
    console.log(ds);
    if (ds != null) {
        for (let i = 0; i < ds.length; i++) {
            if (i == getIndex) {
                continue;
            }

            else if (facebook == ds[i].facebook) {
                document.getElementById("ifacebook").innerHTML = "Facebook ID Present";
                return false;
            }


        }
    }


}




// -----------show functions start-----------------

document.getElementById("form2").style.display = "none";
document.getElementById("form3").style.display = "none";

// Go next to slide number 2
function nextSocial() {

    if (validatePersonalDetails() != false) {
        document.getElementById("form2").style.display = "block";
        document.getElementById("form1").style.display = "none";
        document.getElementById("form3").style.display = "none";

        color2();
        // document.getElementById("step1").style.backgroundColor = "#e22691";
        // document.getElementById("step1").style.color = "white";
    }


}

// Go to slide 3
function nextAccount() {

    if (validateSocialProfile() != false) {
        document.getElementById("form2").style.display = "none";
        document.getElementById("form1").style.display = "none";
        document.getElementById("form3").style.display = "block";

        color3();
        // document.getElementById("step2").style.backgroundColor = "#e22691";
        // document.getElementById("step2").style.color = "white";
    }




}


// Go to slide 2
function prevSocialProfiles() {
    document.getElementById("form2").style.display = "block";
    document.getElementById("form1").style.display = "none";
    document.getElementById("form3").style.display = "none";
}

// Go to slide 1
function prevPersonalDetails() {
    document.getElementById("form2").style.display = "none";
    document.getElementById("form1").style.display = "block";
    document.getElementById("form3").style.display = "none";
}

// ----------------------show functions end-----------------



// button function start

function personalDetails() {
    if (roundButtons == true) {
        document.getElementById("form2").style.display = "none";
        document.getElementById("form1").style.display = "block";
        document.getElementById("form3").style.display = "none";

    }
}

function socialProfiles() {
    if (roundButtons == true) {
        document.getElementById("form2").style.display = "block";
        document.getElementById("form1").style.display = "none";
        document.getElementById("form3").style.display = "none";
    }


}

function accountSetup() {
    if (roundButtons == true) {
        document.getElementById("form2").style.display = "none";
        document.getElementById("form1").style.display = "none";
        document.getElementById("form3").style.display = "block";
    }

}
// button function end

//validate 3 pages different

function validatePersonalDetails() {
    var a = blurName(), b = blurLname(), d = blurPhone();
    if (((a == false) || (b == false) || (d == false))) {
        return false;
    }
}

function validateSocialProfile() {
    var g = blurfacebook(), z = facebookCheck();

    if ((g == false) || (z == false)) {
        return false;
    }

}

function validateAccount() {
    var e = blurPassword(), f = blurCPassword(), c = blurEmail();
    if (((e == false) || (f == false) || (c == false))) {
        return false;
    }
}



// reset 
function reload() {
    location.reload();
}

function getValues() {
    var name = document.getElementById("name").value;
    var lname = document.getElementById("lname").value;
    var phone = document.getElementById("phone").value;
    var twitter = document.getElementById("twitter").value;
    var facebook = document.getElementById("facebook").value;
    var googleplus = document.getElementById("googleplus").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var Cpassword = document.getElementById("Cpassword").value;
}

function emptyValues() {

    var name = "";
    var lname = "";
    var phone = "";
    var twitter = "";
    var facebook = "";
    var googleplus = "";
    var email = "";
    var password = "";
    var Cpassword = "";
}



function color2() {
    document.getElementById("step2").style.backgroundColor = "#e22691";
    document.getElementById("step2").style.color = "white";
}

function color3() {
    document.getElementById("step3").style.backgroundColor = "#e22691";
    document.getElementById("step3").style.color = "white";
}

function putValues() {
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }

    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
}