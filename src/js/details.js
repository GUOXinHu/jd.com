import {$} from './library/jquery-module.js';
import cookie from './library/cookie.js';

$(function() {
    //获取商品id
    let id = location.search.split('=')[1];
    //获取页面元素
    let shop_logo = $('.shop-logo');
    //店铺导航
    let shop_nav = $('.shop-nav .list ul'); 
    //产品类别
    let category = $('.category-box .category');

    //放大镜
    let smallbox = $('.product-intro .smallbox img');
    let bigbox = $('.product-intro .bigbox img');
    let listimg = $('.product-intro .listimg ul');

    //商品主标题
    let title = $('.product-intro .item-intro>.sku-name');
    //商品副标题
    let subtitle = $('.product-intro .item-intro>.item');

    //价格
    let price = $('.summary .price span');

    //组合商品
    let summary_promotion = $('.summary-promotion');

    //颜色选择
    let choose_color = $('.choose .choose-color .dd');

    //版本选择
    let jq_choose_version = $('.choose .choose-ver .dd ');
    //版本配置
    let jq_choose_way = $('.choose .choose-buy-way .dd');
    //套餐选择
    let jq_choose_combo = $('.choose .choose-combo .dd');
    //增值保障
    let jq_choose_guarantee = $('.choose .choose-guarantee .dd');
    //京东服务
    let jq_choose_services = $('.choose .choose-services .dd');
    //add +
    let jq_choose_amount = $('.choose .choose-btns .choose-amount');
    let jq_add = jq_choose_amount.find('span:first-of-type');
    //subtract -
    let jq_subtract = jq_choose_amount.find('span:last-of-type');
    //加入购物车
    let jq_join_btn = $('.choose .choose-btns .btn');
    //商品数量
    let jq_pro_num = jq_choose_amount.find('input');

    //库存
    let jq_store = $('.choose .choose-btns .store .num');

    //商品组合配件
    let jq_fit = $('.fittings .product-item');

    //组合数量
    let jq_fit_num = $('.fittings .result .selected span');

    //组合商品总价
    let jq_fit_total = $('.fittings .result .p-price span');

    //店铺名称
    let jq_shop_title = $('.details .left-sidebar .popbox .mt h3');

    //左侧边栏
    //第一栏
    let jq_view1_title = $('.details .left-sidebar .view-buy .mt h3'); 
    let jq_view1_ul = $('.details .left-sidebar .view-buy .mc .list'); 
    //第二栏
    let jq_view2_title = $('.details .left-sidebar .view-view .mt h3');
    let jq_view2_ul = $('.details .left-sidebar .view-view .mc .list');
    //广告栏
    let jq_ad = $(".details .left-sidebar .ad");

    //商品介绍
    //品牌
    let jq_parameter_brand = $('.detail-main .tab-con .nav-item .parameter-brand a');

    //介绍列表
    let jq_parameter_ul = $('.detail-main .tab-con .nav-item .parameter2');

    //详情图
    let jq_details_picture = $('.detail-main .tab-con .center');
     // console.log(jq_add);
    $.ajax({
        type: "get",
        url: "../interface/details.php",
        data: {id},
        dataType: "json",
        success: function (response) {
            // let res = JSON.stringify
            // console.log(response)
            //店铺logo
            //图片
            let picture = JSON.parse(response.pricture);
            shop_logo.attr('style',`background:url('./img/${picture.proLogo[0]}') no-repeat;background-size: contain;`);
            //店铺导航
            let shop_navLi = JSON.parse(response.nav);
            let navLi_item = '';
            shop_navLi.forEach(el => {
                navLi_item += `<li>${el}</li>`;
            })
            shop_nav.html(navLi_item);

            //店铺分类
            let category_item = JSON.parse(response.classify);
            //店铺名
            let shop_name = response.shop_name;
            //是否自营
            let self_run = response.self_run ? "自营" : ""; 
            let category_str = "";
            category_item.forEach(el=>{
                category_str += `<a href="">${el}</a><span>></span>`;
            });
            category_str = category_str.slice(0,-14);
            category_str += `<div class="shop-msg">
            <span>${self_run}</span>
            <a href="" class="name">${shop_name}</a>
            <i class="ser-ico iconfont">&#xe643;</i>
            <a href="" class="ser">联系客服</a>
            <i class="focus-ico iconfont">&#xe646;</i>
            <a href="" class="focus">关注店铺</a>
            </div>`;
            category.html(category_str);
            
            //放大镜
            smallbox.attr('src',`./img/${picture.proBig[0]}`);
            bigbox.attr('src',`./img/${picture.proBig[0]}`);
            let view_list = picture.proView;
            let view_str = '';
            view_list.forEach(el => {
                view_str += `<li><img src="./img/${el}" /></li>`;
            })
            listimg.html(view_str);
            //放大镜效果
            (function(){
                let box = document.getElementById("box");
                let smallbox = box.children[0];
                let bigbox = box.children[1];
                let bigimg = bigbox.children[0];
                let smallpic = smallbox.children[0];
                let i_box = smallbox.children[1];
                let list_img = document.getElementById("list_center");
                let list_ul=list_img.getElementsByTagName("ul")[0];
                let list_li=list_img.getElementsByTagName("li");
                let leftpre=document.getElementById("spec-forward");
                let rightpre=document.getElementById("spec-backward");
                smallbox.onmouseover = function () {

                i_box.style.display="block";
                bigbox.style.display="block";

                smallbox.onmousemove = function (event) {
                    var event = event || window.event;

                    var pinX = event.clientX - smallbox.getBoundingClientRect().left - i_box.offsetWidth / 2;
                    var pinY = event.clientY - smallbox.getBoundingClientRect().top - i_box.offsetHeight / 2;

                    if (pinX < 0) {
                        pinX = 0;
                    }
                    if (pinX >= smallbox.offsetWidth - i_box.offsetWidth) {
                        pinX = smallbox.offsetWidth - i_box.offsetWidth;

                    }

                    if (pinY < 0) {
                        pinY = 0;
                    }
                    if (pinY >= smallbox.offsetHeight - i_box.offsetHeight) {
                        pinY = smallbox.offsetHeight - i_box.offsetHeight;

                    }


                    i_box.style.left = pinX + "px";
                    i_box.style.top = pinY + "px";


                    bigimg.style.left = -pinX / (smallbox.offsetWidth / bigbox.offsetWidth) + 150 + "px";
                    bigimg.style.top = -pinY / (smallbox.offsetHeight / bigbox.offsetHeight) + 120 +"px";
        }

    }

    smallbox.onmouseout=function () {
        i_box.style.display="none";
        bigbox.style.display="none";
    }

   let big_img =  picture.proBig[0].slice(0,-5);
   
   for (var i=0;i<list_li.length;i++)
   {
       
       (
           function (i) {
               
               var img= list_li[i];
               img.onmouseover=function()
               {
                    smallpic.src=`./img/${big_img}`+(i+1)+".jpg";
                    bigimg.src=`./img/${big_img}`+(i+1)+".jpg";

                }



            }

        )(i)


    }
    list_ul.style.width=76*list_li.length+"px";
    var i=list_li.length-5;
    var index=0;
    var indexon=-76;
    var leftindex=parseInt(list_ul.style.left);

   rightpre.onclick=function () {
    var leftindex=parseInt(list_ul.style.left);
    //    console.log(i*index);
    //    console.log(leftindex);
        if(leftindex>i*indexon)
        {
            index=index+(-76);
            list_ul.style.left=index+"px";
        }


    }

    leftpre.onclick=function () {
        var leftindex=parseInt(list_ul.style.left);

        if(leftindex<0)
        {
            index=index-(-76);
            list_ul.style.left=index+"px";

        }

    }
            })()

            //商品主标题
            title.html(response.title);
            //副标题
            subtitle.html(response.subtitle + ' <a href="">查看 ></a>');

            //商品价格
            price.html(response.price);

            //组合商品
            let promotion_img = JSON.parse(response.acc);
            let promotionStr = "";
            promotion_img.forEach(el => {
                promotionStr += `<img src="./img/${el}" alt="">
                <em>×1</em>`;
            })
            promotionStr = `<span class="title">促 &emsp;&nbsp;销</span>
            <span class="msg">组合商品</span>` + promotionStr;
            summary_promotion.html(promotionStr);

            //颜色选择
            let choose_colorLi = JSON.parse(response.product_type);
            let chooseStr = '';
            choose_colorLi.forEach(el => {
                chooseStr += `<div class="item">
                <img src="./img/${el[0]}" alt="">
                <span>${el[1]}</span>
            </div>`;
            });
            choose_color.html(chooseStr);
            choose_color.children().first().addClass('active');
            //颜色点击事件
            let choose_color_on = choose_color.children().first().find('span').html();
            choose_color.children().on('click',function(){
                $(this).addClass('active').siblings().removeClass('active');
                choose_color_on = $(this).index();
                // choose_color_on = $(this).find('span').html();
            })
            //选择版本
            let choose_ver = JSON.parse(response.version);
            let choose_verStr = '';
            choose_ver.version.forEach(el => {
                choose_verStr += `<div class="item">${el}</div>`;
            })
            jq_choose_version.html(choose_verStr);
            //默认版本
            jq_choose_version.children().first().addClass('active');
            let choose_ver_on = jq_choose_version.children().first().html();
            
            //版本点击事件
            jq_choose_version.children().on('click',function() {
                $(this).addClass('active').siblings().removeClass('active');
                choose_ver_on = $(this).html();
            })
            //选择配置
            let choose_wayStr = "";
            choose_ver.configure.forEach(el => {
                choose_wayStr +=   `<div class="item">官方标配</div>`;
            })
            jq_choose_way.html(choose_wayStr);
            //默认配置
            jq_choose_way.children().first().addClass('active');
            //配置点击事件
            let choose_way_on = jq_choose_way.children().first().html();
            jq_choose_way.children().on('click',function() {
                $(this).addClass('active').siblings().removeClass('active');
                choose_way_on = $(this).html();
            })
            
            //套餐选择
            //默认套餐
            jq_choose_combo.children().first().addClass('active');
            let choose_combo_on = jq_choose_combo.children().first().html();
            jq_choose_combo.children().on('click',function() {
                $(this).addClass('active').siblings().removeClass('active');
                choose_combo_on = $(this).html();
            })

            //增值保障
            jq_choose_guarantee.children().first().find('.box').addClass('active');
            jq_choose_guarantee.children().on('click',function() {
                $(this).find('.box').addClass('active');
                $(this).siblings().find('.box').removeClass('active');

            })
            //京东服务
            // console.log(jq_choose_services);
            jq_choose_services.children().first().find('.box').addClass('active');
            jq_choose_services.children().on('click',function() {
                console.log($(this).find('.box'))
                $(this).find('.box').addClass('active');
                $(this).siblings().find('.box').removeClass('active');
            })
            //库存
            let tore_num = response.store;
            jq_store.html(tore_num);

            //添加add +
            let pro_num = 1;
            jq_subtract.attr('style','background:#eee;color:#999;cursor:no-drop');
            jq_add.on('click',function() {
                pro_num = parseInt(jq_pro_num.val()) + 1;
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
                pro_num = parseInt(jq_pro_num.val()) - 1;
                if(pro_num <= 1) {
                    pro_num = 1;
                    // console.log(jq_subtract)
                    jq_subtract.attr('style','background:#eee;color:#999;cursor:no-drop');
                }
                jq_add.attr('style','');
                jq_pro_num.val(pro_num);
                // console.log(pro_num)
            })
            //加入购物车

            //商品数量
            jq_pro_num.on('change',function() {
                console.log(pro_num + '---'+tore_num)
                pro_num = parseInt(jq_pro_num.val());
                if(pro_num >= tore_num) {
                    pro_num = tore_num;
                    jq_add.attr('style','background:#eee;color:#999;cursor:no-drop');
                    jq_subtract.attr('style','');
                    jq_pro_num.val(pro_num);
                }else if(pro_num <= 1) {
                    pro_num = 1;
                    jq_subtract.attr('style','background:#eee;color:#999;cursor:no-drop');
                    jq_add.attr('style','');
                    jq_pro_num.val(pro_num);
                }else {
                    jq_add.attr('style','');
                    jq_subtract.attr('style','');
                    jq_pro_num.val(pro_num);
                }
            })

            //商品组合配
            jq_fit.find('.main-product').html(`<img src="./img/${picture.pro}" alt="">
            <a href="">${response.title}</a>
            <i class="iconfont">&#xe651;</i>`);

            //组合产品
            let fittings = JSON.parse(response.fittings);
            let fittingsStr = "";
            fittings.forEach(el=>{
                fittingsStr += `<li>
                <img src="./img/${el[1]}" alt="">
                <div class="title">${el[0]}</div>
                <div class="price">
                    <input type="checkbox" id="fit01">
                    <label for="fit01">
                        <strong>¥${el[2]}</strong>
                    </label>
                </div>
            </li>`;
            })
            jq_fit.find('.fit-product').html(fittingsStr);


            //组合配件总价 配件数量
            jq_fit_total.html(parseFloat(response.price).toFixed(2));
            jq_fit.find('input').on('change',function() {
                //配件数量
                jq_fit_num.html(jq_fit.find('input:checked').length);
                //配件总价计算
                let fit_total = 0;
                $.each(jq_fit.find('input:checked'),(i,el) => {
                    // console.log($(el).next().find('strong').html().slice(1))
                    fit_total += parseFloat($(el).next().find('strong').html().slice(1));
                })
                fit_total += parseFloat(response.price);
                jq_fit_total.html(`¥${fit_total.toFixed(2)}`);
                // .each(i,el => {
                //     // console.log(el.next().find('strong').html())
                // })
            })

            //左侧边栏
            //店铺名称
            jq_shop_title.html(response.shop_name);
            // console.log(jq_fit.find('input:checked'));

            //第一栏
            let left_sidebar = JSON.parse(response.hot);
            jq_view1_title.html(left_sidebar.name[0]);
            let view1_ulStr = "";
            left_sidebar.hot.forEach(el => {
                view1_ulStr += `<li>
                <img src="./img/${el[0]}" alt="">
                <div class="name">${el[1]}</div>
                <div class="price">￥${el[2]}</div>
            </li>`;
            })
            jq_view1_ul.html(view1_ulStr);
            
            // console.log(left_sidebar.name)
            //第二栏
            jq_view2_title.html(left_sidebar.name[1]);
            let view2_ulStr = "";
            left_sidebar.new.forEach(el => {
                view2_ulStr += `<li>
                <img src="./img/${el[0]}" alt="">
                <div class="name">${el[1]}</div>
                <div class="price">￥${el[2]}</div>
            </li>`;
            })
            jq_view2_ul.html(view2_ulStr);

            //广告
            let adStr = "";
            left_sidebar.ad.forEach(el => {
                adStr += `<img src="./img/${el}" alt="">`;
            })
            jq_ad.html(adStr);


            //商品详细内容
            //商品介绍
            let paramenter = JSON.parse(response.details);
            let paramenterStr = "";
            paramenter.forEach((el,i) => {
                if(i == 0) {
                    jq_parameter_brand.html(el.slice(2));
                }else {
                    paramenterStr += `<li>${el}</li>`;
                }
            })
            jq_parameter_ul.html(paramenterStr);

            //详情图
            let details_picture = JSON.parse(response.details_picture);
            let details_pictureStr = "";
            details_picture.forEach(el => {
                details_pictureStr += ` <img src="./img/${el}" alt="">`;
            })
            jq_details_picture.html(details_pictureStr);
            // console.log(choose_combo_on)
            // console.log(jq_choose_way.children());
        }
    });

});