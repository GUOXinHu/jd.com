window.onload=function () {
    var box = document.getElementById("box");
    var smallbox = box.children[0];
    var bigbox = box.children[1];
    var bigimg = bigbox.children[0];
    var smallpic = smallbox.children[0];
    var i_box = smallbox.children[1];
    var list_img = document.getElementById("list_center");
    var list_ul=list_img.getElementsByTagName("ul")[0];
    var list_li=list_img.getElementsByTagName("li");

    var leftpre=document.getElementById("spec-forward");
    var rightpre=document.getElementById("spec-backward");




    smallbox.onmouseover = function () {

        i_box.style.display="block";
        bigbox.style.display="block";

        smallbox.onmousemove = function (event) {
            var event = event || window.event;

            var pinX = event.clientX - smallbox.offsetParent.offsetLeft - i_box.offsetWidth / 2;
            var pinY = event.clientY - smallbox.offsetParent.offsetTop - i_box.offsetHeight / 2;

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


            bigimg.style.left = -pinX / (smallbox.offsetWidth / bigbox.offsetWidth) + 100 + "px";
            bigimg.style.top = -pinY / (smallbox.offsetHeight / bigbox.offsetHeight) + 50+ "px";





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
                    smallpic.src="img/pro09-viewbig0"+(i+1)+".jpg";
                    bigimg.src="img/pro09-viewbig0"+(i+1)+".jpg";

                }



            }

        )(i)


    }
    list_ul.style.width=58*list_li.length+"px";
    var i=list_li.length-5;
    var index=0;
    var indexon=-58;
    var leftindex=parseInt(list_ul.style.left);

   leftpre.onclick=function () {
    var leftindex=parseInt(list_ul.style.left);
       console.log(i*index);
       console.log(leftindex);
        if(leftindex>i*indexon)
        {
            index=index+(-58);
            list_ul.style.left=index+"px";


        }


    }

    rightpre.onclick=function () {
        var leftindex=parseInt(list_ul.style.left);

        if(leftindex<0)
        {
            index=index-(-58);
            list_ul.style.left=index+"px";

        }

    }



}

