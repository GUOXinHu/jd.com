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
    $.ajax({
        type: "get",
        url: "../interface/details.php",
        data: {id},
        dataType: "json",
        success: function (response) {
            // let res = JSON.stringify
            // console.log(response)
            //店铺logo
            let picture = JSON.parse(response.pricture);
            shop_logo.attr('style',`url(../img/${picture.proLogo[0]})`);

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


    for (var i=0;i<list_li.length;i++)
    {

        (
            function (i) {

                var img= list_li[i];
                img.onmouseover=function()
                {
                    smallpic.src="./img/pro09-viewbig0"+(i+1)+".jpg";
                    bigimg.src="./img/pro09-viewbig0"+(i+1)+".jpg";

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
            let color_id = "";
            choose_color.children().on('click',function(){
                $(this).addClass('active').siblings().removeClass('active');
                color_id = $(this).index();
            })
            console.log(color_id);
        }
    });

});