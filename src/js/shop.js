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
    if(cookie.get('shop')) {
        JSON.parse(cookie.get('shop')).forEach(el => {
            setId.add(el.id);
        });
    }
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
                    <div class="p-checkbox">
                        <input type="checkbox">
                    </div>
                    <div class="p-goods">
                        <img src="./${el.img}" alt="">
                        <a href="./details.html?id=${el.id}" class="p-name">
                            ${elm.title}
                        </a>
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
                return;
                    }
                })
            });
            //写入页面
            $('.main .cart-list').html(itmp);

            //全部商品数量
            $('.main .cart-filter span').html($('.main .cart-list .item').length);

            //添加商品 全选按钮
            $('.main .cart-header .jdcheckbox').not(':checked').on('change',function() {
                if($(this).prop('checked')) {
                    $('.main .cart-list .item .p-checkbox input').prop('checked',true);
                    total();
                } else {
                    $('.main .cart-list .item .p-checkbox input').prop('checked',false);
                    total();
                }
            })
            
            //进入购物车页面  根据商品数量判断+ - 按钮是否可用
            $(document).ready(function() {
            [...$('.main .cart-list .item .p-num input')].forEach(el=>{
                if(el.value <= 1) {
                    //当输入框的值小于等于1 则将-按钮设置成不可用状态
                    $(el).prev().attr('style','background:#eee;color:#999;cursor:no-drop');
                }else if(+el.value >= $(el).parent().next().find('span').html()) {
                    //值大于等于库存时，将值设置成库存值
                    el.value = $(el).parent().next().find('span').html();
                    //当输入框的值大于等于库存 则将+按钮设置成不可用状态
                    $(el).next().attr('style','background:#eee;color:#999;cursor:no-drop');
                };
            })
            })
            
            //添加按钮
            let jq_add = $('.main .cart-list .item .p-num .cart-number-inc');
            //添加add +
            jq_add.on('click',function() {
                //减少按钮
                let jq_subtract = $(this).prevAll('.cart-number-dec');
                //商品增加后数量 
                let pro_num = parseInt($(this).prev().val()) + 1;
                //库存
                let tore_num = $(this).parent().next().find('span').html();
                //商品原始数量
                let jq_pro_num = $(this).prev();
                 jq_pro_num.val(pro_num);
                 if(pro_num >= tore_num) {
                     pro_num = tore_num;
                     $(this).attr('style','background:#eee;color:#999;cursor:no-drop');
                 }
                 jq_subtract.attr('style','');
                 jq_pro_num.val(pro_num);

                 //小计
                //  let p_price =$(this).parents('.p-num').prev().html().trim().slice(1);
                 let p_price = parseFloat($(this).parents('.p-num').prev().html().trim().slice(1));
                 let p_sum = (p_price * pro_num).toFixed(2);
                 $(this).parents('.p-num').next().find('strong').html(`¥${p_sum}`);

                 //重新设置cookie
                 let shop = JSON.parse(cookie.get('shop'));
                 shop.forEach((el,i) => {
                    if(i === $(this).parents('.item').index() && el.color === $(this).parents('.item').find('.p-props .color').html() && el.type === $(this).parents('.item').find('.p-props .type').html()) {
                        el.num = pro_num;
                        return;
                    }
                 });
                 cookie.set('shop',JSON.stringify(shop));
                 //判断当前商品是否勾选，如勾选则调用总价函数
                 if(!!$(this).parents('.item').find('.p-checkbox input:checked').length) {
                     total();
                 }
             })

             //减少subtract -
              //减少按钮
            let jq_subtract = $('.main .cart-list .item .p-num .cart-number-dec');
             jq_subtract.on('click',function() {
                 //商品原始数量
                let jq_pro_num = $(this).next();
                 //商品减少后数量 
                 let pro_num = parseInt(jq_pro_num.val()) - 1;
                 if(pro_num <= 1) {
                     pro_num = 1;
                     // console.log(jq_subtract)
                     $(this).attr('style','background:#eee;color:#999;cursor:no-drop');
                 }
                 jq_add.attr('style','');
                 jq_pro_num.val(pro_num);
                 // console.log(pro_num)
                 //小计
                //  let p_price =$(this).parents('.p-num').prev().html().trim().slice(1);
                let p_price = parseFloat($(this).parents('.p-num').prev().html().trim().slice(1));
                let p_sum = (p_price * pro_num).toFixed(2);
                $(this).parents('.p-num').next().find('strong').html(`¥${p_sum}`);

                 //重新设置cookie
                 let shop = JSON.parse(cookie.get('shop'));
                 shop.forEach((el,i) => {
                    if(i === $(this).parents('.item').index() && el.color === $(this).parents('.item').find('.p-props .color').html() && el.type === $(this).parents('.item').find('.p-props .type').html()) {
                        el.num = pro_num;
                        return;
                    }
                 });
                 cookie.set('shop',JSON.stringify(shop));
                  //判断当前商品是否勾选，如勾选则调用总价函数
                  if(!!$(this).parents('.item').find('.p-checkbox input:checked').length) {
                    total();
                }
             }) 

             //商品数量
             let jq_pro_num = $('.main .cart-list .item .p-num input');
            jq_pro_num.on('change',function() {
                let tore_num = parseInt($(this).parent().next().find('span').html());
                let jq_add  = $(this).next();
                let jq_subtract = $(this).prev();
                let pro_num = parseInt($(this).val());
                // pro_num = parseInt(jq_pro_num.val());
                if(pro_num >= tore_num) {
                    pro_num = tore_num;
                    jq_add.attr('style','background:#eee;color:#999;cursor:no-drop');
                    jq_subtract.attr('style','');
                    $(this).val(pro_num);
                }else if(pro_num <= 1) {
                    pro_num = 1;
                    jq_subtract.attr('style','background:#eee;color:#999;cursor:no-drop');
                    jq_add.attr('style','');
                    $(this).val(pro_num);
                }else {
                    jq_add.attr('style','');
                    jq_subtract.attr('style','');
                    $(this).val(pro_num);
                }

                 //小计
                //  let p_price =$(this).parents('.p-num').prev().html().trim().slice(1);
                let p_price = parseFloat($(this).parents('.p-num').prev().html().trim().slice(1));
                let p_sum = (p_price * pro_num).toFixed(2);
                $(this).parents('.p-num').next().find('strong').html(`¥${p_sum}`);

                 //重新设置cookie
                 let shop = JSON.parse(cookie.get('shop'));
                 shop.forEach((el,i) => {
                    if(i === $(this).parents('.item').index() && el.color === $(this).parents('.item').find('.p-props .color').html() && el.type === $(this).parents('.item').find('.p-props .type').html()) {
                        el.num = pro_num;
                        return;
                    }
                 });
                 cookie.set('shop',JSON.stringify(shop));

                  //判断当前商品是否勾选，如勾选则调用总价函数
                  if(!!$(this).parents('.item').find('.p-checkbox input:checked').length) {
                    total();
                }
            })

            //商品勾选
            $('.main .cart-list .item .p-checkbox input').on('change',function() {
                total();
            })

            //商品删除
            $('.main .cart-list .item .p-ops span').on('click',function() {
                if(confirm('确认要删除此商品吗？')) {
                    //重新设置cookie
                    let shop = JSON.parse(cookie.get('shop'));
                    shop.forEach((el,i) => {
                       if(i === $(this).parents('.item').index() && el.color === $(this).parents('.item').find('.p-props .color').html() && el.type === $(this).parents('.item').find('.p-props .type').html()) {
                           shop.splice(i,1);
                           return;
                       }
                    });
                    cookie.set('shop',JSON.stringify(shop));
                    location.reload();
                }
            })
            //全选 删除
            $('.cart-floatbar .options-box .left .select-all input').on('click',function() {
                if($(this).prop('checked')) {
                    $('.main .cart-list .item .p-checkbox input').prop('checked',true);
                    total();
                    $(this).parent().next().on('click',function() {
                        if(confirm('确认要删除所有商品吗？')) {
                            //重新设置cookie
                            cookie.remove('shop');
                            location.reload();
                        }
                    })
                } else {
                    $('.main .cart-list .item .p-checkbox input').prop('checked',false);
                    total();
                }
            })

        }})

        //总数与总价计算
        function total() {
            //已选总价
        let total_price = 0;
        //已选商品数量
        let sum = 0;
        [...$('.main .cart-list .item .p-checkbox input:checked')].forEach(el => {
            total_price += +$(el).parents('.item').find('.p-sum strong').html().slice(1);
            sum += +$(el).parents('.item').find('.p-num input').val();
        });
        //将总价与数量写入页面
        $('.cart-floatbar .right .amount-sum span').html(sum);
        $('.cart-floatbar .right .price-show span').html(`¥${total_price.toFixed(2)}`);
        }

})