$(function () {
    function getQueryStringByName(name){
      var result = location.hash.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
      if(result == null || result.length < 1){
        return "";
      }
      return result[1];
    }
    
    var all;
    $.getJSON('/api/courses',function(res){
      // alert(res)
      var item_html = ""
      for(var i in res.data){
        console.log(i);
        var course = res.data[i];
        
        var item = "  <a href='#/course?id=1' class='weui_media_box weui_media_appmsg'>"
                  +"    <div class='weui_media_hd'>"
                  +"        <img class='weui_media_appmsg_thumb' src='" + course.pic + "' alt=''>"
                  +"    </div>"
                  +"    <div class='weui_media_bd'>"
                  +"        <h4 class='weui_media_title'>" + course.name + "</h4>"
                  +"        <p class='weui_media_desc'>通过学习Node.js基础和express，微信开发常用库，h5，最后达到学会Node.js开发的目的，该课程以实战为主，深入浅出</p>"
                  +"    </div>"
                  +"  </a>"
        
        item_html += item;
      }
      
      all = "<div class='weui_panel_bd'> " + item_html + " </div><a class='weui_panel_ft' href='javascript:void(0);'>查看更多</a>"
      // alert(all);
      
      $('.course_list').append(all);
    })
  
    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

 

    // article
    var article = {
        url: '/article',
        className: 'article',
        render: function () {
            return $('#tpl_article').html();
        }
    }; 

    // course
    var course = {
        url: '/course',
        className: 'panel',
        render: function () {
            // alert(getQueryStringByName('id'));
            return $('#tpl_course').html();
        }
    };

    // tabbar
    var tabbar = {
        url: '/home',
        className: 'tabbar',
        render: function () {
            var _t = this;
            setTimeout(function(){
              _t.bind()
            },100)
            return $('#tpl_tabbar').html();
        },
        bind: function () {       
          $('.course_list').append(all);   
          $('.weui_tabbar_content').eq(0).show()
          $('.weui_tabbar_item').on('click', function () {
            $('.weui_tabbar_item').eq($('.weui_tabbar_item').index(this)).addClass('weui_bar_item_on').siblings().removeClass('weui_bar_item_on')
            
            $('.weui_tabbar_content').eq($('.weui_tabbar_item').index(this)).show().siblings().hide();
          });
        }
    };

    router.push(tabbar)
        .push(course)
        .setDefault('/home')
        .init();


    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 相关 issue: https://github.com/weui/weui/issues/15
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});