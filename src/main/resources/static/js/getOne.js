    $(document).on("click", "table button.btn_id", function(){
        let id_of_button = (event.srcElement.id);
        let contactId = id_of_button.split("_")[2];

        $.ajax({
            url: 'http://localhost:8080/contacts/getOne/' + contactId,
            type: 'GET',
            success: function(response) {
                let contact = response.contacts[0];
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