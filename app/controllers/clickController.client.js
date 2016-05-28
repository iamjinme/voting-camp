$(document).ready(function() {
  $('#new').click(function() {
    window.location.href = '/admin/new'
  });
  $('#my').click(function() {
    window.location.href = '/admin/polls'
  });
  $('#more').click(function() {
    $('#options').append('<input type="text" name="options[]" placeholder="...and more" class="form-input">');
  });
  // Submit Form :: Vote Poll
  $('#vote_poll')
  .submit(function(e) {
    e.preventDefault();
    console.log('vote_poll');
    var data = $(this).serialize();
    console.log($('select').val());
    if ($('select').val() !== '') {
      $.ajax({
        url: '/api/vote',
        type: 'POST',
        data: data
      }).done(function(json){
        //$('div.hide').removeClass('hide');
        //$('#message').html(' Great, you have created poll "' + json.title + '"');
        //$('#go_poll').attr('href', '/poll/' + json.hash);
        //$('#new_poll').addClass('hide');
        console.log(json);
      });
    };
    e.preventDefault();
  });
  // Submit Form :: New Poll
  $('#new_poll')
  .submit(function(e) {
    var data = $(this).serialize();
    if ($("#title").val()) {
      $.ajax({
        url: '/api/polls',
        type: 'POST',
        data: data
      }).done(function(json){
        $('div.hide').removeClass('hide');
        $('#message').html(' Great, you have created poll "' + json.title + '"');
        $('#go_poll').attr('href', '/poll/' + json.hash);
        $('#new_poll').addClass('hide');
      });
    };
    e.preventDefault();
  });
});
