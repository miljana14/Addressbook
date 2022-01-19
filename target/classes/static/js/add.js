$(document).ready(function() {
    $("#add_new_contact").submit(function(evt) {
        evt.preventDefault();

        let formData = {
            picture : $("#picture").val(),
            name :  $("#name").val(),
            address: $("#address").val()
        }

        $.ajax({
            url: 'http://localhost:8080/contacts/add',
            type: 'POST',
            contentType : "application/json",
            data: JSON.stringify(formData),
            dataType : 'json',
            async: false,
            cache: false,
            success: function (response) {
                let successAlert = '<div class="alert alert-success alert-dismissible">' +
                                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                        '<strong>' + response.message ;
                                    '</div>'
                $("#response").append(successAlert);

                resetUploadForm();
            },
            error: function (response) {
                let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                    '<strong>' + response.message + '</strong>' + ' ,Error: ' + message.error +
                                '</div>'
                $("#response").append(errorAlert);

                resetUploadForm();
            }
        });
    });

    function resetUploadForm(){
        $("#picture").val("");
        $("#name").val("");
        $("#address").val("");
    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/add.html"){
            $(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "/contacts.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});