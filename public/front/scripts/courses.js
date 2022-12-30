var Courses = function () {
    var Page = 2;

    var init = function () {
        handleSubmit();
        handleSearch();
        handleLoadmore();
    }

    var handleSearch = function () {
        $('.btn-search').on('click', function () {
            var data = $("#CoursesSearchForm").serializeArray();
            var url = config.url + "/courses";
            var params = {};
            $.each(data, function (i, field) {
                var name = field.name;
                var value = field.value;
                if (value) {
                    params[name] = value
                }
            });
            var query = $.param(params);
            if (!jQuery.isEmptyObject(params)) {
                url += '?' + query;
            }
            window.location.href = url;
            return false;
        })
    }


    var handleLoadmore = function () {
        $('#load-more-button').on('click', function () {
            $(this).prop('disabled', true);
            $(this).html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
            var params = {};
            if (new_config.category != '') {
                params['category'] = new_config.category
            }
            if (new_config.search != '') {
                params['search'] = new_config.search
            }
            var query = $.param(params);
            var action = config.url + '/get_courses?page=' + Page;
            if (!jQuery.isEmptyObject(params)) {
                action = config.url + '/get_courses?page=' + Page + '&' + query;
            }
            $.ajax({
                url: action,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    $('#load-more-button').prop('disabled', false);
                    $('#load-more-button').html(lang.load_more);
                    if (data.type == 'success') {
                        if (data.data.courses != "") {
                            $('#courses-items').append(data.data.courses);
                            Page++;
                        } else {
                            $('#load-more-button').css('display', 'none');
                        }

                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $('#load-more-button').prop('disabled', false);
                    $('#load-more-button').html(lang.load_more);
                    My.ajax_error_message(xhr);
                },
                dataType: "json",
                type: "GET"
            });


            return false;

        })
    }

    var handleSearch = function () {
        $('.btn-search').on('click', function () {
            var data = $("#CoursesSearchForm").serializeArray();
            var url = config.url + "/courses";
            var params = {};
            $.each(data, function (i, field) {
                var name = field.name;
                var value = field.value;
                if (value) {
                    params[name] = value
                }
            });
            var query = $.param(params);
            if (!jQuery.isEmptyObject(params)) {
                url += '?' + query;
            }
            window.location.href = url;
            return false;
        })
    }


    var handleSubmit = function () {

        $('#CourseRegistrationForm').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                mobile: {
                    required: true

                }
            },
            messages: {
                first_name: {
                    required: lang.required,
                },
                last_name: {
                    required: lang.required,
                },
                email: {
                    required: lang.required,
                    email: lang.email_not_valid
                },
                mobile: {
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





        $('#CourseRegistrationForm .submit-form').click(function () {

            if ($('#CourseRegistrationForm').validate().form() && iti.isValidNumber()) {
                $('#CourseRegistrationForm .submit-form').prop('disabled', true);
                $('#CourseRegistrationForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                setTimeout(function () {
                    $('#CourseRegistrationForm').submit();
                }, 1000);
            }
            return false;
        });

        $('#CourseRegistrationForm input').keypress(function (e) {
            if (e.which == 13) {
                if ($('#CourseRegistrationForm').validate().form()) {
                    $('#CourseRegistrationForm .submit-form').prop('disabled', true);
                    $('#CourseRegistrationForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                    setTimeout(function () {
                        $('#CourseRegistrationForm').submit();
                    }, 1000);
                }
                return false;
            }
        });



        $('#CourseRegistrationForm').submit(function () {

            var action = config.url + '/courses/register';
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: action,
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    $('#CourseRegistrationForm .submit-form').prop('disabled', false);
                    $('#CourseRegistrationForm .submit-form').html(lang.register);
                    if (data.type == 'success') {
                        My.toast(data.message);
                        Courses.empty();
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
                    $('#CourseRegistrationForm .submit-form').prop('disabled', false);
                    $('#CourseRegistrationForm .submit-form').html(lang.register);
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
                        action: function () { }
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
    Courses.init();
});