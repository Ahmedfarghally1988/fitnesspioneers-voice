var Subscribe = function () {

    var init = function () {
        handleSubmit();
        handleSubmit2();
    };

    var handleSubmit = function () {

        $('#subscribeEmailForm').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                email: {
                    required: lang.required,
                    email: lang.email_not_valid
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



        $('#subscribeEmailForm .submit-form').click(function () {

            if ($('#subscribeEmailForm').validate().form()) {
                $('#subscribeEmailForm .submit-form').prop('disabled', true);
                $('#subscribeEmailForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                setTimeout(function () {
                    $('#subscribeEmailForm').submit();
                }, 1000);
            }
            return false;
        });

        $('#subscribeEmailForm input').keypress(function (e) {
            if (e.which == 13) {
                if ($('#subscribeEmailForm').validate().form()) {
                    $('#subscribeEmailForm .submit-form').prop('disabled', true);
                    $('#subscribeEmailForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                    setTimeout(function () {
                        $('#subscribeEmailForm').submit();
                    }, 1000);
                }
                return false;
            }
        });



        $('#subscribeEmailForm').submit(function () {

            var action = config.url + '/subscribe';
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: action,
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    $('#subscribeEmailForm .submit-form').prop('disabled', false);
                    $('#subscribeEmailForm .submit-form').html(lang.subscribe);
                    if (data.type == 'success') {
                        My.toast(data.message);
                        Subscribe.empty();
                    } else {
                        if (typeof data.errors !== 'undefined') {
                            for (i in data.errors) {
                                var message = data.errors[i];

                                $('#subscribeEmailForm [name="' + i + '"]').closest('.form-group').addClass('has-error');
                                $('#subscribeEmailForm [name="' + i + '"]').closest('.form-group').find(".help-block").html(message).css('opacity', 1);
                            }
                        }
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#subscribeEmailForm .submit-form').prop('disabled', false);
                    $('#subscribeEmailForm .submit-form').html(lang.subscribe);
                    My.ajax_error_message(xhr);
                },
                dataType: "json",
                type: "POST"
            });
            return false;

        })




    }

    var handleSubmit2 = function () {

        $('#subscribeEmailForm2').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                email: {
                    required: lang.required,
                    email: lang.email_not_valid
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



        $('#subscribeEmailForm2 .submit-form').click(function () {

            if ($('#subscribeEmailForm2').validate().form()) {
                $('#subscribeEmailForm2 .submit-form').prop('disabled', true);
                $('#subscribeEmailForm2 .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                setTimeout(function () {
                    $('#subscribeEmailForm2').submit();
                }, 1000);
            }
            return false;
        });

        $('#subscribeEmailForm2 input').keypress(function (e) {
            if (e.which == 13) {
                if ($('#subscribeEmailForm2').validate().form()) {
                    $('#subscribeEmailForm2 .submit-form').prop('disabled', true);
                    $('#subscribeEmailForm2 .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                    setTimeout(function () {
                        $('#subscribeEmailForm2').submit();
                    }, 1000);
                }
                return false;
            }
        });



        $('#subscribeEmailForm2').submit(function () {

            var action = config.url + '/subscribe';
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: action,
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    $('#subscribeEmailForm2 .submit-form').prop('disabled', false);
                    $('#subscribeEmailForm2 .submit-form').html(lang.subscribe);
                    if (data.type == 'success') {
                        My.toast(data.message);
                        Subscribe.empty();
                        $('.x, .close').trigger('click')
                    } else {
                        if (typeof data.errors !== 'undefined') {
                            for (i in data.errors) {
                                var message = data.errors[i];

                                $('#subscribeEmailForm2 [name="' + i + '"]').closest('.form-group').addClass('has-error');
                                $('#subscribeEmailForm2 [name="' + i + '"]').closest('.form-group').find(".help-block").html(message).css('opacity', 1);
                            }
                        }
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#subscribeEmailForm2 .submit-form').prop('disabled', false);
                    $('#subscribeEmailForm2 .submit-form').html(lang.subscribe);
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
        empty: function () {
            $('.has-error').removeClass('has-error');
            $('.has-success').removeClass('has-success');
            $('.help-block').html('');
            My.emptyForm();
        }
    };

}();

jQuery(document).ready(function () {
    Subscribe.init();
});