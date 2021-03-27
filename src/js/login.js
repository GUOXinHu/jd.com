import {$} from './library/jquery-module.js';
import cookie from './library/cookie.js';
$(function() {
    $('.login .btn').on('click',function() {
        let acc = $('.login .accForm .loginname').val();
        let usernmaeReg = /^[a-zA-Z0-9_-]{4,16}$/;
        let phone = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
        let email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(phone.test(acc)) {
           $.post("../interface/login.php", {
               'phone':$('.login .accForm .loginname').val(),
               'pwd':$('.login .accForm .loginpwd').val()
           },
               function (data) {
                   if(data != '0') {
                       data = JSON.parse(data);
                       let userid = data.id;
                       let username = data.username;
                       cookie.set('username',username);
                       cookie.set('userid',userid);
                       location.href = './index.html';
                   }else {
                       $('.login .forget span').css('display','block');
                   }
               },
           );
        }else if(email.test(acc)) {
            $.post("../interface/login.php", {
                'email':$('.login .accForm .loginname').val(),
                'pwd':$('.login .accForm .loginpwd').val()
            },
                function (data) {
                    if(data != '0') {
                        data = JSON.parse(data);
                        let userid = data.id;
                        let username = data.username;
                        cookie.set('username',username);
                        cookie.set('userid',userid);
                        location.href = './index.html';
                    }else {
                        $('.login .forget span').css('display','block');
                    }
                },
            );
        }else {
            $.post("../interface/login.php", {
                'username':$('.login .accForm .loginname').val(),
                'pwd':$('.login .accForm .loginpwd').val()
            },
                function (data) {
                    if(data != '0') {
                        data = JSON.parse(data);
                        let userid = data.id;
                        let username = data.username;
                        cookie.set('username',username);
                        cookie.set('userid',userid);
                        location.href = './index.html';
                    }else {
                        $('.login .forget span').css('display','block');
                    }
                },
            );
        }
    });
})