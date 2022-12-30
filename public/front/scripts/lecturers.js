var lecturers = function () {

    var init = function () {
        handleSearch();
    };

    var handleSearch = function(){
        $('.btn-search').on('click', function(){
            var data = $("#LecturersSearchForm").serializeArray();
            var url = config.url + "/lecturers";
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
 
    return {
        init: function () {
            init();
        }
    };

}();


jQuery(document).ready(function () {
    lecturers.init();
});
