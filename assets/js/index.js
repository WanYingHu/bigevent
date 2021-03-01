$(function () {

    //获取用户信息  getUserMsg()
    getUserMsg();

    //退出按钮的点击事件
    $('#logout').on('click', function () {
        // console.log(111);
        //点击该按钮，弹出confirm提示框
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //删除本地token
            localStorage.removeItem('token');
            //跳转至登录界面
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

//发送Ajax请求，获取用户信息
function getUserMsg() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (ret) {
            // console.log(ret);
            if (ret.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            xuanRan(ret.data);

        },
        complete: function (ret) {
            console.log(ret);
            if (ret.responseJSON.status !== 0 && ret.responseJSON.message !== '获取用户基本信息成功！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })
}

function xuanRan(opt) {
    //显示用户名
    var name = opt.username || opt.nickname;
    $('#welcome').html('欢迎' + name);
    //判断显示文本头像还是图片头像
    if (opt.user_pic !== null) {
        //显示图片头像，隐藏文本头像
        $('.layui-nav-img').attr('src', opt.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //显示文本头像，隐藏图片头像
        $('.layui-nav-img').hide();
        var firstWord = name[0].toUpperCase();
        $('.text-avatar').html(firstWord).show();
    }

}