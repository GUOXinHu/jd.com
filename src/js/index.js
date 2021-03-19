import {$} from './library/jquery-module.js';
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

  $(function() {
      //countDown
      let hour,minute,second,timer;
      let time = new Date();
      time.setHours(22);
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
  })