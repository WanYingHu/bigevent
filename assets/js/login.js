$(function () {
    //给'去注册'设置点击事件
    $('#linkReg').on('click', function () {
        $('.box_login').hide();
        $('.box_reg').show();
    });

    //给'去登录'注册点击事件
    $('#linkLogin').on('click', function () {
        $('.box_reg').hide();
        $('.box_login').show();
    });

    //表单验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            console.log(111);
            var pwd = $('.box_reg [name=password]').val();
            console.log(pwd);
            if (pwd !== value) {
                return '两次输入的密码不一致！';
            }
        }
    });

    //监听表单的提交事件
    //注册验证
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        console.log(data);

        $.post('/api/reguser', data, function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            layui.layer.msg('注册成功，请登录！');
            $('#linkLogin').click();
        })
    });


    //登录验证
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(111);
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败！');
                }
                layui.layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        });
    })

})