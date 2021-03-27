import {$} from './library/jquery-module.js';

$(function() {
    //手机号框
    let phoneBox = $('.step-form .phoneNum');
    //正则验证
    let phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
    //正则验证提示
    phoneBox.on('change',function() {
        if(!phoneReg.test(phoneBox.val())) {
            $('.step-form .phone-reg').css('display','block');
            $('.step-form .phone-reg span').html('请输入正确的手机号');
            $('.step-form .phone-verify').css('display','none');
        }else {
            $('.step-form .phone-reg').css('display','none');
        }
    })
    //数据库验证
    $('.step-form .verifyBtn .btn').on('click',function() {
        if(phoneReg.test(phoneBox.val())) {
            $.getJSON("../interface/phoneReg.php", `phone=${phoneBox.val()}`,
            function (data) {
               if(!data) {
                   //验证通过后，给输入框中打个勾
                   $('.step-form .phone-verify').css('display','inline-block');
                   //点击下一步
                   $('.step-form .next').on('click',function() {
                       //页面置顶
                       $('html').scrollTop(0);
                       //步骤变更
                       $('.step-box .step-active').next().css('background','url(./img/reg-icon.png) no-repeat 0px -129px');
                       $('.step-box .step-active').removeClass('step-active').nextAll(':eq(1)').addClass('step-active');
                           $('.step-form').children().first().css('display','none');
                           $('.step-form').prepend(`<div class="acc-msg">
                           <div class="username"><span>用户名</span><input type="text" placeholder="请输入用户名"><i class="iconfont"></i></div>
                           <div class="pwd"><span>设置密码</span><input type="password" placeholder="请输入密码"><i class="iconfont"></i></div>
                           <div class="verify-pwd"><span>确认密码</span><input type="password" placeholder="请再次输入密码"><i class="iconfont"></i></div>
                           <div class="email"><span>邮箱</span><input type="email" placeholder="请输入正确的邮箱"><i class="iconfont"></i></div>
                         </div>`);
                         $(this).off();
                         $(this).html('立即注册');
                         //验证用户名  
                         $('.step-form .acc-msg .username input').on('change',function() {
                             let usernameReg = /^[a-zA-Z0-9_-]{4,16}$/;
                             if(usernameReg.test($(this).val())) {
                               $(this).parent().children('i').html('&#xe660;');
                               $(this).parent().children('i').addClass('pass');
                               $(this).parent().children('i').css('color','#3b4');
                             } else {
                                 $(this).parent().children('i').removeClass('pass');
                                 $(this).parent().children('i').html('&#xe615; 请输入正确的用户名(4-16位)');
                                 $(this).parent().children('i').css('color','#e2231a');
                             }
                         })
                         //验证密码
                         $('.step-form .acc-msg .pwd input').on('change',function() {
                             let userReg = /^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
                           if(userReg.test($(this).val())) {
                             $(this).parent().children('i').html('&#xe660;');
                             $(this).parent().children('i').addClass('pass');
                             $(this).parent().children('i').css('color','#3b4');
                           } else {
                               $(this).parent().children('i').removeClass('pass');
                               $(this).parent().children('i').html('&#xe615; 6-20位数字、字母、字符(至少两种组合))');
                               $(this).parent().children('i').css('color','#e2231a');
                           }
                         })
                         //再次输入密码验证
                         $('.step-form .acc-msg .verify-pwd input').on('change',function() {
                         if($('.step-form .acc-msg .pwd input').val() == $(this).val()) {
                           $(this).parent().children('i').html('&#xe660;');
                           $(this).parent().children('i').addClass('pass');
                           $(this).parent().children('i').css('color','#3b4');
                         } else {
                             $(this).parent().children('i').removeClass('pass');
                             $(this).parent().children('i').html('&#xe615; 密码输入错误,请重新输入');
                             $(this).parent().children('i').css('color','#e2231a');
                         }
                       })
   
                       //邮箱验证
                       $('.step-form .acc-msg .email input').on('change',function() {
                           let userReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                         if(userReg.test($(this).val())) {
                           $(this).parent().children('i').html('&#xe660;');
                           $(this).parent().children('i').addClass('pass');
                           $(this).parent().children('i').css('color','#3b4');
                         } else {
                             $(this).parent().children('i').removeClass('pass');
                             $(this).parent().children('i').html('&#xe615; 邮箱格式错误');
                             $(this).parent().children('i').css('color','#e2231a');
                         }
                       })
   
                       //立即注册
                       $('.step-form .next').on('click',function() {
                           console.log()
                           if($('.step-form .acc-msg').find('i').hasClass('pass')) {
                                $.post("../interface/regist.php", {
                                    "username":$('.step-form .acc-msg .username input').val(),
                                    "password":$('.step-form .acc-msg .pwd input').val(),
                                    "phone":phoneBox.val(),
                                    "email":$('.step-form .acc-msg .email input').val()
                                },
                                    function (data) {
                                        if(data) {
                                            $('.step-form .acc-msg').css('display','none');
                                            $('.step-form').prepend(`<div class="regist-success">
                                            注册成功,<a href="./login.html">请登录></a>
                                          </div>`);
                                            $('.step-form .next').css('display','none');
                                            $('.step-form .step-other').css('display','none');
                                        }
                                    }
                                );
                           }
                       })
                       })
               }else {
                $('.step-form .phone-reg').css('display','block');
                $('.step-form .phone-reg span').html('号码已注册');
                $('.step-form .phone-verify').css('display','none');
               }
                }
            );
        }
    })


})