$(function () {
    //密码校验
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpass: function (pwd) {
            if (pwd === $('[name = oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        repass: function (repwd) {
            if (repwd !== $('[name = newPwd]').val()) {
                return '两次输入密码不一致！'
            }
        }
    })

    //监听 表单 注册提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        //发送请求
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！');
                }
                layui.layer.msg('更新密码成功！');
                // console.log($('.layui-form')[0]);
                // $('.layui-form')[0].reset();
                localStorage.removeItem('token');
                window.parent.location.href = '/login.html';
            }
        });
    })

})