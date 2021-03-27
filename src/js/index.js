import {$} from './library/jquery-module.js';
import './library/jquery.lazyload.js';
import cookie from './library/cookie.js';

//顶部中心轮播图
var mySwiper = new Swiper ('.banner', {
    direction: 'horizontal',
    loop: true,
    speed:1,
    autoplay:3000,
    // 如果需要分页器
    pagination : '.swiper-pagination',
    //点击分页器切换图片
    paginationClickable :true,
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
    // 如果需要滚动条
    // scrollbar: '.swiper-scrollbar',
  })  

  //顶部右边轮播图
  var mySwiper = new Swiper ('.barright-swiper', {
    direction: 'horizontal',
    loop: true,
    speed:1000,
    //点击分页器切换图片
    paginationClickable :true,
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
  })

  //新品首发
  let newArrivalSwiper = new Swiper('.new-arrival-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  });

  //DOM操作
  $(function() {
      //设置用户名
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

      //秒杀倒计时
      let hour,minute,second,timer;
      let time = new Date();
      time.setHours(18);
      time.setMinutes(0);
      time.setSeconds(0);
      let countDown = (time - Date.now()) / 1000;
      if(countDown >= 0) {
        timer = setInterval(()=>{
          hour = Math.floor(countDown / 3600);
          minute = Math.floor(countDown % 3600 / 60);
          second = countDown % 60;
          countDown--;
          countDown < 0 && clearInterval(timer);
          $('.countDown>.hour').html(hour < 10 ? `0${hour}` : hour);
          $('.countDown>.minute').html(minute < 10 ? `0${minute}` : minute);
          $('.countDown>.second').html(second < 10 ? `0${second}` : second);
        },1000);
      } else {
          $('.countDown>.hour').html('00');
          $('.countDown>.minute').html('00');
          $('.countDown>.second').html('00');
      }

      //每日特价tab
      let  traitLi= $('.trait1 .sale .saleHd .tab_head li');
      traitLi.on('mouseover',function(){
        let index = traitLi.index(this);
        $(this).addClass('active').siblings().removeClass('active');
        $('.trait1 .tab_body .item').eq(index).addClass('item_show').siblings().removeClass('item_show');
      });


      //发现好物 无缝滚动
      let finegoods = $('.finegoods');
      let marList = $('.finegoods .marquee .list');
      let left = parseInt(marList.css('left'));
      let scrollBar = $('.finegoods .scroll-bar');
      let scrollBox = $('.finegoods .scroll-bar span');
      let scrollBarWidth = scrollBar.width();
      let scrollBoxWidth = scrollBox.width();
      let marTimer = setInterval(function() {
        if(parseInt(marList.css('left')) <= -1980) {
          left = 0;
        }
        marList.css('left', left-- + 'px');
      },30);
      finegoods.on('mouseover',function() {
        clearInterval(marTimer);
        //计算滚动距离
        let scrollLeft = (scrollBarWidth -  scrollBoxWidth) / 1980 * (-left);
        scrollBar.addClass('scroll-bar-show');
        scrollBox.css('left',scrollLeft + 'px');
        //滚动条鼠标移动
        // scrollBox.on('click',function() {
        //   scrollBox.on('mousemove',function(ev) {
        //     let mouseX = ev.clientX - (164.6 + 190 + 10 + 15);

        //     console.log(ev.clientX,ev.clientY)
        //   })
        // })
      })
      finegoods.on('mouseout',function() {
        scrollBar.removeClass('scroll-bar-show');
        marTimer = setInterval(function() {
          if(parseInt(marList.css('left')) <= -1980) {
            left = 0;
          }
          marList.css('left',left-- + 'px');
        },30);
      })

      //排行榜
      let traitLbLi = $('.trait .trait3 .leader-boards .title-list li');
      traitLbLi.on('mouseover',function() {
        let index = traitLbLi.index(this);
       $(this).addClass('active').siblings().removeClass('active');
      $('.trait .trait3 .leader-boards .tabs-msg').eq(index).addClass('tabs-show').siblings().removeClass('tabs-show');
     }) 

     //为你推荐tabs
     $('.recommendBox .recommend-tabs li').on('click',function() {
       $(this).addClass('active').siblings().removeClass('active');
     })

      //商品渲染
      //通过Ajax请求商品图片 标题 价格
      $.ajax({
        type: "get",
        url: "../interface/index.php",
        dataType: "json",
        success: function (res) {
          let list = $('.recommendBox .product .list');
          let temp = '';
          res.forEach(el => {
            let pricture = JSON.parse(el.pricture);
            let selfRun = +el.self_run ? '&nbsp;自营&nbsp;' : '';
            let plusPrice = +el.plus_price ? `¥${el.plus_price}.00` : '';
            let plusShow = plusPrice ? ' plus_show' : '';
            // href="./details.html?id=${el.id}
            // <a href="./details.html?id=${el.id}">
            temp += `
              <li class="item">
              <a>
                    <img class="lazy" data-original="./img/${pricture.pro}" alt="">
                    <div class="title">
                        <span class="self-run">${selfRun}</span>
                        ${el.title}
                    </div>
                    <div class="price">
                        <i class="price_before">¥</i>
                        <span>${el.price}.</span>
                        <i class="price_after">00</i>
                        <div class="plus${plusShow}">
                          <span class="plus_price">${plusPrice}</span>
                          <span class="plus_name">PLUS</span>
                        </div>
                    </div>
                    <div class="item_hover">
                        <div class="cancel">×</div>
                        <div class="seek">
                            <i class="iconfont">&#xe681;</i>
                            <span>找相似</span>
                        </div>
                    </div>
                </a>
              </li>`;
          });
          //将数据写到页面
          list.html(temp);
          //数据懒加载
          $("img.lazy").lazyload({effect: "fadeIn"});
          //点击商品判断用户是否登录
          list.find('.item a').on('click',function() {
            if(!$('.topNav .navUl .login').html() == cookie.get('username')) {
              location.href = './login.html';
            }else {
              location.href = `./details.html?id=${$(this).parent().index()+1}`;
            }
          });



          //楼梯滚动
          $('.elevator ul li').on('click',function() {
            let ele = $(`#${$(this).attr('title')}`);
            if(ele.length) {
            let top = ele.offset().top;
            $('html').animate({
              scrollTop:top
            },600);
           }else if($(this).attr('title') == 'stick'){
             $('html').animate({
               scrollTop:0
             },600)
           }
            
            
          })
          
          // console.log($('.elevator ul li[title]'))
          // for(let i in $('.elevator ul li[title]')) {
          //   // console.log($($('.elevator ul li[title]')[i]).attr('title'))
          //   console.log(1)
          // }
          let offsetTop_arr = [];
          for(let i = 0;i < $('.elevator ul li[title]').length;i++) {
            offsetTop_arr.push($(`#${$($('.elevator ul li[title]')[i]).attr('title')}`));
          }
          
          $(window).on('scroll',function() {
            let top = $(document).scrollTop();
            if(top >= offsetTop_arr[0].offset().top && top <offsetTop_arr[1].offset().top) {
              $(`.elevator ul li[title=${offsetTop_arr[0][0].id}]`).addClass('active').siblings().removeClass('active');
            }else if(top >= offsetTop_arr[1].offset().top && top <offsetTop_arr[2].offset().top) {
              $(`.elevator ul li[title=${offsetTop_arr[1][0].id}]`).addClass('active').siblings().removeClass('active');
            }else if(top >= offsetTop_arr[2].offset().top) {
              $(`.elevator ul li[title=${offsetTop_arr[2][0].id}]`).addClass('active').siblings().removeClass('active');
            }
          })
        }
      });

  })

  