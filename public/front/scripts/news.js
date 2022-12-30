var News = function () {
var Page=2;

    var init = function () {
        handleSubmit();
        handleComments();
        handleSearch();
        handleLoadmore ();
    };

    var handleComments =function(){
         $('ul.pagination').hide();
        
             $('.infinite-scroll').jscroll({
                 autoTrigger: true,
                 loadingHtml: '<img class="center-block" src="' + config.base_url + '/public/front/images/loading.gif" style="width:40px;height:40px;"  alt="Loading..." />',
                 padding: 0,
                 nextSelector: '.pagination li.active + li a',
                 contentSelector: 'div.infinite-scroll',
                 callback: function () {
                     $('ul.pagination').remove();
                 }
             });
        
    }
    var handleLoadmore = function () {
        $('#load-more-button').on('click', function () {
            $(this).prop('disabled', true);
            $(this).html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
             var params = {};
             if (new_config.search != '') {
                params['search'] = new_config.search
             }
             var query = $.param(params);
             var action =config.url + '/get_news?page=' + Page;
             if (!jQuery.isEmptyObject(params)) {
                 action =config.url + '/get_news?page=' + Page + '&' + query;
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
                        if (data.data.news != "") {
                            $('#news-items').append(data.data.news);
                            Page++;
                        }else{
                            $('#load-more-button').css('display','none');
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

    var handleSearch = function(){
        $('.btn-search').on('click', function(){
            var data = $("#NewsSearchForm").serializeArray();
            var url = config.url + "/news";
            var params = {};
            $.each(data, function (i, field) {
                var name = field.name;
                var value = field.value;
                if (value) {params[name] = value}
            });
            var query = $.param(params);
            if (!jQuery.isEmptyObject(params)){
                url += '?' +query;
            }
            window.location.href = url;
            return false;
        })
    }


    var handleSubmit = function () {
        $('#CommentForm').validate({
            rules: {
                name: {
                    required: true
                },
                email:{
                    required: true,
                    email: true
                },
                text: {
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
                text: {
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

        $('#CommentForm .submit-form').click(function () {
            if ($('#CommentForm').validate().form()) {
                $('#CommentForm .submit-form').prop('disabled', true);
                $('#CommentForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                setTimeout(function () {
                    $('#CommentForm').submit();
                }, 1000);
            }
            return false;
        });
        $('#CommentForm input').keypress(function (e) {
            if (e.which == 13) {
                if ($('#CommentForm').validate().form()) {
                    $('#CommentForm .submit-form').prop('disabled', true);
                    $('#CommentForm .submit-form').html('<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i><span class="sr-only">Loading...</span>');
                    setTimeout(function () {
                        $('#CommentForm').submit();
                    }, 1000);
                }
                return false;
            }
        });

        $('#CommentForm').submit(function () {
            var action = config.url + '/news/comments';
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: action,
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    $('#CommentForm .submit-form').prop('disabled', false);
                    $('#CommentForm .submit-form').html(lang.comment);
                    if (data.type == 'success') {
                        My.toast(data.data.message);
                        if (config.lang_code ==='ar'){
                            $("ul.list-unstyled").prepend('<li><a class ="pull-left href = "#"><img class ="comment-avatar img-circle" src ="' + config.base_url + '/public/front/images/com.png" alt =""></a><div class="comment-meta" style="text-align:right"><h5 class ="text-info" style="text-align:right;margin-right:10px;">' + data.data.comment.name + ' </h5> <span ><em style="text-align:right;margin-right:10px;" >' + data.data.comment.date + ' </em></span><div class="row"><div class="col-sm-9"><div class="row"><p style="text-align:right">' + data.data.comment.text + '</p></div></div></div></div></li>');
                        }else{
                        $("ul.list-unstyled").prepend('<li><a class ="pull-left href = "#"><img class ="comment-avatar img-circle" src ="' + config.base_url + '/public/front/images/com.png" alt =""></a><div class="comment-meta"><h5 class ="text-info">' + data.data.comment.name + ' </h5> <span ><em >' + data.data.comment.date + ' </em></span><div class="row"><div class="col-sm-9"><div class="row"><p>' + data.data.comment.text + '</p></div></div></div></div></li>');
                        }
                        News.empty();
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
                    $('#CommentForm .submit-form').prop('disabled', false);
                    $('#CommentForm .submit-form').html(lang.comment);
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
    News.init();
});
