$(document).ready(function() {
  $('#new').click(function() {
    window.location.href = '/admin/new'
  });
  $('#my').click(function() {
    window.location.href = '/admin/polls'
  });
  $('#more').click(function() {
    $('#options').append('<input type="text" name="options[]" placeholder="...and more" class="form-input">');
    e.preventDefault();
  });
  // Create Donut Graph
  function createGraph(data) {
    $('#donut').html('');
    Morris.Donut({
      element: 'donut',
      colors: ['#727272', '#009688', '#FFC107', '#1976D2'],
      data: data
    });
  };
  if($('#donut').length && data_graph.length) {
    createGraph(data_graph);
  };
  // Clear buttons
  $('.btn-clear').click(function() {
    $(this).parent().addClass('hide');
  })
  // Submit Form :: Vote Poll
  $('#vote_poll')
  .submit(function(e) {
    var data = $(this).serialize();
    if ($('select').val() !== '') {
      $.ajax({
        url: '/api/vote',
        type: 'POST',
        data: data
      }).done(function(json){
        if(json.error) {
          $('#message').html(' ' + json.message);
          $('div.toast').removeClass('toast-success').addClass('toast-danger').removeClass('hide');
        } else {
          $('#message').html(' Great, you vote has been registered!');
          $('div.toast').removeClass('toast-danger').addClass('toast-success').removeClass('hide');
          createGraph(json);
        }
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
        $('#go_poll').attr('href', '/polls/' + json.hash);
        $('#new_poll').addClass('hide');
      });
    };
    e.preventDefault();
  });
});
