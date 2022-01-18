$(document).ready(function(){
    $("#update_contact_form").submit(function(evt) {
        evt.preventDefault();
        try {
            let contactId = $("#contact_id").val();

            let formData = {
               picture : $("#contact_picture").val(),
               name :  $("#contact_name").val(),
               address: $("#contact_address").val()
            }

            $.ajax({
                url: 'http://localhost:8080/contacts/update/' + contactId,
                type: 'PUT',
                contentType : "application/json",
                data: JSON.stringify(formData),
                dataType : 'json',
                async: false,
                cache: false,
                success: function (response) {
                    let contact = response;
//                    let contactString = "{ picture: " + contact.picture + ", name: " + contact.name +
//                                           ", address: " + contact.address + " }"
                    let successAlert = '<div class="alert alert-success alert-dismissible">' +
                                            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                            '<strong>' + response.message + '</strong>' +
                                        '</div>'


//                    $("#tr_" + contactId + " td.td_picture").text(contact.picture);
//                    $("#tr_" + contactId + " td.td_name").text(contact.name);
//                    $("#tr_" + contactId + " td.td_address").text(contact.address);

                    $("#response").empty();
                    $("#response").append(successAlert);
                    $("#response").css({"display": "inline-block"});
                },

                error: function (response) {
                    let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                        '<strong>' + response.message + '</strong>' + ' ,Error: ' + message.error +
                                    '</div>';

                    $("#response").empty();
                    $("#response").append(errorAlert);
                    $("#response").css({"display": "block"});
                }
            });
        } catch(error){
            console.log(error);
            alert(error);
        }
    });

    $(document).on("click", "table button.btn_id", function(){
        let id_of_button = (event.srcElement.id);
        let contactId = id_of_button.split("_")[2];

        $.ajax({
            url: 'http://localhost:8080/contacts/get/' + contactId,
            type: 'GET',
            success: function(response) {
                let contact = response;
                $("#contact_id").val(contact.id);
                $("#contact_picture").val(contact.picture);
                $("#contact_name").val(contact.name);
                $("#contact_address").val(contact.address);
                $("#div_contact_updating").css({"display": "block"});
            },
            error: function(error){
                console.log(error);
                alert("Error -> " + error);
            }
        });
    });
});

//(function(){
//        let pathname = window.location.pathname;
//        if (pathname == "/update.html") {
//            $(".nav .nav-item a:last").addClass("active");
//        }
//    })();
