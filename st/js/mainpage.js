var placeholder;

$(document).ready(function(){
    var i = 0; //это будет наш счетчик, заодно используем его для формирования класса file-0x
    placeholder=  $('img.element_form')[0].src;
    
    var groups=$('.groups');
    
    // addChange(groups.children());
    
    
    
 $('#add_group').click(function(e){
    i++; //крутим счетчик на 1
    $("<input type='text' class='vk_groups'>").appendTo('.groups');
    //добавляем в див files еще одно поле для загрузки
      if(i>=2){ //если наш счетчик насчитал, что мы уже 4 поля добавили, прячем кнопку
         $(this).hide();                    
      }
    return false;
    });

  
});

var addGroup=function(){
    return $(" <div class='group'><input type='text' class='vk_group'><img src='/st/img/placeholder.jpg' class='vk_group_logo'></div>").appendTo('.groups'); 
}





var getAjax=function(requestData){
     $.ajax({ // для краткости - jQuery
             type:'POST',
             url: '/api/method',
             data:requestData,
             dataType: "json",
	     success:function(data){
                 $('img.element_form')[0].src=data.photo_big;
                 console.log(data);
                 return data;
             },
               
             error:  function(xhr, str){
                 if(xhr.status&&xhr.status==200){
                 $('input.element_form')[0].value="";
                    $('img.element_form')[0].src=placeholder;
                    alert('VK haven`t group with name: '+requestData.group_name);
                }
               else{
                   alert('Error:Please try later');
                  }
                },
        
             cache: false

            });
}

$('input.element_form').change(function(e){
    getAjax({method_name:"get_community_by_id_vk",data:{group_name:e.target.value}});
  });
