$(function () {

    //表单验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间！'
            }
        }
    })

    initUser();
    //初始化用户信息
    function initUser() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！');
                }
                form.val('formUserInfo', res.data)
            }
        });
    }

    //给 重置注册点击事件
    $('#reset').on('click', function (e) {
        e.preventDefault();
        initUser();
    })

    //给表单注册提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        //将更新的数据通过发起Ajax请求，发送到服务器
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('用户信息更新失败！')
                }
                layui.layer.msg('用户信息更新成功！');
                window.parent.getUserMsg();
            }
        });
    })
});