$(document).ready(function () {
    EmployeeDataList();
});

//window.location.reload();

function EmployeeDataList() {

    $.ajax({
        url: '/Ajax/EmpList', 
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.email + '</td>';
                object += '<td>' + item.password + '</td>';
                object += '<td>' + item.mobile + '</td>';
                object += '<td>' + item.address + '</td>';
                object += '<td>';
                object += '<a href="#" class="btn btn-primary edit-btn" onclick="Edit(' + item.id + ')">Edit</a> || ';
                object += '<a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ')">Delete</a>';
                object += '</td>';
                object += '</tr>';

            });
;

            // Destroy existing DataTable if already initialized
            if ($.fn.DataTable.isDataTable('#table_data')) {
                $('#table_data').DataTable().destroy();
            }

            // Update table content
            $('#table_data').html(object);


            //$('#table_data').DataTable().ajax.reload();

            $('#table_data').closest('table').DataTable({
                paging: true,         // Enable pagination
                searching: true,      // Enable search
                ordering: true,       // Enable column sorting
                lengthChange: true,   // Enable number of records to show
                pageLength: 3         // Default number of records per page
            });
        },
        error: function () {
            alert("Failed to retrieve data.");
        }
    });
}

$('#btnaddemp').click(function () {
    $('#Employeemadal').modal('show');
})

//hide the popup
function HideModelPopUp() {
    $('#Employeemadal').modal('hide');
}

//clear text box
function ClearText() {
    $('#Name').val();
    $('#Email').val();
    $('#Password').val();
    $('#Mobile').val();
    $('#Address').val();
}
function AddEmployee() {
    var objData = {
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Password: $('#Password').val(),
        Mobile: $('#Mobile').val(),
        Address: $('#Address').val()
    };

    if (!objData.Name || !objData.Email || !objData.Password || !objData.Mobile || !objData.Address) {
        alert('All fields are required!');
        return;
    }

    $.ajax({
        url: '/Ajax/AddEmployees',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data:objData,
        success: function () {
            alert("Data Saved Successfully123");
            ClearText();
            EmployeeDataList();
            HideModelPopUp();
        },
        error: function () {
            alert("Data Can't Be Saved");
        }
    });

}


function Edit(id) {
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (result) {
            // Populate the modal fields with the data received from the server
            $('#Name').val(result.name);
            $('#Email').val(result.email);
            $('#Password').val(result.password);
            $('#Mobile').val(result.mobile);
            $('#Address').val(result.address);

            // Display the modal for editing
            $('#Employeemadal').modal('show');

            // Update the button action to save changes
            $('#btnsave').off('click').on('click', function () {
                UpdateEmployee(id); // Call the update function
            });
        },
        error: function () {
            alert("Failed to fetch employee data.");
        }
    });
}

function UpdateEmployee(id) {
    var updatedData = {
        Id: id,
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Password: $('#Password').val(),
        Mobile: $('#Mobile').val(),
        Address: $('#Address').val()
    };

    // Validate the input
    if (!updatedData.Name || !updatedData.Email || !updatedData.Password || !updatedData.Mobile || !updatedData.Address) {
        alert('All fields are required!');
        return;
    }

    $.ajax({
        url: '/Ajax/UpdateEmployee',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(updatedData),
        success: function () {
            alert("Employee updated successfully.");
            EmployeeDataList(); // Refresh the table
            HideModelPopUp();   // Hide the modal
        },
        error: function () {
            alert("Failed to update employee.");
        }
    });
}


function Delete(id) {
    // Confirm deletion before sending the AJAX request
    if (!confirm("Are you sure you want to delete this employee?")) {
        return; // Exit if the user cancels
    }

    $.ajax({
        url: '/Ajax/Delete/' + id,
        type: 'DELETE', // Use the correct HTTP method for deletion
        success: function (response) {
            if (response.success) {
                alert('Record deleted successfully!');
                EmployeeDataList(); // Refresh the table
            } else {
                alert(response.message || "Failed to delete the record.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
            alert("Unable to delete the record. Please try again later.");
        }
    });
}




