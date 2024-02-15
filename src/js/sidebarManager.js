let tag = '';

$(document).on('click', '#today, #week, #month, #projects, #notes, #all', function(){
    tag = $(this).attr('id');    
   
    $("#addTask").prop('disabled', tag === 'all');
      
    $("#addTask").removeClass('today week month projects notes all').addClass(tag);
    $("#container").removeClass('today week month projects notes all').addClass(tag);
    
    $("#container > div").not('.' + tag).removeClass('d-flex');
    $("#container").children('.' + tag).addClass('d-flex');
    $("#container").children().hide();
    $("#container").children('.' + tag).show();
});

export { tag };