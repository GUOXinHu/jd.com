import {$} from './library/jquery-module.js';
import cookie from './library/cookie.js';

$(function() {
    //导航栏用户名获取
    let userid = cookie.get('userid');
      let username = cookie.get('username');
      $.get("../interface/index-user.php", {
        'userid':userid,
        'username':username
      },
        function (data) {
          if(data) {
            $('.topNav .navUl .login').html(username);
          }
        },
        "json"
      );
    
      //如果用户未登录 返回登录页
      if(!$('.topNav .navUl .login').html() == cookie.get('username')) {
        location.href = './login.html';
      }


    //购物车渲染
    let setId = new Set();
    JSON.parse(cookie.get('shop')).forEach(el => {
        setId.add(el.id);
    });
    let idList = [...setId];
    $.ajax({
        type: "get",
        url: "../interface/getItems.php",
        data: { "idList":idList.join()},
        dataType: "json",
        success: function(res) {
            let itmp = '';
            JSON.parse(cookie.get('shop')).forEach(el => {
                res.forEach(elm => {
                    if(el.id === elm.id) {
                        itmp += `
                        <li class="item">
                    <div class="p-checbox">
                        <input type="checkbox">
                    </div>
                    <div class="p-goods">
                        <img src="./${el.img}" alt="">
                        <div class="p-name">
                            ${elm.title}
                        </div>
                    </div>
                    <div class="p-props">
                        <div class="color">${el.color}</div>
                        <div class="type">${el.type}</div>
                    </div>
                    <div class="p-price">
                        ¥${el.prices}
                    </div>
                    <div class="p-num">
                        <div class="cart-number">
                            <button class="cart-number-dec">-</button>
                            <input min="1" max="200" value="${el.num}">
                            <button class="cart-number-inc">+</button>
                        </div>
                        <div class="store">库存<span>${el.store}</span></div>
                    </div>
                    <div class="p-sum">
                        <strong>¥${parseFloat(el.prices * el.num).toFixed(2)}</strong>
                    </div>
                    <div class="p-ops">
                        <span>删除</span>
                    </div>
                </li>`;
                    }
                })
            });
            //写入页面
            $('.main .cart-list').html(itmp);
            
            
            //添加按钮
            let jq_add = $('.main .cart-list .item .p-num .cart-number-inc');
            //删除按钮
            let jq_subtract = $('.main .cart-list .item .p-num .cart-number-dec');
            console.log(jq_subtract)
            //添加add +
            jq_subtract.attr('style','background:#eee;color:#999;cursor:no-drop');
            jq_add.on('click',function() {
                console.log($(this).prev())
                //商品增加后数量 
                let pro_num = parseInt($(this).prev().val()) + 1;
                //库存
                let tore_num = $(this).parent().next().find('span').html();
                //商品原始数量
                let jq_pro_num = $(this).prev();
                 jq_pro_num.val(pro_num);
                 if(pro_num >= tore_num) {
                     pro_num = tore_num;
                     jq_add.attr('style','background:#eee;color:#999;cursor:no-drop');
                 }
                 jq_subtract.attr('style','');
                 jq_pro_num.val(pro_num);
             })
             //减少subtract -
             jq_subtract.on('click',function() {
                 console.log('a')
                 //商品原始数量
                let jq_pro_num = $(this).next();
                 //商品减少后数量 
                 let pro_num = parseInt(jq_pro_num.val()) - 1;
                 if(pro_num <= 1) {
                     pro_num = 1;
                     // console.log(jq_subtract)
                     jq_subtract.attr('style','background:#eee;color:#999;cursor:no-drop');
                 }
                 jq_add.attr('style','');
                 jq_pro_num.val(pro_num);
                 // console.log(pro_num)
             }) 

        }})

        //小计
        function subtotal(price,num) {
            
        }

})