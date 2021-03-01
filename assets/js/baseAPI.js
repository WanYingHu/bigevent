$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //为有权限的接口，统一设置hearders
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (ret) {
        console.log(ret);
        if (ret.responseJSON.status !== 0 && ret.responseJSON.message !== '获取用户基本信息成功！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})