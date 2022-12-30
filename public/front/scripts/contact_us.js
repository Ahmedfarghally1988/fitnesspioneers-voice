var ContactMessages = function () {

    var init = function () {
        handleSubmit();
    };

    var handleSubmit = function () {
        $('#ContactForm').validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true

                }
            },
            messages: {
                name: {
                    required: lang.required,
                },
                email: {
                    required: lang.required,
                    email: lang.email_not_valid
                },
                message: {
                    required: lang.required
                }
            },
            //messages: lang.messages,
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');

            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
                $(element).closest('.form-group').find('.help-block').html('').css('opacity', 0);

            },
            errorPlacement: function (error, element) {
                $(element).closest('.form-group').find('.help-block').html($(error).html()).css('opacity', 1);
            }
        });

        $('#ContactForm .submit-form').click(function () {
            if ($('#ContactForm').validate().form()) {
                $('#ContactForm .submit-form').prop('disabled', true);
                $('#ContactForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                setTimeout(function () {
                    $('#ContactForm').submit();
                }, 1000);
            }
            return false;
        });
        $('#ContactForm input').keypress(function (e) {
            if (e.which == 13) {
                if ($('#ContactForm').validate().form()) {
                    $('#ContactForm .submit-form').prop('disabled', true);
                    $('#ContactForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                    setTimeout(function () {
                        $('#ContactForm').submit();
                    }, 1000);
                }
                return false;
            }
        });



        $('#ContactForm').submit(function () {
            var action = config.url + '/contact/message';
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: action,
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    $('#ContactForm .submit-form').prop('disabled', false);
                    $('#ContactForm .submit-form').html(lang.send);
                    if (data.type == 'success') {
                        My.toast(data.message);
                        ContactMessages.empty();
                    } else {
                        if (typeof data.errors !== 'undefined') {
                            for (i in data.errors) {
                                var message = data.errors[i];

                                $('[name="' + i + '"]').closest('.form-group').addClass('has-error');
                                $('[name="' + i + '"]').closest('.form-group').find(".help-block").html(message).css('opacity', 1);
                            }
                        }
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#ContactForm .submit-form').prop('disabled', false);
                    $('#ContactForm .submit-form').html(lang.send);
                    My.ajax_error_message(xhr);
                },
                dataType: "json",
                type: "POST"
            });
            return false;
        })

    }

    return {
        init: function () {
            init();
        },
        error_message: function (message) {
            $.alert({
                title: lang.error,
                content: message,
                type: 'red',
                typeAnimated: true,
                buttons: {
                    tryAgain: {
                        text: lang.try_again,
                        btnClass: 'btn-red',
                        action: function () {}
                    }
                }
            });
        },
        empty: function () {
            $('.has-error').removeClass('has-error');
            $('.has-success').removeClass('has-success');
            $('.help-block').html('');
            My.emptyForm();
        }
    };

}();

jQuery(document).ready(function () {
    ContactMessages.init();
});