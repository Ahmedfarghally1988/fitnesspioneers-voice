var Search= function () {

    var init = function () {
        handleSearch();
    };

    var handleSearch = function(){
        $('#menu_search').on('click', function () {
            var data = $("#searchForm").serializeArray();
            var dist;
            var searchType = $("#searchType").val();
            if(searchType == 0){
                dist = "/blogs";
            }
            if(searchType == 1){
                dist = "/courses";
            }
            if(searchType == 2){
                dist = "/news";
            }
            if(searchType == 3){
                dist = "/lecturers";
            }
            var url = config.url + dist;
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
        },
        add: function () {
            $('#search').modal('show');
        },
        
    };

}();
jQuery(document).ready(function () {
    Search.init();
});